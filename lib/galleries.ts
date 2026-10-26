/**
 * Graphic design galleries. Each piece keeps its original aspect ratio; `area` sets how much
 * room each photo gets (in px²), so wide and tall pieces look about the same size.
 *
 * To add work: copy the image into /public/images/<category>/ and add a row here
 * (width/height = the image's pixel size, or any numbers with the same ratio).
 */

export type GalleryItem = { src: string; width: number; height: number; title: string };

export type Gallery = {
  slug: "logos" | "posters" | "book-covers" | "watches";
  name: string;
  /** Eyebrow line above the title. */
  eyebrow: string;
  /** Photo area per piece, px². */
  area: number;
  /** Gap between Polaroids: row gap, column gap (px). */
  gap: [number, number];
  /** Word for alt text, e.g. "logo". */
  kind: string;
  /** Show the running number ("NO. 01") or a fixed label under each caption. */
  label?: string;
  /** Gentler tilt and drop for very wide pieces. */
  tilts?: number[];
  drops?: number[];
  items: GalleryItem[];
};

export const GALLERIES: Gallery[] = [
  {
    slug: "logos",
    name: "Logos",
    eyebrow: "02 — Graphic design / Logos",
    area: 92000,
    gap: [56, 48],
    kind: "logo",
    items: [
      { src: "/images/logos/albanian-airlines.jpg", width: 300, height: 180, title: "Albanian Airlines" },
      { src: "/images/logos/logocbckosovo.jpg", width: 300, height: 300, title: "CBC Kosovo" },
      { src: "/images/logos/polifonia.jpg", width: 500, height: 300, title: "Polifonia" },
      { src: "/images/logos/synergy-logo.jpg", width: 500, height: 300, title: "Synergy" },
      { src: "/images/logos/tradewell-logo.jpg", width: 500, height: 300, title: "Tradewell" },
    ],
  },
  {
    slug: "posters",
    name: "Posters",
    eyebrow: "02 — Graphic design / Posters",
    area: 120000,
    gap: [56, 48],
    kind: "poster",
    items: [
      { src: "/images/posters/komploti-ilir.jpg", width: 500, height: 865, title: "Komploti Ilir" },
      { src: "/images/posters/korridoret.jpg", width: 750, height: 563, title: "Korridoret e Tmerrit" },
      { src: "/images/posters/nyc911.jpg", width: 500, height: 667, title: "NYC — 9/11" },
      { src: "/images/posters/poster-kodi-i-jetes.jpg", width: 500, height: 750, title: "Kodi i Jetës" },
    ],
  },
  {
    slug: "book-covers",
    name: "Book covers",
    eyebrow: "02 — Graphic design / Book covers",
    area: 92000,
    gap: [56, 44],
    kind: "book cover",
    items: [
      { src: "/images/book-covers/ekrem-kryeziu-drama.jpg", width: 500, height: 707, title: "Ekrem Kryeziu — Drama" },
      { src: "/images/book-covers/kopertine-rrota-e-ujit-w.jpg", width: 900, height: 1289, title: "Rrota e Ujit" },
      { src: "/images/book-covers/nensac-kopertina.jpg", width: 900, height: 1292, title: "Nën Saç" },
      { src: "/images/book-covers/adem-demaqi.jpg", width: 500, height: 750, title: "Demaçi: Metaforë Lirie" },
      { src: "/images/book-covers/andrra-amerikane-w.jpg", width: 900, height: 1282, title: "Ëndrra Amerikane" },
      { src: "/images/book-covers/epoka-para-gjyqit-w.jpg", width: 900, height: 1273, title: "Epoka para Gjyqit" },
      { src: "/images/book-covers/mbreti-zog-w.jpg", width: 900, height: 1382, title: "Mbreti Zog" },
      { src: "/images/book-covers/darkae-gabuar-4.jpg", width: 500, height: 709, title: "Darkë e Gabuar" },
      { src: "/images/book-covers/lindje-perendim.jpg", width: 500, height: 724, title: "Nga Lindja në Perëndim" },
      { src: "/images/book-covers/resmije-kryeziu-femina-litterarum-kopertina.jpg", width: 300, height: 429, title: "Femina Litterarum" },
      { src: "/images/book-covers/kopertina-resmejes-finale.jpg", width: 300, height: 518, title: "Akti Krijues" },
      { src: "/images/book-covers/floresha-dado-sfida2.jpg", width: 500, height: 800, title: "Sfida Teorike" },
      { src: "/images/book-covers/kopertina-naxhije-doci2.jpg", width: 500, height: 710, title: "Krimi dhe Përdhunimi Serb" },
      { src: "/images/book-covers/gne-politken-kosovare02.jpg", width: 500, height: 709, title: "Gratë në Politikën Kosovare" },
      { src: "/images/book-covers/ballina-imazhi-i-grave-shqip.jpg", width: 500, height: 719, title: "Imazhi i Grave Politikane" },
      { src: "/images/book-covers/ballina01position-of-roma--ashkali-and-egyptian-women-in-kosovo.jpg", width: 500, height: 709, title: "Roma, Ashkali and Egyptian Women" },
      { src: "/images/book-covers/historty.jpg", width: 500, height: 849, title: "History is Herstory Too" },
      { src: "/images/book-covers/kopertina-audtimi-gjinor.jpg", width: 500, height: 740, title: "Auditimi Gjinor" },
      { src: "/images/book-covers/kopertina-manuali-eu-cbckosovo-01xerox.jpg", width: 500, height: 707, title: "CBC Kosovo Training Manual" },
      { src: "/images/book-covers/katalogu-tefik-canga-1.jpg", width: 300, height: 422, title: "Tefik Canga — Catalogue" },
    ],
  },
  {
    slug: "watches",
    name: "Watches",
    eyebrow: "02 — Graphic design / Watches",
    area: 92000,
    gap: [56, 40],
    kind: "watch design",
    label: "WATCH",
    tilts: [-1.6, 1.2, -0.8, 1.8, -0.4, 1.0],
    drops: [0, 22, 8, 28, 4, 14],
    items: [
      { src: "/images/watches/watch-001.jpg", width: 1600, height: 638, title: "No. 01" },
      { src: "/images/watches/watch-002.jpg", width: 1600, height: 638, title: "No. 02" },
      { src: "/images/watches/watch-003.jpg", width: 1600, height: 638, title: "No. 03" },
      { src: "/images/watches/watch-004.jpg", width: 1600, height: 638, title: "No. 04" },
      { src: "/images/watches/watch-005.jpg", width: 1600, height: 638, title: "No. 05" },
      { src: "/images/watches/watch-006.jpg", width: 1600, height: 638, title: "No. 06" },
      { src: "/images/watches/watch-007.jpg", width: 1600, height: 638, title: "No. 07" },
      { src: "/images/watches/watch-008.jpg", width: 1600, height: 638, title: "No. 08" },
      { src: "/images/watches/watch-009.jpg", width: 1600, height: 638, title: "No. 09" },
      { src: "/images/watches/watch-010.jpg", width: 1600, height: 638, title: "No. 10" },
      { src: "/images/watches/watch-011.jpg", width: 1600, height: 638, title: "No. 11" },
      { src: "/images/watches/watch-012.jpg", width: 1600, height: 638, title: "No. 12" },
      { src: "/images/watches/watch-013.jpg", width: 1600, height: 638, title: "No. 13" },
      { src: "/images/watches/watch-014.jpg", width: 1600, height: 638, title: "No. 14" },
      { src: "/images/watches/watch-015.jpg", width: 1600, height: 638, title: "No. 15" },
      { src: "/images/watches/watch-016.jpg", width: 1600, height: 638, title: "No. 16" },
      { src: "/images/watches/watch-017.jpg", width: 1600, height: 638, title: "No. 17" },
      { src: "/images/watches/watch-018.jpg", width: 1600, height: 638, title: "No. 18" },
      { src: "/images/watches/watch-018-v2.jpg", width: 1600, height: 638, title: "No. 18 · v2" },
      { src: "/images/watches/watch-019.jpg", width: 1600, height: 638, title: "No. 19" },
      { src: "/images/watches/watch-020.jpg", width: 1600, height: 638, title: "No. 20" },
      { src: "/images/watches/watch-021.jpg", width: 1600, height: 638, title: "No. 21" },
      { src: "/images/watches/watch-022.jpg", width: 1600, height: 638, title: "No. 22" },
      { src: "/images/watches/watch-023.jpg", width: 1600, height: 638, title: "No. 23" },
      { src: "/images/watches/watch-024.jpg", width: 1600, height: 638, title: "No. 24" },
      { src: "/images/watches/watch-025.jpg", width: 1600, height: 638, title: "No. 25" },
      { src: "/images/watches/watch-026.jpg", width: 1600, height: 638, title: "No. 26" },
      { src: "/images/watches/watch-027.jpg", width: 1600, height: 638, title: "No. 27" },
      { src: "/images/watches/watch-028.jpg", width: 1600, height: 638, title: "No. 28" },
      { src: "/images/watches/watch-029.jpg", width: 1600, height: 638, title: "No. 29" },
      { src: "/images/watches/watch-030.jpg", width: 1600, height: 638, title: "No. 30" },
      { src: "/images/watches/watch-031.jpg", width: 1600, height: 638, title: "No. 31" },
      { src: "/images/watches/watch-032.jpg", width: 1600, height: 638, title: "No. 32" },
      { src: "/images/watches/watch-033.jpg", width: 1600, height: 638, title: "No. 33" },
      { src: "/images/watches/watch-034.jpg", width: 1600, height: 638, title: "No. 34" },
      { src: "/images/watches/watch-035.jpg", width: 1600, height: 638, title: "No. 35" },
      { src: "/images/watches/watch-036.jpg", width: 1600, height: 638, title: "No. 36" },
      { src: "/images/watches/watch-037.jpg", width: 1600, height: 638, title: "No. 37" },
      { src: "/images/watches/watch-038.jpg", width: 1600, height: 638, title: "No. 38" },
      { src: "/images/watches/watch-039.jpg", width: 1600, height: 638, title: "No. 39" },
      { src: "/images/watches/watch-040.jpg", width: 1600, height: 638, title: "No. 40" },
      { src: "/images/watches/watch-041.jpg", width: 1600, height: 638, title: "No. 41" },
      { src: "/images/watches/watch-042.jpg", width: 1600, height: 638, title: "No. 42" },
      { src: "/images/watches/watch-043.jpg", width: 1600, height: 638, title: "No. 43" },
      { src: "/images/watches/watch-044.jpg", width: 1600, height: 638, title: "No. 44" },
    ],
  },
];

export const getGallery = (slug: string) => GALLERIES.find((g) => g.slug === slug);
