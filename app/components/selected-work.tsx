import Link from "next/link";
import { selectedWork } from "@/data/selected-work";

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-title">
      <h2 id="selected-work-title" className="text-2xl font-display text-zinc-100 sm:text-3xl">
        Selected work
      </h2>
      <div className="mt-6 space-y-4">
        {selectedWork.map((work) => (
          <article key={work.title} className="grid gap-5 rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 sm:p-7 md:grid-cols-[1fr_1.6fr] md:gap-10">
            <div>
              <p className="text-xs leading-5 text-zinc-400">{work.kind}</p>
              <h3 className="mt-2 text-xl font-display text-zinc-100">{work.title}</h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {work.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-zinc-200 underline decoration-zinc-600 underline-offset-4 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <dl className="space-y-3 text-sm leading-6">
              {work.details.map(({ label, text }) => (
                <div key={label}>
                  <dt className="font-medium text-zinc-200">{label}</dt>
                  <dd className="text-zinc-400">{text}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
