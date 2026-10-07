import type { Metadata } from "next";
import { profile } from "@/data/profile";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, profile.siteUrl).toString();
  const socialTitle = `${title} | ${profile.name}`;
  const image = `${profile.siteUrl}/og?title=${encodeURIComponent(title)}`;

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
