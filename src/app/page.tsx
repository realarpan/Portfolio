import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Github, Heart, Instagram,
  MapPin, Send, Sparkles, Terminal, Wrench, Star
} from "lucide-react";
import { GithubIcon, DiscordIcon, XIcon, LinkedinIcon } from "@/icons";
import GitHubCalendar from "react-github-calendar";
import { work, skills } from "@/lib/resume";
import TechIcon from "@/components/TechIcon";
import PresenceStatus from "@/components/PresenceStatus";
import { CometCard } from "@/components/ui/comet-card";

const socials = [
  { icon: GithubIcon, href: "https://github.com/realarpan", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/invalid", label: "X" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/invalid", label: "LinkedIn" },
  { icon: DiscordIcon, href: "https://discord.com/users/invalid", label: "Discord" },
  { icon: Instagram, href: "https://instagram.com/invalid", label: "Instagram" },
];

const statusLabels: Record<string, string> = {
  completed: "Past", discontinued: "Discontinued", acquired: "Acquired",
};
const statusColor: Record<string, string> = {
  completed: "border-white/10 bg-white/[.04] text-zinc-400",
  discontinued: "border-rose-300/15 bg-rose-300/[.06] text-rose-200/70",
  acquired: "border-teal-200/15 bg-teal-200/[.06] text-teal-100/80",
};

