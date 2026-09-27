"use client";

import { useEffect, useState, useCallback, useRef, memo } from "react";
import { motion } from "motion/react";
import { Mail, ArrowDown, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";
import AsciiAvatar from "../ui/AsciiAvatar";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

/* ── Predetermined scatter positions for each hero element ──
 * Fixed values ensure the animation is consistent and cinematic every load.
 * Coordinates are relative offsets in px from final position. */
const STORM_POSITIONS = {
  systemLabel: { x: -200, y: -180, rotate: -25 },
  heading: { x: 150, y: -250, rotate: 18 },
  roleTypewriter: { x: -280, y: 120, rotate: -35 },
  tagline: { x: 200, y: 200, rotate: 22 },
  socialRow: { x: -180, y: 280, rotate: -15 },
  ctaButtons: { x: 250, y: -100, rotate: 30 },
  avatar: { x: 40, y: -10, rotate: 0 },
  scrollIndicator: { x: 0, y: 300, rotate: 0 },
} as const;

/* ── Spring physics for the magnetic assembly (smoother & slightly slower glide) ── */
const ASSEMBLY_SPRING = {
  type: "spring" as const,
  stiffness: 52,
  damping: 13,
  mass: 1.1,
};

const STORM_BASE_DELAY = 0.08;
const STORM_STAGGER = 0.16;

/* ── Pre-computed static variants (zero allocation during render) ──
 * Hardware-accelerated CSS transforms (x, y, rotate, scale, opacity) */
function buildStormVariant(pos: { x: number; y: number; rotate: number }, staggerIndex: number) {
  return {
    initial: {
      x: pos.x,
      y: pos.y,
      rotate: pos.rotate,
      scale: 0.7,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        ...ASSEMBLY_SPRING,
        delay: STORM_BASE_DELAY + staggerIndex * STORM_STAGGER,
      },
    },
  };
}

const STORM_VARIANTS = {
  systemLabel: buildStormVariant(STORM_POSITIONS.systemLabel, 0),
  heading: buildStormVariant(STORM_POSITIONS.heading, 1),
  roleTypewriter: buildStormVariant(STORM_POSITIONS.roleTypewriter, 2),
  tagline: buildStormVariant(STORM_POSITIONS.tagline, 3),
  socialRow: buildStormVariant(STORM_POSITIONS.socialRow, 4),
  ctaButtons: buildStormVariant(STORM_POSITIONS.ctaButtons, 5),
  scrollIndicator: buildStormVariant(STORM_POSITIONS.scrollIndicator, 6),
} as const;

/* ── Isolated Typewriter Subcomponent ──
 * Manages its own rapid state updates (every 45-85ms) without re-rendering
 * HeroSection, SectionAmbient, or any sibling motion components. */
interface HeroTypewriterProps {
  canCycle?: boolean;
}

const HeroTypewriter = memo(function HeroTypewriter({ canCycle = false }: HeroTypewriterProps) {
  const roles = PERSONAL_INFO.roles || ["Software Engineer"];
  const initialRole = roles[0] || "Software Engineer";
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState(initialRole);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // While initial sequence or glitch is running, stay locked on "Software Engineer"
    if (!canCycle) {
      setDisplayText(initialRole);
      setRoleIdx(0);
      setIsDeleting(false);
      return;
    }

    if (!roles || roles.length === 0) return;
    const current = roles[roleIdx % roles.length];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 85);
      } else {
        // Hold on current role for 2.2s before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [canCycle, displayText, isDeleting, roleIdx, roles, initialRole]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-teal">
      {displayText}
    </span>
  );
});

interface HeroSectionProps {
  onStormComplete?: () => void;
}

