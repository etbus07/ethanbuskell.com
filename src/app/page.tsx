"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight, Menu, X } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import CadCard, { type CadTheme } from "@/components/CadCard";
import CursorBackground from "@/components/CursorBackground";
import {
  hero,
  about,
  experience,
  projects,
  cadModels,
  cadNote,
  skills,
  contact,
  navLinks,
  projectCategories,
} from "@/content/portfolio";

// ---- "Spec sheet": near-neutral paper, graphite, signal-red ----
// Colours are AA-corrected: secondary #5A5C64 (>=4.5:1 on paper), accent #CE3F26
// (passes white-on-red and red-on-paper), paper de-warmed to #F2F2F1.

const cadTheme: CadTheme = {
  ink: "#14161C",
  accent: "#CE3F26",
  modelColor: "#3B3E47",
  fallbackBg: "#ECEBE6",
  fallbackText: "#5A5C64",
  nameClass: "font-display text-lg font-medium text-[#14161C]",
  descClass: "font-body text-sm text-[#5A5C64]",
  frameClass: "border border-[#14161C]/15 bg-white",
};

const heroItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// Datasheet section header: a single brand tick + title on a hairline, with an
// optional right-aligned real datum. No uppercase eyebrow, no 01/02/03 markers.
function SpecHeading({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[#14161C]/15 pt-4">
      <h2 className="flex items-center gap-3 text-balance font-display text-3xl font-bold text-[#14161C]">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 bg-[#CE3F26]" />
        {title}
      </h2>
      {meta && (
        <span className="shrink-0 font-mono text-xs text-[#5A5C64]">{meta}</span>
      )}
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroAnim = reduceMotion
    ? {}
    : { initial: "hidden", animate: "show", transition: { staggerChildren: 0.08 } };
  const itemAnim = reduceMotion
    ? {}
    : { variants: heroItem, transition: { duration: 0.5 } };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Mobile menu: Esc to close, click-outside to close, and focus management.
  useEffect(() => {
    if (!menuOpen) return;
    menuPanelRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuPanelRef.current?.contains(t) || menuBtnRef.current?.contains(t)) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  // Scroll-spy: mark the nav link for whichever section sits in the viewport band.
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    // Track which sections are in the band; the active link is the first one in
    // nav order, and clears when none are in the band (top of hero / footer).
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = navLinks.find((l) => visible.has(l.href.slice(1)));
        setActiveId(current ? current.href.slice(1) : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid-spec min-h-screen bg-[#F2F2F1] font-body text-[#14161C] selection:bg-[#CE3F26]/20">
      <CursorBackground />

      {/* Skip link for keyboard users */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-[#14161C] focus:px-4 focus:py-2 focus:text-sm focus:text-[#F2F2F1]"
      >
        Skip to content
      </a>

      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-[#14161C]/12 bg-[#F2F2F1]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-mono text-sm font-medium tracking-tight text-[#14161C]">
            ETHAN&nbsp;B. <span className="text-[#CE3F26]">/</span> SPEC
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => {
              const active = activeId === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "true" : undefined}
                  className={`relative font-mono text-xs uppercase tracking-wider transition-colors ${
                    active ? "text-[#14161C]" : "text-[#5A5C64] hover:text-[#14161C]"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#CE3F26] ${
                      reduceMotion ? "" : "transition-transform duration-200"
                    } ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={contact.cv}
              className="rounded-[2px] bg-[#CE3F26] px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-[#B5341E]"
            >
              Download CV
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-[#14161C]/25 text-[#14161C] md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            ref={menuPanelRef}
            id="mobile-menu"
            className="border-t border-[#14161C]/12 bg-[#F2F2F1]/95 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-1">
              {navLinks.map((l) => {
                const active = activeId === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-2.5 py-3 font-mono text-xs uppercase tracking-wider ${
                      active ? "text-[#14161C]" : "text-[#5A5C64]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 ${active ? "bg-[#CE3F26]" : "bg-[#14161C]/15"}`}
                    />
                    {l.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="flex min-h-screen flex-col justify-center pt-14">
          <motion.div {...heroAnim}>
            <motion.div {...itemAnim} className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#5A5C64]">
              <span className="h-px w-10 bg-[#CE3F26]" />
              Datasheet · Rev A
            </motion.div>
            <motion.h1 {...itemAnim} className="mt-6 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              {hero.name}
            </motion.h1>
            <motion.p {...itemAnim} className="mt-5 max-w-2xl text-pretty text-xl text-[#14161C]/80">
              {hero.tagline}
            </motion.p>
            <motion.p {...itemAnim} className="mt-3 font-mono text-sm text-[#5A5C64]">
              {hero.subTagline}
            </motion.p>
            <motion.p {...itemAnim} className="mt-6 max-w-xl text-pretty text-[#5A5C64]">
              {hero.oneLiner}
            </motion.p>
            <motion.div {...itemAnim} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 rounded-[2px] bg-[#14161C] px-[18px] py-[11px] font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#F2F2F1] transition-colors hover:bg-[#2a2d36]"
              >
                <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-[#CE3F26]" />
                View projects
                <span aria-hidden="true" className="text-[#CE3F26]">↗</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-[2px] border border-[#14161C]/25 px-5 py-2.5 text-sm transition-colors hover:border-[#CE3F26]">
                <Mail size={15} /> Get in touch
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-[#14161C]/25 text-[#5A5C64] transition-colors hover:border-[#CE3F26] hover:text-[#14161C]">
                <Github size={18} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About */}
        <Reveal id="about" className="py-24">
          <SpecHeading title="About" meta="Norwich School · sixth form" />
          <div className="mt-8 grid gap-12 md:grid-cols-[1.4fr_1fr]">
            <p className="text-pretty text-lg leading-relaxed text-[#14161C]/85">{about.body}</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#5A5C64]">
                Predicted grades
              </p>
              <ul className="mt-3">
                {about.predictedGrades.map((g) => (
                  <li key={g} className="flex items-center justify-between border-b border-[#14161C]/12 py-2.5 text-sm">
                    <span className="text-[#14161C]/85">{g}</span>
                    <span className="font-mono text-[#CE3F26]">A*</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2">
                {about.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 font-mono text-xs text-[#5A5C64]">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#CE3F26]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Projects — grouped by type so range reads at a glance */}
        <Reveal id="projects" className="py-24">
          <SpecHeading title="Projects" meta={`${projects.length} builds`} />
          <div className="mt-10 space-y-12">
            {projectCategories.map((cat) => {
              const items = projects.filter((p) => p.category === cat);
              return (
                <div key={cat}>
                  <div className="flex items-baseline justify-between border-t border-[#14161C]/15 pt-3">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#5A5C64]">{cat}</p>
                    <span className="font-mono text-[11px] text-[#5A5C64]">{items.length}</span>
                  </div>
                  <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => {
                      const featured = p.featured ?? false;
                      return (
                        <div
                          key={p.name}
                          className={`group rounded-[3px] border border-[#14161C]/15 bg-white p-5 transition-colors duration-200 hover:border-[#CE3F26] ${
                            featured ? "md:col-span-2" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-display font-medium text-[#14161C]">{p.name}</h3>
                              {featured && (
                                <span className="rounded-[2px] bg-[#CE3F26]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#CE3F26]">
                                  Flagship
                                </span>
                              )}
                            </div>
                            <ArrowUpRight size={16} className="shrink-0 text-[#14161C]/25 transition-colors group-hover:text-[#CE3F26]" />
                          </div>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-[#5A5C64]">{p.description}</p>
                          {p.modules && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {p.modules.map((m) => (
                                <span key={m} className="rounded-[2px] border border-[#14161C]/15 px-2 py-0.5 font-mono text-[11px] text-[#14161C]/75">
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.stack.map((s) => (
                              <span key={s} className="rounded-[2px] bg-[#14161C]/[0.05] px-2 py-0.5 font-mono text-[11px] text-[#14161C]/70">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* CAD */}
        <Reveal id="cad" className="py-24">
          <SpecHeading title="CAD" meta={`${cadModels.length} assemblies`} />
          <p className="mt-3 font-mono text-sm text-[#5A5C64]">{cadNote}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cadModels.map((m) => (
              <CadCard key={m.name} model={m} theme={cadTheme} />
            ))}
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal id="skills" className="py-24">
          <SpecHeading title="Skills" meta={`${skills.length} groups`} />
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((g) => (
              <div key={g.label} className="border-t border-[#14161C]/15 pt-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#5A5C64]">{g.label}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-[2px] border border-[#14161C]/15 px-2.5 py-1 text-sm text-[#14161C]/85">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Experience — after the engineering evidence */}
        <Reveal id="experience" className="py-24">
          <SpecHeading title="Experience" meta={`${experience.length} roles`} />
          <div className="mt-8 divide-y divide-[#14161C]/12">
            {experience.map((job) => (
              <div
                key={`${job.role}-${job.org}`}
                className="grid gap-3 py-6 first:pt-0 md:grid-cols-[1fr_1.7fr]"
              >
                <div>
                  <h3 className="font-display text-lg font-medium text-[#14161C]">{job.role}</h3>
                  <p className="mt-1 font-mono text-xs text-[#5A5C64]">
                    {job.org} · {job.location}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-pretty text-sm text-[#5A5C64]">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[#CE3F26]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal id="contact" className="py-24">
          <SpecHeading title="Get in touch" />
          <p className="mt-4 max-w-md text-pretty text-[#5A5C64]">
            Open to engineering opportunities, collaborations, and conversations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-[2px] border border-[#14161C]/25 px-5 py-2.5 text-sm transition-colors hover:border-[#CE3F26]"
            >
              <Mail size={16} /> {contact.email}
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[2px] border border-[#14161C]/25 px-5 py-2.5 text-sm transition-colors hover:border-[#CE3F26]">
              <Github size={16} /> {contact.githubLabel}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[2px] border border-[#14161C]/25 px-5 py-2.5 text-sm transition-colors hover:border-[#CE3F26]">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
          <p className="mt-8 font-mono text-xs text-[#5A5C64]">Location — {contact.location}</p>
        </Reveal>

        <footer className="border-t border-[#14161C]/15 py-8 font-mono text-xs text-[#5A5C64]">
          © {new Date().getFullYear()} {hero.name} — built with Next.js
        </footer>
      </main>
    </div>
  );
}
