// Indicative USD ranges; all public price placements read from here.
export const consulting = {
	reviewPrice: "$250–$400",
	reviewTurnaround: "usually delivered within 2–4 business days",
	sprintPrice: "$750–$2,000+",
	carePrice: "From $250/month",
	reviewCredit:
		"If we work together on implementation, I can credit the review fee toward the project.",
};

// Short offer summaries for /llms.txt and structured data. The full offer copy
// lives in app/consulting/page.tsx; keep names and scope in sync with it.
export const offers = [
	{
		name: "Lean Infrastructure Review",
		price: `${consulting.reviewPrice}, ${consulting.reviewTurnaround}`,
		summary:
			"A practical assessment of whether a startup's infrastructure fits its stage: cost, complexity, deployments, environments, backups and restore readiness, monitoring, databases, secrets, and production access. Delivered as a short, prioritized report.",
	},
	{
		name: "Infrastructure Fix Sprint",
		price: `${consulting.sprintPrice}, depending on workload and scope`,
		summary:
			"A defined project for the useful work uncovered in the review, such as tested recovery, safer deployments, staging/production separation, monitoring, access and secrets fixes, or a migration that actually makes sense. Outcomes, scope, and price are agreed before work starts.",
	},
	{
		name: "Fractional Infrastructure Care",
		price: consulting.carePrice,
		summary:
			"Light-touch ongoing infrastructure help for small systems: health checks, backup checks, deployment issues, small changes, upgrades, cost reviews, observability, and documentation. No 24/7 coverage or enterprise SLA.",
	},
];

// Shown on /consulting and mirrored in FAQPage structured data and /llms.txt.
// Each answer restates a commitment or result made elsewhere on the site;
// update both when one changes.
export const faq = [
	{
		question:
			"How much does an infrastructure review cost, and how long does it take?",
		answer: `The Lean Infrastructure Review is ${consulting.reviewPrice} USD and is ${consulting.reviewTurnaround}. We agree the scope and fee before I start. ${consulting.reviewCredit}`,
	},
	{
		question: "What do I get from the review?",
		answer:
			"A short, prioritized report covering cost, complexity, deployments, environments, backups and restore readiness, monitoring, databases, secrets, and production access. Each item is marked Keep, Fix now, Fix later, Stop paying for, or Do not touch yet, with the reason it matters and the tradeoff involved.",
	},
	{
		question: "What happens after the review?",
		answer: `You decide what, if anything, to implement. If you want me to do the work, an Infrastructure Fix Sprint (${consulting.sprintPrice} USD) is a defined project with the outcomes, scope, and price agreed before it starts.`,
	},
	{
		question:
			"Will you tell us to move off AWS, Vercel, or another managed platform?",
		answer:
			"Only when the workload justifies it. If managed hosting fits your team, the review says to keep it, and if your current setup is already reasonable I'll tell you that too. A lower bill only helps when operating the replacement is manageable.",
	},
	{
		question:
			"How much can a migration to Hetzner with Coolify or Dokploy save?",
		answer:
			"It depends on the workload. Carybin's core hosting went from about $300/month to €8/month after moving from managed AWS hosting to Coolify on Hetzner. Letsdap's founder reports roughly 90% lower hosting costs after moving application hosting to Hetzner with Dokploy. Self-hosting also makes the server your team's responsibility, so the review weighs that before recommending a move.",
	},
	{
		question: "Do you offer 24/7 support or on-call coverage?",
		answer:
			"No. Fractional Infrastructure Care is light-touch ongoing help for small systems, with no 24/7 coverage or enterprise SLA. We agree the work, availability, and incident-support limits up front.",
	},
	{
		question: "Which platforms and tools do you work with?",
		answer:
			"Client migrations so far have covered AWS, Hetzner, Coolify, Dokploy, Cloudflare R2, PostgreSQL with pgvector, MongoDB, and Redis. My broader work also uses Docker, Terraform, and GitHub Actions.",
	},
];

// Shared by the form and server so accepted answers stay in sync.
export const qualificationFields = [
	{
		name: "teamSize",
		label: "Team size",
		options: ["1–2", "3–5", "6–10", "11–20", "20+"],
	},
	{
		name: "stage",
		label: "Company stage",
		options: ["Bootstrapped", "Pre-seed", "Seed", "Series A+", "Other"],
	},
	{
		name: "productStatus",
		label: "Product status",
		options: ["Pre-launch", "Launched", "Paying customers", "Other"],
	},
	{
		name: "concern",
		label: "Main concern",
		options: [
			"Cloud cost",
			"Deployments",
			"Reliability",
			"Backups/recovery",
			"Monitoring",
			"Database",
			"Scaling",
			"Security/access",
			"Nobody owns infrastructure",
			"Not sure / want a review",
			"Other",
		],
	},
	{
		name: "monthlySpend",
		label: "Monthly infrastructure spend",
		options: [
			"<$100",
			"$100–$300",
			"$300–$1,000",
			"$1,000–$3,000",
			"$3,000+",
			"Prefer not to say",
		],
	},
] as const;
