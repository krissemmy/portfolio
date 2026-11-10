import { profile, hero, skills } from "@/data/profile";
import { offers, faq } from "@/data/consulting";

// schema.org JSON-LD. Search engines and AI assistants use this to tie the
// site, the consulting offer, and each article to one named person.
const personId = `${profile.siteUrl}/#person`;
const websiteId = `${profile.siteUrl}/#website`;

// Rendered on every page from the root layout; other graphs reference the
// person by @id.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: profile.siteUrl,
      name: profile.siteName,
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.handle,
      url: profile.siteUrl,
      image: `${profile.siteUrl}/images/emmanuel-christopher.webp`,
      jobTitle: hero.title,
      description: profile.headline,
      worksFor: { "@type": "Organization", name: profile.employer },
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: [profile.github, profile.linkedin, profile.twitter, profile.youtube, profile.tiktok],
    },
  ],
};

export const profilePageGraph = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: profile.siteUrl,
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
};

export function consultingGraph(name: string, description: string) {
  const url = `${profile.siteUrl}/consulting`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType: "Cloud infrastructure and DevOps consulting",
    provider: { "@id": personId },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Early-stage startups with a product in production and no dedicated infrastructure engineer",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consulting offers",
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: `${offer.summary} ${offer.price}.`,
        priceCurrency: "USD",
        url,
      })),
    },
  };
}

export const faqGraph = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function projectGraph(project: { title: string; description: string; slug: string; date?: string }) {
  const url = `${profile.siteUrl}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: project.title,
        description: project.description,
        url,
        mainEntityOfPage: url,
        image: `${profile.siteUrl}/og/${project.slug}.png`,
        ...(project.date ? { datePublished: project.date } : {}),
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Projects", item: `${profile.siteUrl}/projects` },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}
