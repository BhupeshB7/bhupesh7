// "use client";

// import theme from "@/config/theme.config";
// import { motion, useInView, type Transition } from "framer-motion";
// import { useRef, useState } from "react";

// const CONTACT = {
//   name: "Bhupesh Kumar",
//   email: "contact@bhupesh.me",
//   whatsapp: "+918581869783",
//   whatsappMessage: "Hi Bhupesh, I\'d like to discuss a project.",
//   github: "https://github.com/bhupeshb7",
//   linkedin: "https://linkedin.com/in/bhupeshb7",
//   twitter: "https://twitter.com/bhupeshb7",
//   location: "India · Remote Worldwide",
//   availability: "Available for new projects",
// } as const;

// const c = theme.accent.primary;

// const services = [
//   {
//     index: "01",
//     title: "Web Applications",
//     body: "Custom web platforms, dashboards, portals, and business applications designed around your workflow and goals.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <rect
//           x="2"
//           y="3"
//           width="16"
//           height="13"
//           rx="2"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <path
//           d="M7 17H13"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M10 16V17"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path d="M2 7H18" stroke="currentColor" strokeWidth="1.5" />
//         <circle cx="5" cy="5" r="0.8" fill="currentColor" />
//         <circle cx="7.5" cy="5" r="0.8" fill="currentColor" />
//       </svg>
//     ),
//   },
//   {
//     index: "02",
//     title: "SaaS Products",
//     body: "From idea validation to production-ready software, helping founders turn concepts into real products.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <path
//           d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     index: "03",
//     title: "Internal Business Tools",
//     body: "Replacing repetitive manual processes with systems that save time, reduce errors, and improve efficiency.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <rect
//           x="3"
//           y="3"
//           width="6"
//           height="6"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <rect
//           x="11"
//           y="3"
//           width="6"
//           height="6"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <rect
//           x="3"
//           y="11"
//           width="6"
//           height="6"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <rect
//           x="11"
//           y="11"
//           width="6"
//           height="6"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//       </svg>
//     ),
//   },
//   {
//     index: "04",
//     title: "AI-Powered Solutions",
//     body: "Integrating AI into workflows, customer experiences, automation pipelines, and operational processes.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
//         <path
//           d="M10 2V5M10 15V18M2 10H5M15 10H18"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M4.93 4.93L7.05 7.05M12.95 12.95L15.07 15.07M4.93 15.07L7.05 12.95M12.95 7.05L15.07 4.93"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     index: "05",
//     title: "Backend Systems & APIs",
//     body: "Building scalable systems, integrations, automation services, and infrastructure that power modern applications.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <rect
//           x="2"
//           y="4"
//           width="16"
//           height="4"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <rect
//           x="2"
//           y="12"
//           width="16"
//           height="4"
//           rx="1.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <circle cx="5.5" cy="6" r="0.9" fill="currentColor" />
//         <circle cx="5.5" cy="14" r="0.9" fill="currentColor" />
//       </svg>
//     ),
//   },
//   {
//     index: "06",
//     title: "Existing Product Improvements",
//     body: "Performance optimization, architecture reviews, workflow improvements, feature expansion, and technical guidance.",
//     icon: (
//       <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
//         <path
//           d="M3 10C3 6.13 6.13 3 10 3C12.76 3 15.16 4.56 16.4 6.86"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M17 10C17 13.87 13.87 17 10 17C7.24 17 4.84 15.44 3.6 13.14"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M14.5 4L17 6.86L14.5 6.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M5.5 16L3 13.14L5.5 13.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
// ];

// const audiences = [
//   {
//     title: "Business Owners",
//     body: "Businesses often rely on manual processes, spreadsheets, disconnected tools, and repetitive workflows. Software can streamline operations, improve efficiency, and create better customer experiences.",
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//         <path
//           d="M4 17V15C4 13.3 5.3 12 7 12H13C14.7 12 16 13.3 16 15V17"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <circle
//           cx="10"
//           cy="7"
//           r="3.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Startup Founders",
//     body: "Have an idea but don\'t know where to start? Need an MVP to validate a concept? Looking for technical guidance before investing heavily in development? Let\'s find the best path forward.",
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//         <path
//           d="M10 2.5L13 8H18.5L14 11.5L16 18L10 14L4 18L6 11.5L1.5 8H7L10 2.5Z"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Growing Teams",
//     body: "As products evolve, systems become more complex. Whether improving architecture, introducing automation, scaling infrastructure, or integrating AI — there are always opportunities to improve product quality.",
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//         <circle cx="7" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
//         <circle
//           cx="13"
//           cy="8"
//           r="2.5"
//           stroke="currentColor"
//           strokeWidth="1.5"
//         />
//         <path
//           d="M2 17C2 14.8 4.2 13 7 13"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M18 17C18 14.8 15.8 13 13 13"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M10 15C11.7 15 13.2 15.6 14.2 16.6"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <path
//           d="M10 15C8.3 15 6.8 15.6 5.8 16.6"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     title: "Developers & Technical Teams",
//     body: "Sometimes an external perspective helps. Whether facing architectural challenges, evaluating technical decisions, or looking for implementation guidance — I\'m happy to discuss ideas and solutions.",
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//         <path
//           d="M7 8L4 10L7 12"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M13 8L16 10L13 12"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M11 6L9 14"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </svg>
//     ),
//   },
// ];

// const collaborationTypes = [
//   {
//     title: "Project-Based",
//     body: "For businesses, founders, and teams looking to build a specific product or solve a defined problem.",
//   },
//   {
//     title: "Long-Term Collaboration",
//     body: "For teams that need ongoing support, feature development, product evolution, and continuous improvement.",
//   },
//   {
//     title: "Technical Consulting",
//     body: "For discussions around architecture, scalability, AI opportunities, technical strategy, and implementation planning.",
//   },
//   {
//     title: "Product Discovery",
//     body: "For early-stage ideas that need technical direction, feasibility analysis, and roadmap planning before development begins.",
//   },
// ];

// const steps = [
//   {
//     n: "01",
//     title: "Share Your Idea",
//     body: "Tell me about your challenge, project, or idea — no technical spec required.",
//   },
//   {
//     n: "02",
//     title: "Personal Review",
//     body: "I\'ll review the information personally and evaluate possible approaches.",
//   },
//   {
//     n: "03",
//     title: "Schedule a Call",
//     body: "If it looks like a good fit, we\'ll discuss goals, requirements, and next steps.",
//   },
//   {
//     n: "04",
//     title: "Recommended Approach",
//     body: "You\'ll receive a recommended direction, project scope, and implementation plan.",
//   },
//   {
//     n: "05",
//     title: "Start Building",
//     body: "If we\'re aligned, we move forward and start building together.",
//   },
// ];

