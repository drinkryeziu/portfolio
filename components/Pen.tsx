"use client";
/* A ballpoint pen lying on the desk. Layers: shadow and clear barrel are multiplied onto the paper (so the paper
   shows through the plastic); cap, tip and highlights sit on top normally. Drag it around: it pivots around where you hold it and the barrel rolls
   as it moves sideways. Let go and it slides to a stop. Press Enter to give it a little roll.
   Click or tap it to pick it up: the pen tilts up in your hand and you can draw in BIC blue anywhere on the page.
   The drawing is not saved; it is gone on reload. Esc or "Put the pen down" returns it to the desk. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type State = { x: number; y: number; a: number; roll: number; lift: number; vx: number; vy: number; va: number };

const RATIO = 84 / 1200; // pen image height / width
const FRICTION = 0.9; // per frame, for the slide after letting go

export default function Pen({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const box = useRef<HTMLDivElement>(null);
  const pen = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const shineLayer = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLImageElement>(null);
  const s = useRef<State>({ x: 0, y: 0, a: -14, roll: 0, lift: 0, vx: 0, vy: 0, va: 0 });
  const raf = useRef(0);
  const drag = useRef<{ id: number; lever: number; px: number; py: number; t0: number; moved: number; hist: { x: number; y: number; t: number }[] } | null>(null);
  const reduce = useRef(false);
  const [holding, setHolding] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hand = useRef<HandApi | null>(null);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paint();
    setMounted(true);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const len = () => pen.current?.offsetWidth ?? 340;

  /** Write the current state to the DOM (no React re-render per frame). */
  function paint() {
    const { x, y, a, roll, lift } = s.current;
    const sc = 1 + lift * 0.035;
    const t = `translate(${x}px, ${y}px) rotate(${a}deg) scale(${sc})`;
    if (pen.current) pen.current.style.transform = t;
    if (shineLayer.current) shineLayer.current.style.transform = t;
    if (shadow.current) {
      // desk lamp sits top-left, so the shadow falls down and to the right, further when lifted
      const ox = 5 + lift * 12, oy = 7 + lift * 16;
      shadow.current.style.transform = `translate(${x + ox}px, ${y + oy}px) rotate(${a}deg) scale(${1 + lift * 0.02})`;
      shadow.current.style.filter = `blur(${1.6 + lift * 5}px)`;
      shadow.current.style.opacity = String(0.55 - lift * 0.22);
    }
    if (shine.current) {
      // rolling a six-sided barrel: the highlight slides across the facets and flickers between them
      const f = Math.sin(roll);
      shine.current.style.transform = `translateY(${f * 1.6}px)`;
      shine.current.style.opacity = String(0.62 + 0.38 * Math.cos(roll * 3));
    }
  }

  function clamp() {
    if (!box.current) return;
    const L = len(), r = box.current.getBoundingClientRect(), bx = r.left + scrollX, by = r.top + scrollY;
    const de = document.documentElement;
    const minX = -bx + L * 0.1, maxX = de.scrollWidth - bx - L * 0.9;
    const minY = -by + 10, maxY = de.scrollHeight - by - 40;
    const st = s.current;
    if (st.x < minX) { st.x = minX; st.vx = Math.abs(st.vx) * 0.4; }
    if (st.x > maxX) { st.x = maxX; st.vx = -Math.abs(st.vx) * 0.4; }
    if (st.y < minY) { st.y = minY; st.vy = Math.abs(st.vy) * 0.4; }
    if (st.y > maxY) { st.y = maxY; st.vy = -Math.abs(st.vy) * 0.4; }
  }

  /** Move the pen by (dx, dy) as if pushed at `lever` (-1 = tip, 1 = cap): sideways pushes off-centre turn it and roll it. */
  function push(dx: number, dy: number, lever: number) {
    const st = s.current;
    const r = (st.a * Math.PI) / 180;
    const nx = -Math.sin(r), ny = Math.cos(r); // across the barrel
    const side = dx * nx + dy * ny;
    const half = len() / 2;
    st.a += ((side * lever) / half) * (180 / Math.PI) * 0.55;
    st.roll += side / (len() * 0.022); // barrel radius is about 2.2% of the pen length
    st.x += dx;
    st.y += dy;
  }

  function settle() {
    cancelAnimationFrame(raf.current);
    const step = () => {
      const st = s.current;
      st.lift += (0 - st.lift) * 0.2;
      if (Math.abs(st.vx) + Math.abs(st.vy) > 0.05 || Math.abs(st.va) > 0.02 || st.lift > 0.01) {
        push(st.vx, st.vy, 0.15);
        st.a += st.va;
        st.vx *= FRICTION;
        st.vy *= FRICTION;
        st.va *= 0.86;
        clamp();
        paint();
        raf.current = requestAnimationFrame(step);
      } else {
        st.lift = 0;
        paint();
      }
    };
    raf.current = requestAnimationFrame(step);
  }

  /** A short roll across the desk, the way a pen moves when you flick it. */
  function rollOnce() {
    const st = s.current;
    const r = (st.a * Math.PI) / 180;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const dist = 40 + Math.random() * 45;
    const turn = (Math.random() * 2 - 1) * 28;
    if (reduce.current) {
      st.x += -Math.sin(r) * dist * dir;
      st.y += Math.cos(r) * dist * dir;
      st.a += turn;
      clamp();
      paint();
      return;
    }
    st.vx = -Math.sin(r) * dist * dir * (1 - FRICTION);
    st.vy = Math.cos(r) * dist * dir * (1 - FRICTION);
    st.va = turn * (1 - 0.86);
    settle();
  }

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    cancelAnimationFrame(raf.current);
    const el = pen.current!;
    el.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const r = (s.current.a * Math.PI) / 180;
    const along = (e.clientX - cx) * Math.cos(r) + (e.clientY - cy) * Math.sin(r);
    const lever = Math.max(-1, Math.min(1, along / (len() / 2)));
    drag.current = { id: e.pointerId, lever, px: e.clientX, py: e.clientY, t0: performance.now(), moved: 0, hist: [{ x: e.clientX, y: e.clientY, t: performance.now() }] };
    s.current.vx = s.current.vy = s.current.va = 0;
    el.style.cursor = "grabbing";
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.px, dy = e.clientY - d.py;
    d.px = e.clientX;
    d.py = e.clientY;
    d.moved += Math.abs(dx) + Math.abs(dy);
    const now = performance.now();
    d.hist.push({ x: e.clientX, y: e.clientY, t: now });
    while (d.hist.length > 2 && now - d.hist[0].t > 80) d.hist.shift();
    const st = s.current;
    if (d.moved > 4) st.lift = Math.min(1, st.lift + 0.25);
    push(dx, dy, d.lever);
    clamp();
    paint();
  }

  function onUp(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    pen.current!.style.cursor = "grab";
    if (d.moved < 5 && performance.now() - d.t0 < 400) {
      s.current.lift = 0;
      paint();
      pickUp(e.clientX, e.clientY);
      return;
    }
    const h = d.hist, a = h[0], b = h[h.length - 1], dt = Math.max(16, b.t - a.t);
    const st = s.current;
    st.vx = reduce.current ? 0 : ((b.x - a.x) / dt) * 16;
    st.vy = reduce.current ? 0 : ((b.y - a.y) / dt) * 16;
    settle();
  }

  function onKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const st = s.current;
    const k = e.key;
    if (k === "Enter" || k === " ") { e.preventDefault(); rollOnce(); return; }
    const step = e.shiftKey ? 30 : 10;
    if (k === "ArrowLeft") push(-step, 0, 0);
    else if (k === "ArrowRight") push(step, 0, 0);
    else if (k === "ArrowUp") push(0, -step, 0);
    else if (k === "ArrowDown") push(0, step, 0);
    else if (k === "[" ) st.a -= 8;
    else if (k === "]") st.a += 8;
    else return;
    e.preventDefault();
    clamp();
    paint();
  }

  /** Where the resting pen's ballpoint is on screen, and its angle. */
  function restPose() {
    const el = box.current, p = pen.current;
    if (!el || !p) return { x: 0, y: 0, a: 0 };
    const r = el.getBoundingClientRect(), st = s.current, L = p.offsetWidth, h = p.offsetHeight;
    const cx = r.left + st.x + L / 2, cy = r.top + st.y + h / 2, rad = (st.a * Math.PI) / 180;
    return { x: cx - (Math.cos(rad) * L) / 2, y: cy - (Math.sin(rad) * L) / 2, a: st.a };
  }

  /** Lay the pen flat where the hand left it: (x, y) is the ballpoint on screen. */
  function layDown(x: number, y: number, a: number) {
    const el = box.current, p = pen.current;
    if (!el || !p) return;
    const r = el.getBoundingClientRect(), L = p.offsetWidth, h = p.offsetHeight, rad = (a * Math.PI) / 180;
    const st = s.current;
    st.a = a;
    st.x = x + (Math.cos(rad) * L) / 2 - r.left - L / 2;
    st.y = y + (Math.sin(rad) * L) / 2 - r.top - h / 2;
    st.vx = st.vy = st.va = 0;
    st.lift = 0;
    paint();
  }

  function pickUp(x: number, y: number) {
    if (!hand.current) return;
    hand.current.pickUp(x, y);
  }

  const W = "var(--pen-len)";
  return (
    <div ref={box} className={`pen-box ${className}`} style={style}>
      <div ref={shadow} aria-hidden="true" className="pen-layer" style={{ width: W, height: `calc(${W} * ${RATIO})`, mixBlendMode: "multiply" }}>
        <img src="/images/pen/pen-shadow.png" alt="" draggable={false} />
      </div>
      <div
        ref={pen}
        role="button"
        tabIndex={0}
        aria-label="A ballpoint pen on the desk. Click it to pick it up and draw on the page. Drag it to move it, press Enter to roll it, arrow keys nudge it."
        className="pen-layer pen-grab"
        style={{ width: W, height: `calc(${W} * ${RATIO})`, mixBlendMode: "multiply" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        <img src="/images/pen/pen-clear.png" alt="" draggable={false} />
      </div>
      <div ref={shineLayer} aria-hidden="true" className="pen-layer" style={{ width: W, height: `calc(${W} * ${RATIO})`, pointerEvents: "none" }}>
        <img src="/images/pen/pen-solid.png" alt="" draggable={false} />
        <img ref={shine} src="/images/pen/pen-shine.png" alt="" draggable={false} />
      </div>
      {mounted &&
        createPortal(
          <Hand
            apiRef={hand}
            restPose={restPose}
            penLen={() => pen.current?.offsetWidth ?? 340}
            layDown={layDown}
            onHold={(h) => {
              setHolding(h);
              if (box.current) box.current.style.visibility = h ? "hidden" : "";
            }}
            holding={holding}
          />,
          document.body,
        )}
    </div>
  );
}

/* ---------- the pen in your hand, and the ink it leaves on the page ---------- */

type HandApi = { pickUp: (x: number, y: number) => void };
type Stroke = number[]; // x0,y0,x1,y1… in page coordinates (scroll included)

const INK = "#22308f"; // BIC blue
const HOLD_A = -50; // right hand: tip low-left, cap up-right
const P = 2.1; // perspective distance, in pen lengths

function Hand({ apiRef, restPose, penLen, layDown, onHold, holding }: {
  layDown: (x: number, y: number, a: number) => void;
  apiRef: React.MutableRefObject<HandApi | null>;
  restPose: () => { x: number; y: number; a: number };
  penLen: () => number;
  onHold: (h: boolean) => void;
  holding: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const layers = useRef<(HTMLImageElement | null)[]>([]);
  const st = useRef({
    mode: "rest" as "rest" | "held" | "returning",
    cur: { x: 0, y: 0, a: 0, tilt: 0, lift: 0 },
    px: 0, py: 0, vx: 0, vy: 0, press: false, settled: false, holdA: HOLD_A,
    lay: { x: 0, y: 0, a: 0 }, drew: false,
    last: { x: 0, y: 0, t: 0 },
  });
  const strokes = useRef<Stroke[]>([]);
  const live = useRef<{ id: number; pts: Stroke } | null>(null);
  const raf = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [hasInk, setHasInk] = useState(false);

  /* -- ink -- */
  function size() {
    const c = canvas.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(innerWidth * dpr);
    c.height = Math.round(innerHeight * dpr);
    redraw();
  }
  function path(g: CanvasRenderingContext2D, p: Stroke) {
    g.beginPath();
    g.moveTo(p[0], p[1]);
    if (p.length === 4) { g.lineTo(p[2], p[3]); return; }
    for (let i = 2; i < p.length - 2; i += 2) g.quadraticCurveTo(p[i], p[i + 1], (p[i] + p[i + 2]) / 2, (p[i + 1] + p[i + 3]) / 2);
    g.lineTo(p[p.length - 2], p[p.length - 1]);
  }
  function drawStroke(g: CanvasRenderingContext2D, p: Stroke) {
    if (p.length === 2) { g.globalAlpha = 0.92; g.beginPath(); g.arc(p[0], p[1], 1.6, 0, 7); g.fill(); return; }
    g.globalAlpha = 0.16; g.lineWidth = 4.4; path(g, p); g.stroke(); // ink soaking into the paper
    g.globalAlpha = 0.92; g.lineWidth = 2.6; path(g, p); g.stroke();
  }
  function redraw() {
    const c = canvas.current;
    if (!c) return;
    const g = c.getContext("2d")!, dpr = c.width / innerWidth;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, c.width, c.height);
    g.setTransform(dpr, 0, 0, dpr, -scrollX * dpr, -scrollY * dpr);
    g.lineCap = "round"; g.lineJoin = "round"; g.strokeStyle = INK; g.fillStyle = INK;
    const top = scrollY - 20, bottom = scrollY + innerHeight + 20;
    for (const p of strokes.current) {
      let vis = false;
      for (let i = 1; i < p.length; i += 2) if (p[i] > top && p[i] < bottom) { vis = true; break; }
      if (vis) drawStroke(g, p);
    }
    if (live.current) drawStroke(g, live.current.pts);
    g.globalAlpha = 1;
  }

  /* -- pen pose -- */
  function fits(a: number, x: number, y: number, Lp: number, m: number) {
    const r = (a * Math.PI) / 180, ex = x + Math.cos(r) * Lp, ey = y + Math.sin(r) * Lp;
    return Math.min(ex - m, innerWidth - m - ex, ey - m, innerHeight - m - ey);
  }
  /** Keep the whole pen on screen: the natural angle if it fits, else the smallest turn that does. */
  function chooseAngle(x: number, y: number, tilt: number) {
    const s = st.current, t = (tilt * Math.PI) / 180, len = penLen();
    const Lp = len * Math.cos(t) * P / (P - Math.sin(t)) + 10, m = 14 + len * RATIO * 1.2;
    if (fits(s.holdA, x, y, Lp, m) >= 0 && Math.abs(s.holdA - HOLD_A) < 1) return s.holdA;
    let best: number | null = null, fallback = s.holdA, bestScore = -Infinity;
    for (let d = 0; d <= 180 && best === null; d += 5) {
      for (const a of d ? [HOLD_A - d, HOLD_A + d] : [HOLD_A]) {
        const f = fits(a, x, y, Lp, m);
        if (f >= 0) { best = a; break; }
        if (f > bestScore) { bestScore = f; fallback = a; }
      }
    }
    if (best === null) return (s.holdA = fallback);
    if (fits(s.holdA, x, y, Lp, m) >= 6 && Math.abs(s.holdA - HOLD_A) <= Math.abs(best - HOLD_A) + 20) return s.holdA;
    return (s.holdA = best);
  }
  function goal() {
    const s = st.current;
    if (s.mode === "returning") return { ...s.lay, tilt: 0, lift: 0 };
    if (s.mode !== "held") { const r = restPose(); return { x: r.x, y: r.y, a: r.a, tilt: 0, lift: 0 }; }
    const lean = Math.max(-9, Math.min(9, s.vx * 0.35 - s.vy * 0.15));
    const tilt = (s.press ? 56 : 50) + Math.max(-5, Math.min(5, s.vy * 0.25));
    return { x: s.px, y: s.py, a: chooseAngle(s.px, s.py, tilt) + lean, tilt, lift: s.press ? 0 : 1 };
  }
  function render() {
    const s = st.current, c = s.cur, len = penLen(), h = len * RATIO;
    const t = `translate(${c.x}px,${c.y}px) rotate(${c.a}deg) perspective(${len * P}px) rotateY(${-c.tilt}deg) translate(0,-50%)`;
    const [sh, clear, solid, shine] = layers.current;
    for (const el of [clear, solid, shine]) if (el) { el.style.width = `${len}px`; el.style.height = `${h}px`; el.style.transform = t; }
    if (sh) {
      // the shadow stays flat on the page: lamp at the top left, so it falls down-right of the barrel,
      // touching the tip while you press and drifting off when the pen is lifted
      const tf = c.tilt / 56, gap = 1.5 + c.lift * 7;
      sh.style.width = `${len}px`; sh.style.height = `${h}px`;
      sh.style.transform = `translate(${c.x + gap * 0.6}px,${c.y + gap}px) rotate(${c.a + tf * 11}deg) scale(${1 - tf * 0.18},${1 + tf * 0.35}) translate(0,-50%)`;
      sh.style.filter = `blur(${0.6 + tf * 2.2 + c.lift * 1.6}px)`;
      sh.style.opacity = String(0.55 - tf * 0.2);
    }
  }
  function tick() {
    const s = st.current, c = s.cur, g = goal();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.vx *= 0.9; s.vy *= 0.9;
    const k = reduce ? 1 : s.mode === "held" && s.settled ? 1 : 0.2;
    c.x += (g.x - c.x) * k; c.y += (g.y - c.y) * k;
    c.a += ((((g.a - c.a + 540) % 360) - 180)) * (reduce ? 1 : s.settled ? 0.25 : 0.2);
    c.tilt += (g.tilt - c.tilt) * (reduce ? 1 : 0.2);
    c.lift += (g.lift - c.lift) * (reduce ? 1 : 0.3);
    const near = Math.hypot(g.x - c.x, g.y - c.y) < 2;
    if (s.mode === "held" && !s.settled && near) s.settled = true;
    render();
    if (s.mode === "returning" && (reduce || (near && c.tilt < 1 && Math.abs((((g.a - c.a + 540) % 360) - 180)) < 1))) {
      s.mode = "rest";
      layDown(s.lay.x, s.lay.y, s.lay.a);
      onHold(false);
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }
  function track(x: number, y: number) {
    const s = st.current, now = performance.now(), dt = Math.max(8, now - s.last.t);
    if (now - s.last.t < 120) { s.vx += ((x - s.last.x) / dt * 16 - s.vx) * 0.25; s.vy += ((y - s.last.y) / dt * 16 - s.vy) * 0.25; }
    s.last = { x, y, t: now };
  }
  function armIdle(ms: number) {
    clearTimeout(idle.current);
    idle.current = setTimeout(() => { if (!live.current) putDown(); }, ms);
  }

  function pickUp(x: number, y: number) {
    const s = st.current;
    if (s.mode === "rest") {
      const r = restPose();
      s.cur = { x: r.x, y: r.y, a: r.a, tilt: 0, lift: 0 };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(tick);
    }
    s.mode = "held"; s.settled = false; s.px = x; s.py = y; s.holdA = HOLD_A; s.drew = false;
    onHold(true);
    armIdle(60000);
  }
  function putDown() {
    const s = st.current;
    if (s.mode !== "held" || live.current) return;
    clearTimeout(idle.current);
    // lay it flat right where it is: it drops out of the hand onto the paper
    const c = s.cur, a = ((((c.a + 180) % 360) + 360) % 360) - 180;
    c.a = a;
    s.lay = { x: c.x, y: c.y, a };
    s.mode = "returning"; s.press = false; s.settled = false;
  }
  apiRef.current = { pickUp };

  useEffect(() => {
    size();
    const onResize = () => size();
    const onScroll = () => redraw();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") putDown(); };
    const onMove = (e: PointerEvent) => {
      const s = st.current;
      if (s.mode !== "held" || e.pointerType !== "mouse") return;
      s.px = e.clientX; s.py = e.clientY; track(e.clientX, e.clientY); if (!s.drew) armIdle(60000);
    };
    addEventListener("resize", onResize);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    addEventListener("pointermove", onMove);
    return () => {
      removeEventListener("resize", onResize); removeEventListener("scroll", onScroll);
      removeEventListener("keydown", onKey); removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current); clearTimeout(idle.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = st.current;
    if (s.mode === "returning") { s.mode = "held"; s.settled = false; }
    s.px = e.clientX; s.py = e.clientY; s.press = true; s.last = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (e.pointerType !== "mouse") s.settled = false;
    live.current = { id: e.pointerId, pts: [e.clientX + scrollX, e.clientY + scrollY] };
    clearTimeout(idle.current);
    redraw();
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    const l = live.current;
    if (!l || l.id !== e.pointerId) return;
    const s = st.current;
    s.px = e.clientX; s.py = e.clientY;
    if (e.pointerType !== "mouse") track(e.clientX, e.clientY);
    const evs = e.nativeEvent.getCoalescedEvents?.() ?? [];
    for (const ev of evs.length ? evs : [e.nativeEvent]) {
      const x = ev.clientX + scrollX, y = ev.clientY + scrollY, p = l.pts;
      if (Math.hypot(x - p[p.length - 2], y - p[p.length - 1]) >= 1.2) p.push(Math.round(x * 2) / 2, Math.round(y * 2) / 2);
    }
    redraw();
  }
  function up(e: React.PointerEvent<HTMLCanvasElement>) {
    const l = live.current;
    if (!l || l.id !== e.pointerId) return;
    strokes.current.push(l.pts);
    live.current = null;
    st.current.press = false;
    st.current.drew = true;
    setHasInk(true);
    redraw();
    // on touch the pen goes back after a moment, so the page can scroll again
    armIdle(2000); // two seconds after the last line, the pen is laid down on the paper
  }

  function erase() {
    strokes.current = [];
    setHasInk(false);
    redraw();
  }

  const src = ["pen-shadow", "pen-clear", "pen-solid", "pen-shine"];
  return (
    <>
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={`ink-sheet${holding ? " is-drawing" : ""}`}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      {src.map((n, i) => (
        <img
          key={n}
          ref={(el) => { layers.current[i] = el; }}
          src={`/images/pen/${n}.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`hand-pen hand-${n}`}
          hidden={!holding}
        />
      ))}
      {(holding || hasInk) && (
        <div className="hand-bar" role="toolbar" aria-label="Pen">
          {holding && <button type="button" className="dm-btn solid dm-fill" onClick={putDown}>PUT THE PEN DOWN</button>}
          {hasInk && <button type="button" className="dm-btn line" onClick={erase}>ERASE MY DRAWING</button>}
        </div>
      )}
    </>
  );
}
