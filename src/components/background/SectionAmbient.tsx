"use client";

import { useEffect, useRef } from "react";
import type { IconEntry } from "../../lib/sectionIcons";

interface Props {
  color: string;
  variant?: "a" | "b" | "c" | "d";
  icons?: IconEntry[];
}

interface BlobDef {
  baseLeft: string;
  baseTop: string;
  sizeFrac: number;
  blur: number;
  opacity: number;
  rx1: number;
  fx1: number;
  mx1: number;
  fmx1: number;
  px1: number;
  rx2: number;
  fx2: number;
  mx2: number;
  fmx2: number;
  rx3: number;
  fx3: number;
  px3: number;
  ry1: number;
  fy1: number;
  my1: number;
  fmy1: number;
  py1: number;
  ry2: number;
  fy2: number;
  my2: number;
  fmy2: number;
  ry3: number;
  fy3: number;
  py3: number;
}

const φ = 1.6180339887;
const S2 = 1.4142135623;
const S3 = 1.7320508075;
const S5 = 2.2360679774;
const S7 = 2.645751311;

function blob(
  baseLeft: string,
  baseTop: string,
  sizeFrac: number,
  blur: number,
  opacity: number,
  base: number,
  m1: number,
  m2: number,
  px1: number,
  py1: number,
  px3: number,
  py3: number
): BlobDef {
  return {
    baseLeft,
    baseTop,
    sizeFrac,
    blur,
    opacity,
    rx1: 0.13,
    fx1: base,
    mx1: m1,
    fmx1: base / (φ * φ),
    px1,
    rx2: 0.06,
    fx2: base * φ,
    mx2: m2,
    fmx2: base / S3,
    rx3: 0.04,
    fx3: base * S2,
    px3,
    ry1: 0.12,
    fy1: (base * S3) / S2,
    my1: m1 * 0.9,
    fmy1: base / (φ + 1),
    py1,
    ry2: 0.05,
    fy2: base * S5,
    my2: m2 * 1.1,
    fmy2: base / S7,
    ry3: 0.03,
    fy3: base / φ,
    py3,
  };
}

const VARIANTS: Record<string, BlobDef[]> = {
  a: [
    blob("8%", "4%", 0.52, 90, 0.21, 0.27, 1.9, 1.3, 0.0, 1.1, 0.4, 2.3),
    blob("50%", "30%", 0.38, 100, 0.14, 0.34, 2.2, 1.6, 2.0, 0.5, 1.7, 0.8),
    blob("28%", "60%", 0.24, 85, 0.11, 0.43, 1.6, 1.1, 1.3, 2.4, 3.1, 1.5),
  ],
  b: [
    blob("43%", "-4%", 0.5, 95, 0.2, 0.29, 2.0, 1.4, 0.8, 0.3, 2.2, 3.7),
    blob("-4%", "38%", 0.36, 105, 0.14, 0.38, 1.8, 1.5, 3.1, 1.7, 0.5, 2.9),
    blob("60%", "56%", 0.22, 85, 0.11, 0.5, 2.4, 1.2, 0.6, 2.0, 1.4, 0.3),
  ],
  c: [
    blob("53%", "7%", 0.48, 90, 0.21, 0.31, 2.1, 1.7, 1.5, 0.7, 3.4, 1.1),
    blob("4%", "-7%", 0.34, 100, 0.14, 0.4, 1.7, 1.3, 2.3, 1.2, 0.9, 3.2),
    blob("32%", "58%", 0.24, 85, 0.11, 0.48, 2.3, 1.0, 0.4, 3.0, 2.0, 0.6),
  ],
  d: [
    blob("11%", "18%", 0.53, 100, 0.19, 0.25, 2.0, 1.5, 2.5, 0.9, 1.2, 3.5),
    blob("53%", "-4%", 0.36, 105, 0.14, 0.36, 1.9, 1.4, 1.0, 2.2, 3.8, 0.7),
    blob("25%", "63%", 0.23, 85, 0.11, 0.46, 2.5, 1.2, 0.2, 1.8, 0.6, 2.4),
  ],
};

