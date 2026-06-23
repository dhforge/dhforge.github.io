"use strict";

const $ = (selector) => document.querySelector(selector);
const LANGUAGE = document.documentElement.lang.toLowerCase().startsWith("ko") ? "ko" : "en";
const SITE_COPY = {
  en: {
    siteName: "Printable Paper Lab",
    homeUrl: "https://dhforge.github.io/paper/",
    inLanguage: "en-US",
    section: "printable_paper_lab_en"
  },
  ko: {
    siteName: "인쇄용 종이 연구소",
    homeUrl: "https://dhforge.github.io/paper/ko/",
    inLanguage: "ko-KR",
    section: "printable_paper_lab_ko"
  }
};
const TEMPLATE_LABELS = {
  en: {
    cues: "Cues",
    notes: "Notes",
    summary: "Summary",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  ko: {
    cues: "단서",
    notes: "노트",
    summary: "요약",
    days: ["월", "화", "수", "목", "금", "토", "일"]
  }
};

const TEMPLATE_CONFIG = {
  "graph-paper": { label: "Graph Paper", className: "paper-grid", spacing: 24 },
  "dot-grid-paper": { label: "Dot Grid Paper", className: "paper-dot", spacing: 28 },
  "lined-paper": { label: "Lined Paper", className: "paper-lined", spacing: 30 },
  "handwriting-paper": { label: "Handwriting Paper", className: "paper-handwriting", spacing: 44 },
  "isometric-paper": { label: "Isometric Paper", className: "paper-isometric", spacing: 28 },
  "cornell-notes": { label: "Cornell Notes", spacing: 30 },
  "music-staff-paper": { label: "Music Staff Paper", spacing: 30 },
  "weekly-planner": { label: "Weekly Planner", spacing: 30 },
  "habit-tracker": { label: "Habit Tracker", spacing: 30 },
  "checklist": { label: "Checklist", spacing: 30 }
};
const trackedTemplateActions = new Set();
let deferredInstallPrompt = null;
const FITTED_PATTERN_TEMPLATES = new Set([
  "graph-paper",
  "dot-grid-paper",
  "lined-paper",
  "handwriting-paper",
  "isometric-paper"
]);
const CSS_PX_PER_INCH = 96;
const CSS_PX_PER_MM = CSS_PX_PER_INCH / 25.4;
const PRINT_SAFE_MARGIN_PX = 10 * CSS_PX_PER_MM;
const PRINT_PAPER_SIZES = {
  a4: { width: 210 * CSS_PX_PER_MM, height: 297 * CSS_PX_PER_MM },
  letter: { width: 8.5 * CSS_PX_PER_INCH, height: 11 * CSS_PX_PER_INCH }
};

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  const copy = SITE_COPY[LANGUAGE];
  window.gtag("event", eventName, {
    language: copy.inLanguage,
    site_section: copy.section,
    ...params
  });
}

function trackTemplateUse(templateName, action = "use", options = {}) {
  const key = `${templateName}:${action}`;
  if (options.once && trackedTemplateActions.has(key)) return;
  if (options.once) trackedTemplateActions.add(key);
  trackAnalyticsEvent("tool_use", {
    tool_site: "printable-paper-lab",
    tool_name: templateName,
    tool_action: action
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
  initTemplateTool();
  initDirectorySearch();
  initDirectoryItemList();
  initStructuredData();
});

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const workerUrl = location.pathname.startsWith("/paper/ko/") ? "/paper/ko/sw.js" : "/paper/sw.js";
  navigator.serviceWorker.register(workerUrl).catch(() => {});
}

function bindInstallPrompt() {
  const isTemplatePage = Boolean(document.body.dataset.template);
  const labels = LANGUAGE === "ko"
    ? {
      button: "앱처럼 추가",
      title: "앱처럼 사용하기",
      ios: "iPhone: Safari 공유 버튼 > 홈 화면에 추가",
      android: "Galaxy: Chrome 메뉴 > 앱 설치 또는 홈 화면에 추가"
    }
    : {
      button: "Add app",
      title: "Use it like an app",
      ios: "iPhone: Safari share button > Add to Home Screen",
      android: "Galaxy: Chrome menu > Install app or Add to Home screen"
    };
  const header = document.querySelector(".site-header");
  if (!header || isTemplatePage) return;
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
      trackTemplateUse("pwa", "install_prompt");
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
  const copy = SITE_COPY[LANGUAGE];
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": LANGUAGE === "ko" ? "인쇄용 종이 템플릿 목록" : "Printable paper template directory",
    "inLanguage": copy.inLanguage,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": (item.querySelector("span") || item).textContent.trim(),
      "url": new URL(item.getAttribute("href"), baseUrl).href
    }))
  });
  document.head.appendChild(script);
}

