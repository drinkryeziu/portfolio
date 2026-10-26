import Link from "next/link";
import { PaperFiber, PaperFilters, PencilArrowDownRight } from "@/components/Paper";
import ScreensTabs, { type Screen } from "./ScreensTabs";

export type CodeBlock = { top: number; left?: string; right?: string; rotate: number; code: string };

/** A dev project's screens page: paper with the app's faded code, a title, and Phone / Tablet / Desktop tabs. */
export default function AppScreensPage({
  app,
  name,
  titleParts,
  eyebrow,
  intro,
  appUrl,
  domain,
  screens,
  code,
}: {
  /** Image folder under /public/images */
  app: string;
  name: string;
  /** Title split where it may wrap, e.g. ["KRZResume", "Builder"]. */
  titleParts: [string, string];
  eyebrow: string;
  intro: string;
  /** Live app link; leave out when there is no public version yet. */
  appUrl?: string;
  /** Shown in the desktop address bar. */
  domain: string;
  screens: Screen[];
  code: CodeBlock[];
}) {
  return (
    <div className="screens-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#efebe2", color: "#1d1a17", fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
      <PaperFilters />
      <PaperFiber opacity={0.35} />

      {/* Faded lines of the app's code, printed into the paper */}
      <div aria-hidden="true" className="ink" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {code.map((b, i) => (
          <pre key={i} className="code" style={{ top: b.top, left: b.left, right: b.right, transform: `rotate(${b.rotate}deg)` }}>
            {b.code}
          </pre>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <header style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, borderBottom: "2px solid #1d1a17" }}>
          <Link href="/" style={{ fontFamily: "'Special Elite', monospace", fontSize: 26, color: "#1d1a17", textDecoration: "none" }}>
            Drin Kryeziu<span style={{ color: "#3a30b0" }}>_</span>
          </Link>
          <nav aria-label="Project" style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: 16 }}>
            <Link href="/#work" style={{ padding: "12px 0", color: "#1d1a17" }}>
              ← back to the desk
            </Link>
            {appUrl && (
              <a href={appUrl} style={{ padding: "12px 0", color: "#3a30b0", fontWeight: 700 }}>
                open the live app ↗
              </a>
            )}
          </nav>
        </header>

        <main>
          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 16px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="ink" style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}>
              {eyebrow}
            </p>
            <h1 className="ink" style={{ position: "relative", margin: 0, fontFamily: "'Special Elite', monospace", fontWeight: 400, fontSize: "clamp(44px, 8vw, 112px)", lineHeight: 0.95, letterSpacing: -2, overflowWrap: "anywhere" }}>
              {titleParts[0]}
              <wbr />
              {titleParts[1]}
              <span className="pencil" aria-hidden="true" style={{ right: 0, top: -40, display: "flex", alignItems: "flex-end", gap: 6, fontSize: 30, letterSpacing: 0, whiteSpace: "nowrap", transform: "rotate(-4deg)" }}>
                every screen, for real
                <PencilArrowDownRight />
              </span>
            </h1>
            <p className="ink" style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: "30px" }}>
              {intro}
            </p>
          </section>

          <ScreensTabs app={app} name={name} domain={domain} screens={screens} />
        </main>

        <footer style={{ maxWidth: 1120, margin: "0 auto", padding: 24, boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, borderTop: "2px solid #1d1a17", fontSize: 14 }}>
          <Link href="/#work" style={{ color: "#1d1a17" }}>
            ← back to the desk
          </Link>
          {appUrl && (
            <a href={appUrl} style={{ color: "#3a30b0", fontWeight: 700 }}>
              open the live app ↗
            </a>
          )}
        </footer>
      </div>
    </div>
  );
}
