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

### Check with [Prettier](https://prettier.io/)

```sh
npm run format
```

## Image optimization

Images are optimized **by hand**, not by the Vite build. Convert every new photo to WebP before you commit it.

- **CLI program:** `cwebp`, from the [libwebp](https://developers.google.com/speed/webp/docs/cwebp) package.
- **Install (macOS):** `brew install webp`
- **Full-resolution originals:** keep them in `image-originals/` (gitignored, never deployed).
- **Deployed assets:** write the `.webp` output to `public/assets/img/`.

### Carousel photos

Every carousel photo is **240x320** (3:4 portrait), quality **80**, encode method **6**. Crop the source to an exact 3:4 ratio first, otherwise `-resize` stretches it.

```sh
# 3:4 source — resize only
cwebp -resize 240 320 -q 80 -m 6 \
  image-originals/<name>.jpg -o public/assets/img/carousel_<n>.webp

# non-3:4 source — center-crop to 3:4, then resize.
# Example: carousel_20.png is 981x1292. A 3:4 crop is 969 wide, so the
# horizontal offset is (981 - 969) / 2 = 6.
cwebp -crop 6 0 969 1292 -resize 240 320 -q 80 -m 6 \
  image-originals/carousel_20.png -o public/assets/img/carousel_19.webp
```

`cwebp` applies `-crop` **before** `-resize`, so give the crop box in source pixels.

Read the source dimensions with `sips -g pixelWidth -g pixelHeight <file>` (macOS). Check the result with `webpinfo <file>.webp`.

The carousel numbers its files sequentially. `src/sections/Carousel.vue` builds the paths in a loop, so the output name must continue the `carousel_1.webp` … `carousel_N.webp` run with no gap. Increase the loop bound when you add a photo.

## Deployment

The site is published by GitHub Actions: every **published Release** triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site with Vite, encrypts the output with [StatiCrypt](https://github.com/robinmoisson/staticrypt), and deploys it to GitHub Pages via the `actions/deploy-pages` artifact flow.

Pull requests run the same build + encrypt as a smoke test but never deploy.

### Required GitHub repo configuration

| Kind | Name | Value                                                                                             |
| --- | --- |---------------------------------------------------------------------------------------------------|
| Variable (`vars`) | `STATICRYPT_SALT` | 32-char lowercase hex string — the StatiCrypt salt. Public by design; safe as a Variable.         |
| Secret (`secrets`) | `STATICRYPT_PASSWORD` | The password visitors must enter to unlock the site.                                              |
| Secret (`secrets`) | `VITE_GIFT_IBAN` | IBAN shown on the gift-list card in the Lista Nozze section. Baked into the bundle at build time. |
| Secret (`secrets`) | `VITE_GIFT_IBAN_HOLDER` | Account holder name shown on the gift-list card. Baked into the bundle at build time.             |
| Secret (`secrets`) | `VITE_GIFT_IBAN_BANK` | Bank name shown on the gift-list card. Baked into the bundle at build time.                       |
| Secret (`secrets`) | `VITE_GOOGLE_FORM_URL` | The url to the Google Form which will gather attendee data.                                       |

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
  && npx staticrypt dist/* -r -d docs \
    -p "$STATICRYPT_PASSWORD" \
    -s "$STATICRYPT_SALT" \
    -c false \
    --template-button Accedi \
    --template-color-primary \#d99b16 \
    --template-color-secondary \#81c5e4 \
    --template-error 'Oh oh oh, non hai detto la parola magica' \
    --template-remember 'Mantienimi loggato' \
    --template-title 'Sbircia qualche informazione in più sulle nostre nozze!'\
    --template-toggle-hide 'Nascondi la password' \
    --template-toggle-show 'Mostra la password' \
  && npx -y http-server docs -p 4173
```

Open `http://127.0.0.1:4173/` — the StatiCrypt password gate should appear.

### Staticrypt url regeneration

After building the site with `npm run build`, and having build the static artifact with the command described in the 
previous paragraph, run the following command to get the URL with the login bypass:

```bash
staticrypt -r dist/* -d docs -s $STATICRYPT_SALT --share https://your-website.xyz
```

### Files

- [`public/CNAME`](public/CNAME) — custom-domain marker; Vite copies it through `dist/` and StatiCrypt copies it into `docs/`.
- [`docs/`](docs/) — encrypted build output, **gitignored**. Produced by CI; do not commit.

