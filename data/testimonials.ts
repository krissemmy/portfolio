export interface Testimonial {
  /** Full name. Ignored in display when `anonymous` is true. */
  name: string;
  role: string;
  company: string;
  /** Company homepage. Renders the company name as a link when set. */
  companyUrl?: string;
  /**
   * One string per paragraph. Kept as an array rather than a single blob so
   * long recommendations break where the client actually changed subject,
   * instead of relying on fragile "\n\n" splitting at render time.
   */
  quote: string[];
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
// The /consulting marquee sizes and paces itself off this array's length,
// so adding entries needs no layout changes.
export const testimonials: Testimonial[] = [
  {
    name: "Favour Anwara",
    role: "CTO",
    company: "Carybin",
    companyUrl: "https://carybin.com/",
    quote: [
      "Emmanuel helped us move away from an infrastructure setup that had become too expensive for our stage, reducing our core infrastructure cost by more than 95%.",
      "He handled the migration end to end and left us with a setup the team could understand and manage ourselves.",
    ],
    linkUrl:
      "https://www.linkedin.com/in/emmanuel-christopher/details/recommendations/",
    anonymous: false,
  },
  {
    name: "Joshua Nwankwo",
    role: "Founder",
    company: "Letsdap",
    companyUrl: "https://letsdap.com/",
    quote: [
      "As an early-stage startup, we were paying for managed infrastructure we barely used, with most months leaving half the capacity we were billed for untouched.",
      "Emmanuel got on calls to understand our stack first, then handled the whole migration himself: web app, API, background workers, queues, database, and file storage moved onto a self-hosted setup, with verified backups and a rollback path open the whole way.",
      "Our recurring infrastructure spend came down by roughly 65%, the hosting portion alone by close to 90%, with no data lost and nothing broken for our users.",
      "He then ran a live session walking us through what he'd built and left us documentation for operations, the migration itself, and the architecture, so we can deploy, read logs, and roll back without him. He was thorough, self-directed, and easy to work with.",
    ],
    linkUrl:
      "https://www.linkedin.com/in/emmanuel-christopher/details/recommendations/",
    anonymous: false,
  },
  {
    name: "Ibrahim Doba",
    role: "Founder",
    company: "Dailzero",
    companyUrl: "https://www.dailzero.com/",
    quote: [
      "I had the pleasure of working with Emmanuel on a full migration of our infrastructure, and I can't recommend him highly enough. From start to finish he was thorough, organized, and completely on top of every detail.",
      "What could have been a stressful, disruptive process turned out to be smooth and seamless, he moved everything over with zero downtime and kept me clearly informed at every step.",
      "The impact has been immediate: our services now run noticeably faster and more reliably than before, and the whole setup feels more solid and easier to manage.",
      "Emmanuel clearly knows infrastructure and DevOps at a deep level, but just as importantly, he's dependable, communicates well, and genuinely cares about doing the job right. If you're looking for someone to handle a migration or take ownership of your infrastructure, Emmanuel is the person you want. Highly recommended.",
    ],
    linkUrl:
      "https://www.linkedin.com/in/emmanuel-christopher/details/recommendations/",
    anonymous: false,
  },
];
