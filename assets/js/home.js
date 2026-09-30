(function () {
  var root = document.documentElement;

  // ---------- 테마: 시스템 설정 변경을 실시간 반영 (초기값은 index.html <head>의 인라인 스크립트) ----------
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var applyTheme = function () { root.className = darkQuery.matches ? 'cds--g100' : 'cds--white'; };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', applyTheme);
  else if (darkQuery.addListener) darkQuery.addListener(applyTheme);

  // ---------- Hero 배경 이미지 띠: 묶음을 한 번 복제해 끊김 없이 순환, 길이와 무관하게 일정한 속도 ----------
  var heroTrack = document.querySelector('[data-hero-track]');
  if (heroTrack) {
    Array.prototype.slice.call(heroTrack.children).forEach(function (img) {
      heroTrack.appendChild(img.cloneNode(true));
    });
    var HERO_SPEED = 40; // px/s
    var heroCopyStart = heroTrack.children[heroTrack.children.length / 2];
    var setHeroSpeed = function () {
      // 이미지 폭이 소수점이라 -50% 대신 두 번째 묶음의 실제 시작 위치만큼 이동 → 이음새 오차 0
      var setWidth = heroCopyStart.getBoundingClientRect().left - heroTrack.firstElementChild.getBoundingClientRect().left;
      heroTrack.style.setProperty('--hero-shift', -setWidth + 'px');
      heroTrack.style.setProperty('--hero-duration', (setWidth / HERO_SPEED) + 's');
    };
    setHeroSpeed();
    window.addEventListener('resize', setHeroSpeed);
  }

  // ---------- 모바일 사이드 내비게이션 (Carbon UI shell, 1056px 미만) ----------
  var toggle = document.querySelector('[data-menu-toggle]');
  var sideNav = document.getElementById('side-nav');
  var overlay = document.querySelector('[data-menu-overlay]');
  var desktopQuery = window.matchMedia('(min-width: 66rem)');

  var setMenu = function (open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    toggle.setAttribute('title', open ? '메뉴 닫기' : '메뉴 열기');
    sideNav.classList.toggle('cds--side-nav--expanded', open);
    overlay.classList.toggle('cds--side-nav__overlay-active', open);
  };

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  overlay.addEventListener('click', function () { setMenu(false); });
  sideNav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  var closeOnDesktop = function () { if (desktopQuery.matches) setMenu(false); };
  if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', closeOnDesktop);
  else if (desktopQuery.addListener) desktopQuery.addListener(closeOnDesktop);

  // ---------- 스크롤 위치에 맞춰 현재 섹션 메뉴 강조 ----------
  // 세부 페이지(experience/*)는 메뉴가 홈 섹션을 가리키므로 data-nav-link가 없어 여기서 종료
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
  var sections = navLinks
    .map(function (a) { return a.getAttribute('href').slice(1); })
    .filter(function (id, i, ids) { return ids.indexOf(id) === i; })
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!sections.length) return;

  var currentId = null;
  var markCurrent = function (id) {
    if (id === currentId) return;
    currentId = id;
    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      var cls = a.classList.contains('cds--side-nav__link') ? 'cds--side-nav__link--current' : 'cds--header__menu-item--current';
      a.classList.toggle(cls, on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  var updateCurrent = function () {
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) return markCurrent(sections[sections.length - 1].id);
    var line = window.innerHeight / 3;
    var id = null; // 메뉴에 없는 Hero 영역에서는 아무것도 강조하지 않음
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) id = s.id; });
    markCurrent(id);
  };

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; updateCurrent(); });
  }, { passive: true });
  window.addEventListener('resize', updateCurrent);
  updateCurrent();
})();
