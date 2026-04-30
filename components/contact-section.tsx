import {
  Clock3,
  Dribbble,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";
import { isPlaceholderExternalUrl, isPlaceholderPhone } from "@/lib/utils";

const contactDetails = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail
  },
  ...(!isPlaceholderPhone(site.phone)
    ? [{
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone}`,
    icon: Phone
  }] : []),
  ...(!isPlaceholderPhone(site.whatsapp)
    ? [{
    label: "WhatsApp",
    value: site.whatsapp,
    href: `https://wa.me/${site.whatsapp.replace("+", "")}`,
    icon: MessageCircle
  }] : []),
  {
    label: "Location",
    value: site.location,
    href: null,
    icon: MapPin
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    href: null,
    icon: Clock3
  }
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble }
].filter((social) => !isPlaceholderExternalUrl(social.href));

export function ContactSection() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="container relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal as="div" className="lg:sticky lg:top-24" y={18}>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us what you want to build."
            description="Share your goals, scope, timeline, and budget range. We will review the brief and reply with the next best step."
          />

          <StaggerContainer className="mt-8 grid gap-3">
            {contactDetails.map((detail) => (
              <StaggerItem key={detail.label}>
                <div className="flex gap-4 rounded-lg border border-border bg-card/90 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary">
                    <detail.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-1 inline-block font-semibold hover:text-primary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold">{detail.value}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {!isPlaceholderPhone(site.whatsapp) ? (
            <Reveal as="div" className="mt-5 rounded-lg border border-border bg-card p-5" y={12}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">Want a faster start?</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Send a quick WhatsApp note and we will route you to the right
                    specialist.
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <a
                    href={`https://wa.me/${site.whatsapp.replace("+", "")}?text=Hi%20NovaCraft%20Digital%2C%20I%27d%20like%20to%20discuss%20a%20digital%20project.`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
          ) : null}

          {socialLinks.length > 0 ? (
            <Reveal as="div" className="mt-6 flex flex-wrap items-center gap-3" y={12}>
              <span className="text-sm font-semibold text-muted-foreground">
                Follow the studio
              </span>
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  size="icon"
                  variant="outline"
                  aria-label={social.label}
                >
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </Reveal>
          ) : null}
        </Reveal>

        <Reveal as="div" y={18} delay={0.06}>
          <ContactForm />
        </Reveal>
      </div>
    </Reveal>
  );
}
