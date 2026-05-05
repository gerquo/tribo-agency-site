import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { PageHeader } from "@/components/page-header";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Contact",
  description:
    "Contact tribo to request a quote for a website, e-commerce store, custom web app, redesign, or digital support.",
  path: "/contact",
  image: pageImages.contact
});

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        label="CONTACT"
        title="Start a project with a team that cares about outcomes."
        subtitle="Share your project type, budget range, goals, and timeline. We will review the brief and suggest the best next step."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
      />
      <ContactSection />
    </main>
  );
}