// const chatMessages = [
//   {
//     role: "assistant",
//     text: "Hi! I\'m Bhupesh\'s AI assistant. Tell me about the problem you\'re trying to solve or the product you\'d like to build.",
//   },
//   {
//     role: "user",
//     text: "We\'re managing our entire sales pipeline in spreadsheets and WhatsApp. It\'s getting messy as the team grows.",
//   },
//   {
//     role: "assistant",
//     text: "That\'s a common bottleneck for growing teams. A few quick questions: How many people are involved in the sales process, and what does a typical deal look like end-to-end?",
//   },
//   {
//     role: "user",
//     text: "Around 8 sales reps, deals take 2–4 weeks. We track leads, follow-ups, proposals and closings.",
//   },
//   {
//     role: "assistant",
//     text: "Got it. You\'d benefit from a lightweight CRM tailored to your workflow. I can put together a summary for Bhupesh outlining scope, features, and a rough timeline. Want me to do that?",
//   },
// ];

// function HeroBgSVG() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       viewBox="0 0 1200 700"
//       preserveAspectRatio="xMidYMid slice"
//       fill="none"
//       aria-hidden="true"
//     >
//       <defs>
//         <radialGradient id="wwm-hero-glow" cx="65%" cy="45%" r="50%">
//           <stop offset="0%" stopColor={c} stopOpacity="0.07" />
//           <stop offset="100%" stopColor={c} stopOpacity="0" />
//         </radialGradient>
//       </defs>
//       <rect width="1200" height="700" fill="url(#wwm-hero-glow)" />
//       <path
//         d="M0 580 Q150 560 300 590 Q450 620 600 580 Q750 540 900 570 Q1050 600 1200 560"
//         stroke={`${c}12`}
//         strokeWidth="1"
//         fill="none"
//       />
//       <path
//         d="M0 600 Q200 575 400 610 Q600 645 800 605 Q1000 565 1200 595"
//         stroke={`${c}07`}
//         strokeWidth="1"
//         fill="none"
//       />
//       <circle
//         cx="950"
//         cy="180"
//         r="220"
//         fill="none"
//         stroke={`${c}05`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="950"
//         cy="180"
//         r="320"
//         fill="none"
//         stroke={`${c}03`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="950"
//         cy="180"
//         r="420"
//         fill="none"
//         stroke={`${c}02`}
//         strokeWidth="1"
//       />
//       <path
//         d="M730 180 L950 0 L1170 180 L950 360 Z"
//         fill="none"
//         stroke={`${c}04`}
//         strokeWidth="1"
//       />
//       <line
//         x1="950"
//         y1="0"
//         x2="950"
//         y2="360"
//         stroke={`${c}06`}
//         strokeWidth="0.8"
//       />
//       <line
//         x1="730"
//         y1="180"
//         x2="1170"
//         y2="180"
//         stroke={`${c}06`}
//         strokeWidth="0.8"
//       />
//       <circle
//         cx="950"
//         cy="180"
//         r="5"
//         fill="none"
//         stroke={`${c}30`}
//         strokeWidth="1.5"
//       />
//       <circle cx="950" cy="180" r="2" fill={`${c}50`} />
//       <circle
//         cx="730"
//         cy="180"
//         r="3.5"
//         fill="none"
//         stroke={`${c}22`}
//         strokeWidth="1.5"
//       />
//       <circle
//         cx="1170"
//         cy="180"
//         r="3.5"
//         fill="none"
//         stroke={`${c}22`}
//         strokeWidth="1.5"
//       />
//       <circle
//         cx="950"
//         cy="0"
//         r="3"
//         fill="none"
//         stroke={`${c}18`}
//         strokeWidth="1.5"
//       />
//       <circle
//         cx="950"
//         cy="360"
//         r="3"
//         fill="none"
//         stroke={`${c}18`}
//         strokeWidth="1.5"
//       />
//     </svg>
//   );
// }

// function ServicesBgSVG() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       viewBox="0 0 1200 900"
//       preserveAspectRatio="xMidYMid slice"
//       fill="none"
//       aria-hidden="true"
//     >
//       <defs>
//         <linearGradient id="svc-fade" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="white" stopOpacity="0" />
//           <stop offset="30%" stopColor="white" stopOpacity="0.7" />
//           <stop offset="70%" stopColor="white" stopOpacity="0.7" />
//           <stop offset="100%" stopColor="white" stopOpacity="0" />
//         </linearGradient>
//         <mask id="svc-mask">
//           <rect width="1200" height="900" fill="url(#svc-fade)" />
//         </mask>
//         <pattern
//           id="svc-tri-pattern"
//           x="0"
//           y="0"
//           width="60"
//           height="52"
//           patternUnits="userSpaceOnUse"
//         >
//           <path
//             d="M30 4L56 48H4Z"
//             fill="none"
//             stroke="rgba(255,255,255,0.022)"
//             strokeWidth="0.8"
//           />
//         </pattern>
//       </defs>
//       <rect
//         width="1200"
//         height="900"
//         fill="url(#svc-tri-pattern)"
//         mask="url(#svc-mask)"
//       />
//       <path
//         d="M0 450 Q300 420 600 450 Q900 480 1200 450"
//         stroke={`${c}07`}
//         strokeWidth="1"
//         fill="none"
//       />
//       <circle
//         cx="100"
//         cy="200"
//         r="150"
//         fill="none"
//         stroke={`${c}05`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="100"
//         cy="200"
//         r="240"
//         fill="none"
//         stroke={`${c}03`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="1100"
//         cy="700"
//         r="130"
//         fill="none"
//         stroke={`${c}05`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="1100"
//         cy="700"
//         r="210"
//         fill="none"
//         stroke={`${c}03`}
//         strokeWidth="1"
//       />
//     </svg>
//   );
// }

// function ProcessBgSVG() {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       viewBox="0 0 1200 600"
//       preserveAspectRatio="xMidYMid slice"
//       fill="none"
//       aria-hidden="true"
//     >
//       <defs>
//         <linearGradient id="proc-fade" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="white" stopOpacity="0.5" />
//           <stop offset="100%" stopColor="white" stopOpacity="0" />
//         </linearGradient>
//         <mask id="proc-mask">
//           <rect width="1200" height="600" fill="url(#proc-fade)" />
//         </mask>
//         <pattern
//           id="proc-dot"
//           width="24"
//           height="24"
//           patternUnits="userSpaceOnUse"
//         >
//           <circle cx="0.7" cy="0.7" r="0.7" fill="rgba(255,255,255,0.03)" />
//         </pattern>
//       </defs>
//       <rect
//         width="1200"
//         height="600"
//         fill="url(#proc-dot)"
//         mask="url(#proc-mask)"
//       />
//       <line
//         x1="0"
//         y1="100"
//         x2="1200"
//         y2="100"
//         stroke="rgba(255,255,255,0.025)"
//         strokeWidth="1"
//       />
//       <line
//         x1="0"
//         y1="300"
//         x2="1200"
//         y2="300"
//         stroke="rgba(255,255,255,0.02)"
//         strokeWidth="1"
//       />
//       <circle
//         cx="600"
//         cy="300"
//         r="200"
//         fill="none"
//         stroke={`${c}05`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="600"
//         cy="300"
//         r="320"
//         fill="none"
//         stroke={`${c}03`}
//         strokeWidth="1"
//       />
//     </svg>
//   );
// }

