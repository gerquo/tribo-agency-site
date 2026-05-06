"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WebsiteType =
  | "business"
  | "ecommerce"
  | "booking"
  | "portfolio"
  | "product";

type GoalType =
  | "generate-leads"
  | "sell-online"
  | "build-trust"
  | "book-clients"
  | "show-work";

type BudgetType =
  | "starter"
  | "growth"
  | "premium"
  | "enterprise";

type AudienceType =
  | "small-business-owners"
  | "shoppers"
  | "corporate-teams"
  | "students-parents"
  | "patients-clients"
  | "property-seekers"
  | "founders-investors"
  | "creative-clients";

type ProblemType =
  | "unclear-message"
  | "low-trust"
  | "weak-conversion"
  | "poor-mobile"
  | "slow-site"
  | "outdated-design"
  | "messy-navigation"
  | "low-sales";

type AuditResult = {
  summary: string;
  quickWins: string[];
  priorities: string[];
  nextStep: string;
};

const websiteTypes: Array<{ id: WebsiteType; label: string; summary: string }> = [
  { id: "business", label: "Business website", summary: "For services, companies, and organizations." },
  { id: "ecommerce", label: "E-commerce", summary: "For stores, catalogues, and online sales." },
  { id: "booking", label: "Booking or appointments", summary: "For clinics, agencies, salons, and reservations." },
  { id: "portfolio", label: "Portfolio or studio", summary: "For creatives, studios, and personal brands." },
  { id: "product", label: "Web app or product", summary: "For tools, dashboards, and software platforms." }
];

const goalTypes: Array<{ id: GoalType; label: string; summary: string }> = [
  { id: "generate-leads", label: "Generate leads", summary: "Turn visitors into enquiries and qualified prospects." },
  { id: "sell-online", label: "Sell online", summary: "Increase product trust and improve conversion flow." },
  { id: "build-trust", label: "Build trust", summary: "Look more credible and professional quickly." },
  { id: "book-clients", label: "Book clients", summary: "Move visitors smoothly into calls or appointments." },
  { id: "show-work", label: "Show work", summary: "Present projects with more clarity and authority." }
];

const budgetTypes: Array<{ id: BudgetType; label: string; summary: string }> = [
  { id: "starter", label: "Starter budget", summary: "Lean launch scope with the essentials done well." },
  { id: "growth", label: "Growth budget", summary: "More content, stronger UX, and better conversion planning." },
  { id: "premium", label: "Premium budget", summary: "Polished delivery with stronger systems, detail, and flexibility." },
  { id: "enterprise", label: "Enterprise budget", summary: "Larger or more complex builds with deeper workflow needs." }
];

const audienceTypes: Array<{ id: AudienceType; label: string; summary: string }> = [
  { id: "small-business-owners", label: "Small business owners", summary: "People looking for clear services, proof, and an easy next step." },
  { id: "shoppers", label: "Online shoppers", summary: "Visitors who need product trust, speed, and checkout confidence." },
  { id: "corporate-teams", label: "Corporate teams", summary: "Decision-makers looking for credibility, clarity, and professionalism." },
  { id: "students-parents", label: "Students and parents", summary: "Users who need trust, simplicity, and quick understanding." },
  { id: "patients-clients", label: "Patients or clients", summary: "People who need reassurance, clarity, and easy booking." },
  { id: "property-seekers", label: "Property seekers", summary: "Visitors comparing options and looking for trust and detail." },
  { id: "founders-investors", label: "Founders or investors", summary: "Users looking for signal, traction, and product clarity." },
  { id: "creative-clients", label: "Creative clients", summary: "People evaluating taste, quality, and fit through the work." }
];

const problemTypes: Array<{ id: ProblemType; label: string }> = [
  { id: "unclear-message", label: "Visitors do not understand the offer quickly" },
  { id: "low-trust", label: "The site does not feel trustworthy enough" },
  { id: "weak-conversion", label: "People visit but do not take action" },
  { id: "poor-mobile", label: "The mobile experience feels weak" },
  { id: "slow-site", label: "The site feels slow or heavy" },
  { id: "outdated-design", label: "The design feels dated" },
  { id: "messy-navigation", label: "Navigation is confusing" },
  { id: "low-sales", label: "Sales or enquiries are lower than expected" }
];

