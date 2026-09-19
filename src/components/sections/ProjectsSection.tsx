"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
  Maximize2,
  Copy,
  Check,
} from "lucide-react";
import { GithubIcon } from "../icons";
import { PROJECTS, SOCIALS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import TechLogo from "../TechLogo";
import { useSwipe } from "../../lib/useSwipe";

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState<number | "collab">(0);
  const [direction, setDirection] = useState(1);
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const collabTabRef = useRef<HTMLDivElement>(null);
  const filmstripThumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = PROJECTS.length;
  const isCollabActive = activeIdx === "collab";
  const currentProjectIdx = typeof activeIdx === "number" ? activeIdx : 0;
  const project = PROJECTS[currentProjectIdx];

  const prev = useCallback(() => {
    setDirection(-1);
    if (activeIdx === "collab") {
      setActiveIdx(total - 1);
    } else {
      setActiveIdx((i) => (typeof i === "number" ? (i - 1 + total) % total : 0));
    }
  }, [activeIdx, total]);

  const next = useCallback(() => {
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
  }, [activeIdx, isCollabOpen, total]);

  // Mobile swipe gestures: left swipe = prev, right swipe = next
  const projectSwipe = useSwipe({
    onSwipeLeft: prev,
    onSwipeRight: next,
  });

  const prevLightbox = useCallback(() => {
    if (!lightboxProject) return;
    const curr = PROJECTS.findIndex((p) => p.id === lightboxProject.id);
    const prevIdx = (curr - 1 + PROJECTS.length) % PROJECTS.length;
    setLightboxProject(PROJECTS[prevIdx]);
    setActiveIdx(prevIdx);
  }, [lightboxProject]);

  const nextLightbox = useCallback(() => {
    if (!lightboxProject) return;
    const curr = PROJECTS.findIndex((p) => p.id === lightboxProject.id);
    const nextIdx = (curr + 1) % PROJECTS.length;
    setLightboxProject(PROJECTS[nextIdx]);
    setActiveIdx(nextIdx);
  }, [lightboxProject]);

  const lightboxSwipe = useSwipe({
    onSwipeLeft: prevLightbox,
    onSwipeRight: nextLightbox,
  });

  const isInitialMount = useRef(true);

  // Auto-scroll active tab in titlebar whenever user switches tabs (skip initial mount to prevent window scrolling to projects on page load)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const container = tabsContainerRef.current;
    if (typeof activeIdx === "number" && tabRefs.current[activeIdx] && container) {
      const target = tabRefs.current[activeIdx];
      if (target) {
        const targetLeft = target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2;
        container.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    } else if (activeIdx === "collab" && collabTabRef.current && container) {
      const target = collabTabRef.current;
      const targetLeft = target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [activeIdx]);

  // Auto-scroll active thumbnail in bottom filmstrip (only when user actively changes tab)
  useEffect(() => {
    if (isInitialMount.current) return;
    if (typeof activeIdx === "number" && filmstripThumbRefs.current[activeIdx]) {
      filmstripThumbRefs.current[activeIdx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIdx]);

  // Keyboard shortcuts (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "Escape" && lightboxProject) {
        setLightboxProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, lightboxProject]);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('npx start-collaboration --with="Dileepa Prabhath"');
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
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
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[11px] text-muted/60">
            <span>Keys:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-ink font-semibold">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-ink font-semibold">→</kbd>
          </div>
          <span className="font-mono text-sm shrink-0" style={{ color: "rgba(168,85,247,0.75)" }}>
            {isCollabActive
              ? "✨ COLLAB"
              : `${String(currentProjectIdx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          </span>
        </motion.div>

        {/* ── AUTHENTIC WINDOWS TABBED APPLICATION CONTAINER ── */}
        <div
          className="rounded-2xl border-2 border-purple/35 overflow-hidden mb-8 shadow-2xl transition-all duration-300 terminal touch-pan-y"
          style={{
            background: "var(--terminal-bg)",
            boxShadow: "var(--glass-shadow)",
          }}
          {...projectSwipe}
        >
          {/* ── AUTHENTIC WINDOWS TITLEBAR WITH ELASTIC TABS & TAB MANAGER ── */}
          <div className="flex items-stretch justify-between select-none border-b border-purple/25 relative bg-surface/75 backdrop-blur-md">
            {/* ── Left: Project Tabs List (.exe Tabs) with Mouse Wheel & Auto-Scroll ── */}
            <div
              ref={tabsContainerRef}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onWheel={(e) => {
                if (e.currentTarget) {
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
              className="flex items-end overflow-x-auto scrollbar-none pt-2 pl-2 pr-4 gap-1.5 flex-1 min-w-0 scroll-smooth"
            >
              {PROJECTS.map((p, i) => {
                const isActive = activeIdx === i;
                const exeName = getExeName(p.title);

                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
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
                    title={p.title}
                    className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-t-xl font-mono text-xs cursor-pointer transition-all duration-200 flex-1 min-w-[85px] sm:min-w-[110px] max-w-[150px] sm:max-w-[180px] border-t-2 ${
                      isActive
                        ? "text-ink font-bold border-purple shadow-sm z-10"
                        : "text-muted hover:text-ink hover:bg-surface/50 border-transparent"
                    }`}
                    style={{
                      background: isActive ? "var(--card-dark-fill)" : "transparent",
                    }}
                  >
                    {/* App / Executable Icon */}
                    <AppWindow
                      size={12}
                      className={
                        isActive
                          ? "text-purple shrink-0"
                          : "text-muted/60 group-hover:text-purple/80 shrink-0"
                      }
                    />

                    {/* Tab Name (.exe) */}
                    <span className="truncate text-[11px] sm:text-xs">{exeName}</span>

                    {/* Individual Tab Close '✕' Button (Advances to next project) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      title="Close tab (Next project)"
                      aria-label={`Close ${exeName}`}
                      className="w-4 h-4 rounded-md flex items-center justify-center text-muted/60 hover:text-white hover:bg-rose-500/80 active:scale-90 transition-all ml-auto shrink-0 cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}

              {/* ── Dynamic "YourProject.exe" Collaboration Tab ── */}
              {isCollabOpen && (
                <div
                  ref={collabTabRef}
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
                  className={`group relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-t-xl font-mono text-xs cursor-pointer transition-all duration-200 shrink-0 min-w-[130px] max-w-[170px] border-t-2 ${
                    isCollabActive
                      ? "text-teal font-bold border-teal shadow-sm z-10"
                      : "text-teal/70 hover:text-teal hover:bg-teal/[0.06] border-transparent"
                  }`}
                  style={{
                    background: isCollabActive ? "var(--card-dark-fill)" : "transparent",
                  }}
                >
                  <Sparkles size={12} className="text-teal animate-pulse shrink-0" />
                  <span className="truncate font-semibold text-[11px] sm:text-xs">
                    YourProject.exe
                  </span>
                  <button
                    type="button"
                    onClick={closeCollabTab}
                    title="Close Collaboration tab"
                    aria-label="Close YourProject.exe tab"
                    className="w-4.5 h-4.5 rounded-md flex items-center justify-center text-teal hover:text-white bg-teal/15 hover:bg-rose-500 active:scale-90 transition-all ml-auto shrink-0 cursor-pointer"
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>

            {/* ── Fixed Right Tab Actions: '+' New Tab ── */}
            <div className="flex items-center px-1.5 py-1 shrink-0 border-l border-border bg-surface/60 backdrop-blur-md relative">
              {/* New Tab '+' Button (Opens Collab Tab) */}
              <button
                type="button"
                onClick={openCollabTab}
                title="Open New Collaboration Tab (Let's build a project!)"
                aria-label="New Project Tab"
                className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all active:scale-95 cursor-pointer ${
                  isCollabActive
                    ? "bg-teal/20 text-teal border border-teal/40 shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                    : "text-muted hover:text-purple hover:bg-purple/15 border border-transparent hover:border-purple/30"
                }`}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* ── Right: Authentic Windows Window Controls (—, □, ✕) ── */}
            <div className="flex items-center shrink-0 border-l border-border">
              {/* Minimize Button '—' (Navigates to Previous Project ←) */}
              <button
                type="button"
                onClick={prev}
                title="Minimize / Previous Project (←)"
                aria-label="Previous project (Minimize button)"
                className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink hover:bg-white/10 transition-colors cursor-pointer"
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
                className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink hover:bg-white/10 transition-colors cursor-pointer"
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

          {/* ── WINDOW CONTENT BODY (Proportional Balanced Desktop Height) ── */}
          <div className="relative overflow-hidden min-h-[385px] md:h-[385px]">
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
                  className="flex flex-col md:flex-row min-h-[385px] md:h-[385px] w-full"
                >
                  {/* Left: Interactive Simulated Terminal Workspace */}
                  <div
                    className="md:w-[48%] p-5 sm:p-6 md:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-teal/20 font-mono text-xs md:h-full"
                    style={{ background: "var(--card-dark-fill)" }}
                  >
                    <div className="space-y-2.5">
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-muted/60 text-[11px]">
                        <div className="flex items-center gap-2">
                          <Terminal size={13} className="text-teal" />
                          <span>dileepa@workspace:~</span>
                        </div>
                        <span className="text-teal/70 font-semibold">● bash (online)</span>
                      </div>

                      {/* Interactive Command Simulation with Copy */}
                      <div className="pt-1.5 space-y-2 text-ink/90">
                        <div className="text-teal font-bold flex items-center justify-between gap-2 text-[11px] sm:text-xs bg-teal/10 px-2.5 py-1.5 rounded-md border border-teal/30">
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-muted">$</span>
                            <span className="truncate">
                              npx start-collaboration --with=&quot;Dileepa&quot;
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyCommand}
                            title="Copy command"
                            className="text-teal hover:text-white transition-colors p-1 shrink-0 cursor-pointer"
                          >
                            {copiedCommand ? (
                              <Check size={12} className="text-emerald-400" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>

                        <div className="space-y-1 pl-3 border-l-2 border-teal/40 text-muted/90 text-[11px] pt-1">
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
                    <div className="pt-3 mt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-muted/50">
                      <span className="text-teal font-bold">&gt;</span>
                      <span className="text-ink/70">
                        Ready to execute new project specifications...
                      </span>
                      <span className="w-2 h-3.5 bg-teal animate-pulse" />
                    </div>
                  </div>

                  {/* Right: Invitation & Direct Contact CTA */}
                  <div className="md:w-[52%] p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-4 md:h-full">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal/10 border border-teal/30 text-teal font-mono text-[11px] font-bold">
                        <Sparkles size={12} className="text-teal" />
                        <span>COLLABORATION INITIATIVE</span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-extrabold text-ink leading-tight">
                        Ready to build a new project together?
                      </h3>

                      <p className="text-muted text-xs md:text-sm leading-relaxed">
                        Have an innovative product concept, an engineering challenge, or an open
                        developer role? Let&apos;s transform your requirements into
                        high-performance, production-ready software.
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-0.5 font-mono text-[11px] text-muted/70">
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
                          #FullStack
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
                          #SystemArchitecture
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
                          #CloudNative
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold px-5 py-2 rounded-lg border border-teal bg-teal/20 text-teal hover:bg-teal/30 hover:border-teal/80 transition-all shadow-[0_0_20px_rgba(0,212,180,0.25)] hover:scale-[1.02] active:scale-98 cursor-pointer"
                      >
                        <Send size={13} />
                        <span>Let&apos;s Talk</span>
                      </button>

                      <a
                        href={`mailto:${SOCIALS.email}`}
                        className="flex items-center gap-2 font-mono text-xs sm:text-sm font-medium px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-ink hover:text-teal hover:border-teal/40 transition-all"
                      >
                        <Mail size={13} />
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
                  className="flex flex-col md:flex-row min-h-[385px] md:h-[385px] w-full"
                >
                  {/* Left: Project Image with Lightbox Zoom */}
                  <div
                    onClick={() => project.image && setLightboxProject(project)}
                    className={`relative md:w-[54%] h-60 md:h-full shrink-0 overflow-hidden group bg-void/80 border-b md:border-b-0 md:border-r border-border flex items-center justify-center ${
                      project.image ? "cursor-zoom-in" : ""
                    }`}
                  >
                    {project.image ? (
                      <>
                        <div className="skeleton-shimmer opacity-30" />
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 700px"
                          loading="lazy"
                          className="w-full h-full object-contain md:object-cover md:object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover Zoom Overlay Badge */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface/90 backdrop-blur-md border border-purple/40 text-purple text-[11px] font-mono shadow-lg">
                          <Maximize2 size={11} />
                          <span>Zoom Preview</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple/15 via-surface/80 to-void relative overflow-hidden select-none">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple/20 via-transparent to-transparent pointer-events-none" />
                        <div className="w-14 h-14 rounded-2xl bg-purple/10 border border-purple/30 flex items-center justify-center text-purple mb-3 shadow-[0_0_30px_rgba(168,85,247,0.25)] group-hover:scale-110 transition-transform duration-300">
                          <Terminal size={28} />
                        </div>
                        <span className="font-mono text-[11px] text-purple font-semibold tracking-wider uppercase mb-1">
                          {project.technologies[0] || "Code Base"}
                        </span>
                        <h4 className="font-display text-base font-bold text-ink text-center max-w-[220px]">
                          {project.title}
                        </h4>
                      </div>
                    )}
                  </div>

                  {/* Right: Project Details & Actions */}
                  <div className="flex flex-col justify-between p-5 sm:p-6 md:p-7 flex-grow md:w-[46%] md:h-full gap-4">
                    <div className="space-y-3">
                      {/* Tech Badges with Logos */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-lg border border-purple/35 text-purple/95 bg-purple/[0.08]"
                          >
                            <TechLogo name={tech} size={12} />
                            <span className="font-semibold">{tech}</span>
                          </span>
                        ))}
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display text-xl md:text-2xl font-extrabold text-ink tracking-tight">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-lg">
                        {project.description}
                      </p>

                      {/* Hashtag Keywords */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[10px] text-muted/60">
                            #{tag.toLowerCase().replace(/[\s.]/g, "")}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                      {project.id === "portfolio" ? (
                        <div className="flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border border-purple/60 bg-purple/20 text-purple shadow-sm select-none">
                          <span className="w-2 h-2 rounded-full bg-purple shadow-[0_0_8px_#a855f7] animate-pulse" />
                          <span>This Site</span>
                        </div>
                      ) : project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${project.title}`}
                          className="flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border border-purple/60 bg-purple/20 text-purple transition-all duration-200 hover:scale-[1.03] hover:bg-purple/30 hover:border-purple/80 hover:shadow-sm"
                        >
                          <span>Live Preview</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : null}
                      {project.repo ? (
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
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── THUMBNAIL FILMSTRIP & CAROUSEL NAVIGATION ── */}
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
          <div className="flex gap-2.5 overflow-x-auto py-2 flex-1 justify-center scrollbar-none items-center">
            {PROJECTS.map((p, i) => {
              const isSelected = activeIdx === i;

              return (
                <button
                  type="button"
                  key={p.id}
                  ref={(el) => {
                    filmstripThumbRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setDirection(typeof activeIdx === "number" ? (i > activeIdx ? 1 : -1) : -1);
                    setActiveIdx(i);
                  }}
                  aria-label={`Select project: ${p.title}`}
                  className="shrink-0 rounded-lg overflow-hidden transition-all duration-200 relative group cursor-pointer"
                  style={{
                    width: 76,
                    height: 52,
                    outline: isSelected
                      ? "2px solid rgba(168,85,247,0.9)"
                      : "2px solid transparent",
                    outlineOffset: 2,
                    opacity: isSelected ? 1 : 0.45,
                    transform: isSelected ? "scale(1.06)" : "scale(1)",
                    boxShadow: isSelected ? "0 0 15px rgba(168,85,247,0.4)" : "none",
                  }}
                >
                  {p.image ? (
                    <>
                      <div className="skeleton-shimmer opacity-20" />
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="150px"
                        loading="lazy"
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#120822] to-[#080512] flex items-center justify-center p-1 text-center border border-purple/20">
                      <span className="font-mono text-[10px] font-bold text-purple/90 tracking-tighter truncate">
                        {p.title.split(" ")[0]}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Collaboration Tab Filmstrip Thumbnail */}
            <button
              type="button"
              onClick={openCollabTab}
              aria-label="Open Collaboration Tab"
              className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 relative group cursor-pointer flex flex-col items-center justify-center border ${
                isCollabActive
                  ? "border-teal bg-teal/20 text-teal shadow-[0_0_15px_rgba(20,184,166,0.5)] scale-105"
                  : "border-teal/30 bg-teal/5 text-teal/70 hover:text-teal hover:border-teal/60 opacity-60 hover:opacity-100"
              }`}
              style={{
                width: 76,
                height: 52,
              }}
            >
              <Sparkles size={14} className="mb-0.5 text-teal animate-pulse" />
              <span className="font-mono text-[9px] font-bold tracking-tight">Collab</span>
            </button>
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

      {/* ── HIGH-RESOLUTION PROJECT SCREENSHOT LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxProject && lightboxProject.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl border-2 border-purple/50 overflow-hidden shadow-2xl flex flex-col bg-[#070e1c] cursor-default"
              style={{
                boxShadow: "0 25px 80px -15px rgba(168,85,247,0.4), 0 0 30px rgba(168,85,247,0.2)",
              }}
            >
              {/* Modal Titlebar */}
              <div className="px-6 py-4 border-b border-purple/30 flex items-center justify-between bg-[#091224]/90">
                <div className="flex items-center gap-3 pr-4 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple shadow-[0_0_8px_#a855f7] shrink-0" />
                  <div className="truncate">
                    <h3 className="font-display text-base font-bold text-ink truncate">
                      {lightboxProject.title}
                    </h3>
                    <p className="font-mono text-[11px] text-purple/80 truncate">
                      {lightboxProject.technologies.join(" • ")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxProject(null)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal High-Res Screenshot Body */}
              <div
                className="relative p-4 sm:p-6 flex items-center justify-center bg-black/50 min-h-[300px] md:min-h-[420px] touch-pan-y"
                {...lightboxSwipe}
              >
                <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/40">
                  <Image
                    src={lightboxProject.image}
                    alt={lightboxProject.title}
                    width={1400}
                    height={900}
                    sizes="(max-width: 1024px) 95vw, 1200px"
                    priority
                    className="max-h-[65vh] w-auto max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="px-6 py-3.5 border-t border-purple/20 flex flex-wrap items-center justify-between gap-3 bg-[#081020]">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-muted/70">
                  {lightboxProject.tags.map((t) => (
                    <span key={t}>#{t.toLowerCase()}</span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {lightboxProject.live && (
                    <a
                      href={lightboxProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs font-bold text-purple hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {lightboxProject.repo && (
                    <a
                      href={lightboxProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-ink/80 hover:text-white hover:underline"
                    >
                      <GithubIcon style={{ width: 13, height: 13 }} />
                      <span>Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
