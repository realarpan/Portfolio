"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion, useReducedMotion
} from "motion/react";
import {
  ArrowDown, ArrowUpRight, BriefcaseBusiness,
  Github, Heart, Instagram, MapPin, Send, Sparkles, Terminal, Wrench,
  Star, Activity
} from "lucide-react";
import { GithubIcon, DiscordIcon, XIcon, LinkedinIcon } from "@/icons";
import GitHubCalendar from "react-github-calendar";
import { work, skills } from "@/lib/resume";
import TechIcon from "@/components/TechIcon";
import PresenceStatus from "@/components/PresenceStatus";

const socials = [
  { icon: GithubIcon, href: "https://github.com/realarpan", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/invalid", label: "X" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/invalid", label: "LinkedIn" },
  { icon: DiscordIcon, href: "https://discord.com/users/invalid", label: "Discord" },
  { icon: Instagram, href: "https://instagram.com/invalid", label: "Instagram" },
];

const statusLabels: Record<string, string> = {
  completed: "Past",
  discontinued: "Discontinued",
  acquired: "Acquired",
};

const statusClasses: Record<string, string> = {
  completed: "premium-status premium-status-past",
  discontinued: "premium-status premium-status-discontinued",
  acquired: "premium-status premium-status-acquired",
};

const rise = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CompanyLogo({ company, logo }: { company: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="premium-company-logo">
      {!failed ? (
        <Image
          src={`https://cdn.xinacy.com/${logo}`}
          alt={`${company} logo`}
          width={56}
          height={56}
          unoptimized
          onError={() => setFailed(true)}
          className="premium-company-logo-image"
        />
      ) : (
        <span aria-label={`${company} logo unavailable`}>{company.slice(0, 1)}</span>
      )}
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  return (
    <main className="premium-home">
      <div className="premium-noise" aria-hidden="true" />
      <section className="premium-hero" id="home">
        <div className="premium-hero-glow premium-hero-glow-one" />
        <div className="premium-hero-glow premium-hero-glow-two" />
        <div className="premium-container">
          <div className="premium-hero-grid">
            <div className="premium-hero-copy">
              <Reveal delay={0.08}>
                <div className="premium-name-line">
                  <h1>Arpan<span>.</span></h1>
                  <PresenceStatus />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="premium-role"><Terminal size={15} /> Software Engineer <i /> <MapPin size={14} /> India</p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="premium-intro">I like owning the path from fuzzy problem to something people can actually use — quick iteration, clear tradeoffs, and the small touches that make an app feel intentional instead of merely functional.</p>
              </Reveal>
              <Reveal delay={0.29}>
                <div className="premium-actions">
                  <Link href="mailto:arpanmaity1205@gmail.com" className="premium-button-primary">Get in touch <ArrowUpRight size={16} /></Link>
                  <Link href="/resume" className="premium-button-quiet">View résumé <ArrowUpRight size={15} /></Link>
                </div>
                <div className="premium-socials" aria-label="Social profiles">
                  {socials.map((social) => (
                    <motion.div key={social.label} whileHover={reduced ? undefined : { y: -4, scale: 1.05 }} transition={{ type: "spring", stiffness: 420, damping: 18 }}>
                      <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="premium-social"><social.icon size={16} /></Link>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="premium-portrait-wrap" delay={0.18}>
              <motion.div className="premium-portrait-shell" whileHover={reduced ? undefined : { y: -7, rotate: -1 }} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
                <div className="premium-portrait-image">
                  <Image
                    src="https://cdn.xinacy.com/spidey.jpg"
                    alt="Spider-Man artwork from Arpan's portfolio"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 760px) 86vw, 430px"
                    className="object-cover object-center"
                  />
                  <div className="premium-portrait-image-shade" />
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="premium-section" id="about">
        <div className="premium-container">
          <div className="premium-about-grid">
            <Reveal><h2 className="premium-heading">Thoughtful systems.<br /><em>Useful experiences.</em></h2></Reveal>
            <Reveal delay={0.12} className="premium-about-copy">
              <p>Backend-first engineer. Built scalable APIs, payment integrations, microservices, and real-time systems. Did some AI/ML work along the way - inference gateways, fine-tuning pipelines, face recognition - at <strong>MegaLLM</strong> and <strong>Tryzent Technologies</strong>.</p>
              <p>Before that: founded <strong>Flantic</strong> (55M+ users, acquired), co-founded <strong>Quotient</strong> (10M+ users), and built <strong>Mysty</strong> (1M+ users) - all from scratch with Python, FastAPI, PostgreSQL, Redis, and Docker.</p>
              <p>Scalability, reliability, and a bit of chaos engineering. Open to work - full-time, freelance, or collabs. <Link href="mailto:arpanmaity1205@gmail.com">Let&apos;s talk <ArrowUpRight size={14} /></Link></p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="premium-section" id="toolkit">
        <div className="premium-container">
          <div className="premium-section-heading"><div><h2 className="premium-heading">Skills <em>& tools.</em></h2></div><Link href="/resume" className="premium-text-link">Full résumé <ArrowUpRight size={15} /></Link></div>
          <div className="premium-skills-grid">
            {skills.map((category, index) => (
              <Reveal key={category.title} delay={index * 0.055}>
                <motion.article className="premium-skill-card" whileHover={reduced ? undefined : { y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <div className="premium-card-meta"><span>0{index + 1} / 06</span><span>{category.items.length} TOOLS</span></div>
                  <h3>{category.title}</h3>
                  <div className="premium-tech-list">{category.items.map((name) => <span className="premium-tech-pill" key={name}><TechIcon name={name} className="size-4 shrink-0" />{name}</span>)}</div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section" id="experience">
        <div className="premium-container">
          <div className="premium-section-heading"><div><h2 className="premium-heading">Selected <em>work.</em></h2></div><Link href="/work" className="premium-text-link">Explore experience <ArrowUpRight size={15} /></Link></div>
          <div className="premium-work-grid">
            {work.map((item, index) => (
              <Reveal key={item.company} delay={index * 0.06}>
                <motion.article className="premium-work-card" whileHover={reduced ? undefined : { y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <div className="premium-work-top"><span className="premium-card-number">0{index + 1}</span><span className={statusClasses[item.status] || "premium-status premium-status-past"}>{statusLabels[item.status] || item.status}</span></div>
                  <div className="premium-company-row"><CompanyLogo company={item.company} logo={item.logo} /><div className="premium-company-info"><h3>{item.company}</h3><p>{item.position}</p></div></div>
                  <div className="premium-work-bottom"><span>{item.duration}</span><ArrowUpRight size={16} /></div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section" id="activity">
        <div className="premium-container">
          <div className="premium-section-heading"><div><h2 className="premium-heading">A little <em>consistency.</em></h2><p className="premium-muted">Personal account only - company commits cannot be displayed here.</p></div><Link href="https://github.com/realarpan" target="_blank" rel="noopener noreferrer" className="premium-text-link">GitHub profile <ArrowUpRight size={15} /></Link></div>
          <Reveal><div className="premium-github-panel"><div className="premium-github-top"><span><Activity size={15} /> Contribution activity</span><span>github.com / realarpan</span></div><div className="premium-calendar"><GitHubCalendar username="realarpan" blockSize={11} blockMargin={3} colorScheme="dark" fontSize={11} theme={{ light: ["#1c211a", "#34442b", "#5a773e", "#91ae5a", "#d0e58c"], dark: ["#1c211a", "#34442b", "#5a773e", "#91ae5a", "#d0e58c"] }} /></div><div className="premium-calendar-legend"><span>Less</span><i /><i /><i /><i /><i /><span>More</span></div></div></Reveal>
        </div>
      </section>

      <section className="premium-contact">
        <div className="premium-container">
          <Reveal><div className="premium-contact-card"><div className="premium-contact-orbit" /><div className="premium-contact-copy"><p className="premium-kicker"><Send size={14} /> HAVE A PROJECT IN MIND?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2><p>Hey, you scrolled this far, let&apos;s talk.</p></div><Link href="mailto:arpanmaity1205@gmail.com" className="premium-contact-button">Shoot a message <ArrowUpRight size={18} /></Link></div></Reveal>
        </div>
      </section>

      <footer className="premium-footer"><div className="premium-container premium-footer-inner"><div><span className="premium-footer-brand">arpan<span>.</span></span><p>This portfolio is open source. Feel free to star, fork, or contribute.</p></div><div className="premium-footer-right"><Link href="https://github.com/realarpan/Portfolio" target="_blank" rel="noopener noreferrer"><Star size={14} /> Star on GitHub</Link><span>Made with <Heart size={12} /> by Arpan</span></div></div></footer>
    </main>
  );
}
