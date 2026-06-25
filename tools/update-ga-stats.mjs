import { createSign } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const propertyId = process.env.GA_PROPERTY_ID;
const serviceAccountJson = process.env.GA_SERVICE_ACCOUNT_JSON;
const outputPath = resolve(process.env.STATS_OUTPUT_PATH || "stats/summary.json");
const dateRange = { startDate: "30daysAgo", endDate: "today" };

const sites = [
  {
    key: "dhforge-tools",
    name: "DH Forge Tools",
    filter: {
      andGroup: {
        expressions: [
          notPathBeginsWith("/paper/"),
          notPathBeginsWith("/kids/"),
          notPathBeginsWith("/study/")
        ]
      }
    }
  },
  {
    key: "printable-paper-lab",
    name: "Printable Paper Lab",
    filter: pathBeginsWith("/paper/")
  },
  {
    key: "kids-practice-lab",
    name: "Kids Practice Lab",
    filter: pathBeginsWith("/kids/")
  },
  {
    key: "study-lab",
    name: "Study Lab",
    filter: pathBeginsWith("/study/")
  }
];

if (!propertyId) {
  throw new Error("GA_PROPERTY_ID is required.");
}

if (!serviceAccountJson) {
  throw new Error("GA_SERVICE_ACCOUNT_JSON is required.");
}

const serviceAccount = JSON.parse(serviceAccountJson);

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function signJwt(payload) {
  const header = { alg: "RS256", typ: "JWT" };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  return `${unsigned}.${signer.sign(serviceAccount.private_key, "base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")}`;
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${await response.text()}`);
  }

  return (await response.json()).access_token;
}

function pathBeginsWith(path) {
  return {
    filter: {
      fieldName: "pagePath",
      stringFilter: {
        matchType: "BEGINS_WITH",
        value: path
      }
    }
  };
}

function notPathBeginsWith(path) {
  return {
    notExpression: pathBeginsWith(path)
  };
}

function numberMetric(row, index) {
  return Number(row?.metricValues?.[index]?.value || 0);
}

function gaDateToIso(value) {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function seoulDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function recentDateKeys(daysBack = 30) {
  const [year, month, day] = seoulDateKey().split("-").map(Number);
  const todayUtc = Date.UTC(year, month - 1, day);

  return Array.from({ length: daysBack + 1 }, (_, index) => {
    const timestamp = todayUtc - (daysBack - index) * 24 * 60 * 60 * 1000;
    return new Date(timestamp).toISOString().slice(0, 10);
  });
}

async function runSiteReport(accessToken, site) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      dateRanges: [dateRange],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" }
      ],
      dimensionFilter: site.filter
    })
  });

  if (!response.ok) {
    throw new Error(`GA report failed for ${site.key}: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const row = data.rows?.[0];

  return {
    key: site.key,
    name: site.name,
    sessions: numberMetric(row, 0),
    activeUsers: numberMetric(row, 1),
    screenPageViews: numberMetric(row, 2)
  };
}

async function runDailyReport(accessToken, site) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      dateRanges: [dateRange],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }],
      dimensionFilter: site.filter,
      orderBys: [{ dimension: { dimensionName: "date" } }]
    })
  });

  if (!response.ok) {
    throw new Error(`GA daily report failed for ${site.key}: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return (data.rows || []).map((row) => ({
    date: gaDateToIso(row.dimensionValues?.[0]?.value || ""),
    sessions: numberMetric(row, 0)
  }));
}

async function buildDailySessions(accessToken) {
  const dailyByDate = new Map(
    recentDateKeys().map((date) => [
      date,
      {
        date,
        sessions: 0,
        sites: Object.fromEntries(sites.map((site) => [site.key, 0]))
      }
    ])
  );

  for (const site of sites) {
    const rows = await runDailyReport(accessToken, site);

    for (const row of rows) {
      if (!dailyByDate.has(row.date)) {
        dailyByDate.set(row.date, {
          date: row.date,
          sessions: 0,
          sites: Object.fromEntries(sites.map((item) => [item.key, 0]))
        });
      }

      const day = dailyByDate.get(row.date);
      day.sites[site.key] = row.sessions;
      day.sessions += row.sessions;
    }
  }

  return [...dailyByDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

const accessToken = await getAccessToken();
const siteStats = [];

for (const site of sites) {
  siteStats.push(await runSiteReport(accessToken, site));
}

const dailySessions = await buildDailySessions(accessToken);

const summary = {
  updatedAt: new Date().toISOString(),
  rangeLabel: "최근 30일 방문수",
  sites: siteStats,
  dailySessions
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(`Updated ${outputPath}`);
