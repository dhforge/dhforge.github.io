"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const LANGUAGE = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "ko";
const IS_EN = LANGUAGE === "en";
const SITE_COPY = {
  ko: {
    siteName: "무료 도구함",
    homeUrl: "https://dhforge.github.io/",
    inLanguage: "ko-KR"
  },
  en: {
    siteName: "Free Toolbox",
    homeUrl: "https://dhforge.github.io/en/",
    inLanguage: "en-US"
  }
};
const trackedToolActions = new Set();
let deferredInstallPrompt = null;

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    language: LANGUAGE,
    site_section: IS_EN ? "free_toolbox_en" : "free_toolbox_ko",
    ...params
  });
}

function trackToolUse(toolName, action = "use", options = {}) {
  const key = `${toolName}:${action}`;
  if (options.once && trackedToolActions.has(key)) return;
  if (options.once) trackedToolActions.add(key);
  trackAnalyticsEvent("tool_use", {
    tool_site: "dhforge-tools",
    tool_name: toolName,
    tool_action: action
  });
}

function trackFirstInput(input, toolName, action = "input") {
  if (!input) return;
  input.addEventListener("input", () => {
    const value = "value" in input ? String(input.value || "").trim() : "";
    if (value) trackToolUse(toolName, action, { once: true });
  });
}

function initAnalytics() {
  if (window.DHFORGE_ANALYTICS_LOADED) return;
  window.DHFORGE_ANALYTICS_LOADED = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  const script = document.createElement("script");
  script.src = "/analytics.js";
  script.defer = true;
  document.head.append(script);
}

document.addEventListener("DOMContentLoaded", () => {
  initAnalytics();
  registerServiceWorker();
  bindInstallPrompt();
  initStructuredData();
  initNavigation();
  initDirectorySearch();
  initDirectoryItemList();
  initCharCounter();
  initDateCalculator();
  initUnitConverter();
  initRandomPicker();
  initQrGenerator();
  initTextCleaner();
  initColorTool();
  initColorPalette();
  initGradientGenerator();
  initTimerTool();
  initRatioTool();
  initImageResizer();
  initImageCompressor();
  initImageConverter();
  initThumbnailMaker();
  initFaviconGenerator();
});

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

function bindInstallPrompt() {
  const labels = IS_EN
    ? {
      button: "Add app",
      title: "Use it like an app",
      ios: "iPhone: Safari share button > Add to Home Screen",
      android: "Galaxy: Chrome menu > Install app or Add to Home screen"
    }
    : {
      button: "앱처럼 추가",
      title: "앱처럼 사용하기",
      ios: "iPhone: Safari 공유 버튼 > 홈 화면에 추가",
      android: "Galaxy: Chrome 메뉴 > 앱 설치 또는 홈 화면에 추가"
    };
  const header = document.querySelector(".site-header");
  if (!header) return;
  let installButton = document.querySelector("[data-install]");
  if (!installButton) {
    installButton = document.createElement("button");
    installButton.className = "install-button";
    installButton.type = "button";
    installButton.dataset.install = "";
    installButton.textContent = labels.button;
    header.append(installButton);
  }

  let note = document.querySelector("[data-install-note]");
  if (!note) {
    note = document.createElement("div");
    note.className = "install-note";
    note.dataset.installNote = "";
    note.innerHTML = `<strong>${labels.title}</strong><span>${labels.ios}</span><span>${labels.android}</span>`;
    const target = document.querySelector(".home-hero") || document.querySelector(".tool-heading") || document.querySelector("main");
    if (target) target.append(note);
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      trackToolUse("pwa", "install_prompt");
      return;
    }
    note.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function initDirectorySearch() {
  const input = document.querySelector("[data-directory-search]");
  const directory = document.querySelector(".tool-directory");
  if (!input || !directory) return;
  const empty = document.querySelector("[data-directory-empty]");
  const items = Array.from(directory.querySelectorAll("a"));
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;
    items.forEach((item) => {
      const isVisible = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });
    if (empty) empty.hidden = visibleCount > 0;
  });
}

function initDirectoryItemList() {
  const directory = document.querySelector(".tool-directory");
  if (!directory) return;
  const items = Array.from(directory.querySelectorAll("a"));
  if (!items.length) return;
  const canonical = document.querySelector('link[rel="canonical"]');
  const baseUrl = canonical ? canonical.href : location.href;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": IS_EN ? "Free Toolbox directory" : "무료 도구함 목록",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": (item.querySelector("span") || item).textContent.trim(),
      "url": new URL(item.getAttribute("href"), baseUrl).href
    }))
  });
  document.head.appendChild(script);
}

function initStructuredData() {
  const copy = SITE_COPY[LANGUAGE];
  const canonical = document.querySelector('link[rel="canonical"]');
  const description = document.querySelector('meta[name="description"]');
  const url = canonical ? canonical.href : location.href;
  const title = document.title.replace(` - ${copy.siteName}`, "");
  const path = new URL(url).pathname;
  const isHome = path === "/" || path === "/index.html" || path === "/en/" || path === "/en/index.html";
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${copy.homeUrl}#website`,
      "url": copy.homeUrl,
      "name": copy.siteName,
      "inLanguage": copy.inLanguage
    },
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      "url": url,
      "name": title,
      "description": description ? description.content : title,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "isAccessibleForFree": true,
      "inLanguage": copy.inLanguage
    }
  ];

  if (!isHome) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": copy.siteName,
          "item": copy.homeUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": url
        }
      ]
    });
  }

  const faqItems = Array.from(document.querySelectorAll(".content-panel details, .faq-band details")).map((detail) => {
    const summary = detail.querySelector("summary");
    const answer = detail.querySelector("p");
    return summary && answer ? {
      "@type": "Question",
      "name": summary.textContent.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer.textContent.trim()
      }
    } : null;
  }).filter(Boolean);

  if (faqItems.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      "mainEntity": faqItems
    });
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
  document.head.appendChild(script);
}

