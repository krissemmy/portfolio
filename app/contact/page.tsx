import Link from "next/link";
import { Navigation } from "../components/nav";
import { pageMetadata } from "@/util/metadata";
import { ContactMethods } from "./contact-methods";

export const metadata = pageMetadata(
  "Contact for Infrastructure Roles & Consulting",
  "Contact Emmanuel Christopher about cloud and platform engineering roles or startup infrastructure consulting. Email, LinkedIn, and GitHub. Based in UTC+1.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <main className="px-6 pt-24 pb-16 mx-auto max-w-7xl lg:px-8 lg:pt-32">
        <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">Get in touch</h1>
        <p className="max-w-2xl mt-4 leading-7 text-zinc-400">
          Contact me about cloud and platform engineering roles, or help with your startup&apos;s infrastructure.
          For a scoped review or migration, visit{" "}
          <Link href="/consulting" className="text-zinc-200 underline underline-offset-4">infrastructure consulting</Link>.
        </p>
        <p className="mt-3 text-sm text-zinc-400">Timezone: UTC+1</p>
        <ContactMethods />
      </main>
    </div>
  );
}
