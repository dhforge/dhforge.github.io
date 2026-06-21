"use strict";

const PAGE = document.body.dataset.tool || "home";
const LANG = document.documentElement.lang || "ko";

const TEXT = {
  ko: {
    regenerate: "새로 만들기",
    print: "인쇄/PDF 저장",
    reset: "기본값",
    name: "Kids Practice Lab",
    note: "가정과 교실에서 바로 출력해 쓰는 무료 연습지입니다.",
    answer: "정답",
    noAnswer: "정답 없음"
  },
  en: {
    regenerate: "Generate",
    print: "Print / save PDF",
    reset: "Reset",
    name: "Kids Practice Lab",
    note: "Free printable practice sheets for home and classroom use.",
    answer: "Answer",
    noAnswer: "No answer"
  }
};

const t = TEXT[LANG] || TEXT.ko;

function trackKidsEvent(action, detail = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "tool_use", {
    tool_site: "kids-practice-lab",
    tool_name: PAGE,
    tool_action: action,
    ...detail
  });
}

function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(count) {
  return Array.from({ length: count }, (_, index) => index);
}

function getValue(id, fallback = "") {
  const el = document.getElementById(id);
  return el ? el.value : fallback;
}

function sheet(title, note, body) {
  const nameLabel = LANG === "ko" ? "이름" : "Name";
  const dateLabel = LANG === "ko" ? "날짜" : "Date";
  return `
    <article class="worksheet">
      <h2>${escapeHtml(title)}</h2>
      <p class="sheet-note">${escapeHtml(note)}</p>
      <div class="sheet-meta">
        <span>${nameLabel}: __________________</span>
        <span>${dateLabel}: __________________</span>
      </div>
      ${body}
    </article>
  `;
}

function traceRows(items, options = {}) {
  const copyCells = options.copyCells ?? 3;
  const blankCells = options.blankCells ?? 2;
  const cells = copyCells + blankCells;
  return `<div class="trace-grid">${items.map((item) => {
    const safe = escapeHtml(item);
    const practiceCells = range(cells).map((index) => `
      <div class="trace-cell ${index >= copyCells ? "is-blank" : ""}">
        <span class="trace-guide top"></span>
        <span class="trace-guide mid"></span>
        <span class="trace-guide base"></span>
        ${index < copyCells ? `<span class="trace-ghost">${safe}</span>` : ""}
      </div>
    `).join("");
    return `
      <div class="trace-row">
        <div class="trace-symbol">${safe}</div>
        <div class="trace-cells" aria-label="${safe} tracing practice">${practiceCells}</div>
      </div>
    `;
  }).join("")}</div>`;
}

function renderNumberTracing() {
  const start = clampNumber(getValue("startNumber", 1), 0, 50, 1);
  const end = clampNumber(getValue("endNumber", 10), start, 100, 10);
  const items = range(end - start + 1).map((index) => String(start + index));
  return sheet(
    LANG === "ko" ? "숫자 따라쓰기" : "Number Tracing",
    LANG === "ko" ? "숫자를 보고 천천히 따라 써 보세요." : "Look at each number and trace it slowly.",
    traceRows(items)
  );
}

function renderAlphabetTracing() {
  const mode = getValue("letterMode", "upper");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const items = letters.map((letter) => {
    if (mode === "lower") return letter.toLowerCase();
    if (mode === "both") return `${letter} ${letter.toLowerCase()}`;
    return letter;
  });
  return sheet(
    LANG === "ko" ? "알파벳 따라쓰기" : "Alphabet Tracing",
    LANG === "ko" ? "알파벳 모양을 보고 줄 위에 따라 써 보세요." : "Trace each letter on the practice line.",
    traceRows(items)
  );
}

function renderHangulTracing() {
  const mode = getValue("hangulMode", "consonants");
  const sets = {
    consonants: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    vowels: ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"],
    syllables: ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하"]
  };
  const labels = {
    consonants: LANG === "ko" ? "자음" : "Consonants",
    vowels: LANG === "ko" ? "모음" : "Vowels",
    syllables: LANG === "ko" ? "기본 글자" : "Basic syllables"
  };
  return sheet(
    LANG === "ko" ? `한글 ${labels[mode]} 따라쓰기` : `Korean ${labels[mode]} Tracing`,
    LANG === "ko" ? "한글 모양을 보고 천천히 따라 써 보세요." : "Trace the Korean characters slowly and neatly.",
    traceRows(sets[mode] || sets.consonants)
  );
}

