"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Sparkles } from "lucide-react";

interface ThemeToggleProps {
  activeColor?: string;
}

export default function ThemeToggle({ activeColor = "#4edea3" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 500);

    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-[66px] h-[32px] rounded-full border border-white/10 bg-[#081020]/60" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="relative flex items-center w-[66px] h-[32px] rounded-full p-1 border cursor-pointer select-none transition-all duration-500 overflow-hidden group shadow-md"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #050a16 0%, #0d1628 50%, #150f28 100%)"
          : "linear-gradient(135deg, #38bdf8 0%, #fb923c 50%, #facc15 100%)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(251, 146, 60, 0.5)",
        boxShadow: isDark
          ? `0 0 16px ${activeColor}20, inset 0 1px 1px rgba(255,255,255,0.1)`
          : "0 0 20px rgba(251, 146, 60, 0.45), inset 0 1px 1px rgba(255,255,255,0.4)",
      }}
    >
      {/* ── Background Cosmic Sky: Twinkling Stars in Dark / Clouds in Light ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            {/* Twinkling Star 1 */}
            <motion.span
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-3 w-1 h-1 rounded-full bg-purple/90 shadow-[0_0_6px_#a855f7]"
            />
            {/* Twinkling Star 2 */}
            <motion.span
              animate={{ opacity: [0.8, 0.2, 0.8], scale: [1.1, 0.7, 1.1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute bottom-2.5 right-6 w-0.5 h-0.5 rounded-full bg-cyan-300 shadow-[0_0_4px_#67e8f9]"
            />
            {/* Micro Nebula Dust */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(168,85,247,0.15),_transparent_70%)]" />
          </>
        ) : (
          <>
            {/* Golden Sunbeams & Dawn Aura */}
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(255,255,255,0.35),_transparent_60%)]"
            />
            {/* Stylized Morning Cloud Shapes */}
            <div className="absolute -bottom-1 left-2 w-4 h-2.5 rounded-full bg-white/40 blur-[0.5px]" />
            <div className="absolute -bottom-1.5 left-4 w-5 h-3 rounded-full bg-white/30 blur-[0.5px]" />
          </>
        )}
      </div>

      {/* ── Click Solar / Lunar Burst Flare ── */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `2px solid ${isDark ? "#a855f7" : "#fbbf24"}`,
            boxShadow: `0 0 15px ${isDark ? "#a855f7" : "#fbbf24"}`,
          }}
        />
      )}

      {/* ── Sliding Celestial Orb (Moon 🌙 in Dark / Sun ☀️ in Light) ── */}
      <motion.div
        animate={{
          x: isDark ? 0 : 34,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 26,
        }}
        className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full shadow-lg"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)"
            : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #ea580c 100%)",
          boxShadow: isDark
            ? "0 0 12px rgba(168, 85, 247, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)"
            : "0 0 14px rgba(245, 158, 11, 0.8), inset 0 1px 2px rgba(255,255,255,0.6)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="lunar-moon"
              initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative flex items-center justify-center text-purple-200"
            >
              <Moon size={13} strokeWidth={2.4} fill="#c084fc" fillOpacity={0.25} />
            </motion.div>
          ) : (
            <motion.div
              key="solar-sun"
              initial={{ rotate: 120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative flex items-center justify-center text-amber-950"
            >
              <Sun size={14} strokeWidth={2.4} className="animate-[spin_12s_linear_infinite]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
