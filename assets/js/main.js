(function () {
  'use strict';

  // ---- Theme ----
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var stored = null;
  try { stored = localStorage.getItem('k8srizz-theme'); } catch (e) {}
  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  var theme = stored || (prefersLight ? 'light' : 'dark');

  function applyTheme(t) {
    theme = t;
    root.setAttribute('data-theme', t);
    if (themeToggle) themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem('k8srizz-theme', t); } catch (e) {}
  }
  applyTheme(theme);
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
    });
  }

  // ---- Hero typing animation ----
  var TYPE_LINES = [
    'k8s-rizz-check',
    'no cap, it just works'
  ];
  var typedEl = document.getElementById('typed-text');
  if (typedEl) {
    var lineIdx = 0, chars = 0, phase = 'typing', holdTicks = 0;
    setInterval(function () {
      var line = TYPE_LINES[lineIdx];
      if (phase === 'typing') {
        if (chars < line.length) { chars++; }
        else { phase = 'holding'; }
      } else if (phase === 'holding') {
        if (holdTicks < 12) { holdTicks++; }
        else { phase = 'deleting'; holdTicks = 0; }
      } else if (phase === 'deleting') {
        if (chars > 0) { chars--; }
        else { phase = 'typing'; lineIdx = (lineIdx + 1) % TYPE_LINES.length; }
      }
      typedEl.textContent = line.slice(0, chars);
    }, 140);
  }

  // ---- Scroll to top on logo click ----
  var logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Demo video: force mute (autoplay policy) and 1.5x playback ----
  var demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    var forceMute = function () {
      demoVideo.muted = true;
      demoVideo.defaultMuted = true;
      demoVideo.volume = 0;
    };
    var setSpeed = function () { demoVideo.playbackRate = 1.5; };
    forceMute();
    demoVideo.addEventListener('loadedmetadata', function () { forceMute(); setSpeed(); });
    demoVideo.addEventListener('play', function () { forceMute(); setSpeed(); });
    demoVideo.addEventListener('volumechange', forceMute);
    demoVideo.play().catch(function () {});
  }

  // ---- FAQ accordion ----
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-question');
    var chevron = item.querySelector('.faq-chevron');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        var c = i.querySelector('.faq-chevron');
        if (c) c.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        if (chevron) chevron.textContent = '−';
      }
    });
  });

  var faqToggle = document.getElementById('faq-toggle');
  var faqHidden = document.querySelectorAll('.faq-item.hidden-item');
  if (faqToggle && faqHidden.length) {
    var expanded = false;
    faqToggle.addEventListener('click', function () {
      expanded = !expanded;
      faqHidden.forEach(function (item) {
        item.style.display = expanded ? '' : 'none';
      });
      faqToggle.textContent = expanded ? 'show less' : 'show ' + faqHidden.length + ' more';
    });
  }

  // ---- OS-aware recommended download ----
  function detectPlatform() {
    var ua = navigator.userAgent || '';
    var platform = (navigator.platform || '').toLowerCase();
    var isArm = /arm|aarch64/i.test(ua) || /arm/i.test(platform);

    // Apple Silicon vs Intel Mac is not reliably distinguishable from UA alone
    // on modern Safari (arch is hidden), so treat any Mac as arm64 (Apple Silicon)
    // which is the dominant shipping platform today.
    if (/mac/i.test(ua) || /mac/i.test(platform)) {
      return 'darwin-arm64';
    }
    if (/win/i.test(ua) || /win/i.test(platform)) {
      return isArm ? 'windows-arm64' : 'windows-x86_64';
    }
    if (/linux/i.test(ua) || /linux/i.test(platform)) {
      return isArm ? 'linux-arm64' : 'linux-x86_64';
    }
    return null;
  }

  var detected = detectPlatform();
  if (detected) {
    var card = document.querySelector('.download-card[data-platform="' + detected + '"]');
    if (card) {
      card.classList.add('recommended');
      var badge = document.createElement('span');
      badge.className = 'download-badge';
      badge.textContent = 'detected';
      var label = card.querySelector('.download-label');
      if (label) label.appendChild(badge);
    }
  }
})();
