"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  initStructuredData();
  initNavigation();
  initCharCounter();
  initDateCalculator();
  initUnitConverter();
  initRandomPicker();
  initQrGenerator();
  initTextCleaner();
  initColorTool();
  initTimerTool();
  initRatioTool();
  initImageResizer();
});

function initStructuredData() {
  const canonical = document.querySelector('link[rel="canonical"]');
  const description = document.querySelector('meta[name="description"]');
  const url = canonical ? canonical.href : location.href;
  const title = document.title.replace(" - 무료 도구함", "");
  const path = new URL(url).pathname;
  const isHome = path === "/" || path === "/index.html";
  const graph = [
    {
      "@type": "WebSite",
      "@id": "https://dhforge.github.io/#website",
      "url": "https://dhforge.github.io/",
      "name": "무료 도구함",
      "inLanguage": "ko-KR"
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
      "inLanguage": "ko-KR"
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
          "name": "무료 도구함",
          "item": "https://dhforge.github.io/"
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
    readTime.textContent = seconds < 60 ? `${seconds}초` : `${Math.ceil(seconds / 60)}분`;
  }

  input.addEventListener("input", update);
  update();
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
      diffResult.textContent = "날짜를 선택하세요.";
      return;
    }
    const startDate = parseDateInput(start.value);
    const endDate = parseDateInput(end.value);
    const diff = Math.round((endDate - startDate) / 86400000);
    const abs = Math.abs(diff);
    diffResult.textContent = diff >= 0
      ? `${start.value}부터 ${end.value}까지 ${abs.toLocaleString()}일 차이입니다. 시작일을 포함하면 ${(abs + 1).toLocaleString()}일입니다.`
      : `${end.value}가 ${start.value}보다 ${abs.toLocaleString()}일 빠릅니다.`;
  }

  function updateOffset() {
    if (!base.value) {
      offsetResult.textContent = "기준일을 선택하세요.";
      return;
    }
    const count = Number(offset.value || 0);
    const result = addDays(parseDateInput(base.value), count);
    offsetResult.textContent = `${base.value}에서 ${count.toLocaleString()}일 ${count >= 0 ? "후" : "전"} 날짜는 ${toDateInput(result)}입니다.`;
  }

  [start, end].forEach((input) => input.addEventListener("input", updateDiff));
  [base, offset].forEach((input) => input.addEventListener("input", updateOffset));
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
  const unitGroups = {
    length: {
      label: "길이",
      base: "m",
      units: {
        mm: { label: "밀리미터", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        cm: { label: "센티미터", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
        m: { label: "미터", toBase: (v) => v, fromBase: (v) => v },
        km: { label: "킬로미터", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        in: { label: "인치", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        ft: { label: "피트", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 }
      }
    },
    weight: {
      label: "무게",
      base: "kg",
      units: {
        g: { label: "그램", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        kg: { label: "킬로그램", toBase: (v) => v, fromBase: (v) => v },
        t: { label: "톤", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        oz: { label: "온스", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
        lb: { label: "파운드", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 }
      }
    },
    temperature: {
      label: "온도",
      base: "c",
      units: {
        c: { label: "섭씨", toBase: (v) => v, fromBase: (v) => v },
        f: { label: "화씨", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
        k: { label: "켈빈", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
      }
    },
    area: {
      label: "면적",
      base: "sqm",
      units: {
        sqm: { label: "제곱미터", toBase: (v) => v, fromBase: (v) => v },
        pyeong: { label: "평", toBase: (v) => v * 3.305785, fromBase: (v) => v / 3.305785 },
        sqft: { label: "제곱피트", toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
        acre: { label: "에이커", toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 }
      }
    }
  };

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
  fillUnits();
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
    const list = getItems();
    result.textContent = list.length ? `선택 결과: ${list[Math.floor(Math.random() * list.length)]}` : "항목을 입력하세요.";
  });

  $("#shuffleItems").addEventListener("click", () => {
    const list = shuffled(getItems());
    items.value = list.join("\n");
    result.textContent = list.length ? "목록을 섞었습니다." : "항목을 입력하세요.";
  });

  $("#makeTeams").addEventListener("click", () => {
    const list = shuffled(getItems());
    const count = Math.max(2, Math.min(20, Number(teamCount.value || 2)));
    if (!list.length) {
      result.textContent = "항목을 입력하세요.";
      return;
    }
    const teams = Array.from({ length: count }, () => []);
    list.forEach((item, index) => teams[index % count].push(item));
    result.textContent = teams.map((team, index) => `${index + 1}팀: ${team.join(", ") || "-"}`).join("\n");
  });

  $("#pickNumber").addEventListener("click", () => {
    const min = Math.ceil(Number(rangeMin.value || 0));
    const max = Math.floor(Number(rangeMax.value || 0));
    if (min > max) {
      result.textContent = "최소값이 최대값보다 클 수 없습니다.";
      return;
    }
    const picked = Math.floor(Math.random() * (max - min + 1)) + min;
    result.textContent = `번호 추첨 결과: ${picked}`;
  });
}

function initQrGenerator() {
  const text = $("#qrText");
  if (!text) return;
  const canvas = $("#qrCanvas");
  const download = $("#downloadQr");

  text.value = "https://example.com";

  function render() {
    try {
      const matrix = createQrMatrix(text.value || " ");
      drawQr(canvas, matrix);
    } catch (error) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9b5a00";
      ctx.font = "14px Arial";
      ctx.fillText("입력이 너무 깁니다.", 80, 140);
    }
  }

  $("#makeQr").addEventListener("click", render);
  text.addEventListener("input", render);
  download.addEventListener("click", () => {
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

  function setOutput(value) {
    output.value = value;
  }

  $$("[data-clean]").forEach((button) => {
    button.addEventListener("click", () => {
      const text = input.value;
      const lines = text.split(/\r?\n/);
      switch (button.dataset.clean) {
        case "trim-lines":
          setOutput(lines.map((line) => line.trim()).join("\n"));
          break;
        case "remove-empty":
          setOutput(lines.filter((line) => line.trim()).join("\n"));
          break;
        case "dedupe":
          setOutput([...new Set(lines)].join("\n"));
          break;
        case "collapse-space":
          setOutput(text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim());
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

  function updateFromHex(hex) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
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
      ["검정 글자 대비", `${blackContrast.toFixed(2)}:1`],
      ["흰색 글자 대비", `${whiteContrast.toFixed(2)}:1`]
    ].forEach(([label, value]) => {
      const item = document.createElement("output");
      item.className = "result-item";
      item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      results.append(item);
    });
  }

  colorInput.addEventListener("input", () => updateFromHex(colorInput.value));
  hexInput.addEventListener("input", () => updateFromHex(hexInput.value.trim()));
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

  $("#timerStart").addEventListener("click", () => {
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
    clearInterval(timerId);
    timerId = null;
  });

  $("#timerReset").addEventListener("click", () => {
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
    if (stopwatchId) {
      stopwatchElapsed += Date.now() - stopwatchStart;
      clearInterval(stopwatchId);
      stopwatchId = null;
      $("#stopwatchStart").textContent = "시작";
      renderStopwatch();
      return;
    }
    stopwatchStart = Date.now();
    stopwatchId = window.setInterval(renderStopwatch, 100);
    $("#stopwatchStart").textContent = "정지";
  });

  $("#stopwatchLap").addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = stopwatchDisplay.textContent;
    lapList.prepend(li);
  });

  $("#stopwatchReset").addEventListener("click", () => {
    clearInterval(stopwatchId);
    stopwatchId = null;
    stopwatchElapsed = 0;
    lapList.innerHTML = "";
    $("#stopwatchStart").textContent = "시작";
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
  let sourceImage = null;
  let sourceRatio = 1;

  fileInput.addEventListener("change", () => {
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

  $("#resizeImage").addEventListener("click", drawResizedImage);
  format.addEventListener("change", drawResizedImage);

  function drawResizedImage() {
    const ctx = canvas.getContext("2d");
    if (!sourceImage) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#607080";
      ctx.font = "14px Arial";
      ctx.fillText("이미지를 선택하세요.", 92, 112);
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
  }

  drawResizedImage();
}
