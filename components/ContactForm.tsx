"use client";
import { useState } from "react";

const TO = "drinkryeziu@gmail.com";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string; email: string } | { kind: "error"; text: string; mailto?: string };

/** A typed letter on a torn sheet: From / Reply to / Subject lines and a ruled message area. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(TO);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is still on screen */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = Object.fromEntries(["name", "email", "subject", "message", "company"].map((k) => [k, String(f.get(k) ?? "")]));
    const mailto = `mailto:${TO}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name}`)}`;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: "sent", name: data.name, email: data.email });
        return;
      }
      if (out.fallback === "mailto") {
        setStatus({ kind: "error", text: "The message couldn't go out from here, so your own mail app will open with everything filled in.", mailto });
        window.location.href = mailto;
        return;
      }
      setStatus({ kind: "error", text: out.error || "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", text: "No connection. Your mail app can send it instead.", mailto });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="letter-done" role="status">
        <p className="letter-stamp">Sent</p>
        <h2 className="letter-h">Thanks, {status.name.split(" ")[0]}.</h2>
        <p>
          Your note is on my desk. I&apos;ll reply to <b>{status.email}</b>, usually within a day.
        </p>
        <a href="/" className="dm-btn line" style={{ alignSelf: "flex-start" }}>
          BACK TO THE DESK
        </a>
      </div>
    );
  }

  const busy = status.kind === "sending";
  return (
    <form className="letter-form" onSubmit={onSubmit} noValidate={false}>
      <div className="letter-row">
        <span className="letter-label">To:</span>
        <span className="letter-to">
          <a href={`mailto:${TO}`}>{TO}</a>
          <button type="button" className="letter-copy" onClick={copy} aria-live="polite">
            {copied ? "copied ✓" : "copy"}
          </button>
        </span>
      </div>
      <label className="letter-row">
        <span className="letter-label">From:</span>
        <input name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" />
      </label>
      <label className="letter-row">
        <span className="letter-label">Reply to:</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" />
      </label>
      <label className="letter-row">
        <span className="letter-label">Subject:</span>
        <input name="subject" type="text" required maxLength={200} placeholder="A project, a role, a hello" />
      </label>
      {/* honeypot: hidden from people, bots fill it in */}
      <label className="letter-hp" aria-hidden="true">
        Company <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="letter-msg">
        <span className="letter-label">Message:</span>
        <textarea name="message" required minLength={5} maxLength={5000} rows={9} placeholder="Dear Drin," />
      </label>

      {status.kind === "error" && (
        <p className="letter-err" role="alert">
          {status.text}{" "}
          {status.mailto && (
            <a href={status.mailto} style={{ fontWeight: 700 }}>
              Open my mail app ↗
            </a>
          )}
        </p>
      )}

      <div className="letter-send">
        <button type="submit" className="dm-btn solid dm-fill" disabled={busy}>
          {busy ? "SENDING…" : "SEND IT →"}
        </button>
        <span className="letter-alt">
          or write to <a href={`mailto:${TO}`}>{TO}</a> from your own mail
        </span>
      </div>
    </form>
  );
}
