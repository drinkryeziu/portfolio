/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Gallery } from "@/lib/galleries";
import { GALLERIES } from "@/lib/galleries";
import { CupRing, DeskLight, PaperFiber, PaperFilters, PencilArrowDownLeft, PencilArrowDownRight } from "./Paper";

const ROTS = [-2.4, 1.8, -1.1, 2.6, -0.6, 1.4];
const DROPS = [0, 26, 10, 34, 4, 18];
const TAPE_ROTS = [-4, 3, -2, 5, -6, 2];

/** Per-category words: pencil note, intro (with a typed-over correction), stains. */
const COPY: Record<
  Gallery["slug"],
  {
    note: string;
    noteBelow?: boolean;
    intro: [string, string, string, string];
    rings: { style: React.CSSProperties; smear: "left" | "right" | "none"; opacity: number }[];
  }
> = {
  logos: {
    note: "small marks, big jobs",
    intro: ["marks for airlines, institutions and companies,", "drawn", "refined", "until they hold up at any size."],
    rings: [{ style: { top: 120, left: -118 }, smear: "left", opacity: 0.85 }],
  },
  posters: {
    note: "stage & screen",
    intro: ["posters for theatre and film, made to be", "seen", "remembered", "from across the street."],
    rings: [{ style: { top: 40, right: -120 }, smear: "right", opacity: 0.85 }],
  },
  "book-covers": {
    note: "judge them by these",
    noteBelow: true,
    intro: ["covers for novels, plays, essays, research and reports, each one", "wrapping", "telling", "the story before page one."],
    rings: [{ style: { top: 1300, left: -120 }, smear: "left", opacity: 0.8 }],
  },
  watches: {
    note: "art you can wear",
    intro: ["watch designs, dial and strap, each one", "telling time", "telling a story", "around the wrist."],
    rings: [
      { style: { top: 60, right: -120 }, smear: "right", opacity: 0.85 },
      { style: { top: 4200, left: -120 }, smear: "none", opacity: 0.75 },
    ],
  },
};

