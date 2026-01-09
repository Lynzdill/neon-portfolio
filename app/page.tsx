"use client";

import React, { useEffect, useMemo, useState } from "react";

// ====== QUICK EDITS (your info) ======
const BRAND = {
  name: "LD Dev Studio",
  tagline: "Neon builds. Cozy vibes. Real systems.",
  owner: "Lindsey Dillard",
  email: "lddevstudio@outlook.com",
  location: "United States",
  availability: "Open to full-time roles & contract work",
  googleFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdxHH9a17yDkTuTlKCRK8G55ZgaBqMxhXEqpSmaDIWD6QbQFg/viewform?usp=header",
  links: {
    github: "",
    kofi: "",
    discord: "",
  },
} as const;

type Project = {
  name: string;
  status: "Live" | "Beta" | "Concept";
  category: string;
  oneLiner: string;
  highlights: string[];
  stack: string[];
  idealFor: string[];
};

const PROJECTS: Project[] = [
  {
    name: "Structura",
    status: "Beta",
    category: "Discord - Server Builder",
    oneLiner:
      "Build clean Discord server layouts fast (categories, channels, pinned starter flow).",
    highlights: ["Server blueprints", "Role onboarding flow", "Clean setup + presets"],
    stack: ["Node.js", "discord.js", "JSON/Configs"],
    idealFor: ["Creators", "Gaming servers", "Communities", "Startups"],
  },
  {
    name: "Formara",
    status: "Concept",
    category: "Discord - Forms & Tickets",
    oneLiner:
      "Turn forms into tickets, track requests, route to the right team automatically.",
    highlights: ["Ticket routing", "Forms to threads", "Auto-tags + priority"],
    stack: ["Node.js", "discord.js", "Storage"],
    idealFor: ["Support servers", "Studios", "Service businesses"],
  },
  {
    name: "Market Brain",
    status: "Beta",
    category: "Finance - Alerts",
    oneLiner:
      "Options/news brief bot and scans, with risk notes and summaries for your watchlist.",
    highlights: ["Morning brief", "Earnings tracking", "IV crush warnings"],
    stack: ["Python", "APIs", "Scheduling", "Discord"],
    idealFor: ["Traders", "Communities", "Personal dashboards"],
  },
  {
    name: "Transcriptor AIO",
    status: "Concept",
    category: "Discord - Translation",
    oneLiner: "Multilingual translation assistant with tiered roles and community tools.",
    highlights: ["Role-gated features", "Translation utilities", "Community-friendly UX"],
    stack: ["Node.js", "AI API"],
    idealFor: ["Global servers", "International communities"],
  },
  {
    name: "Attune",
    status: "Concept",
    category: "Web App - Matching",
    oneLiner:
      "A matchmaking and friend-finding app built for shy people - real prompts, real compatibility.",
    highlights: ["Profile prompts", "Match coach concept", "Premium memberships"],
    stack: ["React", "Stripe-ready", "AI assistant-ready"],
    idealFor: ["Community builders", "Creators", "Niche social apps"],
  },
];

type Service = {
  title: string;
  subtitle: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    title: "Custom Discord Bots",
    subtitle:
      "Commands, automations, AI helpers, utilities, moderation - built for your server.",
    bullets: [
      "Slash commands",
      "Roles + onboarding",
      "Databases + logging",
      "Deploy help + updates",
    ],
  },
  {
    title: "Discord Server Builds",
    subtitle:
      "A clean server structure that converts visitors into members and members into regulars.",
    bullets: [
      "Server map + start-here",
      "Roles + rules flow",
      "Channel layout + pinned posts",
      "Brand + icon polish",
    ],
  },
  {
    title: "Automation & Integrations",
    subtitle: "Connect your server to forms, payments, dashboards, and workflows.",
    bullets: [
      "Google Forms / tickets",
      "Stripe checkout setup",
      "Webhooks + alerts",
      "Basic dashboards",
    ],
  },
  {
    title: "Maintenance & Support",
    subtitle: "Keep it stable. Keep it updated. Keep it growing.",
    bullets: ["Bug fixes", "New features", "Performance tuning", "Documentation + handoff"],
  },
];

type Tier = {
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$199+",
    bestFor: "Small servers needing 1-3 key commands or a clean setup.",
    includes: ["Basic bot or small feature set", "Setup guide", "1 revision round"],
  },
  {
    name: "Growth",
    price: "$499+",
    bestFor: "Servers that need structure + automations + a few workflows.",
    includes: [
      "Multiple commands/workflows",
      "Roles/onboarding flow",
      "Logging + config",
      "2 revision rounds",
    ],
  },
  {
    name: "Pro Build",
    price: "$999+",
    bestFor: "Full bot system or server overhaul with integrations and polish.",
    includes: [
      "Advanced features + storage",
      "Integrations (forms/payments)",
      "Deployment support",
      "Documentation",
      "3 revision rounds",
    ],
  },
  {
    name: "Care Plan",
    price: "$49-$199/mo",
    bestFor: "Ongoing updates, fixes, and improvements.",
    includes: ["Monthly maintenance", "Priority fixes", "Feature slots", "Roadmap planning"],
  },
];

