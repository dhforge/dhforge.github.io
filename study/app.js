"use strict";

const STORE_KEY = "dhforge.study.v1";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = loadState();
const wordBankFilters = { type: "all", level: "all", query: "" };
const practiceFilters = { type: "english", difficulty: "all" };
const WORD_LEVEL_OPTIONS = {
  all: [
    ["all", "전체"],
    ["elementary", "초등"],
    ["middle", "중등"],
    ["high", "고등"],
    ["hanja10", "한자 10급"],
    ["hanja9", "한자 9급"],
    ["hanja8", "한자 8급"],
    ["hanja7", "한자 7급"],
    ["hanja6", "한자 6급"],
    ["hanja5", "한자 5급"],
    ["hanja4", "한자 4급"],
    ["hanja3", "한자 3급"],
    ["hanja2", "한자 2급"],
    ["hanja1", "한자 1급"]
  ],
  english: [
    ["all", "전체"],
    ["elementary", "초등"],
    ["middle", "중등"],
    ["high", "고등"]
  ],
  hanja: [
    ["all", "전체"],
    ["hanja10", "한자 10급"],
    ["hanja9", "한자 9급"],
    ["hanja8", "한자 8급"],
    ["hanja7", "한자 7급"],
    ["hanja6", "한자 6급"],
    ["hanja5", "한자 5급"],
    ["hanja4", "한자 4급"],
    ["hanja3", "한자 3급"],
    ["hanja2", "한자 2급"],
    ["hanja1", "한자 1급"]
  ]
};
let reviewIndex = 0;
let flipped = false;
let practiceWord = null;
let deferredInstallPrompt = null;
let timer = {
  seconds: 25 * 60,
  initial: 25 * 60,
  running: false,
  interval: null
};

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindHeroActions();
  bindInstall();
  bindCards();
  bindWordBank();
  bindReview();
  bindPractice();
  bindTimer();
  bindMistakes();
  bindExams();
  bindBackup();
  registerServiceWorker();
  renderAll();
});

function activateTab(tab) {
  $$(".tab-button").forEach((item) => item.classList.toggle("is-active", item.dataset.tab === tab));
  $$("[data-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === tab));
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    return {
      cards: Array.isArray(parsed.cards) ? parsed.cards : [],
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      exams: Array.isArray(parsed.exams) ? parsed.exams : [],
      focusLog: Array.isArray(parsed.focusLog) ? parsed.focusLog : []
    };
  } catch {
    return { cards: [], mistakes: [], exams: [], focusLog: [] };
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function track(action, detail = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "tool_use", {
    tool_site: "word-hanja-memory-lab",
    tool_name: "word_hanja_pwa",
    tool_action: action,
    ...detail
  });
}

function bindTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      activateTab(tab);
      track("open_tab", { tab });
    });
  });
}

function bindHeroActions() {
  $("[data-start-review]")?.addEventListener("click", () => {
    activateTab("review");
    document.querySelector(".workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    track("start_review_from_hero");
  });
  $("[data-start-wordbank]")?.addEventListener("click", () => {
    activateTab("wordbank");
    document.querySelector(".workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    track("open_wordbank_from_hero");
  });
}

function bindInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    const button = $("[data-install]");
    if (button) button.hidden = false;
  });

  const installButton = $("[data-install]");
  if (!installButton) return;
  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      track("install_prompt");
      return;
    }
    const note = $("[data-install-note]");
    if (note) note.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function bindCards() {
  const form = $("[data-card-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const card = {
      id: uid(),
      deck: String(data.get("deck") || "기본").trim() || "기본",
      front: String(data.get("front") || "").trim(),
      back: String(data.get("back") || "").trim(),
      createdAt: Date.now(),
      dueAt: Date.now(),
      level: 0
    };
    if (!card.front || !card.back) return;
    state.cards.unshift(card);
    form.reset();
    saveState();
    track("add_card");
    renderAll();
  });

  const sampleButton = $("[data-sample]");
  if (sampleButton) {
    sampleButton.addEventListener("click", () => {
      state.cards.unshift({
        id: uid(),
        deck: "샘플",
        front: "retrieval practice",
        back: "책을 보지 않고 기억에서 꺼내보는 연습",
        createdAt: Date.now(),
        dueAt: Date.now(),
        level: 0
      });
      saveState();
      track("add_sample");
      renderAll();
    });
  }
}