function initNavigation() {
  const tabs = $$(".tool-tab");
  const panels = $$(".tool-panel");
  if (!tabs.length || !panels.length || tabs.some((tab) => tab.tagName.toLowerCase() === "a")) return;

  function activate(id) {
    const safeId = panels.some((panel) => panel.dataset.panel === id) ? id : "char-counter";
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tool === safeId));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === safeId));
    if (location.hash.slice(1) !== safeId) {
      history.replaceState(null, "", `#${safeId}`);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.tool));
  });

  window.addEventListener("hashchange", () => activate(location.hash.slice(1)));
  activate(location.hash.slice(1) || "char-counter");
}

function initCharCounter() {
  const input = $("#charInput");
  if (!input) return;
  const withSpaces = $("#charWithSpaces");
  const noSpaces = $("#charNoSpaces");
  const bytes = $("#charBytes");
  const words = $("#wordCount");
  const lines = $("#lineCount");
  const readTime = $("#readTime");

  function update() {
    const text = input.value;
    const graphemes = Array.from(text);
    const noSpaceText = text.replace(/\s/g, "");
    const wordList = text.trim().match(/[A-Za-z0-9가-힣]+/g) || [];
    const lineCount = text.length ? text.split(/\r\n|\r|\n/).length : 0;
    const seconds = Math.ceil(Math.max(wordList.length, Math.ceil(graphemes.length / 4)) / 4);

    withSpaces.textContent = graphemes.length.toLocaleString();
    noSpaces.textContent = Array.from(noSpaceText).length.toLocaleString();
    bytes.textContent = new TextEncoder().encode(text).length.toLocaleString();
    words.textContent = wordList.length.toLocaleString();
    lines.textContent = lineCount.toLocaleString();
    readTime.textContent = formatReadTime(seconds);
  }

  input.addEventListener("input", update);
  trackFirstInput(input, "char-counter");
  update();
}

function formatReadTime(seconds) {
  if (IS_EN) return seconds < 60 ? `${seconds} sec` : `${Math.ceil(seconds / 60)} min`;
  return seconds < 60 ? `${seconds}초` : `${Math.ceil(seconds / 60)}분`;
}

function initDateCalculator() {
  const start = $("#dateStart");
  if (!start) return;
  const end = $("#dateEnd");
  const base = $("#dateBase");
  const offset = $("#dateOffset");
  const diffResult = $("#dateDiffResult");
  const offsetResult = $("#dateOffsetResult");
  const today = new Date();
  const todayText = toDateInput(today);

  start.value = todayText;
  end.value = toDateInput(addDays(today, 30));
  base.value = todayText;

  function updateDiff() {
    if (!start.value || !end.value) {
      diffResult.textContent = IS_EN ? "Select both dates." : "날짜를 선택하세요.";
      return;
    }
    const startDate = parseDateInput(start.value);
    const endDate = parseDateInput(end.value);
    const diff = Math.round((endDate - startDate) / 86400000);
    const abs = Math.abs(diff);
    if (IS_EN) {
      diffResult.textContent = diff >= 0
        ? `${start.value} to ${end.value} is ${abs.toLocaleString()} days apart. Including the start date, it is ${(abs + 1).toLocaleString()} days.`
        : `${end.value} is ${abs.toLocaleString()} days before ${start.value}.`;
      return;
    }
    diffResult.textContent = diff >= 0
      ? `${start.value}부터 ${end.value}까지 ${abs.toLocaleString()}일 차이입니다. 시작일을 포함하면 ${(abs + 1).toLocaleString()}일입니다.`
      : `${end.value}가 ${start.value}보다 ${abs.toLocaleString()}일 빠릅니다.`;
  }

  function updateOffset() {
    if (!base.value) {
      offsetResult.textContent = IS_EN ? "Select a base date." : "기준일을 선택하세요.";
      return;
    }
    const count = Number(offset.value || 0);
    const result = addDays(parseDateInput(base.value), count);
    if (IS_EN) {
      const direction = count >= 0 ? "after" : "before";
      offsetResult.textContent = `${Math.abs(count).toLocaleString()} days ${direction} ${base.value} is ${toDateInput(result)}.`;
      return;
    }
    offsetResult.textContent = `${base.value}에서 ${count.toLocaleString()}일 ${count >= 0 ? "후" : "전"} 날짜는 ${toDateInput(result)}입니다.`;
  }

  [start, end].forEach((input) => input.addEventListener("input", updateDiff));
  [base, offset].forEach((input) => input.addEventListener("input", updateOffset));
  [start, end, base, offset].forEach((input) => trackFirstInput(input, "date-calculator"));
  updateDiff();
  updateOffset();
}

function parseDateInput(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + Number(days));
  return result;
}

function initUnitConverter() {
  const type = $("#unitType");
  if (!type) return;
  const value = $("#unitValue");
  const from = $("#unitFrom");
  const results = $("#unitResults");
  const unitGroups = getUnitGroups();

  Object.entries(unitGroups).forEach(([key, group]) => {
    type.append(new Option(group.label, key));
  });

  function fillUnits() {
    const group = unitGroups[type.value];
    from.innerHTML = "";
    Object.entries(group.units).forEach(([key, unit]) => {
      from.append(new Option(unit.label, key));
    });
    from.value = group.base;
    update();
  }

  function update() {
    const group = unitGroups[type.value];
    const inputValue = Number(value.value || 0);
    const baseValue = group.units[from.value].toBase(inputValue);
    results.innerHTML = "";
    Object.entries(group.units).forEach(([key, unit]) => {
      const item = document.createElement("output");
      item.className = "result-item";
      item.innerHTML = `<span>${unit.label}</span><strong>${formatNumber(unit.fromBase(baseValue))} ${key}</strong>`;
      results.append(item);
    });
  }

  type.addEventListener("change", fillUnits);
  value.addEventListener("input", update);
  from.addEventListener("change", update);
  [type, value, from].forEach((input) => trackFirstInput(input, "unit-converter"));
  fillUnits();
}

