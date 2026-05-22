# Our own Wedding Site ❤️

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

The site is published by GitHub Actions: every **published Release** triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site with Vite, encrypts the output with [StatiCrypt](https://github.com/robinmoisson/staticrypt), and deploys it to GitHub Pages via the `actions/deploy-pages` artifact flow.

Pull requests run the same build + encrypt as a smoke test but never deploy.

### Required GitHub repo configuration

| Kind | Name | Value |
| --- | --- | --- |
| Variable (`vars`) | `STATICRYPT_SALT` | 32-char lowercase hex string — the StatiCrypt salt. Public by design; safe as a Variable. |
| Secret (`secrets`) | `STATICRYPT_PASSWORD` | The password visitors must enter to unlock the site. |

Pages source: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

### Cutting a release

1. Push your changes to `main`.
2. Create a new GitHub Release (e.g. tag `v0.2.0`) and click **Publish release** — drafts do not trigger the workflow.
3. Watch the Actions run; the `deploy` job's output `page_url` should match the custom domain.

If `STATICRYPT_PASSWORD` or `STATICRYPT_SALT` is missing, the workflow fails fast with a clear error rather than producing a broken encrypted site.

### Local sanity check

Replicates exactly what CI does, ending on a local preview server:

```sh
export STATICRYPT_PASSWORD='...'
export STATICRYPT_SALT='...'

rm -rf dist docs \
  && npm ci \
  && npm run build \
  && npx staticrypt 'dist/*' -r -d docs \
       -p "$STATICRYPT_PASSWORD" -s "$STATICRYPT_SALT" -c false \
  && npx http-server docs -p 4173
```

Open `http://127.0.0.1:4173/` — the StatiCrypt password gate should appear.

### Files

- [`public/CNAME`](public/CNAME) — custom-domain marker; Vite copies it through `dist/` and StatiCrypt copies it into `docs/`.
- [`docs/`](docs/) — encrypted build output, **gitignored**. Produced by CI; do not commit.

