import type { Metadata } from "next";

import { Reveal } from "@/components/animations/reveal";
import { CtaSection } from "@/components/cta-section";
import { FaqList } from "@/components/faq-list";
import { PageHeader } from "@/components/page-header";
import { faqs } from "@/lib/data";
import { getPageMetadata, pageImages } from "@/lib/site";

const faqCategories = ["Pricing", "Process", "Support", "Services"];

export const metadata: Metadata = getPageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about NovaCraft Digital pricing, process, support, services, website redesigns, maintenance, and custom software.",
  path: "/faq",
  image: pageImages.faq
});

export const revalidate = 3600;

export default function FAQPage() {
  return (
    <main>
      <PageHeader
        label="FAQ"
        title="Clear answers before we start building."
        subtitle="Review common questions about pricing, process, support, and services. If your question is more specific, contact the team for a focused recommendation."
        image="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-padding">
        <div className="container grid gap-10">
          {faqCategories.map((category) => (
            <Reveal key={category} as="section" className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                  {category}
                </p>
                <h2 className="mt-3 text-2xl font-black">{category} questions</h2>
              </div>
              <FaqList items={faqs.filter((faq) => faq.category === category)} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