function getUnitGroups() {
  const labels = IS_EN ? {
    length: "Length",
    weight: "Weight",
    temperature: "Temperature",
    area: "Area",
    mm: "Millimeter",
    cm: "Centimeter",
    m: "Meter",
    km: "Kilometer",
    in: "Inch",
    ft: "Foot",
    g: "Gram",
    kg: "Kilogram",
    t: "Metric ton",
    oz: "Ounce",
    lb: "Pound",
    c: "Celsius",
    f: "Fahrenheit",
    k: "Kelvin",
    sqm: "Square meter",
    pyeong: "Pyeong",
    sqft: "Square foot",
    acre: "Acre"
  } : {
    length: "길이",
    weight: "무게",
    temperature: "온도",
    area: "면적",
    mm: "밀리미터",
    cm: "센티미터",
    m: "미터",
    km: "킬로미터",
    in: "인치",
    ft: "피트",
    g: "그램",
    kg: "킬로그램",
    t: "톤",
    oz: "온스",
    lb: "파운드",
    c: "섭씨",
    f: "화씨",
    k: "켈빈",
    sqm: "제곱미터",
    pyeong: "평",
    sqft: "제곱피트",
    acre: "에이커"
  };

  return {
    length: {
      label: labels.length,
      base: "m",
      units: {
        mm: { label: labels.mm, toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        cm: { label: labels.cm, toBase: (v) => v / 100, fromBase: (v) => v * 100 },
        m: { label: labels.m, toBase: (v) => v, fromBase: (v) => v },
        km: { label: labels.km, toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        in: { label: labels.in, toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        ft: { label: labels.ft, toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 }
      }
    },
    weight: {
      label: labels.weight,
      base: "kg",
      units: {
        g: { label: labels.g, toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        kg: { label: labels.kg, toBase: (v) => v, fromBase: (v) => v },
        t: { label: labels.t, toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        oz: { label: labels.oz, toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
        lb: { label: labels.lb, toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 }
      }
    },
    temperature: {
      label: labels.temperature,
      base: "c",
      units: {
        c: { label: labels.c, toBase: (v) => v, fromBase: (v) => v },
        f: { label: labels.f, toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
        k: { label: labels.k, toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
      }
    },
    area: {
      label: labels.area,
      base: "sqm",
      units: {
        sqm: { label: labels.sqm, toBase: (v) => v, fromBase: (v) => v },
        pyeong: { label: labels.pyeong, toBase: (v) => v * 3.305785, fromBase: (v) => v / 3.305785 },
        sqft: { label: labels.sqft, toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
        acre: { label: labels.acre, toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 }
      }
    }
  };
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Number.parseFloat(value.toFixed(8)).toLocaleString();
}

function initRandomPicker() {
  const items = $("#randomItems");
  if (!items) return;
  const result = $("#randomResult");
  const teamCount = $("#teamCount");
  const rangeMin = $("#rangeMin");
  const rangeMax = $("#rangeMax");

  function getItems() {
    return items.value.split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function shuffled(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  $("#pickOne").addEventListener("click", () => {
    trackToolUse("random-picker", "pick_one");
    const list = getItems();
    result.textContent = list.length
      ? `${IS_EN ? "Picked" : "선택 결과"}: ${list[Math.floor(Math.random() * list.length)]}`
      : (IS_EN ? "Enter items first." : "항목을 입력하세요.");
  });

  $("#shuffleItems").addEventListener("click", () => {
    trackToolUse("random-picker", "shuffle");
    const list = shuffled(getItems());
    items.value = list.join("\n");
    result.textContent = list.length
      ? (IS_EN ? "The list has been shuffled." : "목록을 섞었습니다.")
      : (IS_EN ? "Enter items first." : "항목을 입력하세요.");
  });

  $("#makeTeams").addEventListener("click", () => {
    trackToolUse("random-picker", "make_teams");
    const list = shuffled(getItems());
    const count = Math.max(2, Math.min(20, Number(teamCount.value || 2)));
    if (!list.length) {
      result.textContent = IS_EN ? "Enter items first." : "항목을 입력하세요.";
      return;
    }
    const teams = Array.from({ length: count }, () => []);
    list.forEach((item, index) => teams[index % count].push(item));
    result.textContent = teams.map((team, index) => `${IS_EN ? "Team" : ""}${index + 1}${IS_EN ? "" : "팀"}: ${team.join(", ") || "-"}`).join("\n");
  });

  $("#pickNumber").addEventListener("click", () => {
    trackToolUse("random-picker", "pick_number");
    const min = Math.ceil(Number(rangeMin.value || 0));
    const max = Math.floor(Number(rangeMax.value || 0));
    if (min > max) {
      result.textContent = IS_EN ? "Minimum cannot be greater than maximum." : "최소값이 최대값보다 클 수 없습니다.";
      return;
    }
    const picked = Math.floor(Math.random() * (max - min + 1)) + min;
    result.textContent = `${IS_EN ? "Random number" : "번호 추첨 결과"}: ${picked}`;
  });
}

function initQrGenerator() {
  const text = $("#qrText");
  if (!text) return;
  const canvas = $("#qrCanvas");
  const download = $("#downloadQr");
  const status = document.createElement("p");
  status.className = "helper tool-status";
  download.closest(".button-row")?.after(status);

  text.value = "https://example.com";

  function render() {
    const value = text.value.trim();
    if (!value) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#607080";
      ctx.font = "14px Arial";
      ctx.fillText(IS_EN ? "Enter text first." : "\uBA3C\uC800 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694.", 70, 140);
      status.textContent = IS_EN ? "Enter a URL or short text before creating a QR code." : "QR \uCF54\uB4DC\uB85C \uB9CC\uB4E4 URL\uC774\uB098 \uC9E7\uC740 \uBB38\uAD6C\uB97C \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.";
      download.classList.remove("is-ready");
      return;
    }
    try {
      const matrix = createQrMatrix(value);
      drawQr(canvas, matrix);
      status.textContent = IS_EN ? "QR code is ready. Use Save PNG to download it." : "QR \uCF54\uB4DC\uAC00 \uC900\uBE44\uB418\uC5C8\uC2B5\uB2C8\uB2E4. PNG \uC800\uC7A5\uC73C\uB85C \uB0B4\uB824\uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.";
      download.classList.add("is-ready");
    } catch (error) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9b5a00";
      ctx.font = "14px Arial";
      status.textContent = IS_EN ? "Input is too long for this compact QR generator." : "\uC785\uB825\uD55C \uB0B4\uC6A9\uC774 \uB108\uBB34 \uAE41\uB2C8\uB2E4. \uC9E7\uC740 URL\uC774\uB098 \uBB38\uAD6C\uB85C \uC904\uC5EC\uC8FC\uC138\uC694.";
      download.classList.remove("is-ready");
      ctx.fillText(IS_EN ? "Input is too long." : "입력이 너무 깁니다.", 80, 140);
    }
  }

  $("#makeQr").addEventListener("click", render);
  text.addEventListener("input", render);
  trackFirstInput(text, "qr-generator");
  download.addEventListener("click", () => {
    trackToolUse("qr-generator", "download_png");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
  });
  render();
}

function createQrMatrix(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const versions = [
    { version: 1, dataCodewords: 19, ecCodewords: 7, align: [] },
    { version: 2, dataCodewords: 34, ecCodewords: 10, align: [6, 18] },
    { version: 3, dataCodewords: 55, ecCodewords: 15, align: [6, 22] },
    { version: 4, dataCodewords: 80, ecCodewords: 20, align: [6, 26] },
    { version: 5, dataCodewords: 108, ecCodewords: 26, align: [6, 30] }
  ];
  const selected = versions.find((item) => 4 + 8 + bytes.length * 8 <= item.dataCodewords * 8);
  if (!selected) throw new Error("QR input is too long");

  const dataCodewords = makeQrDataCodewords(bytes, selected.dataCodewords);
  const ecCodewords = reedSolomonRemainder(dataCodewords, selected.ecCodewords);
  const allCodewords = dataCodewords.concat(ecCodewords);
  const base = buildBaseQr(selected);
  const dataBits = [];
  allCodewords.forEach((codeword) => appendBits(dataBits, codeword, 8));

  let bestMatrix = null;
  let bestMask = 0;
  let bestPenalty = Infinity;
  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = cloneMatrix(base.modules);
    placeQrData(candidate, base.functionModules, dataBits, mask);
    placeFormatBits(candidate, mask);
    const penalty = qrPenalty(candidate);
    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestMatrix = candidate;
      bestMask = mask;
    }
  }
  placeFormatBits(bestMatrix, bestMask);
  return bestMatrix;
}

function makeQrDataCodewords(bytes, dataCodewordCount) {
  const bits = [];
  appendBits(bits, 0x4, 4);
  appendBits(bits, bytes.length, 8);
  bytes.forEach((byte) => appendBits(bits, byte, 8));
  const capacity = dataCodewordCount * 8;
  appendBits(bits, 0, Math.min(4, capacity - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const codewords = [];
  for (let i = 0; i < bits.length; i += 8) {
    codewords.push(bits.slice(i, i + 8).reduce((sum, bit) => (sum << 1) | bit, 0));
  }
  for (let pad = 0; codewords.length < dataCodewordCount; pad += 1) {
    codewords.push(pad % 2 === 0 ? 0xec : 0x11);
  }
  return codewords;
}

function appendBits(target, value, length) {
  for (let i = length - 1; i >= 0; i -= 1) {
    target.push((value >>> i) & 1);
  }
}

function buildBaseQr(config) {
  const size = 21 + (config.version - 1) * 4;
  const modules = Array.from({ length: size }, () => Array(size).fill(false));
  const functionModules = Array.from({ length: size }, () => Array(size).fill(false));

  function set(x, y, value, isFunction = true) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    modules[y][x] = value;
    if (isFunction) functionModules[y][x] = true;
  }

  function finder(x, y) {
    for (let dy = -1; dy <= 7; dy += 1) {
      for (let dx = -1; dx <= 7; dx += 1) {
        const inside = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
        const dark = inside && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
        set(x + dx, y + dy, dark);
      }
    }
  }

  function alignment(cx, cy) {
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        set(cx + dx, cy + dy, dist !== 1);
      }
    }
  }

  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);

  for (let i = 8; i < size - 8; i += 1) {
    set(i, 6, i % 2 === 0);
    set(6, i, i % 2 === 0);
  }

  config.align.forEach((x) => {
    config.align.forEach((y) => {
      const overlapsFinder = (x === 6 && y === 6) || (x === 6 && y === size - 7) || (x === size - 7 && y === 6);
      if (!overlapsFinder) alignment(x, y);
    });
  });

  set(8, size - 8, true);
  reserveFormat(functionModules);
  return { modules, functionModules };
}

function reserveFormat(functionModules) {
  const size = functionModules.length;
  for (let i = 0; i <= 5; i += 1) functionModules[i][8] = true;
  functionModules[7][8] = true;
  functionModules[8][8] = true;
  functionModules[8][7] = true;
  for (let i = 9; i < 15; i += 1) functionModules[8][14 - i] = true;
  for (let i = 0; i < 8; i += 1) functionModules[8][size - 1 - i] = true;
  for (let i = 8; i < 15; i += 1) functionModules[size - 15 + i][8] = true;
}

function cloneMatrix(matrix) {
  return matrix.map((row) => row.slice());
}

function placeQrData(matrix, functionModules, dataBits, mask) {
  const size = matrix.length;
  let bitIndex = 0;
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vertical = 0; vertical < size; vertical += 1) {
      const y = upward ? size - 1 - vertical : vertical;
      for (let dx = 0; dx < 2; dx += 1) {
        const x = right - dx;
        if (functionModules[y][x]) continue;
        const bit = bitIndex < dataBits.length ? dataBits[bitIndex] === 1 : false;
        matrix[y][x] = bit !== qrMask(mask, x, y);
        bitIndex += 1;
      }
    }
    upward = !upward;
  }
}

function qrMask(mask, x, y) {
  switch (mask) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    case 7: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
    default: return false;
  }
}

function placeFormatBits(matrix, mask) {
  const size = matrix.length;
  const bits = getFormatBits(mask);
  const bit = (i) => ((bits >>> i) & 1) === 1;

  for (let i = 0; i <= 5; i += 1) matrix[i][8] = bit(i);
  matrix[7][8] = bit(6);
  matrix[8][8] = bit(7);
  matrix[8][7] = bit(8);
  for (let i = 9; i < 15; i += 1) matrix[8][14 - i] = bit(i);
  for (let i = 0; i < 8; i += 1) matrix[8][size - 1 - i] = bit(i);
  for (let i = 8; i < 15; i += 1) matrix[size - 15 + i][8] = bit(i);
}

function getFormatBits(mask) {
  const errorCorrectionLevel = 1;
  const data = (errorCorrectionLevel << 3) | mask;
  let rem = data << 10;
  for (let i = 14; i >= 10; i -= 1) {
    if (((rem >>> i) & 1) !== 0) rem ^= 0x537 << (i - 10);
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function reedSolomonRemainder(data, degree) {
  const generator = reedSolomonGenerator(degree);
  const result = data.concat(Array(degree).fill(0));
  for (let i = 0; i < data.length; i += 1) {
    const factor = result[i];
    if (factor === 0) continue;
    for (let j = 0; j < generator.length; j += 1) {
      result[i + j] ^= gfMultiply(generator[j], factor);
    }
  }
  return result.slice(result.length - degree);
}

function reedSolomonGenerator(degree) {
  let result = [1];
  for (let i = 0; i < degree; i += 1) {
    const next = Array(result.length + 1).fill(0);
    result.forEach((coef, index) => {
      next[index] ^= gfMultiply(coef, 1);
      next[index + 1] ^= gfMultiply(coef, gfExp(i));
    });
    result = next;
  }
  return result;
}

const GF_TABLES = (() => {
  const exp = Array(512).fill(0);
  const log = Array(256).fill(0);
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    exp[i] = x;
    log[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) exp[i] = exp[i - 255];
  return { exp, log };
})();

function gfExp(power) {
  return GF_TABLES.exp[power];
}

function gfMultiply(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF_TABLES.exp[GF_TABLES.log[a] + GF_TABLES.log[b]];
}

function qrPenalty(matrix) {
  const size = matrix.length;
  let penalty = 0;

  for (let y = 0; y < size; y += 1) penalty += runPenalty(matrix[y]);
  for (let x = 0; x < size; x += 1) {
    const column = [];
    for (let y = 0; y < size; y += 1) column.push(matrix[y][x]);
    penalty += runPenalty(column);
  }

  for (let y = 0; y < size - 1; y += 1) {
    for (let x = 0; x < size - 1; x += 1) {
      const color = matrix[y][x];
      if (matrix[y][x + 1] === color && matrix[y + 1][x] === color && matrix[y + 1][x + 1] === color) {
        penalty += 3;
      }
    }
  }

  const patternA = "10111010000";
  const patternB = "00001011101";
  for (let y = 0; y < size; y += 1) {
    const row = matrix[y].map((cell) => (cell ? "1" : "0")).join("");
    penalty += patternPenalty(row, patternA, patternB);
  }
  for (let x = 0; x < size; x += 1) {
    let column = "";
    for (let y = 0; y < size; y += 1) column += matrix[y][x] ? "1" : "0";
    penalty += patternPenalty(column, patternA, patternB);
  }

  const dark = matrix.flat().filter(Boolean).length;
  const percent = dark * 100 / (size * size);
  penalty += Math.floor(Math.abs(percent - 50) / 5) * 10;
  return penalty;
}

function runPenalty(values) {
  let penalty = 0;
  let runColor = values[0];
  let runLength = 1;
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] === runColor) {
      runLength += 1;
    } else {
      if (runLength >= 5) penalty += 3 + runLength - 5;
      runColor = values[i];
      runLength = 1;
    }
  }
  if (runLength >= 5) penalty += 3 + runLength - 5;
  return penalty;
}

function patternPenalty(line, patternA, patternB) {
  let penalty = 0;
  for (let i = 0; i <= line.length - 11; i += 1) {
    const part = line.slice(i, i + 11);
    if (part === patternA || part === patternB) penalty += 40;
  }
  return penalty;
}

function drawQr(canvas, matrix) {
  const ctx = canvas.getContext("2d");
  const size = matrix.length;
  const quiet = 4;
  const cell = Math.floor(Math.min(canvas.width, canvas.height) / (size + quiet * 2));
  const drawSize = cell * (size + quiet * 2);
  const offset = Math.floor((canvas.width - drawSize) / 2);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111827";
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (matrix[y][x]) {
        ctx.fillRect(offset + (x + quiet) * cell, offset + (y + quiet) * cell, cell, cell);
      }
    }
  }
}