function initTemplateTool() {
  const template = document.body.dataset.template;
  const sheet = $("#paperSheet");
  if (!template || !sheet) return;

  const size = $("#paperSize");
  const orientation = $("#paperOrientation");
  const spacing = $("#lineSpacing");
  const lineWeight = $("#lineWeight");
  const color = $("#lineColor");
  const title = $("#titleText");
  const defaultPaperSize = "a4";
  addPrintNote();

  function getDefaultSpacingValue() {
    const configValue = String(TEMPLATE_CONFIG[template].spacing);
    const options = Array.from(spacing.options);
    if (options.some((option) => option.value === configValue)) return configValue;
    const selected = options.find((option) => option.defaultSelected);
    return selected ? selected.value : (options[0] ? options[0].value : configValue);
  }

  function update() {
    const config = TEMPLATE_CONFIG[template];
    const spacingValue = Number(spacing.value || config.spacing);
    const lineWeightValue = Number(lineWeight ? lineWeight.value || 1 : 1);
    sheet.className = `sheet ${config.className || ""}`.trim();
    sheet.dataset.size = size.value;
    sheet.dataset.orientation = orientation ? orientation.value : "portrait";
    sheet.style.setProperty("--spacing", `${spacingValue}px`);
    sheet.style.setProperty("--line-weight", `${lineWeightValue}px`);
    sheet.style.setProperty("--paper-color", color.value);
    renderTemplate(template, sheet, title.value.trim());
    schedulePatternFit();
  }

  function refitPattern(options = {}) {
    fitPatternArea(sheet, template, Number(spacing.value || TEMPLATE_CONFIG[template].spacing), Number(lineWeight ? lineWeight.value || 1 : 1), options);
  }

  function schedulePatternFit(options = {}) {
    refitPattern(options);
    requestAnimationFrame(() => {
      refitPattern(options);
      requestAnimationFrame(() => refitPattern(options));
    });
  }

  function preparePrint() {
    schedulePatternFit({ forPrint: true });
  }

  [size, orientation, spacing, lineWeight, color, title].filter(Boolean).forEach((input) => {
    input.addEventListener("input", () => trackTemplateUse(template, "customize", { once: true }));
    input.addEventListener("input", update);
  });
  $("#printTemplate").addEventListener("click", () => {
    trackTemplateUse(template, "print_or_save_pdf");
    preparePrint();
    setTimeout(() => window.print(), 0);
  });
  $("#resetTemplate").addEventListener("click", () => {
    trackTemplateUse(template, "reset");
    size.value = defaultPaperSize;
    if (orientation) orientation.value = "portrait";
    spacing.value = getDefaultSpacingValue();
    if (lineWeight) lineWeight.value = "1";
    color.value = "#86a5b8";
    title.value = "";
    update();
  });
  size.value = defaultPaperSize;
  update();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      schedulePatternFit();
    });
    resizeObserver.observe(sheet);
  } else {
    window.addEventListener("resize", () => {
      schedulePatternFit();
    });
  }

  window.addEventListener("beforeprint", preparePrint);
  window.addEventListener("afterprint", schedulePatternFit);

  if (typeof window.matchMedia === "function") {
    const printMedia = window.matchMedia("print");
    const onPrintMediaChange = (event) => {
      if (event.matches) {
        preparePrint();
      } else {
        schedulePatternFit();
      }
    };
    if (typeof printMedia.addEventListener === "function") {
      printMedia.addEventListener("change", onPrintMediaChange);
    } else if (typeof printMedia.addListener === "function") {
      printMedia.addListener(onPrintMediaChange);
    }
  }
}

function addPrintNote() {
  const card = document.querySelector(".tool-card");
  if (!card || card.querySelector(".print-note")) return;
  const note = document.createElement("div");
  note.className = "print-note";
  note.innerHTML = LANGUAGE === "ko"
    ? "<strong>출력 전 확인</strong><span>브라우저 인쇄 창에서 배율 100%를 먼저 권장합니다. 여백은 기본값 또는 없음으로 한 장만 테스트 출력해 보세요.</span><em>A4 기본값</em><em>연한 선</em><em>PDF 저장 가능</em>"
    : "<strong>Before printing</strong><span>Start with 100% scale in the browser print dialog. Test one page first with default or no margins.</span><em>A4 default</em><em>Light lines</em><em>PDF ready</em>";
  card.append(note);
}

