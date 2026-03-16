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

// ─── Replace / merge into your existing constants.ts ─────────────────────────

export const CONTACT_MOBILE = process.env.NEXT_PUBLIC_MOBILE || "+918581869783";

export const CONTACT_INFO = {
  email: CONTACT_EMAIL,
  mobile: CONTACT_MOBILE,
  calendlyUrl: "https://calendly.com/bhupeshb7/30min",
  twitterUrl: "https://twitter.com/bhupeshb7",
  timezone: "IST (UTC+5:30)",
  responseTime: "< 2 hours",
  availability: true,
  location: "India",
} as const;

// ─── 4 developer-only collab types — plain language ──────────────────────────
export const COLLAB_TYPES = [
  {
    color: "#c084fc",
    title: "Backend Development",
    tagline: "APIs, databases, server-side logic.",
    desc: "Node.js, PostgreSQL, Redis, REST/GraphQL. I can build from scratch or jump into an existing codebase.",
    details: [
      "REST & GraphQL APIs",
      "Database design",
      "Auth & security",
      "Performance tuning",
    ],
    cta: "Let's talk",
  },
  {
    color: "#00e5ff",
    title: "Gen AI Integration",
    tagline: "Add AI to your product.",
    desc: "LLM APIs (OpenAI, Anthropic), RAG pipelines, embeddings, vector DBs. I help you ship AI features that actually work.",
    details: [
      "LLM API integration",
      "RAG & embeddings",
      "Vector databases",
      "Prompt engineering",
    ],
    cta: "Let's talk",
  },
  {
    color: "#f97316",
    title: "Frontend & Full-Stack",
    tagline: "End-to-end product builds.",
    desc: "Next.js, React, TypeScript. I can own the full stack — from UI to database — or just the frontend layer.",
    details: [
      "Next.js / React apps",
      "Full-stack builds",
      "UI/UX implementation",
      "API integration",
    ],
    cta: "Let's talk",
  },
  {
    color: "#34d399",
    title: "Bug Fixing & Deployment",
    tagline: "Something broken? I'll fix it.",
    desc: "Debugging, performance issues, deployment pipelines, Docker, CI/CD. I work fast on specific problems.",
    details: [
      "Debugging & fixes",
      "Docker & deployment",
      "CI/CD pipelines",
      "Code review",
    ],
    cta: "Let's talk",
  },
] as const;

