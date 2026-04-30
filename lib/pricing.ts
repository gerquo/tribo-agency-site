export type PricingBand = {
  title: string;
  range: string;
  description: string;
  includes: string[];
};

export type PricingPackage = PricingBand & {
  sortOrder?: number;
  published?: boolean;
};

export type PricingFactor = {
  text: string;
  sortOrder?: number;
  published?: boolean;
};

export type ProjectTypeOption = {
  id: string;
  label: string;
  base: number;
  summary: string;
};

export type ModifierOption = {
  id: string;
  label: string;
  modifier: number;
  summary: string;
};

export const pricingBands: PricingPackage[] = [
  {
    title: "Focused Website",
    range: "GH₵45,000 - GH₵95,000",
    description:
      "A polished marketing site or small business website with a clear structure, responsive layouts, and conversion-focused messaging.",
    includes: [
      "Up to 6 key pages",
      "Responsive design system",
      "Contact forms and SEO basics",
      "Launch support"
    ]
  },
  {
    title: "Growth Website",
    range: "GH₵95,000 - GH₵190,000",
    description:
      "A stronger brand or organization site with more content depth, refined interactions, CMS flexibility, and stronger conversion planning.",
    includes: [
      "Custom page templates",
      "CMS or admin content workflow",
      "Analytics and optimization setup",
      "Content structure guidance"
    ]
  },
  {
    title: "E-commerce or Platform",
    range: "GH₵150,000 - GH₵380,000+",
    description:
      "For commerce builds, dashboards, booking systems, portals, and software products that involve more workflow, integrations, and user roles.",
    includes: [
      "Advanced user journeys",
      "Payment or platform integrations",
      "Operational dashboards",
      "Technical planning and QA"
    ]
  }
];

export const pricingFactors: PricingFactor[] = [
  { text: "Number of pages, templates, or user flows" },
  { text: "Content creation, migration, or CMS needs" },
  { text: "Custom functionality and API integrations" },
  { text: "Brand depth, UI polish, and motion design" },
  { text: "Timeline pressure and post-launch support" }
];

export const pricingEstimatorOptions: {
  projectTypes: ProjectTypeOption[];
  scopeLevels: ModifierOption[];
  contentSupport: ModifierOption[];
  integrations: ModifierOption[];
  timeline: ModifierOption[];
} = {
  projectTypes: [
    {
      id: "business-site",
      label: "Business Website",
      base: 58000,
      summary: "Best for service businesses, firms, and professional brands."
    },
    {
      id: "organization-site",
      label: "Organization Website",
      base: 82000,
      summary: "A stronger structure for institutions, schools, nonprofits, and programs."
    },
    {
      id: "ecommerce",
      label: "E-commerce Website",
      base: 145000,
      summary: "For stores with catalogs, campaigns, and conversion-focused buying flows."
    },
    {
      id: "web-app",
      label: "Web App / Software",
      base: 210000,
      summary: "For dashboards, booking tools, portals, and operational products."
    }
  ],
  scopeLevels: [
    { id: "lean", label: "Lean scope", modifier: 0, summary: "A tight first version with essential pages or flows." },
    { id: "standard", label: "Standard scope", modifier: 32000, summary: "More depth, stronger content structure, and more polish." },
    { id: "expanded", label: "Expanded scope", modifier: 76000, summary: "Broader content, templates, and higher visual or technical ambition." }
  ],
  contentSupport: [
    { id: "client", label: "Content ready", modifier: 0, summary: "You already have usable copy, structure, and assets." },
    { id: "guided", label: "Guided support", modifier: 18000, summary: "We help shape messaging, content flow, and page priorities." },
    { id: "full", label: "Full content help", modifier: 42000, summary: "We support content planning, restructuring, and launch preparation." }
  ],
  integrations: [
    { id: "minimal", label: "Minimal integrations", modifier: 0, summary: "Basic forms, analytics, and simple third-party tools." },
    { id: "moderate", label: "Moderate integrations", modifier: 28000, summary: "CRM, bookings, payment flows, or data syncs." },
    { id: "advanced", label: "Advanced integrations", modifier: 68000, summary: "Complex APIs, multi-system workflows, or custom logic." }
  ],
  timeline: [
    { id: "flexible", label: "Flexible timeline", modifier: 0, summary: "A normal planning and delivery pace." },
    { id: "priority", label: "Priority timeline", modifier: 22000, summary: "A faster pace with tighter feedback loops." },
    { id: "accelerated", label: "Accelerated timeline", modifier: 52000, summary: "Reserved for urgent launches and compressed delivery windows." }
  ]
};
