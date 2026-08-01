"use client";
import { useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "submitting" | "success" | "error";

export const ConsultingContactForm: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/consulting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          hp_check: data.get("hp_check"),
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 border rounded-xl border-zinc-800 bg-zinc-900/30">
        <p className="text-zinc-200">
          Thanks — your message is on its way. I&apos;ll reply from{" "}
          {profile.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/*
        Honeypot: hidden from real visitors, only bots fill this in.
        Name is deliberately non-semantic ("hp_check", not "website"/"url") —
        common honeypot names collide with browser/extension autofill
        heuristics, which then trips this for real users too.
      */}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-zinc-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-zinc-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-zinc-400">
          Company <span className="text-zinc-600">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-zinc-400">
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-5 py-2.5 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
};
