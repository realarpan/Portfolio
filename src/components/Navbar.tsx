"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Briefcase, FileText, Mail, Menu, X } from "lucide-react";
import { GithubIcon } from "@/icons";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/work", icon: Briefcase },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Contact", href: "mailto:arpanmaity1205@gmail.com", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border px-4 backdrop-blur-2xl transition-all duration-300 sm:px-5 ${scrolled ? "border-emerald-300/15 bg-[#080d11]/90 shadow-xl shadow-black/30" : "border-white/10 bg-[#0c1117]/65 shadow-lg shadow-black/20"}`}>
        <Link href="/" className="text-lg font-bold tracking-tight text-white transition hover:text-emerald-200">arpan<span className="text-emerald-300">.</span></Link>
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.06] hover:text-emerald-100">
              <item.icon className="size-3.5" />{item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="https://github.com/realarpan" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-100">
            <GithubIcon className="size-4" /><span className="hidden sm:inline">GitHub</span>
          </Link>
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-zinc-300 sm:hidden">
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-[#090e13]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:hidden">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-emerald-300/[0.08] hover:text-emerald-100">
              <item.icon className="size-4" />{item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
