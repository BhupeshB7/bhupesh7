"use client";

import { useEffect, useRef } from "react";

// ─── Circuit Background ────────────────────────────────────────────────────────
export function CircuitBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, t = 0;

    type Node = { x: number; y: number; connections: number[]; pulse: number; pulseDir: number };
    let nodes: Node[] = [];

    const buildNodes = () => {
      nodes = [];
      const cols = Math.ceil(W / 90) + 1;
      const rows = Math.ceil(H / 90) + 1;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          nodes.push({
            x: c * 90 + (Math.random() - 0.5) * 28,
            y: r * 90 + (Math.random() - 0.5) * 28,
            connections: [],
            pulse:    Math.random(),
            pulseDir: Math.random() > 0.5 ? 1 : -1,
          });
        }
      }
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (i === j) return;
          if (Math.hypot(n.x - m.x, n.y - m.y) < 130 && Math.random() > 0.55) {
            n.connections.push(j);
          }
        });
      });
    };

    const resize = () => {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width  = W;
      cv.height = H;
      buildNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      nodes.forEach((n) => {
        n.pulse += n.pulseDir * 0.008;
        if (n.pulse > 1 || n.pulse < 0) n.pulseDir *= -1;
      });

      // Draw edges
      nodes.forEach((n) => {
        n.connections.forEach((j) => {
          const m = nodes[j];
          const alpha = 0.04 + n.pulse * 0.04;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          const corner = Math.abs(n.x - m.x) > 20 && Math.abs(n.y - m.y) > 20;
          if (corner && Math.random() > 0.3) {
            ctx.lineTo(m.x, n.y);
            ctx.lineTo(m.x, m.y);
          } else {
            ctx.lineTo(m.x, m.y);
          }
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8 + n.pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${0.12 + n.pulse * 0.18})`;
        ctx.fill();
      });

      // Scan line
      const scanY = ((t * 60) % (H + 100)) - 50;
      const g = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      g.addColorStop(0,   "rgba(99,102,241,0)");
      g.addColorStop(0.5, "rgba(99,102,241,0.025)");
      g.addColorStop(1,   "rgba(99,102,241,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, scanY - 60, W, 120);

      raf.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ─── Particle Canvas (interactive, mouse-reactive) ────────────────────────────
export function ParticleCanvas() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const raf   = useRef<number>(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, t = 0;

    type P = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; sz: number; a: number; sp: number };
    let pts: P[] = [];

    const resize = () => {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width  = W;
      cv.height = H;
      pts = [];
      const n = Math.min(Math.floor((W * H) / 9000), 100);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, sz: Math.random() * 1.4 + 0.3, a: Math.random() * 0.28 + 0.05, sp: Math.random() * 0.3 + 0.05 });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;
      const { x: mx, y: my } = mouse.current;

      for (const p of pts) {
        p.ox += Math.sin(t + p.sp * 10) * 0.1;
        p.oy += Math.cos(t * 0.65 + p.sp * 8) * 0.08;
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 90) { const f = (90 - d) / 90; p.vx += (dx / d) * f * 2; p.vy += (dy / d) * f * 2; }
        p.vx *= 0.91; p.vy *= 0.91;
        p.x = p.ox + p.vx; p.y = p.oy + p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${p.a})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.05 * (1 - d / 80)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}

// ─── Floating Glyphs ──────────────────────────────────────────────────────────
const GLYPHS = ["</>", "fn()", "git", "=>", "async", "null", "true", "[]", "&&", "||", "??", "{}", "===", "npm", "0x1", "API"];

export function FloatingGlyphs() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, t = 0;

    type Glyph = { x: number; y: number; char: string; vy: number; alpha: number; size: number; phase: number };
    let glyphs: Glyph[] = [];

    const resize = () => {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width  = W;
      cv.height = H;
      glyphs = [];
      const n = Math.floor(W / 150);
      for (let i = 0; i < n; i++) {
        glyphs.push({
          x: Math.random() * W, y: Math.random() * H,
          char:  GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          vy:    0.12 + Math.random() * 0.22,
          alpha: Math.random() * 0.055 + 0.015,
          size:  9 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.01;
      for (const g of glyphs) {
        g.y -= g.vy;
        g.x += Math.sin(t * 0.4 + g.phase) * 0.15;
        if (g.y < -20) { g.y = H + 10; g.x = Math.random() * W; }
        const fadeY = Math.min(1, Math.min(g.y / 80, (H - g.y) / 80));
        ctx.globalAlpha  = g.alpha * fadeY;
        ctx.fillStyle    = "#818cf8";
        ctx.font         = `400 ${g.size}px 'JetBrains Mono', monospace`;
        ctx.fillText(g.char, g.x, g.y);
      }
      ctx.globalAlpha  = 1;
      raf.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}
