"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  X,
  Minus,
  Square,
  AppWindow,
  Sparkles,
  Terminal,
  Send,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "../icons";
import { PROJECTS, SOCIALS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import TechLogo from "../TechLogo";

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState<number | "collab">(0);
  const [direction, setDirection] = useState(1);
  const [isCollabOpen, setIsCollabOpen] = useState(false);

  const total = PROJECTS.length;
  const isCollabActive = activeIdx === "collab";
  const currentProjectIdx = typeof activeIdx === "number" ? activeIdx : 0;
  const project = PROJECTS[currentProjectIdx];

  const prev = () => {
    setDirection(-1);
    if (activeIdx === "collab") {
      setActiveIdx(total - 1);
    } else {
      setActiveIdx((i) => (typeof i === "number" ? (i - 1 + total) % total : 0));
    }
  };

  const next = () => {
    setDirection(1);
    if (activeIdx === "collab") {
      setActiveIdx(0);
    } else if (typeof activeIdx === "number") {
      if (activeIdx === total - 1 && isCollabOpen) {
        setActiveIdx("collab");
      } else {
        setActiveIdx((activeIdx + 1) % total);
      }
    }
  };

  const openCollabTab = () => {
    setIsCollabOpen(true);
    setDirection(1);
    setActiveIdx("collab");
  };

  const closeCollabTab = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsCollabOpen(false);
    setDirection(-1);
    setActiveIdx(0);
  };

  const openRepo = () => {
    if (isCollabActive) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else if (project?.repo) {
      window.open(project.repo, "_blank", "noopener,noreferrer");
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to format tab file name as an executable (.exe)
  const getExeName = (title: string) => {
    return title.replace(/[^a-zA-Z0-9]/g, "") + ".exe";
  };

  return (
    <section
      id="projects"
      data-section="projects"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#a855f7" variant="a" icons={SECTION_ICONS.projects} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink shrink-0">
            <span className="text-purple">#</span>projects
          </h2>
          <div className="h-px bg-white/10 flex-grow" />
          <span className="font-mono text-sm shrink-0" style={{ color: "rgba(168,85,247,0.75)" }}>
            {isCollabActive
              ? "✨ COLLAB"
              : `${String(currentProjectIdx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          </span>
        </motion.div>

        {/* ── AUTHENTIC WINDOWS TABBED APPLICATION CONTAINER ── */}
        <div
          className="rounded-2xl border-2 border-purple/30 overflow-hidden mb-8 shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(160deg, rgba(13,24,44,0.95) 0%, rgba(6,14,28,0.98) 100%)",
            boxShadow: "0 20px 60px -15px rgba(168,85,247,0.22), 0 0 30px rgba(168,85,247,0.08)",
          }}
        >
          {/* ── AUTHENTIC WINDOWS TITLEBAR WITH MULTI-TABS & WINDOW CONTROLS ── */}
          <div
            className="flex items-stretch justify-between select-none border-b border-purple/25"
            style={{ background: "rgba(6, 12, 24, 0.98)" }}
          >
            {/* ── Left: Project Tabs List (.exe Tabs) ── */}
            <div className="flex items-end overflow-x-auto scrollbar-none pt-2 px-2 gap-1.5 flex-1 min-w-0">
              {PROJECTS.map((p, i) => {
                const isActive = activeIdx === i;
                const exeName = getExeName(p.title);

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setDirection(typeof activeIdx === "number" ? (i > activeIdx ? 1 : -1) : -1);
                      setActiveIdx(i);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setDirection(typeof activeIdx === "number" ? (i > activeIdx ? 1 : -1) : -1);
                        setActiveIdx(i);
                      }
                    }}
                    className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-t-xl font-mono text-xs cursor-pointer transition-all duration-200 shrink-0 border-t-2 ${
                      isActive
                        ? "text-ink font-bold border-purple shadow-sm z-10"
                        : "text-muted/70 hover:text-ink hover:bg-white/[0.04] border-transparent"
                    }`}
                    style={{
                      background: isActive ? "rgba(13, 24, 44, 0.95)" : "transparent",
                    }}
                  >
                    {/* App / Executable Icon */}
                    <AppWindow
                      size={13}
                      className={
                        isActive ? "text-purple" : "text-muted/60 group-hover:text-purple/80"
                      }
                    />

                    {/* Tab Name (.exe) */}
                    <span className="truncate max-w-[120px] sm:max-w-[150px]">{exeName}</span>

                    {/* Individual Tab Close '✕' Button (Advances to next project) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      title="Close tab (Next project)"
                      aria-label={`Close ${exeName}`}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-muted/60 hover:text-white hover:bg-rose-500/80 transition-all ml-1"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}

              {/* ── Dynamic "YourProject.exe" Collaboration Tab ── */}
              {isCollabOpen && (
                <div
                  onClick={() => {
                    setDirection(1);
                    setActiveIdx("collab");
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setDirection(1);
                      setActiveIdx("collab");
                    }
                  }}
                  className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-t-xl font-mono text-xs cursor-pointer transition-all duration-200 shrink-0 border-t-2 ${
                    isCollabActive
                      ? "text-teal font-bold border-teal shadow-sm z-10"
                      : "text-teal/70 hover:text-teal hover:bg-teal/[0.06] border-transparent"
                  }`}
                  style={{
                    background: isCollabActive ? "rgba(13, 24, 44, 0.95)" : "transparent",
                  }}
                >
                  <Sparkles size={13} className="text-teal animate-pulse" />
                  <span className="truncate max-w-[130px] font-semibold">YourProject.exe</span>
                  <button
                    type="button"
                    onClick={closeCollabTab}
                    title="Close Collaboration tab"
                    aria-label="Close YourProject.exe tab"
                    className="w-4 h-4 rounded-full flex items-center justify-center text-teal/60 hover:text-white hover:bg-rose-500/80 transition-all ml-1"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}

              {/* New Tab '+' Button (Opens Collaboration / New Project Tab) */}
              <button
                type="button"
                onClick={openCollabTab}
                title="Open New Collaboration Tab (Let's build a project!)"
                aria-label="New Project Tab"
                className="flex items-center justify-center w-7 h-7 mb-1 rounded-lg text-muted/60 hover:text-purple hover:bg-purple/10 border border-transparent hover:border-purple/30 transition-all shrink-0 active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* ── Right: Authentic Windows Window Controls (—, □, ✕) ── */}
            <div className="flex items-center shrink-0 border-l border-white/5">
              {/* Minimize Button '—' (Navigates to Previous Project ←) */}
              <button
                type="button"
                onClick={prev}
                title="Minimize / Previous Project (←)"
                aria-label="Previous project (Minimize button)"
                className="w-11 h-10 flex items-center justify-center text-muted hover:text-ink hover:bg-white/10 transition-colors"
              >
                <Minus size={14} />
              </button>

              {/* Maximize Button '□' (Opens GitHub Repo or Contact ↗) */}
              <button
                type="button"
                onClick={openRepo}
                title={
                  isCollabActive ? "Open Contact Section (↗)" : "Maximize / Open GitHub Repo (↗)"
                }
                aria-label="Open Repository or Contact (Maximize button)"
                className="w-11 h-10 flex items-center justify-center text-muted hover:text-ink hover:bg-white/10 transition-colors"
              >
                <Square size={11} strokeWidth={2.2} />
              </button>

              {/* Close Button '✕' (Navigates to Next Project → with Classic Red Hover) */}
              <button
                type="button"
                onClick={isCollabActive ? closeCollabTab : next}
                title="Close / Next Project (→)"
                aria-label="Next project (Close button)"
                className="w-11 h-10 flex items-center justify-center text-muted hover:text-white hover:bg-red-600 transition-colors duration-150"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ── WINDOW CONTENT BODY (Animated Slide Transition) ── */}
          <div className="relative overflow-hidden min-h-[380px]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ── 1. COLLABORATION TAB CONTENT (When YourProject.exe is Active) ── */}
              {isCollabActive ? (
                <motion.div
                  key="collab-tab"
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 30 : -30,
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -30 : 30,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col lg:flex-row min-h-[380px]"
                >
                  {/* Left: Interactive Simulated Terminal Workspace */}
                  <div
                    className="lg:w-[48%] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-teal/20 font-mono text-xs"
                    style={{ background: "rgba(4, 10, 22, 0.9)" }}
                  >
                    <div className="space-y-3">
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-muted/60 text-[11px]">
                        <div className="flex items-center gap-2">
                          <Terminal size={13} className="text-teal" />
                          <span>dileepa@workspace:~</span>
                        </div>
                        <span className="text-teal/70 font-semibold">● bash (online)</span>
                      </div>

                      {/* Interactive Command Simulation */}
                      <div className="pt-2 space-y-2 text-ink/90">
                        <div className="text-teal font-bold flex items-center gap-2">
                          <span className="text-muted">$</span>
                          <span>npx start-collaboration --with=&quot;Dileepa Prabhath&quot;</span>
                        </div>

                        <div className="space-y-1.5 pl-3 border-l-2 border-teal/40 text-muted/90 text-[11px] pt-1">
                          <p className="flex items-center gap-2 text-ink/90">
                            <CheckCircle2 size={12} className="text-teal shrink-0" />
                            <span>Developer Profile Loaded: Dileepa Prabhath</span>
                          </p>
                          <p className="flex items-center gap-2 text-teal font-semibold">
                            <CheckCircle2 size={12} className="text-teal shrink-0" />
                            <span>Status: Available for High-Impact Projects</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Terminal Footer Prompt */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-muted/50">
                      <span className="text-teal font-bold">&gt;</span>
                      <span className="text-ink/70">
                        Ready to execute new project specifications...
                      </span>
                      <span className="w-2 h-3.5 bg-teal animate-pulse" />
                    </div>
                  </div>

                  {/* Right: Invitation & Direct Contact CTA */}
                  <div className="lg:w-[52%] p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-xs font-bold">
                        <Sparkles size={13} className="text-teal" />
                        <span>COLLABORATION INITIATIVE</span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink leading-tight">
                        Ready to build a new project together?
                      </h3>

                      <p className="text-muted text-sm md:text-base leading-relaxed">
                        Have an innovative product concept, an engineering challenge, or an open
                        developer role? Let&apos;s transform your requirements into
                        high-performance, production-ready software.
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-muted/70">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                          #FullStack
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                          #SystemArchitecture
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                          #CloudNative
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="flex items-center gap-2 font-mono text-sm font-bold px-6 py-2.5 rounded-lg border border-teal bg-teal/20 text-teal hover:bg-teal/30 hover:border-teal/80 transition-all shadow-[0_0_20px_rgba(0,212,180,0.25)] hover:scale-[1.02] active:scale-98 cursor-pointer"
                      >
                        <Send size={14} />
                        <span>Let&apos;s Talk</span>
                      </button>

                      <a
                        href={`mailto:${SOCIALS.email}`}
                        className="flex items-center gap-2 font-mono text-sm font-medium px-4 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-ink hover:text-teal hover:border-teal/40 transition-all"
                      >
                        <Mail size={14} />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ── 2. STANDARD PROJECT CARD VIEW ── */
                <motion.div
                  key={project.id}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 30 : -30,
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -30 : 30,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col md:flex-row"
                >
                  {/* Left: Project Image */}
                  <div className="relative md:w-[52%] h-64 md:h-auto min-h-[300px] shrink-0 overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle Dark Overlay Gradient */}
                    <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-r from-transparent to-[#0b1525]/90 hidden md:block" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b1525]/90 to-transparent md:hidden" />
                  </div>

                  {/* Right: Project Details & Actions */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 flex-grow gap-6">
                    <div className="space-y-4">
                      {/* Tech Badges with Logos */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg border border-purple/35 text-purple/95 bg-purple/[0.08]"
                          >
                            <TechLogo name={tag} size={13} />
                            <span className="font-semibold">{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg">
                        {project.description}
                      </p>

                      {/* Hashtag Keywords */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[11px] text-muted/60">
                            #{tag.toLowerCase().replace(/[\s.]/g, "")}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/5">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                        className="flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border border-purple/60 bg-purple/25 text-[#d8b4fe] transition-all duration-200 hover:scale-[1.03] hover:bg-purple/35 hover:border-purple/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                      >
                        <span>Live Preview</span>
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View repository of ${project.title}`}
                        className="flex items-center gap-2 font-mono text-sm font-medium px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-ink/80 hover:text-ink hover:border-white/25 transition-all"
                      >
                        <GithubIcon style={{ width: 16, height: 16 }} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── THUMBNAIL FILMSTRIP & CAROUSEL NAVIGATION (Preserved) ── */}
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-muted hover:text-purple hover:border-purple/50 hover:bg-purple/10 transition-all shrink-0 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Thumbnails Filmstrip */}
          <div className="flex gap-3 overflow-x-auto py-2 flex-1 justify-center scrollbar-none">
            {PROJECTS.map((p, i) => {
              const isSelected = activeIdx === i;

              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => {
                    setDirection(typeof activeIdx === "number" ? (i > activeIdx ? 1 : -1) : -1);
                    setActiveIdx(i);
                  }}
                  aria-label={`Select project: ${p.title}`}
                  className="shrink-0 rounded-lg overflow-hidden transition-all duration-200 relative group cursor-pointer"
                  style={{
                    width: 76,
                    height: 54,
                    outline: isSelected
                      ? "2px solid rgba(168,85,247,0.9)"
                      : "2px solid transparent",
                    outlineOffset: 2,
                    opacity: isSelected ? 1 : 0.4,
                    transform: isSelected ? "scale(1.06)" : "scale(1)",
                    boxShadow: isSelected ? "0 0 15px rgba(168,85,247,0.4)" : "none",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-muted hover:text-purple hover:border-purple/50 hover:bg-purple/10 transition-all shrink-0 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-4 font-mono text-xs text-muted/50">
          <span className="text-purple font-bold">
            {isCollabActive ? "✨" : String(currentProjectIdx + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20"> / </span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
