// ─── Brand Tokens ───────────────────────────────────────────────────────────
export const COLORS = {
  accent: "#6366f1",
  accentLight: "#818cf8",
  cyan: "#00e5ff",
  bg: "#07080f",
  green: "#00ff88",
} as const;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@bhupeshb7.me";

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  "about",
  "blog",
  "journey",
  "projects",
  "activity",
  "contact",
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const ROLES = [
  "Full-Stack Engineer",
  "Open Source Builder",
  "System Architect",
  "Performance Obsessive",
  "API Craftsman",
] as const;

export const TECH_TAGS = [
  "Next.js",
  "TypeScript",
  "Rust",
  "Node.js",
  "PostgreSQL",
  "Docker",
] as const;

export const HERO_STATS = [
  { value: "1.1k+", label: "GitHub Stars" },
  { value: "40+", label: "Shipped" },
  { value: "310d", label: "Day Streak" },
  { value: "5yr+", label: "Experience" },
] as const;

export const SOCIALS = [
  { label: "GitHub", url: "https://github.com/bhupeshb7", icon: "GH" },
  { label: "LinkedIn", url: "#", icon: "LI" },
  { label: "Twitter", url: "#", icon: "TW" },
  { label: "Email", url: `mailto:${CONTACT_EMAIL}`, icon: "EM" },
  { label: "Blog", url: "#", icon: "BL" },
] as const;

