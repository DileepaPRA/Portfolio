"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { UNIVERSITY_IMAGES } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

const COUNT = UNIVERSITY_IMAGES.length;
const THETA = 360 / COUNT;

function getRadius(count: number) {
  const itemWidth = 260;
  return Math.round((itemWidth * count) / (2 * Math.PI) + 40);
}

export default function UniversityJourneySection() {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const velRef = useRef(0);
  const lastX = useRef(0);
  const autoRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = getRadius(COUNT);

  // Auto-rotate with momentum
  useEffect(() => {
    let last = performance.now();
    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!isDragging) {
        velRef.current = velRef.current * 0.96 + 0.25;
        setAngle((a) => a + velRef.current * dt);
      }
      autoRef.current = requestAnimationFrame(tick);
    }
    autoRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRef.current);
  }, [isDragging]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      startX.current = e.clientX;
      startAngle.current = angle;
      lastX.current = e.clientX;
      velRef.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [angle]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - startX.current;
      velRef.current = (e.clientX - lastX.current) * 0.3;
      lastX.current = e.clientX;
      setAngle(startAngle.current + delta * 0.35);
    },
    [isDragging]
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const goTo = (i: number) => {
    setAngle(-i * THETA);
    velRef.current = 0;
  };

  return (
    <section
      id="university"
      data-section="university"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#f59e0b" variant="b" icons={SECTION_ICONS.university} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
              <span className="text-ruby">#</span>university-journey
            </h2>
            <div className="h-px bg-white/10 flex-grow max-w-xs" />
          </div>
          <p className="text-muted text-sm">
            {COUNT} moments from university life — drag to explore
          </p>
        </motion.div>

        {/* 3D Carousel stage */}
        <motion.div
          className="relative select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ height: 420, perspective: 1100, cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Stage lighting */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, #060c1a 0%, rgba(6,12,26,0.6) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, #060c1a 0%, transparent 100%)",
            }}
          />

          {/* Carousel container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${angle}deg)`,
                transition: isDragging ? "none" : undefined,
                willChange: "transform",
              }}
            >
              {UNIVERSITY_IMAGES.map(({ src, caption }, i) => {
                const itemAngle = i * THETA;
                const normalizedAngle = ((angle % 360) + 360) % 360;
                const diff = Math.abs(((itemAngle - normalizedAngle + 540) % 360) - 180);
                const frontness = diff / 180;
                const opacity = 0.25 + 0.75 * (1 - frontness);

                return (
                  <div
                    key={i}
                    className="absolute transition-all duration-150"
                    style={{
                      width: 250,
                      height: 168,
                      left: -125,
                      top: -84,
                      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                      opacity,
                      transformStyle: "preserve-3d",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => goTo(i)}
                  >
                    <div
                      className="w-full h-full overflow-hidden relative"
                      style={{
                        borderRadius: 14,
                        border: `1.5px solid ${
                          hovered === i ? "rgba(224,17,95,0.6)" : "rgba(255,255,255,0.08)"
                        }`,
                        boxShadow:
                          hovered === i
                            ? "0 0 30px rgba(224,17,95,0.35), 0 8px 32px rgba(0,0,0,0.6)"
                            : "0 4px 24px rgba(0,0,0,0.5)",
                        transform: hovered === i ? "scale(1.06)" : "scale(1)",
                        transition:
                          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                        background: "#111827",
                      }}
                    >
                      <img
                        src={src}
                        alt={caption}
                        draggable={false}
                        className="w-full h-full object-cover"
                        style={{
                          filter: hovered === i ? "none" : "grayscale(20%) brightness(0.85)",
                          transition: "filter 0.3s ease",
                          pointerEvents: "none",
                        }}
                      />
                      {/* Caption overlay */}
                      <div
                        className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-end"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                          opacity: hovered === i ? 1 : 0,
                          transition: "opacity 0.25s ease",
                        }}
                      >
                        <span className="font-mono text-[10px] text-white/90 tracking-wider">
                          {caption}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floor reflection */}
          <div
            className="absolute bottom-4 inset-x-0 h-12 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(224,17,95,0.4) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-1.5 mt-5 flex-wrap max-w-sm mx-auto">
          {UNIVERSITY_IMAGES.map(({ caption }, i) => {
            const normalizedAngle = ((-angle % 360) + 360) % 360;
            const diff = Math.abs(((i * THETA - normalizedAngle + 540) % 360) - 180);
            const isActive = diff < THETA / 2;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${caption}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 18 : 5,
                  height: 5,
                  background: isActive ? "#e0115f" : "rgba(255,255,255,0.15)",
                }}
              />
            );
          })}
        </div>

        {/* Caption row */}
        <motion.div
          className="mt-5 grid grid-cols-3 md:grid-cols-6 gap-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {UNIVERSITY_IMAGES.slice(0, 6).map(({ caption }, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View photo: ${caption}`}
              className="glass text-center py-2 px-1 hover:border-ruby/25 transition-colors"
            >
              <p className="font-mono text-[9px] text-muted/70 tracking-wide">{caption}</p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
