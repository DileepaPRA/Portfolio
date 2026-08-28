"use client";

import { motion } from "motion/react";
import { GraduationCap, Calendar, Star } from "lucide-react";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import { TIMELINE, PERSONAL_INFO } from "../../lib/data";

export default function EducationSection() {
  return (
    <section
      id="education"
      data-section="education"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#3b82f6" variant="c" icons={SECTION_ICONS.education} />

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
            <span className="text-blue">#</span>education
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-10 md:pl-14">
          {/* Vertical line */}
          <div className="absolute left-0 top-4 bottom-0 w-px bg-gradient-to-b from-blue/80 via-blue/20 to-transparent" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="relative mb-10 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-10 md:-left-14 top-6">
                <div
                  className="w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-all"
                  style={{
                    background: "#060c1a",
                    borderColor: item.current ? "#3b82f6" : "#384d6c",
                    boxShadow: item.current
                      ? "0 0 18px rgba(59, 130, 246, 0.6)"
                      : "none",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.current ? "#3b82f6" : "#384d6c" }}
                  />
                </div>
              </div>

              <div
                className="glass p-7 group hover:border-blue/25 transition-all duration-300"
                style={{
                  boxShadow: item.current
                    ? "0 4px 30px rgba(59, 130, 246, 0.06)"
                    : "none",
                }}
              >
                {/* Corner decoration */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                  style={{ background: "#3b82f6" }}
                />

                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex-grow">
                    {/* Period */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={12} className="text-blue" />
                      <span className="font-mono text-[11px] text-blue font-bold tracking-widest uppercase">
                        {item.period}
                      </span>
                      {item.current && (
                        <span
                          className="px-2 py-0.5 rounded-full font-mono text-[9px] tracking-wider font-bold"
                          style={{
                            background: "rgba(59, 130, 246, 0.15)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-1 group-hover:text-blue transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-muted font-medium mb-4">{item.institution}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.badges.map((b) => (
                        <span
                          key={b}
                          className="px-3 py-1 rounded-full font-mono text-xs font-semibold border flex items-center gap-1"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            borderColor: "rgba(59, 130, 246, 0.25)",
                          }}
                        >
                          {item.current && b.startsWith("CGPA") && (
                            <Star size={10} fill="currentColor" />
                          )}
                          {b}
                        </span>
                      ))}
                    </div>

                    <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* Logo */}
                  <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-white/8 bg-surface flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.institution}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UoM highlight */}
        <motion.div
          className="mt-12 glass p-6 flex items-center gap-4 hover:border-blue/25 transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
            }}
          >
            <GraduationCap size={22} className="text-blue" />
          </div>
          <div>
            <p className="font-mono text-[11px] text-blue tracking-widest font-bold uppercase mb-1">
              {PERSONAL_INFO.academicStanding.title}
            </p>
            <p className="text-muted text-sm">
              Consistently on the <span className="text-blue font-semibold">{PERSONAL_INFO.academicStanding.highlight}</span>{" "}
              — L1S1, L1S2, L2S1 at University of Moratuwa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
