"use client";

import { motion } from "motion/react";
import { Terminal, Layers, Cpu, Database, Cloud, Wrench } from "lucide-react";
import { SKILLS, LEARNING_NOW } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Programming: Terminal,
  Frontend: Layers,
  Backend: Cpu,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Tools & Platforms": Wrench,
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      data-section="skills"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#4edea3" variant="d" icons={SECTION_ICONS.skills} />
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
            <span className="text-emerald">#</span>skills-tools
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([category, skills], i) => {
            const Icon = categoryIcons[category] || Terminal;
            return (
              <motion.div
                key={category}
                className="glass p-6 group hover:border-emerald/25 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-emerald/25"
                    style={{ background: "rgba(78, 222, 163, 0.1)" }}
                  >
                    <Icon size={16} className="text-emerald" />
                  </div>
                  <h3 className="font-display font-bold text-ink text-sm">{category}</h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const isPrimary = !!skill.primary;
                    return (
                      <span
                        key={skill.name}
                        className="px-2.5 py-1 rounded-lg font-mono text-xs font-semibold border transition-all duration-200"
                        style={
                          isPrimary
                            ? {
                                background: "rgba(78, 222, 163, 0.12)",
                                color: "#4edea3",
                                borderColor: "rgba(78, 222, 163, 0.28)",
                              }
                            : {
                                background: "rgba(255, 255, 255, 0.03)",
                                color: "#6b80a0",
                                borderColor: "rgba(255, 255, 255, 0.06)",
                              }
                        }
                      >
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Currently learning */}
        <motion.div
          className="mt-8 glass p-5 flex items-center gap-4 border-dashed hover:border-teal/30 transition-all"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold tracking-wider shrink-0"
            style={{
              background: "rgba(0, 212, 180, 0.1)",
              color: "#00d4b4",
              border: "1px solid rgba(0, 212, 180, 0.25)",
            }}
          >
            LEARNING NOW
          </div>
          <div className="flex flex-wrap gap-2">
            {LEARNING_NOW.map((t) => (
              <span
                key={t}
                className="font-mono text-xs text-muted border border-white/8 px-2.5 py-1 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
