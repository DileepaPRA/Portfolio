"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  angle: number;
  angleSpeed: number;
  aspect: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Props {
  sectionColor: [number, number, number];
}

export default function DustCanvas({ sectionColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const targetColorRef = useRef<[number, number, number]>([...sectionColor]);
  const currentColorRef = useRef<[number, number, number]>([...sectionColor]);
  const rafRef = useRef(0);

  useEffect(() => {
    targetColorRef.current = [...sectionColor];
  }, [sectionColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles
    particlesRef.current = Array.from({ length: 95 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 2.8 + 0.8,
      opacity: 0,
      baseOpacity: Math.random() * 0.3 + 0.04,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.008,
      aspect: Math.random() * 1.8 + 0.6,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.004,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Spawn cursor sparkles (cap at 40)
      if (sparklesRef.current.length < 40) {
        for (let i = 0; i < 2; i++) {
          sparklesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8 - 0.6,
            life: 1,
            maxLife: Math.random() * 0.6 + 0.25,
            size: Math.random() * 1.8 + 0.4,
          });
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      if (!canvas || !ctx) return;
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth color lerp
      const cc = currentColorRef.current;
      const tc = targetColorRef.current;
      cc[0] += (tc[0] - cc[0]) * 0.012;
      cc[1] += (tc[1] - cc[1]) * 0.012;
      cc[2] += (tc[2] - cc[2]) * 0.012;
      const [r, g, b] = cc.map(Math.round);

      // Draw dust particles
      for (const p of particlesRef.current) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140 && dist > 0) {
          const force = ((140 - dist) / 140) * 0.45;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angleSpeed;
        p.pulsePhase += p.pulseSpeed;

        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.y < -30) p.y = canvas.height + 30;
        if (p.y > canvas.height + 30) p.y = -30;

        p.opacity = Math.min(p.opacity + 0.006, p.baseOpacity);
        const pulse = 0.65 + 0.35 * Math.sin(p.pulsePhase);
        const alpha = p.opacity * pulse;
        const radius = p.size * Math.max(p.aspect, 1) * 2.2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, 1 / p.aspect);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${alpha * 0.25})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw cursor sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => s.life > 0);
      for (const s of sparklesRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04;
        s.vx *= 0.97;
        s.life -= 0.025 / s.maxLife;

        const alpha = Math.max(0, s.life) * 0.95;
        const sr = s.size * 3.5;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, sr);
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.55})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, sr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ contain: "strict", willChange: "transform" }}
    />
  );
}