function bindWordBank() {
  const typeSelect = $("[data-word-type]");
  const levelSelect = $("[data-word-level]");
  const searchInput = $("[data-word-search]");
  const list = $("[data-word-bank-list]");

  typeSelect?.addEventListener("change", () => {
    wordBankFilters.type = typeSelect.value || "all";
    syncWordLevelOptions();
    renderWordBank();
  });

  levelSelect?.addEventListener("change", () => {
    wordBankFilters.level = levelSelect.value || "all";
    renderWordBank();
  });

  searchInput?.addEventListener("input", () => {
    wordBankFilters.query = searchInput.value.trim().toLowerCase();
    renderWordBank();
  });

  list?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-word]");
    if (!button) return;
    const word = getWordBank().find((item) => item.id === button.dataset.addWord);
    if (!word) return;
    addWordCard(word);
    track("add_word_bank_card", { level: word.level });
    renderAll();
  });

  $("[data-add-visible-words]")?.addEventListener("click", () => {
    const added = getFilteredWords().slice(0, 20).reduce((count, word) => count + (addWordCard(word) ? 1 : 0), 0);
    if (added > 0) {
      track("add_visible_word_bank_cards", { count: added, level: wordBankFilters.level });
      saveState();
      renderAll();
    }
  });

  syncWordLevelOptions();
}

function getWordBank() {
  return Array.isArray(window.STUDY_WORD_BANK) ? window.STUDY_WORD_BANK : [];
}

