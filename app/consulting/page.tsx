import type { Metadata } from "next";
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isAnonymous = testimonial.anonymous;
  const displayName = isAnonymous ? "Startup Founder" : testimonial.name;
  const displayRole = isAnonymous
    ? "Details withheld at client's request"
    : `${testimonial.role}, ${testimonial.company}`;

  return (
    <Card>
      <div className="flex flex-col h-full gap-4 p-6 md:p-8">
        <p className="text-zinc-300 leading-7">&ldquo;{testimonial.quote}&rdquo;</p>

        {testimonial.outcome && (
          <p className="text-sm text-zinc-500">{testimonial.outcome}</p>
        )}

        <div className="flex items-center gap-3 mt-auto pt-2">
          {!isAnonymous && testimonial.imageUrl ? (
            <Image
              src={testimonial.imageUrl}
              alt={displayName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-10 h-10 text-sm font-medium border rounded-full text-zinc-300 border-zinc-600 bg-zinc-900">
              {isAnonymous ? "?" : getInitials(testimonial.name)}
            </span>
          )}

          <div>
            <p className="text-sm font-medium text-zinc-200">{displayName}</p>
            <p className="text-xs text-zinc-500">{displayRole}</p>
          </div>

          {!isAnonymous && testimonial.linkUrl && (
            <Link
              href={testimonial.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200"
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
        </div>
      </div>
    </Card>
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
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
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                    "Consulting inquiry",
                  )}`}
                  className="text-zinc-200 underline hover:text-white"
                >
                  {profile.email}
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