// ─── Work process — 3 steps, plain language ───────────────────────────────────
export const WORK_PROCESS = [
  {
    step: "01",
    color: "#c084fc",
    title: "You reach out",
    dur: "5 min",
    desc: "Send a message or call. Tell me what you're building and what you need. No long forms.",
  },
  {
    step: "02",
    color: "#f97316",
    title: "We talk",
    dur: "< 2 hrs",
    desc: "I reply fast. We get on a quick call or chat to understand the scope. I'll be direct about what's possible.",
  },
  {
    step: "03",
    color: "#34d399",
    title: "I build it",
    dur: "Agreed timeline",
    desc: "Clean code, regular updates, and I don't disappear. You get working software, not excuses.",
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

// ─── Projects ─────────────────────────────────────────────────────────────────
// Add this to your existing constants.ts — replaces the slim PROJECTS array

export const PROJECTS = [
  {
    id: "next-template",
    featured: true,
    type: "solo",
    name: "next-template",
    tagline: "Clone and ship in minutes.",
    image: null, // e.g. "/projects/next-template.png" — set when you have a screenshot
    desc: "Production-ready Next.js 15 starter with TypeScript, Tailwind v4, auth (NextAuth), Prisma ORM, CI/CD GitHub Actions, and Vercel deploy config wired in. Over 80 stars in 3 months.",
    longDesc:
      "Built out of frustration with how long it takes to bootstrap a production Next.js app. Includes opinionated folder structure, pre-configured ESLint/Prettier, Husky pre-commit hooks, type-safe env validation with Zod, and a component library scaffold. Used by 40+ developers as their base.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind v4",
      "Prisma",
      "NextAuth",
      "PostgreSQL",
    ],
    stats: { stars: 84, forks: 21, issues: 3 },
    status: "active", // "active" | "archived" | "wip"
    accent: "#c084fc",
    liveUrl: "https://next-template.bhupeshb7.me",
    repoUrl: "https://github.com/bhupeshb7/next-template",
    previewCode: `const config = {
  auth:     true,   // NextAuth v5
  db:       "pg",   // Prisma + Postgres
  deploy:   "vercel",
  ci:       "github-actions",
  coverage: "vitest",
};`,
    highlights: [
      "80+ GitHub stars",
      "40+ forks",
      "Zero config deploy",
      "Type-safe env",
    ],
  },
  {
    id: "portfolio-v3",
    featured: true,
    type: "solo",
    name: "portfolio-v3",
    tagline: "This site. Zero UI libraries.",
    image: null, // e.g. "/projects/portfolio-v3.png"
    desc: "Rebuilt from scratch using Next.js 15 App Router. Canvas-based cursor trails, Framer Motion scroll choreography, and a custom animation system. Cut bundle size from 280kB to 34kB.",
    longDesc:
      "The third complete rewrite of my portfolio. I used it as a playground for App Router patterns, React Server Components, and edge rendering. The design system is entirely custom — no Shadcn, no Radix. Every animation is hand-tuned. LCP went from 4.2s to 0.8s.",
    stack: ["Next.js 15", "TypeScript", "Framer Motion", "Canvas API", "CSS"],
    stats: { stars: 47, forks: 9, issues: 1 },
    status: "active",
    accent: "#f97316",
    liveUrl: "https://bhupeshb7.me",
    repoUrl: "https://github.com/bhupeshb7/portfolio-v3",
    previewCode: `// LCP: 4.2s → 0.8s
// Bundle: 280kB → 34kB
// Zero UI libraries
// 100 Lighthouse score`,
    highlights: [
      "100 Lighthouse score",
      "0.8s LCP",
      "34kB JS bundle",
      "Custom design system",
    ],
  },
  {
    id: "ui-blocks",
    featured: false,
    type: "solo",
    name: "ui-blocks",
    tagline: "Copy-paste component library.",
    image: null, // e.g. "/projects/ui-blocks.png"
    desc: "Unstyled, accessible, and composable UI primitives built on Radix UI. Dark-first design tokens, full keyboard navigation, and ARIA-compliant. Each block ships as a single file — no install required.",
    longDesc:
      "Frustrated with opinionated component libraries that fight your design system, I built my own collection of accessible primitives. Components are delivered as copy-paste source files — you own the code, no dependency lock-in. 20+ components covering all common patterns.",
    stack: ["React", "TypeScript", "Radix UI", "Tailwind", "Storybook"],
    stats: { stars: 31, forks: 7, issues: 5 },
    status: "active",
    accent: "#00e5ff",
    liveUrl: "https://ui.bhupeshb7.me",
    repoUrl: "https://github.com/bhupeshb7/ui-blocks",
    previewCode: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="ghost">Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* your content */}
  </DialogContent>
</Dialog>`,
    highlights: [
      "20+ components",
      "WCAG 2.1 AA",
      "No install needed",
      "Storybook docs",
    ],
  },
  {
    id: "rust-cli-toolbox",
    featured: false,
    type: "solo",
    name: "rust-cli-toolbox",
    tagline: "Lightning-fast dev utilities in Rust.",
    image: null, // e.g. "/projects/rust-cli.png"
    desc: "A suite of CLI tools written in Rust that replaces slow Node.js scripts in my workflow — file watcher, JSON transformer, log parser, and a port scanner. 10–50× faster than the JS equivalents.",
    longDesc:
      "This was my Rust learning project. Instead of building something arbitrary, I rewrote the slow scripts I actually used daily. The experience was humbling and addictive. The borrow checker forces you to think about memory in a way that permanently improves how you write any language.",
    stack: ["Rust", "Clap", "Tokio", "Serde", "Crossterm"],
    stats: { stars: 18, forks: 4, issues: 2 },
    status: "active",
    accent: "#f97316",
    liveUrl: null,
    repoUrl: "https://github.com/bhupeshb7/rust-cli-toolbox",
    previewCode: `$ toolbox watch ./src --ext ts,tsx \\
    --cmd "pnpm build" \\
    --debounce 300ms

Watching 147 files...
[12:03:01] Change detected → rebuilding`,
    highlights: [
      "10–50× faster",
      "Async I/O with Tokio",
      "Written in 3 months",
      "Zero runtime deps",
    ],
  },
  {
    id: "collab-notes",
    featured: false,
    type: "group",
    name: "collab-notes",
    tagline: "Real-time collaborative editor.",
    image: null, // e.g. "/projects/collab-notes.png"
    desc: "Google Docs-style collaborative note-taking app with operational transforms, presence indicators, and offline sync. Built with a team of 3 for a hackathon — shipped in 48 hours, still running.",
    longDesc:
      "This was my final university project, later polished with two friends into a real product. Operational transforms handle concurrent edits without conflicts. WebSocket presence shows who's editing where. IndexedDB caches documents offline and syncs on reconnect. 200+ active users at peak.",
    stack: [
      "Next.js",
      "Node.js",
      "Socket.io",
      "PostgreSQL",
      "Redis",
      "IndexedDB",
    ],
    stats: { stars: 29, forks: 11, issues: 4 },
    status: "active",
    accent: "#34d399",
    liveUrl: "https://collab-notes.bhupeshb7.me",
    repoUrl: "https://github.com/bhupeshb7/collab-notes",
    team: [
      { name: "Bhupesh Kumar", role: "Full-Stack Lead", handle: "@bhupeshb7" },
      { name: "Arjun Sharma", role: "Backend & WS", handle: "@arjuns" },
      { name: "Priya Nair", role: "UI / UX", handle: "@priyan" },
    ],
    previewCode: `// Operational Transform — merge concurrent edits
function transform(op1: Op, op2: Op): Op {
  if (op1.type === "insert" && op2.type === "insert") {
    if (op1.position <= op2.position)
      return { ...op2, position: op2.position + op1.length };
    return op2;
  }
  // ... retain / delete cases
}`,
    highlights: [
      "48h hackathon build",
      "200+ peak users",
      "Offline-first",
      "OT conflict resolution",
    ],
  },
  {
    id: "devboard",
    featured: false,
    type: "group",
    name: "devboard",
    tagline: "Personal dev dashboard — open source.",
    image: null, // e.g. "/projects/devboard.png"
    desc: "All-in-one developer dashboard: GitHub activity, Wakatime stats, blog analytics, server uptime, and custom widgets. Built with a friend as an open-source alternative to paid dashboards.",
    longDesc:
      "We wanted a single screen showing everything relevant to our daily dev life — without paying $20/month for a SaaS product. Built with Next.js App Router and server-side polling. Widgets are composable and config-driven via a simple JSON file. The repo includes a Docker Compose setup for self-hosting.",
    stack: [
      "Next.js",
      "TypeScript",
      "Docker",
      "GitHub API",
      "Wakatime API",
      "Recharts",
    ],
    stats: { stars: 22, forks: 8, issues: 6 },
    status: "wip",
    accent: "#fbbf24",
    liveUrl: "https://devboard.bhupeshb7.me",
    repoUrl: "https://github.com/bhupeshb7/devboard",
    team: [
      {
        name: "Bhupesh Kumar",
        role: "Lead & Architecture",
        handle: "@bhupeshb7",
      },
      { name: "Rahul Verma", role: "Widgets & APIs", handle: "@rahulv" },
    ],
    previewCode: `// widgets.config.json
{
  "widgets": [
    { "id": "github",   "position": [0,0], "size": [2,1] },
    { "id": "wakatime", "position": [2,0], "size": [1,1] },
    { "id": "uptime",   "position": [3,0], "size": [1,1] }
  ]
}`,
    highlights: [
      "Self-hostable",
      "Config-driven widgets",
      "Docker Compose",
      "OSS alternative",
    ],
  },
] as const;

export type Project = (typeof PROJECTS)[number];
