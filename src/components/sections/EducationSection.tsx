"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  GitBranch,
  GitCommit,
  CheckCircle2,
  Sparkles,
  GitMerge,
  Terminal,
} from "lucide-react";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import { TIMELINE, SECTION_COLORS } from "../../lib/data";

const DOT_OFFSET_PX = 24;

export default function EducationSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [terminalOpen, setTerminalOpen] = useState<number | null>(null);

  return (
    <section
      id="education"
      data-section="education"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient
        color={SECTION_COLORS.education}
        variant="c"
        icons={SECTION_ICONS.education}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
              <span className="text-blue font-mono">#</span>education
            </h2>
            <div className="h-px bg-gradient-to-r from-blue/40 via-white/10 to-transparent flex-grow max-w-sm" />
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-blue/25 font-mono text-xs glass"
            style={{
              background: "var(--card-dark-fill)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-blue">
                <GitBranch size={13} className="animate-pulse" />
                <span className="font-bold">academic-history</span>
                <span className="text-muted">/</span>
                <span className="text-ink font-semibold">main</span>
              </div>
              <span className="text-muted hidden sm:inline">—</span>
              <span className="text-muted hidden sm:inline text-[11px]">
                git log --graph --oneline --decorate
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-blue font-bold">
                <GitCommit size={12} />
                {TIMELINE.length} commits
              </span>
              <span className="text-muted">|</span>
              <span className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 font-semibold">
                <CheckCircle2 size={12} />
                verified
              </span>
              <span className="text-muted">|</span>
              <span className="flex items-center gap-1 text-blue/80">
                <GitMerge size={12} />0 conflicts
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Git Tree ── */}
        <div className="relative">
          {/* Rail — centered on node col (w-24 = 6rem), top/bottom = DOT_OFFSET_PX */}
          <div
            className="absolute w-px hidden sm:block pointer-events-none"
            style={{
              left: "calc(3rem - 0.5px)",
              top: DOT_OFFSET_PX,
              bottom: DOT_OFFSET_PX,
              background:
                "linear-gradient(to bottom, #3b82f6 0%, rgba(59,130,246,0.5) 50%, rgba(59,130,246,0.15) 100%)",
            }}
          />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => {
              const isHovered = hoveredIdx === i;
              const isTermOpen = terminalOpen === i;

              return (
                <motion.div
                  key={i}
                  className="relative flex gap-0 sm:gap-5 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.15 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* ── Node Column (w-24) ── */}
                  <div className="hidden sm:flex flex-col items-center w-24 shrink-0 relative z-10">
                    <div style={{ height: DOT_OFFSET_PX }} />

                    {/* Pulsing ring */}
                    <div className="relative flex items-center justify-center">
                      {(item.current || isHovered) && (
                        <motion.div
                          className="absolute rounded-full border border-blue/50"
                          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          style={{ width: 44, height: 44 }}
                        />
                      )}
                      <motion.div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center relative z-10"
                        animate={{
                          borderColor: isHovered
                            ? "#60a5fa"
                            : item.current
                              ? "#3b82f6"
                              : "var(--color-dim)",
                          boxShadow: isHovered
                            ? "0 0 22px rgba(59,130,246,0.95), inset 0 0 10px rgba(59,130,246,0.5)"
                            : item.current
                              ? "0 0 16px rgba(59,130,246,0.6), inset 0 0 8px rgba(59,130,246,0.3)"
                              : "0 0 8px rgba(56,77,108,0.3)",
                          backgroundColor: "var(--color-void)",
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full"
                          animate={{
                            backgroundColor: isHovered
                              ? "#93c5fd"
                              : item.current
                                ? "#3b82f6"
                                : "var(--color-muted)",
                            scale: isHovered ? 1.3 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    </div>

                    {/* Period & tag */}
                    <div className="text-center mt-2.5 font-mono relative z-10 px-1.5 py-1 rounded bg-surface/90 border border-border backdrop-blur-md">
                      <span className="text-[11px] font-bold text-ink block leading-snug">
                        {item.period.split("–")[0]?.trim()}
                      </span>
                      <span className="text-[10px] text-muted block leading-snug">
                        {item.period.split("–")[1]?.trim()}
                      </span>
                      {item.tagLabel && (
                        <motion.span
                          className="inline-block mt-2 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase border"
                          animate={{
                            background: isHovered
                              ? "rgba(59,130,246,0.28)"
                              : item.current
                                ? "rgba(59,130,246,0.15)"
                                : "var(--color-border)",
                            borderColor: isHovered
                              ? "rgba(59,130,246,0.7)"
                              : item.current
                                ? "rgba(59,130,246,0.4)"
                                : "var(--color-border-hi)",
                            color:
                              item.current || isHovered
                                ? "var(--color-blue)"
                                : "var(--color-muted)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.tagLabel}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal connector — centered on dot */}
                  <div
                    className="hidden sm:block absolute pointer-events-none"
                    style={{
                      left: "6rem",
                      width: "1.25rem",
                      height: "1px",
                      top: DOT_OFFSET_PX + 14,
                      background: isHovered
                        ? "rgba(59,130,246,0.7)"
                        : item.current
                          ? "rgba(59,130,246,0.4)"
                          : "var(--color-border)",
                      transition: "background 0.25s",
                    }}
                  />

                  {/* ── Release Card ── */}
                  <motion.div
                    className="flex-1 relative rounded-2xl border overflow-hidden cursor-default glass"
                    animate={{
                      borderColor: isHovered
                        ? "rgba(59,130,246,0.6)"
                        : item.current
                          ? "rgba(59,130,246,0.35)"
                          : "var(--glass-border)",
                      boxShadow: isHovered ? "0 16px 50px -10px rgba(59,130,246,0.25)" : undefined,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Scanline */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          style={{
                            background:
                              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.018) 3px, rgba(59,130,246,0.018) 4px)",
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Sweep line */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
                          style={{ background: "rgba(59,130,246,0.5)" }}
                          initial={{ top: 0, opacity: 0.8 }}
                          animate={{ top: "100%", opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.0, ease: "easeIn" }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Top Right Version Tag & Commit */}
                    <div className="absolute top-3.5 right-4 flex items-center gap-2 font-mono z-10">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue/15 border border-blue/30 text-blue font-bold tracking-wider">
                        {item.version}
                      </span>
                      <span className="text-[11px] text-muted">
                        commit{" "}
                        <motion.span
                          className="text-ink/80 font-medium"
                          animate={{
                            color: isHovered ? "#93c5fd" : "rgba(226,232,240,0.8)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.commitHash}
                        </motion.span>
                      </span>
                    </div>

                    <div className="relative z-10 p-5 md:p-6">
                      {/* Mobile period row */}
                      <div className="sm:hidden flex items-center justify-between mb-4 pb-3 border-b border-white/5 font-mono text-xs">
                        <span className="text-blue font-bold flex items-center gap-1.5">
                          <Calendar size={12} /> {item.period}
                        </span>
                        {item.tagLabel && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue/15 text-blue border border-blue/30">
                            {item.tagLabel}
                          </span>
                        )}
                      </div>

                      {/* Main grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start">
                        {/* Crest */}
                        <div className="lg:col-span-3 flex lg:flex-col items-center justify-center">
                          <motion.div
                            className="relative w-20 h-20 rounded-xl border p-2.5 flex items-center justify-center"
                            animate={{
                              borderColor: isHovered
                                ? "rgba(59,130,246,0.7)"
                                : "rgba(59,130,246,0.2)",
                              boxShadow: isHovered ? "0 0 28px rgba(59,130,246,0.28)" : "none",
                              backgroundColor: isHovered
                                ? "rgba(59,130,246,0.07)"
                                : "rgba(59,130,246,0.02)",
                            }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-blue/60" />
                            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-blue/60" />
                            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-blue/60" />
                            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-blue/60" />
                            <motion.img
                              src={item.logo}
                              alt={item.institution}
                              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                              animate={{ scale: isHovered ? 1.08 : 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-9">
                          {/* Degree (main) + Institution (sub) */}
                          <motion.h3
                            className="font-display text-xl md:text-2xl font-extrabold leading-tight pr-24 sm:pr-36 text-ink"
                            animate={{
                              color: isHovered ? "var(--color-blue)" : "var(--color-ink)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.degree}
                          </motion.h3>
                          <p className="font-mono text-sm text-blue/90 font-medium mt-0.5 mb-3">
                            {item.institution}
                          </p>

                          {/* Stat HUD tiles */}
                          {item.stats && item.stats.length > 0 && (
                            <div
                              className="grid gap-1.5 mb-3"
                              style={{
                                gridTemplateColumns: `repeat(${item.stats.length}, minmax(0, 1fr))`,
                              }}
                            >
                              {item.stats.map((stat, sIdx) => (
                                <motion.div
                                  key={sIdx}
                                  className="px-2.5 py-1.5 rounded-lg border text-center"
                                  animate={{
                                    background: stat.highlight
                                      ? isHovered
                                        ? "rgba(59,130,246,0.2)"
                                        : "rgba(59,130,246,0.12)"
                                      : isHovered
                                        ? "var(--color-border-hi)"
                                        : "var(--color-border)",
                                    borderColor: stat.highlight
                                      ? isHovered
                                        ? "rgba(59,130,246,0.6)"
                                        : "rgba(59,130,246,0.35)"
                                      : isHovered
                                        ? "var(--color-border-hi)"
                                        : "var(--color-border)",
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <span className="font-mono text-[8px] text-muted uppercase tracking-wider block mb-0.5">
                                    {stat.label}
                                  </span>
                                  <span
                                    className={`font-display text-sm font-extrabold tracking-tight ${stat.highlight ? "text-blue" : "text-ink"}`}
                                  >
                                    {stat.value}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* Description */}
                          {item.description && (
                            <p className="text-muted text-xs leading-relaxed mb-2">
                              {item.description}
                            </p>
                          )}

                          {/* A/L subjects inline */}
                          {item.alSubjects && (
                            <motion.div
                              className="mb-2 flex items-center gap-2 flex-wrap px-3 py-1.5 rounded-lg border"
                              animate={{
                                borderColor: isHovered
                                  ? "rgba(59,130,246,0.3)"
                                  : "rgba(255,255,255,0.07)",
                                background: isHovered
                                  ? "rgba(59,130,246,0.06)"
                                  : "rgba(255,255,255,0.02)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="font-mono text-[8px] text-blue/60 uppercase tracking-widest">
                                subjects:
                              </span>
                              <span className="font-mono text-[11px] text-ink/80">
                                {item.alSubjects}
                              </span>
                            </motion.div>
                          )}

                          {/* Academic Standing */}
                          {item.academicStanding && (
                            <motion.div
                              className="mb-3 p-3 rounded-xl border flex items-center gap-3"
                              animate={{
                                borderColor: isHovered
                                  ? "rgba(59,130,246,0.45)"
                                  : "rgba(59,130,246,0.25)",
                                background: isHovered
                                  ? "rgba(59,130,246,0.13)"
                                  : "rgba(59,130,246,0.08)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: "rgba(59,130,246,0.18)" }}
                              >
                                <Sparkles size={14} className="text-blue" />
                              </div>
                              <div>
                                <p className="font-mono text-[8px] text-blue tracking-widest font-bold uppercase">
                                  Academic Honors
                                </p>
                                <p className="text-ink/90 text-xs font-medium mt-0.5">
                                  {item.academicStanding}
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {/* ── Git Terminal Panel ── */}
                          <div className="mt-2">
                            <button
                              onClick={() => setTerminalOpen(isTermOpen ? null : i)}
                              className="flex items-center gap-1.5 font-mono text-[10px] text-muted hover:text-blue transition-colors"
                            >
                              <Terminal size={11} />
                              <span>
                                {isTermOpen ? "close terminal" : "git show " + item.commitHash}
                              </span>
                              <motion.span
                                animate={{ rotate: isTermOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-blue/50"
                              >
                                ▾
                              </motion.span>
                            </button>

                            <AnimatePresence>
                              {isTermOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="mt-2 rounded-lg border p-3 font-mono text-[10px] leading-relaxed"
                                    style={{
                                      background: "rgba(3, 7, 18, 0.9)",
                                      borderColor: "rgba(59,130,246,0.2)",
                                    }}
                                  >
                                    <p className="text-blue/60">
                                      {"$ git show " + item.commitHash}
                                    </p>
                                    <p className="text-yellow-400/80 mt-1">
                                      {"commit " +
                                        item.commitHash +
                                        " (" +
                                        (item.tagLabel ?? "") +
                                        ")"}
                                    </p>
                                    <p className="text-muted">
                                      {"Author: Dileepa Prabhath <prabhathhpd.23@uom.lk>"}
                                    </p>
                                    <p className="text-muted">{"Date:   " + item.period}</p>

                                    {/* Moratuwa: semester GPA breakdown */}
                                    {item.semesterGPAs && item.semesterGPAs.length > 0 && (
                                      <div className="mt-2 space-y-0.5">
                                        {item.semesterGPAs.map((s) => (
                                          <p key={s.sem}>
                                            <span className="text-emerald-400">{"+ "}</span>
                                            <span className="text-muted">{s.sem + ": "}</span>
                                            <span className="text-ink font-bold">{s.gpa}</span>
                                          </p>
                                        ))}
                                      </div>
                                    )}

                                    {/* Badulla: Z-Score + District Rank */}
                                    {!item.semesterGPAs && (
                                      <div className="mt-2 space-y-0.5">
                                        <p>
                                          <span className="text-emerald-400">{"+ "}</span>
                                          <span className="text-muted">{"Z-SCORE: "}</span>
                                          <span className="text-ink font-bold">{"1.5075"}</span>
                                        </p>
                                        <p>
                                          <span className="text-emerald-400">{"+ "}</span>
                                          <span className="text-muted">{"DISTRICT RANK: "}</span>
                                          <span className="text-ink font-bold">{"105"}</span>
                                        </p>
                                      </div>
                                    )}

                                    <p className="text-blue/40 mt-2 animate-pulse">▋</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
