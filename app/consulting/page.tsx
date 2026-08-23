import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { profile } from "@/data/profile";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { ConsultingContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Infrastructure and DevOps consulting for startups — cloud setup, CI/CD, observability, cost control, and production debugging.",
};

const problemAreas = [
  {
    title: "Cloud infrastructure & cost",
    description:
      "Provisioning cloud environments with Terraform, and fixing infrastructure that's over-provisioned or misconfigured. I've cut a startup's hosting bill from ~$300/mo to ~€8/mo without a drop in reliability.",
  },
  {
    title: "CI/CD & deployments",
    description:
      "Setting up or fixing pipelines and containerized deployments so shipping code doesn't mean risking downtime.",
  },
  {
    title: "Observability & incident response",
    description:
      "Getting visibility into what's actually happening in production — metrics, logs, and alerting — so incidents are caught and resolved before customers notice.",
  },
  {
    title: "Production & API debugging",
    description:
      "Investigating flaky or failing production and API issues, isolating the degraded dependency, and turning a vague report into a reproducible root cause.",
  },
  {
    title: "Data infrastructure",
    description:
      "Building or untangling the ETL/ELT pipelines and warehousing behind a product's data.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((part) => /[a-zA-Z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Wide, landscape-shaped cards. At this width a long recommendation wraps in
// far fewer lines, so the marquee band stays short, and three cards already
// overrun the container — the loop never shows dead track.
const CARD_WIDTH = "w-[min(88vw,45rem)]";
// Paced per card rather than as a fixed total, so scroll speed stays the same
// as testimonials are added.
const SECONDS_PER_CARD = 16;
// A half must be at least this many cards or it can be narrower than the
// viewport, which would open a gap at the wrap point.
const MIN_CARDS_PER_HALF = 3;

function TestimonialCard({
  testimonial,
  decorative = false,
}: {
  testimonial: Testimonial;
  decorative?: boolean;
}) {
  const isAnonymous = testimonial.anonymous;
  const displayName = isAnonymous ? "Startup Founder" : testimonial.name;
  // Cloned cards exist only to close the loop visually. Keep their links out
  // of the tab order so keyboard users don't walk the same links twice.
  const linkTabIndex = decorative ? -1 : undefined;
  const lastParagraph = testimonial.quote.length - 1;

  return (
    <figure
      className={`${CARD_WIDTH} mr-6 flex flex-none flex-col gap-5 p-6 border rounded-xl border-zinc-800 bg-zinc-900/30 md:p-8`}
    >
      <blockquote className="space-y-3 text-sm leading-relaxed text-zinc-300">
        {testimonial.quote.map((paragraph, i) => (
          // Opening mark on every paragraph, closing mark only after the last
          // one — the standard convention for a multi-paragraph quotation.
          <p key={i}>
            &ldquo;{paragraph}
            {i === lastParagraph && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>

      {testimonial.outcome && (
        <p className="text-sm text-zinc-500">{testimonial.outcome}</p>
      )}

      <figcaption className="flex items-center gap-3 pt-2 mt-auto">
        {!isAnonymous && testimonial.imageUrl ? (
          <Image
            src={testimonial.imageUrl}
            alt={displayName}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        ) : (
          <span className="flex items-center justify-center w-10 h-10 text-sm font-medium border rounded-full text-zinc-300 border-zinc-600 bg-zinc-900">
            {isAnonymous ? "?" : getInitials(testimonial.name)}
          </span>
        )}

        <div>
          <p className="text-sm font-medium text-zinc-200">{displayName}</p>
          <p className="text-xs text-zinc-500">
            {isAnonymous ? (
              "Details withheld at client's request"
            ) : (
              <>
                {testimonial.role},{" "}
                {testimonial.companyUrl ? (
                  <Link
                    href={testimonial.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={linkTabIndex}
                    className="underline decoration-zinc-700 underline-offset-2 hover:text-zinc-300 hover:decoration-zinc-500"
                  >
                    {testimonial.company}
                  </Link>
                ) : (
                  testimonial.company
                )}
              </>
            )}
          </p>
        </div>

        {!isAnonymous && testimonial.linkUrl && (
          <Link
            href={testimonial.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={linkTabIndex}
            className="ml-auto flex shrink-0 items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200"
          >
            {testimonial.linkUrl.includes("linkedin") ? (
              <>
                <Linkedin size={14} />
                View recommendation
              </>
            ) : (
              <>
                <Twitter size={14} />
                View post
              </>
            )}
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  const repeat = Math.max(1, Math.ceil(MIN_CARDS_PER_HALF / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();

  return (
    <div
      className="relative group overflow-hidden motion-reduce:overflow-x-auto"
      // Fades both edges so cards enter and leave instead of being sliced off
      // at a hard border. Prefixed copy is for Safari.
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
      }}
    >
      <div
        // items-start on mobile: one card fills the screen, so equal-height
        // stretching just adds hundreds of px of dead space under short quotes.
        // From md up the band shows several cards at once and a shared
        // attribution baseline reads as deliberate rather than ragged.
        // No `gap` here on purpose: each card carries its own right margin, so
        // the track is exactly 2 x (half width) and the -50% keyframe wraps on
        // an identical frame. A flex gap would leave the halves half-a-gap
        // apart and the loop would visibly jump once per cycle.
        className="flex items-start w-max md:items-stretch animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${half.length * SECONDS_PER_CARD}s`,
          } as CSSProperties
        }
      >
        {half.map((testimonial, i) => (
          <TestimonialCard key={`lead-${i}`} testimonial={testimonial} />
        ))}
        {/* The second half is what -50% lands on. Hidden from assistive tech,
            and dropped entirely under reduced motion, where the first half
            becomes a plain horizontally scrollable row. */}
        {half.map((testimonial, i) => (
          <div
            key={`loop-${i}`}
            aria-hidden
            className="contents motion-reduce:hidden"
          >
            <TestimonialCard testimonial={testimonial} decorative />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConsultingPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-12 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* Intro */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Consulting
          </h2>
          <p className="mt-4 text-zinc-400">
            I work with startup founders on the cloud infrastructure and
            DevOps problems that eat time and put production at risk —
            usually short, focused engagements: an audit, a fix, or getting a
            specific system running reliably.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* Problem areas */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-200 font-display">
            Where I can help
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {problemAreas.map((area) => (
              <div
                key={area.title}
                className="p-6 border rounded-xl border-zinc-800 bg-zinc-900/30"
              >
                <h4 className="text-lg font-semibold text-zinc-100 font-display">
                  {area.title}
                </h4>
                <p className="mt-2 text-sm text-zinc-400">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-200 font-display">
            What clients say
          </h3>
          <TestimonialMarquee items={testimonials} />
        </section>

        {/* Contact */}
        <section className="space-y-6" id="contact">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-200 font-display">
            Work with me
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ConsultingContactForm />
            <div className="p-6 border rounded-xl border-zinc-800 bg-zinc-900/30 text-sm text-zinc-400">
              <p>
                Prefer email? Reach me directly at{" "}
                <Link
                  href={`mailto:${profile.consultingEmail}?subject=${encodeURIComponent(
                    "Consulting inquiry",
                  )}`}
                  className="text-zinc-200 underline hover:text-white"
                >
                  {profile.consultingEmail}
                </Link>
                .
              </p>
              <p className="mt-4">
                For other ways to reach me, see the{" "}
                <Link href="/contact" className="text-zinc-200 underline hover:text-white">
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