const websiteSummaryMap: Record<WebsiteType, string[]> = {
  business: [
    "This should behave like a clear trust-building business website, with fast positioning, visible proof, and obvious next steps.",
    "This type of site should reduce hesitation quickly by making the offer, credibility, and contact path feel very clear.",
    "This should function like a serious commercial front door: easy to understand, easy to trust, and easy to act on."
  ],
  ecommerce: [
    "This should behave like a sales system first: strong product clarity, trust signals, and a cleaner route to checkout.",
    "This type of site should remove purchase friction by making products easier to evaluate and checkout easier to trust.",
    "This should operate like a conversion-focused store, not just a catalogue, with mobile simplicity and stronger confidence cues."
  ],
  booking: [
    "This should move visitors from interest to action quickly with clear service explanation and low-friction booking flow.",
    "This type of site should make scheduling feel simple, trustworthy, and obvious from the first few scrolls.",
    "This should help people understand the service fast and then remove friction from the booking path."
  ],
  portfolio: [
    "This should present work with authority, context, and enough proof to help the right clients self-qualify.",
    "This type of site should make the work feel more valuable by clarifying the role, results, and relevance of each project.",
    "This should behave like a credibility engine, not just a gallery, with clearer positioning and stronger proof."
  ],
  product: [
    "This should explain the product clearly, reduce confusion around the offer, and build confidence around usefulness and reliability.",
    "This type of site should help people understand what the platform does, who it helps, and why it is worth trusting.",
    "This should behave like a serious software/product site, with stronger feature clarity, onboarding cues, and trust signals."
  ]
};

const goalSummaryMap: Record<GoalType, string[]> = {
  "generate-leads": [
    "The main audit lens should be conversion clarity: stronger headlines, stronger proof, and simpler calls to action.",
    "The biggest opportunity is usually better lead capture through clearer value framing and lower-friction enquiry paths.",
    "This should prioritize making the next step feel obvious and low-risk for qualified visitors."
  ],
  "sell-online": [
    "The main audit lens should be purchase confidence: product trust, delivery/payment clarity, and less checkout friction.",
    "This should prioritize sales flow by reducing hesitation around products, payment, and delivery confidence.",
    "The clearest opportunity is usually making the path from browsing to buying feel more trustworthy and more direct."
  ],
  "build-trust": [
    "The main audit lens should be credibility: stronger positioning, cleaner hierarchy, and more visible proof signals.",
    "This should prioritize first-impression trust through authority cues, proof, and more controlled presentation.",
    "The biggest gain is usually making the site look more dependable, more intentional, and more business-ready."
  ],
  "book-clients": [
    "The main audit lens should be action flow: make booking feel faster, clearer, and lower-friction.",
    "This should prioritize quick path-to-booking decisions with fewer points of uncertainty along the way.",
    "The clearest opportunity is usually simplifying the route from attention to confirmed booking."
  ],
  "show-work": [
    "The main audit lens should be presentation quality: stronger project storytelling, more authority, and better qualification of leads.",
    "This should prioritize curation, hierarchy, and context so the work feels more valuable and easier to trust.",
    "The best gain is usually making the work easier to scan while increasing the perceived quality behind it."
  ]
};

