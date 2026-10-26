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
| `/work/krzresumebuilder` | KRZResumeBuilder screens with Phone / Tablet / Desktop tabs (`app/work/krzresumebuilder/page.tsx`) |

## Add graphic design work

1. Put the image in `public/images/<category>/`, e.g. `public/images/posters/my-poster.jpg`.
2. Add a row to that category in `lib/galleries.ts`:

   ```ts
   { src: "/images/posters/my-poster.jpg", width: 500, height: 750, title: "My Poster" },
   ```

   `width` and `height` are the image's pixel size, or any two numbers with the same ratio. Each piece keeps its own aspect ratio, and the count in the page intro updates on its own.

To change the thumbnail of a category on the home page, edit the Polaroid `img` in `app/page.tsx`.

## Add or update app screens

Screens live in `public/images/krzresumebuilder/{phone,tablet,desktop}/<name>.jpg`, and the list is in `components/krz/ScreensTabs.tsx`. Phone captures are 860 px wide. The app's top bar (138 px on public pages, 122 px elsewhere) stays pinned while you scroll.

## Placeholders to fill in

Search `app/page.tsx` for these:

- `mailto:[your@email.com]`: your email for the "EMAIL ME" button
- The LinkedIn and Download CV buttons (they point to `#contact` for now; GitHub already links to github.com/drinkryeziu)
- Experience: `[Job title] · [Company]`, `[YEAR]` ranges and the one-line descriptions
- Dev project 03: `[Project name]`, its description and image

## Design notes

- Colors: ink `#1d1a17`, paper `#efebe2` / `#fbf9f4`, indigo accent `#3a30b0`, pencil `#4a4a4a`
- Fonts (Google Fonts): Special Elite for headlines, Courier Prime for body text, Caveat for handwriting and DotGothic16 for dot-matrix buttons
- Paper grain, ink bleed, pencil wobble and coffee stains are SVG filters (`components/Paper.tsx`; the home page has its own copy inline). Torn edges and tape use CSS `clip-path` (`app/globals.css`).