function getPrintPatternBounds(sheet) {
  const base = PRINT_PAPER_SIZES[sheet.dataset.size] || PRINT_PAPER_SIZES.a4;
  const isLandscape = sheet.dataset.orientation === "landscape";
  const width = isLandscape ? base.height : base.width;
  const height = isLandscape ? base.width : base.height;
  return {
    width: Math.floor(Math.max(0, width - PRINT_SAFE_MARGIN_PX * 2)),
    height: Math.floor(Math.max(0, height - PRINT_SAFE_MARGIN_PX * 2))
  };
}

function fitPatternArea(sheet, template, spacingValue, lineWeightValue, options = {}) {
  if (!FITTED_PATTERN_TEMPLATES.has(template)) {
    sheet.style.removeProperty("--pattern-width");
    sheet.style.removeProperty("--pattern-height");
    return;
  }

  const styles = getComputedStyle(sheet);
  const safeInline = parseFloat(styles.getPropertyValue("--paper-safe-inline")) || 0;
  const safeBlock = parseFloat(styles.getPropertyValue("--paper-safe-block")) || 0;
  const sheetBounds = sheet.getBoundingClientRect();
  const sheetWidth = sheetBounds.width || sheet.clientWidth;
  const sheetHeight = sheetBounds.height || sheet.clientHeight;
  const printBounds = options.forPrint ? getPrintPatternBounds(sheet) : null;
  const availableWidth = printBounds ? printBounds.width : Math.floor(Math.max(0, sheetWidth - safeInline * 2));
  const availableHeight = printBounds ? printBounds.height : Math.floor(Math.max(0, sheetHeight - safeBlock * 2));
  const spacingUnit = Math.max(1, Math.round(spacingValue));
  const lineUnit = Math.max(1, Math.ceil(lineWeightValue));
  const columns = Math.max(1, Math.floor((availableWidth - lineUnit) / spacingUnit));
  const rows = Math.max(1, Math.floor((availableHeight - lineUnit) / spacingUnit));

  sheet.style.setProperty("--pattern-width", `${columns * spacingUnit + lineUnit}px`);
  sheet.style.setProperty("--pattern-height", `${rows * spacingUnit + lineUnit}px`);
}

function renderTemplate(template, sheet, titleText) {
  const labels = TEMPLATE_LABELS[LANGUAGE];
  sheet.innerHTML = "";
  const title = document.createElement("div");
  title.className = "sheet-title";
  title.textContent = titleText;
  sheet.append(title);

  if (["graph-paper", "dot-grid-paper", "lined-paper", "handwriting-paper", "isometric-paper"].includes(template)) {
    return;
  }

  const content = document.createElement("div");
  content.className = "sheet-content";
  sheet.append(content);

  if (template === "cornell-notes") {
    content.innerHTML = `<div class="cornell"><div>${labels.cues}</div><div>${labels.notes}</div><div style="grid-column:1 / -1">${labels.summary}</div></div>`;
  }

  if (template === "music-staff-paper") {
    const staffWrap = document.createElement("div");
    staffWrap.className = "music-staff";
    for (let i = 0; i < 10; i += 1) {
      const staff = document.createElement("div");
      staff.className = "staff";
      staffWrap.append(staff);
    }
    content.append(staffWrap);
  }

  if (template === "weekly-planner") {
    const grid = document.createElement("div");
    grid.className = "planner-grid";
    labels.days.forEach((day) => {
      const cell = document.createElement("div");
      cell.className = "planner-cell";
      cell.innerHTML = `<strong>${day}</strong><span></span>`;
      grid.append(cell);
    });
    content.append(grid);
  }

  if (template === "habit-tracker") {
    const table = document.createElement("div");
    table.className = "habit-table";
    for (let row = 0; row < 16; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        const cell = document.createElement("div");
        cell.className = "habit-row";
        table.append(cell);
      }
    }
    content.append(table);
  }

  if (template === "checklist") {
    const list = document.createElement("div");
    list.className = "check-list";
    for (let i = 0; i < 20; i += 1) {
      const row = document.createElement("div");
      row.className = "check-row";
      list.append(row);
    }
    content.append(list);
  }
}

function initStructuredData() {
  const copy = SITE_COPY[LANGUAGE];
  const canonical = document.querySelector('link[rel="canonical"]');
  const description = document.querySelector('meta[name="description"]');
  const url = canonical ? canonical.href : location.href;
  const title = document.title
    .replace(` - ${copy.siteName}`, "")
    .replace(" - Printable Paper Lab", "");
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${copy.homeUrl}#website`,
      "url": copy.homeUrl,
      "name": copy.siteName,
      "sameAs": "https://printablepaperlab.blogspot.com/",
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

  const faqItems = Array.from(document.querySelectorAll("details")).map((detail) => {
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
