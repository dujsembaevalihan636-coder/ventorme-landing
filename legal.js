// Legal pages: same language and theme as the landing (vt-lang in localStorage, vt-theme in sessionStorage, ?lang=kk|en)
(function(){
  var d = document.documentElement, LANGS = ["ru", "kk", "en"];
  var BACK = { ru: "На главную", kk: "Басты бетке", en: "Back to the main page" };
  try { var th = sessionStorage.getItem("vt-theme"); if (th === "dark") d.setAttribute("data-theme", "dark"); } catch (e) {}
  var q = (location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1];
  if (q) q = q.toLowerCase() === "kz" ? "kk" : q.toLowerCase();
  var saved = null;
  try { saved = localStorage.getItem("vt-lang"); } catch (e) {}
  var lang = LANGS.indexOf(q) > -1 ? q : LANGS.indexOf(saved) > -1 ? saved : "ru";
  function apply(){
    d.setAttribute("lang", lang);
    document.querySelectorAll("main > article").forEach(function(a){ a.hidden = a.getAttribute("lang") !== lang; });
    var h1 = document.querySelector('main > article[lang="' + lang + '"] h1');
    if (h1) document.title = h1.textContent + " · Ventorme";
    document.querySelectorAll("[data-l=back]").forEach(function(el){ el.textContent = BACK[lang]; });
    document.querySelectorAll("[data-set]").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-set") === lang); });
  }
  document.querySelectorAll("[data-set]").forEach(function(b){
    b.addEventListener("click", function(){
      lang = b.getAttribute("data-set");
      try { localStorage.setItem("vt-lang", lang); } catch (e) {}
      apply();
    });
  });
  apply();
})();