export const CODE_LINES = [
  {
    indent: 0,
    tokens: [
      { t: "const", c: "#f97316" },
      { t: " developer", c: "var(--fg-high)" },
      { t: " = {", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "name:", c: "var(--fg-low)" },
      { t: ' "Bhupesh Kumar"', c: "#c084fc" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "role:", c: "var(--fg-low)" },
      { t: ' "Full-Stack Eng"', c: "#c084fc" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "stack:", c: "var(--fg-low)" },
      { t: " [", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { t: '"Next.js"', c: "#fbbf24" },
      { t: ", ", c: "var(--fg-dim)" },
      { t: '"TypeScript"', c: "#fbbf24" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { t: '"Rust"', c: "#fbbf24" },
      { t: ", ", c: "var(--fg-dim)" },
      { t: '"Node.js"', c: "#fbbf24" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  { indent: 1, tokens: [{ t: "],", c: "var(--fg-dim)" }] },
  {
    indent: 1,
    tokens: [
      { t: "open:", c: "var(--fg-low)" },
      { t: " true", c: "#f97316" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: "streak:", c: "var(--fg-low)" },
      { t: " 310", c: "#c084fc" },
      { t: ",", c: "var(--fg-dim)" },
    ],
  },
  { indent: 0, tokens: [{ t: "};", c: "var(--fg-dim)" }] },
] as const;

// ─── Activity ─────────────────────────────────────────────────────────────────
export const ACTIVITY_STATS = [
  { value: 310, suffix: "d", label: "Current Streak", color: "#f97316" },
  {
    value: 1100,
    suffix: "",
    label: "Contributions",
    color: "#c084fc",
  },
  { value: 12, suffix: "", label: "Repositories", color: "#c084fc" },
  { value: 34, suffix: "", label: "PRs Merged", color: "#34d399" },
  { value: 5, suffix: "yr", label: "Experience", color: "#fbbf24" },
] as const;

export const ACTIVITY_FEED = [
  {
    type: "commit",
    repo: "next-template",
    msg: "feat: add dark mode toggle system",
    time: "3h ago",
    icon: "↑",
  },
  {
    type: "pr",
    repo: "portfolio-v3",
    msg: "refactor: hero animation overhaul",
    time: "6h ago",
    icon: "⎇",
  },
  {
    type: "commit",
    repo: "next-template",
    msg: "fix: hydration mismatch on SSR",
    time: "1d ago",
    icon: "↑",
  },
  {
    type: "release",
    repo: "next-template",
    msg: "v1.2.0 — stable release",
    time: "2d ago",
    icon: "◈",
  },
  {
    type: "commit",
    repo: "portfolio-v3",
    msg: "perf: lazy-load below-fold sections",
    time: "3d ago",
    icon: "↑",
  },
  {
    type: "pr",
    repo: "next-template",
    msg: "chore: upgrade to Next.js 15.2",
    time: "4d ago",
    icon: "⎇",
  },
] as const;

export const TECH_STACK = [
  { label: "Next.js", pct: 95, color: "#c084fc" },
  { label: "TypeScript", pct: 90, color: "#f97316" },
  { label: "JavaScript", pct: 92, color: "#fbbf24" },
  { label: "Node.js", pct: 85, color: "#34d399" },
  { label: "CSS / Tailwind", pct: 80, color: "#c084fc" },
] as const;

export const LANGUAGES = [
  { name: "JavaScript", pct: 52, color: "#fbbf24" },
  { name: "TypeScript", pct: 35, color: "#f97316" },
  { name: "CSS", pct: 8, color: "#c084fc" },
  { name: "Other", pct: 5, color: "rgba(255,255,255,.15)" },
] as const;

export const BUILDING = [
  "portfolio-v3 — interactive dev portfolio",
  "next-template — opinionated Next.js 15 starter",
  "ui-blocks — copy-paste component library",
] as const;

// ─── About ────────────────────────────────────────────────────────────────────

export const ABOUT_BIO = {
  name: "Bhupesh Kumar",
  location: "India 🇮🇳",
  avatar: "/avatar.jpg", // replace with your actual image path
  tagline: "I don't just write code — I engineer systems that last.",
  bio: [
    "I'm a Full-Stack Engineer with 5+ years building production software — from consumer-facing web apps to distributed backend systems. I care deeply about developer experience, performance, and shipping things that actually work.",
    "My stack centres around Next.js and TypeScript on the frontend, Node.js and Rust on the backend. I'm obsessed with the intersection of great UX and clean architecture.",
    "When I'm not coding I'm writing about it — sharing what I learn in public under @bhupeshb7.",
  ],
  resumeUrl: "/bhupesh-kumar-resume.pdf",
} as const;

export const JOURNEY = [
  {
    year: "2024",
    type: "work",
    title: "Senior Full-Stack Engineer",
    org: "Freelance / Open Source",
    desc: "Building production-grade Next.js templates, open-source tooling, and client projects. 310-day GitHub streak.",
    tags: ["Next.js 15", "Rust", "TypeScript"],
  },
  {
    year: "2022",
    type: "work",
    title: "Full-Stack Engineer",
    org: "Product Startup",
    desc: "Led frontend architecture migration from CRA to Next.js App Router. Cut TTFB by 62%. Built real-time collaboration features.",
    tags: ["Next.js", "PostgreSQL", "WebSockets"],
  },
  {
    year: "2021",
    type: "work",
    title: "Frontend Engineer",
    org: "Tech Agency",
    desc: "Delivered 12+ client projects across fintech and e-commerce verticals. Introduced TypeScript company-wide.",
    tags: ["React", "TypeScript", "Node.js"],
  },
  {
    year: "2020",
    type: "edu",
    title: "B.Tech Computer Science",
    org: "University",
    desc: "Graduated with distinction. Specialised in distributed systems and algorithms. Final project: real-time collaborative editor.",
    tags: ["Algorithms", "DSA", "OS"],
  },
  {
    year: "2019",
    type: "work",
    title: "Software Intern",
    org: "Early-stage Startup",
    desc: "First real taste of production code. Built REST APIs, broke things gloriously, learned fast.",
    tags: ["Node.js", "MongoDB", "REST"],
  },
] as const;

export const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    color: "#c084fc",
    icon: "◻",
    skills: [
      { name: "Next.js", level: 5 },
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind", level: 4 },
      { name: "Framer Motion", level: 4 },
      { name: "CSS / SASS", level: 4 },
    ],
  },
  {
    label: "Backend",
    color: "#f97316",
    icon: "◼",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Rust", level: 3 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 3 },
      { name: "REST / GraphQL", level: 5 },
      { name: "Prisma", level: 4 },
    ],
  },
  {
    label: "DevOps & Tools",
    color: "#34d399",
    icon: "◈",
    skills: [
      { name: "Docker", level: 4 },
      { name: "Git / GitHub", level: 5 },
      { name: "CI / CD", level: 4 },
      { name: "Vercel / Fly.io", level: 4 },
      { name: "Linux", level: 4 },
      { name: "Bash", level: 3 },
    ],
  },
  {
    label: "Currently Learning",
    color: "#fbbf24",
    icon: "◎",
    skills: [
      { name: "WebAssembly", level: 2 },
      { name: "Go", level: 2 },
      { name: "K8s", level: 2 },
      { name: "LLM APIs", level: 3 },
    ],
  },
] as const;

export const VALUES = [
  {
    number: "01",
    title: "Ship, then iterate",
    color: "#c084fc",
    body: "A working product beats a perfect spec. I bias towards shipping, measuring, and improving — not waiting for ideal conditions that never come.",
  },
  {
    number: "02",
    title: "Code is communication",
    color: "#f97316",
    body: "I write code for humans first, machines second. Clean naming, obvious structure, and honest comments are acts of respect for your future teammates.",
  },
  {
    number: "03",
    title: "Own the whole stack",
    color: "#34d399",
    body: "Full-stack isn't a title — it's a mindset. Understanding the database when writing UI, and thinking about the browser when designing APIs, changes the quality of every decision.",
  },
  {
    number: "04",
    title: "Build in public",
    color: "#fbbf24",
    body: "Learning out loud accelerates growth and compounds trust. Every struggle shared is someone else's shortcut. Consistency over perfection, always.",
  },
] as const;

// ─── Showcase ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    name: "next-template",
    desc: "Production-ready Next.js 15 starter with TypeScript, Tailwind, auth, and CI/CD wired in. Clone and ship in minutes.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    stars: 84,
    forks: 21,
    status: "active",
    url: "https://github.com/bhupeshb7/next-template",
    accent: "#c084fc",
  },
  {
    name: "portfolio-v3",
    desc: "This site — built from scratch. Canvas animations, scroll choreography, and zero UI libraries.",
    stack: ["Next.js", "TypeScript", "Canvas API"],
    stars: 47,
    forks: 9,
    status: "active",
    url: "https://github.com/bhupeshb7/portfolio-v3",
    accent: "#f97316",
  },
] as const;