function problemSheet(kind) {
  const max = clampNumber(getValue("maxNumber", 10), 5, 100, 10);
  const count = clampNumber(getValue("problemCount", 20), 6, 40, 20);
  const problems = range(count).map((index) => {
    let a = randInt(1, max);
    let b = randInt(1, max);
    let op = "+";
    if (kind === "subtraction") {
      op = "-";
      if (b > a) [a, b] = [b, a];
    }
    return `<div class="problem"><span>${index + 1}. ${a} ${op} ${b} =</span><span class="answer-line"></span></div>`;
  }).join("");
  return sheet(
    kind === "addition"
      ? (LANG === "ko" ? "덧셈 학습지" : "Addition Worksheet")
      : (LANG === "ko" ? "뺄셈 학습지" : "Subtraction Worksheet"),
    LANG === "ko" ? "문제를 풀고 빈칸에 답을 써 보세요." : "Solve each problem and write the answer.",
    `<div class="problem-grid">${problems}</div>`
  );
}

function renderMultiplicationTable() {
  const table = clampNumber(getValue("tableNumber", 2), 1, 12, 2);
  const mode = getValue("tableMode", "practice");
  const rows = range(12).map((index) => {
    const n = index + 1;
    const answer = table * n;
    return `<div class="problem"><span>${table} × ${n} =</span><span>${mode === "answers" ? answer : '<span class="answer-line"></span>'}</span></div>`;
  }).join("");
  return sheet(
    LANG === "ko" ? `${table}단 구구단` : `${table} Times Table`,
    mode === "answers" ? t.answer : t.noAnswer,
    `<div class="problem-grid">${rows}</div>`
  );
}

function clockSvg(hour, minute) {
  const minuteAngle = minute * 6;
  const hourAngle = ((hour % 12) * 30) + minute * 0.5;
  const hand = (angle, length, width) => {
    const rad = (angle - 90) * Math.PI / 180;
    const x = 70 + Math.cos(rad) * length;
    const y = 70 + Math.sin(rad) * length;
    return `<line x1="70" y1="70" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" stroke="#1b2430" stroke-width="${width}" stroke-linecap="round" />`;
  };
  const marks = range(12).map((index) => {
    const angle = index * 30 - 60;
    const rad = angle * Math.PI / 180;
    const x = 70 + Math.cos(rad) * 52;
    const y = 70 + Math.sin(rad) * 52;
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" font-size="10">${index === 0 ? 12 : index}</text>`;
  }).join("");
  return `<svg viewBox="0 0 140 140" role="img" aria-label="clock">
    <circle cx="70" cy="70" r="64" fill="#fffdf8" stroke="#94a3b8" stroke-width="2" />
    ${marks}
    ${hand(hourAngle, 34, 4)}
    ${hand(minuteAngle, 50, 2)}
    <circle cx="70" cy="70" r="4" fill="#2563eb" />
  </svg>`;
}

function renderClockReading() {
  const count = clampNumber(getValue("clockCount", 6), 2, 10, 6);
  const step = clampNumber(getValue("minuteStep", 15), 5, 30, 15);
  const showAnswers = getValue("clockAnswers", "no") === "yes";
  const clocks = range(count).map(() => {
    const hour = randInt(1, 12);
    const minute = randInt(0, Math.floor(55 / step)) * step;
    const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    return `<div class="clock-item">${clockSvg(hour, minute)}<div>${showAnswers ? label : "____ : ____"}</div></div>`;
  }).join("");
  return sheet(
    LANG === "ko" ? "시계 읽기 학습지" : "Clock Reading Worksheet",
    LANG === "ko" ? "시계를 보고 시간을 써 보세요." : "Look at each clock and write the time.",
    `<div class="clock-grid">${clocks}</div>`
  );
}

