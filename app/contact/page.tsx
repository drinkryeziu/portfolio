import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { CupRing, DeskLight, PaperFiber, PaperFilters, PencilArrowDownLeft } from "@/components/Paper";

export const metadata: Metadata = {
  title: "Write to me — Drin Kryeziu",
  description: "Send Drin Kryeziu a message about a project, a role or anything else. Or email drinkryeziu@gmail.com.",
};

export default function ContactPage() {
  return (
    <div className="contact-page" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#efebe2", color: "#1d1a17", fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
      <PaperFilters />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply" }}>
        <CupRing style={{ top: 70, right: -110 }} smear="right" opacity={0.8} />
      </div>

      <div style={{ position: "relative" }}>
        <header style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, borderBottom: "2px solid #1d1a17" }}>
          <Link href="/" style={{ fontFamily: "'Special Elite', monospace", fontSize: 26, color: "#1d1a17", textDecoration: "none" }}>
            Drin Kryeziu<span style={{ color: "#3a30b0" }}>_</span>
          </Link>
          <nav aria-label="Contact" style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: 16 }}>
            <Link href="/" style={{ padding: "12px 0", color: "#1d1a17" }}>
              ← back to the desk
            </Link>
            <a href="https://www.linkedin.com/in/drinkryeziu/" style={{ padding: "12px 0", color: "#3a30b0", fontWeight: 700 }}>
              LinkedIn ↗
            </a>
          </nav>
        </header>

        <main>
          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}>04 — Contact</p>
            <h1 style={{ position: "relative", alignSelf: "flex-start", margin: 0, fontFamily: "'Special Elite', monospace", fontWeight: 400, fontSize: "clamp(56px, 11vw, 140px)", lineHeight: 0.9, letterSpacing: -3 }}>
              Write to me
              <span className="pencil contact-note" aria-hidden="true">
                <PencilArrowDownLeft />
                psst — I reply fast
              </span>
            </h1>
            <p style={{ margin: 0, maxWidth: 600, fontSize: 18, lineHeight: "30px" }}>
              Have a project in mind? <span style={{ textDecoration: "line-through", textDecorationThickness: 2 }}>Call</span>{" "}
              <span style={{ color: "#3a30b0", fontWeight: 700 }}>Write</span> me a few lines and we&apos;ll figure out how to bring it to life.
            </p>
          </section>

          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 96px", boxSizing: "border-box" }}>
            <div className="shadow letter" style={{ transform: "rotate(-0.6deg)" }}>
              <div className="tape" aria-hidden="true" style={{ top: -20, left: "50%", marginLeft: -64, transform: "rotate(-2deg)" }} />
              <div className="paper letter-sheet">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>

        <footer style={{ maxWidth: 1120, margin: "0 auto", padding: 24, boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, borderTop: "2px solid #1d1a17", fontSize: 14 }}>
          <Link href="/" style={{ color: "#1d1a17" }}>
            ← back to the desk
          </Link>
          <a href="mailto:drinkryeziu@gmail.com" style={{ color: "#3a30b0", fontWeight: 700 }}>
            drinkryeziu@gmail.com
          </a>
        </footer>
      </div>

      <PaperFiber onTop />
      <DeskLight />
    </div>
  );
}