// function HeroIllustration() {
//   return (
//     <svg
//       viewBox="0 0 360 320"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-full max-w-[360px] mx-auto"
//       aria-hidden="true"
//     >
//       <defs>
//         <radialGradient id="ill-glow" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor={c} stopOpacity="0.12" />
//           <stop offset="100%" stopColor={c} stopOpacity="0" />
//         </radialGradient>
//         <linearGradient id="ill-line-v" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor={c} stopOpacity="0" />
//           <stop offset="50%" stopColor={c} stopOpacity="0.4" />
//           <stop offset="100%" stopColor={c} stopOpacity="0" />
//         </linearGradient>
//         <linearGradient id="ill-line-h" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor={c} stopOpacity="0" />
//           <stop offset="50%" stopColor={c} stopOpacity="0.35" />
//           <stop offset="100%" stopColor={c} stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <ellipse cx="180" cy="160" rx="160" ry="140" fill="url(#ill-glow)" />
//       <circle
//         cx="180"
//         cy="160"
//         r="110"
//         fill="none"
//         stroke={`${c}14`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="180"
//         cy="160"
//         r="80"
//         fill="none"
//         stroke={`${c}10`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="180"
//         cy="160"
//         r="50"
//         fill="none"
//         stroke={`${c}18`}
//         strokeWidth="1.2"
//       />
//       <line
//         x1="180"
//         y1="20"
//         x2="180"
//         y2="300"
//         stroke="url(#ill-line-v)"
//         strokeWidth="1"
//       />
//       <line
//         x1="40"
//         y1="160"
//         x2="320"
//         y2="160"
//         stroke="url(#ill-line-h)"
//         strokeWidth="1"
//       />
//       <line
//         x1="60"
//         y1="60"
//         x2="300"
//         y2="260"
//         stroke={`${c}08`}
//         strokeWidth="0.8"
//       />
//       <line
//         x1="300"
//         y1="60"
//         x2="60"
//         y2="260"
//         stroke={`${c}08`}
//         strokeWidth="0.8"
//       />
//       <rect
//         x="154"
//         y="134"
//         width="52"
//         height="52"
//         rx="10"
//         fill={`${c}08`}
//         stroke={`${c}22`}
//         strokeWidth="1.2"
//       />
//       <path
//         d="M170 155 L180 145 L190 155 L190 174 L170 174 Z"
//         fill={`${c}18`}
//         stroke={`${c}35`}
//         strokeWidth="1"
//       />
//       <path
//         d="M175 174 L175 162 L185 162 L185 174"
//         fill={`${c}22`}
//         stroke="none"
//       />
//       <rect x="178" y="148" width="4" height="4" rx="1" fill={`${c}50`} />
//       <circle
//         cx="180"
//         cy="50"
//         r="14"
//         fill={`${c}08`}
//         stroke={`${c}25`}
//         strokeWidth="1.2"
//       />
//       <path
//         d="M175 50 Q178 45 180 50 Q182 55 185 50"
//         stroke={`${c}60`}
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         fill="none"
//       />
//       <circle cx="180" cy="48" r="1.5" fill={`${c}80`} />
//       <circle
//         cx="180"
//         cy="270"
//         r="12"
//         fill={`${c}08`}
//         stroke={`${c}22`}
//         strokeWidth="1.2"
//       />
//       <rect
//         x="174"
//         y="264"
//         width="12"
//         height="12"
//         rx="2"
//         fill="none"
//         stroke={`${c}40`}
//         strokeWidth="1"
//       />
//       <rect x="176" y="268" width="4" height="5" rx="0.5" fill={`${c}30`} />
//       <rect x="181" y="268" width="3" height="3" rx="0.5" fill={`${c}25`} />
//       <rect x="181" y="272" width="3" height="2" rx="0.5" fill={`${c}20`} />
//       <circle
//         cx="50"
//         cy="160"
//         r="14"
//         fill={`${c}08`}
//         stroke={`${c}22`}
//         strokeWidth="1.2"
//       />
//       <circle
//         cx="50"
//         cy="158"
//         r="4"
//         stroke={`${c}45`}
//         strokeWidth="1.2"
//         fill="none"
//       />
//       <path
//         d="M44 166 Q50 163 56 166"
//         stroke={`${c}40`}
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         fill="none"
//       />
//       <circle
//         cx="310"
//         cy="160"
//         r="14"
//         fill={`${c}08`}
//         stroke={`${c}22`}
//         strokeWidth="1.2"
//       />
//       <circle
//         cx="310"
//         cy="160"
//         r="5"
//         stroke={`${c}45`}
//         strokeWidth="1.2"
//         fill="none"
//       />
//       <circle cx="310" cy="160" r="2" fill={`${c}50`} />
//       <circle
//         cx="107"
//         cy="87"
//         r="10"
//         fill={`${c}06`}
//         stroke={`${c}20`}
//         strokeWidth="1"
//       />
//       <path
//         d="M103 87 L106 90 L112 84"
//         stroke={`${c}55`}
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//       <circle
//         cx="253"
//         cy="87"
//         r="10"
//         fill={`${c}06`}
//         stroke={`${c}20`}
//         strokeWidth="1"
//       />
//       <path
//         d="M249 85 L256 85 M249 88 L255 88 M249 91 L253 91"
//         stroke={`${c}50`}
//         strokeWidth="1"
//         strokeLinecap="round"
//       />
//       <circle
//         cx="107"
//         cy="233"
//         r="10"
//         fill={`${c}06`}
//         stroke={`${c}18`}
//         strokeWidth="1"
//       />
//       <path
//         d="M103 230 L107 227 L111 230 L111 237 L103 237 Z"
//         fill="none"
//         stroke={`${c}45`}
//         strokeWidth="1"
//       />
//       <circle
//         cx="253"
//         cy="233"
//         r="10"
//         fill={`${c}06`}
//         stroke={`${c}18`}
//         strokeWidth="1"
//       />
//       <path
//         d="M249 233 Q253 229 257 233"
//         stroke={`${c}50`}
//         strokeWidth="1"
//         strokeLinecap="round"
//         fill="none"
//       />
//       <circle cx="253" cy="230" r="1.2" fill={`${c}60`} />
//       <line
//         x1="180"
//         y1="65"
//         x2="180"
//         y2="134"
//         stroke={`${c}15`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="65"
//         y1="160"
//         x2="130"
//         y2="160"
//         stroke={`${c}15`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="295"
//         y1="160"
//         x2="230"
//         y2="160"
//         stroke={`${c}15`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="180"
//         y1="257"
//         x2="180"
//         y2="187"
//         stroke={`${c}12`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="117"
//         y1="93"
//         x2="154"
//         y2="120"
//         stroke={`${c}10`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="243"
//         y1="93"
//         x2="210"
//         y2="120"
//         stroke={`${c}10`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="117"
//         y1="227"
//         x2="154"
//         y2="200"
//         stroke={`${c}08`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//       <line
//         x1="243"
//         y1="227"
//         x2="210"
//         y2="200"
//         stroke={`${c}08`}
//         strokeWidth="0.8"
//         strokeDasharray="3 2"
//       />
//     </svg>
//   );
// }

