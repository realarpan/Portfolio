import React from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Mail, Linkedin, Globe, MapPin, FileText } from "lucide-react";
import DownloadButton from "@/components/ResumeDownload";
import type { Metadata } from "next";
import { work, skills, summary } from "@/lib/resume";

export const metadata: Metadata = {
  metadataBase: new URL("https://arpanx.vercel.app/"),
  title: "Resume | Arpan",
  description: "Experience, skills and professional profile of Arpan.",
  icons: { icon: ["/favicon.ico"], apple: ["/apple-touch-icon.png"], shortcut: ["/apple-touch-icon.png"] },
  openGraph: { type: "website", url: "https://arpanx.vercel.app/", title: "Resume | Arpan", description: "Experience, skills and professional profile of Arpan." },
  twitter: { card: "summary", title: "Resume | Arpan", description: "Experience, skills and professional profile of Arpan.", creator: "@Xinacy" },
};

export default function ResumePage() {
  const resumeUrl = "https://cdn.arpan.indevs.in/resume.pdf";
  return (
    <main className="page-shell">
      <div className="page-container">
        <header className="mb-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <span className="page-kicker"><FileText className="size-3.5" /> Profile document</span>
            <h1 className="page-heading">The résumé<span className="text-emerald-200">.</span></h1>
            <p className="page-lede">A concise overview of experience, capabilities and the work behind the profile.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DownloadButton />
            <Link href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-2.5 text-sm text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-100">Open PDF <ArrowUpRight className="size-4" /></Link>
          </div>
        </header>

        <article className="resume-sheet">
          <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 sm:flex-row sm:items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-200">Professional profile</p>
              <h2 className="mt-3 text-5xl font-semibold tracking-[-.07em] text-white sm:text-6xl">Arpan<span className="text-emerald-200">.</span></h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">{summary}</p>
            </div>
            <div className="grid gap-3 text-xs text-zinc-400 sm:min-w-52">
              <span className="flex items-center gap-2"><MapPin className="size-3.5 text-emerald-200" />India</span>
              <a href="mailto:arpanmaity1205@gmail.com" className="flex items-center gap-2 transition hover:text-white"><Mail className="size-3.5 text-emerald-200" />arpanmaity1205@gmail.com</a>
              <a href="https://linkedin.com/in/invalid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-white"><Linkedin className="size-3.5 text-emerald-200" />in/invalid</a>
              <span className="flex items-center gap-2"><Globe className="size-3.5 text-emerald-200" />arpan.indevs.in</span>
            </div>
          </div>

          <section className="resume-section">
            <h2>EXPERIENCE</h2>
            <div className="mt-6 space-y-7">
              {work.map((exp) => <div key={exp.company} className="border-b border-white/[.07] pb-6 last:border-0">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div><h3 className="text-lg font-semibold text-white">{exp.position}</h3><p className="mt-1 text-sm text-emerald-200/80">{exp.company}</p></div>
                  <div className="text-left text-xs leading-6 text-zinc-500 sm:text-right"><p>{exp.duration}</p>{exp.location && <p>{exp.location}</p>}</div>
                </div>
                <ul className="mt-4 ml-4 list-disc space-y-1.5 text-sm marker:text-emerald-200/70">{exp.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}</ul>
              </div>)}
            </div>
          </section>

          <section className="resume-section">
            <h2>EDUCATION</h2>
            <div className="mt-5"><h3 className="font-semibold text-white">Confidential</h3><p className="mt-1 text-sm text-zinc-400">Higher Education · Kolkata · 2024</p></div>
          </section>

          <section className="resume-section">
            <h2>SKILLS & TOOLS</h2>
            <div className="mt-5 space-y-4">
              {skills.map((category) => <div key={category.title} className="grid gap-2 sm:grid-cols-[170px_1fr]">
                <strong className="text-xs font-semibold text-zinc-200">{category.resumeTitle ?? category.title}</strong>
                <p className="text-sm text-zinc-400">{category.items.join(", ")}.</p>
              </div>)}
            </div>
          </section>
        </article>
        <p className="mt-5 text-center text-xs leading-6 text-zinc-600">For the original PDF version, don't use the download button above. (instead mail me to receive the same)</p>
      </div>
    </main>
  );
}