"use client";

import { JSX, useEffect, useRef } from "react";
import theme from "@/config/theme.config";

type Props = {
  containerId?: string;
  containerRef?: React.RefObject<HTMLElement>;
};

export default function CustomScrollbar({
  containerId,
  containerRef,
}: Props): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isContainer = containerId != null || containerRef != null;

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const trackEl = track;
    const thumbEl = thumb;

    const containerEl = containerRef?.current ??
      (containerId ? document.getElementById(containerId) : null);

    const target = containerEl ?? document.documentElement;
    const useContainer = Boolean(containerEl);

    function updateThumb(): void {
      const scrollHeight = useContainer
        ? (target as HTMLElement).scrollHeight
        : document.documentElement.scrollHeight;
      const clientHeight = useContainer
        ? (target as HTMLElement).clientHeight
        : window.innerHeight;

      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) {
        thumbEl.style.opacity = "0";
        return;
      }

      const scrolled = useContainer
        ? (target as HTMLElement).scrollTop / scrollable
        : window.scrollY / scrollable;

      const trackH = trackEl.clientHeight;
      const thumbH = Math.max(
        30,
        (clientHeight / scrollHeight) * trackH,
      );

      thumbEl.style.height = `${thumbH}px`;
      thumbEl.style.top = `${scrolled * (trackH - thumbH)}px`;
      thumbEl.style.opacity = "1";
    }

    if (useContainer) {
      (target as HTMLElement).addEventListener("scroll", updateThumb);
      window.addEventListener("resize", updateThumb);
    } else {
      window.addEventListener("scroll", updateThumb);
      window.addEventListener("resize", updateThumb);
    }

    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe(trackEl);
    if (useContainer) {
      resizeObserver.observe(target as HTMLElement);
    } else {
      resizeObserver.observe(document.documentElement);
    }

    const mutationObserver = useContainer
      ? new MutationObserver(updateThumb)
      : null;

    if (mutationObserver) {
      mutationObserver.observe(target as HTMLElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    updateThumb();

    return () => {
      if (useContainer) {
        (target as HTMLElement).removeEventListener("scroll", updateThumb);
        window.removeEventListener("resize", updateThumb);
      } else {
        window.removeEventListener("scroll", updateThumb);
        window.removeEventListener("resize", updateThumb);
      }
      resizeObserver.disconnect();
      mutationObserver?.disconnect();
    };
  }, [containerId, containerRef]);

  const baseTrackStyle: React.CSSProperties = isContainer
    ? {
        position: "absolute",
        right: "8px",
        top: "8px",
        bottom: "8px",
        width: "6px",
        borderRadius: "9999px",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      }
    : {
        position: "fixed",
        right: "4px",
        top: "4px",
        bottom: "4px",
        width: "4px",
        borderRadius: "9999px",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      };

  const thumbStyle: React.CSSProperties = isContainer
    ? {
        position: "absolute",
        width: "6px",
        borderRadius: "9999px",
        background: theme.accent.primary,
        transition: "height 120ms linear, top 120ms linear",
      }
    : {
        position: "absolute",
        width: "4px",
        borderRadius: "9999px",
        background: theme.accent.primary,
        transition: "height 120ms linear, top 120ms linear",
      };

  return (
    <div ref={trackRef} style={baseTrackStyle}>
      <div ref={thumbRef} style={thumbStyle} />
    </div>
  );
}
