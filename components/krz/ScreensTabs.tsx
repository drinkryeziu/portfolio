"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type Device = "phone" | "tablet" | "desktop";

/** The app's real screens, in the order a user meets them. Images live in /public/images/krzresumebuilder/<device>/<file>.jpg */
const SCREENS: { label: string; path: string; file: string }[] = [
  { label: "Home", path: "/", file: "home" },
  { label: "Sign up", path: "/sign-up", file: "signup" },
  { label: "Create your profile", path: "/onboarding", file: "onboarding" },
  { label: "Professional profile", path: "/profile", file: "profile" },
  { label: "Dashboard", path: "/dashboard", file: "dashboard" },
  { label: "Job match", path: "/jobs/…/match", file: "match" },
  { label: "Tailored resume", path: "/jobs/…?doc=resume", file: "resume" },
  { label: "Cover letter", path: "/jobs/…?doc=cover-letter", file: "cover" },
  { label: "Documents", path: "/documents", file: "documents" },
  { label: "Credits", path: "/credits", file: "credits" },
  { label: "Pricing", path: "/pricing", file: "pricing" },
];

/** Height of the app's own top bar in the 860px-wide phone captures; it stays pinned while the screen scrolls. */
const PUBLIC_PAGES = new Set(["/", "/sign-up", "/pricing"]);
const headerHeight = (path: string) => (PUBLIC_PAGES.has(path) ? 138 : 122);

const TABS: [Device, string][] = [
  ["phone", "PHONE"],
  ["tablet", "TABLET"],
  ["desktop", "DESKTOP"],
];

const src = (device: Device, file: string) => `/images/krzresumebuilder/${device}/${file}.jpg`;
const no = (i: number) => String(i + 1).padStart(2, "0");

function Caption({ i, label, path, row = false }: { i: number; label: string; path: string; row?: boolean }) {
  return (
    <figcaption className="ink" style={row ? { display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px" } : { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <span style={{ fontFamily: "'Special Elite', monospace", fontSize: row ? 24 : 22 }}>
        {no(i)} — {label}
      </span>
      <span style={{ fontSize: 13, letterSpacing: 1, color: "#5a554e" }}>{path}</span>
    </figcaption>
  );
}

function StatusBar() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", height: 46, padding: "13px 22px 0 28px", boxSizing: "border-box", borderRadius: "41px 41px 0 0", background: "#1f1f23", color: "#ffffff", display: "flex", alignItems: "flex-start", justifyContent: "space-between", fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif" }}
    >
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>9:41</span>
        <span style={{ marginTop: 3, fontSize: 10, fontWeight: 500 }}>◀ Messages</span>
      </div>
      <div style={{ position: "absolute", top: 10, left: "50%", width: 88, height: 25, marginLeft: -44, borderRadius: 20, background: "#050506" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5, paddingTop: 2 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.8" fill="#fff" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" fill="#fff" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" fill="#fff" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" fill="#fff" fillOpacity="0.35" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path d="M7.5 2.2c2.2 0 4.2.85 5.7 2.25l1.1-1.15C12.5 1.6 10.1.6 7.5.6S2.5 1.6.7 3.3l1.1 1.15C3.3 3.05 5.3 2.2 7.5 2.2z" fill="#fff" />
          <path d="M7.5 5.3c1.35 0 2.6.5 3.55 1.35l1.1-1.15C10.9 4.35 9.25 3.7 7.5 3.7s-3.4.65-4.65 1.8l1.1 1.15C4.9 5.8 6.15 5.3 7.5 5.3z" fill="#fff" />
          <path d="M7.5 8.3c.55 0 1.05.2 1.45.55L7.5 10.4 6.05 8.85c.4-.35.9-.55 1.45-.55z" fill="#fff" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="22.5" height="12" rx="3.5" fill="none" stroke="#fff" strokeOpacity="0.45" />
          <rect x="2.5" y="2.5" width="18.5" height="8" rx="2" fill="#fff" />
          <path d="M24.5 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" fill="#fff" fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  );
}

const frame: React.CSSProperties = { background: "linear-gradient(145deg, #2b2a2e, #0e0e10)", boxShadow: "inset 0 0 0 1.5px #4a494f", boxSizing: "border-box", position: "relative" };
const grid: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "32px 24px 96px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "56px 40px" };

export default function ScreensTabs() {
  const [tab, setTab] = useState<Device>("phone");
  const alt = (label: string) => `KRZResumeBuilder ${label} page, ${tab} layout`;

  return (
    <>
      <div role="group" aria-label="Device" style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 24px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className="tab" aria-pressed={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "phone" && (
        <section aria-label="Phone screens" style={grid}>
          {SCREENS.map((s, i) => {
            const hdr = headerHeight(s.path);
            return (
              <figure key={s.file} style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div className="shot-shadow" style={{ ...frame, width: 322, padding: 11, borderRadius: 52 }}>
                  <StatusBar />
                  <div className="screen" tabIndex={0} aria-label={`${s.label} screen, scrollable`} style={{ height: 603, borderRadius: "0 0 41px 41px" }}>
                    <div aria-hidden="true" style={{ position: "sticky", top: 0, zIndex: 1, overflow: "hidden", aspectRatio: `860 / ${hdr}`, background: "#ffffff", boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
                      <img src={src("phone", s.file)} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                    <img src={src("phone", s.file)} alt={alt(s.label)} loading="lazy" style={{ marginTop: `-${((hdr / 860) * 100).toFixed(3)}%` }} />
                  </div>
                </div>
                <Caption i={i} label={s.label} path={s.path} />
              </figure>
            );
          })}
        </section>
      )}

      {tab === "tablet" && (
        <section aria-label="Tablet screens" style={grid}>
          {SCREENS.map((s, i) => (
            <figure key={s.file} style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxWidth: "100%" }}>
              <div className="shot-shadow" style={{ ...frame, width: 520, maxWidth: "100%", padding: 20, borderRadius: 36 }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 8, left: "50%", width: 6, height: 6, marginLeft: -3, borderRadius: "50%", background: "#1f2a3a" }} />
                <div className="screen" tabIndex={0} aria-label={`${s.label} screen, scrollable`} style={{ aspectRatio: "820 / 1180", borderRadius: 18 }}>
                  <img src={src("tablet", s.file)} alt={alt(s.label)} loading="lazy" />
                </div>
              </div>
              <Caption i={i} label={s.label} path={s.path} />
            </figure>
          ))}
        </section>
      )}

      {tab === "desktop" && (
        <section aria-label="Desktop screens" style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 24px 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 72 }}>
          {SCREENS.map((s, i) => (
            <figure key={s.file} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="shot-shadow" style={{ borderRadius: 12, overflow: "hidden", background: "#e9e7ec", boxShadow: "inset 0 0 0 1px #c9c6cf" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "#ebe9ee", borderBottom: "1px solid #d3d0d8" }}>
                  <span aria-hidden="true" style={{ display: "flex", gap: 8 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, padding: "6px 14px", borderRadius: 8, background: "#ffffff", fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#4b4757", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    krzresumebuilder.com{s.path}
                  </span>
                </div>
                <div className="screen" tabIndex={0} aria-label={`${s.label} screen, scrollable`} style={{ aspectRatio: "1440 / 900" }}>
                  <img src={src("desktop", s.file)} alt={alt(s.label)} loading="lazy" />
                </div>
              </div>
              <Caption i={i} label={s.label} path={s.path} row />
            </figure>
          ))}
        </section>
      )}
    </>
  );
}
