export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://bhupesh.me";

export const SITE = {
  url: SITE_URL,
  name: "BhupeshB7",
  legalName: "Bhupesh Kumar",
  title: "Bhupesh Kumar | Software Engineer | Backend Developer | BhupeshB7",
  description:
    "Personal portfolio of Bhupesh Kumar (BhupeshB7). Explore software engineering projects, backend architecture, MERN applications, system design case studies, and consulting services.",
  email: "contact@bhupesh.me",
  phone: "+918581869783",
  location: "India",
  availability: "Available for remote software projects and consulting",
  bookingUrl: "https://cal.com/bhupeshb7/intro-call",
  googleMeetUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Project%20Call%20with%20Bhupesh%20Kumar&details=Project%20discussion%20with%20Bhupesh%20Kumar%20(BhupeshB7).&location=Google%20Meet",
  facts: [
    "Bhupesh Kumar is also known online as BhupeshB7.",
    "Bhupesh works on backend systems, APIs, MERN applications, SaaS MVPs, AI workflow integrations, and business software.",
    "Bhupesh is based in India and works remotely with clients and teams.",
    "Primary contact email is contact@bhupesh.me.",
    "Primary WhatsApp number is +91 85818 69783.",
    "Public profiles are GitHub, LinkedIn, and X under bhupeshb7.",
  ],
  sameAs: [
    "https://github.com/bhupeshb7",
    "https://linkedin.com/in/bhupeshb7",
    "https://twitter.com/bhupeshb7",
  ],
  ogImage: "/images/project1.png",
  keywords: [
    "Bhupesh Kumar",
    "BhupeshB7",
    "Bhupesh Kumar Portfolio",
    "Bhupesh Kumar Developer",
    "Backend Developer",
    "Node.js Developer",
    "MERN Developer",
    "Full Stack Developer",
    "Software Engineer",
    "System Design Engineer",
    "Backend Architecture Consultant",
    "Hire Node.js Developer India",
    "Build SaaS MVP",
    "Node.js API Development",
    "Scalable Backend Development",
  ],
} as const;

export const SEO_PAGES = [
  {
    path: "/",
    title: SITE.title,
    description: SITE.description,
    keywords: [
      "Bhupesh Kumar",
      "BhupeshB7",
      "Backend Developer",
      "Software Engineer",
      "Node.js Developer",
      "MERN Developer",
    ],
    priority: 1,
  },
  {
    path: "/about",
    title: "About Bhupesh Kumar | BhupeshB7 Software Engineer",
    description:
      "Learn about Bhupesh Kumar, also known as BhupeshB7, a software engineer focused on backend systems, MERN applications, system design, and product engineering.",
    keywords: [
      "About Bhupesh Kumar",
      "BhupeshB7 About",
      "Software Engineer India",
      "Backend Developer India",
    ],
    priority: 0.9,
  },
  {
    path: "/project",
    title: "Projects by Bhupesh Kumar | Backend, MERN and System Design Work",
    description:
      "Explore software projects by Bhupesh Kumar, including backend architecture, MERN applications, scalable systems, authentication, dashboards, and product engineering case work.",
    keywords: [
      "Bhupesh Kumar Projects",
      "BhupeshB7 Portfolio",
      "Backend Architecture Projects",
      "MERN Projects",
      "Node.js Projects",
      "System Design Projects",
    ],
    priority: 0.9,
  },
  {
    path: "/work-with-me",
    title: "Work With Bhupesh Kumar | Backend Developer and Technical Consultant",
    description:
      "Hire Bhupesh Kumar for web applications, SaaS MVPs, backend systems, APIs, AI-powered workflows, and technical consulting for startups and businesses.",
    keywords: [
      "Hire Bhupesh Kumar",
      "Hire Node.js Developer India",
      "Backend Architecture Consultant",
      "SaaS MVP Developer",
      "Technical Consultant India",
    ],
    priority: 0.95,
  },
  {
    path: "/contact",
    title: "Contact Bhupesh Kumar | BhupeshB7",
    description:
      "Contact Bhupesh Kumar for software engineering roles, freelance projects, backend development, SaaS MVPs, APIs, and technical consulting.",
    keywords: [
      "Contact Bhupesh Kumar",
      "BhupeshB7 Contact",
      "Hire Backend Developer India",
      "Software Consultant India",
    ],
    priority: 0.85,
  },
] as const;

export const FEATURED_PROJECTS = [
  {
    name: "Google Drive Clone MERN",
    slug: "google-drive-clone",
    description:
      "A file storage and sharing product concept focused on uploads, folders, authentication, and scalable backend design.",
    keywords: ["Google Drive Clone MERN", "File Storage App", "MERN Backend"],
  },
  {
    name: "Distributed Ticket Booking System",
    slug: "distributed-ticket-booking-system",
    description:
      "A backend-heavy system design project exploring concurrency, seat locking, queues, payments, and reliability tradeoffs.",
    keywords: [
      "Distributed Ticket Booking System",
      "System Design Engineer",
      "Scalable Backend",
    ],
  },
  {
    name: "Ecommerce Backend Node.js",
    slug: "ecommerce-backend",
    description:
      "An ecommerce backend architecture focused on products, carts, orders, authentication, payments, and operational workflows.",
    keywords: ["Ecommerce Backend Node.js", "Node.js API Development"],
  },
] as const;