function initTextCleaner() {
  const input = $("#cleanInput");
  if (!input) return;
  const output = $("#cleanOutput");
  let useOutputAsSource = false;

  function setOutput(value) {
    output.value = value;
    useOutputAsSource = true;
  }

  input.addEventListener("input", () => {
    useOutputAsSource = false;
  });

  $$("[data-clean]").forEach((button) => {
    button.addEventListener("click", () => {
      trackToolUse("text-cleaner", button.dataset.clean || "clean");
      const text = useOutputAsSource && output.value ? output.value : input.value;
      const lines = text.split(/\r?\n/);
      switch (button.dataset.clean) {
        case "trim-lines":
          setOutput(lines.map((line) => line.trim()).join("\n"));
          break;
        case "remove-empty":
          setOutput(lines.filter((line) => line.trim()).join("\n"));
          break;
        case "dedupe":
          {
            const seen = new Set();
            const deduped = [];
            lines.forEach((line) => {
              const normalized = line.trim().replace(/[ \t]+/g, " ");
              if (!seen.has(normalized)) {
                seen.add(normalized);
                deduped.push(normalized);
              }
            });
            setOutput(deduped.join("\n"));
          }
          break;
        case "collapse-space":
          setOutput(lines.map((line) => line.trim().replace(/[ \t]+/g, " ")).join("\n").replace(/\n{3,}/g, "\n\n").trim());
          break;
        case "upper":
          setOutput(text.toUpperCase());
          break;
        case "lower":
          setOutput(text.toLowerCase());
          break;
        default:
          setOutput(text);
      }
    });
  });

  $("#copyCleanText").addEventListener("click", async () => {
    trackToolUse("text-cleaner", "copy_result");
    output.select();
    try {
      await navigator.clipboard.writeText(output.value);
    } catch {
      document.execCommand("copy");
    }
  });
}

