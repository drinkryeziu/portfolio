/* Shared paper pieces used by the gallery and app-screens pages.
   The home page carries its own copy of these filters inline (it also needs the coffee-spill filters). */

/** SVG filters (paper grain, typewriter ink, pencil, cup ring) plus the grain layer. Render once, first inside the page. */
export function PaperFilters() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0.09 0" />
      </filter>
      <filter id="ink" x="-2%" y="-10%" width="104%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves={2} seed={13} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={1.3} xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation={0.25} result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="d" />
        </feMerge>
      </filter>
      <filter id="pencilgrain" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves={2} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={2.2} />
      </filter>
      <filter id="cupring" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={3} seed={9} result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale={7} xChannelSelector="R" yChannelSelector="G" result="s1" />
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={2} seed={2} result="fine" />
        <feDisplacementMap in="s1" in2="fine" scale={2.5} xChannelSelector="R" yChannelSelector="G" result="shape" />
        <feMorphology in="shape" operator="erode" radius={1.2} result="inner" />
        <feComposite in="shape" in2="inner" operator="out" result="rim" />
        <feFlood floodColor="#6e3d12" floodOpacity={0.62} />
        <feComposite in2="rim" operator="in" result="rimc" />
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={3} seed={17} result="mottle" />
        <feColorMatrix in="mottle" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.35  0 0 0 0 0.15  0.8 0 0 0 -0.2" result="mottlec" />
        <feComposite in="mottlec" in2="inner" operator="in" result="body" />
        <feMerge>
          <feMergeNode in="body" />
          <feMergeNode in="rimc" />
        </feMerge>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

/** Raised paper fibres lit from the top left. `onTop` lays it over everything (galleries); otherwise under the content. */
export function PaperFiber({ onTop = false, opacity = 0.4 }: { onTop?: boolean; opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: onTop ? 40 : undefined, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "multiply", opacity }}
    >
      <filter id="fiber" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.75 0.55" numOctaves={4} seed={6} result="n" />
        <feDiffuseLighting in="n" surfaceScale={1.3} lightingColor="#fffaf0" result="l">
          <feDistantLight azimuth={225} elevation={62} />
        </feDiffuseLighting>
      </filter>
      <rect width="100%" height="100%" filter="url(#fiber)" />
    </svg>
  );
}

/** Lamp light from the top left and darker edges, like a photo of a desk. */
export function DeskLight() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 42,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 70% 60% at 28% 18%, rgba(255,248,230,0.22), rgba(255,248,230,0) 70%), radial-gradient(ellipse 120% 100% at 50% 45%, rgba(60,40,20,0) 55%, rgba(60,40,20,0.16) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

/** A coffee-cup ring. Place it with `style` (absolute position). */
export function CupRing({ style, smear = "left", opacity = 0.85 }: { style: React.CSSProperties; smear?: "left" | "right" | "none"; opacity?: number }) {
  return (
    <svg style={{ position: "absolute", width: 240, height: 240, overflow: "visible", opacity, ...style }} viewBox="0 0 240 240">
      <g filter="url(#cupring)">
        <path fillRule="evenodd" d="M120 22 A 98 98 0 1 1 119.9 22 Z M120 31 A 89 89 0 1 0 120.1 31 Z" fill="#000" fillOpacity={0.85} />
        {smear === "left" && (
          <path d="M150 60 C 180 76, 196 120, 178 158 C 166 182, 140 190, 132 170 C 126 152, 160 140, 150 110 Z" fill="#000" fillOpacity={0.2} />
        )}
        {smear === "right" && (
          <path d="M60 70 C 90 52, 150 56, 176 92 C 196 122, 182 170, 140 186 C 112 196, 88 186, 98 160 C 106 138, 70 130, 60 110 Z" fill="#000" fillOpacity={0.2} />
        )}
      </g>
    </svg>
  );
}

/** Hand-drawn pencil arrow pointing down-left (used beside page titles). */
export function PencilArrowDownLeft() {
  return (
    <svg width="54" height="40" viewBox="0 0 54 40">
      <path d="M50 6 C 34 4, 16 14, 6 32" />
      <path d="M6 32 L 8 18 M6 32 L 19 28" />
    </svg>
  );
}

/** Hand-drawn pencil arrow pointing down-right. */
export function PencilArrowDownRight() {
  return (
    <svg width="40" height="44" viewBox="0 0 40 44">
      <path d="M6 4 C 26 8, 36 22, 32 40" />
      <path d="M32 40 L 24 30 M32 40 L 38 28" />
    </svg>
  );
}