function getFilteredWords() {
  const query = wordBankFilters.query;
  return getWordBank().filter((word) => {
    const typeMatch = wordBankFilters.type === "all" || word.type === wordBankFilters.type;
    const levelMatch = wordBankFilters.level === "all" || word.level === wordBankFilters.level;
    if (!typeMatch || !levelMatch) return false;
    if (!query) return true;
    return [word.word, word.meaning, word.example, levelLabel(word.level)]
      .concat(word.reading || "", typeLabel(word.type))
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
}

function addWordCard(word) {
  if (state.cards.some((card) => card.sourceWordId === word.id)) return false;
  const meaning = word.type === "hanja" ? `음/뜻: ${word.meaning}` : word.meaning;
  state.cards.unshift({
    id: uid(),
    sourceWordId: word.id,
    cardType: word.type || "english",
    deck: `${levelLabel(word.level)} ${typeLabel(word.type)}`,
    front: word.term || word.word,
    back: `${meaning}\n${word.example}`,
    meaning,
    example: word.example,
    exampleKo: word.exampleKo || "",
    createdAt: Date.now(),
    dueAt: Date.now(),
    level: 0
  });
  saveState();
  return true;
}

function syncWordLevelOptions() {
  const typeSelect = $("[data-word-type]");
  const levelSelect = $("[data-word-level]");
  if (!typeSelect || !levelSelect) return;
  const type = typeSelect.value || "all";
  const options = WORD_LEVEL_OPTIONS[type] || WORD_LEVEL_OPTIONS.all;
  const selected = options.some(([value]) => value === wordBankFilters.level) ? wordBankFilters.level : "all";
  levelSelect.innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  levelSelect.value = selected;
  wordBankFilters.level = selected;
}

function typeLabel(type) {
  return {
    english: "영단어",
    hanja: "한자"
  }[type] || "단어";
}

function levelLabel(level) {
  return {
    elementary: "초등",
    middle: "중등",
    high: "고등",
    hanja10: "10급",
    hanja9: "9급",
    hanja8: "8급",
    hanja7: "7급",
    hanja6: "6급",
    hanja5: "5급",
    hanja4: "4급",
    hanja3: "3급",
    hanja2: "2급",
    hanja1: "1급"
  }[level] || "기본";
}

function bindReview() {
  const reviewCard = $("[data-review-card]");
  if (!reviewCard) return;
  reviewCard.addEventListener("click", (event) => {
    const action = event.target.closest("[data-review-action]")?.dataset.reviewAction;
    if (!action) return;
    const dueCards = getDueCards();
    const card = dueCards[reviewIndex] || dueCards[0];
    if (!card) return;
    if (action === "flip") {
      flipped = !flipped;
    } else if (action === "again") {
      card.level = 0;
      card.dueAt = Date.now() + 10 * 60 * 1000;
      reviewIndex = 0;
      flipped = false;
      saveState();
      track("review_again");
    } else if (action === "hard") {
      card.level = Math.max(1, card.level);
      card.dueAt = Date.now() + 24 * 60 * 60 * 1000;
      reviewIndex = 0;
      flipped = false;
      saveState();
      track("review_hard");
    } else if (action === "good") {
      card.level += 1;
      const days = [1, 3, 7, 14, 30][Math.min(card.level - 1, 4)];
      card.dueAt = Date.now() + days * 24 * 60 * 60 * 1000;
      reviewIndex = 0;
      flipped = false;
      saveState();
      track("review_good");
    }
    renderAll();
  });
}

function bindPractice() {
  const typeSelect = $("[data-practice-type]");
  const difficultySelect = $("[data-practice-difficulty]");
  typeSelect?.addEventListener("change", () => {
    practiceFilters.type = typeSelect.value || "english";
    practiceWord = null;
    renderPractice();
  });
  difficultySelect?.addEventListener("change", () => {
    practiceFilters.difficulty = difficultySelect.value || "all";
    practiceWord = null;
    renderPractice();
  });
  $("[data-next-practice]")?.addEventListener("click", () => {
    pickPracticeWord();
    track("next_random_practice", { type: practiceFilters.type, difficulty: practiceFilters.difficulty });
    renderPractice();
  });
  $("[data-practice-card]")?.addEventListener("click", (event) => {
    const action = event.target.closest("[data-practice-action]")?.dataset.practiceAction;
    if (action === "show") {
      const revealed = event.currentTarget.classList.toggle("is-revealed");
      event.target.textContent = revealed ? "다시 가리기" : "뜻 보기";
    } else if (action === "add" && practiceWord) {
      addWordCard(practiceWord);
      renderAll();
    } else if (action === "next") {
      pickPracticeWord();
      renderPractice();
    }
  });
}

function getPracticeWords() {
  return getWordBank().filter((word) => {
    if (word.type !== practiceFilters.type) return false;
    if (practiceFilters.difficulty === "all") return true;
    if (word.type === "english") return word.level === practiceFilters.difficulty;
    const levelNumber = Number(String(word.level).replace("hanja", ""));
    if (practiceFilters.difficulty === "elementary") return levelNumber >= 8;
    if (practiceFilters.difficulty === "middle") return levelNumber >= 5 && levelNumber <= 7;
    if (practiceFilters.difficulty === "high") return levelNumber >= 1 && levelNumber <= 4;
    return true;
  });
}

function pickPracticeWord() {
  const words = getPracticeWords();
  practiceWord = words[Math.floor(Math.random() * words.length)] || null;
}

function bindTimer() {
  $$("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = Number(button.dataset.preset || 25);
      stopTimer();
      timer.initial = minutes * 60;
      timer.seconds = timer.initial;
      renderTimer();
    });
  });

  $("[data-timer-toggle]")?.addEventListener("click", () => {
    timer.running ? stopTimer() : startTimer();
    renderTimer();
  });

  $("[data-timer-reset]")?.addEventListener("click", () => {
    stopTimer();
    timer.seconds = timer.initial;
    renderTimer();
  });

  $("[data-timer-log]")?.addEventListener("click", () => {
    const minutes = Math.max(1, Math.round((timer.initial - timer.seconds) / 60));
    state.focusLog.push({ id: uid(), date: todayKey(), minutes });
    saveState();
    track("log_focus", { minutes });
    renderAll();
  });
}

function startTimer() {
  if (timer.running) return;
  timer.running = true;
  timer.interval = setInterval(() => {
    timer.seconds = Math.max(0, timer.seconds - 1);
    if (timer.seconds === 0) stopTimer();
    renderTimer();
  }, 1000);
  track("start_timer");
}

function stopTimer() {
  timer.running = false;
  if (timer.interval) clearInterval(timer.interval);
  timer.interval = null;
}

function bindMistakes() {
  const form = $("[data-mistake-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const mistake = {
      id: uid(),
      subject: String(data.get("subject") || "기본").trim() || "기본",
      question: String(data.get("question") || "").trim(),
      myAnswer: String(data.get("myAnswer") || "").trim(),
      correctAnswer: String(data.get("correctAnswer") || "").trim(),
      createdAt: Date.now()
    };
    if (!mistake.question || !mistake.correctAnswer) return;
    state.mistakes.unshift(mistake);
    form.reset();
    saveState();
    track("add_mistake");
    renderAll();
  });
}

