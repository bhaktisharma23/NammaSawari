// lang.js
let TRANSLATIONS = {};
let CURRENT_LANG = localStorage.getItem('lang') || 'en';

async function loadLanguage(lang) {
  try {
    const res = await fetch(`translations/${lang}.json`);
    TRANSLATIONS = await res.json();
    CURRENT_LANG = lang;
    localStorage.setItem('lang', lang);
    translatePage();
  } catch (e) {
    console.error("Failed to load translations:", e);
  }
}

// simple templating: replaces {key} with provided values
function applyTemplate(template, params = {}) {
  return template.replace(/\{([^}]+)\}/g, (_, k) => {
    return params[k] !== undefined ? params[k] : `{${k}}`;
  });
}

// t(key, params) -> returns translated string (with placeholders replaced)
function t(key, params = {}) {
  const str = TRANSLATIONS[key] || key;
  return applyTemplate(str, params);
}

// Translate all <*[data-i18n="key"]> elements
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // If element has data-i18n-params as JSON string, parse it and pass to t()
    const paramsAttr = el.getAttribute('data-i18n-params');
    let params = {};
    if (paramsAttr) {
      try { params = JSON.parse(paramsAttr); } catch(e){ params = {}; }
    }
    // If element is html-sensitive (like badges) allow innerHTML, else innerText
    if (el.getAttribute('data-i18n-html') === "true") {
      el.innerHTML = t(key, params);
    } else {
      el.innerText = t(key, params);
    }
  });
}

// expose default load
window.i18n = { loadLanguage, t, translatePage, getCurrent: () => CURRENT_LANG };

// auto-load current language on script load
// (but only run after DOM is ready — home.html will include this before home.js)
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(CURRENT_LANG);
});
