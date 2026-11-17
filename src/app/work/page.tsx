import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, BriefcaseBusiness, Award } from "lucide-react";
import { work } from "@/lib/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://arpanx.vercel.app/"),
  title: "Work Experience | Arpan",
  description: "Work experience, projects and professional milestones.",
  icons: { icon: ["/favicon.ico"], apple: ["/apple-touch-icon.png"], shortcut: ["/apple-touch-icon.png"] },
  openGraph: { type: "website", url: "https://arpanx.vercel.app/", title: "Work Experience | Arpan", description: "Work experience, projects and professional milestones." },
  twitter: { card: "summary", title: "Work Experience | Arpan", description: "Work experience, projects and professional milestones.", creator: "@Xinacy" },
};

const statusLabel: Record<string, string> = {
  current: "Current", acquired: "Acquired", discontinued: "Discontinued", completed: "Completed",
};

export default function WorkPage() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <header className="mb-14 max-w-3xl">
          <span className="page-kicker"><BriefcaseBusiness className="size-3.5" /> The journey</span>
          <h1 className="page-heading">Work<br /><span className="text-white/45">experience.</span></h1>
          <p className="page-lede">A look at the teams, products and milestones that have shaped my professional journey.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="glass-panel rounded-2xl px-4 py-3"><span className="block text-2xl font-semibold tracking-tight">{work.length.toString().padStart(2,"0")}</span><span className="text-[10px] uppercase tracking-[.18em] text-zinc-500">Experiences</span></div>
            <Link href="/resume" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-100">View resume <ArrowUpRight className="size-4" /></Link>
          </div>
        </header>

        <div className="relative ml-2 space-y-5 border-l border-white/10 pl-6 sm:ml-4 sm:pl-10">
          {work.map((exp, index) => (
            <article key={exp.company} className="experience-card">
              <span className="absolute -left-[34px] top-9 flex size-4 items-center justify-center rounded-full border border-emerald-200/40 bg-[#0b1115] sm:-left-[49px]"><span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]" /></span>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[.05]">
                    <Image alt={exp.company} src={`https://cdn.xinacy.com/${exp.logo}`} width={48} height={48} className="size-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-emerald-200/80">{exp.company}</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">{exp.position}</h2>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-300">{statusLabel[exp.status] || exp.status}</span>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-zinc-400">{exp.description}</p>
              <div className="my-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/[.07] py-4 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-2"><Calendar className="size-3.5 text-emerald-200/70" />{exp.duration}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-emerald-200/70" />{exp.location}</span>
                <span className="rounded-full bg-white/[.05] px-2.5 py-1 text-zinc-400">{exp.type}</span>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-zinc-300"><Award className="size-4 text-emerald-200" /> Key achievements</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {exp.achievements.map((achievement, i) => <li key={i} className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-300/80" />{achievement}</li>)}
                </ul>
              </div>
              {exp.note && <p className="mt-6 rounded-xl border border-white/[.07] bg-white/[.025] px-4 py-3 text-xs italic leading-6 text-zinc-500">{exp.note}</p>}
              <span className="pointer-events-none absolute bottom-5 right-6 text-[10px] font-mono tracking-widest text-white/15">0{index + 1}</span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}