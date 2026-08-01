export interface Testimonial {
  /** Full name. Ignored in display when `anonymous` is true. */
  name: string;
  role: string;
  company: string;
  quote: string;
  /** Local path under /public, e.g. "/testimonials/jane-doe.jpg". Falls back to an initials avatar. */
  imageUrl?: string;
  /** LinkedIn or X profile URL. */
  linkUrl?: string;
  /** Hide name, company, image, and link; show a generic role/industry line instead. */
  anonymous?: boolean;
  /** Short, factual result of the engagement, e.g. "Cut monthly hosting cost from ~$300 to ~$8." */
  outcome?: string;
}

// PLACEHOLDER DATA — replace with real client testimonials before publishing.
// To add a real testimonial, append an object here following the Testimonial
// shape above. Only `name`, `role`, `company`, and `quote` are required.
export const testimonials: Testimonial[] = [
  {
    name: "PLACEHOLDER — Client Name",
    role: "Founder & CEO",
    company: "PLACEHOLDER — Startup Name",
    quote:
      "PLACEHOLDER TESTIMONIAL — replace with a real client quote before publishing this page.",
    outcome: "PLACEHOLDER OUTCOME — e.g. reduced monthly hosting spend by 90%.",
    anonymous: false,
  },
];
