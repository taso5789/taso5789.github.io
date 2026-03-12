// Language switching for Taihei Sone's personal site

(function () {
  var STORAGE_KEY = 'preferred-lang';
  var currentLang = 'en';

  try {
    currentLang = localStorage.getItem(STORAGE_KEY) || 'en';
  } catch (error) {
    currentLang = 'en';
  }

  function applyLang(lang) {
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Ignore storage failures and keep the page usable.
    }

    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    document.querySelectorAll('.lang-ja').forEach(function (el) {
      el.style.display = lang === 'ja' ? '' : 'none';
    });

    document.querySelectorAll('[data-en], [data-ja]').forEach(function (el) {
      if (el.classList.contains('entry-tag')) return;
      if (el.children.length > 0) return;
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll('.entry-tag').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = '(' + text + ')';
    });

    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-ja').classList.toggle('active', lang === 'ja');
  }

  window.setLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(currentLang);
  });
})();
