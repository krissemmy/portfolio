import type { MetadataRoute } from "next";
import { allProjects } from "contentlayer/generated";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/projects", "/consulting", "/resume", "/contact"];
  return [
    ...paths.map((path) => ({ url: new URL(path, profile.siteUrl).toString() })),
    ...allProjects.filter((project) => project.published).map((project) => ({
      url: `${profile.siteUrl}/projects/${project.slug}`,
    })),
  ];
}
