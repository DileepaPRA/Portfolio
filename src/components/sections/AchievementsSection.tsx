"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Image as ImageIcon,
  Repeat,
  X,
  ZoomIn,
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
    <div className="w-full h-full flex flex-col items-center justify-center select-none px-0.5 z-10">
      <div className="w-full relative flex flex-col items-center justify-center gap-3.5">
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

// 3x Buffer: Left Set (0), Center Set (1), Right Set (2) for 100% unidirectional continuous sliding
const BUFFER_SETS = 3;

export default function AchievementsSection() {
  const repeatedAwards = Array.from({ length: BUFFER_SETS }, () => AWARDS).flat();
  const repeatedCerts = Array.from({ length: BUFFER_SETS }, () => CERTIFICATIONS).flat();

  const awardBaseOffset = AWARDS.length;
  const certBaseOffset = CERTIFICATIONS.length;

  const [awardIndex, setAwardIndex] = useState<number>(awardBaseOffset);
  const [certIndex, setCertIndex] = useState<number>(certBaseOffset);

  const [awardNoTransition, setAwardNoTransition] = useState<boolean>(false);
  const [certNoTransition, setCertNoTransition] = useState<boolean>(false);

  const [awardStepW, setAwardStepW] = useState<number>(380);
  const [certStepW, setCertStepW] = useState<number>(290);
  const [awardCardW, setAwardCardW] = useState<number>(332);
  const [certCardW, setCertCardW] = useState<number>(242);
  const [bridgeW, setBridgeW] = useState<number>(48);

  const [hoveredAward, setHoveredAward] = useState<number | null>(null);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    title: string;
    subtitle?: string;
    cert?: string;
  } | null>(null);

  const awardContainerRef = useRef<HTMLDivElement>(null);
  const certContainerRef = useRef<HTMLDivElement>(null);

  // Sub-pixel exact step measurement for 100% boundary symmetry
  const measureSteps = useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const bridge = w >= 640 ? 48 : 32;
    setBridgeW(bridge);

    if (awardContainerRef.current) {
      const containerWidth = awardContainerRef.current.getBoundingClientRect().width;
      const itemsPerView = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      if (itemsPerView === 1) {
        setAwardStepW(containerWidth + bridge);
        setAwardCardW(containerWidth);
      } else {
        const step = (containerWidth + bridge) / itemsPerView;
        setAwardStepW(step);
        setAwardCardW(step - bridge);
      }
    }

    if (certContainerRef.current) {
      const containerWidth = certContainerRef.current.getBoundingClientRect().width;
      const itemsPerView = w >= 1024 ? 4 : w >= 640 ? 2 : 1;
      if (itemsPerView === 1) {
        setCertStepW(containerWidth + bridge);
        setCertCardW(containerWidth);
      } else {
        const step = (containerWidth + bridge) / itemsPerView;
        setCertStepW(step);
        setCertCardW(step - bridge);
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

  // Seamless invisible silent recentering on transition end (never hits buffer boundaries)
  const handleAwardTransitionEnd = () => {
    if (awardIndex >= AWARDS.length * 2 || awardIndex < AWARDS.length) {
      const normalized = ((awardIndex % AWARDS.length) + AWARDS.length) % AWARDS.length;
      setAwardNoTransition(true);
      setAwardIndex(awardBaseOffset + normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAwardNoTransition(false);
        });
      });
    }
  };

  const handleCertTransitionEnd = () => {
    if (certIndex >= CERTIFICATIONS.length * 2 || certIndex < CERTIFICATIONS.length) {
      const normalized =
        ((certIndex % CERTIFICATIONS.length) + CERTIFICATIONS.length) % CERTIFICATIONS.length;
      setCertNoTransition(true);
      setCertIndex(certBaseOffset + normalized);
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

  const numAwards = AWARDS.length;
  const numCerts = CERTIFICATIONS.length;

  const activeAwardDot = ((awardIndex % numAwards) + numAwards) % numAwards;
  const activeCertDot = ((certIndex % numCerts) + numCerts) % numCerts;

  return (
    <section
      id="achievements"
      data-section="achievements"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient
        color={SECTION_COLORS.achievements}
        variant="d"
        icons={SECTION_ICONS.achievements}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink flex items-center gap-3">
            <span className="text-amber font-mono">#</span>achievements-and-certifications
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </div>
        <p className="text-muted text-sm mb-12">
          Recognitions, hackathons, academic excellence, and technical credentials.
        </p>

        {/* ── 1. AWARDS & HONORS ── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber" />
              <h3 className="font-mono text-sm font-bold text-ink uppercase tracking-wider">
                Honors & Recognitions
              </h3>
            </div>

            {/* Manual navigation arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevAward}
                aria-label="Previous award"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-amber hover:border-amber/40 hover:bg-amber/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextAward}
                aria-label="Next award"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-amber hover:border-amber/40 hover:bg-amber/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Awards Carousel Stage */}
          <div
            className="relative"
            onMouseEnter={() => setIsAwardPaused(true)}
            onMouseLeave={() => setIsAwardPaused(false)}
          >
            {/* Floating Left Carousel Button */}
            <button
              type="button"
              onClick={prevAward}
              aria-label="Previous award"
              title="Circular Prev: curr = curr->prev"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Floating Right Carousel Button */}
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
              {/* Continuous Sliding Ribbon Track (100% Unidirectional Smooth Sliding) */}
              <div
                onTransitionEnd={handleAwardTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translate3d(-${awardIndex * awardStepW}px, 0, 0)`,
                  transition: awardNoTransition
                    ? "none"
                    : "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {repeatedAwards.map((award, i) => {
                  const origIdx = i % numAwards;
                  const isHovered = hoveredAward === i;
                  const isBridgeHighlighted =
                    hoveredAward !== null && (hoveredAward === i || hoveredAward === i - 1);

                  const nodeAddr = `0x${(0x7fa0 + origIdx * 0x18).toString(16).toUpperCase()}`;
                  const prevOrigIdx = (origIdx - 1 + numAwards) % numAwards;
                  const nextOrigIdx = (origIdx + 1) % numAwards;
                  const prevAddr = `0x${(0x7fa0 + prevOrigIdx * 0x18).toString(16).toUpperCase()}`;
                  const nextAddr = `0x${(0x7fa0 + nextOrigIdx * 0x18).toString(16).toUpperCase()}`;

                  return (
                    <React.Fragment key={`${award.id}-pos-${i}`}>
                      {/* Inter-Node Pointer Bridge Conduit */}
                      {i > 0 && (
                        <div
                          style={{ width: `${bridgeW}px` }}
                          className="shrink-0 self-stretch flex flex-col justify-center items-center"
                        >
                          <PointerBridge
                            isHighlighted={isBridgeHighlighted}
                            onForwardClick={nextAward}
                            onReverseClick={prevAward}
                          />
                        </div>
                      )}

                      {/* Award Card Item */}
                      <div
                        style={{ width: `${awardCardW}px` }}
                        className="shrink-0 h-full group"
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
                          {/* Top Memory Node Header */}
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

                          {/* Photo Slot (Click to Expand Modal) */}
                          <div
                            onClick={() => {
                              if (award.image) {
                                setSelectedPhoto({
                                  src: award.image,
                                  title: award.title,
                                  subtitle: `${award.type} • ${award.org} (${award.year})`,
                                  cert: award.cert,
                                });
                              }
                            }}
                            role={award.image ? "button" : undefined}
                            tabIndex={award.image ? 0 : undefined}
                            title={award.image ? "Click to expand photo" : undefined}
                            className={`w-full h-36 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden shrink-0 mb-4 transition-all duration-300 ${
                              award.image
                                ? "cursor-pointer hover:border-amber/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] group/photo"
                                : ""
                            }`}
                            style={{ background: "rgba(245, 158, 11, 0.05)" }}
                          >
                            {award.image ? (
                              <>
                                <div className="skeleton-shimmer opacity-30" />
                                <Image
                                  src={award.image}
                                  alt={award.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                                  loading="lazy"
                                  className="object-cover transition-transform duration-300 group-hover/photo:scale-105"
                                />
                                {/* Zoom Icon Overlay on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                                  <div className="p-2 rounded-full bg-amber/20 border border-amber/60 text-amber shadow-lg">
                                    <ZoomIn size={18} />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5 text-dim">
                                <ImageIcon size={24} />
                                <span className="font-mono text-[9px] tracking-widest text-dim/80">
                                  ADD PHOTO
                                </span>
                              </div>
                            )}
                            <div className="scan-line opacity-20 pointer-events-none" />
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
                  width: i === activeAwardDot ? 24 : 6,
                  height: 6,
                  background: i === activeAwardDot ? "#f59e0b" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── 2. PROFESSIONAL CERTIFICATIONS ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-amber" />
              <h3 className="font-mono text-sm font-bold text-ink uppercase tracking-wider">
                Certifications & Credentials
              </h3>
            </div>

            {/* Manual navigation arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevCert}
                aria-label="Previous certification"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-amber hover:border-amber/40 hover:bg-amber/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextCert}
                aria-label="Next certification"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-amber hover:border-amber/40 hover:bg-amber/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Certifications Carousel Stage */}
          <div
            className="relative"
            onMouseEnter={() => setIsCertPaused(true)}
            onMouseLeave={() => setIsCertPaused(false)}
          >
            {/* Floating Left Carousel Button */}
            <button
              type="button"
              onClick={prevCert}
              aria-label="Previous certification"
              title="Circular Prev: curr = curr->prev"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass border border-amber/30 flex items-center justify-center text-ink hover:text-amber hover:border-amber hover:bg-amber/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Floating Right Carousel Button */}
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
              {/* Continuous Sliding Ribbon Track (100% Unidirectional Smooth Sliding) */}
              <div
                onTransitionEnd={handleCertTransitionEnd}
                className="flex items-stretch will-change-transform"
                style={{
                  transform: `translate3d(-${certIndex * certStepW}px, 0, 0)`,
                  transition: certNoTransition
                    ? "none"
                    : "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {repeatedCerts.map((cert, i) => {
                  const origIdx = i % numCerts;
                  const isHovered = hoveredCert === i;
                  const isBridgeHighlighted =
                    hoveredCert !== null && (hoveredCert === i || hoveredCert === i - 1);

                  const nodeAddr = `0x${(0x8100 + origIdx * 0x10).toString(16).toUpperCase()}`;
                  const prevOrigIdx = (origIdx - 1 + numCerts) % numCerts;
                  const nextOrigIdx = (origIdx + 1) % numCerts;
                  const prevAddr = `0x${(0x8100 + prevOrigIdx * 0x10).toString(16).toUpperCase()}`;
                  const nextAddr = `0x${(0x8100 + nextOrigIdx * 0x10).toString(16).toUpperCase()}`;

                  return (
                    <React.Fragment key={`${cert.id}-pos-${i}`}>
                      {/* Inter-Node Pointer Bridge Conduit */}
                      {i > 0 && (
                        <div
                          style={{ width: `${bridgeW}px` }}
                          className="shrink-0 self-stretch flex flex-col justify-center items-center"
                        >
                          <PointerBridge
                            isHighlighted={isBridgeHighlighted}
                            onForwardClick={nextCert}
                            onReverseClick={prevCert}
                          />
                        </div>
                      )}

                      <div
                        style={{ width: `${certCardW}px` }}
                        className="shrink-0 h-full group"
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
                            {/* Logo Slot (Click to Expand Modal) */}
                            <div
                              onClick={() => {
                                if (cert.image) {
                                  setSelectedPhoto({
                                    src: cert.image,
                                    title: cert.title,
                                    subtitle: `${cert.issuer} (${cert.year})`,
                                    cert: cert.cert,
                                  });
                                }
                              }}
                              role={cert.image ? "button" : undefined}
                              tabIndex={cert.image ? 0 : undefined}
                              title={cert.image ? "Click to view credential badge" : undefined}
                              className={`w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden mb-3 transition-all duration-300 ${
                                cert.image
                                  ? "cursor-pointer hover:border-amber/60 hover:scale-105 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                                  : ""
                              }`}
                              style={{ background: "rgba(245, 158, 11, 0.06)" }}
                            >
                              {cert.image ? (
                                <>
                                  <div className="skeleton-shimmer opacity-20" />
                                  <Image
                                    src={cert.image}
                                    alt={cert.issuer}
                                    fill
                                    sizes="96px"
                                    loading="lazy"
                                    className="object-contain p-1"
                                  />
                                </>
                              ) : (
                                <ImageIcon size={18} className="text-dim" />
                              )}
                              <div className="scan-line opacity-15 pointer-events-none" />
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

      {/* ── HIGH-RES ACHIEVEMENT / CREDENTIAL LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl border-2 border-amber/50 overflow-hidden shadow-2xl flex flex-col"
              style={{
                background:
                  "linear-gradient(150deg, rgba(25,18,8,0.98) 0%, rgba(6,10,22,0.99) 100%)",
                boxShadow: "0 25px 80px -15px rgba(245,158,11,0.5), 0 0 30px rgba(245,158,11,0.25)",
              }}
            >
              {/* Modal Titlebar */}
              <div
                className="px-6 py-4 border-b border-amber/30 flex items-center justify-between"
                style={{ background: "rgba(16, 12, 6, 0.9)" }}
              >
                <div className="flex items-center gap-3 pr-4 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_8px_#f59e0b] shrink-0" />
                  <div className="truncate">
                    <h3 className="font-display text-base font-bold text-ink truncate">
                      {selectedPhoto.title}
                    </h3>
                    {selectedPhoto.subtitle && (
                      <p className="font-mono text-[11px] text-amber/80 truncate">
                        {selectedPhoto.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Full-Res Photo Body */}
              <div className="relative p-4 sm:p-8 flex items-center justify-center bg-black/60 min-h-[300px] md:min-h-[420px]">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/40">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 95vw, 1000px"
                    priority
                    className="max-h-[65vh] w-auto max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Modal Footer Link */}
              {selectedPhoto.cert && (
                <div
                  className="px-6 py-3 border-t border-amber/20 flex items-center justify-between"
                  style={{ background: "rgba(16, 12, 6, 0.8)" }}
                >
                  <span className="font-mono text-[11px] text-dim">VERIFIED CREDENTIAL</span>
                  <a
                    href={selectedPhoto.cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-amber hover:underline transition-colors"
                  >
                    <span>View Verification</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
