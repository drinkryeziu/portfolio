"use client";
/* A ballpoint pen lying on the desk. Layers: shadow and clear barrel are multiplied onto the paper (so the paper
   shows through the plastic); cap, tip and highlights sit on top normally. Drag it around: it pivots around where you hold it and the barrel rolls
   as it moves sideways. Let go and it slides to a stop. Click (or press Enter) to give it a little roll. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paint();
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
    const host = box.current?.offsetParent as HTMLElement | null;
    if (!host || !box.current) return;
    const L = len();
    const minX = -box.current.offsetLeft + L * 0.1, maxX = host.clientWidth - box.current.offsetLeft - L * 0.9;
    const minY = -box.current.offsetTop + 10, maxY = host.clientHeight - box.current.offsetTop - 40;
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
      rollOnce();
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
        aria-label="A ballpoint pen on the desk. Drag it to move it, click or press Enter to roll it. Arrow keys nudge it."
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
    </div>
  );
}
