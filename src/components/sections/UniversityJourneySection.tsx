"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, RotateCcw, Sparkles, ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import { UNIVERSITY_IMAGES, SECTION_COLORS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

// ── 3D Sphere Projected Node Interface with 3D Spatial Physics ──
interface ProjectedPhoto {
  id: string;
  index: number;
  src: string;
  caption?: string;
  locLabel: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  alpha: number;
  tiltX: number;
  tiltY: number;
  sheenPos: number;
  brightness: number;
  blurAmount: string;
}

// ── Subtle 3D Orbital Floating Data Bits ──
const ORBITAL_DATA_BITS = [
  { text: "UoM", lat: 0.15, lon: 0.4, distMult: 1.15 },
  { text: "FIT", lat: -0.45, lon: 1.2, distMult: 1.12 },
  { text: "UoM", lat: 0.52, lon: 2.1, distMult: 1.18 },
  { text: "FIT", lat: -0.22, lon: 2.85, distMult: 1.14 },
  { text: "UOM", lat: 0.38, lon: 3.65, distMult: 1.16 },
  { text: "FIT", lat: -0.58, lon: 4.45, distMult: 1.13 },
  { text: "UoM", lat: 0.18, lon: 5.15, distMult: 1.17 },
];

export default function UniversityJourneySection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rotation angles (Euler angles in radians)
  const rotX = useRef<number>(0.15);
  const rotY = useRef<number>(0);
  const velX = useRef<number>(0);
  const velY = useRef<number>(0.0032); // Continuous gentle auto-spin

  // Drag interaction refs
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const animFrameRef = useRef<number>(0);

  // 3D Projected nodes state for HTML cards
  const [projectedNodes, setProjectedNodes] = useState<ProjectedPhoto[]>([]);

  const total = UNIVERSITY_IMAGES.length;

  // ── Calculate 3D sphere positions using Fibonacci Sphere Distribution with Tangent Normal Physics ──
  const update3DPositions = useCallback(
    (sphereRadius: number, centerX: number, centerY: number) => {
      const rx = rotX.current;
      const ry = rotY.current;

      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);
      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);

      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      const projected: ProjectedPhoto[] = UNIVERSITY_IMAGES.map((imgData, index) => {
        // Fibonacci Sphere Distribution (evenly distributes N points on a 3D sphere)
        const theta = 2 * Math.PI * index * (1 - 1 / goldenRatio);
        const phi = Math.acos(1 - (2 * (index + 0.5)) / total);

        const lat = Math.PI / 2 - phi;
        const lon = theta % (2 * Math.PI);

        // Spherical to Cartesian Coordinates (unit sphere)
        const uX = Math.cos(lat) * Math.sin(lon);
        const uY = Math.sin(lat);
        const uZ = Math.cos(lat) * Math.cos(lon);

        // Rotate around Y-axis
        const x1 = uX * cosRy + uZ * sinRy;
        const y1 = uY;
        const z1 = -uX * sinRy + uZ * cosRy;

        // Rotate around X-axis
        const x2 = x1;
        const y2 = y1 * cosRx - z1 * sinRx;
        const z2 = y1 * sinRx + z1 * cosRx;

        // Perspective Projection & Smooth continuous scaling factor
        const fov = 650;
        const scale = fov / (fov + z2 * sphereRadius);
        const screenX = centerX + x2 * sphereRadius * scale;
        const screenY = centerY - y2 * sphereRadius * scale;

        // Realistic Tangent Normal 3D Tilt angles (tangent to sphere surface curvature)
        const clampedX2 = Math.max(-0.95, Math.min(0.95, x2));
        const clampedY2 = Math.max(-0.95, Math.min(0.95, y2));
        const tiltY = -Math.asin(clampedX2) * (180 / Math.PI) * 0.38;
        const tiltX = Math.asin(clampedY2) * (180 / Math.PI) * 0.38;

        // Realistic Glare & Sheen sweep based on light position
        const sheenPos = Math.round((clampedX2 + 1) * 50);

        // Realistic Atmospheric Depth Shading (brightness & blur falloff)
        const normalizedZ = (z2 + 1) / 2;
        const alpha = Math.max(0.2, Math.min(1, 0.25 + 0.75 * normalizedZ));
        const brightness = Math.max(
          0.48,
          Math.min(1.08, 0.52 + (0.52 * Math.max(0, z2 + 0.3)) / 1.3)
        );
        const blurAmount = z2 < -0.3 ? `${((-z2 - 0.3) * 2.8).toFixed(1)}px` : "0px";

        const locLabel = `LOC[#${String(index + 1).padStart(2, "0")}]`;

        return {
          id: `photo-${index}`,
          index,
          src: imgData.src,
          caption: imgData.caption || `Memory ${index + 1}`,
          locLabel,
          lat,
          lon,
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          alpha,
          tiltX,
          tiltY,
          sheenPos,
          brightness,
          blurAmount,
        };
      });

      // Sort by depth (z ascending, so frontmost items render on top)
      projected.sort((a, b) => a.z - b.z);
      setProjectedNodes(projected);
    },
    [total]
  );

  // Main 3D Armillary Wireframe Canvas & Rotation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      const { clientWidth, clientHeight } = containerRef.current;
      dpr = window.devicePixelRatio || 1;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const renderLoop = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const sphereRadius = Math.min(width, height) * 0.38;

      // ── Inertia & Rotation physics ──
      if (!isDragging.current) {
        if (autoRotate && hoveredIdx === null) {
          velY.current = velY.current * 0.95 + 0.0028 * 0.05;
        } else {
          velY.current *= 0.92;
        }
        velX.current *= 0.92;

        rotY.current += velY.current;
        rotX.current += velX.current;

        // Clamp vertical tilt
        rotX.current = Math.max(-0.6, Math.min(0.6, rotX.current));
      }

      // Update React state positions for DOM nodes
      update3DPositions(sphereRadius, centerX, centerY);

      // ── DRAW 3D WIREFRAME ARMILLARY SPHERE ON CANVAS ──
      ctx.clearRect(0, 0, width, height);

      const rx = rotX.current;
      const ry = rotY.current;
      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);
      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);

      // Project 3D point helper
      const projectPoint = (uX: number, uY: number, uZ: number) => {
        const x1 = uX * cosRy + uZ * sinRy;
        const y1 = uY;
        const z1 = -uX * sinRy + uZ * cosRy;

        const x2 = x1;
        const y2 = y1 * cosRx - z1 * sinRx;
        const z2 = y1 * sinRx + z1 * cosRx;

        const fov = 650;
        const scale = fov / (fov + z2 * sphereRadius);
        return {
          x: centerX + x2 * sphereRadius * scale,
          y: centerY - y2 * sphereRadius * scale,
          z: z2,
        };
      };

      // 1. Draw Latitude Rings
      const latitudes = [-0.6, -0.3, 0, 0.3, 0.6];
      latitudes.forEach((lat) => {
        const isEquator = lat === 0;
        ctx.beginPath();
        const segments = 48;
        for (let i = 0; i <= segments; i++) {
          const lon = (i / segments) * Math.PI * 2;
          const uX = Math.cos(lat) * Math.sin(lon);
          const uY = Math.sin(lat);
          const uZ = Math.cos(lat) * Math.cos(lon);

          const pt = projectPoint(uX, uY, uZ);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        if (isEquator) {
          ctx.strokeStyle = "rgba(251, 23, 111, 0.72)"; // Vibrant #fb176f equator
          ctx.lineWidth = 1.6;
          ctx.shadowColor = "rgba(251, 23, 111, 0.6)";
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = "rgba(251, 23, 111, 0.35)"; // Clearly visible #fb176f wireframe
          ctx.lineWidth = 1.1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Longitude Meridians
      const longitudes = [
        0,
        Math.PI / 3,
        (2 * Math.PI) / 3,
        Math.PI,
        (4 * Math.PI) / 3,
        (5 * Math.PI) / 3,
      ];
      longitudes.forEach((lon) => {
        ctx.beginPath();
        const segments = 48;
        for (let i = 0; i <= segments; i++) {
          const lat = -Math.PI / 2 + (i / segments) * Math.PI;
          const uX = Math.cos(lat) * Math.sin(lon);
          const uY = Math.sin(lat);
          const uZ = Math.cos(lat) * Math.cos(lon);

          const pt = projectPoint(uX, uY, uZ);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        ctx.strokeStyle = "rgba(251, 23, 111, 0.3)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // Subtle Wireframe Junction Nodes at Intersections
      latitudes.forEach((lat) => {
        longitudes.forEach((lon) => {
          const uX = Math.cos(lat) * Math.sin(lon);
          const uY = Math.sin(lat);
          const uZ = Math.cos(lat) * Math.cos(lon);
          const pt = projectPoint(uX, uY, uZ);

          if (pt.z > -0.2) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(251, 23, 111, 0.55)";
            ctx.fill();
          }
        });
      });

      // 3. Draw Subtle Floating 3D Binary / Hex Orbit Particles
      ORBITAL_DATA_BITS.forEach((bit, i) => {
        const orbitalLon = bit.lon + Date.now() * 0.00015 * (i % 2 === 0 ? 1 : -0.7);
        const uX = Math.cos(bit.lat) * Math.sin(orbitalLon) * bit.distMult;
        const uY = Math.sin(bit.lat) * bit.distMult;
        const uZ = Math.cos(bit.lat) * Math.cos(orbitalLon) * bit.distMult;

        const pt = projectPoint(uX, uY, uZ);

        if (pt.z > -0.35) {
          const alpha = Math.max(0.15, Math.min(0.75, (pt.z + 0.35) / 1.35));

          // Draw tiny pulsing anchor dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 23, 111, ${alpha * 0.9})`;
          ctx.shadowColor = "#fb176f";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Draw Monospace Bit Text
          ctx.font = "bold 9px monospace";
          ctx.fillStyle = `rgba(255, 120, 180, ${alpha * 0.85})`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(bit.text, pt.x + 5, pt.y);
        }
      });

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [autoRotate, hoveredIdx, update3DPositions]);

  // 360° Pointer Drag & Spin Handlers on Stage Container
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    velY.current = dx * 0.005;
    velX.current = -dy * 0.005;

    rotY.current += velY.current;
    rotX.current += velX.current;
    rotX.current = Math.max(-0.6, Math.min(0.6, rotX.current));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Reset 3D Sphere orientation
  const handleResetOrientation = () => {
    rotX.current = 0.15;
    rotY.current = 0;
    velX.current = 0;
    velY.current = 0.0032;
  };

  // Modal navigation
  const activePhoto = selectedIdx !== null ? UNIVERSITY_IMAGES[selectedIdx] : null;

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % total);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + total) % total);
    }
  };

  return (
    <section
      id="university"
      data-section="university"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20 select-none"
    >
      <SectionAmbient
        color={SECTION_COLORS.university}
        variant="b"
        icons={SECTION_ICONS.university}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header with Controls */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink flex items-center gap-3">
                <span className="text-ruby font-mono">#</span>university-journey
              </h2>
              <div className="h-px bg-white/10 flex-grow max-w-xs" />
            </div>
            <p className="text-muted text-sm">
              Some of memorable moments from my university life and activities.
            </p>
          </div>

          {/* Action Simulation Controls */}
          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <button
              type="button"
              onClick={handleResetOrientation}
              title="Reset 3D Sphere Orientation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-muted hover:text-ink hover:border-ruby/40 hover:bg-ruby/10 transition-all cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset View</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoRotate((r) => !r)}
              title={autoRotate ? "Pause Auto-Rotation" : "Resume Rotation"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                autoRotate
                  ? "border-ruby/40 bg-ruby/15 text-ruby font-bold"
                  : "border-white/10 text-muted"
              }`}
            >
              <Sparkles size={12} className={autoRotate ? "animate-pulse" : ""} />
              <span>{autoRotate ? "Auto-Spin: ON" : "Auto-Spin: OFF"}</span>
            </button>
          </div>
        </motion.div>

        {/* ── 3D WIREFRAME SPHERE STAGE CONTAINER (Seamless Floating) ── */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[540px] md:h-[640px] overflow-visible cursor-grab active:cursor-grabbing"
        >
          {/* 3D Armillary Wireframe Mesh Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* ── 3D FLOATING PHOTO TILES WITH REALISTIC SURFACE TILT & DEPTH SHADING ── */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {projectedNodes.map((node) => {
              const isHovered = hoveredIdx === node.index;
              const isForeground = node.z > -0.2;
              const hoverScale = isHovered ? 1.18 : 1;

              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%) perspective(1000px) rotateX(${isHovered ? 0 : node.tiltX}deg) rotateY(${isHovered ? 0 : node.tiltY}deg) scale(${node.scale * hoverScale})`,
                    transformOrigin: "center center",
                    willChange: "transform, opacity, filter",
                    zIndex: Math.round((node.z + 2) * 100) + (isHovered ? 500 : 0),
                    opacity: node.alpha,
                    filter: isHovered
                      ? "brightness(1.1) drop-shadow(0 0 16px rgba(251,23,111,0.6))"
                      : `brightness(${node.brightness}) blur(${node.blurAmount})`,
                    transition: isHovered
                      ? "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease"
                      : "filter 0.15s ease",
                  }}
                  className="pointer-events-auto cursor-pointer group select-none"
                  onMouseEnter={() => setHoveredIdx(node.index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx(node.index);
                  }}
                >
                  {/* Photo Tile Card (Fixed Base Dimension with Realistic 3D Lighting & Glass Glare) */}
                  <div
                    className="relative w-[140px] h-[94px] rounded-xl overflow-hidden border transition-[border-color,box-shadow] duration-200 shadow-2xl"
                    style={{
                      background: "rgba(6, 12, 24, 0.95)",
                      borderColor: isHovered
                        ? "#fb176f"
                        : isForeground
                          ? "rgba(251, 23, 111, 0.6)"
                          : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isHovered
                        ? "0 0 32px rgba(251, 23, 111, 0.85), 0 0 12px #fb176f"
                        : isForeground
                          ? `0 14px 28px rgba(0,0,0,0.7), 0 0 14px rgba(251,23,111,${Math.max(0.1, node.z * 0.35).toFixed(2)})`
                          : "0 4px 12px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Image View */}
                    <img
                      src={node.src}
                      alt={node.caption || `University Photo ${node.index + 1}`}
                      draggable={false}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />

                    {/* Realistic Dynamic Glare / Glass Sheen Reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                      style={{
                        background: `linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.4) ${node.sheenPos}%, transparent ${node.sheenPos + 24}%)`,
                      }}
                    />

                    {/* Atmospheric Vignette & Depth Shadow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${Math.max(0.08, 0.5 - node.z * 0.4)}) 100%)`,
                      }}
                    />

                    {/* Glowing Bracketed Corners [ ] */}
                    <div
                      className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2"
                      style={{ borderColor: isHovered ? "#ffffff" : "#fb176f" }}
                    />
                    <div
                      className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2"
                      style={{ borderColor: isHovered ? "#ffffff" : "#fb176f" }}
                    />
                    <div
                      className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2"
                      style={{ borderColor: isHovered ? "#ffffff" : "#fb176f" }}
                    />
                    <div
                      className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2"
                      style={{ borderColor: isHovered ? "#ffffff" : "#fb176f" }}
                    />

                    {/* HUD Crosshair Target Overlay on Hover */}
                    {isHovered && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-ruby/15 backdrop-blur-[1px]">
                        <Crosshair size={22} className="text-white animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── HIGH-RES PHOTO LIGHTBOX MODAL (Pure Photo View) ── */}
        <AnimatePresence>
          {selectedIdx !== null && activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdx(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.92, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-3xl border-2 border-ruby/50 overflow-hidden shadow-2xl flex flex-col"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(25,8,25,0.98) 0%, rgba(6,10,22,0.99) 100%)",
                  boxShadow:
                    "0 25px 80px -15px rgba(251,23,111,0.5), 0 0 30px rgba(251,23,111,0.25)",
                }}
              >
                {/* Modal Titlebar */}
                <div
                  className="px-6 py-4 border-b border-ruby/30 flex items-center justify-between"
                  style={{ background: "rgba(10, 6, 16, 0.9)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-ruby animate-pulse" />
                    <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                      PHOTO {String(selectedIdx + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedIdx(null)}
                    aria-label="Close modal"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Full-Res Photo Body */}
                <div className="relative p-4 sm:p-8 flex items-center justify-center bg-black/60 min-h-[360px] md:min-h-[480px]">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl max-h-[70vh]">
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.caption || "University Photo"}
                      className="max-h-[65vh] w-auto max-w-full object-contain"
                    />

                    {/* Corner Cyber Brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-ruby" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-ruby" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-ruby" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-ruby" />
                  </div>

                  {/* Previous / Next Lightbox Controls */}
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    className="absolute left-4 sm:left-6 w-11 h-11 rounded-full border border-white/20 bg-black/70 flex items-center justify-center text-white hover:text-ruby hover:border-ruby/50 hover:bg-ruby/10 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    className="absolute right-4 sm:right-6 w-11 h-11 rounded-full border border-white/20 bg-black/70 flex items-center justify-center text-white hover:text-ruby hover:border-ruby/50 hover:bg-ruby/10 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
