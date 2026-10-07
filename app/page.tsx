import Link from "next/link";
import Image from "next/image";
import Particles from "./components/particles";
import { SelectedWork } from "./components/selected-work";
import { profile, hero, about, skills } from "@/data/profile";
import { pageMetadata } from "@/util/metadata";
import portrait from "@/public/images/emmanuel-christopher.webp";

export const metadata = pageMetadata(
  "Cloud Platform / DevOps Engineer",
  "Emmanuel Christopher owns production and AI infrastructure at RestoreAI. Explore platform engineering, startup infrastructure migrations, and JSON-RPC tooling.",
  "/",
);

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Consulting", href: "/consulting" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav aria-label="Main navigation" className="px-6 pt-8 sm:pt-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-sm text-zinc-400 hover:text-zinc-100">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="px-6 mx-auto max-w-6xl">
        <section className="relative isolate grid items-center gap-8 py-12 md:grid-cols-[1fr_224px] md:gap-12 md:py-20 lg:grid-cols-[1fr_264px]" aria-labelledby="intro-title">
          <Particles className="pointer-events-none absolute inset-0 -z-10 motion-reduce:hidden" quantity={50} />
          <Image
            src={portrait}
            alt="Emmanuel Christopher"
            width={528}
            height={645}
            priority
            sizes="(min-width: 1024px) 264px, (min-width: 768px) 224px, 144px"
            className="h-auto w-36 rounded-lg justify-self-center md:col-start-2 md:row-start-1 md:w-56 lg:w-[264px]"
          />
          <div className="md:col-start-1 md:row-start-1">
            <p className="text-base text-zinc-300">{profile.name}</p>
            <h1 id="intro-title" className="mt-3 text-4xl leading-tight tracking-tight text-zinc-100 font-display sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-6 text-base leading-7 text-zinc-300">{hero.subtitle}</p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">{hero.experience}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/consulting" className="px-4 py-2.5 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white">
                Infrastructure consulting
              </Link>
              <Link href="/projects" className="px-4 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-400 hover:text-white">
                View projects
              </Link>
              <Link href="/resume" className="px-4 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-400 hover:text-white">
                Resume
              </Link>
            </div>
          </div>
        </section>

        <SelectedWork />

        <section className="grid gap-6 py-16 mt-4 border-b border-zinc-800 md:grid-cols-[1fr_2fr] md:gap-12" aria-labelledby="about-title">
          <h2 id="about-title" className="text-2xl text-zinc-100 font-display">How I work</h2>
          <div className="space-y-4">
            {about.map((paragraph) => <p key={paragraph} className="leading-7 text-zinc-400">{paragraph}</p>)}
            <Link href="/resume" className="inline-block text-sm text-zinc-200 underline decoration-zinc-600 underline-offset-4">Experience and resumes</Link>
          </div>
        </section>

        <section className="py-16 border-b border-zinc-800" aria-labelledby="skills-title">
          <h2 id="skills-title" className="text-2xl text-zinc-100 font-display">Engineering skills</h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-medium text-zinc-200">{group.category}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 max-w-2xl" aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-2xl text-zinc-100 font-display">Let&apos;s work together</h2>
          <p className="mt-4 leading-7 text-zinc-400">For cloud and platform roles, or help with your startup&apos;s infrastructure, tell me what you&apos;re building and where you need support.</p>
          <Link href="/contact" className="inline-block mt-6 text-zinc-200 underline decoration-zinc-600 underline-offset-4">Get in touch</Link>
        </section>
      </main>
    </div>
  );
}
