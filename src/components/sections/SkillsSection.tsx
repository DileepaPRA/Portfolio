"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Layers,
  Cpu,
  Database,
  Cloud,
  Wrench,
  Sparkles,
  Network,
  Zap,
} from "lucide-react";
import { LEARNING_NOW, SECTION_COLORS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import TechLogo from "../TechLogo";

interface BarkerTableData {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: Array<{ name: string; type: string; marker?: "#" | "*" | "o" }>;
}

const BARKER_TABLES: Record<string, BarkerTableData> = {
  Programming: {
    title: "PROGRAMMING",
    icon: Terminal,
    skills: [
      { name: "Java", type: "VARCHAR", marker: "*" },
      { name: "TypeScript", type: "VARCHAR", marker: "*" },
      { name: "JavaScript", type: "VARCHAR", marker: "*" },
      { name: "Python", type: "VARCHAR", marker: "*" },
      { name: "C", type: "VARCHAR", marker: "*" },
    ],
  },
  Frontend: {
    title: "FRONTEND",
    icon: Layers,
    skills: [
      { name: "React", type: "VARCHAR", marker: "*" },
      { name: "Next.js", type: "VARCHAR", marker: "*" },
      { name: "HTML5", type: "VARCHAR", marker: "*" },
      { name: "CSS3", type: "VARCHAR", marker: "*" },
      { name: "Tailwind CSS", type: "VARCHAR", marker: "*" },
    ],
  },
  Backend: {
    title: "BACKEND",
    icon: Cpu,
    skills: [
      { name: "Spring Boot", type: "VARCHAR", marker: "*" },
      { name: "Express.js", type: "VARCHAR", marker: "*" },
      { name: "REST APIs", type: "VARCHAR", marker: "*" },
      { name: "JWT", type: "VARCHAR", marker: "*" },
      { name: "Docker", type: "CONTAINER", marker: "*" },
    ],
  },
  Databases: {
    title: "DATABASES",
    icon: Database,
    skills: [
      { name: "MySQL", type: "RDBMS", marker: "*" },
      { name: "MSSQL", type: "RDBMS", marker: "*" },
      { name: "MongoDB", type: "NO_SQL", marker: "*" },
      { name: "Redis", type: "IN_MEMORY", marker: "*" },
    ],
  },
  "Cloud & DevOps": {
    title: "CLOUD_DEVOPS",
    icon: Cloud,
    skills: [
      { name: "AWS S3", type: "VARCHAR", marker: "*" },
      { name: "Render", type: "VARCHAR", marker: "*" },
      { name: "Netlify", type: "VARCHAR", marker: "*" },
      { name: "Aiven Cloud", type: "VARCHAR", marker: "*" },
      { name: "GitHub Actions", type: "WORKFLOW", marker: "*" },
    ],
  },
  "Tools & Platforms": {
    title: "TOOLS_PLATFORMS",
    icon: Wrench,
    skills: [
      { name: "Git", type: "VARCHAR", marker: "*" },
      { name: "GitHub", type: "VARCHAR", marker: "*" },
      { name: "Postman", type: "VARCHAR", marker: "*" },
      { name: "Figma", type: "VARCHAR", marker: "*" },
      { name: "Blender", type: "VARCHAR", marker: "*" },
      { name: "TensorFlow", type: "VARCHAR", marker: "*" },
      { name: "Google Colab", type: "VARCHAR", marker: "*" },
    ],
  },
};

interface BoxPos {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export default function SkillsSection() {
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<{
    p?: BoxPos;
    f?: BoxPos;
    b?: BoxPos;
    d?: BoxPos;
    c?: BoxPos;
    t?: BoxPos;
    width: number;
    height: number;
  } | null>(null);

  const updatePositions = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    const getPos = (el: HTMLElement | null): BoxPos | undefined => {
      if (!el) return undefined;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - cRect.left,
        right: r.right - cRect.left,
        top: r.top - cRect.top,
        bottom: r.bottom - cRect.top,
        centerX: r.left - cRect.left + r.width / 2,
        centerY: r.top - cRect.top + r.height / 2,
        width: r.width,
        height: r.height,
      };
    };

    const p = getPos(progRef.current);
    const f = getPos(frontRef.current);
    const b = getPos(backRef.current);
    const d = getPos(dbRef.current);
    const c = getPos(cloudRef.current);
    const t = getPos(toolsRef.current);

    if (p && f && b && d && c && t) {
      setPositions({
        p,
        f,
        b,
        d,
        c,
        t,
        width: cRect.width,
        height: cRect.height,
      });
    }
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);

    const observer = new ResizeObserver(() => {
      updatePositions();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePositions);
      observer.disconnect();
    };
  }, []);

  const p = positions?.p;
  const f = positions?.f;
  const b = positions?.b;
  const d = positions?.d;
  const c = positions?.c;
  const t = positions?.t;

  const headerOffset = 48;
  const midGutterY = b && t ? (b.bottom + t.top) / 2 : 0;

  // Helper for dynamic interactive line styling (soft in default view, vivid when hovered)
  const getLineProps = (tables: string[]) => {
    const isConnected = hoveredTable !== null && tables.includes(hoveredTable);
    const isAnyHovered = hoveredTable !== null;

    if (isConnected) {
      return {
        stroke: "#4edea3",
        strokeWidth: "2.8",
        opacity: 1,
        filter: "url(#barker-glow-fx)",
      };
    }

    if (isAnyHovered) {
      return {
        stroke: "rgba(78, 222, 163, 0.12)",
        strokeWidth: "1.2",
        opacity: 0.35,
        filter: "none",
      };
    }

    // Default resting state: soft & subtle opacity
    return {
      stroke: "rgba(78, 222, 163, 0.32)",
      strokeWidth: "1.6",
      opacity: 0.8,
      filter: "url(#barker-glow-fx)",
    };
  };

  return (
    <section
      id="skills"
      data-section="skills"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color={SECTION_COLORS.skills} variant="d" icons={SECTION_ICONS.skills} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            <span className="text-emerald font-mono">#</span>skills-tools
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </motion.div>

        {/* ── ER DIAGRAM CANVAS CONTAINER ── */}
        <div ref={containerRef} className="relative">
          {/* ── AUTHENTIC BARKER NOTATION SVG RELATIONAL CONNECTORS (All M:N with Dual Forks) ── */}
          {positions && p && f && b && d && c && t && (
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
              <svg
                width={positions.width}
                height={positions.height}
                className="w-full h-full"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <filter id="barker-glow-fx" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── 1. PROGRAMMING <---> FRONTEND [M : N] ── */}
                <g
                  {...getLineProps(["Programming", "Frontend"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line
                    x1={p.right + 8}
                    y1={p.top + headerOffset}
                    x2={f.left - 8}
                    y2={p.top + headerOffset}
                  />

                  {/* Barker Fork on Programming (exiting right) */}
                  <path
                    d={`M ${p.right} ${p.top + headerOffset - 6} L ${p.right + 8} ${p.top + headerOffset} L ${p.right} ${p.top + headerOffset + 6}`}
                  />
                  <line
                    x1={p.right}
                    y1={p.top + headerOffset}
                    x2={p.right + 8}
                    y2={p.top + headerOffset}
                  />

                  {/* Barker Fork on Frontend (entering left) */}
                  <path
                    d={`M ${f.left} ${p.top + headerOffset - 6} L ${f.left - 8} ${p.top + headerOffset} L ${f.left} ${p.top + headerOffset + 6}`}
                  />
                  <line
                    x1={f.left - 8}
                    y1={p.top + headerOffset}
                    x2={f.left}
                    y2={p.top + headerOffset}
                  />
                </g>

                {/* ── 2. PROGRAMMING <---> BACKEND [M : N (Overpass Compiler Bus)] ── */}
                <g
                  {...getLineProps(["Programming", "Backend"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <path
                    d={`M ${p.centerX} ${p.top - 8} L ${p.centerX} ${p.top - 18} L ${b.centerX} ${p.top - 18} L ${b.centerX} ${b.top - 8}`}
                  />

                  {/* Barker Fork on Programming (top exit) */}
                  <path
                    d={`M ${p.centerX - 6} ${p.top} L ${p.centerX} ${p.top - 8} L ${p.centerX + 6} ${p.top}`}
                  />
                  <line x1={p.centerX} y1={p.top} x2={p.centerX} y2={p.top - 8} />

                  {/* Barker Fork on Backend (top entry) */}
                  <path
                    d={`M ${b.centerX - 6} ${b.top} L ${b.centerX} ${b.top - 8} L ${b.centerX + 6} ${b.top}`}
                  />
                  <line x1={b.centerX} y1={b.top} x2={b.centerX} y2={b.top - 8} />
                </g>

                {/* ── 3. FRONTEND <---> BACKEND [M : N (REST/JSON API Handshake)] ── */}
                <g
                  {...getLineProps(["Frontend", "Backend"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line
                    x1={f.right + 8}
                    y1={f.top + headerOffset}
                    x2={b.left - 8}
                    y2={f.top + headerOffset}
                  />

                  {/* Barker Fork on Frontend (exiting right) */}
                  <path
                    d={`M ${f.right} ${f.top + headerOffset - 6} L ${f.right + 8} ${f.top + headerOffset} L ${f.right} ${f.top + headerOffset + 6}`}
                  />
                  <line
                    x1={f.right}
                    y1={f.top + headerOffset}
                    x2={f.right + 8}
                    y2={f.top + headerOffset}
                  />

                  {/* Barker Fork on Backend (entering left) */}
                  <path
                    d={`M ${b.left} ${f.top + headerOffset - 6} L ${b.left - 8} ${f.top + headerOffset} L ${b.left} ${f.top + headerOffset + 6}`}
                  />
                  <line
                    x1={b.left - 8}
                    y1={f.top + headerOffset}
                    x2={b.left}
                    y2={f.top + headerOffset}
                  />
                </g>

                {/* ── 4. FRONTEND <---> CLOUD_DEVOPS [M : N (Hosting / Build Pipeline)] ── */}
                <g
                  {...getLineProps(["Frontend", "Cloud & DevOps"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line x1={f.centerX} y1={f.bottom + 8} x2={c.centerX} y2={c.top - 8} />

                  {/* Barker Fork on Frontend bottom */}
                  <path
                    d={`M ${f.centerX - 6} ${f.bottom} L ${f.centerX} ${f.bottom + 8} L ${f.centerX + 6} ${f.bottom}`}
                  />
                  <line x1={f.centerX} y1={f.bottom} x2={f.centerX} y2={f.bottom + 8} />

                  {/* Barker Fork on Cloud_DevOps top */}
                  <path
                    d={`M ${c.centerX - 6} ${c.top} L ${c.centerX} ${c.top - 8} L ${c.centerX + 6} ${c.top}`}
                  />
                  <line x1={c.centerX} y1={c.top} x2={c.centerX} y2={c.top - 8} />
                </g>

                {/* ── 5. BACKEND <---> DATABASES [M : N (Query & Persistence Bus)] ── */}
                <g
                  {...getLineProps(["Backend", "Databases"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <path
                    d={`M ${b.left - 8} ${b.top + 95} L ${b.left - 18} ${b.top + 95} L ${b.left - 18} ${midGutterY} L ${d.centerX} ${midGutterY} L ${d.centerX} ${d.top - 8}`}
                  />

                  {/* Barker Fork on Backend left */}
                  <path
                    d={`M ${b.left} ${b.top + 95 - 6} L ${b.left - 8} ${b.top + 95} L ${b.left} ${b.top + 95 + 6}`}
                  />
                  <line x1={b.left} y1={b.top + 95} x2={b.left - 8} y2={b.top + 95} />

                  {/* Barker Fork on Databases top */}
                  <path
                    d={`M ${d.centerX - 6} ${d.top} L ${d.centerX} ${d.top - 8} L ${d.centerX + 6} ${d.top}`}
                  />
                  <line x1={d.centerX} y1={d.top} x2={d.centerX} y2={d.top - 8} />
                </g>

                {/* ── 6. BACKEND <---> CLOUD_DEVOPS [M : N (Deployment Pipeline)] ── */}
                <g
                  {...getLineProps(["Backend", "Cloud & DevOps"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <path
                    d={`M ${b.left - 8} ${b.top + 140} L ${b.left - 28} ${b.top + 140} L ${b.left - 28} ${midGutterY + 8} L ${c.centerX + 25} ${midGutterY + 8} L ${c.centerX + 25} ${c.top - 8}`}
                  />

                  {/* Barker Fork on Backend */}
                  <path
                    d={`M ${b.left} ${b.top + 140 - 6} L ${b.left - 8} ${b.top + 140} L ${b.left} ${b.top + 140 + 6}`}
                  />
                  <line x1={b.left} y1={b.top + 140} x2={b.left - 8} y2={b.top + 140} />

                  {/* Barker Fork on Cloud_DevOps top */}
                  <path
                    d={`M ${c.centerX + 19} ${c.top} L ${c.centerX + 25} ${c.top - 8} L ${c.centerX + 31} ${c.top}`}
                  />
                  <line x1={c.centerX + 25} y1={c.top} x2={c.centerX + 25} y2={c.top - 8} />
                </g>

                {/* ── 7. BACKEND <---> TOOLS_PLATFORMS [M : N (Vertical Toolchain Link)] ── */}
                <g
                  {...getLineProps(["Backend", "Tools & Platforms"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line x1={t.centerX} y1={b.bottom + 8} x2={t.centerX} y2={t.top - 8} />

                  {/* Barker Fork on Backend bottom */}
                  <path
                    d={`M ${t.centerX - 6} ${b.bottom} L ${t.centerX} ${b.bottom + 8} L ${t.centerX + 6} ${b.bottom}`}
                  />
                  <line x1={t.centerX} y1={b.bottom} x2={t.centerX} y2={b.bottom + 8} />

                  {/* Barker Fork on Tools_Platforms top */}
                  <path
                    d={`M ${t.centerX - 6} ${t.top} L ${t.centerX} ${t.top - 8} L ${t.centerX + 6} ${t.top}`}
                  />
                  <line x1={t.centerX} y1={t.top} x2={t.centerX} y2={t.top - 8} />
                </g>

                {/* ── 8. FRONTEND <---> TOOLS_PLATFORMS [M : N (Design & UI ML Link)] ── */}
                <g
                  {...getLineProps(["Frontend", "Tools & Platforms"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <path
                    d={`M ${f.centerX + 35} ${f.bottom + 8} L ${f.centerX + 35} ${midGutterY - 4} L ${t.centerX - 35} ${midGutterY - 4} L ${t.centerX - 35} ${t.top - 8}`}
                  />

                  {/* Barker Fork on Frontend bottom */}
                  <path
                    d={`M ${f.centerX + 29} ${f.bottom} L ${f.centerX + 35} ${f.bottom + 8} L ${f.centerX + 41} ${f.bottom}`}
                  />
                  <line x1={f.centerX + 35} y1={f.bottom} x2={f.centerX + 35} y2={f.bottom + 8} />

                  {/* Barker Fork on Tools_Platforms top */}
                  <path
                    d={`M ${t.centerX - 41} ${t.top} L ${t.centerX - 35} ${t.top - 8} L ${t.centerX - 29} ${t.top}`}
                  />
                  <line x1={t.centerX - 35} y1={t.top} x2={t.centerX - 35} y2={t.top - 8} />
                </g>

                {/* ── 9. CLOUD_DEVOPS <---> TOOLS_PLATFORMS [M : N (CI/CD Automations)] ── */}
                <g
                  {...getLineProps(["Cloud & DevOps", "Tools & Platforms"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line
                    x1={c.right + 8}
                    y1={t.top + headerOffset}
                    x2={t.left - 8}
                    y2={t.top + headerOffset}
                  />

                  {/* Barker Fork on Cloud_DevOps (exiting right) */}
                  <path
                    d={`M ${c.right} ${t.top + headerOffset - 6} L ${c.right + 8} ${t.top + headerOffset} L ${c.right} ${t.top + headerOffset + 6}`}
                  />
                  <line
                    x1={c.right}
                    y1={t.top + headerOffset}
                    x2={c.right + 8}
                    y2={t.top + headerOffset}
                  />

                  {/* Barker Fork on Tools_Platforms (entering left) */}
                  <path
                    d={`M ${t.left} ${t.top + headerOffset - 6} L ${t.left - 8} ${t.top + headerOffset} L ${t.left} ${t.top + headerOffset + 6}`}
                  />
                  <line
                    x1={t.left - 8}
                    y1={t.top + headerOffset}
                    x2={t.left}
                    y2={t.top + headerOffset}
                  />
                </g>

                {/* ── 10. DATABASES <---> CLOUD_DEVOPS [M : N (Managed Cloud Clusters)] ── */}
                <g
                  {...getLineProps(["Databases", "Cloud & DevOps"])}
                  fill="none"
                  className="transition-all duration-300"
                >
                  <line
                    x1={d.right + 8}
                    y1={d.top + headerOffset}
                    x2={c.left - 8}
                    y2={d.top + headerOffset}
                  />

                  {/* Barker Fork on Databases */}
                  <path
                    d={`M ${d.right} ${d.top + headerOffset - 6} L ${d.right + 8} ${d.top + headerOffset} L ${d.right} ${d.top + headerOffset + 6}`}
                  />
                  <line
                    x1={d.right}
                    y1={d.top + headerOffset}
                    x2={d.right + 8}
                    y2={d.top + headerOffset}
                  />

                  {/* Barker Fork on Cloud_DevOps */}
                  <path
                    d={`M ${c.left} ${d.top + headerOffset - 6} L ${c.left - 8} ${d.top + headerOffset} L ${c.left} ${d.top + headerOffset + 6}`}
                  />
                  <line
                    x1={c.left - 8}
                    y1={d.top + headerOffset}
                    x2={c.left}
                    y2={d.top + headerOffset}
                  />
                </g>
              </svg>
            </div>
          )}

          {/* ── 2-ROW 3-COLUMN BARKER ERD SCHEMA GRID ── */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-16 gap-x-8 lg:gap-x-12 items-start">
            {/* ROW 1: PROGRAMMING */}
            <div ref={progRef}>
              <BarkerTableCard
                data={BARKER_TABLES.Programming}
                categoryKey="Programming"
                isHovered={hoveredTable === "Programming"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>

            {/* ROW 1: FRONTEND */}
            <div ref={frontRef}>
              <BarkerTableCard
                data={BARKER_TABLES.Frontend}
                categoryKey="Frontend"
                isHovered={hoveredTable === "Frontend"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>

            {/* ROW 1: BACKEND */}
            <div ref={backRef}>
              <BarkerTableCard
                data={BARKER_TABLES.Backend}
                categoryKey="Backend"
                isHovered={hoveredTable === "Backend"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>

            {/* ROW 2: DATABASES */}
            <div ref={dbRef}>
              <BarkerTableCard
                data={BARKER_TABLES.Databases}
                categoryKey="Databases"
                isHovered={hoveredTable === "Databases"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>

            {/* ROW 2: CLOUD_DEVOPS */}
            <div ref={cloudRef}>
              <BarkerTableCard
                data={BARKER_TABLES["Cloud & DevOps"]}
                categoryKey="Cloud & DevOps"
                isHovered={hoveredTable === "Cloud & DevOps"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>

            {/* ROW 2: TOOLS_PLATFORMS */}
            <div ref={toolsRef}>
              <BarkerTableCard
                data={BARKER_TABLES["Tools & Platforms"]}
                categoryKey="Tools & Platforms"
                isHovered={hoveredTable === "Tools & Platforms"}
                hoveredSkill={hoveredSkill}
                onHoverTable={setHoveredTable}
                onHoverSkill={setHoveredSkill}
              />
            </div>
          </div>

          {/* ── LEARNING NOW (Continuous Learning Buffer) ── */}
          <motion.div
            className="mt-8 rounded-2xl border border-teal/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all glass"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: "var(--card-dark-fill)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-teal/40 shrink-0"
                style={{ background: "rgba(0, 212, 180, 0.15)" }}
              >
                <Sparkles size={15} className="text-teal" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wider text-teal uppercase">
                  LEARNING NOW
                </span>
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {LEARNING_NOW.map((t) => (
                <LearningBadge key={t} name={t} />
              ))}
            </div>
          </motion.div>

          {/* ── SUBTLE BARKER NOTATION FACT NOTE ── */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-between gap-3 px-2 text-[11px] font-mono text-muted border-t border-border pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Network size={12} className="text-emerald/60" />
              <span>
                Fact - System topology modeled using{" "}
                <span className="text-ink/75 font-medium">Barker&apos;s ERD Notation</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted/40">
              <span>
                <span className="text-emerald/60 font-bold">#</span> Primary UID
              </span>
              <span>•</span>
              <span>
                <span className="text-emerald/60 font-bold">*</span> Attribute
              </span>
              <span>•</span>
              <span>
                <span className="text-emerald/60 font-bold">&lt; ─── &gt;</span> Many-to-Many (M:N)
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const TECH_BRAND_COLORS: Record<string, string> = {
  // Programming
  Java: "#f89820",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  C: "#659ad2",
  // Frontend
  React: "#61dafb",
  "Next.js": "#ffffff",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  "Tailwind CSS": "#06b6d4",
  // Backend
  "Spring Boot": "#6db33f",
  "Express.js": "#ffffff",
  "REST APIs": "#00d4b4",
  JWT: "#d63aff",
  Docker: "#2496ed",
  // Databases
  MySQL: "#4479a1",
  MSSQL: "#cc292b",
  MongoDB: "#47a248",
  Redis: "#dc382d",
  // Cloud & DevOps
  "AWS S3": "#ff9900",
  Render: "#46e3b7",
  Netlify: "#00c7b7",
  "Aiven Cloud": "#ff3554",
  "GitHub Actions": "#2088ff",
  // Tools & Platforms
  Git: "#f05032",
  GitHub: "#ffffff",
  Postman: "#ff6c37",
  Figma: "#f24e1e",
  Blender: "#ea7600",
  TensorFlow: "#ff6f00",
  "Google Colab": "#f9ab00",
  // Learning Now & Extended
  Flutter: "#02569b",
  Dart: "#0175c2",
  FastAPI: "#009688",
  GraphQL: "#e10098",
  Prisma: "#2d3748",
  Kubernetes: "#326ce5",
  "TensorFlow Lite": "#ff6f00",
  "Raspberry Pi": "#c51a4a",
  Arduino: "#00979d",
  OpenCV: "#5c3ee8",
  "Google Gemini API": "#1ba1e2",
  Streamlit: "#ff4b4b",
  "scikit-learn": "#f7931e",
  NumPy: "#013243",
  Pandas: "#150458",
  Matplotlib: "#11557c",
  "Framer Motion": "#ff0055",
  "Discord.js": "#5865f2",
};

export function getTechBrandColor(name: string): string {
  return TECH_BRAND_COLORS[name] || "#4edea3";
}

{
  /* ── MAGNETIC BARKER TABLE CARD COMPONENT ── */
}
interface BarkerTableCardProps {
  data: BarkerTableData;
  categoryKey: string;
  isHovered: boolean;
  hoveredSkill: string | null;
  onHoverTable: (key: string | null) => void;
  onHoverSkill: (skill: string | null) => void;
}

function BarkerTableCard({
  data,
  categoryKey,
  isHovered,
  hoveredSkill,
  onHoverTable,
  onHoverSkill,
}: BarkerTableCardProps) {
  const Icon = data.icon;

  return (
    <motion.div
      className="relative rounded-2xl border-2 transition-all duration-300 overflow-hidden group flex flex-col justify-between glass"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => onHoverTable(categoryKey)}
      onMouseLeave={() => onHoverTable(null)}
      style={{
        background: "var(--card-dark-fill)",
        borderColor: isHovered ? "var(--color-emerald)" : "var(--color-border-hi)",
        boxShadow: isHovered
          ? "0 0 30px rgba(78, 222, 163, 0.3), inset 0 0 15px rgba(78, 222, 163, 0.12)"
          : "var(--glass-shadow)",
      }}
    >
      {/* ── Card Header: Table Icon & Title ── */}
      <div
        className="px-4 py-3 border-b border-border flex items-center justify-between transition-colors duration-300"
        style={{
          background: isHovered ? "rgba(78, 222, 163, 0.14)" : "rgba(78, 222, 163, 0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-emerald flex items-center justify-center">
            <Icon size={16} />
          </span>
          <h3 className="font-mono text-xs sm:text-[13px] font-extrabold text-ink tracking-wider">
            {data.title}
          </h3>
        </div>
      </div>

      {/* ── Card Body / Column Rows ── */}
      <div className="p-3 font-mono text-xs relative">
        {/* Primary UID Row (# skill_id) in Barker Notation */}
        <div className="flex items-center px-2 py-1.5 border-b mb-1.5 text-xs border-border">
          <div className="flex items-center gap-1.5 font-bold text-ink">
            <span className="text-emerald font-black text-sm leading-none">#</span>
            <span className="text-muted">skill_id</span>
          </div>
        </div>

        {/* Skill Rows */}
        <div className="space-y-1 relative z-20">
          {data.skills.map((item) => (
            <SkillRowNode
              key={item.name}
              skill={item}
              isSelfHovered={hoveredSkill === item.name}
              onHoverSkill={onHoverSkill}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

{
  /* ── SKILL ROW NODE (Subtle Brand Shadow/Glow on Hover) ── */
}
interface SkillRowNodeProps {
  skill: { name: string; type: string; marker?: "#" | "*" | "o" };
  isSelfHovered: boolean;
  onHoverSkill: (name: string | null) => void;
}

function SkillRowNode({ skill, isSelfHovered, onHoverSkill }: SkillRowNodeProps) {
  const brandColor = getTechBrandColor(skill.name);

  return (
    <div
      onMouseEnter={() => onHoverSkill(skill.name)}
      onMouseLeave={() => onHoverSkill(null)}
      className="relative flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all duration-200 border cursor-text select-text"
      style={{
        background: isSelfHovered ? `${brandColor}18` : "transparent",
        borderColor: isSelfHovered ? `${brandColor}50` : "transparent",
        boxShadow: isSelfHovered
          ? `0 0 16px ${brandColor}35, inset 0 0 8px ${brandColor}12`
          : "none",
      }}
    >
      {/* Barker Marker (*) + Tech Logo + Skill Name */}
      <div className="flex items-center gap-2.5 min-w-0 select-text">
        {/* Barker Marker */}
        <span
          className="font-bold text-sm leading-none shrink-0 transition-colors duration-200 select-none"
          style={{
            color: isSelfHovered ? brandColor : "var(--color-emerald)",
          }}
        >
          *
        </span>

        {/* Tech Logo with Dynamic Scale on hover */}
        <motion.div
          animate={isSelfHovered ? { scale: 1.12 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="select-none"
        >
          <TechLogo name={skill.name} size={18} />
        </motion.div>

        {/* Skill Title */}
        <span
          className="font-semibold text-[13px] sm:text-[13.5px] truncate transition-colors duration-200 select-text text-ink"
          style={{
            fontWeight: isSelfHovered ? 700 : 600,
            textShadow: isSelfHovered ? `0 0 8px ${brandColor}50` : "none",
          }}
        >
          {skill.name}
        </span>
      </div>
    </div>
  );
}

{
  /* ── LEARNING NOW BADGE (Subtle Brand Glow + Scale) ── */
}
function LearningBadge({ name }: { name: string }) {
  const brandColor = getTechBrandColor(name);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2 font-mono text-[13px] font-semibold text-ink border px-3 py-1.5 rounded-lg transition-all duration-200 cursor-text select-text"
      style={{
        borderColor: isHovered ? `${brandColor}60` : "rgba(0, 212, 180, 0.3)",
        background: isHovered ? `${brandColor}18` : "rgba(0, 212, 180, 0.08)",
        boxShadow: isHovered ? `0 0 16px ${brandColor}40, inset 0 0 8px ${brandColor}12` : "none",
      }}
    >
      <motion.div
        animate={isHovered ? { scale: 1.12 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        className="select-none"
      >
        <TechLogo name={name} size={17} />
      </motion.div>
      <span
        className="select-text text-ink"
        style={{
          textShadow: isHovered ? `0 0 8px ${brandColor}50` : "none",
        }}
      >
        {name}
      </span>
    </div>
  );
}
