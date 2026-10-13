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

  // ---------- Projects · Archives 캐러셀: 넘칠 때만 이전/다음 버튼 표시, 한 번에 보이는 장수만큼 이동 ----------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  Array.prototype.slice.call(document.querySelectorAll('[data-carousel]')).forEach(function (track) {
    var prev = document.querySelector('[data-carousel-prev][aria-controls="' + track.id + '"]');
    var next = document.querySelector('[data-carousel-next][aria-controls="' + track.id + '"]');
    if (!prev || !next) return;
    var controls = prev.parentElement;

    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      controls.hidden = max <= 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };
    var page = function (dir) {
      var item = track.firstElementChild;
      var step = item ? item.getBoundingClientRect().width + 1 : track.clientWidth; // 1 = gap
      var count = Math.max(1, Math.floor((track.clientWidth + 1) / step));
      track.scrollBy({ left: dir * step * count, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };

    prev.addEventListener('click', function () { page(-1); });
    next.addEventListener('click', function () { page(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // ---------- 작곡 갤러리: 셀 호버/포커스 시 미리보기(video 또는 data-gif) 재생 ----------
  // 모션 줄이기 설정이면 정지 썸네일만 보이고, 터치 기기는 탭하면 바로 링크로 이동
  Array.prototype.slice.call(document.querySelectorAll('[data-preview]')).forEach(function (cell) {
    var video = cell.querySelector('video');
    var gif = cell.querySelector('img[data-gif]');
    if (!video && !gif) return;
    var still = gif && gif.getAttribute('src');
    // 호버 순간에 내려받으면 재생이 늦으므로 페이지 로드가 끝난 뒤 미리 받아 둠 (HTML에서는 preload="none")
    window.addEventListener('load', function () {
      if (video) { video.preload = 'auto'; video.load(); }
      else new Image().src = gif.getAttribute('data-gif');
    });

    var start = function () {
      if (reduceMotion.matches) return;
      if (video) {
        var played = video.play();
        if (played && played.catch) played.catch(function () {});
      } else {
        gif.src = gif.getAttribute('data-gif');
      }
    };
    var stop = function () {
      if (video) {
        video.pause();
        video.currentTime = 0;
        cell.classList.remove('is-previewing');
      } else {
        gif.src = still;
      }
    };

    // 첫 프레임이 실제로 그려진 뒤에만 영상을 보여 줘 빈 화면이 번쩍이지 않게 함
    if (video) video.addEventListener('playing', function () { cell.classList.add('is-previewing'); });
    cell.addEventListener('mouseenter', start);
    cell.addEventListener('focus', start);
    cell.addEventListener('mouseleave', stop);
    cell.addEventListener('blur', stop);
  });

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
