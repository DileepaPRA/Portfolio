"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS, PERSONAL_INFO } from "../../lib/data";
import ThemeToggle from "./ThemeToggle";

interface Props {
  activeSection: string;
  visible?: boolean;
}

export default function Navbar({ activeSection, visible = true }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeColor = NAV_ITEMS.find((n) => n.href === `#${activeSection}`)?.color ?? "#4edea3";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -20,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: visible ? 0.1 : 0 }}
    >
      <motion.nav
        initial={false}
        animate={{
          maxWidth: scrolled ? "880px" : "1320px",
          height: scrolled ? 48 : 56,
          borderRadius: scrolled ? 9999 : 20,
          paddingLeft: scrolled ? 18 : 28,
          paddingRight: scrolled ? 18 : 28,
          y: scrolled ? 2 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-auto flex items-center justify-between liquid-glass-pill w-full mx-auto relative transition-colors duration-300"
      >
        {/* Left: Logo */}
        <div className="flex items-center shrink-0 z-10">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-1 group py-1"
          >
            <span
              className="font-mono font-bold text-sm tracking-tight transition-colors duration-300"
              style={{ color: activeColor }}
            >
              &gt;_
            </span>
            <span className="font-mono font-bold text-sm tracking-tight text-ink ml-1.5">
              {PERSONAL_INFO.shortName}
            </span>
            <span
              className="font-mono font-bold text-sm ml-0.5 blink"
              style={{ color: activeColor }}
            >
              ▋
            </span>
          </a>
        </div>

        {/* Center: Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 mx-auto z-10 whitespace-nowrap shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-2.5 xl:px-3 py-1 font-mono text-[11px] tracking-wider font-semibold rounded-full transition-colors duration-200"
                style={{
                  color: isActive ? item.color : "var(--color-muted)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: `${item.color}1e`,
                      boxShadow: `0 0 12px ${item.color}28, inset 0 0 0 1px ${item.color}45`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right: Actions slot (ThemeToggle and mobile menu) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
          <ThemeToggle activeColor={activeColor} />

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-muted hover:text-ink p-1.5 rounded-lg transition-colors cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer with backdrop (Centered without clipping) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Fullscreen backdrop to dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mathematically centered floating frosted card */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto lg:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[min(320px,calc(100vw-32px))] liquid-glass-pill rounded-2xl p-3 flex flex-col gap-1 z-50 shadow-2xl"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    className="flex items-center justify-between py-2 px-3.5 rounded-xl font-mono text-xs tracking-wider font-semibold transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: `${item.color}22`,
                            boxShadow: `inset 0 0 0 1px ${item.color}50`,
                            color: item.color,
                          }
                        : { color: "var(--color-muted)" }
                    }
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: item.color }}
                      />
                    )}
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
