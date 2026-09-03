"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusLog, setStatusLog] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6173dc34-ae3b-42bf-a410-7c847606ebca";

    setStatus("loading");
    setStatusLog("initializing handshake... transmitting payload to SMTP gateway...");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: `${form.name} (Portfolio Contact)`,
          subject: `[Portfolio Contact] Message from ${form.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusLog("[STATUS 200 OK] Payload delivered successfully to d.prabath115@gmail.com ✓");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setStatusLog(null);
        }, 7000);
      } else {
        setStatus("error");
        setStatusLog(`[ERROR] Transmission failed: ${data.message || "Please try again"}`);
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }
    } catch {
      setStatus("error");
      setStatusLog("[NETWORK ERROR] Gateway unreachable. Please check connection and retry.");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
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
              Open to new opportunities — career roles, freelance projects, or collaborations. Have
              a question or an idea? Let&apos;s connect.
            </p>

            {/* Info terminal */}
            <div className="terminal rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-surface/60 border-b border-border backdrop-blur-md">
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
                    <Icon
                      size={15}
                      className="group-hover:scale-110 transition-transform"
                      style={{ color }}
                    />
                    <span className="group-hover:underline">{label}</span>
                  </a>
                ))}

                <div className="pt-4 border-t border-border">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    target={PERSONAL_INFO.resumeUrl.startsWith("http") ? "_blank" : undefined}
                    rel={
                      PERSONAL_INFO.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    download={
                      PERSONAL_INFO.resumeUrl.endsWith(".pdf")
                        ? "Dileepa_Prabhath_CV.pdf"
                        : undefined
                    }
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
            <div className="terminal rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-surface/60 border-b border-border backdrop-blur-md">
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
                  {
                    key: "name",
                    id: "contact-name",
                    label: "$> enter_name",
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    key: "email",
                    id: "contact-email",
                    label: "$> enter_email",
                    type: "email",
                    placeholder: "john@example.com",
                  },
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
                      className="w-full bg-transparent border-0 border-b border-border py-2 font-mono text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-teal"
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
                    className="w-full bg-transparent border-0 border-b border-border py-2 font-mono text-sm text-ink placeholder:text-muted/50 outline-none resize-none transition-colors focus:border-teal"
                    required
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-lg border transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                      borderColor:
                        status === "success"
                          ? "#10b981"
                          : status === "error"
                            ? "#f43f5e"
                            : "#00d4b4",
                      color:
                        status === "success"
                          ? "#10b981"
                          : status === "error"
                            ? "#f43f5e"
                            : "#00d4b4",
                      background:
                        status === "success"
                          ? "rgba(16, 185, 129, 0.12)"
                          : status === "error"
                            ? "rgba(244, 63, 94, 0.12)"
                            : "transparent",
                      boxShadow:
                        status === "success" ? "0 0 20px rgba(16, 185, 129, 0.25)" : undefined,
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        ./send_message.sh [transmitting...]
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 size={13} />✓ Delivered!
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle size={13} />✕ Retry ./send_message.sh
                      </>
                    ) : (
                      <>
                        ./send_message.sh
                        <Send size={13} />
                      </>
                    )}
                  </button>

                  {/* Terminal Console Output */}
                  {statusLog && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-xs p-3 rounded-lg border bg-surface/80 backdrop-blur-md flex items-start gap-2 leading-relaxed"
                      style={{
                        borderColor:
                          status === "success"
                            ? "rgba(16, 185, 129, 0.4)"
                            : status === "error"
                              ? "rgba(244, 63, 94, 0.4)"
                              : "rgba(0, 212, 180, 0.4)",
                        color:
                          status === "success"
                            ? "#10b981"
                            : status === "error"
                              ? "#f43f5e"
                              : "#00d4b4",
                      }}
                    >
                      <span className="font-bold shrink-0">&gt;</span>
                      <span>{statusLog}</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