export default function HeroSection({ onStormComplete }: HeroSectionProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [startStorm, setStartStorm] = useState(false);
  const [canCycleRoles, setCanCycleRoles] = useState(false);
  const hasGlitchedRef = useRef(false);

  // ── SEQUENCE STEP 3: Reveal Navbars FIRST, then trigger Glitch AFTER ──
  const triggerGlitch = useCallback(() => {
    if (hasGlitchedRef.current) return;
    hasGlitchedRef.current = true;

    // 1. Reveal side and top navigation bars first!
    onStormComplete?.();

    // 2. Clear noticeable pause after navigation bars settle before triggering the glitch!
    setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        // Glitch has finished! Now allow the typewriter roles to start changing!
        setCanCycleRoles(true);
      }, 950);
    }, 950);
  }, [onStormComplete]);

  // ── SEQUENCE STEP 1 -> STEP 2: ASCII Completes -> Start Storm Assembly! ──
  const handleAsciiComplete = useCallback(() => {
    setStartStorm(true);
  }, []);

  // ── SEQUENCE STEP 2 -> STEP 3: Storm Assembly Completes -> Trigger Glitch! ──
  const handleAssemblyComplete = useCallback(() => {
    if (!startStorm) return;
    triggerGlitch();
  }, [startStorm, triggerGlitch]);

  useEffect(() => {
    // If mobile (where ASCII is hidden), start storm landing immediately
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setStartStorm(true);
      return;
    }

    // Desktop safe fallback: start storm if ASCII animation is delayed
    const stormFallback = setTimeout(() => {
      setStartStorm(true);
    }, 1650);

    // Desktop safe fallback: trigger glitch if assembly is delayed
    const glitchFallback = setTimeout(triggerGlitch, 4200);

    return () => {
      clearTimeout(stormFallback);
      clearTimeout(glitchFallback);
    };
  }, [triggerGlitch]);

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-16 lg:pl-20"
    >
      <SectionAmbient color="#4edea3" variant="a" icons={SECTION_ICONS.hero} />

      {/* ── Storm RGB Glitch Flash Overlay (Triggers on step 3) ── */}
      {isGlitching && (
        <div className="absolute inset-0 z-30 pointer-events-none mix-blend-screen rgb-flash" />
      )}

      {/* Main content — centered with balanced gap */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-10 xl:gap-14">
        {/* Left: Text & Actions — storms in after ASCII completes */}
        <div className="flex-1 text-center lg:text-left w-full max-w-xl lg:max-w-2xl lg:translate-x-2 xl:translate-x-4">
          {/* System.User label */}
          <motion.p
            className="font-mono text-xs text-emerald tracking-[0.25em] uppercase mb-5 opacity-80"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.systemLabel}
          >
            <span className={`inline-block ${isGlitching ? "name-glitch-highlight" : ""}`}>
              System.User // Initialized
            </span>
          </motion.p>

          {/* Main heading — highlights intensely during glitch */}
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-[74px] xl:text-[80px] font-extrabold leading-[1.08] tracking-[-0.03em] mb-4"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.heading}
          >
            <span className={`inline-block ${isGlitching ? "name-glitch-highlight" : ""}`}>
              Hi, I&apos;m <span className="text-emerald">{PERSONAL_INFO.name}</span>
            </span>
          </motion.h1>

          {/* Role typewriter (isolated subcomponent for zero re-render overhead) */}
          <motion.div
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 h-12 flex items-center justify-center lg:justify-start gap-2"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.roleTypewriter}
          >
            <span
              className={`flex items-center gap-2 ${isGlitching ? "name-glitch-highlight" : ""}`}
            >
              <HeroTypewriter canCycle={canCycleRoles} />
              <span className="w-[3px] h-8 bg-teal rounded-full blink" />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-emerald/90 font-medium mt-1 mb-8"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.tagline}
          >
            <span className={`inline-block ${isGlitching ? "name-glitch-highlight" : ""}`}>
              {PERSONAL_INFO.tagline}
            </span>
          </motion.p>

          {/* Social row — highlighted buttons with enhanced glow and borders */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 mb-10"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.socialRow}
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
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-surface/85 backdrop-blur-md text-ink/90 font-mono text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_22px_var(--glow)]"
                  style={{ "--glow": color } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "var(--glow)";
                    el.style.borderColor = `${color}70`;
                    el.style.background = `${color}20`;
                    el.style.boxShadow = `0 0 22px ${color}40`;
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

          {/* CTA buttons — triggers assembly complete -> fires glitch */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            initial="initial"
            animate={startStorm ? "animate" : "initial"}
            variants={STORM_VARIANTS.ctaButtons}
            onAnimationComplete={handleAssemblyComplete}
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-sm font-bold transition-all duration-300 hover:scale-105 border border-white/20 shadow-[0_0_24px_rgba(78,222,163,0.4)] hover:shadow-[0_0_36px_rgba(78,222,163,0.6)]"
              style={{
                background: "linear-gradient(135deg, #5efbc0 0%, #10b981 100%)",
                color: "#050b16",
              }}
            >
              View Projects
              <ArrowDown size={15} />
            </a>
            <div className="relative group">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-sm font-bold border border-border/50 bg-surface/40 backdrop-blur-md text-muted/60 opacity-50 cursor-not-allowed select-none shadow-none"
                title="CV will be attached soon"
              >
                <FileText size={15} />
                <span>Download CV</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted/70">
                  Soon
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Pure Developer Syntax ASCII Portrait (STEP 1: Plays first on mount) */}
        <div className="hidden lg:flex shrink-0 items-center justify-center py-4 lg:py-0 lg:-translate-x-2 xl:-translate-x-4">
          <AsciiAvatar startTrigger={true} onComplete={handleAsciiComplete} />
        </div>
      </div>

      {/* Scroll indicator — storms in with the left side */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial="initial"
        animate={startStorm ? "animate" : "initial"}
        variants={STORM_VARIANTS.scrollIndicator}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 animate-bounce group cursor-pointer text-emerald/75 hover:text-emerald transition-colors"
          aria-label="Scroll to About section"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] font-medium">SCROLL</span>
          <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