// function ChatSection({
//   chatRef,
// }: {
//   chatRef: React.RefObject<HTMLDivElement>;
// }) {
//   const inView = useInView(chatRef, { once: true, amount: 0.15 });
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <motion.div
//       ref={chatRef}
//       initial={{ opacity: 0, y: 32 }}
//       animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
//       transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" } as Transition}
//       className="relative rounded-2xl overflow-hidden"
//       style={{
//         background: theme.surface[0],
//         border: `1px solid ${theme.border.soft}`,
//         boxShadow: `0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
//       }}
//     >
//       <div
//         className="absolute inset-x-0 top-0 h-[1.5px]"
//         style={{
//           background: `linear-gradient(90deg, transparent, ${c}60, transparent)`,
//         }}
//       />
//       <div
//         className="flex items-center justify-between px-5 py-3.5"
//         style={{ borderBottom: `1px solid ${theme.border.subtle}` }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex gap-1.5">
//             <div
//               className="w-2.5 h-2.5 rounded-full"
//               style={{ background: `${c}60` }}
//             />
//             <div
//               className="w-2.5 h-2.5 rounded-full"
//               style={{ background: `${c}35` }}
//             />
//             <div
//               className="w-2.5 h-2.5 rounded-full"
//               style={{ background: `${c}18` }}
//             />
//           </div>
//           <span
//             className="text-[10px] font-semibold tracking-[0.18em] uppercase"
//             style={{
//               color: theme.text.muted,
//               fontFamily: "\'DM Mono\', monospace",
//             }}
//           >
//             AI Project Discovery
//           </span>
//         </div>
//         <motion.div
//           className="flex items-center gap-1.5"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={
//             { duration: 2, repeat: Infinity, ease: "easeInOut" } as Transition
//           }
//         >
//           <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
//           <span
//             className="text-[9px]"
//             style={{
//               color: theme.accent.text,
//               fontFamily: "\'DM Mono\', monospace",
//             }}
//           >
//             online
//           </span>
//         </motion.div>
//       </div>

