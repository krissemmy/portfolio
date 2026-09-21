import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { profile } from "@/data/profile";
import { consulting } from "@/data/consulting";
import { testimonials } from "@/data/testimonials";
import { ConsultingContactForm } from "./contact-form";
import styles from "./page.module.css";

const title = "Infrastructure Consulting for Early-Stage Startups";
const description =
	"Production infrastructure for startups too early to hire an infrastructure engineer. Start with a practical review of costs, deployments, backups, and production risks.";
const url = `${profile.siteUrl}/consulting`;

export const metadata: Metadata = {
	metadataBase: new URL(profile.siteUrl),
	title,
	description,
	alternates: { canonical: url },
	openGraph: {
		title: `${title} | ${profile.name}`,
		description,
		url,
		siteName: profile.siteName,
		type: "website",
		images: [
			{
				url: `${url}/opengraph-image`,
				width: 1200,
				height: 630,
				alt: "Infrastructure for early-stage startups. Lean. Reliable. Recoverable.",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${title} | ${profile.name}`,
		description,
		images: [`${url}/opengraph-image`],
	},
};

const problems = [
	[
		"The cloud bill keeps growing",
		"Find what is actually expensive and whether changing it is worth the engineering time and operational responsibility.",
	],
	[
		"Deployments feel fragile",
		"Make releases repeatable, separate environments, and establish a clear rollback or recovery path.",
	],
	[
		"Backups probably work",
		"Check what is being backed up, test a restore, and document how to recover when production fails.",
	],
	[
		"The CTO is the infra team",
		"Reduce repetitive work and document the system so deployments and production access don't depend on one person.",
	],
	[
		"Production grew organically",
		"Review the shortcuts that accumulated, improve visibility, and fix the ones that now put customers at risk.",
	],
];

const reviewExample = [
	[
		"Keep",
		"Vercel + Supabase",
		"Managed hosting and database fit this team's needs.",
	],
	[
		"Fix now",
		"Recovery + production access",
		"Test a restore. Remove shared admin credentials.",
	],
	[
		"Fix later",
		"Cache spend",
		"Review Redis usage before changing the service.",
	],
	[
		"Stop paying for",
		"Unused preview instance",
		"Confirm it has no dependencies, then retire it.",
	],
	[
		"Do not touch yet",
		"Hosting architecture",
		"No migration justified by the current workload.",
	],
];

// Sources: existing project articles and client-authored recommendations.
// Dailzero's stack is not documented here, so its summary stays at that level.
const caseStudies = [
	{
		company: "Carybin",
		heading: "Bring the setup back in line with the company's stage.",
		situation:
			"The existing managed infrastructure had become too expensive for the team’s stage.",
		decision:
			"Move the workload to a self-hosted Coolify setup on Hetzner, with a setup the team could manage themselves.",
		result:
			"A smaller core hosting bill and an end-to-end migration. The CTO’s recommendation highlights the team’s ability to understand and operate the result.",
		tradeoff:
			"Self-hosting transfers responsibility for the server to the team. A lower bill only helps when operating the replacement is manageable.",
		href: "/projects/case-study-migrating-infrastructure-for-a-startup",
		link: "Read the migration case study",
	},
	{
		company: "Letsdap",
		heading: "Move application hosting. Keep the database managed.",
		situation:
			"The team was paying for managed capacity it barely used across its existing application and storage services.",
		decision:
			"Move application compute to Hetzner with Dokploy and files to Cloudflare R2, while keeping MongoDB managed to limit the impact of a server failure.",
		result:
			"The founder reports lower recurring spend, verified backups, a rollback path, and a live handover with operations and architecture documentation.",
		tradeoff:
			"Keeping MongoDB managed preserves a separate failure boundary. Putting every service on the same server would make a server failure harder to recover from.",
		href: "/projects/how-i-cut-a-startups-infrastructure-cost",
		link: "Read the infrastructure decisions",
	},
	{
		company: "Dailzero",
		heading: "Make a migration understandable from start to finish.",
		situation:
			"The founder needed help carrying out a full infrastructure migration.",
		decision:
			"Own the migration and communicate each step clearly, as described in the founder’s recommendation below.",
		result:
			"The founder reports a migration without downtime and a resulting setup that is faster, more reliable, and easier to manage.",
		tradeoff:
			"Moving hosting also moves operational responsibility. Clear communication helps the founder understand what is changing and what the team will own afterward.",
		href: "#client-feedback",
		link: "Read the founder’s account",
	},
];

export default function ConsultingPage() {
	return (
		<div className={`${styles.page} relative pb-16`}>
			<a href="#main" className={styles.skipLink}>
				Skip to content
			</a>
			<Navigation />
			<main id="main" className="px-6 pt-28 mx-auto max-w-7xl lg:px-8 lg:pt-36">
				<section
					className="grid gap-10 pb-12 border-b border-zinc-800 lg:grid-cols-[1.45fr_1fr] lg:gap-16 lg:pb-16"
					aria-labelledby="intro-title"
				>
					<div>
						<p className="text-sm text-zinc-400">
							Independent infrastructure consulting · {profile.name}
						</p>
						<h1
							id="intro-title"
						className="max-w-2xl mt-5 text-3xl leading-tight tracking-tight text-zinc-100 font-display sm:text-4xl xl:text-5xl"
						>
							Production infrastructure.
							<br />
							Before you need an infrastructure engineer.
						</h1>
						<p className="max-w-xl mt-6 leading-7 text-zinc-300">
							For 3–10 person startups with a product in production and a
							founder or backend engineer still looking after it. I review what
							you have, fix what matters, and help keep it running.
						</p>
						<div className="flex flex-wrap items-center gap-5 mt-7">
							<Link href="#contact" className={styles.primaryLink}>
								Get an Infrastructure Review
							</Link>
							<Link href="#past-work" className={styles.textLink}>
								See past work <span aria-hidden="true">↗</span>
							</Link>
						</div>
						<p className="mt-4 text-sm text-zinc-400">
							Review: {consulting.reviewPrice} USD · Agree the scope before
							starting.
						</p>
						<p className="mt-7 text-sm text-zinc-400">
							Migration and production work for{" "}
							<a
								href="#past-work"
								className="text-zinc-200 underline underline-offset-4"
							>
								Carybin, Letsdap, and Dailzero
							</a>
							.
						</p>
					</div>
					<aside
						className="self-start p-6 border rounded-xl border-zinc-700 bg-zinc-900/30 sm:p-7"
						aria-label="Example infrastructure review"
					>
						<p className="text-xs tracking-widest uppercase text-zinc-400">
							Example review · fictional team
						</p>
						<h2 className="mt-3 text-xl text-zinc-100 font-display">
							A sensible stack can still have gaps.
						</h2>
						<dl className="mt-5 divide-y divide-zinc-800">
							{reviewExample.map(([action, subject, reason]) => (
								<div key={action} className="py-3">
									<dt className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
										<span className="text-zinc-200">{subject}</span>
										<span className="font-mono text-xs text-zinc-400">
											{action}
										</span>
									</dt>
									<dd className="mt-1 text-xs leading-5 text-zinc-400">
										{reason}
									</dd>
								</div>
							))}
						</dl>
					</aside>
				</section>

				<section className={styles.section} aria-labelledby="fit-title">
					<div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
						<h2 id="fit-title" className={styles.heading}>
							Built for the awkward stage before your first infrastructure hire.
						</h2>
						<div className="grid gap-8 sm:grid-cols-2">
							<div>
								<h3 className="font-medium text-zinc-100">A good fit</h3>
								<ul className={styles.list}>
									<li>A small technical team, usually 3–10 people.</li>
									<li>Launched product, real users or paying customers.</li>
									<li>Bootstrapped, pre-seed, seed, or similarly early.</li>
									<li>A founder or backend engineer owns infrastructure.</li>
									<li>Costs, deployments, or recovery need attention.</li>
								</ul>
							</div>
							<div>
								<h3 className="font-medium text-zinc-100">
									Probably not a fit
								</h3>
								<ul className={styles.list}>
									<li>An idea with no production workload yet.</li>
									<li>An established internal platform or SRE team.</li>
									<li>A requirement for 24/7 managed operations.</li>
									<li>Kubernetes without a workload that needs it.</li>
									<li>The cheapest server, regardless of operational risk.</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section className={styles.section} aria-labelledby="offers-title">
					<div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
						<h2 id="offers-title" className={styles.heading}>
							Start with a review. Take it from there.
						</h2>
						<p className="text-sm text-zinc-400">Indicative pricing in USD</p>
					</div>
					<div className="divide-y divide-zinc-800">
						<article className={styles.offer}>
							<div>
								<p className={styles.eyebrow}>01 / Understand</p>
								<h3 className={styles.offerTitle}>
									Lean Infrastructure Review
								</h3>
								<p className={styles.price}>{consulting.reviewPrice}</p>
							</div>
							<div className="space-y-4 text-sm leading-6 text-zinc-300">
								<p>
									A practical assessment of whether your infrastructure fits
									your stage: cost, complexity, deployments, environments,
									backups and restore readiness, monitoring, databases, secrets,
									and production access.
								</p>
								<p>
									You get a short, prioritized report:{" "}
									<strong className="font-medium text-zinc-100">
										Keep · Fix now · Fix later · Stop paying for · Do not touch
										yet.
									</strong>{" "}
									Each recommendation explains why it matters and the tradeoff
									involved.
								</p>
								<p className="text-zinc-400">{consulting.reviewCredit}</p>
								<Link href="#contact" className={styles.textLink}>
									Get an Infrastructure Review <span aria-hidden="true">↗</span>
								</Link>
							</div>
						</article>
						<article className={styles.offer}>
							<div>
								<p className={styles.eyebrow}>02 / Fix</p>
								<h3 className={styles.offerTitle}>Infrastructure Fix Sprint</h3>
								<p className={styles.price}>{consulting.sprintPrice}</p>
							</div>
							<div className="space-y-4 text-sm leading-6 text-zinc-300">
								<p>
									A defined project for the useful work uncovered in the review.
									That might mean tested recovery, safer deployments,
									staging/production separation, monitoring, access and secrets
									fixes, or a migration that actually makes sense.
								</p>
								<p>
									We agree the outcomes, scope, and project price before work
									starts. You get the changes, verification, and documentation
									needed to operate them.
								</p>
								<p className="text-zinc-400">
									The price depends on the workload and scope; larger projects
									can exceed this range.
								</p>
							</div>
						</article>
						<article className={styles.offer}>
							<div>
								<p className={styles.eyebrow}>03 / Maintain</p>
								<h3 className={styles.offerTitle}>
									Fractional Infrastructure Care
								</h3>
								<p className={styles.price}>{consulting.carePrice}</p>
							</div>
							<div className="space-y-4 text-sm leading-6 text-zinc-300">
								<p>
									Ongoing help with infrastructure health, backup checks,
									deployment issues, small changes, upgrades, cost and capacity
									reviews, observability, and documentation.
								</p>
								<p>
									We agree the work, availability, and incident-support limits
									up front. A way to share infrastructure ownership while your
									team focuses on the product.
								</p>
								<p className="text-zinc-400">
									No 24/7 coverage or enterprise SLA. Monthly scope determines
									the fee.
								</p>
							</div>
						</article>
					</div>
				</section>

				<section className={styles.section} aria-labelledby="judgment-title">
					<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
						<div>
							<h2 id="judgment-title" className={styles.heading}>
								Use the simplest infrastructure that is reliable enough for the
								business.
							</h2>
							<p className="mt-5 leading-7 text-zinc-300">
								Sometimes the cheapest infrastructure is the infrastructure your
								engineers don’t have to maintain.
							</p>
							<p className="mt-4 text-sm leading-6 text-zinc-400">
								If Render and Supabase fit your workload and budget, keep them.
								Untested recovery or shared production credentials may deserve
								attention long before a hosting migration does.
							</p>
							<p className="mt-4 text-sm leading-6 text-zinc-400">
								I weigh cost, reliability, engineering time, and operational
								complexity together. “Your infrastructure is fine” is a useful
								outcome of a review.
							</p>
						</div>
						<dl className="space-y-5">
							{problems.map(([problem, response]) => (
								<div key={problem}>
									<dt className="text-sm font-medium text-zinc-100">
										{problem}
									</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-400">
										{response}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				<section
					id="past-work"
					className={styles.section}
					aria-labelledby="work-title"
				>
					<h2 id="work-title" className={styles.heading}>
						Decisions from real client work.
					</h2>
					<p className="max-w-2xl mt-4 text-sm leading-6 text-zinc-400">
						These engagements involved migrations. A review of your setup may
						recommend keeping it exactly where it is.
					</p>
					<div className="mt-8 divide-y divide-zinc-800">
						{caseStudies.map((study) => (
							<article
								key={study.company}
								className="grid gap-6 py-8 lg:grid-cols-[1fr_2fr] lg:gap-16"
							>
								<div>
									<p className={styles.eyebrow}>{study.company}</p>
									<h3 className="mt-3 text-xl text-zinc-100 font-display">
										{study.heading}
									</h3>
									<Link
										href={study.href}
										className={`${styles.textLink} mt-5 inline-block`}
									>
										{study.link} <span aria-hidden="true">↗</span>
									</Link>
								</div>
								<dl className="space-y-4 text-sm leading-6">
									{[
										["The situation", study.situation],
										["The decision", study.decision],
										["The result", study.result],
										["The important part", study.tradeoff],
									].map(([label, text]) => (
										<div key={label}>
											<dt className="font-medium text-zinc-200">{label}</dt>
											<dd className="mt-1 text-zinc-400">{text}</dd>
										</div>
									))}
								</dl>
							</article>
						))}
					</div>
				</section>

				<section
					id="client-feedback"
					className={styles.section}
					aria-labelledby="feedback-title"
				>
					<h2 id="feedback-title" className={styles.heading}>
						In their own words.
					</h2>
					<div className="grid gap-8 mt-8 lg:grid-cols-3">
						{testimonials.map((testimonial) => {
							// One original paragraph up front; the rest appear once on expansion.
							const lead =
								testimonial.company === "Letsdap"
									? 3
									: testimonial.company === "Carybin"
									? 1
									: 0;
							return (
								<figure
									key={testimonial.company}
									className="pl-5 border-l border-zinc-700"
								>
									<blockquote className="text-sm leading-6 text-zinc-300">
										<p>“{testimonial.quote[lead]}”</p>
									</blockquote>
									<figcaption className="mt-4 text-sm text-zinc-100">
										{testimonial.anonymous
											? "Startup founder"
											: `${testimonial.name} · ${testimonial.role}`}
										<span className="block mt-1 text-zinc-400">
											{testimonial.anonymous
												? "Details withheld at client’s request"
												: testimonial.company}
										</span>
									</figcaption>
									<details className="mt-4 text-sm">
										<summary className="cursor-pointer text-zinc-400">
											More from this recommendation
										</summary>
										<blockquote className="mt-3 space-y-3 leading-6 text-zinc-300">
											{testimonial.quote
												.filter((_, index) => index !== lead)
												.map((paragraph) => (
													<p key={paragraph}>“{paragraph}”</p>
												))}
										</blockquote>
										{!testimonial.anonymous && testimonial.linkUrl && (
											<a
												href={testimonial.linkUrl}
												target="_blank"
												rel="noopener noreferrer"
												className={`${styles.textLink} inline-block mt-4`}
											>
												View recommendations <span aria-hidden="true">↗</span>
											</a>
										)}
									</details>
								</figure>
							);
						})}
					</div>
					<p className="max-w-3xl mt-10 text-sm leading-6 text-zinc-400">
						My broader work spans production infrastructure, deployment
						pipelines, observability, incident debugging, and data systems.
						Tools include AWS, Cloudflare, Docker, Terraform, GitHub Actions,
						PostgreSQL, and Redis.{" "}
						<Link href="/projects" className={styles.textLink}>
							Explore the project archive.
						</Link>
					</p>
				</section>

				<section
					id="contact"
					className="pt-12 md:pt-16"
					aria-labelledby="contact-title"
				>
					<div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
						<div>
							<h2 id="contact-title" className={styles.heading}>
								Get an Infrastructure Review
							</h2>
							<p className="mt-5 leading-7 text-zinc-300">
								Tell me what you’re running and what’s starting to hurt. I’ll
								first determine whether there’s actually anything worth
								changing.
							</p>
							<ol className="mt-6 space-y-4 text-sm leading-6 text-zinc-400 list-decimal pl-5">
								<li>
									I read what you’ve shared and follow up with any questions.
								</li>
								<li>
									We agree the review scope and fee ({consulting.reviewPrice}{" "}
									USD) before starting.
								</li>
								<li>
									You get a short report and decide what, if anything, to
									implement.
								</li>
							</ol>
							<p className="mt-6 text-sm leading-6 text-zinc-400">
								If your current setup is already reasonable, I’ll tell you that
								too. Submitting this form doesn’t commit you to a paid
								engagement.
							</p>
							<p className="mt-6 text-sm text-zinc-400">
								Prefer email?{" "}
								<a
									href={`mailto:${profile.consultingEmail}?subject=Infrastructure%20review`}
									className={`${styles.textLink} break-words`}
								>
									{profile.consultingEmail}
								</a>
							</p>
						</div>
						<ConsultingContactForm />
					</div>
				</section>
			</main>
		</div>
	);
}
