/* Home page — "the desk": hero, dev projects (dot-matrix printouts), graphic design (Polaroids),
   experience, skills and contact. Converted from the approved Paper design. */
/* eslint-disable @next/next/no-img-element */
import Pen from "@/components/Pen";
import { getGallery } from "@/lib/galleries";

/** Piece count for a gallery, so the home page labels stay in sync with lib/galleries.ts. */
const count = (slug: string) => getGallery(slug)?.items.length ?? 0;

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#efebe2", color: "#1d1a17", fontFamily: "'Courier Prime', 'Courier New', monospace" }}>

      <svg aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0.09 0" /></filter>
        <filter id="ink" x="-2%" y="-10%" width="104%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="13" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="d" /><feGaussianBlur in="d" stdDeviation="0.25" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="d" /></feMerge></filter>
        <filter id="pencilgrain" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" /></filter>
        <filter id="spillpale" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="26" xChannelSelector="R" yChannelSelector="G" result="s1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="8" result="fine" />
          <feDisplacementMap in="s1" in2="fine" scale="4" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feMorphology in="shape" operator="erode" radius="1.6" result="inner" />
          <feComposite in="shape" in2="inner" operator="out" result="rim" />
          <feFlood floodColor="#8a5a24" floodOpacity="0.55" /><feComposite in2="rim" operator="in" result="rimc" />
          <feFlood floodColor="#c49a5c" floodOpacity="0.2" /><feComposite in2="inner" operator="in" result="base" />
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="12" result="mottle" />
          <feColorMatrix in="mottle" type="matrix" values="0 0 0 0 0.62  0 0 0 0 0.44  0 0 0 0 0.22  0.75 0 0 0 -0.25" result="mottlec" />
          <feComposite in="mottlec" in2="inner" operator="in" result="body" />
          <feMerge><feMergeNode in="base" /><feMergeNode in="body" /><feMergeNode in="rimc" /></feMerge>
        </filter>
        <filter id="spilldark" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="21" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="20" xChannelSelector="R" yChannelSelector="G" result="s1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="5" result="fine" />
          <feDisplacementMap in="s1" in2="fine" scale="3" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feMorphology in="shape" operator="erode" radius="2" result="inner" />
          <feComposite in="shape" in2="inner" operator="out" result="rim" />
          <feFlood floodColor="#4e2608" floodOpacity="0.6" /><feComposite in2="rim" operator="in" result="rimc" />
          <feFlood floodColor="#9a6430" floodOpacity="0.3" /><feComposite in2="inner" operator="in" result="base" />
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="31" result="mottle" />
          <feColorMatrix in="mottle" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.19  0 0 0 0 0.06  1 0 0 0 -0.35" result="mottlec" />
          <feComposite in="mottlec" in2="inner" operator="in" result="body" />
          <feMerge><feMergeNode in="base" /><feMergeNode in="body" /><feMergeNode in="rimc" /></feMerge>
        </filter>
        <filter id="cupring" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="9" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="s1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="2" result="fine" />
          <feDisplacementMap in="s1" in2="fine" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feMorphology in="shape" operator="erode" radius="1.2" result="inner" />
          <feComposite in="shape" in2="inner" operator="out" result="rim" />
          <feFlood floodColor="#6e3d12" floodOpacity="0.62" /><feComposite in2="rim" operator="in" result="rimc" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="17" result="mottle" />
          <feColorMatrix in="mottle" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.35  0 0 0 0 0.15  0.8 0 0 0 -0.2" result="mottlec" />
          <feComposite in="mottlec" in2="inner" operator="in" result="body" />
          <feMerge><feMergeNode in="body" /><feMergeNode in="rimc" /></feMerge>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div aria-hidden="true" style={{ position: "absolute", inset: "0", pointerEvents: "none", mixBlendMode: "multiply" }}>
        <svg style={{ position: "absolute", top: "6px", right: "-122px", width: "240px", height: "240px", overflow: "visible", opacity: "0.9" }} viewBox="0 0 240 240"><g filter="url(#cupring)"><path fillRule="evenodd" d="M120 22 A 98 98 0 1 1 119.9 22 Z M120 31 A 89 89 0 1 0 120.1 31 Z" fill="#000" fillOpacity="0.85" /><path d="M60 70 C 90 52, 150 56, 176 92 C 196 122, 182 170, 140 186 C 112 196, 88 186, 98 160 C 106 138, 70 130, 60 110 Z" fill="#000" fillOpacity="0.22" /></g><g filter="url(#spilldark)"><circle cx="232" cy="64" r="4.5" /><circle cx="244" cy="80" r="2.2" /><path d="M226 186 L 252 206 L 249 210 Z" /><circle cx="255" cy="211" r="3.6" /><circle cx="18" cy="198" r="3" /></g></svg>
        <svg style={{ position: "absolute", top: "1120px", left: "-110px", width: "420px", height: "360px", overflow: "visible", opacity: "0.85" }} viewBox="0 0 420 360"><g filter="url(#spillpale)"><path d="M70 70 C 120 40, 190 50, 230 60 C 260 70, 270 110, 250 150 C 240 175, 262 200, 246 236 C 230 270, 200 300, 150 296 C 110 292, 80 310, 60 280 C 40 250, 70 220, 56 190 C 40 160, 30 100, 70 70 Z" /><path d="M290 190 C 320 176, 360 184, 372 214 C 384 246, 362 284, 330 292 C 300 300, 282 276, 292 250 C 298 232, 270 208, 290 190 Z" /><path d="M300 40 C 320 30, 350 40, 348 66 C 346 90, 320 100, 304 88 C 290 76, 284 52, 300 40 Z" /><ellipse cx="270" cy="52" rx="12" ry="8" /><circle cx="300" cy="146" r="11" /><circle cx="336" cy="140" r="5" /><circle cx="160" cy="330" r="7" /><circle cx="268" cy="320" r="4" /><circle cx="30" cy="40" r="3" /><circle cx="390" cy="120" r="3.5" /><circle cx="222" cy="22" r="2.5" /></g></svg>  </div>

      <div style={{ position: "relative" }}>

        <header style={{ maxWidth: "1120px", margin: "0 auto", padding: "28px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "12px", borderBottom: "2px solid #1d1a17" }}>
          <a href="#top" style={{ fontFamily: "'Special Elite', monospace", fontSize: "26px", color: "#1d1a17", textDecoration: "none" }}>Drin Kryeziu<span style={{ color: "#3a30b0" }}>_</span></a>
          <nav aria-label="Sections" style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: "16px" }}>
            <a href="#work" style={{ padding: "12px 0", color: "#1d1a17" }}>work</a>
            <a href="#experience" style={{ padding: "12px 0", color: "#1d1a17" }}>experience</a>
            <a href="#skills" style={{ padding: "12px 0", color: "#1d1a17" }}>skills</a>
            <a href="/contact" style={{ padding: "12px 0", color: "#3a30b0", fontWeight: "700" }}>write to me →</a>
          </nav>
        </header>

        <main id="top">

          <section className="hero-desk" style={{ position: "relative", maxWidth: "1120px", margin: "0 auto", padding: "72px 24px 56px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
            <p style={{ margin: "0", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" }}>Portfolio — No. 001 — Oct. 2026</p>
            <h1 style={{ position: "relative", margin: "0", fontFamily: "'Special Elite', monospace", fontWeight: "400", lineHeight: "0.95", letterSpacing: "-2px" }}>
              <span className="pencil" aria-hidden="true" style={{ right: "2%", bottom: "62%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", fontSize: "34px", letterSpacing: "0", transform: "rotate(-6deg)" }}>the fun part!
                <svg width="120" height="90" viewBox="0 0 120 90"><path d="M70 4 C 60 30, 40 52, 12 78" /><path d="M12 78 L 16 60 M12 78 L 30 74" /></svg></span>
              <span style={{ display: "block", fontSize: "clamp(56px, 11vw, 148px)" }}>I design</span>
              <span style={{ display: "block", fontSize: "clamp(32px, 5vw, 64px)", paddingLeft: "6%" }}>apps, then I
                <span style={{ position: "relative", display: "inline-block" }}><span style={{ textDecoration: "line-through", textDecorationThickness: "4px", textDecorationColor: "#1d1a17", color: "#6b6b6b" }}>dream about</span><span style={{ position: "absolute", left: "10%", top: "-0.75em", fontSize: "0.55em", color: "#3a30b0", transform: "rotate(-3deg)", whiteSpace: "nowrap" }}>actually</span></span></span>
              <span style={{ display: "block", fontSize: "clamp(64px, 13vw, 176px)", color: "#3a30b0" }}>build them.</span>
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", paddingTop: "16px" }}>
              <p style={{ margin: "0", maxWidth: "520px", fontSize: "18px", lineHeight: "52px" }}>I&apos;m Drin Kryeziu, a graphic designer<span style={{ position: "relative", display: "inline-block", width: "0.7em", height: "1em" }}><svg aria-hidden="true" style={{ position: "absolute", left: "0.04em", top: "-0.1em", width: "0.62em", height: "0.6em", overflow: "visible" }} viewBox="0 0 20 20"><path d="M1.5 1 C 5 7, 8 13, 10.2 19 C 12.4 13.5, 15.2 7, 18.8 0.5" fill="none" stroke="#3a30b0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ position: "absolute", left: "-0.9em", bottom: "1.02em", whiteSpace: "nowrap", fontFamily: "Caveat, cursive", fontSize: "22px", fontWeight: "600", lineHeight: "1", color: "#3a30b0", transform: "rotate(-3deg)", transformOrigin: "left bottom" }}>, UX designer</span></span>and developer: I design brands and apps, then build them. Now open to roles and freelance projects. <span style={{ fontStyle: "italic" }}>— D.K.</span></p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a href="#work" className="dm-btn solid dm-fill">SEE THE WORK ↓</a>
                <a href="/resume" className="dm-btn line">MY RESUME</a>
              </div>
            </div>
            <Pen className="hero-pen" />
          </section>

          <section id="work" style={{ maxWidth: "1120px", margin: "0 auto", padding: "48px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 24px" }}>
              <h2 style={{ position: "relative", margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: "400", lineHeight: "1" }}>Selected work
                <span className="pencil" aria-hidden="true" style={{ left: "0", right: "0", bottom: "-18px" }}><svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none"><path d="M4 12 C 60 6, 120 16, 190 9 S 320 6, 396 11" /><path d="M30 17 C 110 12, 210 18, 300 13" /></svg></span></h2>
              <p style={{ margin: "0", fontSize: "16px" }}>(things I <span style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>planned</span> <span style={{ color: "#3a30b0", fontWeight: "700" }}>made</span>, in code and in print)</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px", paddingTop: "8px" }}>
              <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "40px", fontWeight: "400", lineHeight: "1" }}>01 — Dev projects</h3>
              <p style={{ margin: "0", fontSize: "15px" }}>apps & tools, printed straight from the terminal</p>
            </div>

            <div className="shadow" style={{ transform: "rotate(-0.6deg)" }}>
              <div className="tape" aria-hidden="true" style={{ top: "-21px", left: "6%", transform: "rotate(-7deg)" }}></div>
              <div className="tape" aria-hidden="true" style={{ top: "-18px", right: "7%", width: "110px", transform: "rotate(5deg)" }}></div>
              <div className="tape" aria-hidden="true" style={{ bottom: "-21px", left: "46%", width: "96px", transform: "rotate(-2deg)" }}></div>
              <article className="paper fanfold" style={{ padding: "40px 72px 48px", display: "flex", flexWrap: "wrap", gap: "28px 36px", alignItems: "center" }}>
                <p style={{ margin: "0", flex: "1 1 100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", fontSize: "13px", letterSpacing: "1px", borderBottom: "1px dashed #1d1a17", paddingBottom: "10px" }}><span><a href="/work/krzresumebuilder" style={{ color: "inherit" }}>{"> RUN KRZRESUMEBUILDER.APP"}</a></span><span>STATUS: LIVE</span><span>PAGE 001</span></p>
                <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ border: "2px solid #1d1a17", overflow: "hidden", background: "#fbf9f4" }}><img src="/images/dev/krzresumebuilder-dotmatrix.jpg" alt="KRZResumeBuilder home page on a phone: Create your profile once. Tailor your application for every job." style={{ display: "block", width: "100%", height: "auto", mixBlendMode: "multiply" }} /></div>
                  <p style={{ margin: "0", fontSize: "13px", fontStyle: "italic" }}>Fig. 1 — KRZResumeBuilder, home page.</p>
                </div>
                <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ margin: "0", display: "inline-block", alignSelf: "flex-start", padding: "4px 10px", border: "2px solid #3a30b0", color: "#3a30b0", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", transform: "rotate(-2deg)" }}>FEATURED · LIVE</p>
                  <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "clamp(30px, 3.6vw, 44px)", fontWeight: "400", lineHeight: "1.1", overflowWrap: "anywhere" }}><span style={{ position: "relative", display: "inline-block" }}>KRZResumeBuilder<span className="pencil" aria-hidden="true" style={{ left: "-22px", top: "-16px", right: "-26px", bottom: "-14px" }}><svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M150 6 C 60 4, 6 22, 8 52 C 10 86, 110 98, 190 92 C 270 86, 298 62, 290 36 C 282 10, 210 2, 120 10" /></svg></span></span><span className="pencil" aria-hidden="true" style={{ position: "relative", display: "inline-block", marginLeft: "28px", fontSize: "26px", verticalAlign: "middle", transform: "rotate(-4deg)" }}>my baby</span></h3>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "28px" }}>Create your profile once, then tailor a resume and cover letter to every job. KRZResumeBuilder shows how well you match each posting and writes only what&apos;s <span style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>impressive</span> <span style={{ color: "#3a30b0", fontWeight: "700" }}>true</span> about you.</p>
                  <p style={{ margin: "0", fontSize: "14px" }}>My role: [Product design, front end, back end, AI integration]</p>
                  <a href="https://resumeai-pi-ten.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start", padding: "12px 0", fontSize: "17px", fontWeight: "700", color: "#3a30b0" }}>Visit KRZResumeBuilder ↗</a>
                  <a href="/work/krzresumebuilder" className="dm-btn solid dm-fill" style={{ alignSelf: "flex-start" }}>VIEW APP →</a>
                </div>
              </article>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
              <div className="shadow" style={{ transform: "rotate(0.8deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-21px", left: "50%", marginLeft: "-60px", width: "120px", transform: "rotate(-3deg)" }}></div>
                <article className="paper fanfold" style={{ padding: "36px 64px 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ margin: "0", display: "flex", justifyContent: "space-between", gap: "8px", fontSize: "12px", letterSpacing: "1px", borderBottom: "1px dashed #1d1a17", paddingBottom: "8px" }}><span><a href="/work/krzapplyai" style={{ color: "inherit" }}>{"> RUN KRZAPPLYAI.APP"}</a></span><span>PAGE 002</span></p>
                  <div style={{ border: "2px solid #1d1a17", overflow: "hidden", background: "#fbfaf6" }}><img src="/images/dev/krzapplyai-dotmatrix.jpg" alt="KRZApplyAi home page: Upload once, apply everywhere, with a job search bar and key stats." style={{ display: "block", width: "100%", height: "auto", mixBlendMode: "multiply" }} /></div>
                  <p style={{ margin: "0", fontSize: "13px", fontStyle: "italic" }}>Fig. 2 — KRZApplyAi, home page.</p>
                  <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.1" }}>KRZApplyAi Job Board</h3>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "24px" }}>Upload your CV once. KRZApplyAi finds matching roles, tailors your CV and cover letter for each one, and applies while you sleep.</p>
                  <p style={{ margin: "0", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "#3a30b0" }}>WEB APP · IN PROGRESS</p>
                  <a href="/work/krzapplyai" className="dm-btn solid dm-fill" style={{ alignSelf: "flex-start" }}>VIEW APP →</a>
                </article>
              </div>
              <div className="shadow" style={{ transform: "rotate(-1deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-18px", left: "-18px", width: "96px", transform: "rotate(-38deg)" }}></div>
                <div className="tape" aria-hidden="true" style={{ top: "-18px", right: "-18px", width: "96px", transform: "rotate(38deg)" }}></div>
                <article className="paper fanfold" style={{ padding: "36px 64px 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ margin: "0", display: "flex", justifyContent: "space-between", gap: "8px", fontSize: "12px", letterSpacing: "1px", borderBottom: "1px dashed #1d1a17", paddingBottom: "8px" }}><span><a href="/work/lundro" style={{ color: "inherit" }}>{"> RUN LUNDRO.APP"}</a></span><span>PAGE 003</span></p>
                  <div style={{ border: "2px solid #1d1a17", overflow: "hidden", background: "#fbfaf6" }}><img src="/images/dev/lundro-dotmatrix.jpg" alt="Lundro home page: Your day on the lake starts here, with a boat search box over a lake scene." style={{ display: "block", width: "100%", height: "auto", mixBlendMode: "multiply" }} /></div>
                  <p style={{ margin: "0", fontSize: "13px", fontStyle: "italic" }}>Fig. 3 — Lundro, home page.</p>
                  <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.1" }}>Lundro Boat Rentals</h3>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "24px" }}>Rent pontoons, ski boats and more from verified owners on North Carolina lakes, with a dashboard for owners and a review console for admins.</p>
                  <p style={{ margin: "0", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "#3a30b0" }}>WEB APP · PROTOTYPE</p>
                  <a href="/work/lundro" className="dm-btn solid dm-fill" style={{ alignSelf: "flex-start" }}>VIEW APP →</a>
                </article>
              </div>
            </div>

            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px", paddingTop: "40px" }}>
              <svg aria-hidden="true" style={{ position: "absolute", zIndex: "0", top: "-36px", right: "-70px", width: "300px", height: "230px", overflow: "visible", opacity: "0.85", mixBlendMode: "multiply", pointerEvents: "none" }} viewBox="0 0 300 230"><g filter="url(#spilldark)"><path d="M70 80 C 110 50, 170 46, 210 66 C 236 78, 240 104, 226 128 C 214 150, 232 176, 210 192 C 186 208, 150 196, 120 202 C 90 208, 60 196, 54 168 C 48 144, 40 110, 70 80 Z" /><path d="M210 66 L 262 22 L 266 26 Z" /><circle cx="268" cy="20" r="5" /><path d="M56 160 L 16 178 L 18 182 Z" /><circle cx="12" cy="182" r="4" /><circle cx="250" cy="150" r="5.5" /><circle cx="272" cy="168" r="2.5" /><circle cx="104" cy="40" r="3.5" /><circle cx="150" cy="226" r="3" /></g><g filter="url(#spilldark)" opacity="0.6"><ellipse cx="150" cy="170" rx="54" ry="22" /></g></svg>
              <h3 style={{ position: "relative", zIndex: "1", margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "40px", fontWeight: "400", lineHeight: "1" }}>02 — Graphic design</h3>
              <p style={{ position: "relative", zIndex: "1", margin: "0", fontSize: "15px" }}>identities, posters & print, snapped on <span style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>film</span> <span style={{ color: "#3a30b0", fontWeight: "700" }}>instant film</span></p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "48px 40px", padding: "8px 8px 24px" }}>
              <div className="shadow" style={{ transform: "rotate(-3deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-14px", left: "50%", marginLeft: "-48px", width: "96px", transform: "rotate(-4deg)" }}></div>
                <a href="/logos" style={{ display: "block", color: "inherit", textDecoration: "none" }}><figure className="polaroid" style={{ margin: "0" }}>
                  <div className="photo" style={{ background: "#ffffff", boxSizing: "border-box", padding: "10%" }}><img src="/images/logos/tradewell-logo.jpg" alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} /></div>
                  <figcaption style={{ padding: "14px 4px 22px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "Caveat, cursive", fontSize: "28px", fontWeight: "600", lineHeight: "1", color: "#2b2a6e" }}>Logos</span>
                    <span style={{ fontSize: "12px", letterSpacing: "2px" }}>{count("logos")} MARKS · OPEN →</span>
                  </figcaption>
                </figure></a>
              </div>
              <div className="shadow" style={{ transform: "rotate(2.2deg)", marginTop: "28px" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-12px", left: "-22px", width: "90px", transform: "rotate(-40deg)" }}></div>
                <div className="tape" aria-hidden="true" style={{ top: "-12px", right: "-22px", width: "90px", transform: "rotate(40deg)" }}></div>
                <a href="/posters" style={{ display: "block", color: "inherit", textDecoration: "none" }}><figure className="polaroid" style={{ margin: "0" }}>
                  <div className="photo" style={{ aspectRatio: "500 / 750" }}><img src="/images/posters/poster-kodi-i-jetes.jpg" alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} /></div>
                  <figcaption style={{ padding: "14px 4px 22px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "Caveat, cursive", fontSize: "28px", fontWeight: "600", lineHeight: "1", color: "#2b2a6e" }}>Posters</span>
                    <span style={{ fontSize: "12px", letterSpacing: "2px" }}>{count("posters")} POSTERS · OPEN →</span>
                  </figcaption>
                </figure></a>
              </div>
              <div className="shadow" style={{ transform: "rotate(-1.4deg)", marginTop: "8px" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-14px", left: "50%", marginLeft: "-52px", width: "104px", transform: "rotate(3deg)" }}></div>
                <a href="/book-covers" style={{ display: "block", color: "inherit", textDecoration: "none" }}><figure className="polaroid" style={{ margin: "0" }}>
                  <div className="photo" style={{ aspectRatio: "300 / 518" }}><img src="/images/book-covers/kopertina-resmejes-finale.jpg" alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} /></div>
                  <figcaption style={{ padding: "14px 4px 22px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "Caveat, cursive", fontSize: "28px", fontWeight: "600", lineHeight: "1", color: "#2b2a6e" }}>Book Covers</span>
                    <span style={{ fontSize: "12px", letterSpacing: "2px" }}>{count("book-covers")} COVERS · OPEN →</span>
                  </figcaption>
                </figure></a>
              </div>
              <div className="shadow" style={{ transform: "rotate(3deg)", marginTop: "36px" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-12px", right: "18%", width: "100px", transform: "rotate(8deg)" }}></div>
                <a href="/watches" style={{ display: "block", color: "inherit", textDecoration: "none" }}><figure className="polaroid" style={{ margin: "0" }}>
                  <div className="photo"><img src="/images/home/watches-thumb.jpg" alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
                  <figcaption style={{ padding: "14px 4px 22px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "Caveat, cursive", fontSize: "28px", fontWeight: "600", lineHeight: "1", color: "#2b2a6e" }}>Watches</span>
                    <span style={{ fontSize: "12px", letterSpacing: "2px" }}>{count("watches")} DESIGNS · OPEN →</span>
                  </figcaption>
                </figure></a>
              </div>
            </div>
          </section>

          <section id="experience" style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px", boxSizing: "border-box" }}>
            <div className="shadow" style={{ transform: "rotate(0.4deg)" }}>
              <div className="tape" aria-hidden="true" style={{ top: "-18px", left: "-20px", transform: "rotate(-32deg)" }}></div>
              <div className="tape" aria-hidden="true" style={{ top: "-18px", right: "-20px", transform: "rotate(32deg)" }}></div>
              <div className="tape" aria-hidden="true" style={{ bottom: "-18px", right: "-20px", transform: "rotate(-32deg)" }}></div>
              <svg aria-hidden="true" style={{ position: "absolute", zIndex: "3", top: "-60px", right: "14%", width: "190px", height: "190px", pointerEvents: "none", mixBlendMode: "multiply", overflow: "visible" }} viewBox="0 0 190 190"><g filter="url(#cupring)" opacity="0.75"><path fillRule="evenodd" d="M95 18 A 77 77 0 1 1 94.9 18 Z M95 25 A 70 70 0 1 0 95.1 25 Z" fill="#000" fillOpacity="0.8" stroke="none" /><path d="M30 120 C 40 150, 80 170, 120 160 C 140 154, 130 140, 110 142 C 80 146, 52 134, 40 112 Z" fill="#000" fillOpacity="0.18" /></g></svg>
              <div className="paper" style={{ backgroundColor: "#fbf9f4", padding: "56px 40px", display: "flex", flexDirection: "column", gap: "28px" }}>
                <h2 style={{ position: "relative", margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: "400", lineHeight: "1" }}>Experience
                  <span className="pencil" aria-hidden="true" style={{ right: "0", top: "4px", display: "flex", alignItems: "center", gap: "8px", fontSize: "30px", letterSpacing: "0", transform: "rotate(3deg)" }}><svg width="70" height="40" viewBox="0 0 70 40"><path d="M66 8 C 46 4, 24 14, 6 30" /><path d="M6 30 L 10 16 M6 30 L 20 30" /></svg>still going strong</span></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px" }}>
                    <p style={{ margin: "0", flex: "0 0 180px", fontSize: "15px", fontWeight: "700" }}>Live · now</p>
                    <div style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.15" }}>Founder, designer <span style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>& everything else</span> <span style={{ color: "#3a30b0" }}>& developer</span> · KRZResumeBuilder</h3>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "26px" }}>Designed and built a resume-tailoring web app end to end: product strategy, UX, interface, and the AI that matches profiles to job descriptions.</p>
                      <a href="/work/krzresumebuilder" style={{ alignSelf: "flex-start", padding: "6px 0", fontSize: "15px", fontWeight: "700", color: "#3a30b0" }}>view the screens →</a>
                    </div>
                  </div>
                  <div style={{ borderTop: "2px dashed #1d1a17" }}></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px" }}>
                    <p style={{ margin: "0", flex: "0 0 180px", fontSize: "15px", fontWeight: "700" }}>In progress</p>
                    <div style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.15" }}>Designer & developer · KRZApplyAi</h3>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "26px" }}>A job board that reads your CV once, finds matching roles across 50+ boards, tailors a CV and cover letter for each, and applies for you.</p>
                      <a href="/work/krzapplyai" style={{ alignSelf: "flex-start", padding: "6px 0", fontSize: "15px", fontWeight: "700", color: "#3a30b0" }}>view the screens →</a>
                    </div>
                  </div>
                  <div style={{ borderTop: "2px dashed #1d1a17" }}></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px" }}>
                    <p style={{ margin: "0", flex: "0 0 180px", fontSize: "15px", fontWeight: "700" }}>Prototype</p>
                    <div style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.15" }}>Designer & developer · Lundro</h3>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "26px" }}>Boat rentals on North Carolina lakes: a renter site, an owner dashboard and an admin console, designed and prototyped as one product.</p>
                      <a href="/work/lundro" style={{ alignSelf: "flex-start", padding: "6px 0", fontSize: "15px", fontWeight: "700", color: "#3a30b0" }}>view the screens →</a>
                    </div>
                  </div>
                  <div style={{ borderTop: "2px dashed #1d1a17" }}></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px" }}>
                    <p style={{ margin: "0", flex: "0 0 180px", fontSize: "15px", fontWeight: "700" }}>2005 — now</p>
                    <div style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <h3 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "30px", fontWeight: "400", lineHeight: "1.15" }}>Before the apps: 20+ years of UX</h3>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "26px" }}>Senior Product Designer at Lowe&apos;s, and before that First Bank, Wells Fargo and NLB Bank. The full story is in my resume.</p>
                      <a href="/resume" className="dm-btn line" style={{ alignSelf: "flex-start" }}>MY RESUME →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" style={{ maxWidth: "1120px", margin: "0 auto", padding: "32px 24px 64px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "32px" }}>
            <h2 style={{ position: "relative", margin: "0", fontFamily: "'Special Elite', monospace", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: "400", lineHeight: "1" }}>Skills<span style={{ fontSize: "0.4em", color: "#3a30b0" }}> (a short inventory)</span>
              <span className="pencil" aria-hidden="true" style={{ left: "-46px", top: "-18px" }}><svg width="44" height="44" viewBox="0 0 44 44"><path d="M22 3 L27 17 L41 17 L30 26 L34 40 L22 31 L10 40 L14 26 L3 17 L17 17 Z" /><path d="M20 12 L24 12 M15 20 L29 20 M13 27 L31 27" /></svg></span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
              <div className="shadow" style={{ transform: "rotate(-0.8deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-21px", left: "14%", width: "104px", transform: "rotate(-5deg)" }}></div>
                <div className="paper" style={{ backgroundColor: "#fbf9f4", padding: "32px 28px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "17px", lineHeight: "28px" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "700", letterSpacing: "3px" }}>DESIGN</h3>
                  <p style={{ margin: "0" }}>[x] Graphic design</p><p style={{ margin: "0" }}>[x] UX design</p><p style={{ margin: "0" }}>[x] UI design</p><p style={{ margin: "0" }}>[x] Design systems</p><p style={{ margin: "0" }}>[x] Prototyping</p><p style={{ margin: "0" }}>[x] User research</p>
                </div>
              </div>
              <div className="shadow" style={{ transform: "rotate(0.6deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-21px", right: "12%", width: "112px", transform: "rotate(6deg)" }}></div>
                <div className="paper" style={{ backgroundColor: "#fbf9f4", padding: "32px 28px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "17px", lineHeight: "28px" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "700", letterSpacing: "3px" }}>BUILD</h3>
                  <p style={{ margin: "0" }}>[x] Websites</p><p style={{ margin: "0", color: "#3a30b0", fontWeight: "700" }}>[x] AI-powered apps</p><p style={{ margin: "0" }}>[x] AI integration</p><p style={{ margin: "0" }}>[x] AI agents</p><p style={{ margin: "0" }}>[x] Prototypes</p>
                </div>
              </div>
              <div className="shadow" style={{ transform: "rotate(-0.4deg)" }}>
                <div className="tape" aria-hidden="true" style={{ top: "-21px", left: "50%", marginLeft: "-54px", width: "108px", transform: "rotate(-2deg)" }}></div>
                <div className="paper" style={{ backgroundColor: "#fbf9f4", padding: "32px 28px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "17px", lineHeight: "28px" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "700", letterSpacing: "3px" }}>TOOLS</h3>
                  <p style={{ margin: "0" }}>[x] Claude</p><p style={{ margin: "0" }}>[x] Devin</p><p style={{ margin: "0" }}>[x] Figma</p><p style={{ margin: "0" }}>[x] Adobe Suite</p><p style={{ margin: "0" }}>[ ] <span style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>Boeing 787</span> <span style={{ color: "#3a30b0" }}>still learning</span></p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" style={{ maxWidth: "1120px", margin: "0 auto", padding: "32px 24px 80px", boxSizing: "border-box" }}>
            <div aria-hidden="true" style={{ position: "relative", height: "72px" }}>
              <span className="pencil" style={{ left: "8%", top: "0", display: "flex", alignItems: "flex-end", gap: "10px", fontSize: "32px", transform: "rotate(-3deg)" }}>psst — I reply fast<svg width="60" height="64" viewBox="0 0 60 64"><path d="M8 6 C 34 10, 48 28, 44 58" /><path d="M44 58 L 36 46 M44 58 L 52 47" /></svg></span>
            </div>
            <div className="shadow" style={{ transform: "rotate(-0.5deg)" }}>
              <div className="tape" aria-hidden="true" style={{ top: "-21px", left: "4%", width: "140px", transform: "rotate(-4deg)" }}></div>
              <div className="tape" aria-hidden="true" style={{ top: "-18px", right: "5%", width: "120px", transform: "rotate(7deg)" }}></div>
              <div className="paper" style={{ backgroundColor: "#fbf9f4", padding: "30px 24px 34px" }}>
              <div className="dm-fill" style={{ color: "#fbf9f4", padding: "64px 32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <h2 style={{ margin: "0", fontFamily: "'Special Elite', monospace", fontWeight: "400", lineHeight: "0.95" }}>
                  <span style={{ display: "block", fontSize: "clamp(28px, 4vw, 48px)" }}>Let&apos;s <span style={{ textDecoration: "line-through", textDecorationThickness: "3px" }}>talk</span></span>
                  <span style={{ display: "block", fontSize: "clamp(56px, 10vw, 128px)", color: "#b8b2ff" }}>build something.</span>
                </h2>
                <p style={{ margin: "0", maxWidth: "560px", fontSize: "17px", lineHeight: "28px" }}>Have a project in mind? Get in touch with me, and we&apos;ll figure out how to bring it to life.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <a href="/contact" className="dm-btn paper-solid">EMAIL ME</a>
                  <a href="https://www.linkedin.com/in/drinkryeziu/" className="dm-btn paper-line">LINKEDIN</a>
                </div>
              </div>
              </div>
            </div>
          </section>

        </main>

        <footer style={{ maxWidth: "1120px", margin: "0 auto", padding: "24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", borderTop: "2px solid #1d1a17", fontSize: "14px" }}>
          <span>© 2026 Drin Kryeziu. Typed with care.</span>
          <a href="#top" style={{ color: "#1d1a17" }}>back to top ↑</a>
        </footer>

      </div>

      <svg aria-hidden="true" style={{ position: "absolute", inset: "0", zIndex: "40", width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "multiply", opacity: "0.4" }}>
        <filter id="fiber" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.75 0.55" numOctaves="4" seed="6" result="n" /><feDiffuseLighting in="n" surfaceScale="1.3" lightingColor="#fffaf0" result="l" /><feDistantLight azimuth="225" elevation="62" /></filter>
        <rect width="100%" height="100%" filter="url(#fiber)" />
      </svg>
      <svg aria-hidden="true" style={{ position: "absolute", inset: "0", zIndex: "41", width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "multiply", opacity: "0.18" }}>
        <filter id="cloud" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="3" seed="44" /><feColorMatrix type="matrix" values="0 0 0 0 0.78  0 0 0 0 0.72  0 0 0 0 0.62  0 0 0 0.9 -0.2" /></filter>
        <rect width="100%" height="100%" filter="url(#cloud)" />
      </svg>
      <div aria-hidden="true" style={{ position: "fixed", inset: "0", zIndex: "42", pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 28% 18%, rgba(255,248,230,0.22), rgba(255,248,230,0) 70%), radial-gradient(ellipse 120% 100% at 50% 45%, rgba(60,40,20,0) 55%, rgba(60,40,20,0.16) 100%)", mixBlendMode: "multiply" }}></div>
    </div>
  );
}
