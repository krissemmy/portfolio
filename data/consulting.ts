// Indicative USD ranges; all public price placements read from here.
export const consulting = {
	reviewPrice: "$250–$400",
	sprintPrice: "$750–$2,000+",
	carePrice: "$250–$600+/month",
	reviewCredit:
		"If we work together on implementation, I can credit the review fee toward the project.",
};

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