export default function Home() {
  return (
    <main className="home-page min-h-screen text-white">
      <section className="home-hero">
        <div className="home-wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> Personal portfolio <span className="hero-eyebrow-line" /> 2026</div>
              <div className="hero-name-row">
                <h1>Arpan<span className="hero-period">.</span></h1>
                <PresenceStatus />
              </div>
              <p className="hero-role"><Terminal className="size-4" /> Software Engineer <span className="hero-role-divider" /> <MapPin className="size-3.5" /> India</p>
              <p className="hero-intro">I like owning the path from fuzzy problem to something people can actually use — quick iteration, clear tradeoffs, and the small touches that make an app feel intentional instead of merely functional.</p>
              <div className="hero-actions">
                <Link href="mailto:arpanmaity1205@gmail.com" className="hero-primary"><Send className="size-4" /> Get in touch <ArrowUpRight className="size-4" /></Link>
                <Link href="/resume" className="hero-secondary">View résumé <ArrowUpRight className="size-4" /></Link>
              </div>
              <div className="hero-socials" aria-label="Social profiles">
                {socials.map((s) => <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-link"><s.icon className="size-4" /></Link>)}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="hero-photo-frame">
                <CometCard className="h-full w-full" rotateDepth={8} translateDepth={10}>
                  <div className="hero-photo">
                    <Image alt="Arpan" src="https://cdn.xinacy.com/spidey.jpg" fill priority sizes="(max-width: 768px) 240px, 340px" className="object-cover object-center" />
                  </div>
                </CometCard>
              </div>
              <div className="hero-floating-note"><span className="hero-note-icon"><Code2 className="size-4" /></span><span><strong>Build. Ship. Improve.</strong><small>From idea to production</small></span></div>
              <span className="hero-visual-caption">CREATIVE ENGINEERING / 01</span>
            </div>
          </div>
          <div className="hero-bottomline"><span>Backend-first engineer</span><span className="hero-bottomline-rule" /><span>Building useful things with care</span><ArrowDownRight className="size-4" /></div>
        </div>
      </section>

      <section className="home-section home-about">
        <div className="home-wrap">
          <div className="section-topline"><span className="section-index">01 / ABOUT</span><span className="section-rule" /></div>
          <div className="about-grid">
            <div><p className="section-overline"><Sparkles className="size-3.5" /> A little about what I do</p><h2 className="section-title">Thoughtful systems.<br /><span>Useful experiences.</span></h2></div>
            <div className="about-copy">
              <p>Backend-first engineer. Built scalable APIs, payment integrations, microservices, and real-time systems. Did some AI/ML work along the way - inference gateways, fine-tuning pipelines, face recognition - at <strong>MegaLLM</strong> and <strong>Tryzent Technologies</strong>.</p>
              <p>Before that: founded <strong>Flantic</strong> (55M+ users, acquired), co-founded <strong>Quotient</strong> (10M+ users), and built <strong>Mysty</strong> (1M+ users) - all from scratch with Python, FastAPI, PostgreSQL, Redis, and Docker.</p>
              <p>Scalability, reliability, and a bit of chaos engineering. Open to work - full-time, freelance, or collabs. <Link href="mailto:arpanmaity1205@gmail.com">Let&apos;s talk <ArrowUpRight className="inline size-3.5" /></Link></p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <div className="section-topline"><span className="section-index">02 / TOOLKIT</span><span className="section-rule" /></div>
          <div className="section-heading-row"><div><p className="section-overline"><Wrench className="size-3.5" /> Technologies I work with</p><h2 className="section-title">Skills <span>& tools.</span></h2></div><Link href="/resume" className="section-link">Full résumé <ArrowUpRight className="size-4" /></Link></div>
          <div className="skills-grid">
            {skills.map((category, i) => <article key={category.title} className="skill-card"><div className="skill-card-top"><span className="skill-number">0{i + 1}</span><span className="skill-count">{category.items.length} tools</span></div><h3>{category.title}</h3><div className="skill-tags">{category.items.map((name) => <span key={name} className="skill-tag"><TechIcon name={name} className="size-4 shrink-0" />{name}</span>)}</div></article>)}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <div className="section-topline"><span className="section-index">03 / EXPERIENCE</span><span className="section-rule" /></div>
          <div className="section-heading-row"><div><p className="section-overline"><BriefcaseBusiness className="size-3.5" /> Places & products</p><h2 className="section-title">Selected <span>work.</span></h2></div><Link href="/work" className="section-link">Explore experience <ArrowUpRight className="size-4" /></Link></div>
          <div className="work-grid">
            {work.map((item, index) => <article key={item.company} className="home-work-card">
              <div className="work-card-top"><span className="work-index">0{index + 1}</span>{item.status && <span className={`work-status ${statusColor[item.status] || "border-white/10 bg-white/[.04] text-zinc-400"}`}>{statusLabels[item.status] || item.status}</span>}</div>
              <div className="work-company-row"><Image alt={item.company} src={`https://cdn.xinacy.com/${item.logo}`} width={44} height={44} className="size-11 rounded-xl border border-white/10 object-cover" /><div className="min-w-0"><h3>{item.company}</h3><p>{item.position}</p></div></div>
              <div className="work-card-bottom"><span>{item.duration}</span><ArrowUpRight className="size-4" /></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="home-section home-github">
        <div className="home-wrap">
          <div className="section-topline"><span className="section-index">04 / OPEN SOURCE</span><span className="section-rule" /></div>
          <div className="section-heading-row"><div><p className="section-overline"><Github className="size-3.5" /> Activity log</p><h2 className="section-title">A little <span>consistency.</span></h2><p className="section-description">Personal account only - company commits cannot be displayed here.</p></div><Link href="https://github.com/realarpan" target="_blank" rel="noopener noreferrer" className="section-link">GitHub profile <ArrowUpRight className="size-4" /></Link></div>
          <div className="github-panel"><div className="github-calendar"><GitHubCalendar username="realarpan" blockSize={11} blockMargin={3} colorScheme="dark" fontSize={11} theme={{ light: ["#17202b", "#123d38", "#176b5c", "#299b7c", "#65d6ad"], dark: ["#17202b", "#123d38", "#176b5c", "#299b7c", "#65d6ad"] }} /></div><div className="github-legend"><span>Less</span><i /><i /><i /><i /><i /><span>More</span></div></div>
        </div>
      </section>

      <section className="home-contact">
        <div className="home-wrap"><div className="contact-panel"><div><p className="section-overline"><Send className="size-3.5" /> HAVE A PROJECT IN MIND?</p><h2>Let&apos;s make<br /><span>something matter.</span></h2><p>Hey, you scrolled this far, let&apos;s talk.</p></div><Link href="mailto:arpanmaity1205@gmail.com" className="contact-cta">Shoot a message <ArrowUpRight className="size-5" /></Link></div></div>
      </section>

      <footer className="home-footer"><div className="home-wrap footer-inner"><div><span className="footer-brand">arpan<span>.</span></span><p>This portfolio is open source. Feel free to star, fork, or contribute.</p></div><div className="footer-right"><Link href="https://github.com/realarpan/Portfolio" target="_blank" rel="noopener noreferrer" className="footer-star"><Star className="size-3.5" /> Star on GitHub</Link><span>Made with <Heart className="inline size-3 text-rose-300" /> by Arpan</span></div></div></footer>
    </main>
  );
}