export default function SectionAmbient({ color, variant = "a", icons = [] }: Props) {
  const cr = parseInt(color.slice(1, 3), 16);
  const cg = parseInt(color.slice(3, 5), 16);
  const cb = parseInt(color.slice(5, 7), 16);

  const blobs = VARIANTS[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  // Cached icon centers (updated on resize)
  const iconPosRef = useRef<{ x: number; y: number }[]>([]);
  // icons prop stable ref — avoid stale closure in RAF
  const iconsRef = useRef(icons);
  useEffect(() => {
    iconsRef.current = icons;
  });

  // ResizeObserver: update dims, blob sizes, and icon positions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const apply = (w: number, h: number) => {
      dimsRef.current = { w, h };
      blobs.forEach((b, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const s = Math.round(b.sizeFrac * w);
        el.style.width = `${s}px`;
        el.style.height = `${s}px`;
      });
      // Cache icon center positions in px
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        iconPosRef.current[i] = {
          x: el.offsetLeft + el.offsetWidth / 2,
          y: el.offsetTop + el.offsetHeight / 2,
        };
      });
    };

    const ro = new ResizeObserver(([e]) => apply(e.contentRect.width, e.contentRect.height));
    ro.observe(container);
    if (container.offsetWidth > 0) apply(container.offsetWidth, container.offsetHeight);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  // RAF: FM blob animation + icon proximity lighting
  useEffect(() => {
    let raf: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const { w, h } = dimsRef.current;

      // Compute blob positions and transforms
      const centers: { x: number; y: number; r: number }[] = [];

      blobs.forEach((b, i) => {
        const el = blobRefs.current[i];
        if (!el || w === 0) return;

        const x =
          b.rx1 * w * Math.sin(b.fx1 * t + b.mx1 * Math.sin(b.fmx1 * t + b.px1)) +
          b.rx2 * w * Math.sin(b.fx2 * t + b.mx2 * Math.sin(b.fmx2 * t)) +
          b.rx3 * w * Math.sin(b.fx3 * t + b.px3);
        const y =
          b.ry1 * h * Math.sin(b.fy1 * t + b.my1 * Math.sin(b.fmy1 * t + b.py1)) +
          b.ry2 * h * Math.sin(b.fy2 * t + b.my2 * Math.sin(b.fmy2 * t)) +
          b.ry3 * h * Math.sin(b.fy3 * t + b.py3);

        el.style.transform = `translate(${x}px, ${y}px)`;

        // Blob CSS position is its top-left corner; add radius to get actual center.
        const r = b.sizeFrac * w * 0.5;
        centers.push({
          x: (parseFloat(b.baseLeft) / 100) * w + x + r,
          y: (parseFloat(b.baseTop) / 100) * h + y + r,
          r,
        });
      });

      // Update icon opacities based on nearest blob center
      const currentIcons = iconsRef.current;
      if (currentIcons.length > 0 && w > 0) {
        currentIcons.forEach((_, iconIdx) => {
          const iconEl = iconRefs.current[iconIdx];
          const pos = iconPosRef.current[iconIdx];
          if (!iconEl || !pos) return;

          let maxInfluence = 0;
          for (const c of centers) {
            const dist = Math.hypot(pos.x - c.x, pos.y - c.y);
            // Icon lights up only when the blob's visible body overlaps it.
            // Zone = blob radius: icon is dark outside, glows inside.
            const t = Math.max(0, 1 - dist / c.r);
            const influence = t * t * (3 - 2 * t); // smoothstep
            if (influence > maxInfluence) maxInfluence = influence;
          }

          // Invisible at rest; faint white when blob sweeps over (max 0.18)
          iconEl.style.opacity = String(maxInfluence * 0.18);
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Blobs */}
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: b.baseLeft,
            top: b.baseTop,
            width: `${b.sizeFrac * 100}%`,
            height: `${b.sizeFrac * 100}%`,
            borderRadius: "50%",
            background: `rgba(${cr},${cg},${cb},${b.opacity})`,
            filter: `blur(${b.blur}px)`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Background syntax characters */}
      {icons.map((entry, i) => (
        <div
          key={i}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: entry.x,
            top: entry.y,
            opacity: 0,
            color: "rgb(255,255,255)",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: `${entry.size ?? 38}px`,
            fontWeight: 700,
            lineHeight: 1,
            userSelect: "none",
            transition: "none",
            transform: entry.rotate ? `rotate(${entry.rotate}deg)` : undefined,
            whiteSpace: "nowrap",
          }}
        >
          {entry.char}
        </div>
      ))}
    </div>
  );
}
