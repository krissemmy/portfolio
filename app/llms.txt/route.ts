import { allProjects } from "contentlayer/generated";
import { profile, hero } from "@/data/profile";
import { offers, faq } from "@/data/consulting";
import { selectedWork } from "@/data/selected-work";

export const dynamic = "force-static";

// /llms.txt: a plain-markdown summary of the site for AI assistants and
// search tools. Built from the same data as the pages so it cannot drift.
const kinds = ["Professional work", "Client engagement", "Tutorial", "Personal project", "Personal lab", "Open-source contribution"];

const absolute = (href: string) => (href.startsWith("/") ? `${profile.siteUrl}${href}` : href);

export function GET() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => kinds.indexOf(a.kind) - kinds.indexOf(b.kind) || (b.date ?? "").localeCompare(a.date ?? ""));

  const body = `# ${profile.name}

> ${profile.name} (${profile.handle}) is a ${hero.title} at ${profile.employer} and an independent infrastructure consultant for early-stage startups. ${profile.headline}

This file summarises ${profile.siteUrl}. The sections below quote the site, which ${profile.name} writes in the first person.

## Who this is for

- Startups: small teams (usually 3–10 people) with a product in production and no dedicated infrastructure engineer, who need help with cloud cost, deployments, backups and recovery, monitoring, or a migration. See [Infrastructure consulting](${profile.siteUrl}/consulting).
- Hiring teams: cloud, platform, and DevOps engineering roles, and technical or developer support roles. See [Resume](${profile.siteUrl}/resume) and [Contact](${profile.siteUrl}/contact).

## About

${hero.subtitle}

${hero.experience}

## Consulting offers

Indicative pricing in USD. Details: ${profile.siteUrl}/consulting

${offers.map((offer) => `- ${offer.name} (${offer.price}): ${offer.summary}`).join("\n")}

## Consulting questions

${faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Selected work

${selectedWork
  .map(
    (work) =>
      `### ${work.title}\n\n${work.kind}\n\n${work.details.map((detail) => `- ${detail.label}: ${detail.text}`).join("\n")}\n\n${work.links
        .map((link) => `- [${link.label}](${absolute(link.href)})`)
        .join("\n")}`,
  )
  .join("\n\n")}

## Case studies, projects, and writing

${projects.map((project) => `- [${project.title}](${profile.siteUrl}/projects/${project.slug}) (${project.kind}): ${project.description}`).join("\n")}

## Contact

- Consulting inquiries: ${profile.consultingEmail} or the form at ${profile.siteUrl}/consulting#contact
- Roles and general contact: ${profile.email} or ${profile.siteUrl}/contact
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- X: ${profile.twitter}
- YouTube: ${profile.youtube}
- TikTok: ${profile.tiktok}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
