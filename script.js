// =========================================================
// SKILL DATA
// Levels are 1–5. Edit the "level" numbers below to adjust
// any rating — everything else updates automatically.
// =========================================================

const LEVEL_LABELS = {
  1: { en: "Beginner", fa: "مبتدی" },
  2: { en: "Beginner", fa: "مبتدی" },
  3: { en: "Intermediate", fa: "متوسط" },
  4: { en: "Advanced", fa: "پیشرفته" },
  5: { en: "Expert", fa: "حرفه‌ای" },
};

const SKILLS = [
  {
    category: { en: "Data & Analytics", fa: "داده و تحلیل" },
    items: [
      { name: "Excel", level: 5 },
      { name: "Data Analysis", level: 5 },
      { name: "Python", level: 3 },
      { name: "SQL", level: 3 },
      { name: "Minitab", level: 3 },
    ],
  },
  {
    category: { en: "Engineering", fa: "مهندسی" },
    items: [
      { name: "Operations Research", level: 4 },
      { name: "Process Analysis", level: 4 },
      { name: "Project Management", level: 3 },
      { name: "Lean", level: 3 },
    ],
  },
  {
    category: { en: "Business", fa: "کسب‌وکار" },
    items: [
      { name: "Business Analysis", level: 4 },
      { name: "Market Analysis", level: 4 },
      { name: "Financial Analysis", level: 3 },
      { name: "Business Modeling", level: 3 },
    ],
  },
  {
    category: { en: "Technology", fa: "فناوری" },
    items: [
      { name: "HTML", level: 4 },
      { name: "CSS", level: 4 },
      { name: "Git", level: 3 },
      { name: "GitHub", level: 3 },
      { name: "Programming", level: 3 },
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
