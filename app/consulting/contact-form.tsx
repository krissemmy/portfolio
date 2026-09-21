"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { qualificationFields } from "@/data/consulting";

type Status = "idle" | "submitting" | "success" | "error";
const fieldClass =
	"mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100";
const labelClass = "block text-sm text-zinc-300";

export function ConsultingContactForm() {
	const [status, setStatus] = useState<Status>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const successRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (status === "success") successRef.current?.focus();
	}, [status]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (status === "submitting") return;
		setStatus("submitting");
		setErrorMessage("");
		const data = new FormData(event.currentTarget);

		try {
			const res = await fetch("/api/consulting", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(data.entries())),
			});
			const body = await res.json();
			if (!res.ok || body.ok !== true) {
				setStatus("error");
				setErrorMessage(
					body.error ||
						"Your message wasn't sent. Please try again or email me directly.",
				);
				return;
			}
			setStatus("success");
		} catch {
			setStatus("error");
			setErrorMessage(
				"Your message couldn't be confirmed. Please try again or email me directly.",
			);
		}
	}

	if (status === "success") {
		return (
			<div
				ref={successRef}
				tabIndex={-1}
				role="status"
				className="p-6 border rounded-xl border-zinc-700 bg-zinc-900/30"
			>
				<h3 className="text-xl text-zinc-100 font-display">Got it.</h3>
				<p className="mt-4 leading-7 text-zinc-300">
					I’ll take a look at what you’ve shared before suggesting anything.
				</p>
				<p className="mt-3 text-sm leading-6 text-zinc-400">
					If I think your current setup is already reasonable, I’ll tell you
					that too.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-5"
			aria-label="Infrastructure review inquiry"
			aria-busy={status === "submitting"}
		>
			<p className="text-sm text-zinc-400">
				Only name, work email, and company are required.
			</p>
			{/* Keep the existing non-semantic honeypot name to avoid password-manager autofill. */}
			<input
				type="text"
				name="hp_check"
				tabIndex={-1}
				autoComplete="off"
				data-lpignore="true"
				data-1p-ignore="true"
				className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
				aria-hidden="true"
			/>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="name" className={labelClass}>
						Name *
					</label>
					<input
						id="name"
						name="name"
						autoComplete="name"
						required
						maxLength={100}
						className={fieldClass}
					/>
				</div>
				<div>
					<label htmlFor="email" className={labelClass}>
						Work email *
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						maxLength={254}
						className={fieldClass}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="company" className={labelClass}>
					Company *
				</label>
				<input
					id="company"
					name="company"
					autoComplete="organization"
					required
					maxLength={200}
					className={fieldClass}
				/>
			</div>
			<div>
				<label htmlFor="message" className={labelClass}>
					What’s going on? <span className="text-zinc-400">(optional)</span>
				</label>
				<textarea
					id="message"
					name="message"
					rows={4}
					maxLength={5000}
					placeholder="What’s starting to hurt, or what would you like checked?"
					className={fieldClass}
					aria-describedby="message-hint"
				/>
				<p id="message-hint" className="mt-2 text-xs text-zinc-400">
					Please don’t include passwords, API keys, or other secrets.
				</p>
			</div>
			<details className="p-4 border rounded-lg border-zinc-800">
				<summary className="text-sm cursor-pointer text-zinc-200">
					Add context about your team and stack{" "}
					<span className="text-zinc-400">(optional)</span>
				</summary>
				<div className="grid gap-4 mt-5 sm:grid-cols-2">
					{qualificationFields.map((field) => (
						<div key={field.name}>
							<label htmlFor={field.name} className={labelClass}>
								{field.label}
							</label>
							<select
								id={field.name}
								name={field.name}
								defaultValue=""
								className={fieldClass}
							>
								<option value="">Select if you’d like</option>
								{field.options.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					))}
					<div>
						<label htmlFor="website" className={labelClass}>
							Company website
						</label>
						<input
							id="website"
							name="website"
							type="url"
							autoComplete="url"
							placeholder="https://yourcompany.com"
							maxLength={500}
							className={fieldClass}
						/>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="infrastructure" className={labelClass}>
							Current infrastructure
						</label>
						<input
							id="infrastructure"
							name="infrastructure"
							placeholder="e.g. Vercel, Render, Supabase, AWS"
							maxLength={1000}
							className={fieldClass}
						/>
					</div>
				</div>
			</details>
			{status === "error" && (
				<p role="alert" className="text-sm leading-6 text-red-300">
					{errorMessage}{" "}
					<a
						className="underline underline-offset-4"
						href={`mailto:${profile.consultingEmail}`}
					>
						{profile.consultingEmail}
					</a>
				</p>
			)}
			<button
				type="submit"
				disabled={status === "submitting"}
				className="px-5 py-3 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white disabled:opacity-50"
			>
				{status === "submitting" ? "Sending…" : "Get an Infrastructure Review"}
			</button>
			<p className="text-xs leading-5 text-zinc-400">
				This sends an inquiry. We’ll agree scope, price, and availability before
				any work begins.
			</p>
		</form>
	);
}
