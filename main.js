// Language switching for Taihei Sone's personal site
// Three mechanisms:
//   1. html class (lang-ja) → CSS controls .lang-en/.lang-ja visibility without JS delay
//   2. Elements with data-en / data-ja  → textContent swap (leaf nodes only)
//   3. .entry-tag → textContent set directly

(function () {
  var STORAGE_KEY = 'preferred-lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // 1. html class controls lang-en / lang-ja block visibility via CSS
    document.documentElement.classList.toggle('lang-ja', lang === 'ja');

    // 2. Leaf-node data-en / data-ja swap (skip .entry-tag — handled below)
    document.querySelectorAll('[data-en], [data-ja]').forEach(function (el) {
      if (el.classList.contains('entry-tag')) return;
      if (el.children.length > 0) return;
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });

    // 3. entry-tag: set textContent directly
    document.querySelectorAll('.entry-tag').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = '(' + text + ')';
    });

    // 4. html lang attribute for accessibility
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

    // 5. Active button state
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-ja').classList.toggle('active', lang === 'ja');
  }

  window.setLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(currentLang);
  });
})();
