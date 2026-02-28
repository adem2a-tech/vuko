import * as React from "react";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: React.ElementType;
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  members: TeamMember[];
  registerLink?: string;
  logo?: React.ReactNode;
  socialLinksMain?: SocialLink[];
  websiteLabel?: string;
  /** Email de contact VUKO (à remplacer plus tard) */
  email?: string;
  /** Texte sous la grille (ex. "Plus de 16 employés : montage vidéo...") */
  footerText?: string;
  /** Message confiance sous le titre (ex. "Formés, ils nous apportent une aide concrète.") */
  footerDescription?: string;
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
      title,
      description,
      members,
      registerLink,
      logo,
      socialLinksMain,
      websiteLabel,
      email,
      footerText,
      footerDescription,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background py-12 md:py-24 lg:py-32",
          className
        )}
        {...props}
      >
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
          <div className="absolute inset-0 z-0 opacity-5">
            <svg className="h-full w-full" fill="none">
              <defs>
                <pattern
                  id="team-grid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0L0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#team-grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="grid gap-5 text-center md:text-left w-full max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground transition-transform duration-300 ease-out hover:-translate-y-0.5" style={{ textShadow: "0 1px 0 hsl(0 0% 100% / 0.15), 0 2px 4px hsl(0 0% 0% / 0.08), 0 4px 12px hsl(0 0% 0% / 0.06)" }}>
                <span className="text-primary block text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.2em]" style={{ textShadow: "0 1px 0 hsl(var(--primary) / 0.4), 0 2px 8px hsl(var(--primary) / 0.15)" }}>
                  O U R
                </span>
                <span style={{ textShadow: "0 1px 0 hsl(0 0% 100% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.1), 0 6px 20px hsl(0 0% 0% / 0.08)" }}>{title}</span>
              </h2>
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/3 px-6 py-5 md:px-8 md:py-6 shadow-[0_2px_0_0_hsl(var(--primary)/0.12),0_4px_12px_-2px_hsl(0_0%_0%/0.08),inset_0_1px_0_0_hsl(0_0%_100%/0.06)] transition-all duration-300 ease-out hover:shadow-[0_4px_0_0_hsl(var(--primary)/0.12),0_8px_24px_-4px_hsl(0_0%_0%/0.1),inset_0_1px_0_0_hsl(0_0%_100%/0.08)] hover:-translate-y-0.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
                  La bonne agence à contacter
                </p>
                <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {logo && <div className="text-2xl font-bold">{logo}</div>}
              {registerLink && (
                <a
                  href={registerLink}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  REJOINDRE
                </a>
              )}
            </div>
          </div>

          {(email || (socialLinksMain && socialLinksMain.length > 0)) && (
            <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-4 py-4 md:justify-center">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {email}
                </a>
              )}
              {socialLinksMain?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
              {websiteLabel && (
                <span className="text-muted-foreground text-sm">
                  {websiteLabel}
                </span>
              )}
            </div>
          )}

          <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {members.map((member, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-card p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl border border-border"
                style={{
                  backgroundColor:
                    index === 0
                      ? "hsl(var(--destructive) / 0.08)"
                      : index === 1
                      ? "hsl(var(--muted))"
                      : "hsl(var(--primary) / 0.06)",
                  color: "hsl(var(--foreground))",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />

                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground">
                  {member.designation}
                </p>
              </div>
            ))}
          </div>
          {footerText && (() => {
            const parts = footerText.split(/\s*:\s*/);
            const title = parts[0] ?? "";
            const rest = (parts[1] ?? "").replace(/\s*…\s*$/, "");
            const tags = rest ? rest.split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean) : [];
            return (
              <div className="relative z-10 mt-14 flex flex-col items-center gap-4">
                <p className="text-center font-display font-black text-xl md:text-2xl tracking-tight text-primary">
                  {title}
                </p>
                {footerDescription && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 max-w-2xl mx-auto">
                    <p className="text-center text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
                      {footerDescription}
                    </p>
                  </div>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>
    );
  }
);

TeamSection.displayName = "TeamSection";