// Slim version used by ShowcaseSection's BlogCard (keep for backward-compat)
export const BLOGS = [
  {
    title: "Why I Rewrote My Portfolio in Next.js 15",
    excerpt:
      "App Router, Server Components, and partial pre-rendering changed how I think about frontend architecture.",
    date: "Dec 2024",
    readTime: "7 min",
    tags: ["Next.js", "Architecture"],
    url: "#",
  },
  {
    title: "TypeScript Patterns I Use Every Day",
    excerpt:
      "Discriminated unions, branded types, and infer — the three TypeScript features that make my code bulletproof.",
    date: "Nov 2024",
    readTime: "5 min",
    tags: ["TypeScript", "DX"],
    url: "#",
  },
] as const;

// ─── Full blog posts — used by dedicated BlogSection ─────────────────────────
// Replace dummy data with real CMS/MDX data when ready.
// `coverAccent` drives the generated cover gradient — pick any CSS color.
export const BLOG_POSTS = [
  {
    slug: "why-i-rewrote-portfolio-nextjs-15",
    featured: true,
    title: "Why I Rewrote My Portfolio in Next.js 15",
    excerpt:
      "App Router, Server Components, and partial pre-rendering completely changed how I think about frontend architecture. Here's every decision, trade-off, and performance gain — documented in real time.",
    body: "From a 4.2s LCP on the old site to 0.8s. From 280kB JS bundle to 34kB. This is the full story of migrating a production Next.js 13 app to the App Router, what broke, what surprised me, and the canvas animation system I built from scratch.",
    category: "Architecture",
    tags: ["Next.js", "Performance", "App Router"],
    date: "Dec 12, 2024",
    readTime: "7 min",
    views: "2.4k",
    coverAccent: "#6366f1",
    url: "#",
  },
  {
    slug: "typescript-patterns-everyday",
    featured: false,
    title: "TypeScript Patterns I Reach For Every Single Day",
    excerpt:
      "Discriminated unions, branded types, and the infer keyword — three patterns that eliminated entire categories of runtime bugs from my codebase.",
    body: "After five years of TypeScript I've distilled my toolkit down to a handful of patterns I return to constantly. These aren't advanced tricks — they're the fundamentals that compound.",
    category: "TypeScript",
    tags: ["TypeScript", "DX", "Patterns"],
    date: "Nov 28, 2024",
    readTime: "5 min",
    views: "1.8k",
    coverAccent: "#00e5ff",
    url: "#",
  },
  {
    slug: "rust-for-js-developers",
    featured: false,
    title: "Rust for JavaScript Developers — A Practical Entry Point",
    excerpt:
      "I spent 3 months learning Rust as a JS developer. Here's the mental model shift that finally made ownership click, and the CLI tool I built to cement it.",
    body: "Forget the borrow checker. The real unlock for JS developers learning Rust is understanding that Rust's type system is doing at compile time what you've been doing manually at runtime your entire career.",
    category: "Rust",
    tags: ["Rust", "Systems", "Learning"],
    date: "Oct 14, 2024",
    readTime: "9 min",
    views: "3.1k",
    coverAccent: "#f97316",
    url: "#",
  },
  {
    slug: "dx-obsession-tools-workflow",
    featured: false,
    title: "DX Obsession: The Tools and Workflow That Make Me 3× Faster",
    excerpt:
      "My exact setup — editor config, shell aliases, custom scripts, and the one VSCode extension combination that eliminated 80% of my context switching.",
    body: "Developer experience is not a luxury. A fast, frictionless local workflow compounds across every hour you code. This is my complete setup after five years of obsessive iteration.",
    category: "Workflow",
    tags: ["DX", "Tooling", "Productivity"],
    date: "Sep 3, 2024",
    readTime: "6 min",
    views: "4.7k",
    coverAccent: "#34d399",
    url: "#",
  },
] as const;