//       <div className="flex flex-col gap-3 p-5 max-h-[340px] overflow-y-auto">
//         {chatMessages.map((msg, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 12 }}
//             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
//             transition={
//               {
//                 duration: 0.45,
//                 delay: 0.4 + i * 0.15,
//                 ease: "easeOut",
//               } as Transition
//             }
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             {msg.role === "assistant" && (
//               <div
//                 className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
//                 style={{
//                   background: theme.accent.tintStrong,
//                   border: `1px solid ${theme.accent.border}`,
//                 }}
//               >
//                 <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                   <circle cx="6" cy="6" r="2" stroke={c} strokeWidth="1.2" />
//                   <path
//                     d="M6 1V3M6 9V11M1 6H3M9 6H11"
//                     stroke={c}
//                     strokeWidth="1.2"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </div>
//             )}
//             <div
//               className="max-w-[80%] px-3.5 py-2.5 rounded-xl text-[12.5px] leading-relaxed"
//               style={
//                 msg.role === "user"
//                   ? {
//                       background: theme.accent.tintStrong,
//                       color: theme.text.primary,
//                       border: `1px solid ${theme.accent.border}`,
//                     }
//                   : {
//                       background: theme.surface[1],
//                       color: theme.text.secondary,
//                       border: `1px solid ${theme.border.subtle}`,
//                     }
//               }
//             >
//               {msg.text}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div
//         className="flex items-center gap-3 px-4 py-3"
//         style={{ borderTop: `1px solid ${theme.border.subtle}` }}
//       >
//         <div
//           className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl"
//           style={{
//             background: theme.bg.base,
//             border: `1px solid ${theme.border.default}`,
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Tell me about your project..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-transparent outline-none text-[12px]"
//             style={{
//               color: theme.text.primary,
//               fontFamily: "\'DM Mono\', monospace",
//             }}
//           />
//         </div>
//         <button
//           className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
//           style={{
//             background: theme.accent.primary,
//             color: theme.accent.primaryForeground,
//             boxShadow: `0 0 16px ${theme.accent.glowStrong}`,
//           }}
//         >
//           <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
//             <path
//               d="M2 7H12M8 3L12 7L8 11"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default function WorkWithMe() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const servicesRef = useRef<HTMLDivElement>(null);
//   const discoveryRef = useRef<HTMLDivElement>(null);
//   const chatRef = useRef<HTMLDivElement>(null);
//   const audienceRef = useRef<HTMLDivElement>(null);
//   const collaborationRef = useRef<HTMLDivElement>(null);
//   const stepsRef = useRef<HTMLDivElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);

//   const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
//   const servicesInView = useInView(servicesRef, { once: true, amount: 0.05 });
//   const discoveryInView = useInView(discoveryRef, { once: true, amount: 0.2 });
//   const audienceInView = useInView(audienceRef, { once: true, amount: 0.05 });
//   const collaborationInView = useInView(collaborationRef, {
//     once: true,
//     amount: 0.1,
//   });
//   const stepsInView = useInView(stepsRef, { once: true, amount: 0.08 });
//   const ctaInView = useInView(ctaRef, { once: true, amount: 0.25 });

//   const scrollToChat = () => {
//     document
//       .getElementById("chat-section")
//       ?.scrollIntoView({ behavior: "smooth" });
//   };

//   const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
//   const emailUrl = `mailto:${CONTACT.email}`;

//   return (
//     <main
//       style={{ background: theme.bg.base }}
//       className="relative overflow-x-hidden"
//     >
//       {/* ── HERO ── */}
//       <section className="relative min-h-[90vh] flex items-center overflow-hidden py-24 lg:py-0">
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${theme.accent.glow}, transparent 70%)`,
//           }}
//         />
//         <HeroBgSVG />
//         <div
//           className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, transparent, ${theme.bg.base})`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 top-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.accent.border}, transparent)`,
//           }}
//         />

//         <div
//           ref={heroRef}
//           className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-0"
//         >
//           <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
//             <div className="flex flex-col gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//                 }
//                 transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//               >
//                 <span
//                   className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
//                   style={{
//                     color: theme.accent.text,
//                     border: `1px solid ${theme.accent.border}`,
//                     background: theme.accent.tint,
//                   }}
//                 >
//                   <span
//                     className="w-1.5 h-1.5 rounded-full animate-pulse"
//                     style={{ background: theme.accent.primary }}
//                   />
//                   LET\'S BUILD
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
//                 }
//                 transition={
//                   { duration: 0.6, delay: 0.1, ease: "easeOut" } as Transition
//                 }
//                 className="text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-tight"
//                 style={{
//                   color: theme.text.primary,
//                   fontFamily: "Syne, sans-serif",
//                 }}
//               >
//                 Tell Me What You\'re{" "}
//                 <span className="relative inline-block" style={{ color: c }}>
//                   Trying To Build.
//                   <svg
//                     viewBox="0 0 340 10"
//                     fill="none"
//                     className="absolute left-0 w-full"
//                     style={{ bottom: "-5px", height: "9px" }}
//                     aria-hidden="true"
//                   >
//                     <motion.path
//                       d="M2 6 C60 2, 120 8, 180 5 C240 2, 298 7, 338 6"
//                       stroke={c}
//                       strokeWidth="1.6"
//                       strokeLinecap="round"
//                       fill="none"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={
//                         heroInView ? { pathLength: 1, opacity: 0.65 } : {}
//                       }
//                       transition={
//                         {
//                           duration: 1,
//                           delay: 0.55,
//                           ease: "easeInOut",
//                         } as Transition
//                       }
//                     />
//                   </svg>
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
//                 }
//                 transition={
//                   { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
//                 }
//                 className="text-base lg:text-[17px] max-w-[520px] leading-relaxed"
//                 style={{ color: theme.text.secondary }}
//               >
//                 Whether it\'s an idea, a business challenge, or an existing
//                 process you\'d like to improve — you don\'t need technical
//                 requirements or architecture diagrams. Just explain what you\'re
//                 trying to achieve.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
//                 }
//                 transition={
//                   { duration: 0.55, delay: 0.3, ease: "easeOut" } as Transition
//                 }
//                 className="flex flex-col gap-2.5 rounded-xl p-4"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.subtle}`,
//                   maxWidth: "440px",
//                 }}
//               >
//                 {[
//                   "Automate operations as a business owner",
//                   "Validate a startup idea as a founder",
//                   "Replace spreadsheet workflows with a real system",
//                   "Build, improve, or scale an existing product",
//                 ].map((text, i) => (
//                   <div key={i} className="flex items-start gap-2.5">
//                     <div
//                       className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
//                       style={{ background: `${c}55` }}
//                     />
//                     <span
//                       className="text-[12.5px] leading-relaxed"
//                       style={{ color: theme.text.tertiary }}
//                     >
//                       {text}
//                     </span>
//                   </div>
//                 ))}
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//                 }
//                 transition={
//                   { duration: 0.5, delay: 0.42, ease: "easeOut" } as Transition
//                 }
//                 className="flex flex-wrap gap-3 pt-1"
//               >
//                 <a
//                   href="#contact"
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
//                   style={{
//                     background: theme.accent.primary,
//                     color: theme.accent.primaryForeground,
//                     boxShadow: `0 0 24px ${theme.accent.glowStrong}`,
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.background =
//                       theme.accent.primaryHover;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.background =
//                       theme.accent.primary;
//                   }}
//                 >
//                   Start A Conversation
//                 </a>
//                 <button
//                   onClick={scrollToChat}
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.primary,
//                     border: `1px solid ${theme.border.default}`,
//                     background: theme.surface[1],
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLButtonElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLButtonElement).style.background =
//                       theme.surface[2];
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLButtonElement).style.borderColor =
//                       theme.border.default;
//                     (e.currentTarget as HTMLButtonElement).style.background =
//                       theme.surface[1];
//                   }}
//                 >
//                   <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
//                     <path
//                       d="M1 10.5L1 3C1 2.45 1.45 2 2 2L9 2C9.55 2 10 2.45 10 3L10 8C10 8.55 9.55 9 9 9L4 9L1 12L1 10.5Z"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M10 4H12C12.55 4 13 4.45 13 5V10L10 13V11H5"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                   Chat With AI Assistant
//                 </button>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={
//                   heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
//                 }
//                 transition={
//                   { duration: 0.5, delay: 0.54, ease: "easeOut" } as Transition
//                 }
//                 className="flex items-center gap-2.5"
//               >
//                 <span
//                   className="text-[11px]"
//                   style={{
//                     color: theme.text.muted,
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                 >
//                   Quick connect:
//                 </span>
//                 <a
//                   href={whatsappUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.secondary,
//                     border: `1px solid ${theme.border.soft}`,
//                     background: theme.surface[1],
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLAnchorElement).style.color = c;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.border.soft;
//                     (e.currentTarget as HTMLAnchorElement).style.color =
//                       theme.text.secondary;
//                   }}
//                 >
//                   <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
//                     <path
//                       d="M10 1.5C5.3 1.5 1.5 5.3 1.5 10C1.5 11.6 1.9 13.1 2.7 14.4L1.5 18.5L5.7 17.3C7 18 8.5 18.5 10 18.5C14.7 18.5 18.5 14.7 18.5 10C18.5 5.3 14.7 1.5 10 1.5Z"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M7.5 8.5C7.5 8.5 7.8 9.5 8.5 10.2C9.2 10.9 10.5 11.8 11 11.8C11.5 11.8 12.2 11 12.5 11C12.8 11 14 11.5 14 11.8C14 12.1 13.5 13.5 12 13.5C10.5 13.5 8 11.5 7 10C6 8.5 6.5 7.5 6.8 7.2C7.1 6.9 8 6.5 8.3 7C8.6 7.5 8.5 8.5 8.5 8.5Z"
//                       stroke="currentColor"
//                       strokeWidth="1.2"
//                     />
//                   </svg>
//                   WhatsApp
//                 </a>
//                 <a
//                   href={emailUrl}
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.secondary,
//                     border: `1px solid ${theme.border.soft}`,
//                     background: theme.surface[1],
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLAnchorElement).style.color = c;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.border.soft;
//                     (e.currentTarget as HTMLAnchorElement).style.color =
//                       theme.text.secondary;
//                   }}
//                 >
//                   <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
//                     <rect
//                       x="2"
//                       y="5"
//                       width="16"
//                       height="11"
//                       rx="2"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                     />
//                     <path
//                       d="M2 7L10 12L18 7"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                   Email
//                 </a>
//               </motion.div>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={
//                 heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
//               }
//               transition={
//                 { duration: 0.8, delay: 0.35, ease: "easeOut" } as Transition
//               }
//               className="hidden lg:flex flex-col items-center gap-4"
//             >
//               <HeroIllustration />
//               <div
//                 className="w-full rounded-xl px-4 py-3 flex items-center gap-3"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                 }}
//               >
//                 <div
//                   className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{
//                     background: theme.accent.tintStrong,
//                     border: `1px solid ${theme.accent.border}`,
//                   }}
//                 >
//                   <span
//                     className="w-1.5 h-1.5 rounded-full animate-pulse"
//                     style={{ background: c }}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-0.5">
//                   <span
//                     className="text-[11px] font-semibold"
//                     style={{
//                       color: theme.text.primary,
//                       fontFamily: "Syne, sans-serif",
//                     }}
//                   >
//                     {CONTACT.availability}
//                   </span>
//                   <span
//                     className="text-[10px]"
//                     style={{
//                       color: theme.text.muted,
//                       fontFamily: "\'DM Mono\', monospace",
//                     }}
//                   >
//                     {CONTACT.location}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ── SERVICES ── */}
//       <section
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.subtle }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 8%, ${theme.bg.muted} 100%)`,
//           }}
//         />
//         <ServicesBgSVG />
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(ellipse 50% 35% at 92% 15%, ${theme.accent.glowSubtle}, transparent 60%)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 top-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 bottom-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />

//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
//           <div
//             ref={servicesRef}
//             className="flex flex-col gap-5 max-w-xl mb-14 lg:mb-18"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={
//                 servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//               }
//               transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//               className="flex items-center gap-3"
//             >
//               <div
//                 className="h-px w-8 flex-shrink-0"
//                 style={{
//                   background: `linear-gradient(to right, ${c}, transparent)`,
//                 }}
//               />
//               <span
//                 className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                 style={{
//                   color: theme.accent.text,
//                   fontFamily: "\'DM Mono\', monospace",
//                 }}
//               >
//                 What We Can Build
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 22 }}
//               animate={
//                 servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
//               }
//               transition={
//                 { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//               }
//               className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
//               style={{
//                 color: theme.text.primary,
//                 fontFamily: "Syne, sans-serif",
//               }}
//             >
//               Every project is{" "}
//               <span className="relative inline-block" style={{ color: c }}>
//                 different.
//                 <svg
//                   viewBox="0 0 160 10"
//                   fill="none"
//                   className="absolute left-0 w-full"
//                   style={{ bottom: "-5px", height: "9px" }}
//                   aria-hidden="true"
//                 >
//                   <motion.path
//                     d="M2 6 C30 2, 70 8, 110 5 C135 2, 150 7, 158 6"
//                     stroke={c}
//                     strokeWidth="1.6"
//                     strokeLinecap="round"
//                     fill="none"
//                     initial={{ pathLength: 0, opacity: 0 }}
//                     animate={
//                       servicesInView ? { pathLength: 1, opacity: 0.65 } : {}
//                     }
//                     transition={
//                       {
//                         duration: 0.9,
//                         delay: 0.5,
//                         ease: "easeInOut",
//                       } as Transition
//                     }
//                   />
//                 </svg>
//               </span>
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 18 }}
//               animate={
//                 servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
//               }
//               transition={
//                 { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
//               }
//               className="text-base lg:text-[17px] leading-relaxed"
//               style={{ color: theme.text.secondary }}
//             >
//               Here are some of the areas I commonly help with.
//             </motion.p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {services.map((svc, i) => (
//               <motion.div
//                 key={svc.index}
//                 initial={{ opacity: 0, y: 32 }}
//                 animate={
//                   servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
//                 }
//                 transition={
//                   {
//                     duration: 0.55,
//                     delay: 0.2 + i * 0.1,
//                     ease: "easeOut",
//                   } as Transition
//                 }
//                 className="group relative flex flex-col rounded-2xl overflow-hidden"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                   boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
//                 }}
//               >
//                 <div
//                   className="absolute inset-x-0 top-0 h-[1.5px]"
//                   style={{
//                     background: `linear-gradient(90deg, transparent 0%, ${c}50 35%, ${c}80 52%, ${c}50 70%, transparent 100%)`,
//                     opacity: 0.7,
//                   }}
//                 />
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                   style={{
//                     background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${c}06, transparent 75%)`,
//                   }}
//                 />
//                 <div className="relative z-10 flex flex-col h-full p-5 gap-4">
//                   <div className="flex items-start justify-between">
//                     <div
//                       className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//                       style={{
//                         background: theme.accent.tintStrong,
//                         border: `1px solid ${theme.accent.border}`,
//                         color: c,
//                       }}
//                     >
//                       {svc.icon}
//                     </div>
//                     <span
//                       className="text-[28px] font-bold leading-none select-none"
//                       style={{
//                         color: `${c}10`,
//                         fontFamily: "Syne, sans-serif",
//                         letterSpacing: "-0.04em",
//                       }}
//                     >
//                       {svc.index}
//                     </span>
//                   </div>
//                   <h3
//                     className="text-[15px] font-bold leading-snug"
//                     style={{
//                       color: theme.text.primary,
//                       fontFamily: "Syne, sans-serif",
//                     }}
//                   >
//                     {svc.title}
//                   </h3>
//                   <p
//                     className="text-[13px] leading-relaxed flex-1"
//                     style={{ color: theme.text.secondary, lineHeight: "1.75" }}
//                   >
//                     {svc.body}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── DISCOVERY / CHAT ── */}
//       <section
//         id="chat-section"
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.base }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(ellipse 55% 40% at 50% 50%, ${theme.accent.glowSubtle}, transparent 65%)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 bottom-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />

