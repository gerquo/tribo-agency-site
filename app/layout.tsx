import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/data";
import {
  getDefaultMetadata,
  getAbsoluteUrl,
  getOrganizationStructuredData,
  getSiteUrl,
  pageImages
} from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  ...getDefaultMetadata(),
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | Premium Websites & Software`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${site.name} | Premium Websites & Software`,
    description: site.description,
    type: "website",
    locale: "en_GH",
    url: getAbsoluteUrl("/"),
    siteName: site.name,
    images: [
      {
        url: pageImages.home,
        alt: `${site.name} digital agency website`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Premium Websites & Software`,
    description: site.description,
    images: [pageImages.home]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = getOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationStructuredData)
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
