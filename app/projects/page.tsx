import React from "react";
import { allProjects } from "contentlayer/generated";
import type { Project } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { SelectedWork } from "../components/selected-work";
import { pageMetadata } from "@/util/metadata";

export const metadata = pageMetadata(
  "Selected Work & Project Archive",
  "Production and AI infrastructure at RestoreAI, startup consulting results, and KraiNode. Browse client work, personal projects, tutorials, and open-source contributions.",
  "/projects",
);

export const revalidate = 60;

// Category display order. Cloud/DevOps leads so the first impression is
// infrastructure and reliability, not Web3.
const CATEGORY_ORDER = [
  "Cloud / DevOps / Infrastructure / Compliance",
  "Developer Tools / API Reliability",
  "Data Engineering",
  "Blockchain / Node Operations",
];

const UNCATEGORIZED = "More";

export default async function ProjectsPage() {
  const allPublished = allProjects.filter((p) => p.published);

  // Group by category, then sort within a group by `order` (ascending) with
  // newest-first as the tie-breaker.
  const groups: Record<string, Project[]> = {};
  for (const project of allPublished) {
    const key = project.category ?? UNCATEGORIZED;
    groups[key] ||= [];
    groups[key].push(project);
  }

  const sortGroup = (list: Project[]) =>
    [...list].sort((a, b) => {
      const orderA = a.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
    });

  const presentCategories = Object.keys(groups);
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => presentCategories.includes(c)),
    ...presentCategories.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="relative pb-16">
      <Navigation />
      <main className="px-6 pt-20 mx-auto space-y-12 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Work & projects
          </h1>
          <p className="mt-4 text-zinc-400">
            Recent platform work and client results, followed by the wider archive.
            Each entry identifies the context in which the work was done.
          </p>
        </div>
        <SelectedWork />
        <div className="pt-10 border-t border-zinc-800">
          <h2 className="text-2xl font-display text-zinc-100">Project archive</h2>
          <p className="mt-3 text-zinc-400">Professional work, client engagements, and independent learning.</p>
        </div>

        {orderedCategories.map((category) => (
          <section key={category} className="space-y-6">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-200 font-display">
              {category}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortGroup(groups[category]).map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