export default function GalleryPage({ gallery }: { gallery: Gallery }) {
  const copy = COPY[gallery.slug];
  const index = GALLERIES.findIndex((g) => g.slug === gallery.slug);
  const prev = GALLERIES[index - 1];
  const next = GALLERIES[index + 1];
  const rots = gallery.tilts ?? ROTS;
  const drops = gallery.drops ?? DROPS;
  const titleSize = gallery.slug === "book-covers" ? 26 : 28;

  return (
    <div className="gallery" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#efebe2", color: "#1d1a17", fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
      <PaperFilters />

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply" }}>
        {copy.rings.map((r, i) => (
          <CupRing key={i} style={r.style} smear={r.smear} opacity={r.opacity} />
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <header style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, borderBottom: "2px solid #1d1a17" }}>
          <Link href="/" style={{ fontFamily: "'Special Elite', monospace", fontSize: 26, color: "#1d1a17", textDecoration: "none" }}>
            Drin Kryeziu<span style={{ color: "#3a30b0" }}>_</span>
          </Link>
          <nav aria-label="Graphic design" style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: 16 }}>
            {GALLERIES.map((g) => (
              <Link key={g.slug} className="cat" href={`/${g.slug}`} aria-current={g.slug === gallery.slug ? "page" : undefined}>
                {g.name.toLowerCase()}
              </Link>
            ))}
          </nav>
        </header>

        <main>
          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/" style={{ alignSelf: "flex-start", padding: "8px 0", fontSize: 16, color: "#1d1a17" }}>
              ← back to the desk
            </Link>
            <p style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}>{gallery.eyebrow}</p>
            <h1 style={{ position: "relative", alignSelf: copy.noteBelow ? undefined : "flex-start", margin: 0, fontFamily: "'Special Elite', monospace", fontWeight: 400, fontSize: "clamp(64px, 12vw, 160px)", lineHeight: 0.9, letterSpacing: -3 }}>
              {gallery.name}
              {copy.noteBelow ? (
                <span className="pencil" aria-hidden="true" style={{ left: "62%", top: -34, display: "flex", alignItems: "flex-end", gap: 6, fontSize: 32, letterSpacing: 0, whiteSpace: "nowrap", transform: "rotate(-4deg)" }}>
                  {copy.note}
                  <PencilArrowDownRight />
                </span>
              ) : (
                <span className="pencil" aria-hidden="true" style={{ left: "calc(100% + 16px)", bottom: 18, display: "flex", alignItems: "flex-end", gap: 6, fontSize: 32, letterSpacing: 0, whiteSpace: "nowrap", transform: "rotate(-5deg)" }}>
                  <PencilArrowDownLeft />
                  {copy.note}
                </span>
              )}
            </h1>
            <p style={{ margin: 0, maxWidth: 560, fontSize: 18, lineHeight: "30px" }}>
              {gallery.items.length} {copy.intro[0]} <span style={{ textDecoration: "line-through", textDecorationThickness: 2 }}>{copy.intro[1]}</span>{" "}
              <span style={{ color: "#3a30b0", fontWeight: 700 }}>{copy.intro[2]}</span> {copy.intro[3]}
            </p>
          </section>

          <section
            aria-label={gallery.name}
            style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 96px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: `${gallery.gap[0]}px ${gallery.gap[1]}px` }}
          >
            {gallery.items.map((item, i) => {
              const pw = Math.round(Math.sqrt((gallery.area * item.width) / item.height));
              const corners = i % 3 === 1;
              return (
                <div key={item.src} className="shadow" style={{ width: pw + 32, maxWidth: "100%", marginTop: drops[i % 6], transform: `rotate(${rots[i % 6]}deg)` }}>
                  {corners ? (
                    <>
                      <div className="tape" aria-hidden="true" style={{ top: -12, left: -26, width: 84, transform: "rotate(-40deg)" }} />
                      <div className="tape" aria-hidden="true" style={{ top: -12, right: -26, width: 84, transform: "rotate(40deg)" }} />
                    </>
                  ) : (
                    <div className="tape" aria-hidden="true" style={{ top: -15, left: "50%", marginLeft: -48, transform: `rotate(${TAPE_ROTS[i % 6]}deg)` }} />
                  )}
                  <figure className="polaroid">
                    <div className="photo" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                      <img src={item.src} alt={`${item.title} ${gallery.kind}`} loading={i < 4 ? "eager" : "lazy"} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <figcaption style={{ padding: "12px 2px 18px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                      <span style={{ fontFamily: "Caveat, cursive", fontSize: titleSize, fontWeight: 600, lineHeight: 1, color: "#2b2a6e" }}>{item.title}</span>
                      <span style={{ fontSize: 12, letterSpacing: 2, whiteSpace: "nowrap" }}>{gallery.label ?? `NO. ${String(i + 1).padStart(2, "0")}`}</span>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </section>
        </main>

        <footer style={{ maxWidth: 1120, margin: "0 auto", padding: 24, boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, borderTop: "2px solid #1d1a17", fontSize: 14 }}>
          {prev ? (
            <Link href={`/${prev.slug}`} style={{ color: "#1d1a17" }}>
              ← {prev.name.toLowerCase()}
            </Link>
          ) : (
            <Link href="/" style={{ color: "#1d1a17" }}>
              ← back to the desk
            </Link>
          )}
          {next ? (
            <Link href={`/${next.slug}`} style={{ color: "#3a30b0", fontWeight: 700 }}>
              next: {next.name.toLowerCase()} →
            </Link>
          ) : (
            <Link href="/" style={{ color: "#3a30b0", fontWeight: 700 }}>
              back to the desk →
            </Link>
          )}
        </footer>
      </div>

      <PaperFiber onTop />
      <DeskLight />
    </div>
  );
}
