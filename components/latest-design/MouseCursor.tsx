"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import theme from "@/config/theme.config";

const c = theme.accent.primary;
const glow = theme.accent.glow;
const glowStrong = theme.accent.glowStrong;

type CursorState = "default" | "hover" | "click";

const TRAIL_LENGTH = 12;
const RING_LERP = 0.12;

export function MouseCursor() {
  const rafRef = useRef<number>(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -300, y: -300 })),
  );

  const stateRef = useRef<CursorState>("default");
  const prevStateRef = useRef<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    setVisible(true);
  }, []);

  const onLeave = useCallback(() => setVisible(false), []);

  const onDown = useCallback(() => {
    stateRef.current = "click";
  }, []);

  const onUp = useCallback(() => {
    const el = document.querySelector(":hover") as HTMLElement | null;
    stateRef.current = el?.closest(
      "a, button, [role='button'], input, textarea, select, label, [tabindex]",
    )
      ? "hover"
      : "default";
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    if (stateRef.current === "click") return;
    const el = e.target as HTMLElement;
    stateRef.current = el.closest(
      "a, button, [role='button'], input, textarea, select, label, [tabindex]",
    )
      ? "hover"
      : "default";
  }, []);

  useEffect(() => {
    const hasFine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!hasFine) return;

    setActive(true);
    document.body.setAttribute("data-custom-cursor", "true");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", onOver, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onOver);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onMove, onOver, onLeave, onDown, onUp]);

  useEffect(() => {
    if (!active) return;

    const canvas = trailRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const tick = () => {
      const dot = cursorRef.current;
      const ring = ringRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (dot && ring) {
        const { x: mx, y: my } = mouse.current;
        dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;

        ringPos.current.x += (mx - ringPos.current.x) * RING_LERP;
        ringPos.current.y += (my - ringPos.current.y) * RING_LERP;
        ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;

        const state = stateRef.current;
        if (state !== prevStateRef.current) {
          prevStateRef.current = state;
          if (state === "hover") {
            dot.style.opacity = "0";
            ring.style.width = "44px";
            ring.style.height = "44px";
            ring.style.opacity = "0.85";
            ring.style.boxShadow = `0 0 16px ${glowStrong}`;
          } else if (state === "click") {
            dot.style.opacity = "1";
            ring.style.width = "26px";
            ring.style.height = "26px";
            ring.style.opacity = "1";
            ring.style.boxShadow = `0 0 20px ${glowStrong}`;
          } else {
            dot.style.opacity = "1";
            ring.style.width = "36px";
            ring.style.height = "36px";
            ring.style.opacity = "0.65";
            ring.style.boxShadow = `0 0 10px ${glow}`;
          }
        }
      }

      const pts = trail.current;
      pts.unshift({ x: mouse.current.x, y: mouse.current.y });
      pts.length = TRAIL_LENGTH;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 1; i < pts.length; i++) {
        const t = 1 - i / pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = glow.replace("0.18", String((t * 0.2).toFixed(2)));
        ctx.lineWidth = t * 3;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1px solid ${c}`,
          boxShadow: `0 0 10px ${glow}`,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 0.65 : 0,
          transition:
            "width 0.18s ease, height 0.18s ease, opacity 0.4s ease, box-shadow 0.18s ease",
          willChange: "transform",
        }}
      />

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: c,
          boxShadow: `0 0 8px ${glow}`,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.08s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