function initColorTool() {
  const colorInput = $("#colorInput");
  if (!colorInput) return;
  const hexInput = $("#hexInput");
  const swatch = $("#colorSwatch");
  const results = $("#colorResults");
  const message = document.createElement("p");
  message.className = "helper tool-status";
  hexInput.closest(".field")?.after(message);

  function updateFromHex(hex) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
      hexInput.setAttribute("aria-invalid", "true");
      message.textContent = IS_EN ? "Enter a HEX value like #2f6f73." : "#2f6f73 \uD615\uC2DD\uC758 6\uC790\uB9AC HEX \uAC12\uC744 \uC785\uB825\uD558\uC138\uC694.";
      return;
    }
    hexInput.removeAttribute("aria-invalid");
    message.textContent = "";
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const blackContrast = contrastRatio(rgb, { r: 0, g: 0, b: 0 });
    const whiteContrast = contrastRatio(rgb, { r: 255, g: 255, b: 255 });
    colorInput.value = hex.toLowerCase();
    hexInput.value = hex.toLowerCase();
    swatch.style.background = hex;
    results.innerHTML = "";
    [
      ["HEX", hex.toLowerCase()],
      ["RGB", `${rgb.r}, ${rgb.g}, ${rgb.b}`],
      ["HSL", `${hsl.h}, ${hsl.s}%, ${hsl.l}%`],
      [IS_EN ? "Black text contrast" : "검정 글자 대비", `${blackContrast.toFixed(2)}:1`],
      [IS_EN ? "White text contrast" : "흰색 글자 대비", `${whiteContrast.toFixed(2)}:1`]
    ].forEach(([label, value]) => {
      const item = document.createElement("output");
      item.className = "result-item";
      item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      results.append(item);
    });
  }

  colorInput.addEventListener("input", () => updateFromHex(colorInput.value));
  hexInput.addEventListener("input", () => updateFromHex(hexInput.value.trim()));
  [colorInput, hexInput].forEach((input) => trackFirstInput(input, "color-tool"));
  updateFromHex(colorInput.value);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    if (max === gn) h = (bn - rn) / d + 2;
    if (max === bn) h = (rn - gn) / d + 4;
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function contrastRatio(a, b) {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

function relativeLuminance(rgb) {
  const values = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

function initTimerTool() {
  const timerMinutes = $("#timerMinutes");
  if (!timerMinutes) return;
  const timerDisplay = $("#timerDisplay");
  let timerRemaining = Number(timerMinutes.value) * 60;
  let timerId = null;

  function setTimerDisplay() {
    timerDisplay.textContent = formatClock(timerRemaining);
  }

  timerMinutes.addEventListener("input", () => {
    timerRemaining = Math.max(0, Number(timerMinutes.value || 0) * 60);
    setTimerDisplay();
  });
  trackFirstInput(timerMinutes, "timer", "set_minutes");

  $("#timerStart").addEventListener("click", () => {
    trackToolUse("timer", "countdown_start");
    if (timerId) return;
    timerId = window.setInterval(() => {
      timerRemaining = Math.max(0, timerRemaining - 1);
      setTimerDisplay();
      if (timerRemaining === 0) {
        clearInterval(timerId);
        timerId = null;
      }
    }, 1000);
  });

  $("#timerPause").addEventListener("click", () => {
    trackToolUse("timer", "countdown_pause");
    clearInterval(timerId);
    timerId = null;
  });

  $("#timerReset").addEventListener("click", () => {
    trackToolUse("timer", "countdown_reset");
    clearInterval(timerId);
    timerId = null;
    timerRemaining = Math.max(0, Number(timerMinutes.value || 0) * 60);
    setTimerDisplay();
  });

  const stopwatchDisplay = $("#stopwatchDisplay");
  const lapList = $("#lapList");
  let stopwatchStart = 0;
  let stopwatchElapsed = 0;
  let stopwatchId = null;

  function renderStopwatch() {
    const elapsed = stopwatchId ? Date.now() - stopwatchStart + stopwatchElapsed : stopwatchElapsed;
    stopwatchDisplay.textContent = formatStopwatch(elapsed);
  }

  $("#stopwatchStart").addEventListener("click", () => {
    trackToolUse("timer", "stopwatch_toggle");
    if (stopwatchId) {
      stopwatchElapsed += Date.now() - stopwatchStart;
      clearInterval(stopwatchId);
      stopwatchId = null;
      $("#stopwatchStart").textContent = IS_EN ? "Start" : "시작";
      renderStopwatch();
      return;
    }
    stopwatchStart = Date.now();
    stopwatchId = window.setInterval(renderStopwatch, 100);
    $("#stopwatchStart").textContent = IS_EN ? "Stop" : "정지";
  });

  $("#stopwatchLap").addEventListener("click", () => {
    trackToolUse("timer", "stopwatch_lap");
    const li = document.createElement("li");
    li.textContent = stopwatchDisplay.textContent;
    lapList.prepend(li);
  });

  $("#stopwatchReset").addEventListener("click", () => {
    trackToolUse("timer", "stopwatch_reset");
    clearInterval(stopwatchId);
    stopwatchId = null;
    stopwatchElapsed = 0;
    lapList.innerHTML = "";
    $("#stopwatchStart").textContent = IS_EN ? "Start" : "시작";
    renderStopwatch();
  });

  setTimerDisplay();
  renderStopwatch();
}

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatStopwatch(ms) {
  const totalTenths = Math.floor(ms / 100);
  const tenths = totalTenths % 10;
  const seconds = Math.floor(totalTenths / 10) % 60;
  const minutes = Math.floor(totalTenths / 600);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

function initRatioTool() {
  const width = $("#ratioWidth");
  if (!width) return;
  const height = $("#ratioHeight");
  const newWidth = $("#ratioNewWidth");
  const targetHeight = $("#ratioTargetHeight");
  const simple = $("#ratioSimple");
  const newHeight = $("#ratioNewHeight");
  const widthFromHeight = $("#ratioWidthFromHeight");

  function update() {
    const w = Math.max(1, Number(width.value || 1));
    const h = Math.max(1, Number(height.value || 1));
    const gcdValue = gcd(w, h);
    simple.textContent = `${w / gcdValue}:${h / gcdValue}`;
    newHeight.textContent = Math.round(Number(newWidth.value || 0) * h / w).toLocaleString();
    widthFromHeight.textContent = Math.round(Number(targetHeight.value || 0) * w / h).toLocaleString();
  }

  [width, height, newWidth, targetHeight].forEach((input) => input.addEventListener("input", update));
  [width, height, newWidth, targetHeight].forEach((input) => trackFirstInput(input, "ratio-calculator"));
  update();
}

function gcd(a, b) {
  let x = Math.round(Math.abs(a));
  let y = Math.round(Math.abs(b));
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
}

function initImageResizer() {
  const fileInput = $("#imageInput");
  if (!fileInput) return;
  const widthInput = $("#resizeWidth");
  const heightInput = $("#resizeHeight");
  const lockRatio = $("#lockRatio");
  const format = $("#imageFormat");
  const canvas = $("#imageCanvas");
  const download = $("#downloadImage");
  const status = document.createElement("p");
  status.className = "helper tool-status";
  download.after(status);
  let sourceImage = null;
  let sourceRatio = 1;

  fileInput.addEventListener("change", () => {
    trackToolUse("image-resizer", "select_image");
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      sourceImage = image;
      sourceRatio = image.width / image.height;
      widthInput.value = image.width;
      heightInput.value = image.height;
      drawResizedImage();
      URL.revokeObjectURL(image.src);
    };
    image.src = URL.createObjectURL(file);
  });

  widthInput.addEventListener("input", () => {
    if (lockRatio.checked && sourceRatio) {
      heightInput.value = Math.max(1, Math.round(Number(widthInput.value || 1) / sourceRatio));
    }
  });

  heightInput.addEventListener("input", () => {
    if (lockRatio.checked && sourceRatio) {
      widthInput.value = Math.max(1, Math.round(Number(heightInput.value || 1) * sourceRatio));
    }
  });

  $("#resizeImage").addEventListener("click", () => {
    trackToolUse("image-resizer", "resize");
    drawResizedImage();
  });
  format.addEventListener("change", drawResizedImage);
  download.addEventListener("click", () => trackToolUse("image-resizer", "download"));

  function drawResizedImage() {
    const ctx = canvas.getContext("2d");
    if (!sourceImage) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#607080";
      ctx.font = "14px Arial";
      status.textContent = imageToolMessage();
      download.classList.remove("is-ready");
      ctx.fillText(IS_EN ? "Select an image." : "이미지를 선택하세요.", 92, 112);
      return;
    }
    const targetWidth = Math.max(1, Math.round(Number(widthInput.value || sourceImage.width)));
    const targetHeight = Math.max(1, Math.round(Number(heightInput.value || sourceImage.height)));
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
    const extension = format.value.split("/")[1].replace("jpeg", "jpg");
    download.href = canvas.toDataURL(format.value, 0.92);
    download.download = `resized-image.${extension}`;
    download.classList.add("is-ready");
    status.textContent = IS_EN ? "Image is ready. Use the result link to save it." : "\uC774\uBBF8\uC9C0\uAC00 \uC900\uBE44\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uACB0\uACFC \uC800\uC7A5 \uB9C1\uD06C\uB85C \uB0B4\uB824\uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.";
  }

  drawResizedImage();
}

function loadImageFromInput(input, callback) {
  const file = input.files && input.files[0];
  if (!file) return;
  const image = new Image();
  image.onload = () => {
    callback(image, file);
    URL.revokeObjectURL(image.src);
  };
  image.src = URL.createObjectURL(file);
}

function drawImageFit(ctx, image, width, height, fit = "contain", background = "#ffffff") {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  if ((fit === "cover" && imageRatio > targetRatio) || (fit === "contain" && imageRatio < targetRatio)) {
    drawHeight = height;
    drawWidth = height * imageRatio;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
  }
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function extensionFromMime(mime) {
  return mime.split("/")[1].replace("jpeg", "jpg");
}

function imageToolMessage() {
  return IS_EN ? "Select an image before creating the result." : "\uACB0\uACFC\uB97C \uB9CC\uB4E4\uAE30 \uC804\uC5D0 \uC774\uBBF8\uC9C0\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.";
}

function initImageCompressor() {
  const input = $("#compressInput");
  if (!input) return;
  const maxWidth = $("#compressMaxWidth");
  const quality = $("#compressQuality");
  const format = $("#compressFormat");
  const canvas = $("#compressCanvas");
  const download = $("#compressDownload");
  const info = $("#compressInfo");
  let sourceImage = null;
  let sourceFile = null;

  input.addEventListener("change", () => loadImageFromInput(input, (image, file) => {
    sourceImage = image;
    sourceFile = file;
    render();
  }));
  $("#compressRun").addEventListener("click", render);
  [maxWidth, quality, format].forEach((control) => control.addEventListener("input", render));

  function render() {
    const ctx = canvas.getContext("2d");
    if (!sourceImage) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      info.textContent = imageToolMessage();
      download.classList.remove("is-ready");
      return;
    }
    const targetWidth = Math.min(sourceImage.width, Math.max(64, Number(maxWidth.value || sourceImage.width)));
    const targetHeight = Math.round(targetWidth / (sourceImage.width / sourceImage.height));
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
    const dataUrl = canvas.toDataURL(format.value, Number(quality.value || 0.8));
    const estimatedBytes = Math.round((dataUrl.length - dataUrl.indexOf(",") - 1) * 0.75);
    download.href = dataUrl;
    download.download = `compressed-image.${extensionFromMime(format.value)}`;
    download.classList.add("is-ready");
    const original = sourceFile ? sourceFile.size : 0;
    const saved = original ? Math.max(0, Math.round((1 - estimatedBytes / original) * 100)) : 0;
    info.textContent = `원본 ${formatBytes(original)} · 결과 약 ${formatBytes(estimatedBytes)} · 절감 ${saved}%`;
  }
}

function initImageConverter() {
  const input = $("#convertInput");
  if (!input) return;
  const format = $("#convertFormat");
  const quality = $("#convertQuality");
  const canvas = $("#convertCanvas");
  const download = $("#convertDownload");
  const status = document.createElement("p");
  status.className = "helper tool-status";
  download.after(status);
  let sourceImage = null;

  input.addEventListener("change", () => loadImageFromInput(input, (image) => {
    sourceImage = image;
    render();
  }));
  $("#convertRun").addEventListener("click", render);
  [format, quality].forEach((control) => control.addEventListener("input", render));

  function render() {
    const ctx = canvas.getContext("2d");
    if (!sourceImage) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      status.textContent = imageToolMessage();
      download.classList.remove("is-ready");
      return;
    }
    canvas.width = sourceImage.width;
    canvas.height = sourceImage.height;
    if (format.value === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(sourceImage, 0, 0);
    download.href = canvas.toDataURL(format.value, Number(quality.value || 0.9));
    download.download = `converted-image.${extensionFromMime(format.value)}`;
    download.classList.add("is-ready");
    status.textContent = IS_EN ? "Converted image is ready." : "\uBCC0\uD658\uB41C \uC774\uBBF8\uC9C0\uAC00 \uC900\uBE44\uB418\uC5C8\uC2B5\uB2C8\uB2E4.";
  }
}

function initThumbnailMaker() {
  const input = $("#thumbInput");
  if (!input) return;
  const preset = $("#thumbPreset");
  const fit = $("#thumbFit");
  const bg = $("#thumbBg");
  const canvas = $("#thumbCanvas");
  const download = $("#thumbDownload");
  const status = document.createElement("p");
  status.className = "helper tool-status";
  download.after(status);
  let sourceImage = null;

  input.addEventListener("change", () => loadImageFromInput(input, (image) => {
    sourceImage = image;
    render();
  }));
  $("#thumbRun").addEventListener("click", render);
  [preset, fit, bg].forEach((control) => control.addEventListener("input", render));

  function render() {
    const [width, height] = preset.value.split("x").map(Number);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bg.value;
    ctx.fillRect(0, 0, width, height);
    if (!sourceImage) {
      status.textContent = imageToolMessage();
      download.classList.remove("is-ready");
      return;
    }
    drawImageFit(ctx, sourceImage, width, height, fit.value, bg.value);
    download.href = canvas.toDataURL("image/png");
    download.download = `thumbnail-${width}x${height}.png`;
    download.classList.add("is-ready");
    status.textContent = IS_EN ? "Thumbnail is ready." : "\uC378\uB124\uC77C\uC774 \uC900\uBE44\uB418\uC5C8\uC2B5\uB2C8\uB2E4.";
  }

  render();
}

function initGradientGenerator() {
  const first = $("#gradientA");
  if (!first) return;
  const second = $("#gradientB");
  const direction = $("#gradientDirection");
  const preview = $("#gradientPreview");
  const css = $("#gradientCss");

  function render() {
    const value = `linear-gradient(${direction.value}, ${first.value}, ${second.value})`;
    preview.style.background = value;
    css.value = `background: ${value};`;
  }

  [first, second, direction].forEach((control) => control.addEventListener("input", render));
  $("#copyGradient").addEventListener("click", async () => {
    css.select();
    try {
      await navigator.clipboard.writeText(css.value);
    } catch {
      document.execCommand("copy");
    }
  });
  render();
}

function initColorPalette() {
  const base = $("#paletteBase");
  if (!base) return;
  const grid = $("#paletteGrid");

  function render() {
    const hsl = rgbToHsl(...Object.values(hexToRgb(base.value)));
    const colors = [
      ["Base", hslToHex(hsl.h, hsl.s, hsl.l)],
      ["Soft", hslToHex(hsl.h, Math.max(18, hsl.s - 24), Math.min(92, hsl.l + 22))],
      ["Dark", hslToHex(hsl.h, hsl.s, Math.max(18, hsl.l - 24))],
      ["Accent", hslToHex((hsl.h + 35) % 360, hsl.s, hsl.l)],
      ["Complement", hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)]
    ];
    grid.innerHTML = "";
    colors.forEach(([label, color]) => {
      const item = document.createElement("button");
      item.className = "palette-swatch";
      item.type = "button";
      item.style.background = color;
      item.innerHTML = `<span>${label}</span><strong>${color}</strong>`;
      item.addEventListener("click", () => navigator.clipboard?.writeText(color));
      grid.append(item);
    });
  }

  base.addEventListener("input", render);
  render();
}

function initFaviconGenerator() {
  const input = $("#faviconInput");
  if (!input) return;
  const bg = $("#faviconBg");
  const output = $("#faviconOutput");
  let sourceImage = null;

  input.addEventListener("change", () => loadImageFromInput(input, (image) => {
    sourceImage = image;
    render();
  }));
  $("#faviconRun").addEventListener("click", render);
  bg.addEventListener("input", render);

  function render() {
    output.innerHTML = "";
    if (!sourceImage) {
      output.innerHTML = '<div class="note-box">이미지를 선택하세요.</div>';
      return;
    }
    [32, 180, 192, 512].forEach((size) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      drawImageFit(canvas.getContext("2d"), sourceImage, size, size, "contain", bg.value);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `icon-${size}.png`;
      link.append(canvas);
      link.append(`${size}x${size} 저장`);
      output.append(link);
    });
  }

  render();
}

function hslToHex(h, s, l) {
  const saturation = s / 100;
  const lightness = l / 100;
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lightness - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return `#${[r, g, b].map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit ? 1 : 0)} ${units[unit]}`;
}
