import type { Metadata } from "next";

import { services, site } from "@/lib/data";
import { isPlaceholderPhone } from "@/lib/utils";

const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  ""
);

const socialProfiles = [
  "https://github.com",
  "https://linkedin.com",
  "https://dribbble.com"
] as const;

export const staticSiteLastModified = new Date("2026-04-29T00:00:00.000Z");

export const pageImages = {
  home: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  about: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  services: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  portfolio: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  contact: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  pricing: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
  faq: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80"
} as const;

export function getSiteUrl() {
  return normalizedSiteUrl;
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function getDefaultMetadata(): Metadata {
  return {
    title: `${site.name} | Premium Websites & Software`,
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: "Digital agency",
    keywords: [
      "web design agency",
      "website development",
      "custom software",
      "web applications",
      "UI UX design",
      "digital agency Ghana",
      "business websites",
      "e-commerce development"
    ]
  };
}

export function getPageMetadata({
  title,
  description,
  path,
  image
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const pageTitle = `${title} | ${site.name}`;
  const pageImage = image ?? pageImages.home;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      locale: "en_GH",
      url: getAbsoluteUrl(path),
      images: [
        {
          url: pageImage,
          alt: `${title} page at ${site.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [pageImage]
    }
  };
}

export function getOrganizationStructuredData() {
  const includePhone = !isPlaceholderPhone(site.phone);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${getSiteUrl()}#organization`,
    name: site.name,
    url: getSiteUrl(),
    description: site.description,
    logo: pageImages.home,
    areaServed: {
      "@type": "Country",
      name: "Ghana"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
      addressLocality: "Accra"
    },
    email: site.email,
    telephone: includePhone ? site.phone : undefined,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: includePhone ? site.phone : undefined,
      areaServed: "GH"
    },
    sameAs: socialProfiles,
    knowsAbout: services.map((service) => service.title),
    serviceType: services.map((service) => service.title)
  };
}
