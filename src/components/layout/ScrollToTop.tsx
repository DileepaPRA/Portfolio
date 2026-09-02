"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

/*
 * Proportional section intervals & colors matching the exact page layout:
 * 1. Hero (0% - 9%)          -> Mint #4edea3
 * 2. About (9% - 18%)        -> Lime #84cc16
 * 3. Education (18% - 32%)   -> Blue #3b82f6
 * 4. Skills (32% - 44%)      -> Emerald #10b981
 * 5. Projects (44% - 58%)    -> Purple #a855f7
 * 6. University (58% - 72%)  -> Pink #fb176f
 * 7. Achievements (72% - 90%)-> Orange #E94A1E
 * 8. Contact (90% - 100%)    -> Teal #00d4b4
 */
const SECTIONS = [
  { id: "hero", name: "Hero", color: "#4edea3", start: 0, end: 0.09 },
  { id: "about", name: "About", color: "#84cc16", start: 0.09, end: 0.18 },
  { id: "education", name: "Education", color: "#3b82f6", start: 0.18, end: 0.32 },
  { id: "skills", name: "Skills", color: "#10b981", start: 0.32, end: 0.44 },
  { id: "projects", name: "Projects", color: "#a855f7", start: 0.44, end: 0.58 },
  { id: "university", name: "University", color: "#fb176f", start: 0.58, end: 0.72 },
  { id: "achievements", name: "Achievements", color: "#E94A1E", start: 0.72, end: 0.9 },
  { id: "contact", name: "Contact", color: "#00d4b4", start: 0.9, end: 1.0 },
];

