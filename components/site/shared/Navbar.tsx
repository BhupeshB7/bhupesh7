"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import theme from "@/config/theme.config";
import { NAV_LINKS } from "@/config/contact.config";

const ac = theme.accent.primary;

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group select-none"
      aria-label="Home"
    >
      <div
        className="relative w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
        style={{
          background: theme.accent.tintStrong,
          border: `1px solid ${theme.accent.border}`,
          boxShadow: `0 0 12px ${ac}22`,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: ac }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={
            { duration: 2, repeat: Infinity, ease: "easeInOut" } as Transition
          }
        />
      </div>
      <span
        className="text-[15px] font-bold tracking-tight transition-colors duration-200"
        style={{
          color: theme.text.primary,
          fontFamily: "Syne, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        BHUPESH
        <span style={{ color: ac }}>B7</span>
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  onClick,
  active,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group text-[15px] font-medium transition-colors duration-200"
      style={{
        color: active ? theme.text.primary : theme.text.secondary,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
        {label}
      </span>
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
        style={{ background: `linear-gradient(90deg, ${ac}, transparent)` }}
      />
    </Link>
  );
}

function CTA({ onClick }: { onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/work-with-me"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 overflow-hidden"
      style={{
        color: hovered ? theme.accent.primaryForeground : ac,
        background: hovered ? ac : theme.accent.tintStrong,
        border: `1px solid ${theme.accent.border}`,
        fontFamily: "'DM Mono', monospace",
        boxShadow: hovered ? `0 0 20px ${ac}40` : "none",
      }}
    >
      Work With Me
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        className="transition-transform duration-200"
        style={{ transform: hovered ? "translateX(2px)" : "translateX(0)" }}
      >
        <path
          d="M2 6H10M7 3L10 6L7 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

function MobileDrawer({
  open,
  onClose,
  activeSection,
}: {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 } as Transition}
            onClick={onClose}
          />

          <motion.aside
            key="drawer"
            className="fixed top-0 left-0 z-50 h-full flex flex-col"
            style={{
              width: "min(80vw, 300px)",
              background: `${theme.bg.base}ee`,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              borderRight: `1px solid ${theme.border.soft}`,
              boxShadow: `4px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 ${ac}12`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={
              { duration: 0.32, ease: [0.32, 0.72, 0, 1] } as Transition
            }
          >
            <div
              className="absolute inset-y-0 right-0 w-px"
              style={{
                background: `linear-gradient(to bottom, transparent, ${ac}30 30%, ${ac}18 70%, transparent)`,
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 120% 60% at 50% 0%, ${ac}12, transparent 70%)`,
              }}
            />

            <div
              className="flex items-center justify-between px-5 py-5"
              style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
            >
              <Logo />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                style={{
                  background: theme.surface[1],
                  border: `1px solid ${theme.border.soft}`,
                  color: theme.text.muted,
                }}
                aria-label="Close menu"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    { duration: 0.28, delay: 0.06 + i * 0.06 } as Transition
                  }
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 group"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? ac
                        : theme.text.secondary,
                    background:
                      activeSection === link.href.slice(1)
                        ? theme.accent.tintStrong
                        : "transparent",
                    border: `1px solid ${
                      activeSection === link.href.slice(1)
                        ? theme.accent.border
                        : "transparent"
                    }`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200"
                    style={{
                      background:
                        activeSection === link.href.slice(1)
                          ? ac
                          : theme.border.medium,
                    }}
                  />
                  {link.label}
                  <svg
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6H10M7 3L10 6L7 9"
                      stroke={ac}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.32 } as Transition}
              className="px-4 pb-6"
            >
              <a
                href="/work-with-me"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[12px] font-semibold transition-all duration-200"
                style={{
                  background: ac,
                  color: theme.accent.primaryForeground,
                  fontFamily: "'DM Mono', monospace",
                  boxShadow: `0 0 24px ${ac}40`,
                }}
              >
                Work With Me
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6H10M7 3L10 6L7 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="flex items-center gap-2 mt-4 justify-center">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: ac }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    color: theme.text.muted,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Available for new projects
                </span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
      />

      <div className="fixed inset-x-0 top-0 z-30 flex justify-center pointer-events-none px-4 lg:px-0">
        <motion.header
          initial={false}
          animate={scrolled ? { y: 15, opacity: 1 } : { y: 0, opacity: 1 }}
          transition={
            { duration: 0.35, ease: [0.32, 0.72, 0, 1] } as Transition
          }
          className="pointer-events-auto w-full"
          style={{
            maxWidth: scrolled ? "80rem" : "1400px",
            margin: "0 auto",
            borderRadius: scrolled ? "9999px" : "0px",
            transition:
              "max-width 0.35s cubic-bezier(0.32,0.72,0,1), border-radius 0.35s cubic-bezier(0.32,0.72,0,1), box-shadow 0.35s ease",
          }}
        >
          <div
            className="relative overflow-hidden transition-all duration-350"
            style={{
              borderRadius: "inherit",
              background: scrolled ? `${theme.bg.base}cc` : "transparent",
              backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
              WebkitBackdropFilter: scrolled
                ? "blur(20px) saturate(180%)"
                : "none",
              border: scrolled
                ? `1px solid ${theme.border.soft}`
                : "1px solid transparent",
              padding: scrolled ? "5px" : "0",
              boxShadow: scrolled
                ? `0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 0.5px ${ac}15`
                : "none",
            }}
          >
            {scrolled && (
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 10%, ${ac}40 50%, transparent 90%)`,
                }}
              />
            )}

            {scrolled && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 80% at 50% -20%, ${ac}08, transparent 60%)`,
                }}
              />
            )}

            <div
              className="relative flex items-center justify-between"
              style={{
                padding: scrolled ? "0 20px" : "0 24px",
                height: scrolled ? "48px" : "64px",
                transition:
                  "height 0.35s cubic-bezier(0.32,0.72,0,1), padding 0.35s ease",
              }}
            >
              <Logo />

              <nav className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={activeSection === link.href.slice(1)}
                  />
                ))}
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                {scrolled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 } as Transition}
                    className="flex items-center gap-1.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: ac }}
                    />
                    <span
                      className="text-[10px]"
                      style={{
                        color: theme.text.muted,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      Available
                    </span>
                  </motion.div>
                )}
                <CTA />
              </div>

              <button
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                style={{
                  background: theme.surface[1],
                  border: `1px solid ${theme.border.soft}`,
                  color: theme.text.secondary,
                }}
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <line
                    x1="0"
                    y1="1"
                    x2="14"
                    y2="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="2"
                    y1="6"
                    x2="14"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4"
                    y1="11"
                    x2="14"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.header>
      </div>
    </>
  );
}
