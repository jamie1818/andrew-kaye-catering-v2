/* Andrew Kaye Catering — site.js
   Small, dependency-free behaviour: header state, mobile navigation, menus sub-nav,
   gallery lightbox, enquiry form, copy buttons. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');

  /* Header border once the page has scrolled */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && nav && header) {
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('menu-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && header.classList.contains('menu-open')) setMenu(false);
    });
  }

  /* Menus page: highlight the menu currently in view */
  var subnav = document.querySelector('.subnav');
  if (subnav && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
    var sections = links.map(function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active && link.scrollIntoView) {
            link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* Gallery lightbox */
  var grid = document.querySelector('.gallery-grid');
  var lb = document.getElementById('lightbox');
  if (grid && lb) {
    var items = Array.prototype.slice.call(grid.querySelectorAll('button'));
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var lbCount = lb.querySelector('.lb-count');
    var closeBtn = lb.querySelector('.lb-close');
    var index = 0;
    var lastFocus = null;

    function show(n) {
      index = (n + items.length) % items.length;
      var btn = items[index];
      var thumb = btn.querySelector('img');
      lbImg.src = btn.getAttribute('data-full') || thumb.src;
      lbImg.alt = thumb.alt;
      lbCap.textContent = thumb.alt;
      lbCount.textContent = (index + 1) + ' of ' + items.length;
    }
    function open(n) {
      lastFocus = document.activeElement;
      show(n);
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      lb.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    items.forEach(function (btn, n) {
      btn.addEventListener('click', function () { open(n); });
    });
    closeBtn.addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    window.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
    });
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(dx < 0 ? index + 1 : index - 1);
      touchX = null;
    });
  }

  /* Enquiry form: opens the visitor's email app with the details filled in */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var get = function (k) { return (f.get(k) || '').toString().trim(); };
      var occasion = get('occasion') || 'an event';
      var date = get('date');
      var lines = [
        'Name: ' + get('name'),
        'Email: ' + get('email'),
        'Phone: ' + (get('phone') || 'not given'),
        'Occasion: ' + occasion,
        'Date: ' + (date || 'not fixed yet'),
        'Guests: ' + (get('guests') || 'not sure yet'),
        '',
        get('message')
      ];
      var subject = 'Catering enquiry: ' + occasion + (date ? ' on ' + date : '');
      var href = 'mailto:info@andrewkayecatering.co.uk' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      var status = document.getElementById('form-status');
      if (status) status.hidden = false;
      window.location.href = href;
    });
  }

  /* Copy buttons */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var original = btn.textContent;
      function done(label) {
        btn.textContent = label;
        setTimeout(function () { btn.textContent = original; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done('Copied'); }, function () { fallback(); });
      } else {
        fallback();
      }
      function fallback() {
        var target = document.getElementById(btn.getAttribute('aria-controls'));
        if (target && window.getSelection) {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          done('Selected');
        } else {
          done('Copy failed');
        }
      }
    });
  });
})();
