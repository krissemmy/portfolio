"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-black/90 border-zinc-800 "
				}`}
			>
				<nav aria-label="Main navigation" className="container flex flex-row-reverse items-center justify-between gap-4 p-4 mx-auto sm:p-6">
					<div className="flex justify-between gap-3 text-sm sm:gap-8 sm:text-base">
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Projects
						</Link>
						<Link
							href="/consulting"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Consulting
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Contact
						</Link>
						<Link
							href="/resume"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Resume
						</Link>
					</div>

					<Link
						href="/"
						aria-label="Home"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</nav>
			</div>
		</header>
	);
};
