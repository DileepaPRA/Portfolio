"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { SOCIAL_LINKS, PERSONAL_INFO } from "../../lib/data";
import SectionAmbient from "../background/SectionAmbient";
import { SECTION_ICONS } from "../../lib/sectionIcons";

const CONTACT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contactList = [
    ...SOCIAL_LINKS.map((link) => ({
      href: link.href,
      icon: CONTACT_ICONS[link.id] || Mail,
      label: link.username,
      color: link.color,
      external: link.external,
    })),
    {
      href: "#",
      icon: MapPin,
      label: PERSONAL_INFO.location,
      color: "#a855f7",
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      data-section="contact"
      className="relative py-28 px-6 md:px-12 overflow-hidden lg:pl-20"
    >
      <SectionAmbient color="#00d4b4" variant="d" icons={SECTION_ICONS.contact} />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-muted mb-2 flex gap-1">
            <span className="text-teal">root</span>
            <span>@dileepa:~/portfolio/contact$</span>
            <span className="text-ink animate-pulse">ping —</span>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
              <span className="text-teal">#</span>contacts
            </h2>
            <div className="h-px bg-white/10 flex-grow max-w-xs" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-muted mb-8 max-w-md leading-relaxed">
              Open to new opportunities — career roles, freelance projects, or
              collaborations. Have a question or an idea? Let's connect.
            </p>

            {/* Info terminal */}
            <div className="terminal">
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-dim">info.json</span>
                <div className="w-14" />
              </div>

              <div className="p-6 space-y-4">
                {contactList.map(({ href, icon: Icon, label, color, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 font-mono text-sm text-muted transition-colors group hover:text-ink"
                    style={{ "--item-color": color } as React.CSSProperties}
                  >
                    <Icon size={15} className="group-hover:scale-110 transition-transform" style={{ color }} />
                    <span className="group-hover:underline">{label}</span>
                  </a>
                ))}

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    target={PERSONAL_INFO.resumeUrl.startsWith("http") ? "_blank" : undefined}
                    rel={PERSONAL_INFO.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={PERSONAL_INFO.resumeUrl.endsWith(".pdf") ? "Dileepa_Prabhath_CV.pdf" : undefined}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-sm font-bold transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,212,180,0.25)]"
                    style={{
                      background: "linear-gradient(135deg, #00d4b4, #00b89c)",
                      color: "#060c1a",
                    }}
                  >
                    <FileText size={15} />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="terminal">
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-dim">contact.sh</span>
                <div className="w-14" />
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {[
                  { key: "name", id: "contact-name", label: "$> enter_name", type: "text", placeholder: "John Doe" },
                  { key: "email", id: "contact-email", label: "$> enter_email", type: "email", placeholder: "john@example.com" },
                ].map(({ key, id, label, type, placeholder }) => (
                  <div key={key}>
                    <label
                      htmlFor={id}
                      className="block font-mono text-xs font-bold mb-1.5 tracking-widest text-teal"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-transparent border-0 border-b border-white/10 py-2 font-mono text-sm text-ink placeholder-dim/50 outline-none transition-colors focus:border-teal"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-bold mb-1.5 tracking-widest text-teal"
                  >
                    ${">"} enter_message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Hello world..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-transparent border-0 border-b border-white/10 py-2 font-mono text-sm text-ink placeholder-dim/50 outline-none resize-none transition-colors focus:border-teal"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border border-teal text-teal bg-transparent transition-all duration-300 hover:scale-105 hover:bg-teal hover:text-[#060c1a] hover:shadow-[0_0_22px_rgba(0,212,180,0.3)]"
                >
                  {sent ? (
                    "✓ Sent!"
                  ) : (
                    <>
                      ./send_message.sh
                      <Send size={13} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
