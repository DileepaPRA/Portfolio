"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowDown, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = PERSONAL_INFO.roles;
    if (!roles || roles.length === 0) return;
    const current = roles[roleIdx % roles.length];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 85);
      } else {
        // Full word typed -> Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        // Deleting backward
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 45);
      } else {
        // Finished deleting -> Advance to next role and restart typing
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIdx]);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-16 lg:pl-20"
    >
      <SectionAmbient color="#4edea3" variant="a" icons={SECTION_ICONS.hero} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.p
          className="font-mono text-xs text-emerald tracking-[0.25em] uppercase mb-6 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          System.User // Initialized
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.08] tracking-[-0.03em] mb-4"
          initial="hidden"
          animate="show"
          custom={0.2}
          variants={fadeUp}
        >
          Hi, I&apos;m <span className="text-emerald">{PERSONAL_INFO.name}</span>
        </motion.h1>

        <motion.div
          className="font-display text-2xl md:text-4xl font-bold mb-3 h-12 flex items-center justify-center gap-2"
          initial="hidden"
          animate="show"
          custom={0.4}
          variants={fadeUp}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-teal">
            {displayText}
          </span>
          <span className="w-[3px] h-8 bg-teal rounded-full blink" />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted font-medium mt-2 mb-10"
          initial="hidden"
          animate="show"
          custom={0.5}
          variants={fadeUp}
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* Social row */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial="hidden"
          animate="show"
          custom={0.6}
          variants={fadeUp}
        >
          {SOCIAL_LINKS.map(({ id, href, label, color, external }) => {
            const Icon = SOCIAL_ICONS[id] || Mail;
            return (
              <a
                key={id}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface/70 backdrop-blur-md text-muted font-mono text-xs tracking-wide transition-all duration-300 hover:scale-105 shadow-sm"
                style={{ "--glow": color } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--glow)";
                  el.style.borderColor = `${color}50`;
                  el.style.background = `${color}15`;
                  el.style.boxShadow = `0 0 20px ${color}28`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "";
                  el.style.borderColor = "";
                  el.style.background = "";
                  el.style.boxShadow = "";
                }}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            );
          })}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial="hidden"
          animate="show"
          custom={0.7}
          variants={fadeUp}
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3 rounded-xl font-mono text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(78,222,163,0.35)]"
            style={{
              background: "linear-gradient(135deg, #4edea3, #10b981)",
              color: "#060c1a",
            }}
          >
            View Projects
            <ArrowDown size={15} />
          </a>
          <a
            href={PERSONAL_INFO.resumeUrl}
            target={PERSONAL_INFO.resumeUrl.startsWith("http") ? "_blank" : undefined}
            rel={PERSONAL_INFO.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            download={
              PERSONAL_INFO.resumeUrl.endsWith(".pdf") ? "Dileepa_Prabhath_CV.pdf" : undefined
            }
            className="flex items-center gap-2 px-7 py-3 rounded-xl font-mono text-sm font-bold border border-border bg-surface/70 backdrop-blur-md text-ink transition-all duration-300 hover:scale-105 hover:border-border-hi shadow-sm"
          >
            <FileText size={15} />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dim"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