export type BlogPost = (typeof BLOG_POSTS)[number];

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  email: CONTACT_EMAIL,
  calendlyUrl: "https://calendly.com/bhupeshb7/30min", // replace with real link
  twitterUrl: "https://twitter.com/bhupeshb7",
  timezone: "IST (UTC+5:30)",
  responseTime: "< 24 hours",
  availability: true, // flip to false when not accepting work
  location: "India",
} as const;

export const COLLAB_TYPES = [
  {
    icon: "◻",
    color: "#c084fc",
    title: "Freelance Project",
    tagline: "You have a product. I help you ship it.",
    desc: "End-to-end frontend or full-stack builds. I embed in your team, align with your existing stack, and deliver production-ready code with tests, docs, and zero hand-holding required.",
    details: [
      "Next.js / React apps",
      "API design & integration",
      "Performance audits",
      "From MVP to scale",
    ],
    cta: "Start a project",
  },
  {
    icon: "◈",
    color: "#f97316",
    title: "Technical Consulting",
    tagline: "Stuck? Let's solve it in one session.",
    desc: "Architecture reviews, code audits, hiring pipeline advice, or just a second pair of eyes on a hard problem. Book a 30-minute Calendly call and come with the problem — leave with a plan.",
    details: [
      "Architecture review",
      "Code & DX audit",
      "Tech stack decisions",
      "Hiring & team structure",
    ],
    cta: "Book 30 min call",
    calendly: true,
  },
  {
    icon: "⎇",
    color: "#34d399",
    title: "Open Source Collaboration",
    tagline: "Building something in public? Let's contribute.",
    desc: "I actively contribute to tools I use daily. If you maintain a Next.js, TypeScript, or Rust project and need a consistent, high-quality contributor — open an issue or DM me.",
    details: [
      "Bug fixes & features",
      "Documentation",
      "Performance improvements",
      "Long-term maintainership",
    ],
    cta: "Open an issue",
  },
  {
    icon: "★",
    color: "#fbbf24",
    title: "Content & Writing",
    tagline: "Technical content that developers trust.",
    desc: "Sponsored posts, technical tutorials, product reviews, or co-written deep dives for developer-focused products. I only write about tools I genuinely use — no hollow promotions.",
    details: [
      "Sponsored blog posts",
      "Tutorial series",
      "Product reviews",
      "Video scripts / outlines",
    ],
    cta: "Discuss content",
  },
] as const;

export const WORK_PROCESS = [
  {
    step: "01",
    color: "#c084fc",
    title: "Discovery call",
    dur: "30 min",
    desc: "We talk through the problem, the timeline, the budget, and the team. I ask a lot of questions — the more context I have upfront, the fewer surprises later.",
  },
  {
    step: "02",
    color: "#f97316",
    title: "Proposal & scope",
    dur: "1–2 days",
    desc: "You get a written proposal with a clear scope, milestone breakdown, delivery timeline, and a fixed or capped budget. No ambiguity, no scope creep.",
  },
  {
    step: "03",
    color: "#34d399",
    title: "Build & ship",
    dur: "Agreed timeline",
    desc: "Weekly async updates. Code in a private repo with your access from day one. I push to production — not just a zip file. You can review and merge at every milestone.",
  },
  {
    step: "04",
    color: "#fbbf24",
    title: "Handoff & support",
    dur: "2 weeks post-ship",
    desc: "Full docs, recorded walkthrough, and 2 weeks of included bug-fix support. You own everything — code, domain, infrastructure. No lock-in, ever.",
  },
] as const;

export const CONTACT_SOCIALS = [
  {
    label: "GitHub",
    url: "https://github.com/bhupeshb7",
    handle: "@bhupeshb7",
    color: "#c084fc",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/bhupeshb7",
    handle: "@bhupeshb7",
    color: "#f97316",
  },
  { label: "LinkedIn", url: "#", handle: "bhupesh-kumar", color: "#818cf8" },
  {
    label: "Email",
    url: `mailto:${CONTACT_EMAIL}`,
    handle: CONTACT_EMAIL,
    color: "#34d399",
  },
] as const;

export const HIGHLIGHTS = [
  {
    icon: "◈",
    color: "#34d399",
    label: "Open Source",
    value: "12 repos",
    sub: "all public, all documented",
  },
  {
    icon: "⎇",
    color: "#f97316",
    label: "Available For",
    value: "Freelance",
    sub: "frontend & full-stack work",
  },
  {
    icon: "★",
    color: "#fbbf24",
    label: "GitHub Stars",
    value: "1.1k+",
    sub: "across all repositories",
  },
  {
    icon: "↗",
    color: "#c084fc",
    label: "Response Time",
    value: "< 24h",
    sub: "emails & DMs",
  },
] as const;
