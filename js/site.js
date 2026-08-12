/* site.js — shared engine for the Ina Gordon site.
   i18n: each page defines window.LANG_DATA = { de:{...}, en:{...} } before including this file.
   Elements carry data-i18n="key" (text) or data-i18n-html="key" (innerHTML). */
(function () {
  "use strict";
  var LANGS = ["de", "en"];
  var current = "de";

  function store() {
    try { localStorage.setItem("inag-lang", current); } catch (e) {}
  }
  function load() {
    var s = "de";
    try {
      var v = localStorage.getItem("inag-lang");
      if (v === "en") s = "en";
    } catch (e) {}
    return s;
  }

  function apply() {
    var data = window.LANG_DATA || { de: {}, en: {} };
    var dict = data[current] || {};
    document.documentElement.setAttribute("lang", current === "de" ? "de" : "en");
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    }
    var html = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < html.length; j++) {
      var h = html[j];
      var hk = h.getAttribute("data-i18n-html");
      if (dict[hk] != null) h.innerHTML = dict[hk];
    }
    var pl = document.querySelectorAll("[data-i18n-ph]");
    for (var p = 0; p < pl.length; p++) {
      var ph = pl[p];
      var pk = ph.getAttribute("data-i18n-ph");
      if (dict[pk] != null) ph.setAttribute("placeholder", dict[pk]);
    }
    // toggle state
    var toggles = document.querySelectorAll("[data-lang]");
    for (var t = 0; t < toggles.length; t++) {
      toggles[t].setAttribute("aria-pressed", String(toggles[t].getAttribute("data-lang") === current));
      toggles[t].classList.toggle("is-active", toggles[t].getAttribute("data-lang") === current);
    }
  }

  function setLang(l) {
    if (LANGS.indexOf(l) === -1) return;
    current = l; store(); apply();
  }

  function init() {
    current = load();
    // language buttons
    var toggles = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    }
    // mobile nav toggle
    var burger = document.getElementById("navToggle");
    var nav = document.getElementById("nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
        burger.classList.toggle("is-open", open);
      });
    }
    // smooth scroll for same-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = this.getAttribute("href");
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            if (nav) nav.classList.remove("is-open");
          }
        }
      });
    });
    // contact form
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = form.checkValidity();
        form.classList.add("was-validated");
        if (!ok) return;
        var btn = form.querySelector("button[type=submit]");
        if (btn) { btn.disabled = true; btn.textContent = (current === "de") ? "Wird gesendet …" : "Sending …"; }
        var endpoint = window.FORM_ENDPOINT || "";
        if (!endpoint) {
          showFormResult("formFallback");
          if (btn) { btn.disabled = false; btn.textContent = (current === "de") ? "Nachricht senden" : "Send message"; }
          return;
        }
        var fd = new FormData(form);
        fetch(endpoint, { method: "POST", body: fd, headers: { "Accept": "application/json" } })
          .then(function (r) { return r.json(); })
          .then(function () {
            form.classList.add("is-hidden");
            showFormResult("formSuccess");
          })
          .catch(function () {
            showFormResult("formError");
            if (btn) { btn.disabled = false; btn.textContent = (current === "de") ? "Nachricht senden" : "Send message"; }
          });
      });
    }
    apply();
    // reveal on load
    document.body.classList.add("ready");
  }

  function showFormResult(id) {
    var el = document.getElementById(id);
    if (el) el.hidden = false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
