"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import { PERSONAL_INFO } from "../../lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const tokenColors: Record<string, string> = {
  comment: "#4a5568",
  keyword: "#c792ea",
  var: "#dce4f5",
  key: "#7ecbff",
  string: "#84cc16",
  number: "#f78c6c",
  operator: "#6b7a99",
};

export default function AboutSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = terminalRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.015)`;
    el.style.boxShadow = `${x * 24}px ${y * 16}px 40px rgba(132,204,22,0.12), 0 0 40px rgba(132,204,22,0.08)`;
    el.style.borderColor = "rgba(132,204,22,0.2)";
  };

  const handleMouseLeave = () => {
    const el = terminalRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
    el.style.borderColor = "";
    setHoveredLine(null);
  };

  return (
    <section
      id="about"
      data-section="about"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#84cc16" variant="b" icons={SECTION_ICONS.about} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            <span className="text-lime">#</span>about-me
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait */}
          <motion.div
            className="lg:col-span-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 40px rgba(132,204,22,0.5), 0 0 80px rgba(132,204,22,0.2)",
                  borderRadius: "50%",
                }}
              />
              {/* Photo */}
              <div
                className="w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden transition-all duration-500 relative"
                style={{
                  border: "3px solid #84cc16",
                  boxShadow: "0 0 0 6px rgba(132,204,22,0.12), 0 0 30px rgba(132,204,22,0.45)",
                }}
              >
                <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Terminal + bio */}
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            {/* Interactive terminal card */}
            <div
              ref={terminalRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="rounded-xl overflow-hidden border border-white/[0.06] cursor-default select-none transition-transform duration-100"
              style={{
                background: "rgba(5,8,18,0.92)",
                backdropFilter: "blur(16px)",
                willChange: "transform",
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ background: "rgba(0,0,0,0.35)", borderColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-dim">about.ts</span>
                <div className="w-14" />
              </div>

              {/* Code body */}
              <div className="p-5 flex gap-4 font-mono text-[13px] leading-6 overflow-x-auto scrollbar-hide">
                {/* Line numbers */}
                <div className="flex flex-col text-right select-none shrink-0 text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
                  {PERSONAL_INFO.aboutCodeLines.map((_, i) => (
                    <span
                      key={i}
                      className="leading-6 transition-colors duration-100"
                      style={{ color: hoveredLine === i ? "rgba(132,204,22,0.5)" : "rgba(255,255,255,0.15)" }}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>

                {/* Code lines */}
                <div className="flex-grow">
                  {PERSONAL_INFO.aboutCodeLines.map((line, i) => (
                    <div
                      key={i}
                      className="leading-6 rounded px-2 -mx-2 transition-colors duration-100"
                      style={{
                        background: hoveredLine === i ? "rgba(132,204,22,0.07)" : "transparent",
                        borderLeft: hoveredLine === i ? "2px solid rgba(132,204,22,0.5)" : "2px solid transparent",
                        paddingLeft: hoveredLine === i ? "0.375rem" : "0.5rem",
                      }}
                      onMouseEnter={() => setHoveredLine(i)}
                    >
                      {line.tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        line.tokens.map((tok, j) => (
                          <span
                            key={j}
                            style={{
                              color: tokenColors[tok.type],
                              marginLeft: j === 0 && line.indent > 0 ? "1.5rem" : undefined,
                            }}
                          >
                            {tok.text}
                          </span>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-6 text-muted text-base leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {PERSONAL_INFO.stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="glass text-center py-4 hover:border-lime/25 transition-colors"
                >
                  <p className="font-display text-2xl font-bold text-lime">{value}</p>
                  <p className="font-mono text-[10px] text-muted tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
