import React from "react";
import { allProjects } from "contentlayer/generated";
import type { Project } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

export const revalidate = 60;

// Category display order. Cloud/DevOps leads so the first impression is
// infrastructure and reliability, not Web3.
const CATEGORY_ORDER = [
  "Cloud / DevOps / Infrastructure",
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
    (groups[key] ||= []).push(project);
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
      <div className="px-6 pt-20 mx-auto space-y-12 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of my work across cloud infrastructure, deployment and developer
            tooling, data systems, and high-uptime node operations — building,
            operating, and debugging production systems.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

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
      </div>
    </div>
  );
}
