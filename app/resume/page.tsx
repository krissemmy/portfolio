import { Navigation } from "../components/nav";
import { pageMetadata } from "@/util/metadata";
import ResumeOptions from "./resume-options";

export const metadata = pageMetadata(
  "DevOps / Cloud Infrastructure & Technical Support Resumes",
  "View Emmanuel Christopher's DevOps and cloud infrastructure resume, technical and developer support resume, and specialist variants.",
  "/resume",
);

export default function ResumePage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <main className="px-6 pt-24 mx-auto max-w-7xl lg:px-8 lg:pt-32">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Resume</h1>
        <p className="max-w-2xl mt-4 leading-7 text-zinc-400">Start with DevOps / Cloud Infrastructure for platform roles, or Technical / Developer Support for debugging and developer-facing roles. Specialist variants are below.</p>
        <ResumeOptions />
      </main>
    </div>
  );
}
