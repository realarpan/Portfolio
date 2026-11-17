"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText, Mail, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/icons";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/work", icon: Briefcase },
  { label: "Resume", href: "/resume", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav aria-label="Main navigation" className={`mx-auto flex h-[62px] max-w-[1080px] items-center justify-between rounded-2xl border px-3 backdrop-blur-2xl transition-all duration-300 sm:px-5 ${scrolled ? "border-white/10 bg-[#090c18]/90 shadow-[0_16px_55px_rgba(0,0,0,.35)]" : "border-white/[.07] bg-[#0b1117]/65 shadow-lg shadow-black/10"}`}>
        <Link href="/" aria-label="Arpan home" className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-indigo-200/20 bg-indigo-200/[.08] text-xs font-bold text-indigo-100 transition group-hover:bg-indigo-200/[.14]">A</span>
          <span className="text-[15px] font-semibold tracking-[-.04em] text-white">arpan<span className="text-indigo-200">.</span></span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${active ? "border border-white/[.08] bg-white/[.07] text-white shadow-inner" : "border border-transparent text-zinc-500 hover:bg-white/[.04] hover:text-zinc-100"}`}>
              <item.icon className="size-3.5" />{item.label}
            </Link>;
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="mailto:arpanmaity1205@gmail.com" className="hidden items-center gap-2 rounded-xl bg-indigo-200 px-3.5 py-2.5 text-xs font-semibold text-[#11152e] transition hover:bg-indigo-100 sm:inline-flex">
            <Mail className="size-3.5" /> Get in touch <ArrowUpRight className="size-3.5" />
          </Link>
          <Link href="https://github.com/realarpan" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.025] text-zinc-300 transition hover:border-indigo-200/30 hover:bg-white/[.06] hover:text-white">
            <GithubIcon className="size-4" />
          </Link>
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.025] text-zinc-300 transition hover:bg-white/[.06] sm:hidden">
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {menuOpen && <div className="mx-auto mt-2 max-w-[1080px] rounded-2xl border border-white/10 bg-[#090e13]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-white/[.07] text-white" : "text-zinc-400 hover:bg-white/[.04] hover:text-white"}`}>
            <item.icon className="size-4" />{item.label}{active && <span className="ml-auto size-1.5 rounded-full bg-indigo-300" />}
          </Link>;
        })}
        <Link href="mailto:arpanmaity1205@gmail.com" className="mt-1 flex items-center justify-between rounded-xl bg-indigo-200 px-3 py-3 text-sm font-semibold text-[#11152e]">Get in touch <ArrowUpRight className="size-4" /></Link>
      </div>}
    </header>
  );
}
