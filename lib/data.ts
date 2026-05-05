import {
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Globe2,
  GraduationCap,
  Handshake,
  Headphones,
  Layers3,
  LayoutDashboard,
  Paintbrush,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store
} from "lucide-react";

export const site = {
  name: "tribo",
  email: "hello@tribo.studio",
  phone: "+1 (555) 019-4270",
  whatsapp: "+15550194270",
  location: "Accra, Ghana · Serving African businesses and global clients",
  description:
    "tribo designs and develops high-performing websites, web applications, and digital systems for African businesses and global clients ready to grow."
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" }
];

export const stats = [
  { value: "86+", label: "Projects launched" },
  { value: "54+", label: "Businesses supported" },
  { value: "3×", label: "Average growth wins" },
  { value: "4-8 wks", label: "Typical delivery" }
];

export type HomepageStat = {
  value: string;
  label: string;
  published: boolean;
  sortOrder: number;
};

export const trustedBy = [
  "Apex Logistics",
  "Verde Fashion",
  "Cedar Grove Academy",
  "Northline Realty",
  "FrameHaus Studio"
];

export type TrustedBrand = {
  name: string;
  published: boolean;
  sortOrder: number;
};

export type Service = {
  icon: typeof Globe2;
  slug: string;
  title: string;
  description: string;
  href: string;
  features: string[];
  forWhom: string;
};

export const services: Service[] = [
  {
    icon: BriefcaseBusiness,
    slug: "business-websites",
    title: "Web Development",
    description:
      "Professional websites built to earn trust quickly, explain your offer clearly, and turn traffic into qualified leads.",
    href: "/services#business-websites",
    features: ["Conversion-focused pages", "CMS-ready structure", "Analytics setup"],
    forWhom: "Service businesses, professional firms, startups, and growing companies."
  },
  {
    icon: Store,
    slug: "ecommerce-development",
    title: "E-Commerce",
    description:
      "Online stores designed to help customers discover products, trust your brand, and buy with less friction.",
    href: "/services#ecommerce-development",
    features: ["Product catalogs", "Payment integrations", "Campaign landing pages"],
    forWhom: "Retail brands, product businesses, boutiques, and digital sellers."
  },
  {
    icon: GraduationCap,
    slug: "organization-websites",
    title: "UI/UX Design",
    description:
      "Interfaces and product flows that make your business feel more credible, usable, and conversion-ready.",
    href: "/services#organization-websites",
    features: ["Wireframes and page flows", "Design systems", "Trust-building interfaces"],
    forWhom: "Teams launching new products, redesigning old platforms, or improving weak UX."
  },
  {
    icon: LayoutDashboard,
    slug: "custom-web-applications",
    title: "Custom Web Apps",
    description:
      "Dashboards, portals, booking systems, and internal tools built around your actual workflow and business model.",
    href: "/services#custom-web-applications",
    features: ["Role-based dashboards", "API integrations", "Secure data workflows"],
    forWhom: "Teams replacing spreadsheets, manual operations, or disconnected systems."
  },
  {
    icon: Headphones,
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Ongoing updates, performance improvements, monitoring, and technical support after launch.",
    href: "/services#maintenance-support",
    features: ["Site updates", "Security checks", "Speed optimization"],
    forWhom: "Organizations that need a dependable digital partner after launch."
  },
  {
    icon: Sparkles,
    slug: "seo-performance",
    title: "SEO & Performance",
    description:
      "Technical optimization and search-ready structure that help your site load faster, rank better, and convert more visits.",
    href: "/services#seo-performance",
    features: ["SEO foundations", "Core Web Vitals work", "Technical audits"],
    forWhom: "Businesses with underperforming websites, weak search visibility, or slow page loads."
  }
];

export const categories = [
  "All",
  "Websites",
  "E-commerce",
  "Web Apps",
  "Branding",
  "UI/UX"
];

export type ProjectCategory =
  | "Websites"
  | "E-commerce"
  | "Web Apps"
  | "Branding"
  | "UI/UX";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  image: string;
  gallery: string[];
  description: string;
  summary: string;
  technologies: string[];
  liveUrl: string;
  caseStudyUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  client: string;
  year: string;
  results: string[];
  challenge: string;
  solution: string;
};