const problemAdviceMap: Record<ProblemType, string[]> = {
  "unclear-message": [
    "Rewrite the opening message so the offer is understood in the first few seconds.",
    "Tighten the headline and subheadline so visitors know exactly what you do faster."
  ],
  "low-trust": [
    "Bring testimonials, client proof, or measurable results much closer to the top of the page.",
    "Add stronger trust markers such as reviews, process clarity, guarantees, or recognisable proof."
  ],
  "weak-conversion": [
    "Make the primary call to action stronger, clearer, and more repeated across the page.",
    "Reduce friction between interest and action by simplifying forms and next-step decisions."
  ],
  "poor-mobile": [
    "Prioritize mobile spacing, thumb-friendly buttons, and quicker top-level clarity.",
    "Simplify the mobile experience so visitors do not have to work to find the next step."
  ],
  "slow-site": [
    "Reduce image weight and visual overhead so the site feels more immediate.",
    "Trim heavy assets and simplify the first-load experience to improve perceived speed."
  ],
  "outdated-design": [
    "Refresh the visual hierarchy so the site feels more current, more controlled, and more premium.",
    "Update the presentation language so the business looks more established and intentional."
  ],
  "messy-navigation": [
    "Reduce menu complexity and make the most important paths easier to spot.",
    "Clean up navigation labels and content grouping so visitors get lost less often."
  ],
  "low-sales": [
    "Bring product or offer value into clearer focus and make buying decisions feel safer.",
    "Improve conversion pressure points by clarifying value, trust, and next-step incentives."
  ]
};