//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
//           <div
//             ref={discoveryRef}
//             className="grid lg:grid-cols-2 gap-14 items-start"
//           >
//             <div className="flex flex-col gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={
//                   discoveryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//                 }
//                 transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//                 className="flex items-center gap-3"
//               >
//                 <div
//                   className="h-px w-8 flex-shrink-0"
//                   style={{
//                     background: `linear-gradient(to right, ${c}, transparent)`,
//                   }}
//                 />
//                 <span
//                   className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                   style={{
//                     color: theme.accent.text,
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                 >
//                   Have An Idea?
//                 </span>
//               </motion.div>
//               <motion.h2
//                 initial={{ opacity: 0, y: 22 }}
//                 animate={
//                   discoveryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
//                 }
//                 transition={
//                   { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//                 }
//                 className="text-4xl sm:text-5xl lg:text-[46px] font-bold leading-[1.08] tracking-tight"
//                 style={{
//                   color: theme.text.primary,
//                   fontFamily: "Syne, sans-serif",
//                 }}
//               >
//                 Not Sure Where <span style={{ color: c }}>To Start?</span>
//               </motion.h2>
//               <motion.div
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={
//                   discoveryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
//                 }
//                 transition={
//                   { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
//                 }
//                 className="flex flex-col gap-3"
//               >
//                 <p
//                   className="text-base leading-relaxed"
//                   style={{ color: theme.text.secondary }}
//                 >
//                   Many people know the problem they\'re trying to solve but
//                   aren\'t sure what the solution should look like. That\'s
//                   completely normal.
//                 </p>
//                 <p
//                   className="text-[14px] leading-relaxed"
//                   style={{ color: theme.text.tertiary }}
//                 >
//                   You don\'t need technical knowledge, specific technologies, or
//                   a requirements document. You simply need an idea, a challenge,
//                   or a goal.
//                 </p>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={
//                   discoveryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
//                 }
//                 transition={
//                   { duration: 0.55, delay: 0.3, ease: "easeOut" } as Transition
//                 }
//                 className="rounded-xl p-5 flex flex-col gap-3"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                 }}
//               >
//                 <div className="flex items-center gap-2 mb-0.5">
//                   <div
//                     className="w-1 h-3.5 rounded-full"
//                     style={{ background: c }}
//                   />
//                   <span
//                     className="text-[10px] font-semibold tracking-[0.18em] uppercase"
//                     style={{
//                       color: theme.text.muted,
//                       fontFamily: "\'DM Mono\', monospace",
//                     }}
//                   >
//                     AI Project Discovery
//                   </span>
//                 </div>
//                 <p
//                   className="text-[13px] leading-relaxed"
//                   style={{ color: theme.text.secondary }}
//                 >
//                   My AI assistant will ask simple questions about your business,
//                   challenges, goals, and vision. At the end, you\'ll receive a
//                   structured project summary sent directly to me for review.
//                 </p>
//                 <button
//                   onClick={scrollToChat}
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 self-start"
//                   style={{
//                     background: theme.accent.tintStrong,
//                     color: c,
//                     border: `1px solid ${theme.accent.border}`,
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                 >
//                   Chat With My AI Assistant
//                   <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                     <path
//                       d="M2 6H10M7 3L10 6L7 9"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </motion.div>
//             </div>
//             <ChatSection chatRef={chatRef} />
//           </div>
//         </div>
//       </section>

//       {/* ── WHO THIS IS FOR ── */}
//       <section
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.subtle }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 8%, ${theme.bg.muted} 100%)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 top-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 bottom-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />

