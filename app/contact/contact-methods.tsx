"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Card } from "../components/card";
import { profile } from "@/data/profile";

const primary = [
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, handle: profile.name, icon: Linkedin },
  { label: "GitHub", href: profile.github, handle: "krissemmy", icon: Github },
];

export function ContactMethods() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus("Could not copy. Use the email link or select the address.");
    }
  }

  return (
    <>
      <div className="grid gap-6 mt-10 md:grid-cols-3">
        {primary.map((contact) => (
          <Card key={contact.label}>
            <div className="relative p-6 sm:p-8">
              <contact.icon aria-hidden="true" className="h-5 w-5 text-zinc-400" />
              <h2 className="mt-5 text-xl font-display text-zinc-100">
                <a href={contact.href} className="hover:underline underline-offset-4">{contact.label}</a>
              </h2>
              <p className="mt-2 break-words text-sm text-zinc-400">{contact.handle}</p>
              {contact.label === "Email" && (
                <>
                  <button type="button" onClick={copyEmail} className="mt-4 text-sm text-zinc-200 underline decoration-zinc-600 underline-offset-4">Copy email address</button>
                  <p role="status" className="mt-2 text-xs leading-5 text-zinc-400">{copyStatus}</p>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
      <section className="mt-14 pt-8 border-t border-zinc-800" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title" className="text-xl font-display text-zinc-100">Writing & social</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-5 text-zinc-300">
          <a href={profile.youtube} className="underline decoration-zinc-600 underline-offset-4">YouTube</a>
          <a href={profile.tiktok} className="underline decoration-zinc-600 underline-offset-4">TikTok</a>
          <a href={profile.twitter} className="underline decoration-zinc-600 underline-offset-4">X / Twitter</a>
        </div>
      </section>
    </>
  );
}
