"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../../lib/data";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING CORE...");

  useEffect(() => {
    // Disable body scroll during loading
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 1100; // Snappy 1.1s total boot time

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Non-linear easing for natural cyber telemetry feel
      const easedProgress = Math.round(Math.pow(rawProgress, 0.85) * 100);

      setProgress(easedProgress);

      if (easedProgress < 35) {
        setStatusText("INITIALIZING SYSTEM...");
      } else if (easedProgress < 75) {
        setStatusText("LOADING MODULES...");
      } else if (easedProgress < 100) {
        setStatusText("MOUNTING INTERFACE...");
      } else {
        setStatusText("SYSTEM READY");
      }

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          onComplete?.();
        }, 180);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060c1a] select-none pointer-events-auto"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          {/* Ambient Glow Center */}
          <div
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none opacity-20 blur-[90px]"
            style={{ background: "radial-gradient(circle, #4edea3 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* ── MONOGRAM PULSE BADGE ── */}
            <div className="relative flex items-center justify-center w-28 h-28 mb-8">
              {/* Outer Radar Ripple Ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-emerald/30 pointer-events-none"
                animate={{
                  scale: [1, 1.45, 1.6],
                  opacity: [0.6, 0.15, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* Outer Radar Ripple Ring 2 */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-emerald/20 pointer-events-none"
                animate={{
                  scale: [1, 1.7, 1.9],
                  opacity: [0.4, 0.1, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* Rotating Hexagonal Glow Border */}
              <motion.div
                className="absolute -inset-1.5 rounded-2xl border border-dashed border-emerald/40 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Core Monogram Emblem */}
              <div
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center border border-emerald/50 bg-[#0b1525]/90 shadow-[0_0_35px_rgba(78,222,163,0.25)]"
                style={{ backdropFilter: "blur(12px)" }}
              >
                {/* Monogram Letters */}
                <span className="font-mono text-3xl font-black tracking-tighter text-emerald drop-shadow-[0_0_12px_rgba(78,222,163,0.8)]">
                  {PERSONAL_INFO.shortName || "DP"}
                </span>

                {/* Cyber Corner Accents */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-emerald" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-emerald" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-emerald" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-emerald" />
              </div>
            </div>

            {/* ── STATUS & TELEMETRY ── */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping" />
                <span className="font-mono text-xs font-semibold tracking-wider text-ink/90 uppercase">
                  {statusText}
                </span>
              </div>
            </div>

            {/* ── PROGRESS BAR CONTAINER ── */}
            <div className="w-56 sm:w-64">
              <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald via-teal to-emerald shadow-[0_0_10px_rgba(78,222,163,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage Counter */}
              <div className="flex justify-between items-center mt-2 px-0.5 font-mono text-[11px] text-muted">
                <span className="tracking-widest opacity-60">SYS::BOOT</span>
                <span className="font-bold text-emerald">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
