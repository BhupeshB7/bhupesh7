"use client";

import { useEffect, useRef } from "react";
import { COLORS } from "@/lib/constants";

const TRAIL_LENGTH = 14;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef      = useRef<HTMLDivElement[]>([]);
  const posRef       = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  );
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build trail dots
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const d = document.createElement("div");
      d.className = "trail-dot";
      d.style.background =
        i < 4  ? COLORS.accent :
        i < 8  ? COLORS.accentLight :
                 "rgba(99,102,241,0.3)";
      container.appendChild(d);
      dotsRef.current[i] = d;
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.setAttribute("data-custom-cursor", "true");

    const loop = () => {
      posRef.current[0] = { ...mouseRef.current };

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        posRef.current[i] = {
          x: posRef.current[i].x + (posRef.current[i - 1].x - posRef.current[i].x) * 0.42,
          y: posRef.current[i].y + (posRef.current[i - 1].y - posRef.current[i].y) * 0.42,
        };
      }

      dotsRef.current.forEach((d, i) => {
        const s = 1 - i / TRAIL_LENGTH;
        d.style.transform = `translate(${posRef.current[i].x - 3}px, ${posRef.current[i].y - 3}px) scale(${s})`;
        d.style.opacity   = String(s * 0.55);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.body.removeAttribute("data-custom-cursor");
      dotsRef.current.forEach((d) => d.remove());
      dotsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