function generateMaze(size) {
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => true));
  let x = 0;
  let y = 0;
  grid[y][x] = false;
  while (x < size - 1 || y < size - 1) {
    const choices = [];
    if (x < size - 1) choices.push([x + 1, y]);
    if (y < size - 1) choices.push([x, y + 1]);
    const next = choices[randInt(0, choices.length - 1)];
    x = next[0];
    y = next[1];
    grid[y][x] = false;
  }
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() > 0.35) grid[row][col] = false;
    }
  }
  grid[0][0] = false;
  grid[size - 1][size - 1] = false;

  const cell = Math.floor(500 / size);
  const offsetX = Math.floor((760 - (cell * size)) / 2);
  const offsetY = 38;
  const wallRects = [];
  const guides = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cellX = offsetX + col * cell;
      const cellY = offsetY + row * cell;
      guides.push(`<rect x="${cellX}" y="${cellY}" width="${cell}" height="${cell}" fill="none" stroke="#e5e7eb" stroke-width="1" />`);
      if (grid[row][col]) {
        wallRects.push(`<rect x="${cellX + 2}" y="${cellY + 2}" width="${cell - 4}" height="${cell - 4}" rx="5" fill="#2f3a46" />`);
      }
    }
  }
  const startLabel = LANG === "ko" ? "시작" : "START";
  const endLabel = LANG === "ko" ? "도착" : "END";
  const startCx = offsetX + cell / 2;
  const startCy = offsetY + cell / 2;
  const endCx = offsetX + (size - 0.5) * cell;
  const endCy = offsetY + (size - 0.5) * cell;
  return `<svg viewBox="0 0 760 560" role="img" aria-label="maze worksheet">
    <rect width="760" height="560" fill="#fffdf8" />
    <rect x="${offsetX - 12}" y="${offsetY - 12}" width="${cell * size + 24}" height="${cell * size + 24}" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
    ${guides.join("")}
    ${wallRects.join("")}
    <circle cx="${startCx}" cy="${startCy}" r="${Math.max(10, cell * 0.28)}" fill="#e8f6ef" stroke="#2f6f73" stroke-width="3" />
    <text x="${startCx}" y="${startCy + 4}" text-anchor="middle" font-size="${Math.max(10, cell * 0.28)}" font-weight="800" fill="#214f52">${startLabel}</text>
    <circle cx="${endCx}" cy="${endCy}" r="${Math.max(10, cell * 0.28)}" fill="#fff2df" stroke="#e28b43" stroke-width="3" />
    <text x="${endCx}" y="${endCy + 4}" text-anchor="middle" font-size="${Math.max(10, cell * 0.28)}" font-weight="800" fill="#8a4d1f">${endLabel}</text>
  </svg>`;
}

function renderMaze() {
  const size = clampNumber(getValue("mazeSize", 12), 8, 18, 12);
  return sheet(
    LANG === "ko" ? "미로 찾기" : "Printable Maze",
    LANG === "ko" ? "시작점에서 끝까지 길을 찾아보세요." : "Find a path from start to end.",
    `<div class="maze-wrap">${generateMaze(size)}</div>`
  );
}

function renderLineTracing() {
  const pattern = getValue("linePattern", "waves");
  const rows = {
    straight: [
      "M90 95 H680",
      "M90 185 H680",
      "M90 275 H680",
      "M90 365 H680",
      "M90 455 H680"
    ],
    waves: [
      "M90 95 C150 35 210 155 270 95 S390 35 450 95 S570 155 680 95",
      "M90 185 C150 125 210 245 270 185 S390 125 450 185 S570 245 680 185",
      "M90 275 C150 215 210 335 270 275 S390 215 450 275 S570 335 680 275",
      "M90 365 C150 305 210 425 270 365 S390 305 450 365 S570 425 680 365",
      "M90 455 C150 395 210 515 270 455 S390 395 450 455 S570 515 680 455"
    ],
    shapes: [
      "M115 115 H250 V250 H115 Z",
      "M370 115 C465 45 585 100 565 215 C550 305 395 300 365 210 C345 160 340 135 370 115",
      "M135 425 L245 300 L355 425 Z",
      "M465 315 L620 315 L675 425 L520 425 Z"
    ]
  };
  const selected = rows[pattern] || rows.waves;
  const paths = selected.map((d) => `<path d="${d}" fill="none" stroke="#2f3a46" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 18" />`).join("");
  const startDots = selected.map((d) => {
    const match = d.match(/M(\d+) (\d+)/);
    if (!match) return "";
    return `<circle cx="${match[1]}" cy="${match[2]}" r="8" fill="#e28b43" />`;
  }).join("");
  return sheet(
    LANG === "ko" ? "선 긋기 연습지" : "Line Tracing Practice",
    LANG === "ko" ? "주황색 점에서 시작해 점선을 천천히 따라 그려 보세요." : "Start at each orange dot and trace the dotted line slowly.",
    `<div class="line-wrap"><svg viewBox="0 0 760 560" role="img" aria-label="line tracing worksheet"><rect width="760" height="560" fill="#fffdf8"/><g opacity="0.42"><path d="M55 50 H705 M55 140 H705 M55 230 H705 M55 320 H705 M55 410 H705 M55 500 H705" stroke="#d7dfe8" stroke-width="1"/></g>${paths}${startDots}</svg></div>`
  );
}

