"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import theme from "@/config/theme.config";
import { CONTACT, NAV_LINKS } from "@/config/contact.config";

const c = theme.accent.primary;

function IconGithub() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconWhatsappFloat() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FooterBg() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 50%, ${theme.bg.muted} 100%)`,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ft-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="ft-m">
            <rect width="1200" height="480" fill="url(#ft-fade)" />
          </mask>
          <pattern
            id="ft-diag"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="28"
              stroke={`${c}0f`}
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="ft-mesh"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="40"
              y2="0"
              stroke={`${c}08`}
              strokeWidth="0.4"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke={`${c}08`}
              strokeWidth="0.4"
            />
          </pattern>
        </defs>

        <rect
          width="1200"
          height="480"
          fill="url(#ft-diag)"
          mask="url(#ft-m)"
        />
        <rect
          width="1200"
          height="480"
          fill="url(#ft-mesh)"
          mask="url(#ft-m)"
        />

        <g mask="url(#ft-m)">
          <path
            d="M 80 390 C 110 340, 180 310, 230 330 C 285 352, 300 400, 260 430 C 220 458, 130 450, 90 420 C 60 400, 55 430, 80 390 Z"
            fill={`${c}07`}
          />
          <path
            d="M 920 300 C 960 250, 1040 240, 1090 270 C 1145 305, 1150 370, 1100 400 C 1050 428, 970 420, 935 390 C 900 360, 890 340, 920 300 Z"
            fill={`${c}06`}
          />
          <path
            d="M 530 380 C 570 340, 640 330, 680 355 C 720 380, 715 430, 670 450 C 625 468, 555 455, 530 428 C 508 404, 500 415, 530 380 Z"
            fill={`${c}05`}
          />
          <path
            d="M 340 260 C 365 225, 420 218, 455 240 C 492 264, 490 310, 458 332 C 425 352, 365 344, 342 318 C 320 294, 318 292, 340 260 Z"
            fill={`${c}05`}
          />
          <path
            d="M 780 180 C 808 148, 858 142, 892 162 C 928 184, 924 226, 895 245 C 864 263, 810 255, 788 232 C 768 210, 755 210, 780 180 Z"
            fill={`${c}04`}
          />

          <circle cx="160" cy="300" r="55" fill={`${c}04`} />
          <circle cx="1060" cy="420" r="70" fill={`${c}04`} />
          <circle cx="600" cy="240" r="40" fill={`${c}03`} />

          <path
            d="M 0 440 C 60 430, 100 415, 140 418 C 175 421, 190 435, 220 432 C 255 429, 270 412, 310 410"
            stroke={`${c}12`}
            strokeWidth="0.6"
          />
          <path
            d="M 890 395 C 940 388, 980 370, 1030 372 C 1075 374, 1100 390, 1150 385 C 1180 382, 1195 375, 1220 372"
            stroke={`${c}12`}
            strokeWidth="0.6"
          />
          <path
            d="M 430 460 C 480 452, 520 438, 570 440 C 615 442, 640 455, 690 450 C 730 446, 760 435, 800 432"
            stroke={`${c}10`}
            strokeWidth="0.6"
          />

          <circle cx="230" cy="330" r="1.8" fill={`${c}22`} />
          <circle cx="1090" cy="270" r="1.8" fill={`${c}20`} />
          <circle cx="680" cy="355" r="1.6" fill={`${c}18`} />
          <circle cx="455" cy="240" r="1.4" fill={`${c}16`} />
          <circle cx="892" cy="162" r="1.4" fill={`${c}14`} />
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 110%, ${theme.accent.glow}, transparent 68%)`,
        }}
      />
    </>
  );
}

function SocialLink({
  href,
  label,
  icon,
  external = true,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
      style={{
        color: theme.text.muted,
        background: theme.surface[1],
        border: `1px solid ${theme.border.soft}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = c;
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          theme.accent.border;
        (e.currentTarget as HTMLAnchorElement).style.background =
          theme.accent.tint;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = theme.text.muted;
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          theme.border.soft;
        (e.currentTarget as HTMLAnchorElement).style.background =
          theme.surface[1];
      }}
    >
      {icon}
    </a>
  );
}

type NavLinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
};

function FooterNavItem({ label, href, icon, external = false }: NavLinkItem) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-2.5 py-2 text-[13px] transition-all duration-200 w-full overflow-hidden"
      style={{ color: hovered ? theme.text.primary : theme.text.secondary }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-md flex-shrink-0 transition-all duration-200"
        style={{
          color: hovered ? c : theme.text.muted,
          background: hovered ? theme.accent.tint : theme.surface[1],
          border: `1px solid ${hovered ? theme.accent.border : theme.border.soft}`,
        }}
      >
        {icon}
      </span>
      <span className="flex-1 leading-none">{label}</span>
      {external && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            opacity: hovered ? 0.5 : 0,
            color: theme.text.muted,
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
        >
          <path
            d="M2.5 1H11V9.5M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span
        className="absolute bottom-0 left-0 h-px transition-all duration-300"
        style={{
          width: hovered ? "100%" : "0%",
          background: `linear-gradient(90deg, ${c}60, ${c}18)`,
        }}
      />
    </a>
  );
}

const PAGE_NAV_LINKS: NavLinkItem[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "/#about",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/#projects",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

const SERVICES_LINKS: NavLinkItem[] = [
  {
    label: "Full Stack Development",
    href: "/#services",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "AI Integrations",
    href: "/#services",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Backend Architecture",
    href: "/#services",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "Consulting",
    href: "/#contact",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const LEGAL_LINKS: NavLinkItem[] = [
  {
    label: "Privacy Policy",
    href: "/privacy",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Terms of Service",
    href: "/terms",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Cookie Policy",
    href: "/cookies",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
  {
    label: "Sitemap",
    href: "/sitemap.xml",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    external: true,
  },
];

const REACH_OUT_LINKS: NavLinkItem[] = [
  {
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    external: false,
  },
  {
    label: "GitHub",
    href: CONTACT.github,
    icon: <IconGithub />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    icon: <IconLinkedin />,
    external: true,
  },
  {
    label: "Twitter / X",
    href: CONTACT.twitter,
    icon: <IconTwitter />,
    external: true,
  },
];

function FooterColumnHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="text-[9px] font-semibold tracking-[0.22em] uppercase"
        style={{ color: theme.text.muted, fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      <span
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${theme.border.soft}, transparent)`,
        }}
      />
    </div>
  );
}

