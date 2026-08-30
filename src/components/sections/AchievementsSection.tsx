"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Image as ImageIcon,
  Repeat,
} from "lucide-react";
import { AWARDS, CERTIFICATIONS, SECTION_COLORS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

// ── Interactive Bidirectional Pointer Conduit Between Nodes ──
function PointerBridge({
  isHighlighted,
  onForwardClick,
  onReverseClick,
}: {
  isHighlighted: boolean;
  onForwardClick: () => void;
  onReverseClick: () => void;
}) {
  const [hoveredDir, setHoveredDir] = useState<"next" | "prev" | null>(null);

  const forwardActive = hoveredDir === "next" || isHighlighted;
  const reverseActive = hoveredDir === "prev" || isHighlighted;

  return (
    <div className="shrink-0 flex flex-col items-center justify-center w-8 sm:w-12 h-full my-auto select-none px-0.5 z-10">
      <div className="w-full relative flex flex-col items-center gap-3 py-4">
        {/* Forward Pointer (*next ──▶) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onForwardClick();
          }}
          onMouseEnter={() => setHoveredDir("next")}
          onMouseLeave={() => setHoveredDir(null)}
          title="Circular Next: curr = curr->next"
          aria-label="Traverse next node"
          className="w-full flex items-center justify-center cursor-pointer py-1 group/next"
        >
          <svg
            className="w-full h-3 overflow-visible"
            viewBox="0 0 48 12"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="6"
              x2="41"
              y2="6"
              stroke={forwardActive ? "#f59e0b" : "rgba(245, 158, 11, 0.35)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
              style={
                forwardActive ? { filter: "drop-shadow(0 0 6px rgba(245,158,11,0.85))" } : undefined
              }
            />
            <polygon
              points="40,1.5 48,6 40,10.5"
              fill={forwardActive ? "#f59e0b" : "rgba(245, 158, 11, 0.35)"}
              className="transition-colors duration-300"
              style={
                forwardActive ? { filter: "drop-shadow(0 0 6px rgba(245,158,11,0.85))" } : undefined
              }
            />
          </svg>
        </button>

        {/* Reverse Pointer (◀── *prev) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReverseClick();
          }}
          onMouseEnter={() => setHoveredDir("prev")}
          onMouseLeave={() => setHoveredDir(null)}
          title="Circular Prev: curr = curr->prev"
          aria-label="Traverse previous node"
          className="w-full flex items-center justify-center cursor-pointer py-1 group/prev"
        >
          <svg
            className="w-full h-3 overflow-visible"
            viewBox="0 0 48 12"
            preserveAspectRatio="none"
          >
            <line
              x1="7"
              y1="6"
              x2="48"
              y2="6"
              stroke={reverseActive ? "#f59e0b" : "rgba(245, 158, 11, 0.35)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
              style={
                reverseActive ? { filter: "drop-shadow(0 0 6px rgba(245,158,11,0.85))" } : undefined
              }
            />
            <polygon
              points="8,1.5 0,6 8,10.5"
              fill={reverseActive ? "#f59e0b" : "rgba(245, 158, 11, 0.35)"}
              className="transition-colors duration-300"
              style={
                reverseActive ? { filter: "drop-shadow(0 0 6px rgba(245,158,11,0.85))" } : undefined
              }
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Optimized buffer multiplier for seamless infinite continuous conveyor with minimal DOM weight
const REPEAT_FACTOR = 5;

export default function AchievementsSection() {
  const repeatedAwards = Array.from({ length: REPEAT_FACTOR }, () => AWARDS).flat();
  const repeatedCerts = Array.from({ length: REPEAT_FACTOR }, () => CERTIFICATIONS).flat();

  // Anchor in the central buffer zone
  const awardMiddleOffset = AWARDS.length * 2;
  const certMiddleOffset = CERTIFICATIONS.length * 2;

  const [awardIndex, setAwardIndex] = useState<number>(awardMiddleOffset);
  const [certIndex, setCertIndex] = useState<number>(certMiddleOffset);
  const [awardNoTransition, setAwardNoTransition] = useState<boolean>(false);
  const [certNoTransition, setCertNoTransition] = useState<boolean>(false);

  const [awardStepW, setAwardStepW] = useState<number>(380);
  const [certStepW, setCertStepW] = useState<number>(290);

  const [hoveredAward, setHoveredAward] = useState<number | null>(null);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  const awardContainerRef = useRef<HTMLDivElement>(null);
  const certContainerRef = useRef<HTMLDivElement>(null);
  const awardFirstCardRef = useRef<HTMLDivElement>(null);
  const certFirstCardRef = useRef<HTMLDivElement>(null);

  // Sub-pixel exact step measurement for 100% boundary symmetry
  const measureSteps = useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (awardContainerRef.current) {
      const containerWidth = awardContainerRef.current.getBoundingClientRect().width;
      const bridgeW = w >= 640 ? 48 : 32;
      const itemsPerView = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      if (itemsPerView === 1) {
        setAwardStepW(containerWidth + bridgeW);
      } else {
        const measuredStep = (containerWidth + bridgeW) / itemsPerView;
        setAwardStepW(measuredStep);
      }
    }
    if (certContainerRef.current) {
      const containerWidth = certContainerRef.current.getBoundingClientRect().width;
      const bridgeW = w >= 640 ? 48 : 32;
      const itemsPerView = w >= 1024 ? 4 : w >= 640 ? 2 : 1;
      if (itemsPerView === 1) {
        setCertStepW(containerWidth + bridgeW);
      } else {
        const measuredStep = (containerWidth + bridgeW) / itemsPerView;
        setCertStepW(measuredStep);
      }
    }
  }, []);

  useEffect(() => {
    measureSteps();
    const handleResize = () => measureSteps();
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(() => measureSteps());
    if (awardContainerRef.current) ro.observe(awardContainerRef.current);
    if (certContainerRef.current) ro.observe(certContainerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, [measureSteps]);

  // Seamless silent index recentering on transition end (never reaches bounds)
  const handleAwardTransitionEnd = () => {
    if (awardIndex >= AWARDS.length * 3.5 || awardIndex <= AWARDS.length * 0.5) {
      const normIndex = ((awardIndex % AWARDS.length) + AWARDS.length) % AWARDS.length;
      setAwardNoTransition(true);
      setAwardIndex(awardMiddleOffset + normIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAwardNoTransition(false);
        });
      });
    }
  };

  const handleCertTransitionEnd = () => {
    if (certIndex >= CERTIFICATIONS.length * 3.5 || certIndex <= CERTIFICATIONS.length * 0.5) {
      const normIndex =
        ((certIndex % CERTIFICATIONS.length) + CERTIFICATIONS.length) % CERTIFICATIONS.length;
      setCertNoTransition(true);
      setCertIndex(certMiddleOffset + normIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCertNoTransition(false);
        });
      });
    }
  };

  const [isAwardPaused, setIsAwardPaused] = useState(false);
  const [isCertPaused, setIsCertPaused] = useState(false);

  // Continuous auto-flow (pauses on hover)
  useEffect(() => {
    if (isAwardPaused) return;
    const interval = setInterval(() => {
      setAwardIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAwardPaused]);

  useEffect(() => {
    if (isCertPaused) return;
    const interval = setInterval(() => {
      setCertIndex((prev) => prev + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, [isCertPaused]);

  // Navigation handlers
  const nextAward = () => setAwardIndex((prev) => prev + 1);
  const prevAward = () => setAwardIndex((prev) => prev - 1);

  const nextCert = () => setCertIndex((prev) => prev + 1);
  const prevCert = () => setCertIndex((prev) => prev - 1);

  const activeAwardDot = ((awardIndex % AWARDS.length) + AWARDS.length) % AWARDS.length;
  const activeCertDot =
    ((certIndex % CERTIFICATIONS.length) + CERTIFICATIONS.length) % CERTIFICATIONS.length;

  return (
    <section
      id="achievements"
      data-section="achievements"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient
        color={SECTION_COLORS.achievements}
        variant="c"
        icons={SECTION_ICONS.achievements}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-14 space-y-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink flex items-center gap-3">
              <span className="text-amber font-mono">#</span>achievements
            </h2>
            <div className="h-px bg-white/10 flex-grow max-w-xs" />
          </div>
          <p className="text-muted text-sm">
            Verified recognitions, competitive hackathons, and certifications.
          </p>
        </motion.div>

        {/* ── 1. AWARDS & HONORS: ENDLESS CONVEYOR LOOP (3 VISIBLE ON DESKTOP) ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Trophy size={22} className="text-amber" />
            <h3 className="font-display text-xl font-bold text-ink">Awards & Honors</h3>
          </div>

          {/* Carousel Viewport Container */}
          <div
            className="relative group/carousel"
            onMouseEnter={() => setIsAwardPaused(true)}
            onMouseLeave={() => setIsAwardPaused(false)}
          >
            {/* Floating Left Looping Carousel Button */}
            <button
              type="button"
              onClick={prevAward}
              aria-label="Previous award"
              title="Circular Prev: curr = curr->prev"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Floating Right Looping Carousel Button */}
            <button
              type="button"
              onClick={nextAward}
              aria-label="Next award"
              title="Circular Next: curr = curr->next"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>

            {/* Overflow Mask Container */}
            <div ref={awardContainerRef} className="w-full overflow-hidden pb-4 pt-1 rounded-2xl">
              {/* Continuous Sliding Ribbon Track */}
              <div
                onTransitionEnd={handleAwardTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translate3d(-${awardIndex * awardStepW}px, 0, 0)`,
                  transition: awardNoTransition
                    ? "none"
                    : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {repeatedAwards.map((award, i) => {
                  const origIdx = i % AWARDS.length;
                  const isHovered = hoveredAward === i;
                  const isBridgeHighlighted =
                    hoveredAward !== null && (hoveredAward === i || hoveredAward === i - 1);

                  const nodeAddr = `0x${(0x7fa0 + origIdx * 0x18).toString(16).toUpperCase()}`;
                  const prevOrigIdx = (origIdx - 1 + AWARDS.length) % AWARDS.length;
                  const nextOrigIdx = (origIdx + 1) % AWARDS.length;
                  const prevAddr = `0x${(0x7fa0 + prevOrigIdx * 0x18).toString(16).toUpperCase()}`;
                  const nextAddr = `0x${(0x7fa0 + nextOrigIdx * 0x18).toString(16).toUpperCase()}`;

                  return (
                    <React.Fragment key={`${award.id}-rep-${i}`}>
                      {/* Inter-Node Pointer Bridge Conduit */}
                      {i > 0 && (
                        <PointerBridge
                          isHighlighted={isBridgeHighlighted}
                          onForwardClick={nextAward}
                          onReverseClick={prevAward}
                        />
                      )}

                      {/* Card Element */}
                      <div
                        ref={i === 0 ? awardFirstCardRef : null}
                        className="shrink-0 w-full sm:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-6rem)/3)] group"
                        onMouseEnter={() => setHoveredAward(i)}
                        onMouseLeave={() => setHoveredAward(null)}
                      >
                        <div
                          className={`glass p-5 flex flex-col justify-between h-full rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                            isHovered
                              ? "border-amber/60 shadow-[0_10px_35px_rgba(245,158,11,0.22)] -translate-y-1"
                              : "border-white/10 hover:border-amber/30"
                          }`}
                        >
                          {/* Top Memory Node Header (Circular Pointer Links) */}
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.08] font-mono text-[10px]">
                            <div className="flex items-center gap-1.5 text-amber font-bold">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isHovered ? "bg-amber shadow-[0_0_8px_#f59e0b]" : "bg-amber/60"
                                }`}
                              />
                              <span>NODE[{nodeAddr}]</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-muted font-mono">
                              <span className="text-dim">◄</span>
                              <span className="text-amber/80 font-bold">{prevAddr}</span>
                              <span className="text-dim">⇄</span>
                              <span className="text-amber/80 font-bold">{nextAddr}</span>
                              <span className="text-dim">►</span>
                            </div>
                          </div>

                          {/* Photo Slot */}
                          <div
                            className="w-full h-36 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden shrink-0 mb-4"
                            style={{ background: "rgba(245, 158, 11, 0.05)" }}
                          >
                            {award.image ? (
                              <img
                                src={award.image}
                                alt={award.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-1.5 text-dim">
                                <ImageIcon size={24} />
                                <span className="font-mono text-[9px] tracking-widest text-dim/80">
                                  ADD PHOTO
                                </span>
                              </div>
                            )}
                            <div className="scan-line opacity-20" />
                          </div>

                          {/* Content */}
                          <div>
                            <h4 className="font-display text-base font-bold text-ink group-hover:text-amber transition-colors leading-snug mb-1.5">
                              {award.title}
                            </h4>
                            <p className="font-mono text-[10px] text-amber font-bold tracking-widest uppercase mb-1">
                              {award.type}
                            </p>
                            <p className="text-muted text-xs mb-1">{award.org}</p>
                            {award.note && (
                              <p className="text-dim text-[11px] font-mono mb-2">{award.note}</p>
                            )}
                          </div>

                          {/* Footer Link */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                            <span className="font-mono text-[10px] text-dim">{award.year}</span>
                            <a
                              href={award.cert}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-amber transition-colors"
                            >
                              View Certificate
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Award Dot Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {AWARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Jump to award node ${i + 1}`}
                onClick={() => {
                  const targetDiff = i - activeAwardDot;
                  setAwardIndex((prev) => prev + targetDiff);
                }}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === activeAwardDot ? 22 : 6,
                  height: 6,
                  background: i === activeAwardDot ? "#f59e0b" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── 2. CREDENTIALS & CERTIFICATIONS: ENDLESS CONVEYOR LOOP (4 VISIBLE ON DESKTOP) ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BadgeCheck size={22} className="text-amber" />
            <h3 className="font-display text-xl font-bold text-ink">
              Credentials & Certifications
            </h3>
          </div>

          {/* Carousel Viewport Container */}
          <div
            className="relative group/carousel"
            onMouseEnter={() => setIsCertPaused(true)}
            onMouseLeave={() => setIsCertPaused(false)}
          >
            {/* Floating Left Looping Carousel Button */}
            <button
              type="button"
              onClick={prevCert}
              aria-label="Previous certification"
              title="Circular Prev: curr = curr->prev"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Floating Right Looping Carousel Button */}
            <button
              type="button"
              onClick={nextCert}
              aria-label="Next certification"
              title="Circular Next: curr = curr->next"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>

            {/* Overflow Mask Container */}
            <div ref={certContainerRef} className="w-full overflow-hidden pb-4 pt-1 rounded-2xl">
              {/* Continuous Sliding Ribbon Track */}
              <div
                onTransitionEnd={handleCertTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translate3d(-${certIndex * certStepW}px, 0, 0)`,
                  transition: certNoTransition
                    ? "none"
                    : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {repeatedCerts.map((cert, i) => {
                  const origIdx = i % CERTIFICATIONS.length;
                  const isHovered = hoveredCert === i;
                  const isBridgeHighlighted =
                    hoveredCert !== null && (hoveredCert === i || hoveredCert === i - 1);

                  const nodeAddr = `0x${(0x8100 + origIdx * 0x10).toString(16).toUpperCase()}`;
                  const prevOrigIdx = (origIdx - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length;
                  const nextOrigIdx = (origIdx + 1) % CERTIFICATIONS.length;
                  const prevAddr = `0x${(0x8100 + prevOrigIdx * 0x10).toString(16).toUpperCase()}`;
                  const nextAddr = `0x${(0x8100 + nextOrigIdx * 0x10).toString(16).toUpperCase()}`;

                  return (
                    <React.Fragment key={`${cert.id}-rep-${i}`}>
                      {/* Inter-Node Pointer Bridge Conduit */}
                      {i > 0 && (
                        <PointerBridge
                          isHighlighted={isBridgeHighlighted}
                          onForwardClick={nextCert}
                          onReverseClick={prevCert}
                        />
                      )}

                      <div
                        ref={i === 0 ? certFirstCardRef : null}
                        className="shrink-0 w-full sm:w-[calc((100%-3rem)/2)] md:w-[calc((100%-6rem)/3)] lg:w-[calc((100%-9rem)/4)] group"
                        onMouseEnter={() => setHoveredCert(i)}
                        onMouseLeave={() => setHoveredCert(null)}
                      >
                        <div
                          className={`glass p-5 flex flex-col justify-between h-full rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                            isHovered
                              ? "border-amber/60 shadow-[0_10px_35px_rgba(245,158,11,0.22)] -translate-y-1"
                              : "border-white/10 hover:border-amber/30"
                          }`}
                        >
                          {/* Top Node Header */}
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08] font-mono text-[9px]">
                            <span className="flex items-center gap-1 text-amber font-bold">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isHovered ? "bg-amber shadow-[0_0_8px_#f59e0b]" : "bg-amber/60"
                                }`}
                              />
                              {nodeAddr}
                            </span>
                            <span className="text-dim tracking-tight">
                              <span className="text-amber/80 font-bold">{prevAddr}</span> ⇄{" "}
                              <span className="text-amber/80 font-bold">{nextAddr}</span>
                            </span>
                          </div>

                          {/* Logo Slot */}
                          <div>
                            <div
                              className="w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden mb-3"
                              style={{ background: "rgba(245, 158, 11, 0.06)" }}
                            >
                              {cert.image ? (
                                <img
                                  src={cert.image}
                                  alt={cert.issuer}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <ImageIcon size={18} className="text-dim" />
                              )}
                              <div className="scan-line opacity-15" />
                            </div>

                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] text-muted truncate pr-1">
                                {cert.issuer}
                              </span>
                              <BadgeCheck
                                size={12}
                                className="text-dim group-hover:text-amber transition-colors shrink-0"
                              />
                            </div>
                            <h4 className="font-display text-sm font-bold text-ink leading-snug mb-1">
                              {cert.title}
                            </h4>
                            <p className="font-mono text-[10px] text-dim">{cert.year}</p>
                          </div>

                          <a
                            href={cert.cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono text-[11px] text-amber hover:underline w-fit transition-all pt-3 mt-1"
                          >
                            Verify
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cert Dot Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {CERTIFICATIONS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Jump to cert node ${i + 1}`}
                onClick={() => {
                  const targetDiff = i - activeCertDot;
                  setCertIndex((prev) => prev + targetDiff);
                }}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === activeCertDot ? 22 : 6,
                  height: 6,
                  background: i === activeCertDot ? "#f59e0b" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Bottom-right Corner Telemetry Tag */}
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-2 font-mono text-xs text-muted border border-amber/20 bg-surface/70 px-3.5 py-1.5 rounded-xl shadow-lg">
              <Repeat
                size={13}
                className="text-amber animate-spin"
                style={{ animationDuration: "12s" }}
              />
              <span className="text-ink font-bold">CircularDoublyLinkedList</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
