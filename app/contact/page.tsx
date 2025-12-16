"use client";
import { Github, Mail, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { profile } from "@/data/profile";
import { useState } from "react";

const socials = [
        {
                icon: <Twitter size={20} />,
                href: profile.twitter,
                label: "Twitter",
                handle: profile.twitterHandle,
        },
        {
                icon: <Mail size={20} />,
                href: `mailto:${profile.email}`,
                label: "Email",
                handle: profile.email,
        },
        {
                icon: <Github size={20} />,
                href: profile.github,
                label: "Github",
                handle: profile.github.split("/").pop() || "github",
        },
        {
                icon: <Linkedin size={20} />,
                href: profile.linkedin,
                label: "LinkedIn",
                handle: profile.linkedin.split("/").pop() || "linkedin",
        },
];

const primarySocials = socials.filter(({ label }) => label !== "Email");
const secondarySocials = socials.filter(({ label }) => label === "Email");

export default function Example() {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			// Fallback: open mailto if clipboard fails
			window.location.href = `mailto:${profile.email}`;
		}
	};

        const renderSocial = (s: (typeof socials)[number]) => {
                const isEmail = s.label === "Email";
                const content = (
                        <div className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16">
                                <span
                                        className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                                        aria-hidden="true"
                                />
                                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                                        {s.icon}
                                </span>
                                <div className="z-10 flex flex-col items-center">
                                        {isEmail ? (
                                                <span
                                                        onClick={handleCopyEmail}
                                                        title={s.handle}
                                                        className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display cursor-pointer"
                                                        style={{
                                                                maxWidth: "100%",
                                                                textAlign: "center",
                                                                overflowWrap: "anywhere",
                                                                wordBreak: "break-word",
                                                                lineHeight: 1.2,
                                                        }}
                                                >
                                                        {s.handle}
                                                        {copied && (
                                                                <span className="block text-xs text-zinc-400 mt-1">
                                                                        Copied!
                                                                </span>
                                                        )}
                                                </span>
                                        ) : (
                                                <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                                                        {s.handle}
                                                </span>
                                        )}
                                        <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                                                {s.label}
                                        </span>
                                </div>
                        </div>
                );

                return (
                        <Card key={s.label}>
                                {isEmail ? <div>{content}</div> : <Link href={s.href} target="_blank">{content}</Link>}
                        </Card>
                );
        };

        return (
                <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
                        <Navigation />
                        <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
                                <div className="flex flex-col w-full gap-8 mx-auto mt-32 sm:mt-0">
                                        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                                                {primarySocials.map(renderSocial)}
                                        </div>
                                        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 justify-items-center">
                                                {secondarySocials.map((s) => (
                                                        <div key={s.label} className="w-full sm:col-span-2 lg:col-start-2">
                                                                {renderSocial(s)}
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