//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
//           <div ref={audienceRef} className="flex flex-col gap-5 max-w-xl mb-14">
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={
//                 audienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//               }
//               transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//               className="flex items-center gap-3"
//             >
//               <div
//                 className="h-px w-8 flex-shrink-0"
//                 style={{
//                   background: `linear-gradient(to right, ${c}, transparent)`,
//                 }}
//               />
//               <span
//                 className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                 style={{
//                   color: theme.accent.text,
//                   fontFamily: "\'DM Mono\', monospace",
//                 }}
//               >
//                 Who This Is For
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 22 }}
//               animate={
//                 audienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
//               }
//               transition={
//                 { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//               }
//               className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
//               style={{
//                 color: theme.text.primary,
//                 fontFamily: "Syne, sans-serif",
//               }}
//             >
//               Problems I\'m <span style={{ color: c }}>Built For.</span>
//             </motion.h2>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4">
//             {audiences.map((item, i) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={
//                   audienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
//                 }
//                 transition={
//                   {
//                     duration: 0.55,
//                     delay: 0.2 + i * 0.1,
//                     ease: "easeOut",
//                   } as Transition
//                 }
//                 className="group relative flex flex-col rounded-2xl overflow-hidden"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                   boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
//                 }}
//               >
//                 <div
//                   className="absolute inset-x-0 top-0 h-[1.5px]"
//                   style={{
//                     background: `linear-gradient(90deg, transparent, ${c}55, transparent)`,
//                     opacity: 0.7,
//                   }}
//                 />
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                   style={{
//                     background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${c}05, transparent 70%)`,
//                   }}
//                 />
//                 <div className="relative z-10 flex flex-col h-full p-6 gap-4">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//                       style={{
//                         background: theme.accent.tintStrong,
//                         border: `1px solid ${theme.accent.border}`,
//                         color: c,
//                       }}
//                     >
//                       {item.icon}
//                     </div>
//                     <h3
//                       className="text-[15px] font-bold"
//                       style={{
//                         color: theme.text.primary,
//                         fontFamily: "Syne, sans-serif",
//                       }}
//                     >
//                       {item.title}
//                     </h3>
//                   </div>
//                   <p
//                     className="text-[13.5px] leading-relaxed"
//                     style={{ color: theme.text.secondary, lineHeight: "1.8" }}
//                   >
//                     {item.body}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── HOW WE WORK ── */}
//       <section
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.base }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(ellipse 60% 40% at 15% 50%, ${theme.accent.glowSubtle}, transparent 60%)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 bottom-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />

//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
//           <div
//             ref={collaborationRef}
//             className="flex flex-col gap-5 max-w-xl mb-14"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={
//                 collaborationInView
//                   ? { opacity: 1, y: 0 }
//                   : { opacity: 0, y: 14 }
//               }
//               transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//               className="flex items-center gap-3"
//             >
//               <div
//                 className="h-px w-8 flex-shrink-0"
//                 style={{
//                   background: `linear-gradient(to right, ${c}, transparent)`,
//                 }}
//               />
//               <span
//                 className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                 style={{
//                   color: theme.accent.text,
//                   fontFamily: "\'DM Mono\', monospace",
//                 }}
//               >
//                 How We Can Work Together
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 22 }}
//               animate={
//                 collaborationInView
//                   ? { opacity: 1, y: 0 }
//                   : { opacity: 0, y: 22 }
//               }
//               transition={
//                 { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//               }
//               className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
//               style={{
//                 color: theme.text.primary,
//                 fontFamily: "Syne, sans-serif",
//               }}
//             >
//               Four ways to <span style={{ color: c }}>collaborate.</span>
//             </motion.h2>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {collaborationTypes.map((item, i) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={
//                   collaborationInView
//                     ? { opacity: 1, y: 0 }
//                     : { opacity: 0, y: 28 }
//                 }
//                 transition={
//                   {
//                     duration: 0.55,
//                     delay: 0.2 + i * 0.1,
//                     ease: "easeOut",
//                   } as Transition
//                 }
//                 className="group relative flex flex-col rounded-2xl overflow-hidden"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                   boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
//                 }}
//               >
//                 <div
//                   className="absolute inset-x-0 top-0 h-[1.5px]"
//                   style={{
//                     background: `linear-gradient(90deg, transparent, ${c}55, transparent)`,
//                     opacity: 0.7,
//                   }}
//                 />
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                   style={{
//                     background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${c}06, transparent 75%)`,
//                   }}
//                 />
//                 <div className="relative z-10 flex flex-col h-full p-5 gap-3">
//                   <span
//                     className="text-[28px] font-bold leading-none select-none"
//                     style={{
//                       color: `${c}12`,
//                       fontFamily: "Syne, sans-serif",
//                       letterSpacing: "-0.04em",
//                     }}
//                   >
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                   <h3
//                     className="text-[14px] font-bold leading-snug"
//                     style={{
//                       color: theme.text.primary,
//                       fontFamily: "Syne, sans-serif",
//                     }}
//                   >
//                     {item.title}
//                   </h3>
//                   <p
//                     className="text-[12.5px] leading-relaxed flex-1"
//                     style={{ color: theme.text.secondary, lineHeight: "1.75" }}
//                   >
//                     {item.body}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── PROCESS / STEPS ── */}
//       <section
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.subtle }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, ${theme.bg.base} 0%, ${theme.bg.subtle} 8%, ${theme.bg.muted} 100%)`,
//           }}
//         />
//         <ProcessBgSVG />
//         <div
//           className="absolute inset-x-0 top-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 bottom-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.border.soft}, transparent)`,
//           }}
//         />

//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
//           <div ref={stepsRef} className="flex flex-col gap-5 max-w-xl mb-14">
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={
//                 stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
//               }
//               transition={{ duration: 0.5, ease: "easeOut" } as Transition}
//               className="flex items-center gap-3"
//             >
//               <div
//                 className="h-px w-8 flex-shrink-0"
//                 style={{
//                   background: `linear-gradient(to right, ${c}, transparent)`,
//                 }}
//               />
//               <span
//                 className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                 style={{
//                   color: theme.accent.text,
//                   fontFamily: "\'DM Mono\', monospace",
//                 }}
//               >
//                 What Happens Next
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 22 }}
//               animate={
//                 stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
//               }
//               transition={
//                 { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//               }
//               className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.06] tracking-tight"
//               style={{
//                 color: theme.text.primary,
//                 fontFamily: "Syne, sans-serif",
//               }}
//             >
//               From conversation <span style={{ color: c }}>to launch.</span>
//             </motion.h2>
//           </div>