export function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);
  const waHref = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#25D366",
          boxShadow: hovered
            ? "0 6px 28px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.4)"
            : "0 4px 18px rgba(37,211,102,0.3), 0 2px 6px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.25s ease, transform 0.2s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          color: "#fff",
        }}
      >
        <IconWhatsappFloat />
        <motion.div
          initial={false}
          animate={
            hovered
              ? { opacity: 1, x: 0, pointerEvents: "none" }
              : { opacity: 0, x: 6, pointerEvents: "none" }
          }
          transition={{ duration: 0.18, ease: "easeOut" } as Transition}
          className="absolute right-[60px] flex items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold"
            style={{
              background: theme.surface[2],
              border: `1px solid ${theme.border.soft}`,
              color: theme.text.primary,
              fontFamily: "'DM Mono', monospace",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#25D366" }}
            />
            Start Chat
          </div>
          <div
            className="w-0 h-0 absolute -right-1.5"
            style={{
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: `6px solid ${theme.border.soft}`,
            }}
          />
        </motion.div>
      </a>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, amount: 0.08 });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.5, delay, ease: "easeOut" } as Transition,
  });

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <FooterBg />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent.border} 35%, ${theme.accent.border} 65%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="py-14 lg:py-16 grid lg:grid-cols-[1.1fr_2fr] gap-10 lg:gap-16 items-start">
          <motion.div {...fadeUp(0)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{
                    color: theme.text.primary,
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  Bhupesh Kumar
                </span>
                <span
                  className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
                  style={{
                    color: theme.accent.text,
                    background: theme.accent.tint,
                    border: `1px solid ${theme.accent.border}`,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ background: c }}
                  />
                  {CONTACT.availability}
                </span>
              </div>
              <p
                className="text-[13.5px] leading-relaxed max-w-xs"
                style={{ color: theme.text.secondary }}
              >
                Full Stack Engineer — backend architecture, AI integrations,
                product engineering. Building software that scales and lasts.
              </p>
              <span
                className="flex items-center gap-1.5 text-[11px] mt-1"
                style={{
                  color: theme.text.muted,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                <svg
                  width="9"
                  height="11"
                  viewBox="0 0 10 13"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 115 3.5 1.5 1.5 0 015 6.5z"
                    fill={`${c}70`}
                  />
                </svg>
                {CONTACT.location}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <SocialLink
                href={CONTACT.github}
                label="GitHub"
                icon={<IconGithub />}
              />
              <SocialLink
                href={CONTACT.linkedin}
                label="LinkedIn"
                icon={<IconLinkedin />}
              />
              <SocialLink
                href={CONTACT.twitter}
                label="Twitter"
                icon={<IconTwitter />}
              />
              <SocialLink
                href={`mailto:${CONTACT.email}`}
                label="Email"
                icon={<IconEmail />}
                external={false}
              />

              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 flex items-center gap-1.5 px-3 h-8 rounded-lg text-[11px] font-semibold transition-all duration-200"
                style={{
                  color: "#25D366",
                  background: "rgba(37,211,102,0.07)",
                  border: "1px solid rgba(37,211,102,0.22)",
                  fontFamily: "'DM Mono', monospace",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(37,211,102,0.14)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(37,211,102,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(37,211,102,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(37,211,102,0.22)";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:pl-8 lg:border-l"
            style={{ borderColor: theme.border.soft }}
          >
            <div className="flex flex-col">
              <FooterColumnHeader label="Pages" />
              <div className="flex flex-col">
                {PAGE_NAV_LINKS.map((link) => (
                  <FooterNavItem key={link.label} {...link} />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <FooterColumnHeader label="Services" />
              <div className="flex flex-col">
                {SERVICES_LINKS.map((link) => (
                  <FooterNavItem key={link.label} {...link} />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <FooterColumnHeader label="Reach Out" />
              <div className="flex flex-col">
                {REACH_OUT_LINKS.map((link) => (
                  <FooterNavItem key={link.label} {...link} />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <FooterColumnHeader label="Legal" />
              <div className="flex flex-col">
                {LEGAL_LINKS.map((link) => (
                  <FooterNavItem key={link.label} {...link} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.3 } as Transition}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4"
          style={{ borderTop: `1px solid ${theme.border.soft}` }}
        >
          <span
            className="text-[11px]"
            style={{
              color: theme.text.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            © {new Date().getFullYear()} {CONTACT.name}
          </span>
          <span
            className="text-[11px] flex items-center gap-1"
            style={{
              color: theme.text.muted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Designed & built by
            <span style={{ color: c }}>&nbsp;Bhupesh Kumar</span>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
