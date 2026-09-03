"use client";

import { Terminal, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { SOCIAL_LINKS, PERSONAL_INFO } from "../../lib/data";

const FOOTER_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="relative z-10 lg:ml-20 border-t border-border bg-void/80 backdrop-blur-xl transition-colors duration-300 py-5 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Terminal size={14} className="text-emerald" />
            <span className="font-mono font-bold text-emerald text-xs tracking-tight">
              DevShell
            </span>
          </div>
          <span className="text-muted/40 text-xs hidden sm:inline">•</span>
          <p className="font-mono text-[11px] text-muted">{PERSONAL_INFO.name}</p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ id, label, href, external }) => {
            const Icon = FOOTER_ICONS[id] || Mail;
            return (
              <a
                key={id}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-muted hover:text-emerald transition-colors p-2"
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="font-mono text-[10px] text-dim flex items-center gap-1.5">
          © {new Date().getFullYear()} Built with{" "}
          <Heart size={10} className="text-ruby" fill="currentColor" /> & precision
        </p>
      </div>
    </footer>
  );
}