export const projects: Project[] = [
  {
    slug: "apex-logistics-website",
    title: "Apex Logistics Website",
    category: "Websites",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A corporate website for a logistics company with service pages, industry funnels, and a polished lead-generation flow.",
    summary:
      "We helped Apex Logistics replace a dated brochure site with a premium, conversion-ready digital presence.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Analytics"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/apex-logistics-website",
    featured: true,
    published: true,
    createdAt: "2026-01-12T10:00:00.000Z",
    updatedAt: "2026-01-12T10:00:00.000Z",
    client: "Apex Logistics",
    year: "2026",
    results: ["42% more quote requests", "1.1s faster page loads", "Six industry landing pages"],
    challenge:
      "Apex needed to look more established online while making it easier for procurement teams to request specific logistics services.",
    solution:
      "We built a clean service architecture, credibility-driven content blocks, and quote pathways that support both enterprise and regional buyers."
  },
  {
    slug: "verde-fashion-commerce",
    title: "Verde Fashion Store",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A premium fashion commerce experience with editorial product storytelling, smart collections, and streamlined checkout.",
    summary:
      "Verde Fashion needed a refined storefront that could elevate the brand and improve online sales performance.",
    technologies: ["Next.js", "Shopify", "Klaviyo", "Tailwind"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/verde-fashion-commerce",
    featured: true,
    published: true,
    createdAt: "2025-11-04T10:00:00.000Z",
    updatedAt: "2025-11-04T10:00:00.000Z",
    client: "Verde Fashion",
    year: "2025",
    results: ["31% conversion lift", "24% higher average order value", "Core Web Vitals passed"],
    challenge:
      "The previous store felt generic, loaded slowly, and gave the team limited flexibility for seasonal campaigns.",
    solution:
      "We created a modular storefront with high-impact collection pages, fast product discovery, and reusable campaign sections."
  },
  {
    slug: "cedar-grove-academy",
    title: "Cedar Grove Academy",
    category: "Websites",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A modern school website with admissions content, academic programs, news, events, and parent resources.",
    summary:
      "We redesigned Cedar Grove Academy's website to support admissions, community updates, and institutional trust.",
    technologies: ["Next.js", "CMS", "SEO", "Accessibility"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/cedar-grove-academy",
    featured: true,
    published: true,
    createdAt: "2026-02-18T10:00:00.000Z",
    updatedAt: "2026-02-18T10:00:00.000Z",
    client: "Cedar Grove Academy",
    year: "2026",
    results: ["28% increase in inquiry starts", "AA accessibility pass", "CMS training delivered"],
    challenge:
      "Important admissions and parent information was hard to find, especially on mobile devices.",
    solution:
      "We created audience-specific navigation, clear program pages, and a content system for events, notices, and resources."
  },
  {
    slug: "northline-realty-platform",
    title: "Northline Realty Platform",
    category: "Web Apps",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A real estate listing platform with property search, saved listings, agent tools, and lead routing.",
    summary:
      "Northline needed a faster listing experience and an internal dashboard for managing inquiries across offices.",
    technologies: ["React", "PostgreSQL", "Maps API", "Node.js"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/northline-realty-platform",
    featured: true,
    published: true,
    createdAt: "2025-08-21T10:00:00.000Z",
    updatedAt: "2025-08-21T10:00:00.000Z",
    client: "Northline Realty",
    year: "2025",
    results: ["18 hours saved weekly", "3 office workflows unified", "Real-time inquiry routing"],
    challenge:
      "Listings, inquiries, and agent follow-up tasks were split across multiple disconnected tools.",
    solution:
      "We developed a searchable property platform and admin workflow that gives agents better visibility and faster response times."
  },
  {
    slug: "framehaus-photography-portfolio",
    title: "FrameHaus Portfolio",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A high-end creative portfolio for a photographer with galleries, case stories, and inquiry-focused booking paths.",
    summary:
      "FrameHaus needed a portfolio that felt editorial, premium, and commercially useful for new client inquiries.",
    technologies: ["Next.js", "Brand System", "Framer Motion", "CMS"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/framehaus-photography-portfolio",
    featured: false,
    published: true,
    createdAt: "2026-03-02T10:00:00.000Z",
    updatedAt: "2026-03-02T10:00:00.000Z",
    client: "FrameHaus Studio",
    year: "2026",
    results: ["Premium brand refresh", "9 gallery templates", "Improved inquiry quality"],
    challenge:
      "The existing portfolio showcased strong work but did not communicate positioning or guide visitors toward booking.",
    solution:
      "We created a restrained brand system, immersive galleries, and case-based storytelling that supports higher-value inquiries."
  },
  {
    slug: "reservepro-booking-dashboard",
    title: "ReservePro Booking Dashboard",
    category: "UI/UX",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A booking platform and management dashboard for appointments, staff capacity, customer records, and reporting.",
    summary:
      "ReservePro required a clean product interface that could make scheduling operations easier for multi-location teams.",
    technologies: ["Figma", "React", "TypeScript", "API Design"],
    liveUrl: "https://example.com",
    caseStudyUrl: "/projects/reservepro-booking-dashboard",
    featured: false,
    published: true,
    createdAt: "2025-09-14T10:00:00.000Z",
    updatedAt: "2025-09-14T10:00:00.000Z",
    client: "ReservePro",
    year: "2025",
    results: ["Clickable product prototype", "Design system delivered", "Admin workflow mapped"],
    challenge:
      "The product team had a strong idea but needed a clear UX architecture before moving into full engineering.",
    solution:
      "We mapped booking flows, designed a dashboard system, and validated key interactions with a polished prototype."
  }
];

export const reasons = [
  {
    icon: Smartphone,
    title: "Faster websites, better outcomes",
    text: "We prioritize speed, mobile usability, and clarity so your website helps people act instead of leaving."
  },
  {
    icon: ShieldCheck,
    title: "Built to earn trust quickly",
    text: "Your site often makes the first impression. We design polished digital experiences that make your business feel credible."
  },
  {
    icon: Layers3,
    title: "Solutions shaped to your business",
    text: "We do not force template thinking onto real businesses. Scope, structure, and features are shaped around your goals."
  },
  {
    icon: Code2,
    title: "Work directly with the builders",
    text: "You work with the people planning, designing, and building the product, which keeps decisions faster and clearer."
  },
  {
    icon: SearchCheck,
    title: "Growth-minded from day one",
    text: "SEO, performance, structure, and conversion cues are considered early so your site supports real business growth."
  }
];

export const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn how your business works, who you serve, and what the website or product needs to achieve."
  },
  {
    step: "02",
    title: "Strategy & Design",
    description: "We shape the structure, messaging, and interface around trust, clarity, and conversion."
  },
  {
    step: "03",
    title: "Build & Optimize",
    description: "We develop a fast, dependable system with the right integrations, performance work, and polish."
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "We launch carefully, verify the details, and help you keep improving after release."
  }
];

export const team = [
  {
    name: "Maya Chen",
    role: "Frontend Developer",
    bio: "Builds polished interfaces, responsive systems, and component libraries with a focus on speed and accessibility.",
    image: "/images/team-placeholder.svg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Elliot Brooks",
    role: "Backend Developer",
    bio: "Designs reliable APIs, dashboards, databases, and integrations for custom software and web applications.",
    image: "/images/team-placeholder.svg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Nora Patel",
    role: "UI/UX Designer",
    bio: "Shapes strategy, flows, wireframes, and premium visual systems that make digital products easier to trust.",
    image: "/images/team-placeholder.svg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Julian Reed",
    role: "Project Manager",
    bio: "Keeps timelines, priorities, feedback, and launch details organized from first call to post-launch support.",
    image: "/images/team-placeholder.svg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Amara Lewis",
    role: "Brand/Creative Designer",
    bio: "Develops messaging, brand direction, and creative systems that give every launch a confident visual voice.",
    image: "/images/team-placeholder.svg",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  }
];

export const testimonials = [
  {
    quote:
      "Tribo gave our company a website that finally matches the quality of our work. The process was strategic, organized, and commercially focused.",
    name: "Daniel Price",
    role: "Operations Director, Apex Logistics",
    initials: "DP",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote:
      "The new store feels premium and performs better. We can launch collections faster, track campaigns clearly, and trust the site during busy periods.",
    name: "Olivia Grant",
    role: "Founder, Verde Fashion",
    initials: "OG",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote:
      "They understood the needs of our school community and built a site that is easier for parents, applicants, and staff to use every day.",
    name: "Marcus Hill",
    role: "Administrator, Cedar Grove Academy",
    initials: "MH",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80"
  }
];

export const faqs = [
  {
    category: "Pricing",
    question: "How much does a website cost?",
    answer:
      "Pricing depends on scope, page count, content needs, integrations, and timeline. Focused websites often start in the mid four figures, while larger platforms or custom web apps are quoted after discovery."
  },
  {
    category: "Pricing",
    question: "Do you offer fixed-price packages?",
    answer:
      "Yes for clearly defined websites and redesigns. Custom software, dashboards, and complex integrations are usually scoped in milestones."
  },
  {
    category: "Process",
    question: "How long does a project take?",
    answer:
      "Most business websites take 4-8 weeks. E-commerce and custom software projects vary based on functionality, content readiness, and approval speed."
  },
  {
    category: "Process",
    question: "What do you need from us to get started?",
    answer:
      "We typically need your goals, audience, existing brand materials, preferred timeline, budget range, and examples of websites or products you admire."
  },
  {
    category: "Support",
    question: "Can you maintain the site after launch?",
    answer:
      "Yes. We offer ongoing support for updates, performance improvements, monitoring, content changes, and technical guidance."
  },
  {
    category: "Support",
    question: "Do you provide training?",
    answer:
      "Yes. If your project includes a CMS or admin dashboard, we provide handoff guidance so your team can confidently manage the system."
  },
  {
    category: "Services",
    question: "Do you work with organizations and institutions?",
    answer:
      "Yes. We build websites and systems for schools, nonprofits, foundations, associations, businesses, creative professionals, and public-facing organizations."
  },
  {
    category: "Services",
    question: "Do you offer redesign services?",
    answer:
      "Yes. We can audit your existing site, improve the user experience, modernize the visual system, and rebuild it with a cleaner technical foundation."
  }
];

export const values = [
  {
    icon: Handshake,
    title: "Clarity",
    text: "We communicate plainly, define scope carefully, and make each decision easy to understand."
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "We build dependable systems and keep the launch process organized, visible, and professional."
  },
  {
    icon: Paintbrush,
    title: "Craft",
    text: "We care about detail, hierarchy, performance, accessibility, and how the final product feels to use."
  },
  {
    icon: BarChart3,
    title: "Outcomes",
    text: "We connect design and engineering decisions to business goals, user needs, and measurable results."
  }
];

export const aboutHighlights = [
  "Premium digital presence for businesses and institutions",
  "Custom web apps and operational tools",
  "Design systems and scalable component architecture",
  "Launch planning, support, and continuous improvement"
];
