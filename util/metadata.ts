import type { Metadata } from "next";
import { profile } from "@/data/profile";

// Static-export filenames for the build-time cards in scripts/generate-og.mjs.
export function ogImageSlug(path: string): string {
  if (path === "/") return "home";
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (normalized.startsWith("projects/")) return normalized.slice("projects/".length);
  return normalized;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, profile.siteUrl).toString();
  const socialTitle = `${title} | ${profile.name}`;
  const image = `${profile.siteUrl}/og/${ogImageSlug(path)}.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: profile.siteName,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
