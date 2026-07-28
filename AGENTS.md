# AGENTS.md

Instructions for AI agents working on this repository. Read this before making changes.

## Project overview

A small, single-page **wedding website** for Carlotta & Marco (wedding date: **2026-11-14**). It is a static Vue 3 SPA built with Vite, deployed to GitHub Pages, and password-protected at rest via StatiCrypt. There is no backend, no database, and no runtime API — everything ships as static, encrypted HTML/JS/CSS.

All **user-facing copy is in Italian**. Keep new copy in Italian and match the warm, informal tone of the existing text (e.g. "Vi aspettiamo!"). Code, comments, identifiers, and commit messages are in English.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Vue 3 (`<script setup>` SFCs, Composition API) |
| Language | TypeScript (strict, via `@vue/tsconfig`) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first `@theme` config — **no `tailwind.config.js`**) |
| Icons | Tabler Icons (`@tabler/icons-vue`) |
| Linting | oxlint + ESLint (flat config in `eslint.config.ts`) |
| Formatting | Prettier |
| Testing | None set up (no test runner installed) |
| Encryption | StatiCrypt (build-time, CI only) |
| Hosting | GitHub Pages, custom domain `carlyeguido.love` |
| Node | `^20.19.0 || >=22.12.0` (CI uses 22) |

## Project structure

```
index.html              # Vite entry HTML; loads Google Font "Allison", favicons, /src/main.ts
src/
  main.ts               # App entry — createApp(App).mount('#app'). THIS is the real entry point.
  index.css             # Tailwind import + @theme tokens + @font-face + font utility classes
  App.vue               # Root layout; composes the page sections in order
  sections/
    Hero.vue            # Landing hero + live countdown to the wedding date
    Logistics.vue       # Venue info + embedded Google Map
    Timeline.vue        # Wedding-day schedule — accordion of events (Tabler icons)
    Gifts.vue           # "Lista Nozze" — flip-card gift list + IBAN bank details
    Rsvp.vue            # RSVP form — posts to a Google Form (no-cors fetch) for attendance/companions/allergies
    Carousel.vue        # Interactive auto-scrolling photo marquee (drag/scroll + autoplay)
  components/
    BankDetails.vue     # IBAN card (iban/holder/bank) with per-line copy buttons
    CopyIcon.vue        # Inline SVG copy icon
    Layout/
      SiteSection.vue   # Section shell — full-height wrapper + heading + #content slot
      SectionHeader.vue # Heading + optional sub-heading, with alignment prop
public/
  CNAME                 # Custom-domain marker (carlyeguido.love); copied through dist/ → docs/
  assets/
    img/                # carousel_1..19.webp, wall_1..6.webp, fluffy.webp, egypt.webp
    font/Bacalisties.ttf
    favicon/            # favicons + site.webmanifest
.github/workflows/
  deploy.yml            # Build + StatiCrypt encrypt + Pages deploy (on Release; smoke-test on PR)
  lint.yml              # Lint + format check (on PR) — intended as a required status check
```

The page is a single vertical stack: `App.vue` renders `<hero>`, `<logistics>`, `<timeline>`, `<gifts>`, `<rsvp>`, `<carousel>` in order. Most sections wrap their body in `<site-section>` (`src/components/Layout/`), which provides the full-height shell, heading, and `#content` slot. To add a section, create `src/sections/<Name>.vue` (typically using `<site-section>`) and import + place it in `App.vue`.

## Commands

```sh
npm install        # install deps
npm run dev        # Vite dev server with HMR + Vue DevTools
npm run build      # type-check (vue-tsc) + production build to dist/
npm run preview    # preview the production build

npm run lint       # oxlint + eslint WITH --fix (mutates files) — use locally
npm run lint:check # oxlint + eslint WITHOUT --fix (reports only) — what CI runs
npm run format     # prettier --write on src/ (mutates files)
npm run format:check  # prettier --check on src/ — what CI runs
```

Before opening a PR, run `npm run lint:check` and `npm run format:check` — these must pass or the PR is blocked (see CI/CD). `npm run lint` and `npm run format` auto-fix; the `:check` variants only report and are what gate the merge.

## Coding conventions

### Formatting (enforced by Prettier + EditorConfig)
- **No semicolons**, **single quotes**, **print width 100**.
- 2-space indentation, LF line endings, UTF-8, final newline, no trailing whitespace.
- Let Prettier own formatting — don't hand-format; run `npm run format`.

### Vue components
- Always `<script setup lang="ts">`.
- Section components (`src/sections/`) call `defineComponent({ name: '<kebab>-section' })` for a stable devtools name (existing pattern: `hero-section`, `logistics-section`, `timeline-section`, `gifts-section`, `carousel-section`). Reusable components (`src/components/`) follow the same idea with a plain kebab name (`bank-details`, `copy-icon`, `site-section`, `section-header`).
- `defineProps`/`withDefaults` are **compiler macros** — do **not** import them from `vue` in `<script setup>` (it causes a `TS2440` collision and breaks the build). They're globally available.
- Components are imported with PascalCase names and used as kebab-case tags in templates (e.g. import `Hero`, use `<hero />`). Match the surrounding style.
- Prefer Composition API primitives (`ref`, `computed`, `onMounted`/`onUnmounted`). Clean up side effects (timers, listeners) in `onUnmounted` — see `Hero.vue`'s countdown timer.
- The `@` alias maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Use it for cross-directory imports; relative imports are fine within a directory.

