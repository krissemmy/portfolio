import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { profile, hero, about, tracks, skills } from "@/data/profile";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden px-6">
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <nav className="my-10 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-8xl whitespace-nowrap bg-clip-text">
          {profile.name.split(" ")[0]}
        </h1>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        <div className="mt-8 mb-6 text-center animate-fade-in max-w-3xl">
          <h2 className="text-lg font-medium text-zinc-200 sm:text-2xl font-display">
            {hero.title}
          </h2>
          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
            {hero.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in">
          <Link
            href="/projects"
            className="px-5 py-2.5 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="px-5 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-400 hover:text-white transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-400 hover:text-white transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20 mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 font-display">
          About
        </h2>
        <div className="mt-6 space-y-4">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-7 text-zinc-400">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Two recruiter paths */}
      <section className="px-6 py-12 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.audience}
              className="p-6 border rounded-xl border-zinc-800 bg-zinc-900/30"
            >
              <h3 className="text-lg font-semibold text-zinc-100 font-display">
                {track.audience}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{track.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {track.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-6 text-zinc-300"
                  >
                    <span aria-hidden="true" className="text-zinc-600">
                      &rarr;
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-12 mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 font-display">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs rounded-md text-zinc-300 bg-zinc-800/60 border border-zinc-700/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-20 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 font-display">
          Let&apos;s work together
        </h2>
        <p className="mt-4 leading-7 text-zinc-400">
          Whether you need someone to own cloud infrastructure or to debug and
          support production and developer-facing systems, I&apos;d be glad to
          talk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            href="/projects"
            className="px-5 py-2.5 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white transition-colors"
          >
            See my work
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-400 hover:text-white transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
