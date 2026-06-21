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
  const path = [];
  let x = 0;
  let y = 0;
  grid[y][x] = false;
  path.push([x, y]);
  while (x < size - 1 || y < size - 1) {
    const choices = [];
    if (x < size - 1) choices.push([x + 1, y]);
    if (y < size - 1) choices.push([x, y + 1]);
    const next = choices[randInt(0, choices.length - 1)];
    x = next[0];
    y = next[1];
    grid[y][x] = false;
    path.push([x, y]);
  }
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() > 0.35) grid[row][col] = false;
    }
  }
  const cell = 26;
  const rects = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col]) rects.push(`<rect x="${col * cell}" y="${row * cell}" width="${cell}" height="${cell}" fill="#1b2430" />`);
    }
  }
  return `<svg viewBox="0 0 ${size * cell} ${size * cell}">
    <rect width="${size * cell}" height="${size * cell}" fill="#fffdf8" />
    ${rects.join("")}
    <text x="4" y="18" font-size="12" fill="#16a34a">START</text>
    <text x="${size * cell - 42}" y="${size * cell - 8}" font-size="12" fill="#2563eb">END</text>
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
  const paths = {
    straight: "M30 80 H700 M30 170 H700 M30 260 H700 M30 350 H700 M30 440 H700",
    waves: "M30 80 C120 20 180 140 270 80 S430 140 520 80 S650 20 720 80 M30 190 C120 130 180 250 270 190 S430 250 520 190 S650 130 720 190 M30 300 C120 240 180 360 270 300 S430 360 520 300 S650 240 720 300 M30 410 C120 350 180 470 270 410 S430 470 520 410 S650 350 720 410",
    shapes: "M80 90 H220 V230 H80 Z M310 90 C410 20 520 70 520 180 C520 290 350 290 320 190 C300 140 280 120 310 90 M130 360 L220 250 L310 360 Z M430 260 L560 260 L610 360 L480 360 Z"
  };
  return sheet(
    LANG === "ko" ? "선 긋기 연습지" : "Line Tracing Practice",
    LANG === "ko" ? "점선을 따라 선과 도형을 그려 보세요." : "Trace the dotted lines and shapes.",
    `<div class="line-wrap"><svg viewBox="0 0 760 560"><rect width="760" height="560" fill="#fffdf8"/><path d="${paths[pattern] || paths.waves}" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 14"/></svg></div>`
  );
}

function renderColoringPage() {
  const theme = getValue("colorTheme", "garden");
  const svgs = {
    garden: '<circle cx="150" cy="170" r="55"/><circle cx="105" cy="130" r="35"/><circle cx="195" cy="130" r="35"/><circle cx="105" cy="210" r="35"/><circle cx="195" cy="210" r="35"/><line x1="150" y1="225" x2="150" y2="410"/><path d="M150 305 C90 260 70 330 140 345"/><path d="M150 330 C230 280 250 360 160 370"/><path d="M390 390 C450 260 560 260 620 390 Z"/><circle cx="500" cy="250" r="45"/>',
    space: '<circle cx="170" cy="150" r="70"/><circle cx="145" cy="130" r="10"/><circle cx="190" cy="165" r="14"/><path d="M390 390 C350 260 390 145 500 85 C610 145 650 260 610 390 Z"/><circle cx="500" cy="190" r="35"/><path d="M440 390 L390 480 L500 430 L610 480 L560 390 Z"/><path d="M80 420 L150 360 L220 420 L290 360 L360 420"/><polygon points="645,105 660,135 693,140 670,162 675,195 645,178 615,195 620,162 597,140 630,135"/>',
    shapes: '<rect x="80" y="80" width="150" height="150" rx="18"/><circle cx="390" cy="155" r="80"/><polygon points="595,75 700,230 490,230"/><path d="M120 370 C170 290 260 300 310 370 C250 470 170 470 120 370 Z"/><rect x="420" y="310" width="220" height="130" rx="65"/>'
  };
  return sheet(
    LANG === "ko" ? "색칠 도안" : "Coloring Page",
    LANG === "ko" ? "선 안쪽을 자유롭게 색칠해 보세요." : "Color inside the outlines.",
    `<div class="coloring-wrap"><svg viewBox="0 0 760 560"><rect width="760" height="560" fill="#fffdf8"/><g fill="none" stroke="#1b2430" stroke-width="5" stroke-linejoin="round">${svgs[theme] || svgs.garden}</g></svg></div>`
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
