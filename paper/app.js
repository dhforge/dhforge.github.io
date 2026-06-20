"use strict";

const $ = (selector) => document.querySelector(selector);

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

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    language: "en-US",
    site_section: "printable_paper_lab",
    ...params
  });
}

function trackTemplateUse(templateName, action = "use", options = {}) {
  const key = `${templateName}:${action}`;
  if (options.once && trackedTemplateActions.has(key)) return;
  if (options.once) trackedTemplateActions.add(key);
  trackAnalyticsEvent("tool_use", {
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
  initTemplateTool();
  initStructuredData();
});

function initTemplateTool() {
  const template = document.body.dataset.template;
  const sheet = $("#paperSheet");
  if (!template || !sheet) return;

  const size = $("#paperSize");
  const spacing = $("#lineSpacing");
  const color = $("#lineColor");
  const title = $("#titleText");

  function update() {
    const config = TEMPLATE_CONFIG[template];
    const spacingValue = Number(spacing.value || config.spacing);
    sheet.className = `sheet ${config.className || ""}`.trim();
    sheet.dataset.size = size.value;
    sheet.style.setProperty("--spacing", `${spacingValue}px`);
    sheet.style.setProperty("--paper-color", color.value);
    renderTemplate(template, sheet, title.value.trim());
  }

  [size, spacing, color, title].forEach((input) => {
    input.addEventListener("input", () => trackTemplateUse(template, "customize", { once: true }));
    input.addEventListener("input", update);
  });
  $("#printTemplate").addEventListener("click", () => {
    trackTemplateUse(template, "print_or_save_pdf");
    window.print();
  });
  $("#resetTemplate").addEventListener("click", () => {
    trackTemplateUse(template, "reset");
    size.value = "letter";
    spacing.value = TEMPLATE_CONFIG[template].spacing;
    color.value = "#86a5b8";
    title.value = "";
    update();
  });
  update();
}

function renderTemplate(template, sheet, titleText) {
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
    content.innerHTML = '<div class="cornell"><div>Cues</div><div>Notes</div><div style="grid-column:1 / -1">Summary</div></div>';
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
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const grid = document.createElement("div");
    grid.className = "planner-grid";
    days.forEach((day) => {
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
  const canonical = document.querySelector('link[rel="canonical"]');
  const description = document.querySelector('meta[name="description"]');
  const url = canonical ? canonical.href : location.href;
  const title = document.title.replace(" - Printable Paper Lab", "");
  const graph = [
    {
      "@type": "WebSite",
      "@id": "https://dhforge.github.io/paper/#website",
      "url": "https://dhforge.github.io/paper/",
      "name": "Printable Paper Lab",
      "sameAs": "https://printablepaperlab.blogspot.com/",
      "inLanguage": "en-US"
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
      "inLanguage": "en-US"
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
