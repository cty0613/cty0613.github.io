/*
 * 모바일 전용으로 만든 공연 아카이브(tu2023fall, tu2024spring, tu2024fall)를
 * PC 화면에서는 휴대폰 크기의 iframe 안에 띄워 보여준다.
 * 각 페이지 <head>에서 동기 로드한다. 원본 CSS가 position: fixed와 vh 단위에
 * 의존하므로, iframe 안에서 렌더링해야 휴대폰과 같은 뷰포트가 된다.
 */
(function () {
	var OFF_KEY = 'mobile-frame-off';
	var framed = window.self !== window.top;

	function storage(fn) {
		try { return fn(window.sessionStorage); } catch (e) { return null; }
	}

	function addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
		return style;
	}

	// iframe 안: 원본 그대로 두고 프레임을 벗어나야 하는 링크와 스크롤바만 보정
	if (framed) {
		addStyle('html{scrollbar-width:none}::-webkit-scrollbar{display:none}');
		document.addEventListener('DOMContentLoaded', function () {
			document.querySelectorAll('a[href]').forEach(function (a) {
				if (a.classList.contains('portfolio-link')) {
					a.target = '_top';
				} else if (a.host !== location.host) {
					a.target = '_blank';
					a.rel = 'noopener';
				}
			});
		});
		return;
	}

	// 실제 모바일(좁은 화면)은 원본 그대로
	if (!window.matchMedia('(min-width: 768px)').matches) return;

	// PC에서 "전체 화면으로 보기"를 고른 경우: 원본 위에 복귀 버튼만 띄움
	if (storage(function (s) { return s.getItem(OFF_KEY); })) {
		document.addEventListener('DOMContentLoaded', function () {
			addStyle(
				'.mf-restore{position:fixed;right:16px;bottom:66px;z-index:10000;' +
				'padding:6px 12px;border:1px solid rgba(255,255,255,.3);border-radius:999px;' +
				'background:rgba(0,0,0,.7);color:#fff;font:12px/1.4 system-ui,sans-serif;cursor:pointer}' +
				'.mf-restore:hover{background:#000}'
			);
			var btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'mf-restore';
			btn.textContent = '모바일 화면으로 보기';
			btn.addEventListener('click', function () {
				storage(function (s) { s.removeItem(OFF_KEY); });
				location.reload();
			});
			document.body.appendChild(btn);
		});
		return;
	}

	// PC: 원본 렌더링을 숨기고 휴대폰 틀 + 같은 주소의 iframe으로 교체
	var hide = addStyle('html{visibility:hidden;background:#161616}');

	document.addEventListener('DOMContentLoaded', function () {
		// 원본 스타일시트가 틀 페이지에 적용되지 않도록 제거
		document.querySelectorAll('link[rel="stylesheet"], style').forEach(function (el) {
			if (el !== hide) el.remove();
		});
		document.body.removeAttribute('style');
		document.body.className = '';

		addStyle(
			'html,body{margin:0;height:100%;background:#161616;color:#f4f4f4;' +
			'font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}' +
			'.mf-stage{box-sizing:border-box;min-height:100%;display:flex;flex-direction:column;' +
			'align-items:center;justify-content:center;gap:16px;padding:24px 16px}' +
			'.mf-device{box-sizing:content-box;width:390px;height:min(750px,calc(100vh - 120px));' +
			'border:10px solid #2a2a2a;border-radius:44px;overflow:hidden;background:#000;' +
			'box-shadow:0 0 0 1px #444,0 24px 64px rgba(0,0,0,.6)}' +
			'.mf-device iframe{display:block;width:100%;height:100%;border:0}' +
			'.mf-bar{display:flex;gap:16px;align-items:center}' +
			'.mf-bar a,.mf-bar button{padding:0;border:0;background:none;color:#c6c6c6;' +
			'font:inherit;text-decoration:underline;cursor:pointer}' +
			'.mf-bar a:hover,.mf-bar button:hover{color:#fff}'
		);

		var stage = document.createElement('div');
		stage.className = 'mf-stage';

		var device = document.createElement('div');
		device.className = 'mf-device';
		var iframe = document.createElement('iframe');
		iframe.src = location.href;
		iframe.title = document.title;
		device.appendChild(iframe);

		var bar = document.createElement('div');
		bar.className = 'mf-bar';
		var back = document.createElement('a');
		back.href = '/#archives';
		back.textContent = '← Tae Young Choi Portfolio';
		var full = document.createElement('button');
		full.type = 'button';
		full.textContent = '전체 화면으로 보기';
		full.addEventListener('click', function () {
			storage(function (s) { s.setItem(OFF_KEY, '1'); });
			location.href = iframe.contentWindow.location.href;
		});
		bar.appendChild(back);
		bar.appendChild(full);

		// iframe 안에서 페이지를 옮기면 주소창과 탭 제목도 맞춰 바꿈
		iframe.addEventListener('load', function () {
			try {
				var win = iframe.contentWindow;
				history.replaceState(null, '', win.location.href);
				document.title = win.document.title;
			} catch (e) { /* 다른 도메인으로 이동한 경우 */ }
		});

		stage.appendChild(device);
		stage.appendChild(bar);
		document.body.replaceChildren(stage);
		hide.remove();
	});
})();