function renderColoringPage() {
  const theme = getValue("colorTheme", "garden");
  const svgs = {
    garden: '<circle cx="150" cy="160" r="46"/><circle cx="108" cy="116" r="30"/><circle cx="192" cy="116" r="30"/><circle cx="102" cy="200" r="30"/><circle cx="198" cy="200" r="30"/><circle cx="150" cy="160" r="18"/><line x1="150" y1="218" x2="150" y2="430"/><path d="M150 305 C85 255 65 335 142 350"/><path d="M150 335 C235 275 258 365 160 385"/><path d="M380 425 C445 270 575 270 640 425 Z"/><path d="M420 425 C460 330 560 330 600 425"/><circle cx="505" cy="238" r="44"/><circle cx="590" cy="135" r="34"/><path d="M590 80 V190 M535 135 H645"/>',
    space: '<circle cx="160" cy="145" r="66"/><circle cx="132" cy="125" r="10"/><circle cx="190" cy="165" r="14"/><circle cx="155" cy="185" r="7"/><path d="M390 392 C350 260 392 145 500 82 C608 145 650 260 610 392 Z"/><circle cx="500" cy="190" r="35"/><path d="M440 392 L390 482 L500 432 L610 482 L560 392 Z"/><path d="M455 300 H545"/><path d="M82 430 L150 365 L220 430 L292 365 L360 430"/><polygon points="645,100 660,132 694,137 670,162 676,196 645,179 614,196 620,162 596,137 630,132"/><circle cx="665" cy="300" r="38"/><path d="M615 300 C645 276 685 276 715 300"/>',
    shapes: '<rect x="80" y="80" width="150" height="150" rx="18"/><line x1="105" y1="130" x2="205" y2="130"/><line x1="105" y1="180" x2="205" y2="180"/><circle cx="390" cy="155" r="80"/><circle cx="390" cy="155" r="38"/><polygon points="595,75 700,230 490,230"/><line x1="595" y1="75" x2="595" y2="230"/><path d="M120 370 C170 290 260 300 310 370 C250 470 170 470 120 370 Z"/><path d="M150 370 C185 335 240 340 280 375"/><rect x="420" y="310" width="220" height="130" rx="65"/><line x1="465" y1="350" x2="595" y2="350"/><line x1="465" y1="395" x2="595" y2="395"/>'
  };
  return sheet(
    LANG === "ko" ? "색칠 도안" : "Coloring Page",
    LANG === "ko" ? "선 안쪽을 자유롭게 색칠해 보세요." : "Color inside the outlines.",
    `<div class="coloring-wrap"><svg viewBox="0 0 760 560" role="img" aria-label="coloring worksheet"><rect width="760" height="560" fill="#fffdf8"/><rect x="34" y="34" width="692" height="492" rx="22" fill="#fff" stroke="#d7dfe8" stroke-width="3"/><g fill="none" stroke="#1b2430" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${svgs[theme] || svgs.garden}</g></svg></div>`
  );
}

const renderers = {
  "number-tracing": renderNumberTracing,
  "alphabet-tracing": renderAlphabetTracing,
  "hangul-tracing": renderHangulTracing,
  "addition-worksheet": () => problemSheet("addition"),
  "subtraction-worksheet": () => problemSheet("subtraction"),
  "multiplication-table": renderMultiplicationTable,
  "clock-reading": renderClockReading,
  "maze": renderMaze,
  "line-tracing": renderLineTracing,
  "coloring-page": renderColoringPage
};

function render() {
  const preview = document.getElementById("worksheetPreview");
  if (!preview || !renderers[PAGE]) return;
  preview.innerHTML = renderers[PAGE]();
  trackKidsEvent("generate");
}

function bindControls() {
  const preview = document.getElementById("worksheetPreview");
  if (!preview) return;
  document.querySelectorAll("[data-generate]").forEach((button) => button.addEventListener("click", render));
  document.querySelectorAll("[data-print]").forEach((button) => button.addEventListener("click", () => {
    trackKidsEvent("print");
    window.print();
  }));
  document.querySelectorAll(".tool-card input, .tool-card select, .tool-card textarea").forEach((field) => {
    field.addEventListener("change", render);
  });
  render();
}

bindControls();
