"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons";
import { PROJECTS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => setActiveIdx((i) => (i + 1) % PROJECTS.length);

  const project = PROJECTS[activeIdx];
  const total = PROJECTS.length;

  return (
    <section
      id="projects"
      data-section="projects"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#a855f7" variant="a" icons={SECTION_ICONS.projects} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
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
          <span className="font-mono text-sm shrink-0" style={{ color: "rgba(168,85,247,0.45)" }}>
            {String(activeIdx + 1).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Main card */}
        <div
          className="rounded-2xl border border-white/[0.07] overflow-hidden mb-6"
          style={{ background: "rgba(11,21,37,0.7)", backdropFilter: "blur(20px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="flex flex-col md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Left: image */}
              <div className="relative md:w-[55%] h-64 md:h-auto shrink-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay right edge for blend into content */}
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#0b1525]/80 hidden md:block" />
                {/* Lang badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.langStats.map((ls) => (
                    <span
                      key={ls.lang}
                      className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(168,85,247,0.35)",
                        color: "#dce4f5",
                      }}
                    >
                      {ls.lang} {ls.pct}%
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: content */}
              <div className="flex flex-col justify-between p-8 md:p-10 flex-grow gap-6">
                <div className="space-y-4">
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 rounded-full border border-purple/45 text-purple/90 bg-transparent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ink">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  {/* Hashtag keywords */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[11px] text-dim">
                        #{tag.toLowerCase().replace(/[\s.]/g, "")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                    className="flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border border-purple/50 bg-purple/20 text-[#c084fc] transition-all duration-200 hover:scale-[1.03] hover:bg-purple/30 hover:border-purple/70"
                  >
                    Live <ExternalLink size={13} />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View repository of ${project.title}`}
                    className="flex items-center gap-2 font-mono text-sm text-muted hover:text-ink transition-colors"
                  >
                    <GithubIcon style={{ width: 15, height: 15 }} />
                    Repo
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail filmstrip + navigation */}
        <div className="flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-purple hover:border-purple/40 transition-all shrink-0"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-hidden flex-1 justify-center">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIdx(i)}
                aria-label={`Select ${p.title}`}
                className="shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width: 72,
                  height: 52,
                  outline:
                    i === activeIdx ? "2px solid rgba(168,85,247,0.8)" : "2px solid transparent",
                  outlineOffset: 2,
                  opacity: i === activeIdx ? 1 : 0.45,
                  transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
                }}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-purple hover:border-purple/40 transition-all shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-4 font-mono text-xs text-dim">
          {String(activeIdx + 1).padStart(2, "0")}
          <span className="text-white/20"> / </span>
          {String(total).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
