# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal GitHub Pages portfolio (`cty0613.github.io`) for Tae Young Choi. Plain static HTML/CSS/JS — no build step, package manager, linter, or tests. Pushing to `main` deploys via GitHub Pages. Content is mostly Korean.

To preview locally, serve the repo root (root-relative paths break under `file://`):

```sh
python3 -m http.server 8000   # then open http://localhost:8000/
```

`http.server` does not serve `404.html` for missing paths the way GitHub Pages does, so legacy-URL redirects can only be exercised on the deployed site (or by mocking 404 responses in a headless browser).

## Structure

- `index.html` — portfolio home: an unlisted hero (name, one-line intro, self-intro body), then sections `#about`, `#experience`, `#projects`, `#archives` (these ids drive the header/side-nav links and scroll-spy). `#about` holds two columns side by side at ≥1056px (stacked below): About Me (an ID photo `img.home-photo` (`assets/img/profile.webp`, converted from `assets/img/photos/profile.jpg`; stretched to the table height when side by side, 3:4 when stacked — beside a `dl.home-profile` of personal details plus contact links, each `dt` with a 16px Carbon icon) and Skills. Skills/Experience are filled from the owner's resume (only those two resume sections are meant to appear; experience logos live in `assets/img/logos/`); remaining placeholders are marked with `<!-- TODO: ... -->` comments; repeatable blocks (skill groups, timeline items, archive tiles, link rows) are meant to be duplicated.
- `#projects` (collaborative projects: bus-bom, hoiks, paws) and `#archives` are horizontal card carousels: `ul.home-card-track[data-carousel]` of `a.home-card` tiles, each with a 16:9 `.home-card__thumb` (icon placeholder; add an `<img>` inside for a real thumbnail). Cards are ~1/3 of the column (min 18rem) and scroll-snap; `home.js` shows the prev/next buttons in the title column (`[data-carousel-prev|next][aria-controls=<track id>]`) only when the track overflows. Project detail pages still live under `experience/<slug>/` (URLs kept) but their breadcrumb/back link point to `#projects`.
- `experience/<slug>/index.html` — one detail page per Experience or Projects item (breadcrumb, meta, 개요/주요 내용/성과, and a TODO "상세 내용" section). Each main-page timeline item links to its page: the title's `a.home-timeline__link` has a `::after` overlay stretched over the whole `li`, so the entire item is clickable. Adding an experience means adding both the `li` in `index.html` and a page here (copy an existing one; asset paths are `../../`). Their header links point at `../../#section`, so they carry no `data-nav-link` and `home.js` skips scroll-spy there.
- Hero background (`.home-hero`, always `cds--g100`): a 65:9 band of photos scrolling as a seamless marquee. Source photos are `assets/img/photos/*.jpg` (large originals, gitignored); the page uses resized copies in `assets/img/hero/*.webp` (800px tall). The `img` list in `index.html` is the single source — `home.js` clones it once and animates by the measured width of one set (`--hero-shift`, `--hero-duration`), so keep `width`/`height` attributes on each `img`. Below ~1200px wide the band grows taller than 65:9 to fit the text.
- `assets/css/home.css`, `assets/js/home.js` — home page styles and behavior (theme switching, mobile side nav, scroll-spy highlighting of the current section in the header/side nav).
- `404.html` — GitHub Pages custom 404. Also redirects pre-`archive/` URLs (`/tu2024fall/tu2024index.html`, `/fourthree/...`, etc.) to their `/archive/...` locations, since those old links were shared on posters/QR codes. Uses root-absolute asset paths because it's served at arbitrary paths.
- `archive/<name>/` — legacy sites, each served at `/archive/<name>/` (entry file renamed to `index.html`). `archive/index.html` just redirects to `/#archives`. To add an archive, create `archive/<name>/index.html` and add a card to the Archives carousel in `index.html`; if its old URL was public, add the name to the regex in `404.html`.

## Home page: Carbon Design System

The home page (and `404.html`) follows IBM Carbon, using the compiled `@carbon/styles` CSS from jsDelivr (version pinned in the `<link>`) with raw `cds--*` class markup — no Carbon JS/web components. Things to know:

- Theme is a Carbon zone class on `<html>`: `cds--white` or `cds--g100`, chosen from `prefers-color-scheme` by an inline `<head>` script (to avoid a flash) and kept in sync by `home.js`. Only use Carbon color tokens (`--cds-text-primary`, `--cds-layer-01`, …) so both themes work.
- The compiled CSS defines color tokens per theme but **not** spacing/type tokens (`--cds-spacing-*`, `--cds-heading-04-*`, …) — components only reference them with fallbacks. `home.css` defines the ones it uses in `:root` with Carbon's official values; add any new token there or it silently resolves to nothing (collapsed spacing, default font sizes).
- Not every Carbon utility class exists in the compiled bundle (e.g. `cds--text-truncate--end`, `cds--type-*`); check the CSS before relying on one.
- Hangul comes from IBM Plex Sans KR (Google Fonts), appended to the body font stack after IBM Plex Sans; `word-break: keep-all` is set for Korean line breaking.
- UI shell: `cds--header__nav` shows at ≥1056px (66rem); below that, the menu toggle opens `#side-nav` (`cds--side-nav--hidden` + `cds--side-nav--expanded`) with the overlay, all wired in `home.js`.

## Archived concert microsites

`archive/tu2023fall/`, `archive/tu2024spring/`, `archive/tu2024fall/` are microsites for the Hongik University band club 뚜라미 (TURAMI); `archive/fourthree/` is the 2022 site for the club's 43rd cohort (뽀뚜리). They use Bootstrap 4 + jQuery and are unrelated to the Carbon home page.

Each concert site was created by copying the previous one, so every subsite is fully self-contained with its own vendored `css/bootstrap.min.css`, `js/jquery-3.6.0.min.js`, `css/main.css`, and `js/main.js`. Changes to one do not propagate to others. Paths are relative (`./css/...` from the entry, `../css/...` from `pages/`), which is why they survived the move under `archive/`; keep them relative. Images are mostly CSS `background-image`s in `css/main.css`, and the nav markup is duplicated on every page.

Interaction lives in `js/main.js` (jQuery), driven by class/id contracts in the HTML:
- Setlist: `<p id="X" class="songcell">` opens the matching `<section id="X-detail" class="song-detail">`; clicking the detail closes it. Song ids and detail ids must stay paired.
- `.navlist-item` toggles `.nav-extend`; `.nav-donate` alerts then redirects to the KakaoPay link in `kapay`; `.poster` click fades in `.infobox`.

The three concert sites were built mobile-only (layout relies on `position: fixed` and `vh`), so every page of theirs loads the one shared exception to self-containment, `archive/mobile-frame.js`, in `<head>` (`../mobile-frame.js` from the entry, `../../mobile-frame.js` from `pages/`). At ≥768px wide and top-level, it swaps the page for a phone-sized frame (390×700) iframing the same URL, syncing the address bar/title on iframe navigation; a "전체 화면으로 보기" toggle (sessionStorage) shows the original instead. Inside the iframe it targets `a.portfolio-link` at `_top` and external links at `_blank`, and the KakaoPay redirect in `main.js` uses `window.top.location`. Add the script to any new page there.

Every archive page's footer ends with a small `a.portfolio-link` back to the portfolio (`../../#archives` from the entry, `../../../#archives` from `pages/`/`html/`), styled per subsite in its `css/main.css`; add one when adding a page. (`tu2023fall/pages/easter.html` has no footer, and fourthree hides `#footer` on mobile.)

Known pre-existing issue: `archive/tu2024fall/css/main.css` imports `easterstyle.css`, which doesn't exist in that subsite (harmless 404).