const SIZE = 50;
const STROKE_WIDTH = 2.8;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeColor, setActiveColor] = useState("#a855f7");
  const isVisibleRef = useRef(false);
  const maskRef = useRef<SVGCircleElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      // 1. Direct GPU mask update (0 React re-renders)
      if (maskRef.current) {
        const offset = CIRCUMFERENCE * (1 - progress);
        maskRef.current.style.strokeDashoffset = `${offset}px`;
      }

      // 2. Determine active section color for Dynamic Aura
      const active =
        SECTIONS.find((s) => progress >= s.start && progress <= s.end) ||
        SECTIONS[SECTIONS.length - 1];
      if (active) {
        setActiveColor(active.color);
        if (auraRef.current) {
          auraRef.current.style.boxShadow = `0 0 28px ${active.color}55, 0 0 55px ${active.color}25`;
        }
      }

      // 3. Visibility threshold toggle
      const shouldBeVisible = scrollY > 300;
      if (shouldBeVisible !== isVisibleRef.current) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hyperdrive Launch Trigger
  const handleLaunch = useCallback(() => {
    if (isLaunching) return;
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      setIsLaunching(false);
    }, 750);
  }, [isLaunching]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 25 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 right-8 z-50 select-none"
        >
          <motion.button
            onClick={handleLaunch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Hyperdrive back to top"
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center cursor-pointer group p-0 bg-transparent border-0 outline-none"
          >
            {/* Dynamic Section Aura (Ambient Color Glow synced with active section) */}
            <div
              ref={auraRef}
              className="absolute inset-0 rounded-full transition-all duration-500 opacity-60 group-hover:opacity-100"
              style={{
                boxShadow: `0 0 28px ${activeColor}55, 0 0 55px ${activeColor}25`,
              }}
            />

            {/* Hyperdrive Warp Shockwaves (Concentric Expansion Rings) */}
            {isLaunching && (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 1 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: `2px solid ${activeColor}`,
                    boxShadow: `0 0 25px ${activeColor}`,
                  }}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${activeColor}40 0%, transparent 70%)`,
                  }}
                />
              </>
            )}

            {/* Glassmorphic Core Capsule */}
            <div className="absolute inset-[3px] rounded-full bg-[#081020]/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group-hover:border-white/25 transition-colors duration-300" />

            {/* SVG Progress Ring with 8-Section Gradient Mask */}
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="relative z-10 -rotate-90 pointer-events-none"
            >
              <defs>
                <mask id="scroll-progress-mask">
                  <circle
                    ref={maskRef}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="white"
                    strokeWidth={STROKE_WIDTH + 1}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE}
                    strokeLinecap="round"
                  />
                </mask>
              </defs>

              {/* Faint ambient track */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth={STROKE_WIDTH}
              />

              {/* 8 Section Colored Arcs */}
              <g mask="url(#scroll-progress-mask)">
                {SECTIONS.map((sec) => {
                  const arcLen = (sec.end - sec.start) * CIRCUMFERENCE;
                  const gap = CIRCUMFERENCE - arcLen;
                  const offset = -(sec.start * CIRCUMFERENCE);

                  return (
                    <circle
                      key={sec.id}
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={RADIUS}
                      fill="none"
                      stroke={sec.color}
                      strokeWidth={STROKE_WIDTH}
                      strokeDasharray={`${arcLen} ${gap}`}
                      strokeDashoffset={offset}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Hyperdrive Thruster Arrow & Dynamic Plasma Plume */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none overflow-visible">
              {/* Rocket Arrow with Hyperjump Acceleration Physics */}
              <motion.div
                animate={
                  isLaunching
                    ? {
                        y: [-2, 3, -48],
                        scaleY: [1, 0.9, 1.5],
                        scaleX: [1, 1.05, 0.7],
                        opacity: [1, 1, 0],
                      }
                    : isHovered
                      ? { y: -2.5, scale: 1.05, opacity: 1 }
                      : { y: 0, scale: 1, opacity: 1 }
                }
                transition={
                  isLaunching
                    ? { duration: 0.52, times: [0, 0.12, 1], ease: [0.4, 0, 0.2, 1] }
                    : { type: "spring", stiffness: 450, damping: 20 }
                }
                className="relative flex items-center justify-center"
              >
                <ArrowUp
                  size={19}
                  strokeWidth={2.6}
                  style={{
                    color: isLaunching ? activeColor : isHovered ? "#ffffff" : "#dce4f5",
                    filter: isHovered ? `drop-shadow(0 0 6px ${activeColor})` : "none",
                  }}
                  className="transition-colors duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Dual-Core Plasma Thruster Exhaust Plume */}
              <div className="absolute bottom-2 flex flex-col items-center pointer-events-none">
                {/* Outer Plasma Flame */}
                <motion.div
                  animate={
                    isLaunching
                      ? {
                          scaleY: [0.8, 3.5, 0],
                          y: [0, 14, 24],
                          opacity: [1, 0.9, 0],
                        }
                      : isHovered
                        ? {
                            scaleY: [1, 1.45, 1.15, 1.4],
                            scaleX: [1, 0.85, 1.1, 0.9],
                            opacity: [0.85, 1, 0.8, 0.95],
                            y: 0,
                          }
                        : { scaleY: 0, opacity: 0, y: 0 }
                  }
                  transition={
                    isLaunching
                      ? { duration: 0.5, ease: "easeOut" }
                      : isHovered
                        ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.15 }
                  }
                  className="w-2 h-3.5 rounded-b-full blur-[0.6px]"
                  style={{
                    background: `linear-gradient(to bottom, #ffffff 15%, ${activeColor} 60%, transparent 100%)`,
                    boxShadow: `0 0 12px ${activeColor}, 0 0 4px #ffffff`,
                  }}
                />

                {/* Micro Exhaust Spark Particles on Launch */}
                {isLaunching && (
                  <>
                    <motion.div
                      initial={{ opacity: 1, y: 0, x: -2, scale: 1 }}
                      animate={{ opacity: 0, y: 22, x: -6, scale: 0.3 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{ boxShadow: `0 0 6px ${activeColor}` }}
                    />
                    <motion.div
                      initial={{ opacity: 1, y: 0, x: 2, scale: 1 }}
                      animate={{ opacity: 0, y: 26, x: 5, scale: 0.2 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{ boxShadow: `0 0 6px ${activeColor}` }}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