// ====== UI HELPERS ======
function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function useInViewOnce() {
  const [inView, setInView] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]")) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          const next = { ...prev };
          for (const e of entries) {
            const id = (e.target as HTMLElement).dataset.reveal || "";
            if (id && e.isIntersecting) next[id] = true;
          }
          return next;
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return inView;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100">
      {children}
    </span>
  );
}

function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-white font-semibold">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-slate-300">{subtitle}</div> : null}
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function NeonBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute top-40 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-violet-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.85))]" />
    </div>
  );
}

function Reveal({
  id,
  inView,
  children,
  className,
}: {
  id: string;
  inView: Record<string, boolean>;
  children: React.ReactNode;
  className?: string;
}) {
  const show = !!inView[id];
  return (
    <div
      data-reveal={id}
      className={cx(
        "transition-all duration-700 will-change-transform",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function Anchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />;
}

function TopNav() {
  const items = [
    ["Home", "home"],
    ["Services", "services"],
    ["Projects", "projects"],
    ["Pricing", "pricing"],
    ["About", "about"],
    ["Contact", "contact"],
  ] as const;

  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_28px_rgba(34,211,238,0.12)]">
            <span className="text-sm font-bold text-white">LD</span>
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold">{BRAND.name}</div>
            <div className="text-xs text-slate-400">{BRAND.tagline}</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={`#${href}`}
              className="rounded-full px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NeonPortfolioPreview() {
  const inView = useInViewOnce();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | Project["status"]>("All");

  const openForm = () => {
    if (typeof window === "undefined") return;
    window.open(BRAND.googleFormUrl, "_blank", "noopener,noreferrer");
  };

  // Dev-only sanity checks (lightweight "tests")
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    // eslint-disable-next-line no-console
    console.assert(/^https:\/\//.test(BRAND.googleFormUrl), "googleFormUrl must be an https URL");
    // eslint-disable-next-line no-console
    console.assert(
      BRAND.googleFormUrl.includes("docs.google.com/forms"),
      "googleFormUrl should be a Google Form URL"
    );
    // eslint-disable-next-line no-console
    console.assert(BRAND.email.includes("@"), "email must look like an email address");
    // eslint-disable-next-line no-console
    console.assert(PROJECTS.length > 0, "PROJECTS should not be empty");
    // eslint-disable-next-line no-console
    console.assert(SERVICES.length > 0, "SERVICES should not be empty");
    // eslint-disable-next-line no-console
    console.assert(TIERS.length > 0, "TIERS should not be empty");
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.oneLiner.toLowerCase().includes(q) ||
        p.highlights.join(" ").toLowerCase().includes(q);
      const matchesStatus = status === "All" ? true : p.status === status;
      return matchesQ && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <TopNav />

      <main className="relative">
        <NeonBG />

        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-4 pt-14 pb-10">
          <Anchor id="home" />
          <Reveal id="hero" inView={inView}>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Discord Bots</Badge>
                  <Badge>Server Builds</Badge>
                  <Badge>Automations</Badge>
                  <Badge>Neon UI</Badge>
                  <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Open to Work
                  </span>
                </div>

                <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  I build{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">
                    custom Discord bots
                  </span>{" "}
                  and clean server systems that actually get used.
                </h1>

                <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
                  I'm {BRAND.owner}. I design bots and server layouts that feel smooth, look premium,
                  and save you time. If you want your community to run better - I can build it.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {BRAND.availability}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {BRAND.location}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white hover:bg-slate-100 transition"
                  >
                    View Projects
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                  >
                    Services
                  </a>
                  <button
                    type="button"
                    onClick={openForm}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/30 to-violet-500/30 border border-white/10 hover:border-white/20 transition"
                  >
                    Request More Info
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Typical turnaround: 3-14 days (depending on scope)
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Builds include handoff + config notes
                  </span>
                </div>
              </div>

              <div className="lg:pl-10">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(217,70,239,0.08)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">What you get</div>
                      <div className="text-sm text-slate-300 mt-1">Practical, shippable systems.</div>
                    </div>
                    <Badge>✨</Badge>
                  </div>

                  <Divider />

                  <ul className="mt-4 grid gap-3 text-sm text-slate-200">
                    <li className="flex gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-cyan-300/80" />
                      <span>Slash commands that feel polished (buttons, modals, embeds).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-fuchsia-300/80" />
                      <span>Server layouts that guide people (start-here to roles to action).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-violet-300/80" />
                      <span>Automation + integration (forms, alerts, logging, dashboards).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-slate-200/70" />
                      <span>Clean handoff: config files, setup notes, and support options.</span>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={openForm}
                      className="w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    >
                      Get started (Form)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SERVICES */}
        <section className="relative mx-auto max-w-6xl px-4 py-10">
          <Anchor id="services" />
          <Reveal id="servicesTitle" inView={inView}>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Services</h2>
                <p className="mt-2 text-slate-300">Pick a single feature... or let's build the whole system.</p>
              </div>
              <button
                type="button"
                onClick={openForm}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
              >
                Request More Info
              </button>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, idx) => (
              <Reveal key={s.title} id={`service-${idx}`} inView={inView}>
                <Card title={s.title} subtitle={s.subtitle} right={<Badge>Service</Badge>}>
                  <ul className="grid gap-2 text-sm text-slate-200">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="relative mx-auto max-w-6xl px-4 py-10">
          <Anchor id="projects" />
          <Reveal id="projectsTitle" inView={inView}>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Bot Projects</h2>
                <p className="mt-2 text-slate-300">
                  A few of the systems I'm building (and can customize for your server).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-56"
                  />
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="bg-transparent outline-none text-sm text-slate-200"
                  >
                    <option className="bg-black" value="All">
                      All
                    </option>
                    <option className="bg-black" value="Live">
                      Live
                    </option>
                    <option className="bg-black" value="Beta">
                      Beta
                    </option>
                    <option className="bg-black" value="Concept">
                      Concept
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((p, idx) => (
              <Reveal key={p.name} id={`proj-${idx}`} inView={inView}>
                <Card
                  title={p.name}
                  subtitle={p.oneLiner}
                  right={
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold border",
                        p.status === "Live"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                          : p.status === "Beta"
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                            : "border-violet-400/30 bg-violet-400/10 text-violet-200"
                      )}
                    >
                      {p.status}
                    </span>
                  }
                >
                  <div className="text-xs text-slate-400">{p.category}</div>

                  <div className="mt-4">
                    <div className="text-sm font-semibold text-white">Highlights</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.highlights.map((h) => (
                        <Badge key={h}>{h}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-semibold text-white">Stack</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Ideal for</div>
                      <div className="mt-2 text-sm text-slate-200 leading-relaxed">
                        {p.idealFor.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={openForm}
                      className="w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    >
                      Request info about {p.name}
                    </button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="relative mx-auto max-w-6xl px-4 py-10">
          <Anchor id="pricing" />
          <Reveal id="pricingTitle" inView={inView}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Pricing</h2>
            <p className="mt-2 text-slate-300">
              Simple starter tiers. Final price depends on features, integrations, and timeline.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t, idx) => (
              <Reveal key={t.name} id={`tier-${idx}`} inView={inView}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-white font-semibold">{t.name}</div>
                      <div className="text-2xl font-extrabold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300">
                        {t.price}
                      </div>
                      <div className="mt-2 text-sm text-slate-300">{t.bestFor}</div>
                    </div>
                    <Badge>Tier</Badge>
                  </div>

                  <Divider />

                  <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                    {t.includes.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      onClick={openForm}
                      className="block w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    >
                      Request quote
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal id="pricingNote" inView={inView} className="mt-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              <div className="text-white font-semibold">Limited-time free offerings available</div>
              <div className="mt-2 text-slate-300">
                I'm offering select features or setup help for free for a limited time. Contact me to
                find out what's currently included and whether it's a good fit for your project.
              </div>
            </div>
          </Reveal>
        </section>

        {/* ABOUT */}
        <section className="relative mx-auto max-w-6xl px-4 py-10">
          <Anchor id="about" />
          <Reveal id="aboutTitle" inView={inView}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">About</h2>
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Reveal id="about-1" inView={inView} className="lg:col-span-2">
              <Card
                title={`${BRAND.owner} - Builder + Systems Designer`}
                subtitle="I like bots that are clean, helpful, and actually used."
                right={<Badge>About me</Badge>}
              >
                <div className="text-sm text-slate-200 leading-relaxed">
                  I build Discord bots and server systems with a focus on clarity and flow: fewer messy
                  channels, better onboarding, and commands that feel smooth. I'm especially into
                  server builders, economy tools, ticket systems, and AI helpers - all with a neon /
                  cozy aesthetic.
                  <br />
                  <br />
                  I'm also actively seeking <strong>full-time roles</strong> where I can contribute as
                  a developer, automation specialist, or systems builder while continuing selective
                  freelance work through LD Dev Studio.
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white font-semibold">My approach</div>
                    <div className="mt-2 text-sm text-slate-300">
                      Design first - build clean - test in real servers - ship with docs.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white font-semibold">Best fit clients</div>
                    <div className="mt-2 text-sm text-slate-300">
                      Creators, gaming communities, studios, startups, and service businesses.
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal id="about-2" inView={inView}>
              <div className="grid gap-4">
                <Card
                  title="Recruiter Mini"
                  subtitle="Quick skim for hiring managers."
                  right={<Badge>Hiring</Badge>}
                >
                  <div className="text-sm text-slate-200 leading-relaxed">
                    Open to roles in: <span className="text-white font-semibold">Frontend / Full Stack</span>,
                    <span className="text-white font-semibold"> Automation</span>, and
                    <span className="text-white font-semibold"> Discord Platform Development</span>.
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>Next.js</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>discord.js</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Python</Badge>
                  </div>
                  <div className="mt-4 grid gap-3">
                    <button
                      type="button"
                      onClick={openForm}
                      className="rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    >
                      Recruiter / Hiring Contact (Form)
                    </button>
                    <div className="text-xs text-slate-400">
                      Email is listed on the page for copy/paste if needed, but the form is preferred.
                    </div>
                  </div>
                </Card>

                <Card title="Quick Facts" subtitle="A few things people ask." right={<Badge>FAQ</Badge>}>
                  <ul className="grid gap-2 text-sm text-slate-200">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                      <span>Yes: I can deploy for you or hand off code cleanly.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                      <span>Yes: I can add Stripe later once your offer is finalized.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                      <span>Yes: I can build a Start Here onboarding + role buttons.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative mx-auto max-w-6xl px-4 py-10">
          <Anchor id="testimonials" />
          <Reveal id="testimonialsTitle" inView={inView}>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Testimonials</h2>
                <p className="mt-2 text-slate-300">
                  Placeholders for now - add real quotes as you collect them.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                quote:
                  "Lindsey helped clean up our server structure and made onboarding actually make sense.",
                name: "Client Name",
                role: "Community Owner",
              },
              {
                quote:
                  "Fast turnaround, clear communication, and the bot features were exactly what we needed.",
                name: "Client Name",
                role: "Studio / Creator",
              },
              {
                quote: "The automations saved us hours every week. Clean setup and easy handoff.",
                name: "Client Name",
                role: "Ops / Admin",
              },
            ].map((t, i) => (
              <Reveal key={i} id={`test-${i}`} inView={inView}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 h-full">
                  <div className="text-sm text-slate-200 leading-relaxed">"{t.quote}"</div>
                  <div className="mt-4 text-xs text-slate-400">
                    <span className="text-slate-200 font-semibold">{t.name}</span> - {t.role}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="relative mx-auto max-w-6xl px-4 py-12">
          <Anchor id="contact" />
          <Reveal id="contactTitle" inView={inView}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-violet-500/10 p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Let's build yours</h2>
                  <p className="mt-2 text-slate-300">
                    Tell me what you're building, what you want automated, and what "done" looks like.
                  </p>
                  <div className="mt-3 text-sm text-slate-300">
                    Email (copy/paste): <span className="text-white">{BRAND.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openForm}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white hover:bg-slate-100 transition"
                  >
                    Open contact form
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 pb-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Built with neon + intention.
          </div>

          {/* Footer links - per your request: these open the Google Form (no scrolling) */}
          <div className="flex flex-wrap justify-center gap-2 pb-6">
            <button
              type="button"
              onClick={openForm}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={openForm}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={openForm}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Disclaimers
            </button>
            <button
              type="button"
              onClick={openForm}
              className="rounded-full px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-slate-100 transition"
            >
              Contact
            </button>
          </div>

          {/* LEGAL CONTENT (visible on-page; buttons above open the form as requested) */}
          <div className="mx-auto max-w-4xl text-xs text-slate-500 space-y-4 pb-10">
            <p>
              <strong>Privacy Notice:</strong> This site does not knowingly collect personal data beyond
              what you choose to submit via email or linked forms. Information shared is used solely to
              respond to inquiries and provide requested services.
            </p>
            <p>
              <strong>Terms of Use:</strong> All content, designs, and code samples on this site are
              provided for informational purposes only and may not be reused or redistributed without
              permission.
            </p>
            <p>
              <strong>No Warranty:</strong> Services and software are provided "as-is" unless otherwise
              agreed upon in writing. Timelines, pricing, and features may vary based on project scope.
            </p>
            <p>
              <strong>Affiliation Disclaimer:</strong> This site and its projects are not affiliated with
              Discord Inc., Stripe, or any third-party platforms mentioned.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