### TypeScript
- Strict mode is on. **No `any`** and **no unused variables** — both are ESLint errors that block CI. Remove dead code rather than leaving it (a stale unused function previously broke the lint gate).
- Type-checking for `.vue` files uses `vue-tsc`, not plain `tsc`. `npm run build` runs it; trust build/type-check output over editor-only checks.

### Styling
- Tailwind v4, configured **in CSS** via `@theme` in `src/index.css` — there is no JS Tailwind config file. Add design tokens there.
- Custom theme tokens already defined (use these, don't hardcode hex):
  - Colors: `mustard-yellow` (#efa919), `powder-blue` (#81c5e4), `cream-background` (#fdfbf7) → usable as `text-powder-blue`, `bg-cream-background`, etc.
  - Fonts: `font-display` (Playfair Display, serif), `font-body` (Lato/Montserrat).
- Decorative script fonts use utility classes from `index.css`: `.allison-regular` (loaded via Google Fonts in `index.html`) and `.bacalisties-regular` (local `@font-face`).
- Prefer Tailwind utility classes in templates over `<style>` blocks. Use scoped `<style>` only for things Tailwind can't express cleanly (3D transforms/keyframes — see `Gifts.vue`'s flip-card, or `Carousel.vue`'s scrollbar hiding).

## Testing

There is **no test setup** — no test runner is installed and there is no `test` npm script. If testing is needed, add a runner (e.g. Vitest + `@vue/test-utils`), wire up a `test` script, and re-add the corresponding ESLint/oxlint test plugin config.

## CI/CD & deployment

Two workflows, both triggered automatically — do not run deploy steps locally against production.

- **`lint.yml`** (on every PR): runs `npm run lint:check` + `npm run format:check`. It is meant to be a **required status check** so failing lint/format blocks merging. The required-check toggle must be set in GitHub branch protection (repo Settings) — it cannot be enabled from code.
- **`deploy.yml`**:
  - On **PR**: builds and runs StatiCrypt as a smoke test; never deploys.
  - On **published Release**: builds with Vite, encrypts `dist/*` into `docs/` with StatiCrypt, and deploys `docs/` to GitHub Pages.

Deployment depends on two repo-level settings (see `README.md` for the full table):
- `vars.STATICRYPT_SALT` — 32-char hex salt (public by design).
- `secrets.STATICRYPT_PASSWORD` — the password visitors enter to unlock the site.

To ship: merge to `main`, then publish a GitHub Release (a draft does **not** trigger deploy).

## Gotchas

- **`docs/` is generated and gitignored** — it's the encrypted StatiCrypt output produced by CI. Never commit it or hand-edit it. It's also excluded from linting.
- **`dist/` is build output** — gitignored, don't commit.
- **Images are pre-optimized WebP**, committed as static assets in `public/assets/img/`. Conversion is a **manual** `cwebp` step (resize + encode), **not** part of the Vite build — re-run it when adding photos and reference `.webp` paths. The full-res originals are kept locally in `image-originals/` (gitignored, not deployed). Add `loading="lazy"`/`decoding="async"` on below-the-fold `<img>`s.
- **The Gifts section's IBAN data comes from `VITE_*` env vars** (`VITE_GIFT_IBAN`, `VITE_GIFT_IBAN_HOLDER`, `VITE_GIFT_IBAN_BANK`, plus the `VITE_TRAVEL_*` trio). `.env.example` documents them; `.env.local` holds local values (gitignored); CI injects them as repo **secrets** in `deploy.yml`. They're baked into the bundle at build time — `VITE_`-prefixed vars are public once shipped.
- **The RSVP section posts to a Google Form** via `VITE_GOOGLE_FORM_URL` (the form's `viewform`/share URL — the section normalizes it to the `formResponse` endpoint). Submission is a `mode: 'no-cors'` `fetch`, so the response is opaque: a resolved fetch is treated as success, a thrown network error as failure. The Google Form field IDs (`entry.*` for name/attendance/companions/allergies) and the attendance radio option strings are hardcoded in `Rsvp.vue` and **must match the live form exactly** — update both together if the form changes.
- The real, only entry point is `src/main.ts`.
- The lint scripts come in two flavors: `lint`/`format` mutate files (`--fix`/`--write`); `lint:check`/`format:check` only report. CI uses the `:check` ones — keep them green.

## Git & PR workflow

- Branch off `main`; do not commit directly to `main`.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:` — see `git log`).
- Only commit/push when asked. Ensure `npm run lint:check`, `npm run format:check`, and `npm run build` pass before proposing a PR.
