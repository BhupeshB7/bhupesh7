"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/#projects" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 220,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            width: scrolled ? "85%" : "100%",
            maxWidth: scrolled ? "1080px" : "none",
            margin: scrolled ? "30px auto 0" : "0 auto",
            padding: scrolled
              ? "0 clamp(.85rem,1.4vw,1.35rem)"
              : "0 clamp(1.25rem, 5vw, 4rem)",
            height: scrolled ? "64px" : "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: scrolled ? "999px" : "0px",
            border: scrolled
              ? "1px solid rgba(255,255,255,.12)"
              : "1px solid transparent",
            background: scrolled
              ? "linear-gradient(135deg, rgba(11,13,24,.9), rgba(7,8,15,.86))"
              : "transparent",
            boxShadow: scrolled
              ? "0 14px 36px rgba(0,0,0,.4), inset 0 0 0 1px rgba(129,140,248,.08)"
              : "none",
            backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(14px) saturate(140%)"
              : "none",
            transition: "all .35s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <Link
            href="/"
            aria-label="bhupeshb7 home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--accent-light)",
                boxShadow:
                  "0 0 10px rgba(129,140,248,.7), 0 0 20px rgba(129,140,248,.35)",
                display: "block",
                animation: "pulse-glow 2.4s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,.86)",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "var(--accent-light)" }}>@</span>bhupeshb7
            </span>
          </Link>

          <div
            className="nav-desktop-links"
            style={{ display: "flex", gap: "1.15rem", alignItems: "center" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link font-mono ${isActive(link.href) ? "is-active" : ""}`}
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="https://github.com/bhupeshb7"
              target="_blank"
              rel="noreferrer"
              className="nav-github"
              aria-label="View GitHub profile"
            >
              <span>GitHub</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="nav-mobile-toggle"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "1px solid rgba(129,140,248,.28)",
                background: "rgba(99,102,241,.12)",
                color: "rgba(255,255,255,.88)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: "15px",
                  height: "2px",
                  background: "currentColor",
                  boxShadow: menuOpen
                    ? "none"
                    : "0 -5px 0 currentColor, 0 5px 0 currentColor",
                  transform: menuOpen ? "rotate(45deg)" : "none",
                  transition: "all .25s ease",
                  position: "relative",
                }}
              >
                {menuOpen && (
                  <span
                    style={{
                      position: "absolute",
                      width: "15px",
                      height: "2px",
                      background: "currentColor",
                      transform: "rotate(90deg)",
                      left: 0,
                      top: 0,
                    }}
                  />
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 215,
          background: menuOpen ? "rgba(4,6,12,.64)" : "rgba(4,6,12,0)",
          backdropFilter: menuOpen ? "blur(5px)" : "none",
          WebkitBackdropFilter: menuOpen ? "blur(5px)" : "none",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "all .25s ease",
        }}
      />

      <aside
        aria-label="Mobile navigation drawer"
        style={{
          position: "fixed",
          top: "18px",
          right: "18px",
          bottom: "18px",
          width: "min(82vw, 320px)",
          zIndex: 230,
          borderRadius: "20px",
          border: "1px solid rgba(129,140,248,.2)",
          background:
            "linear-gradient(155deg, rgba(10,12,20,.94) 0%, rgba(7,8,15,.97) 58%), radial-gradient(90% 75% at 100% 0%, rgba(99,102,241,.1) 0%, rgba(99,102,241,0) 70%)",
          boxShadow:
            "0 26px 54px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.03)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          transform: menuOpen
            ? "translateX(0)"
            : "translateX(calc(100% + 24px))",
          transition: "transform .33s cubic-bezier(.2,.7,.2,1)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4px",
            padding: "2px 2px 10px",
            borderBottom: "1px solid rgba(129,140,248,.15)",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(129,140,248,.78)",
            }}
          >
            Navigation
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid rgba(129,140,248,.24)",
              background: "rgba(255,255,255,.03)",
              color: "rgba(255,255,255,.86)",
              fontSize: "14px",
              lineHeight: 1,
            }}
          >
            x
          </button>
        </div>

        {NAV_LINKS.map((link) => (
          <Link
            key={`m-${link.label}`}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`nav-drawer-link font-mono ${isActive(link.href) ? "is-active" : ""}`}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}

        <a
          href="https://github.com/bhupeshb7"
          target="_blank"
          rel="noreferrer"
          className="nav-drawer-cta font-mono"
          onClick={() => setMenuOpen(false)}
        >
          GitHub
          <svg
            width="11"
            height="11"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </aside>

      <style>{`
        .nav-github {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.92);
          text-decoration: none;
          border-radius: 999px;
          padding: 8px 14px;
          border: 1px solid rgba(129,140,248,.22);
          background: linear-gradient(135deg, rgba(99,102,241,.2), rgba(129,140,248,.08));
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, color .2s ease;
        }
        .nav-github:hover {
          transform: translateY(-2px);
          color: #fff;
          border-color: rgba(129,140,248,.46);
          box-shadow: 0 10px 24px rgba(99,102,241,.18);
        }
        .nav-link {
          color: rgba(255,255,255,.62);
          border-radius: 999px;
          border: 1px solid transparent;
          padding: 7px 10px;
          transition: color .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .nav-link:hover {
          color: rgba(255,255,255,.96);
          background: rgba(255,255,255,.045);
          border-color: rgba(255,255,255,.1);
        }
        .nav-link.is-active {
          color: rgba(255,255,255,.98);
          background: rgba(99,102,241,.18);
          border-color: rgba(129,140,248,.4);
          box-shadow: inset 0 0 0 1px rgba(129,140,248,.12);
        }
        .nav-drawer-link {
          text-decoration: none;
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 12px;
          border-radius: 10px;
          color: rgba(255,255,255,.74);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.015);
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }
        .nav-drawer-link:hover {
          color: rgba(255,255,255,.94);
          border-color: rgba(129,140,248,.28);
          background: rgba(129,140,248,.07);
        }
        .nav-drawer-link.is-active {
          color: rgba(255,255,255,.98);
          border-color: rgba(129,140,248,.45);
          background: linear-gradient(135deg, rgba(99,102,241,.2), rgba(129,140,248,.1));
          box-shadow: inset 0 0 0 1px rgba(129,140,248,.14);
        }
        .nav-drawer-cta {
          margin-top: auto;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.94);
          background: linear-gradient(135deg, rgba(99,102,241,.88), rgba(129,140,248,.84));
          border-radius: 10px;
          padding: 12px 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(129,140,248,.34);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nav-drawer-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(99,102,241,.22);
        }
        @media (max-width: 920px) {
          .nav-desktop-links,
          .nav-github {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
