// =========================================================
// SKILL DATA
// Levels are 1–5. Edit the "level" numbers below to adjust
// any rating — everything else updates automatically.
// =========================================================

const LEVEL_LABELS = {
  1: { en: "Beginner", fa: "مبتدی" },
  2: { en: "Basic", fa: "ابتدایی" },
  3: { en: "Intermediate", fa: "متوسط" },
  4: { en: "Advanced", fa: "پیشرفته" },
  5: { en: "Expert", fa: "حرفه‌ای" },
};

const SKILLS = [
  {
    category: { en: "Microsoft Office Suite", fa: "مجموعه مایکروسافت آفیس" },
    items: [
      { name: "Excel", level: 4 },
      { name: "Word", level: 4 },
      { name: "Access", level: 3 },
      { name: "MSP", level: 3 },
      { name: "PowerPoint", level: 3 },
    ],
  },
  {
    category: { en: "Data Analytics & Business Intelligence", fa: "تحلیل داده‌ها و هوش تجاری" },
    items: [
      { name: "Power BI", level: 3 },
      { name: "minitab", level: 3 },
      { name: "MySQL", level: 2 },
    ],
  },
  {
    category: { en: "Content Creation & Digital Media", fa: "تولید محتوا و رسانه‌های دیجیتال" },
    items: [
      { name: "Adobe Photoshop", level: 4 },
      { name: "Video Editing", level: 4 },
      { name: "Adobe After Effect", level: 2 },
    ],
  },
  {
    category: { en: "Technology", fa: "فناوری" },
    items: [
      { name: "HTML", level: 3 },
      { name: "CSS", level: 3 },
      { name: "GitHub", level: 3 },
    ],
  },
];

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = SKILLS.map((group) => {
    const rows = group.items
      .map((item) => {
        const ticks = Array.from({ length: 5 }, (_, i) =>
          `<span class="skill-tick${i < item.level ? " filled" : ""}"></span>`
        ).join("");

        return `
          <div class="skill-row">
            <span class="skill-name">${item.name}</span>
            <span class="skill-meter">
              <span class="skill-level-label" data-en="${LEVEL_LABELS[item.level].en}" data-fa="${LEVEL_LABELS[item.level].fa}">${LEVEL_LABELS[item.level].en}</span>
              <span class="skill-ticks" role="img" aria-label="Level ${item.level} of 5">${ticks}</span>
              <span class="mono skill-fraction">${item.level}/5</span>
            </span>
          </div>`;
      })
      .join("");

    return `
      <div class="skill-panel">
        <h3 data-en="${group.category.en}" data-fa="${group.category.fa}">${group.category.en}</h3>
        ${rows}
      </div>`;
  }).join("");
}

// =========================================================
// LANGUAGE TOGGLE
// =========================================================

const languageToggle = document.getElementById("languageToggle");

let currentLanguage = localStorage.getItem("language") || "en";

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-fa]").forEach((element) => {
    element.innerHTML = element.getAttribute(`data-${language}`);
  });

  if (languageToggle) {
    languageToggle.setAttribute("data-active", language);
  }

  localStorage.setItem("language", language);
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    changeLanguage(currentLanguage === "en" ? "fa" : "en");
  });
}

renderSkills();
changeLanguage(currentLanguage);
