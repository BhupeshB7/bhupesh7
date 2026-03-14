"use client";

import { ExternalLink, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* ── Desktop / Scrolled pill nav ─────────────────────────────── */}
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
            width: scrolled ? "78%" : "100%",
            maxWidth: scrolled ? "1020px" : "none",
            margin: scrolled ? "20px auto 0" : "0 auto",
            padding: scrolled
              ? "0 clamp(1rem, 1.5vw, 1.5rem)"
              : "0 clamp(1.5rem, 5vw, 4rem)",
            height: scrolled ? "58px" : "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: scrolled ? "16px" : "0px",
            border: scrolled
              ? "1px solid rgba(139,92,246,.18)"
              : "1px solid transparent",
            background: scrolled ? "rgba(6,4,14,.88)" : "transparent",
            boxShadow: scrolled
              ? "0 0 0 1px rgba(139,92,246,.08), 0 8px 32px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04)"
              : "none",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(180%)"
              : "none",
            transition: "all .4s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="bhupeshb7 home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #c084fc, #7c3aed)",
                boxShadow:
                  "0 0 12px rgba(192,132,252,.9), 0 0 28px rgba(124,58,237,.5)",
                display: "block",
                flexShrink: 0,
                animation: "orb-pulse 2.8s ease-in-out infinite",
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "11.5px",
                letterSpacing: "0.07em",
                color: "rgba(255,255,255,.9)",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#c084fc" }}>@</span>bhupeshb7
            </span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-pill-link font-mono ${isActive(link.href) ? "active" : ""}`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="https://github.com/bhupeshb7"
              target="_blank"
              rel="noreferrer"
              className="github-btn font-mono"
              aria-label="View GitHub profile"
            >
              <span>GitHub</span>
              <ExternalLink size={10} strokeWidth={2} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="hamburger-btn"
            >
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Backdrop ────────────────────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 215,
          background: menuOpen ? "rgba(2,2,10,.75)" : "rgba(2,2,10,0)",
          backdropFilter: menuOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: menuOpen ? "blur(6px)" : "none",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "all .3s ease",
        }}
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <aside
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          bottom: "16px",
          width: "min(80vw, 300px)",
          zIndex: 230,
          borderRadius: "20px",
          border: "1px solid rgba(139,92,246,.22)",
          background:
            "linear-gradient(160deg, rgba(10,6,22,.97) 0%, rgba(6,4,14,.99) 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,.03), -24px 0 80px rgba(0,0,0,.6), 0 0 60px rgba(124,58,237,.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transform: menuOpen
            ? "translateX(0) scale(1)"
            : "translateX(calc(100% + 32px)) scale(.95)",
          opacity: menuOpen ? 1 : 0,
          transition:
            "transform .38s cubic-bezier(.16,1,.3,1), opacity .3s ease",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Purple glow blob inside drawer */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            marginBottom: "8px",
            borderBottom: "1px solid rgba(139,92,246,.12)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #c084fc, #7c3aed)",
                boxShadow: "0 0 10px rgba(192,132,252,.8)",
                display: "block",
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "9px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(192,132,252,.7)",
              }}
            >
              Menu
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="drawer-close-btn"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav links in drawer */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={`m-${link.label}`}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`drawer-link font-mono ${isActive(link.href) ? "active" : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{ animationDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              <span className="drawer-link-index font-mono">0{i + 1}</span>
              <span>{link.label}</span>
              {isActive(link.href) && (
                <span
                  aria-hidden="true"
                  style={{
                    marginLeft: "auto",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#c084fc",
                    boxShadow: "0 0 8px rgba(192,132,252,.8)",
                    flexShrink: 0,
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Drawer footer */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <a
            href="https://github.com/bhupeshb7"
            target="_blank"
            rel="noreferrer"
            className="drawer-github-btn font-mono"
            onClick={() => setMenuOpen(false)}
          >
            <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </aside>

      {/* ── All styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── Orb pulse ─────────────────────────────────────── */
        @keyframes orb-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(192,132,252,.9), 0 0 24px rgba(124,58,237,.4); }
          50%       { box-shadow: 0 0 18px rgba(192,132,252,1),  0 0 40px rgba(124,58,237,.7); }
        }

        @keyframes drawer-in {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Desktop nav link pills ────────────────────────── */
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-pill-link {
          position: relative;
          font-size: 10px;
          letter-spacing: .12em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255,255,255,.45);
          padding: 7px 13px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: color .2s ease, background .2s ease, border-color .25s ease, box-shadow .25s ease;
          overflow: hidden;
        }

        /* Shimmer layer */
        .nav-pill-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(192,132,252,.08) 50%, transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }

        .nav-pill-link:hover {
          color: rgba(255,255,255,.95);
          background: rgba(139,92,246,.1);
          border-color: rgba(139,92,246,.25);
          box-shadow: 0 0 0 3px rgba(139,92,246,.06);
        }

        .nav-pill-link:hover::before {
          opacity: 1;
        }

        .nav-pill-link.active {
          color: #e9d5ff;
          background: linear-gradient(135deg, rgba(109,40,217,.28), rgba(139,92,246,.16));
          border-color: rgba(167,139,250,.35);
          box-shadow: 0 0 0 3px rgba(139,92,246,.08), inset 0 1px 0 rgba(255,255,255,.06);
        }

        /* Active underline accent */
        .nav-pill-link.active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #c084fc, #818cf8);
          box-shadow: 0 0 6px rgba(192,132,252,.6);
        }

        /* ── GitHub button ─────────────────────────────────── */
        .github-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.88);
          text-decoration: none;
          border-radius: 8px;
          padding: 7px 13px;
          border: 1px solid rgba(139,92,246,.3);
          background: linear-gradient(135deg, rgba(109,40,217,.22), rgba(139,92,246,.1));
          transition: all .25s ease;
          position: relative;
          overflow: hidden;
        }

        .github-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(192,132,252,.12), transparent);
          opacity: 0;
          transition: opacity .25s ease;
        }

        .github-btn:hover {
          color: #fff;
          border-color: rgba(192,132,252,.55);
          box-shadow: 0 4px 20px rgba(124,58,237,.25), 0 0 0 3px rgba(139,92,246,.1);
          transform: translateY(-1px);
        }

        .github-btn:hover::after { opacity: 1; }

        /* ── Hamburger ─────────────────────────────────────── */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4.5px;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(139,92,246,.28);
          background: rgba(109,40,217,.1);
          cursor: pointer;
          transition: background .2s, border-color .2s, box-shadow .2s;
          padding: 0;
        }

        .hamburger-btn:hover {
          background: rgba(109,40,217,.2);
          border-color: rgba(167,139,250,.45);
          box-shadow: 0 0 0 3px rgba(139,92,246,.1);
        }

        .bar {
          display: block;
          width: 16px;
          height: 1.5px;
          border-radius: 99px;
          background: rgba(255,255,255,.85);
          transition: transform .3s cubic-bezier(.16,1,.3,1), opacity .2s ease, width .3s ease;
          transform-origin: center;
        }

        /* ── Drawer close ──────────────────────────────────── */
        .drawer-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(139,92,246,.2);
          background: rgba(255,255,255,.03);
          color: rgba(255,255,255,.7);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s, transform .2s;
        }

        .drawer-close-btn:hover {
          background: rgba(139,92,246,.12);
          border-color: rgba(192,132,252,.4);
          color: #e9d5ff;
          transform: rotate(90deg);
        }

        /* ── Drawer nav links ──────────────────────────────── */
        .drawer-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          font-size: 10.5px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,.55);
          padding: 11px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          transition: color .22s ease, background .22s ease, border-color .22s ease, transform .2s ease;
          position: relative;
          overflow: hidden;
        }

        .drawer-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(180deg, #c084fc, #7c3aed);
          opacity: 0;
          transition: opacity .2s ease;
        }

        .drawer-link:hover {
          color: rgba(255,255,255,.92);
          background: rgba(139,92,246,.08);
          border-color: rgba(139,92,246,.18);
          transform: translateX(2px);
        }

        .drawer-link:hover::before {
          opacity: 1;
        }

        .drawer-link.active {
          color: #e9d5ff;
          background: linear-gradient(135deg, rgba(109,40,217,.22), rgba(139,92,246,.1));
          border-color: rgba(167,139,250,.3);
        }

        .drawer-link.active::before {
          opacity: 1;
        }

        .drawer-link-index {
          font-size: 8px;
          color: rgba(192,132,252,.45);
          letter-spacing: .08em;
          flex-shrink: 0;
          min-width: 16px;
        }

        .drawer-link.active .drawer-link-index {
          color: rgba(192,132,252,.7);
        }

        /* ── Drawer GitHub ─────────────────────────────────── */
        .drawer-github-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, rgba(109,40,217,.9), rgba(139,92,246,.85));
          border: 1px solid rgba(167,139,250,.35);
          border-radius: 10px;
          padding: 12px 16px;
          transition: transform .2s ease, box-shadow .2s ease;
          position: relative;
          overflow: hidden;
        }

        .drawer-github-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.08), transparent);
          pointer-events: none;
        }

        .drawer-github-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(124,58,237,.35), 0 0 0 1px rgba(192,132,252,.25);
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 900px) {
          .nav-desktop-links,
          .github-btn {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
