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
    note: "Practice sheets for short home or classroom sessions.",
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
    <circle cx="70" cy="70" r="4" fill="#2f6f73" />
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
  const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => ({
    visited: false,
    walls: { top: true, right: true, bottom: true, left: true }
  })));
  const stack = [[0, 0]];
  cells[0][0].visited = true;

  while (stack.length) {
    const current = stack[stack.length - 1];
    const [x, y] = current;
    const neighbors = [
      [x, y - 1, "top", "bottom"],
      [x + 1, y, "right", "left"],
      [x, y + 1, "bottom", "top"],
      [x - 1, y, "left", "right"]
    ].filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < size && ny < size && !cells[ny][nx].visited);

    if (!neighbors.length) {
      stack.pop();
      continue;
    }

    const [nx, ny, wall, opposite] = neighbors[randInt(0, neighbors.length - 1)];
    cells[y][x].walls[wall] = false;
    cells[ny][nx].walls[opposite] = false;
    cells[ny][nx].visited = true;
    stack.push([nx, ny]);
  }

  cells[0][0].walls.top = false;
  cells[size - 1][size - 1].walls.bottom = false;

  const cell = Math.floor(620 / size);
  const offsetX = Math.floor((760 - (cell * size)) / 2);
  const offsetY = 38;
  const guides = [];
  const walls = [];

  function line(x1, y1, x2, y2) {
    walls.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`);
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cellX = offsetX + col * cell;
      const cellY = offsetY + row * cell;
      guides.push(`<rect x="${cellX}" y="${cellY}" width="${cell}" height="${cell}" />`);
      const { walls: cellWalls } = cells[row][col];
      if (cellWalls.top) line(cellX, cellY, cellX + cell, cellY);
      if (cellWalls.right) line(cellX + cell, cellY, cellX + cell, cellY + cell);
      if (cellWalls.bottom) line(cellX, cellY + cell, cellX + cell, cellY + cell);
      if (cellWalls.left) line(cellX, cellY, cellX, cellY + cell);
    }
  }
  const startLegend = LANG === "ko" ? "S: 시작" : "S: Start";
  const endLegend = LANG === "ko" ? "E: 도착" : "E: End";
  const startCx = offsetX + cell / 2;
  const startCy = offsetY + cell / 2;
  const endCx = offsetX + (size - 0.5) * cell;
  const endCy = offsetY + (size - 0.5) * cell;
  const markRadius = Math.max(8, cell * 0.28);
  const markFont = Math.max(11, cell * 0.34);
  return `<svg viewBox="0 0 760 720" role="img" aria-label="maze worksheet" class="maze-svg">
    <rect width="760" height="720" fill="#fffdf8" />
    <rect x="${offsetX - 16}" y="${offsetY - 16}" width="${cell * size + 32}" height="${cell * size + 32}" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <g fill="none" stroke="#edf2f7" stroke-width="1">${guides.join("")}</g>
    <g fill="none" stroke="#1f2933" stroke-width="${Math.max(3, cell * 0.09)}" stroke-linecap="square">${walls.join("")}</g>
    <circle cx="${startCx}" cy="${startCy}" r="${markRadius}" fill="#e8f6ef" stroke="#2f6f73" stroke-width="2" />
    <text x="${startCx}" y="${startCy + markFont * 0.36}" text-anchor="middle" font-size="${markFont}" font-weight="800" fill="#214f52">S</text>
    <circle cx="${endCx}" cy="${endCy}" r="${markRadius}" fill="#fff2df" stroke="#e28b43" stroke-width="2" />
    <text x="${endCx}" y="${endCy + markFont * 0.36}" text-anchor="middle" font-size="${markFont}" font-weight="800" fill="#8a4d1f">E</text>
    <text x="${offsetX}" y="${offsetY + cell * size + 50}" font-size="18" font-weight="800" fill="#214f52">${startLegend}</text>
    <text x="${offsetX + 116}" y="${offsetY + cell * size + 50}" font-size="18" font-weight="800" fill="#8a4d1f">${endLegend}</text>
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
  const yRows = range(10).map((index) => 72 + index * 62);
  const rows = {
    straight: yRows.map((y) => `M70 ${y} H690`),
    waves: yRows.map((y) => `M70 ${y} C120 ${y - 46} 170 ${y + 46} 220 ${y} S320 ${y - 46} 370 ${y} S470 ${y + 46} 520 ${y} S620 ${y - 46} 690 ${y}`),
    shapes: [
      "M88 88 H206 V206 H88 Z",
      "M300 92 C360 42 444 92 414 166 C398 216 322 216 306 166 C292 126 276 112 300 92",
      "M560 84 L668 204 H452 Z",
      "M104 322 C146 274 214 274 256 322 C214 370 146 370 104 322 Z",
      "M370 255 L430 315 L370 375 L310 315 Z",
      "M522 264 H655 V372 H522 Z",
      "M90 510 C120 456 192 456 222 510 S324 564 354 510 S456 456 486 510 S588 564 670 510",
      "M130 632 L196 560 L262 632 L328 560 L394 632 L460 560 L526 632 L592 560 L658 632"
    ]
  };
  const selected = rows[pattern] || rows.waves;
  const paths = selected.map((d) => `<path d="${d}" fill="none" stroke="#2f3a46" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 16" />`).join("");
  const startDots = selected.map((d) => {
    const match = d.match(/M(\d+) (\d+)/);
    if (!match) return "";
    return `<circle cx="${match[1]}" cy="${match[2]}" r="8" fill="#e28b43" />`;
  }).join("");
  return sheet(
    LANG === "ko" ? "선 긋기 연습지" : "Line Tracing Practice",
    LANG === "ko" ? "주황색 점에서 시작해 점선을 천천히 따라 그려 보세요." : "Start at each orange dot and trace the dotted line slowly.",
    `<div class="line-wrap"><svg viewBox="0 0 760 700" role="img" aria-label="line tracing worksheet"><rect width="760" height="700" fill="#fffdf8"/><g opacity="0.42">${range(10).map((index) => `<path d="M55 ${72 + index * 62} H705" stroke="#d7dfe8" stroke-width="1"/>`).join("")}</g>${paths}${startDots}</svg></div>`
  );
}

