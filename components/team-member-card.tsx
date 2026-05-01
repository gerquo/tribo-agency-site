import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { isPlaceholderExternalUrl } from "@/lib/utils";

type TeamMemberCardProps = {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
      linkedin: string;
      github: string;
    };
  };
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: member.socials.linkedin,
      icon: Linkedin
    },
    {
      label: "GitHub",
      href: member.socials.github,
      icon: Github
    }
  ].filter((social) => !isPlaceholderExternalUrl(social.href));

  return (
    <Reveal as="article" className="h-full">
      <article className="group interactive-card overflow-hidden rounded-lg border border-border bg-card">
        <Image
          src={member.image}
          alt={member.name}
          width={900}
          height={1000}
          className="aspect-[4/5] object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="display-title text-[1.7rem] leading-none">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {member.role}
              </p>
            </div>
            {socialLinks.length > 0 ? (
              <div className="flex gap-2">
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
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {member.bio}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
