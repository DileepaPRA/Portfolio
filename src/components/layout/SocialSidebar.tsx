"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { SOCIAL_LINKS } from "../../lib/data";

const SIDEBAR_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export default function SocialSidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 z-40 flex-col items-center justify-between py-8">
      {/* Top spacer for nav */}
      <div className="mt-16" />

      {/* Social icons */}
      <div className="flex flex-col items-center gap-5">
        {SOCIAL_LINKS.map(({ id, label, href, color, external }) => {
          const Icon = SIDEBAR_ICONS[id] || Mail;
          return (
            <a
              key={id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="group relative p-3 rounded-xl border border-white/5 bg-white/[0.02] text-muted transition-all duration-300 hover:scale-110"
              style={{ "--glow": color } as React.CSSProperties}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = color;
                el.style.borderColor = `${color}50`;
                el.style.boxShadow = `0 0 18px ${color}30`;
                el.style.background = `${color}10`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "";
                el.style.borderColor = "";
                el.style.boxShadow = "";
                el.style.background = "";
              }}
            >
              <Icon style={{ width: 18, height: 18 }} />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#111d34] border border-white/10 text-ink font-mono text-[10px] tracking-wide px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </a>
          );
        })}

        {/* Vertical line */}
        <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </aside>
  );
}
