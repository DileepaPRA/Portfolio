"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Trophy,
  Shield,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Image as ImageIcon,
} from "lucide-react";
import { AWARDS, CERTIFICATIONS, SECTION_COLORS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

const awardIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  trophy: Trophy,
  shield: Shield,
  star: Star,
};

export default function AchievementsSection() {
  const certTrackRef = useRef<HTMLDivElement>(null);
  const [certIdx, setCertIdx] = useState(0);

  const scrollCerts = (dir: "left" | "right") => {
    const el = certTrackRef.current;
    if (!el) return;
    const amount = dir === "right" ? 300 : -300;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setCertIdx((prev) => {
      if (dir === "right") return Math.min(prev + 1, CERTIFICATIONS.length - 1);
      return Math.max(prev - 1, 0);
    });
  };

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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            <span className="text-amber">#</span>achievements
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </motion.div>

        {/* Awards */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Trophy size={20} className="text-amber" />
            <h3 className="font-display text-xl font-bold text-ink">Awards & Honors</h3>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {AWARDS.map((award, i) => {
              const Icon = awardIcons[award.icon] ?? Trophy;
              return (
                <motion.div
                  key={award.id}
                  className="glass p-6 flex flex-col md:flex-row gap-5 group hover:border-amber/25 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Photo slot */}
                  <div
                    className="w-full md:w-44 h-28 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden shrink-0"
                    style={{ background: "rgba(245, 158, 11, 0.05)" }}
                  >
                    {award.image ? (
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-dim">
                        <ImageIcon size={22} />
                        <span className="font-mono text-[9px] tracking-wide">ADD PHOTO</span>
                      </div>
                    )}
                    <div className="scan-line opacity-20" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h4 className="font-display text-lg font-bold text-ink group-hover:text-amber transition-colors">
                        {award.title}
                      </h4>
                      <Icon size={18} className="text-amber shrink-0 mt-0.5" />
                    </div>
                    <p className="font-mono text-[11px] text-amber font-bold tracking-widest uppercase mb-1">
                      {award.type}
                    </p>
                    <p className="text-muted text-sm mb-1">{award.org}</p>
                    {award.note && <p className="text-dim text-xs font-mono mb-3">{award.note}</p>}
                    <a
                      href={award.cert}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-amber transition-colors w-fit"
                    >
                      View Certificate
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BadgeCheck size={20} className="text-amber" />
              <h3 className="font-display text-xl font-bold text-ink">
                Credentials & Certifications
              </h3>
            </div>
            <div className="flex gap-2">
              {[
                { dir: "left" as const, icon: ChevronLeft, label: "Scroll certifications left" },
                { dir: "right" as const, icon: ChevronRight, label: "Scroll certifications right" },
              ].map(({ dir, icon: Icon, label }) => (
                <button
                  key={dir}
                  onClick={() => scrollCerts(dir)}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-amber hover:border-amber/40 hover:bg-amber/8 transition-all"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={certTrackRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          >
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.id}
                className="snap-start shrink-0 w-[280px] group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="glass p-5 flex flex-col gap-4 h-full hover:border-amber/25 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] transition-all duration-300 relative overflow-hidden">
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300"
                    style={{ background: "rgba(245, 158, 11, 0.5)" }}
                  />

                  {/* Logo slot */}
                  <div
                    className="w-16 h-16 rounded-xl border border-white/8 flex items-center justify-center relative overflow-hidden"
                    style={{ background: "rgba(245, 158, 11, 0.06)" }}
                  >
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.issuer}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImageIcon size={20} className="text-dim" />
                    )}
                    <div className="scan-line opacity-15" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-muted">{cert.issuer}</span>
                      <BadgeCheck
                        size={12}
                        className="text-dim group-hover:text-amber transition-colors"
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
                    className="flex items-center gap-1 font-mono text-[11px] text-amber hover:underline w-fit transition-all"
                  >
                    Verify
                    <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Add more placeholder */}
            <div className="snap-start shrink-0 w-[280px]">
              <div className="glass border-dashed h-full flex flex-col items-center justify-center gap-2 p-6 text-center hover:border-amber/25 transition-all">
                <div
                  className="w-10 h-10 rounded-xl border border-dashed border-amber/25 flex items-center justify-center"
                  style={{ background: "rgba(245,158,11,0.06)" }}
                >
                  <span className="font-mono text-amber text-lg font-bold">+</span>
                </div>
                <p className="font-mono text-[10px] text-muted">Add more certs</p>
              </div>
            </div>
          </div>

          {/* Cert dot indicator */}
          <div className="flex justify-center gap-2 mt-5">
            {CERTIFICATIONS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === certIdx ? 18 : 6,
                  height: 6,
                  background: i === certIdx ? "#f59e0b" : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
