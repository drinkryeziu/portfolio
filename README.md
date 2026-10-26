# Drin Kryeziu — portfolio

A paper desk with typewriter ink, tape, pencil notes and coffee rings. It shows dev projects as dot-matrix printouts and graphic design as Polaroids.

Built with Next.js 15 (App Router), React 19 and TypeScript. It uses no UI libraries and every page is static.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
```

## Deploy

Import the repo on [Vercel](https://vercel.com/new) and keep the defaults (framework preset: Next.js). Any host that runs `next build` / `next start` works too.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: intro, dev projects, graphic design, experience, skills, contact (`app/page.tsx`) |
| `/logos`, `/posters`, `/book-covers`, `/watches` | Polaroid galleries (`app/[category]/page.tsx` + `components/GalleryPage.tsx`) |
| `/contact` | "Write to me" letter form that emails drinkryeziu@gmail.com (`app/contact/`, `components/ContactForm.tsx`, `app/api/contact/route.ts`) |
| `/resume` | Résumé as an old newspaper, with a PDF download (`app/resume/`) |
| `/work/krzresumebuilder`, `/work/krzapplyai`, `/work/lundro` | App screens with Phone / Tablet / Desktop tabs (`app/work/<app>/page.tsx` + `components/screens/`) |

## Add graphic design work

1. Put the image in `public/images/<category>/`, e.g. `public/images/posters/my-poster.jpg`.
2. Add a row to that category in `lib/galleries.ts`:

   ```ts
   { src: "/images/posters/my-poster.jpg", width: 500, height: 750, title: "My Poster" },
   ```

   `width` and `height` are the image's pixel size, or any two numbers with the same ratio. Each piece keeps its own aspect ratio, and the count in the page intro updates on its own.

To change the thumbnail of a category on the home page, edit the Polaroid `img` in `app/page.tsx`.

## Add or update app screens

Screens live in `public/images/<app>/{phone,tablet,desktop}/<name>.jpg`. Each app's list of screens is in `app/work/<app>/page.tsx`, and its faded background code is in `lib/<app>-code.ts`. Captures are 860 px wide on phone (430 px at 2x), 1230 px on tablet (820 px at 1.5x) and 1440 px on desktop. `hdr` is the height of the app's own top bar in the phone capture, which stays pinned while you scroll.

## Placeholders to fill in

None right now. To change the résumé photo, replace `public/images/resume/drin.jpg` (a newspaper-style halftone, 800×1000).


## Contact form email

The form posts to `/api/contact`, which sends the message with [Resend](https://resend.com).

1. Sign up at resend.com with **drinkryeziu@gmail.com** and create an API key.
2. In Vercel: Project → Settings → Environment Variables, add `RESEND_API_KEY` = that key (Production), then redeploy.
3. Optional, once drinkryeziu.com is verified in Resend: add `CONTACT_FROM` = `Portfolio <hello@drinkryeziu.com>`.

Until the key is set, the form opens the visitor's own mail app with the subject and message filled in.

## Update the résumé

Replace `public/DrinKryeziu_Resume_05-2026.pdf` (or add a new file and change `PDF` in `app/resume/page.tsx`). The newspaper text lives in the same file.

## Design notes

- Colors: ink `#1d1a17`, paper `#efebe2` / `#fbf9f4`, indigo accent `#3a30b0`, pencil `#4a4a4a`
- Fonts (Google Fonts): Special Elite for headlines, Courier Prime for body text, Caveat for handwriting and DotGothic16 for dot-matrix buttons
- Paper grain, ink bleed, pencil wobble and coffee stains are SVG filters (`components/Paper.tsx`; the home page has its own copy inline). Torn edges and tape use CSS `clip-path` (`app/globals.css`).
