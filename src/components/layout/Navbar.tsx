"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PERSONAL_INFO } from "../../lib/data";

interface Props {
  activeSection: string;
}

export default function Navbar({ activeSection }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,15,32,0.94)" : "rgba(8,15,32,0.88)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 1px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-700"
        style={{ background: activeColor, opacity: 0.85 }}
      />

      <div className="flex items-center justify-between h-14 px-6 md:px-8 max-w-[1440px] mx-auto lg:pl-24">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-1 group"
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
          <span className="font-mono font-bold text-sm ml-0.5 blink" style={{ color: activeColor }}>
            ▋
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-3 py-1.5 font-mono text-[11px] tracking-widest font-semibold rounded-md transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: `${item.color}1a`,
                        borderBottom: `2px solid ${item.color}`,
                        borderTop: "2px solid transparent",
                        color: item.color,
                        borderRadius: "6px",
                      }
                    : {
                        color: "#6b80a0",
                        borderBottom: "2px solid transparent",
                        borderTop: "2px solid transparent",
                      }
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-muted hover:text-ink p-2 rounded-lg transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-14 left-0 right-0 bg-[#060c1a]/96 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-1">
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
                className="py-2.5 px-3 rounded-lg font-mono text-sm tracking-widest font-semibold transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: `${item.color}1a`,
                        borderBottom: `2px solid ${item.color}`,
                        color: item.color,
                      }
                    : { color: "#6b80a0" }
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
