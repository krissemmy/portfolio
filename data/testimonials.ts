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

// To add a testimonial, append an object here following the Testimonial
// shape above. Only `name`, `role`, `company`, and `quote` are required.
export const testimonials: Testimonial[] = [
  {
    name: "Favour Anwara",
    role: "CTO",
    company: "Carybin",
    quote:
      "Emmanuel helped us move away from an infrastructure setup that had become too expensive for our stage, reducing our core infrastructure cost by more than 95%. He handled the migration end to end and left us with a setup the team could understand and manage ourselves.",
    linkUrl:
      "https://www.linkedin.com/in/emmanuel-christopher/details/recommendations/",
    anonymous: false,
  },
];