//           <div className="flex flex-col gap-3">
//             {steps.map((step, i) => (
//               <motion.div
//                 key={step.n}
//                 initial={{ opacity: 0, x: -24 }}
//                 animate={
//                   stepsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
//                 }
//                 transition={
//                   {
//                     duration: 0.55,
//                     delay: 0.2 + i * 0.1,
//                     ease: "easeOut",
//                   } as Transition
//                 }
//                 className="group relative flex items-start gap-5 rounded-2xl overflow-hidden p-5 lg:p-6"
//                 style={{
//                   background: theme.surface[0],
//                   border: `1px solid ${theme.border.soft}`,
//                   boxShadow: `0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
//                 }}
//               >
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                   style={{
//                     background: `radial-gradient(ellipse 60% 80% at 0% 50%, ${c}04, transparent 65%)`,
//                   }}
//                 />
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{
//                     background: theme.accent.tintStrong,
//                     border: `1px solid ${theme.accent.border}`,
//                   }}
//                 >
//                   <span
//                     className="text-[11px] font-bold"
//                     style={{ color: c, fontFamily: "\'DM Mono\', monospace" }}
//                   >
//                     {step.n}
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-1 min-w-0">
//                   <h3
//                     className="text-[14px] font-bold"
//                     style={{
//                       color: theme.text.primary,
//                       fontFamily: "Syne, sans-serif",
//                     }}
//                   >
//                     {step.title}
//                   </h3>
//                   <p
//                     className="text-[13px] leading-relaxed"
//                     style={{ color: theme.text.secondary }}
//                   >
//                     {step.body}
//                   </p>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div
//                     className="absolute left-[30px] bottom-0 w-px h-3"
//                     style={{
//                       background: `linear-gradient(to bottom, ${c}25, transparent)`,
//                       transform: "translateY(100%)",
//                     }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FINAL CTA ── */}
//       <section
//         className="relative overflow-hidden py-24 lg:py-32"
//         style={{ background: theme.bg.base }}
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${theme.accent.glow}, transparent 70%)`,
//           }}
//         />
//         <div
//           className="absolute inset-x-0 top-0 h-px"
//           style={{
//             background: `linear-gradient(90deg, transparent, ${theme.accent.border}, transparent)`,
//           }}
//         />

//         <div
//           ref={ctaRef}
//           className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 32 }}
//             animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
//             transition={
//               { duration: 0.65, delay: 0.1, ease: "easeOut" } as Transition
//             }
//             className="relative rounded-2xl overflow-hidden"
//             style={{
//               background: theme.surface[0],
//               border: `1px solid ${theme.border.soft}`,
//               boxShadow: `0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
//             }}
//           >
//             <div
//               className="absolute inset-x-0 top-0 h-[1.5px]"
//               style={{
//                 background: `linear-gradient(90deg, transparent, ${c}70, transparent)`,
//               }}
//             />
//             <div
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${c}08, transparent 65%)`,
//               }}
//             />

//             <div className="relative z-10 flex flex-col items-center text-center gap-7 p-10 lg:p-16">
//               <div className="flex items-center gap-3">
//                 <div
//                   className="h-px w-8"
//                   style={{
//                     background: `linear-gradient(to right, transparent, ${c})`,
//                   }}
//                 />
//                 <span
//                   className="text-[10px] font-semibold tracking-[0.22em] uppercase"
//                   style={{
//                     color: theme.accent.text,
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                 >
//                   Got Something Interesting In Mind?
//                 </span>
//                 <div
//                   className="h-px w-8"
//                   style={{
//                     background: `linear-gradient(to left, transparent, ${c})`,
//                   }}
//                 />
//               </div>

//               <div className="flex flex-col gap-3 max-w-xl">
//                 <h2
//                   className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-tight tracking-tight"
//                   style={{
//                     color: theme.text.primary,
//                     fontFamily: "Syne, sans-serif",
//                   }}
//                 >
//                   Some of the best products start with a{" "}
//                   <span style={{ color: c }}>simple conversation.</span>
//                 </h2>
//                 <p
//                   className="text-[14px] leading-relaxed"
//                   style={{ color: theme.text.secondary }}
//                 >
//                   Whether you\'re exploring an idea, solving a business problem,
//                   improving an existing system, or building something entirely
//                   new — I\'d love to hear about it.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-center">
//                 <a
//                   href="#contact"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
//                   style={{
//                     background: theme.accent.primary,
//                     color: theme.accent.primaryForeground,
//                     boxShadow: `0 0 28px ${theme.accent.glowStrong}`,
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.background =
//                       theme.accent.primaryHover;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.background =
//                       theme.accent.primary;
//                   }}
//                 >
//                   Start A Conversation
//                 </a>
//                 <button
//                   onClick={scrollToChat}
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.primary,
//                     border: `1px solid ${theme.border.default}`,
//                     background: theme.surface[2],
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLButtonElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLButtonElement).style.background =
//                       theme.surface[3];
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLButtonElement).style.borderColor =
//                       theme.border.default;
//                     (e.currentTarget as HTMLButtonElement).style.background =
//                       theme.surface[2];
//                   }}
//                 >
//                   Chat With My AI Assistant
//                 </button>
//                 <a
//                   href={emailUrl}
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.secondary,
//                     border: `1px solid ${theme.border.soft}`,
//                     background: theme.surface[1],
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLAnchorElement).style.color = c;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.border.soft;
//                     (e.currentTarget as HTMLAnchorElement).style.color =
//                       theme.text.secondary;
//                   }}
//                 >
//                   <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
//                     <rect
//                       x="2"
//                       y="5"
//                       width="16"
//                       height="11"
//                       rx="2"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                     />
//                     <path
//                       d="M2 7L10 12L18 7"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                   Send An Email
//                 </a>
//               </div>

//               <div className="flex items-center gap-4 pt-2 flex-wrap justify-center">
//                 <a
//                   href={whatsappUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
//                   style={{
//                     color: theme.text.muted,
//                     border: `1px solid ${theme.border.subtle}`,
//                     background: theme.surface[1],
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.accent.border;
//                     (e.currentTarget as HTMLAnchorElement).style.color = c;
//                   }}
//                   onMouseLeave={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.borderColor =
//                       theme.border.subtle;
//                     (e.currentTarget as HTMLAnchorElement).style.color =
//                       theme.text.muted;
//                   }}
//                 >
//                   <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
//                     <path
//                       d="M10 1.5C5.3 1.5 1.5 5.3 1.5 10C1.5 11.6 1.9 13.1 2.7 14.4L1.5 18.5L5.7 17.3C7 18 8.5 18.5 10 18.5C14.7 18.5 18.5 14.7 18.5 10C18.5 5.3 14.7 1.5 10 1.5Z"
//                       stroke="currentColor"
//                       strokeWidth="1.3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M7.5 8.5C7.5 8.5 7.8 9.5 8.5 10.2C9.2 10.9 10.5 11.8 11 11.8C11.5 11.8 12.2 11 12.5 11C12.8 11 14 11.5 14 11.8C14 12.1 13.5 13.5 12 13.5C10.5 13.5 8 11.5 7 10C6 8.5 6.5 7.5 6.8 7.2C7.1 6.9 8 6.5 8.3 7C8.6 7.5 8.5 8.5 8.5 8.5Z"
//                       stroke="currentColor"
//                       strokeWidth="1.2"
//                     />
//                   </svg>
//                   WhatsApp
//                 </a>
//                 <span
//                   style={{ color: theme.border.medium }}
//                   className="text-xs select-none"
//                 >
//                   ·
//                 </span>
//                 <span
//                   className="text-[11px]"
//                   style={{
//                     color: theme.text.muted,
//                     fontFamily: "\'DM Mono\', monospace",
//                   }}
//                 >
//                   {CONTACT.location}
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }
