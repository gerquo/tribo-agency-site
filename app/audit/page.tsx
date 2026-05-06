import type { Metadata } from "next";

import { AuditWorkbench } from "@/components/audit-workbench";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Free Website Audit",
  description:
    "Get a first-pass website audit from tribit by describing what your website is about and what you want it to achieve.",
  path: "/audit",
  image: pageImages.services
});

export const revalidate = 3600;

export default function AuditPage() {
  return (
    <main>
      <PageHeader
        label="AUDIT"
        title="Get a focused website audit before you commit to a build."
        subtitle="Describe what your website is about, what it should achieve, and who it serves. We will give you a practical first-pass review built around trust, clarity, and conversion."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
      />
      <AuditWorkbench />
      <CtaSection />
    </main>
  );
}
