console.log("i18n loaded");
let translations = {};
let currentLang = "en";

function loadLanguage(lang) {
  fetch(`translations/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      translations = data;
      currentLang = lang;
      applyTranslations();
      localStorage.setItem("lang", lang);
    });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

// Auto load saved language
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  loadLanguage(savedLang);
});