function renderColoringPage() {
  const theme = getValue("colorTheme", "garden");
  const drawingSets = {
    garden: [
      '<circle cx="150" cy="88" r="26"/><circle cx="122" cy="62" r="18"/><circle cx="178" cy="62" r="18"/><circle cx="118" cy="116" r="18"/><circle cx="182" cy="116" r="18"/><circle cx="150" cy="88" r="10"/><line x1="150" y1="122" x2="150" y2="210"/><path d="M150 160 C110 132 92 178 142 186"/><path d="M150 178 C206 140 226 196 158 206"/>',
      '<path d="M150 120 C92 48 36 92 76 154 C106 200 142 174 150 120 Z"/><path d="M150 120 C208 48 264 92 224 154 C194 200 158 174 150 120 Z"/><path d="M150 124 C112 158 72 210 118 232 C148 246 158 176 150 124 Z"/><path d="M150 124 C188 158 228 210 182 232 C152 246 142 176 150 124 Z"/><line x1="150" y1="78" x2="150" y2="224"/><circle cx="135" cy="92" r="7"/><circle cx="165" cy="92" r="7"/>',
      '<path d="M150 50 C88 72 84 152 132 170 C92 182 100 240 150 236 C200 240 208 182 168 170 C216 152 212 72 150 50 Z"/><rect x="132" y="172" width="36" height="66" rx="8"/><path d="M132 198 C95 188 78 218 58 242"/><path d="M168 198 C205 188 222 218 242 242"/>',
      '<path d="M70 184 C108 112 190 112 230 184 C198 228 104 228 70 184 Z"/><circle cx="102" cy="168" r="10"/><path d="M232 182 C264 158 260 124 230 112"/><path d="M232 182 C270 192 270 226 236 236"/><path d="M118 218 C112 244 142 252 152 224"/><path d="M174 218 C180 244 210 252 198 224"/>'
    ],
    space: [
      '<path d="M150 214 C128 146 144 80 206 42 C268 80 284 146 262 214 Z"/><circle cx="206" cy="104" r="23"/><path d="M172 214 L132 262 L206 234 L280 262 L240 214 Z"/><path d="M182 168 H230"/>',
      '<circle cx="136" cy="126" r="66"/><circle cx="112" cy="104" r="10"/><circle cx="162" cy="146" r="13"/><circle cx="134" cy="168" r="8"/><path d="M36 206 C96 178 176 178 236 206"/>',
      '<circle cx="150" cy="132" r="52"/><circle cx="150" cy="132" r="30"/><rect x="104" y="184" width="92" height="50" rx="18"/><path d="M104 206 H70 M196 206 H230"/><path d="M118 234 L100 270 M182 234 L200 270"/>',
      '<polygon points="150,38 166,82 214,84 176,112 190,158 150,132 110,158 124,112 86,84 134,82"/><circle cx="78" cy="210" r="24"/><circle cx="226" cy="206" r="18"/><path d="M68 262 H232"/>'
    ],
    shapes: [
      '<rect x="62" y="82" width="176" height="126" rx="14"/><polygon points="62,82 150,28 238,82"/><rect x="132" y="146" width="36" height="62"/><circle cx="98" cy="122" r="18"/><circle cx="202" cy="122" r="18"/>',
      '<rect x="92" y="74" width="116" height="132" rx="22"/><circle cx="124" cy="116" r="12"/><circle cx="176" cy="116" r="12"/><path d="M124 164 H176"/><line x1="150" y1="74" x2="150" y2="38"/><circle cx="150" cy="34" r="8"/><path d="M92 138 H54 M208 138 H246"/>',
      '<circle cx="84" cy="96" r="42"/><rect x="156" y="54" width="92" height="84" rx="12"/><polygon points="86,210 150,150 214,210"/><path d="M52 250 H250"/>',
      '<rect x="64" y="122" width="172" height="112" rx="16"/><circle cx="100" cy="234" r="28"/><circle cx="200" cy="234" r="28"/><path d="M84 122 L114 82 H188 L218 122"/><line x1="150" y1="82" x2="150" y2="122"/>'
    ],
    animals: [
      '<circle cx="150" cy="132" r="70"/><polygon points="96,86 114,34 144,78"/><polygon points="204,86 186,34 156,78"/><circle cx="124" cy="124" r="8"/><circle cx="176" cy="124" r="8"/><path d="M150 140 V160 M126 172 C142 184 158 184 174 172"/><path d="M86 150 H32 M92 170 H38 M214 150 H268 M208 170 H262"/>',
      '<path d="M56 156 C100 86 206 86 248 156 C210 222 94 222 56 156 Z"/><circle cx="96" cy="146" r="8"/><path d="M248 156 L286 120 V192 Z"/><path d="M150 104 C168 132 168 180 150 208"/>',
      '<ellipse cx="150" cy="154" rx="84" ry="58"/><circle cx="238" cy="138" r="34"/><path d="M214 118 C196 68 116 68 90 120"/><circle cx="246" cy="130" r="6"/><path d="M86 188 L62 226 M124 206 L116 252 M184 206 L194 252 M226 186 L258 226"/>',
      '<path d="M78 176 C116 84 218 82 242 176 C202 232 122 232 78 176 Z"/><circle cx="134" cy="154" r="8"/><circle cx="188" cy="154" r="8"/><path d="M162 168 C154 182 170 182 162 168"/><path d="M116 104 C98 68 126 50 146 84"/><path d="M208 104 C226 68 198 50 178 84"/>'
    ],
    vehicles: [
      '<rect x="54" y="134" width="192" height="72" rx="18"/><path d="M92 134 L124 90 H184 L222 134"/><circle cx="98" cy="212" r="24"/><circle cx="202" cy="212" r="24"/><line x1="148" y1="90" x2="148" y2="134"/>',
      '<path d="M64 178 H236 L204 234 H96 Z"/><path d="M102 178 C120 120 178 120 198 178"/><line x1="150" y1="70" x2="150" y2="178"/><path d="M150 70 L216 126 H150 Z"/>',
      '<rect x="64" y="118" width="92" height="82" rx="10"/><rect x="156" y="94" width="80" height="106" rx="10"/><circle cx="96" cy="212" r="20"/><circle cx="202" cy="212" r="20"/><path d="M74 94 H132 M50 232 H250"/>',
      '<path d="M44 150 L258 96 L224 154 L258 212 Z"/><path d="M110 132 L94 74 L154 120"/><path d="M110 168 L94 226 L154 180"/><line x1="224" y1="154" x2="44" y2="150"/>'
    ]
  };
  const selected = drawingSets[theme] || drawingSets.garden;
  const slots = [
    [58, 64],
    [402, 64],
    [58, 382],
    [402, 382]
  ];
  const tiles = selected.slice(0, 4).map((art, index) => {
    const [x, y] = slots[index];
    return `<g transform="translate(${x} ${y})">
      <rect width="300" height="260" rx="18" fill="#fff" stroke="#d7dfe8" stroke-width="3" />
      <g transform="translate(0 4)" fill="none" stroke="#1b2430" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${art}</g>
    </g>`;
  }).join("");
  return sheet(
    LANG === "ko" ? "색칠 도안" : "Coloring Page",
    LANG === "ko" ? "선 안쪽을 자유롭게 색칠해 보세요." : "Color inside the outlines.",
    `<div class="coloring-wrap"><svg viewBox="0 0 760 700" role="img" aria-label="coloring worksheet"><rect width="760" height="700" fill="#fffdf8"/>${tiles}</svg></div>`
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
    "name": LANG === "ko" ? "어린이 학습지 목록" : "Kids worksheet directory",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": (item.querySelector("span") || item).textContent.trim(),
      "url": new URL(item.getAttribute("href"), baseUrl).href
    }))
  });
  document.head.appendChild(script);
}

initDirectorySearch();
initDirectoryItemList();
bindControls();
