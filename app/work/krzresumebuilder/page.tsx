import type { Metadata } from "next";
import Link from "next/link";
import { PaperFiber, PaperFilters, PencilArrowDownRight } from "@/components/Paper";
import ScreensTabs from "@/components/krz/ScreensTabs";
import { CODE_BLOCKS } from "@/components/krz/code";

export const metadata: Metadata = {
  title: "KRZResumeBuilder screens — Drin Kryeziu",
  description: "Every screen of KRZResumeBuilder on phone, tablet and desktop.",
};

const APP_URL = "https://krzresumebuilder.com";

export default function KRZResumeBuilderPage() {
  return (
    <div className="screens-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#efebe2", color: "#1d1a17", fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
      <PaperFilters />
      <PaperFiber opacity={0.35} />

      {/* Faded lines of the app's code, printed into the paper */}
      <div aria-hidden="true" className="ink" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {CODE_BLOCKS.map((b, i) => (
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
            <a href={APP_URL} style={{ padding: "12px 0", color: "#3a30b0", fontWeight: 700 }}>
              open the live app ↗
            </a>
          </nav>
        </header>

        <main>
          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 16px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="ink" style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}>
              01 — Dev projects / Page 001
            </p>
            <h1 className="ink" style={{ position: "relative", margin: 0, fontFamily: "'Special Elite', monospace", fontWeight: 400, fontSize: "clamp(44px, 8vw, 112px)", lineHeight: 0.95, letterSpacing: -2, overflowWrap: "anywhere" }}>
              KRZResume<wbr />
              Builder
              <span className="pencil" aria-hidden="true" style={{ right: 0, top: -40, display: "flex", alignItems: "flex-end", gap: 6, fontSize: 30, letterSpacing: 0, whiteSpace: "nowrap", transform: "rotate(-4deg)" }}>
                every screen, for real
                <PencilArrowDownRight />
              </span>
            </h1>
            <p className="ink" style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: "30px" }}>
              Create your profile once, then tailor a resume and cover letter to every job. These are the app&apos;s real screens, captured with a demo profile. Scroll inside any screen to see the whole page.
            </p>
          </section>

          <ScreensTabs />
        </main>

        <footer style={{ maxWidth: 1120, margin: "0 auto", padding: 24, boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, borderTop: "2px solid #1d1a17", fontSize: 14 }}>
          <Link href="/#work" style={{ color: "#1d1a17" }}>
            ← back to the desk
          </Link>
          <a href={APP_URL} style={{ color: "#3a30b0", fontWeight: 700 }}>
            open the live app ↗
          </a>
        </footer>
      </div>
    </div>
  );
}