const budgetGuidanceMap: Record<BudgetType, string[]> = {
  starter: [
    "Because the budget is leaner, the smartest move is to focus on the highest-impact pages and the clearest conversion path first.",
    "At this budget level, clarity and focus matter more than trying to add every idea at once."
  ],
  growth: [
    "This budget range gives room for stronger UX, more persuasive content structure, and better conversion planning.",
    "At this level, it makes sense to improve both credibility and the operational quality of the site."
  ],
  premium: [
    "A premium budget should produce a noticeably more polished system, not just more pages.",
    "At this level, the opportunity is to combine stronger UX, cleaner systems, and more refined execution."
  ],
  enterprise: [
    "At this scope, the audit should think in systems: workflows, integrations, governance, and long-term maintainability.",
    "For larger investments, the most important shift is from page-building to structured digital infrastructure."
  ]
};

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickVariant(items: string[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function buildAudit({
  websiteType,
  goal,
  audienceType,
  audienceNotes,
  brief,
  websiteUrl,
  problems,
  budget
}: {
  websiteType: WebsiteType;
  goal: GoalType;
  audienceType: AudienceType;
  audienceNotes: string;
  brief: string;
  websiteUrl: string;
  problems: ProblemType[];
  budget: BudgetType;
}): AuditResult {
  const selectedAudience = audienceTypes.find((item) => item.id === audienceType);
  const audienceText =
    audienceNotes.trim().length > 0
      ? `${selectedAudience?.label ?? "your target audience"} (${audienceNotes.trim()})`
      : selectedAudience?.label ?? "your target audience";
  const trimmedBrief = brief.trim().toLowerCase();
  const seed = hashText(
    [websiteType, goal, audienceType, audienceNotes, brief, websiteUrl, budget, ...problems].join("|")
  );
  const mentionsWhatsapp =
    trimmedBrief.includes("whatsapp") || trimmedBrief.includes("chat");
  const mentionsMobile =
    trimmedBrief.includes("mobile") || trimmedBrief.includes("phone");
  const mentionsSpeed =
    trimmedBrief.includes("slow") || trimmedBrief.includes("speed") || problems.includes("slow-site");

  const summary = `${pickVariant(websiteSummaryMap[websiteType], seed)} ${pickVariant(
    goalSummaryMap[goal],
    seed,
    1
  )} For ${audienceText}, the first impression and next action need to become clearer much faster.`;

  const quickWins = [
    `Rewrite the hero section so ${audienceText} understand what you do and why it matters within the first few seconds.`,
    problems.length > 0
      ? pickVariant(problemAdviceMap[problems[0]], seed, 2)
      : goal === "sell-online"
        ? "Bring trust signals closer to products and checkout: reviews, delivery clarity, payment confidence, and return expectations."
        : goal === "book-clients"
          ? "Make the primary booking or enquiry action visible above the fold and repeated lower on the page."
          : "Make the primary call to action visible above the fold and repeated lower on the page.",
    websiteType === "portfolio"
      ? "Show fewer projects more clearly, with stronger captions about business results, role, or problem solved."
      : websiteType === "product"
        ? "Break complex features into clearer sections so the product feels easier to understand."
        : "Reduce dense text blocks and turn them into clearer sections with stronger headings and supporting visuals.",
    mentionsWhatsapp
      ? "If WhatsApp matters to the business, make it a visible contact path without letting it compete with the main conversion goal."
      : mentionsMobile
        ? "Tighten the above-the-fold mobile layout so the next action feels obvious without scrolling too far."
        : "Bring one stronger proof block closer to the top so the site earns trust earlier."
  ];

  const priorities = [
    websiteType === "ecommerce"
      ? "Prioritize mobile shopping flow, product clarity, payment confidence, and frictionless path to checkout."
      : websiteType === "booking"
        ? "Prioritize service explanation, trust details, and the shortest possible path to booking or enquiry."
        : websiteType === "product"
          ? "Prioritize product explanation, onboarding clarity, and visible signals that the platform is useful and dependable."
          : websiteType === "portfolio"
            ? "Prioritize stronger case-study hierarchy, clearer specialization, and better lead qualification."
            : "Prioritize positioning, navigation clarity, and a cleaner conversion path.",
    goal === "build-trust"
      ? "Strengthen proof signals: testimonials, recognisable clients, results, and professional visual hierarchy."
      : goal === "generate-leads"
        ? "Strengthen conversion structure: clearer calls to action, simpler forms, and more direct value framing."
        : goal === "show-work"
          ? "Strengthen presentation structure so the work feels easier to scan and easier to trust."
          : "Strengthen the path from attention to action so the site feels easier to use.",
    pickVariant(budgetGuidanceMap[budget], seed, 2),
    problems.includes("messy-navigation")
      ? "Clean up the information architecture so visitors know where to go next without scanning too many competing options."
      : problems.includes("outdated-design")
        ? "Refresh the surface language so the site feels more current, more intentional, and more aligned with the business quality."
        : mentionsSpeed
          ? "Improve perceived performance through leaner assets, clearer prioritization, and less visual drag on first load."
          : "Improve spacing, trust details, and visual rhythm so the experience feels more professional on first visit."
  ];

  const nextStep = websiteUrl.trim()
    ? `Because you already have a site at ${websiteUrl.trim()}, the next step is to request a tailored quote with your goals, timeline, and current friction points through the contact page.`
    : `If you want a tailored quote for ${audienceText}, the next step is to send your goals, timeline, and any current site link through the contact page.`;

  return { summary, quickWins, priorities, nextStep };
}

function ChoiceGroup<T extends string>({
  title,
  items,
  selected,
  onSelect
}: {
  title: string;
  items: Array<{ id: T; label: string; summary: string }>;
  selected: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-[1.7rem] font-semibold tracking-tight">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => {
          const active = item.id === selected;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary/8 shadow-sm"
                  : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-sm"
              )}
              aria-pressed={active}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
                <span
                  className={cn(
                    "mt-1 h-3.5 w-3.5 rounded-full border",
                    active ? "border-primary bg-primary" : "border-border bg-transparent"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AuditWorkbench() {
  const [websiteType, setWebsiteType] = useState<WebsiteType>("business");
  const [goal, setGoal] = useState<GoalType>("generate-leads");
  const [budget, setBudget] = useState<BudgetType>("growth");
  const [audienceType, setAudienceType] = useState<AudienceType>("small-business-owners");
  const [audienceNotes, setAudienceNotes] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brief, setBrief] = useState("");
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted || brief.trim().length < 20) {
      return null;
    }

    return buildAudit({
      websiteType,
      goal,
      audienceType,
      audienceNotes,
      brief,
      websiteUrl,
      problems,
      budget
    });
  }, [audienceNotes, audienceType, brief, budget, goal, problems, submitted, websiteType, websiteUrl]);

  return (
    <section className="section-padding">
      <div className="container grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <Reveal className="section-panel-alt p-6 md:p-8">
          <p className="eyebrow">Audit prompt</p>
          <h2 className="mt-4 max-w-[13ch] font-display text-4xl font-semibold leading-[0.96] tracking-tight sm:text-5xl">
            Describe the website and get a more focused first-pass audit.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Choose the website type, audience, goal, problems, and budget first. Then
            describe the website in plain language and we will give you a more varied,
            tailored review based on clarity, trust, and conversion.
          </p>

          <div className="mt-8 grid gap-8">
            <ChoiceGroup
              title="Website type"
              items={websiteTypes}
              selected={websiteType}
              onSelect={setWebsiteType}
            />

            <ChoiceGroup
              title="Main goal"
              items={goalTypes}
              selected={goal}
              onSelect={setGoal}
            />

            <ChoiceGroup
              title="Budget range"
              items={budgetTypes}
              selected={budget}
              onSelect={setBudget}
            />

            <ChoiceGroup
              title="Target audience"
              items={audienceTypes}
              selected={audienceType}
              onSelect={setAudienceType}
            />

            <div>
              <h3 className="font-display text-[1.7rem] font-semibold tracking-tight">
                Current problems
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Optional. Select any issues that already feel true for the current site.
              </p>
              <div className="mt-4 grid gap-3">
                {problemTypes.map((problem) => {
                  const active = problems.includes(problem.id);
                  return (
                    <label
                      key={problem.id}
                      className={cn(
                        "block cursor-pointer rounded-2xl border px-4 py-4 text-left transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out",
                        active
                          ? "border-primary bg-primary/8 shadow-sm"
                          : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-sm"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() =>
                          setProblems((current) =>
                            current.includes(problem.id)
                              ? current.filter((item) => item !== problem.id)
                              : [...current, problem.id]
                          )
                        }
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-semibold text-foreground">{problem.label}</p>
                        <span
                          className={cn(
                            "mt-1 h-3.5 w-3.5 rounded-full border",
                            active ? "border-primary bg-primary" : "border-border bg-transparent"
                          )}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-foreground">
                Audience notes (optional)
              </span>
              <input
                value={audienceNotes}
                onChange={(event) => setAudienceNotes(event.target.value)}
                placeholder="Example: mostly Ghana-based buyers, startup founders in Accra, parents comparing schools"
                className="mt-3 h-12 w-full rounded-lg border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground">
                Current website URL (optional)
              </span>
              <input
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                placeholder="https://yourwebsite.com"
                className="mt-3 h-12 w-full rounded-lg border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground">
                What is the website about?
              </span>
              <textarea
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                placeholder="Example: We run a Ghana-based logistics company and need a website that explains our services, builds trust, shows routes, and helps companies request quotes quickly."
                className="mt-3 min-h-[13rem] w-full rounded-lg border border-border bg-background/80 px-4 py-4 text-sm leading-7 text-foreground outline-none transition focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              size="lg"
              onClick={() => setSubmitted(true)}
              disabled={brief.trim().length < 20}
            >
              Run free audit <Sparkles className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Tip: the more specific the audience, goal, and current problems, the more
            useful the rules-based audit becomes.
          </p>
        </Reveal>

        <Reveal className="section-panel p-6 md:p-8" delay={0.05}>
          <p className="eyebrow">Audit result</p>

          {result ? (
            <div className="mt-4 space-y-8">
              <div>
                <h3 className="font-display text-3xl font-semibold leading-[0.96] tracking-tight">
                  Strategic read
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {result.summary}
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Quick wins
                </h3>
                <div className="mt-4 grid gap-3">
                  {result.quickWins.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border bg-card/75 px-4 py-4 text-sm leading-7 text-muted-foreground"
                    >
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Highest priorities
                </h3>
                <div className="mt-4 grid gap-3">
                  {result.priorities.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border bg-background/72 px-4 py-4 text-sm leading-7 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-primary/18 bg-primary/8 px-5 py-5">
                <p className="text-sm leading-7 text-muted-foreground">{result.nextStep}</p>
                <Button asChild className="mt-4">
                  <a href="/contact">
                    Request a tailored quote <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-border bg-background/68 px-5 py-8 text-sm leading-7 text-muted-foreground">
              Choose the website type, main goal, budget, target audience, and current
              problems on the left, then add a short website brief and run the audit.
              Your tailored first-pass review will appear here.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