function bindExams() {
  const form = $("[data-exam-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const exam = {
      id: uid(),
      title: String(data.get("title") || "").trim(),
      date: String(data.get("date") || ""),
      todos: []
    };
    const todo = String(data.get("todo") || "").trim();
    if (todo) exam.todos.push({ id: uid(), text: todo, done: false });
    if (!exam.title || !exam.date) return;
    state.exams.unshift(exam);
    form.reset();
    saveState();
    track("add_exam");
    renderAll();
  });

  $("[data-exam-list]")?.addEventListener("click", (event) => {
    const checkbox = event.target.closest("[data-todo]");
    if (!checkbox) return;
    const exam = state.exams.find((item) => item.id === checkbox.dataset.exam);
    const todo = exam?.todos.find((item) => item.id === checkbox.dataset.todo);
    if (!todo) return;
    todo.done = checkbox.checked;
    saveState();
    renderAll();
  });
}

function bindBackup() {
  $("[data-export]")?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `study-lab-backup-${todayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    track("export_backup");
  });

  $("[data-import]")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const parsed = JSON.parse(await file.text());
    state.cards = Array.isArray(parsed.cards) ? parsed.cards : [];
    state.mistakes = Array.isArray(parsed.mistakes) ? parsed.mistakes : [];
    state.exams = Array.isArray(parsed.exams) ? parsed.exams : [];
    state.focusLog = Array.isArray(parsed.focusLog) ? parsed.focusLog : [];
    saveState();
    track("import_backup");
    renderAll();
  });

  $("[data-clear]")?.addEventListener("click", () => {
    if (!confirm("이 브라우저에 저장된 영단어·한자 학습 데이터를 모두 삭제할까요?")) return;
    state.cards = [];
    state.mistakes = [];
    state.exams = [];
    state.focusLog = [];
    saveState();
    track("clear_data");
    renderAll();
  });
}

function getDueCards() {
  const now = Date.now();
  return state.cards.filter((card) => Number(card.dueAt || 0) <= now);
}

function renderAll() {
  renderStats();
  renderCards();
  renderWordBank();
  renderReview();
  renderPractice();
  renderTimer();
  renderMistakes();
  renderExams();
  renderBackup();
}

function renderStats() {
  const focusToday = state.focusLog
    .filter((item) => item.date === todayKey())
    .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  setText('[data-stat="cards"]', state.cards.length);
  setText('[data-stat="due"]', getDueCards().length);
  setText('[data-stat="words"]', getWordBank().length);
}

function renderCards() {
  const list = $("[data-card-list]");
  if (!list) return;
  list.innerHTML = state.cards.length ? state.cards.map((card) => `
    <article class="item">
      <div class="item-head">
        <div><h3>${escapeHtml(card.front)}</h3><p class="muted">${escapeHtml(card.deck)} · 기억 단계 ${card.level || 0}</p></div>
        <button type="button" data-delete-card="${card.id}">삭제</button>
      </div>
      ${renderBackFace(card)}
    </article>
  `).join("") : '<div class="empty-state"><b>아직 저장된 카드가 없습니다</b><p>단어장에서 필요한 영단어나 한자를 골라 카드로 추가하세요.</p><button class="primary-button" type="button" data-empty-wordbank>단어 고르기</button></div>';
  list.querySelector("[data-empty-wordbank]")?.addEventListener("click", () => activateTab("wordbank"));
  $$("[data-delete-card]").forEach((button) => {
    button.addEventListener("click", () => {
      state.cards = state.cards.filter((card) => card.id !== button.dataset.deleteCard);
      saveState();
      renderAll();
    });
  });
}

function renderBackFace(card) {
  const parts = getBackParts(card);
  return `
    <div class="card-back-block">
      <p class="card-meaning">${escapeHtml(parts.meaning)}</p>
      ${parts.example ? `
        <div class="card-example-block">
          <p class="card-example">${escapeHtml(parts.example)}</p>
          ${parts.exampleKo ? `<p class="card-example-ko"><span>해석</span>${escapeHtml(parts.exampleKo)}</p>` : ""}
        </div>
      ` : ""}
    </div>
  `;
}

function getBackParts(card) {
  if (card.meaning || card.example) {
    return { meaning: card.meaning || card.back || "", example: card.example || "", exampleKo: card.exampleKo || "" };
  }
  const lines = String(card.back || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (lines.length > 1) return { meaning: lines[0], example: lines.slice(1).join(" "), exampleKo: "" };
  return { meaning: card.back || "", example: "", exampleKo: "" };
}

function renderWordBank() {
  const list = $("[data-word-bank-list]");
  if (!list) return;
  const words = getFilteredWords();
  const addedIds = new Set(state.cards.map((card) => card.sourceWordId).filter(Boolean));
  setText("[data-word-bank-count]", `${words.length}개`);

  if (!getWordBank().length) {
    list.innerHTML = '<div class="empty-state"><b>단어장 데이터를 불러오지 못했습니다</b><p>잠시 후 새로고침해 주세요.</p></div>';
    return;
  }

  if (!words.length) {
    list.innerHTML = '<div class="empty-state"><b>검색 결과가 없습니다</b><p>검색어를 줄이거나 종류와 수준을 전체로 바꿔 보세요.</p></div>';
    return;
  }

  list.innerHTML = words.slice(0, 80).map((word) => {
    const added = addedIds.has(word.id);
    return `
      <article class="word-row">
        <div>
          <div class="word-title"><strong>${escapeHtml(word.term || word.word)}</strong><span>${typeLabel(word.type)}</span><span>${levelLabel(word.level)}</span></div>
          <p>${escapeHtml(word.meaning)}</p>
          <p class="muted">${escapeHtml(word.example)}</p>
        </div>
        <button class="${added ? "" : "primary-button"}" type="button" data-add-word="${word.id}" ${added ? "disabled" : ""}>${added ? "추가됨" : "카드 추가"}</button>
      </article>
    `;
  }).join("");

  if (words.length > 80) {
    list.insertAdjacentHTML("beforeend", `<p class="muted">검색 결과가 많아 80개만 먼저 표시합니다. 더 좁게 검색하면 원하는 단어를 빠르게 찾을 수 있습니다.</p>`);
  }
}

function renderReview() {
  const dueCards = getDueCards();
  const reviewCard = $("[data-review-card]");
  setText("[data-review-count]", `${dueCards.length}개`);
  if (!reviewCard) return;
  const card = dueCards[reviewIndex] || dueCards[0];
  if (!card) {
    reviewCard.innerHTML = '<div class="empty-state review-complete"><b>오늘 복습할 항목이 없습니다</b><p>단어장에서 새 카드를 추가하거나 내일 다시 확인하세요.</p><button class="primary-button" type="button" data-empty-wordbank>단어 고르기</button></div>';
    reviewCard.querySelector("[data-empty-wordbank]")?.addEventListener("click", () => activateTab("wordbank"));
    return;
  }
  reviewCard.innerHTML = `
    <div class="flash-face ${flipped ? "is-back" : ""}">${flipped ? renderBackFace(card) : escapeHtml(card.front)}</div>
    <p class="muted">${escapeHtml(card.deck)} · ${flipped ? "뒷면" : "앞면"}</p>
    <div class="item-actions">
      <button type="button" data-review-action="flip">${flipped ? "앞면 보기" : "정답 보기"}</button>
      <button type="button" data-review-action="again">모름</button>
      <button type="button" data-review-action="hard">헷갈림</button>
      <button class="primary-button" type="button" data-review-action="good">알고 있음</button>
    </div>
  `;
}

function renderPractice() {
  const card = $("[data-practice-card]");
  const count = getPracticeWords().length;
  setText("[data-practice-count]", `${count}개`);
  if (!card) return;
  if (!practiceWord) pickPracticeWord();
  if (!practiceWord) {
    card.classList.remove("is-revealed");
    card.innerHTML = '<div class="empty-state"><b>연습할 항목이 없습니다</b><p>종류와 난이도를 전체로 바꿔 보세요.</p></div>';
    return;
  }
  card.classList.remove("is-revealed");
  const isHanja = practiceWord.type === "hanja";
  card.innerHTML = `
    <div class="practice-front">
      <p class="muted">${typeLabel(practiceWord.type)} · ${isHanja ? levelLabel(practiceWord.level) : levelLabel(practiceWord.level)}</p>
      <strong>${escapeHtml(practiceWord.term || practiceWord.word)}</strong>
    </div>
    <div class="practice-answer">
      <p class="card-meaning">${escapeHtml(isHanja ? `음/뜻: ${practiceWord.meaning}` : practiceWord.meaning)}</p>
      <div class="card-example-block">
        <p class="card-example">${escapeHtml(practiceWord.example)}</p>
        ${practiceWord.exampleKo ? `<p class="card-example-ko"><span>해석</span>${escapeHtml(practiceWord.exampleKo)}</p>` : ""}
      </div>
    </div>
    <div class="item-actions">
      <button type="button" data-practice-action="show">뜻 보기</button>
      <button type="button" data-practice-action="next">다음 문제</button>
      <button class="primary-button" type="button" data-practice-action="add">내 학습장에 추가</button>
    </div>
  `;
}

function renderTimer() {
  const minutes = Math.floor(timer.seconds / 60).toString().padStart(2, "0");
  const seconds = (timer.seconds % 60).toString().padStart(2, "0");
  setText("[data-timer-display]", `${minutes}:${seconds}`);
  setText("[data-timer-toggle]", timer.running ? "일시정지" : "시작");
}

function renderMistakes() {
  const list = $("[data-mistake-list]");
  if (!list) return;
  list.innerHTML = state.mistakes.length ? state.mistakes.map((item) => `
    <article class="item">
      <div class="item-head"><div><h3>${escapeHtml(item.question)}</h3><p class="muted">${escapeHtml(item.subject)}</p></div><button type="button" data-delete-mistake="${item.id}">삭제</button></div>
      ${item.myAnswer ? `<p><b>내 답:</b> ${escapeHtml(item.myAnswer)}</p>` : ""}
      <p><b>정답/해설:</b> ${escapeHtml(item.correctAnswer)}</p>
    </article>
  `).join("") : '<div class="empty-state"><b>아직 저장된 오답이 없습니다</b><p>틀린 문제를 짧게 적어 두면 다음 복습 때 바로 찾기 쉽습니다.</p></div>';
  $$("[data-delete-mistake]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mistakes = state.mistakes.filter((item) => item.id !== button.dataset.deleteMistake);
      saveState();
      renderAll();
    });
  });
}

function renderExams() {
  const list = $("[data-exam-list]");
  if (!list) return;
  list.innerHTML = state.exams.length ? state.exams.map((exam) => {
    const dday = Math.ceil((new Date(`${exam.date}T00:00:00`) - new Date(`${todayKey()}T00:00:00`)) / 86400000);
    const label = dday === 0 ? "D-day" : dday > 0 ? `D-${dday}` : `D+${Math.abs(dday)}`;
    const todos = exam.todos.length ? exam.todos.map((todo) => `
      <label><input type="checkbox" data-exam="${exam.id}" data-todo="${todo.id}" ${todo.done ? "checked" : ""}> ${escapeHtml(todo.text)}</label>
    `).join("") : '<p class="muted">등록된 할 일이 없습니다.</p>';
    return `
      <article class="item">
        <div class="item-head"><div><h3>${escapeHtml(exam.title)}</h3><p class="muted">${escapeHtml(exam.date)} · ${label}</p></div><button type="button" data-delete-exam="${exam.id}">삭제</button></div>
        <div class="list">${todos}</div>
      </article>
    `;
  }).join("") : '<div class="empty-state"><b>아직 등록된 시험이나 목표가 없습니다</b><p>시험일이나 발표일을 등록하면 남은 날짜를 한눈에 볼 수 있습니다.</p></div>';
  $$("[data-delete-exam]").forEach((button) => {
    button.addEventListener("click", () => {
      state.exams = state.exams.filter((item) => item.id !== button.dataset.deleteExam);
      saveState();
      renderAll();
    });
  });
}

function renderBackup() {
  const preview = $("[data-backup-preview]");
  if (!preview) return;
  preview.textContent = `학습 항목 ${state.cards.length}개, 오답 ${state.mistakes.length}개, 시험 ${state.exams.length}개, 집중 기록 ${state.focusLog.length}개가 이 브라우저에 저장되어 있습니다.`;
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = String(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
