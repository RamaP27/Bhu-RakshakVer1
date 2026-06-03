import { createFileRoute } from "@tanstack/react-router";
import { Particles } from "@/components/bhu/Particles";
import { Counter } from "@/components/bhu/Counter";
import { Reveal } from "@/components/bhu/Reveal";
import { Drone } from "@/components/bhu/Drone";
import { useState, useEffect } from "react";
import logoAsset from "@/assets/bhu-rakshak-logo.png.asset.json";

function LogoGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(0,245,212,0.35), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <img
        src={logoAsset.url}
        alt="Bhu-Rakshak logo — hands protecting the Earth"
        className="relative h-full w-full object-contain"
        style={{
          animation: "float-y 6s ease-in-out infinite",
          filter: "drop-shadow(0 0 30px rgba(0,245,212,0.45)) drop-shadow(0 0 60px rgba(255,153,51,0.25))",
        }}
      />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhu-Rakshak — AI + IoT Smart Irrigation with Autonomous Drones" },
      { name: "description", content: "Reimagining irrigation with AI, IoT and autonomous drones. The operating system of the future farm." },
      { property: "og:title", content: "Bhu-Rakshak — Future Farm OS" },
      { property: "og:description", content: "LSTM forecasting, Gemini + RAG, LoRaWAN sensors, autonomous drone irrigation." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen text-foreground" style={{ background: "var(--midnight)" }}>
      <AmbientBackground />
      <Nav />
      <Hero />
      <MiniGlobe />
      <Problem />
      <WhatIs />
      <HowItWorks />
      <TechStack />
      <Impact />
      <Architecture />
      <UseCases />
      <FutureVision />
      <Builder />
      <Footer />
    </main>
  );
}

/* ------------------------------ Mini Globe -------------------------------- */
function MiniGlobe() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed right-4 top-20 z-40 h-28 w-28 transition-all duration-700 md:h-36 md:w-36"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.5)",
        pointerEvents: "none",
        filter: "drop-shadow(0 0 20px rgba(0,245,212,0.5))",
      }}
    >
      <LogoGlobe />
    </div>
  );
}

/* ------------------------------- Ambient ---------------------------------- */
function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" style={{ animation: "grid-pan 30s linear infinite" }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(800px 500px at 20% 10%, rgba(0,245,212,0.10), transparent 60%), radial-gradient(900px 600px at 90% 70%, rgba(201,125,46,0.08), transparent 60%)",
      }} />
      <div className="absolute left-0 top-1/3 w-full" style={{ animation: "float-drone 28s linear infinite" }}>
        <Drone className="w-24 opacity-70" />
      </div>
      <div className="absolute left-0 top-2/3 w-full" style={{ animation: "float-drone 40s linear infinite", animationDelay: "-12s" }}>
        <Drone className="w-16 opacity-50" />
      </div>
    </div>
  );
}

/* --------------------------------- Nav ------------------------------------ */
function Nav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="#top" className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md glow-border" style={{ background: "var(--forest)" }}>
          <span className="block h-3 w-3 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
        </span>
        <span className="font-mono-tech text-sm tracking-[0.3em]"><span style={{ color: "#FF9933" }}>BHU</span><span className="text-cyan-glow">-RAKSHAK</span></span>
      </a>
      <nav className="hidden gap-8 font-mono-tech text-xs md:flex">
        {["System", "How it works", "Architecture", "Impact", "Vision"].map((l) => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="text-muted-foreground transition hover:text-cyan-glow">{l}</a>
        ))}
      </nav>
      <a href="https://medium.com" target="_blank" rel="noreferrer" className="hidden rounded-full border border-[color:var(--cyan)]/40 px-4 py-2 font-mono-tech text-xs text-cyan-glow transition hover:bg-[color:var(--cyan)]/10 md:inline-block">
        READ ON MEDIUM →
      </a>
    </header>
  );
}

/* --------------------------------- Hero ----------------------------------- */
function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const progress = Math.min(scrollY / (vh * 0.6), 1);
  const textOpacity = 1 - progress;
  const textShift = -progress * 80;
  const globeScale = 1 - progress * 0.4;
  const globeOpacity = 1 - progress * 0.9;

  return (
    <section id="top" className="relative z-10 mx-auto min-h-[92vh] max-w-7xl px-6">
      <Particles density={60} />
      {/* radial spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 70% 50%, rgba(0,245,212,0.12), transparent 70%)" }} />
      <div className="grid min-h-[92vh] items-center gap-10 md:grid-cols-2">
        {/* Text */}
        <div
          className="relative z-10 text-center md:text-left"
          style={{ opacity: textOpacity, transform: `translateX(${textShift}px)`, transition: "transform 0.1s linear" }}
        >
          <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]/80">
            [ AI · IoT · AUTONOMOUS DRONES ]
          </p>
          <h1 className="extruded-3d mt-6 select-none text-[14vw] font-bold leading-[0.9] tracking-tighter md:text-[6.5rem]" style={{ color: "var(--soft-white)" }}>
            <span style={{ color: "#FF9933" }}>BHU</span>-RAKSHAK
          </h1>
          <p className="mt-6 text-balance text-xl font-semibold text-cyan-glow md:text-2xl">
            The Autonomous Intelligence Layer for Precision Agriculture
          </p>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            IoT sensors. LSTM prediction. Autonomous drones. One unified platform —
            watching every field, every drop, in real time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a href="#system" className="rounded-full px-8 py-4 font-mono-tech text-sm tracking-wider text-[color:var(--midnight)]" style={{ background: "var(--gradient-glow)", boxShadow: "var(--shadow-glow)" }}>
              EXPLORE THE SYSTEM →
            </a>
            <a href="#architecture" className="rounded-full border border-[color:var(--soft-white)]/40 px-8 py-4 font-mono-tech text-sm tracking-wider text-[color:var(--soft-white)] transition hover:bg-[color:var(--soft-white)]/10">
              READ THE ARCHITECTURE →
            </a>
          </div>
        </div>

        {/* Globe */}
        <div
          className="relative mx-auto h-[400px] w-full max-w-[500px] md:h-[500px]"
          style={{
            opacity: globeOpacity,
            transform: `scale(${globeScale})`,
            transition: "opacity 0.2s linear",
          }}
        >
          <LogoGlobe />
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono-tech text-[10px] tracking-[0.4em] text-[color:var(--cyan)]/60"
        style={{ opacity: textOpacity }}>
        SCROLL ↓
      </div>
    </section>
  );
}

/* ------------------------------- Problem ---------------------------------- */
function Problem() {
  const stats = [
    { num: "50%", title: "Water Wasted", body: "Traditional flood and sprinkler irrigation loses half of every drop.", icon: CrackedSoil },
    { num: "1.5°C", title: "Climate Disruption", body: "Rising temperatures are rewriting global crop cycles in real time.", icon: StormCloud },
    { num: "9B", title: "Food Security at Risk", body: "We must feed nine billion people on a planet running out of fresh water.", icon: Wheat },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--amber)]">[ THE PROBLEM ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
          Agriculture is at an <span className="neon-text">inflection point</span>.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Traditional irrigation is no longer viable. Precision must replace intuition.
        </p>
      </Reveal>
      <div className="mt-20 grid gap-8 md:grid-cols-3" style={{ perspective: "1500px" }}>
        {stats.map((s, i) => (
          <Reveal key={s.title} delay={i * 150}>
            <div className="tilt-3d glow-card relative h-full rounded-2xl p-8">
              <s.icon />
              <div className="mt-6 text-5xl font-bold text-cyan-glow">{s.num}</div>
              <div className="mt-2 font-mono-tech text-xs tracking-[0.2em] text-[color:var(--amber)]">{s.title.toUpperCase()}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const iconBox = "h-12 w-12 text-[color:var(--cyan)]";
function CrackedSoil() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconBox}><path d="M2 18h20M5 18l3-6 2 4 3-8 2 5 2-3 3 8"/><path d="M8 21v-3M14 21v-3"/></svg>); }
function StormCloud() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconBox}><path d="M7 15a4 4 0 1 1 1-7.9 5 5 0 0 1 9.7 1.7A3.5 3.5 0 0 1 17 15H7z"/><path d="M11 17l-2 4M15 17l-2 4"/></svg>); }
function Wheat() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconBox}><path d="M12 22V8M12 8c0-2 2-4 4-4 0 2-2 4-4 4zM12 8c0-2-2-4-4-4 0 2 2 4 4 4zM12 13c0-2 2-4 4-4 0 2-2 4-4 4zM12 13c0-2-2-4-4-4 0 2 2 4 4 4zM12 18c0-2 2-4 4-4 0 2-2 4-4 4zM12 18c0-2-2-4-4-4 0 2 2 4 4 4z"/></svg>); }

/* -------------------------------- What Is --------------------------------- */
function WhatIs() {
  const pillars = [
    { title: "IoT Sensors", code: "01 / LAYER", desc: "Soil moisture, weather and crop signals streamed over LoRaWAN." },
    { title: "AI Brain", code: "02 / CORE", desc: "LSTM + GRU forecasts, Gemini LLM and RAG-validated decisioning." },
    { title: "Drone Fleet", code: "03 / EDGE", desc: "GPS-guided autonomous drones deliver water with surgical precision." },
  ];
  return (
    <section id="system" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]">[ WHAT IS <span style={{ color: "#FF9933" }}>BHU</span>-RAKSHAK ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold md:text-6xl">
          A full-stack <span className="neon-text">agricultural intelligence</span> system — not just a product.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-24 max-w-5xl" style={{ perspective: "1400px" }}>
        {/* terrain */}
        <div className="relative mx-auto h-48 w-full rounded-[50%]"
             style={{
               background: "radial-gradient(ellipse at center, #0a2e1a 0%, #050d0a 70%)",
               transform: "rotateX(72deg)",
               boxShadow: "0 0 80px rgba(0,245,212,0.25)",
             }}>
          <div className="absolute inset-0 rounded-[50%] bg-grid opacity-60" />
        </div>
        {/* pillars */}
        <div className="-mt-40 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 200}>
              <div className="group relative">
                <div className="mx-auto h-40 w-1 rounded-full" style={{
                  background: "linear-gradient(180deg, transparent, var(--cyan))",
                  boxShadow: "0 0 18px var(--cyan)",
                  animation: `float-y 4s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }} />
                <div className="tilt-3d glow-card mt-4 rounded-xl p-6 text-center">
                  <div className="font-mono-tech text-[10px] tracking-[0.3em] text-[color:var(--amber)]">{p.code}</div>
                  <div className="mt-2 text-2xl font-bold text-cyan-glow">{p.title}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How It Works ------------------------------ */
function HowItWorks() {
  const nodes = [
    { n: "01", title: "Field Sensing", body: "Soil sensors → LoRaWAN gateway → Cloud Pub/Sub event bus." },
    { n: "02", title: "Data Processing", body: "Microservices ingest → BigQuery + GCS → Vertex AI feature store." },
    { n: "03", title: "AI Decisioning", body: "LSTM predicts 24–72h water needs → Gemini + RAG validates → drone path optimizer." },
    { n: "04", title: "Autonomous Execution", body: "Drones irrigate → filtration adjusts → SMS / FCM dashboard alerts." },
  ];
  return (
    <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]">[ HOW IT WORKS ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold md:text-6xl">A cinematic <span className="neon-text">data pipeline</span>.</h2>
      </Reveal>
      <div className="relative mt-20">
        <div className="absolute left-0 right-0 top-1/2 hidden h-px md:block"
             style={{
               backgroundImage: "linear-gradient(90deg, var(--cyan) 50%, transparent 50%)",
               backgroundSize: "20px 1px",
               animation: "data-flow 2s linear infinite",
               opacity: 0.5,
             }} />
        <div className="grid gap-8 md:grid-cols-4">
          {nodes.map((n, i) => (
            <Reveal key={n.n} delay={i * 150}>
              <div className="relative">
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full glow-card">
                  <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]" style={{ animation: "pulse-ring 3s ease-out infinite", animationDelay: `${i * 0.6}s` }} />
                  <span className="font-mono-tech text-lg text-cyan-glow">{n.n}</span>
                </div>
                <div className="tilt-3d glow-card mt-6 rounded-xl p-5">
                  <div className="text-lg font-semibold text-[color:var(--soft-white)]">{n.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Tech Stack ------------------------------ */
function TechStack() {
  const tags = [
    "Python","TensorFlow","Keras","LSTM","GKE","Cloud Run","BigQuery","Vertex AI",
    "LoRaWAN","Pub/Sub","Gemini LLM","RAG","Docker","FastAPI","Gradio","Raspberry Pi","GPS Drones","GCS",
  ];
  const [active, setActive] = useState<string | null>(null);
  const desc: Record<string, string> = {
    "LSTM": "Sequence model forecasting soil moisture 24–72 hours ahead.",
    "Gemini LLM": "Validates AI decisions and answers farmer queries.",
    "RAG": "Retrieves agronomic context before each watering decision.",
    "LoRaWAN": "Long-range low-power radio for in-field sensor mesh.",
    "Pub/Sub": "Event backbone connecting sensors to microservices.",
    "BigQuery": "Warehouse of every drop, every sensor, every hour.",
    "Vertex AI": "Hosts training and serving for the prediction pipeline.",
    "Cloud Run": "Stateless microservices scale to zero between flights.",
    "GKE": "Orchestrates always-on services with strict SLOs.",
    "Raspberry Pi": "Edge controller on the farm coordinating drones offline.",
    "GPS Drones": "Autonomous swarm executing optimized irrigation routes.",
    "Docker": "Reproducible containers for every microservice.",
    "FastAPI": "Internal APIs for sensor + drone microservices.",
    "Gradio": "Internal UI for inspecting model decisions.",
    "GCS": "Object store for raw sensor blobs and model artifacts.",
    "Python": "The lingua franca of the AI + control plane.",
    "TensorFlow": "Backbone for the forecasting models.",
    "Keras": "High-level API for rapid model iteration.",
  };
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]">[ TECH STACK ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold md:text-6xl">Built on the <span className="neon-text">production frontier</span>.</h2>
      </Reveal>
      <div className="relative mx-auto mt-16 max-w-5xl">
        <div className="absolute inset-0 -z-0 mx-auto h-[420px] w-[420px] rounded-full opacity-30"
             style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="relative flex flex-wrap justify-center gap-3">
          {tags.map((t, i) => (
            <button key={t} onClick={() => setActive(active === t ? null : t)}
              className="group relative rounded-full border border-[color:var(--cyan)]/30 bg-[color:var(--forest)]/60 px-5 py-2 font-mono-tech text-xs tracking-wider text-[color:var(--soft-white)] transition hover:border-[color:var(--cyan)] hover:text-cyan-glow"
              style={{ animation: `float-y ${4 + (i % 5)}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}>
              {t}
            </button>
          ))}
        </div>
        {active && (
          <div className="mx-auto mt-10 max-w-md rounded-xl glow-card p-5 text-center">
            <div className="font-mono-tech text-xs tracking-[0.3em] text-[color:var(--amber)]">{active.toUpperCase()}</div>
            <p className="mt-2 text-sm text-muted-foreground">{desc[active] ?? "Core component of the Bhu-Rakshak stack."}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- Impact --------------------------------- */
function Impact() {
  const items = [
    { v: <><Counter to={50} suffix="%" /></>, sub: "Water Savings", label: "40–50% reduction" },
    { v: <><Counter to={72} suffix="h" /></>, sub: "Forecast Window", label: "24–72 hr predictive" },
    { v: <><Counter to={5} /></>, sub: "Microservices", label: "In production" },
    { v: <>∞</>, sub: "Scalability", label: "1 farm → 1,000+" },
  ];
  return (
    <section id="impact" className="relative z-10 py-32" style={{ background: "linear-gradient(180deg, transparent, rgba(5,13,10,0.8), transparent)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--amber)]">[ IMPACT ]</p>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">Numbers that <span className="neon-text">move the needle</span>.</h2>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="glow-card rounded-2xl p-8 text-center">
                <div className="text-6xl font-bold text-cyan-glow md:text-7xl">{it.v}</div>
                <div className="mt-4 font-mono-tech text-xs tracking-[0.3em] text-[color:var(--amber)]">{it.sub.toUpperCase()}</div>
                <p className="mt-2 text-xs text-muted-foreground">{it.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Architecture ------------------------------ */
function Architecture() {
  const floors = [
    { name: "Autonomous Execution", parts: ["Drones", "Raspberry Pi Controller", "Edge Compute"], color: "var(--cyan)" },
    { name: "Cloud-Native AI & Processing", parts: ["Communication", "Batch Mgmt", "Drone Control", "Notification", "Analytics", "BigQuery", "GCS", "Vertex AI"], color: "var(--cyan-soft)" },
    { name: "Sensing & Data Acquisition", parts: ["Soil Sensors", "Weather Feeds", "LoRaWAN", "Pub/Sub"], color: "var(--amber)" },
  ];
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="architecture" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]">[ ARCHITECTURE ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold md:text-6xl">Three floors. <span className="neon-text">One operating system.</span></h2>
      </Reveal>
      <div className="mx-auto mt-20 max-w-4xl" style={{ perspective: "1600px" }}>
        <div style={{ transformStyle: "preserve-3d", transform: "rotateX(18deg) rotateY(-8deg)" }} className="space-y-6">
          {floors.map((f, i) => (
            <Reveal key={f.name} delay={i * 150}>
              <div className="glow-card rounded-xl p-6"
                   style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px ${f.color}55, inset 0 0 30px ${f.color}10` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.3em]" style={{ color: f.color }}>FLOOR {3 - i}</div>
                    <div className="text-xl font-bold text-[color:var(--soft-white)]">{f.name}</div>
                  </div>
                  <div className="font-mono-tech text-xs text-muted-foreground">{f.parts.length} components</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.parts.map((p) => (
                    <button key={p} onClick={() => setActive(p === active ? null : p)}
                      className="rounded-md border border-[color:var(--cyan)]/30 bg-[color:var(--midnight)]/40 px-3 py-1.5 font-mono-tech text-[11px] text-[color:var(--soft-white)] transition hover:border-[color:var(--cyan)] hover:text-cyan-glow">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {active && (
          <div className="mx-auto mt-8 max-w-md rounded-xl glow-card p-5 text-center">
            <div className="font-mono-tech text-xs tracking-[0.3em] text-[color:var(--amber)]">{active.toUpperCase()}</div>
            <p className="mt-2 text-sm text-muted-foreground">Critical component of the Bhu-Rakshak architecture stack, deployed and observable in production.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------- Use Cases -------------------------------- */
function UseCases() {
  const cases = [
    { e: "🌾", t: "Farmers", b: "Higher yields, lower water costs, less manual labor — irrigation that thinks ahead." },
    { e: "🏛️", t: "Governments", b: "Water conservation, drought resilience and a foundation for modern food security policy." },
    { e: "🤝", t: "Tech Partners", b: "Groundbreaking AI/IoT integration opening up new precision-agriculture markets." },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--cyan)]">[ WHO BENEFITS ]</p>
        <h2 className="mt-4 text-balance text-4xl font-bold md:text-6xl">A platform with <span className="neon-text">three audiences</span>.</h2>
      </Reveal>
      <div className="mt-20 grid gap-8 md:grid-cols-3" style={{ perspective: "1500px" }}>
        {cases.map((c, i) => (
          <Reveal key={c.t} delay={i * 150}>
            <div className="tilt-3d glow-card h-full rounded-2xl p-8"
                 style={{ transform: `rotateY(${i === 0 ? -4 : i === 2 ? 4 : 0}deg)` }}>
              <div className="text-5xl">{c.e}</div>
              <div className="mt-6 text-2xl font-bold text-cyan-glow">{c.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Future Vision ----------------------------- */
function FutureVision() {
  const future = [
    "Multispectral drone imaging",
    "Autonomous tractors",
    "Weather-aware planting schedules",
    "LLM-powered farmer advisory",
  ];
  return (
    <section id="vision" className="relative z-10 overflow-hidden py-40">
      <div className="absolute inset-0 -z-10"
           style={{
             background: "radial-gradient(1000px 600px at 50% 50%, rgba(0,245,212,0.12), transparent 70%), linear-gradient(180deg, #050d0a, #0a2e1a, #050d0a)",
           }} />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <Drone className="absolute right-10 top-10 w-24 opacity-60" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-mono-tech text-xs tracking-[0.4em] text-[color:var(--amber)]">[ FUTURE VISION ]</p>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            Bhu-Rakshak is not just an irrigation tool.
          </h2>
        </Reveal>
        <Reveal delay={400}>
          <p className="neon-text mt-6 text-balance text-3xl font-bold md:text-5xl">
            It is the Operating System of the Future Farm.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {future.map((f, i) => (
            <Reveal key={f} delay={i * 150}>
              <div className="tilt-3d glow-card rounded-xl px-6 py-5 text-left">
                <span className="font-mono-tech text-[10px] text-[color:var(--cyan)]">→ {String(i + 1).padStart(2, "0")}</span>
                <div className="mt-1 text-lg text-[color:var(--soft-white)]">{f}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Builder -------------------------------- */
function Builder() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-32">
      <Reveal>
        <div className="glow-card relative overflow-hidden rounded-3xl p-10 md:p-14">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30"
               style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }} />
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl text-3xl font-bold text-[color:var(--midnight)]"
                 style={{ background: "var(--gradient-glow)", boxShadow: "var(--shadow-glow)" }}>
              RP
            </div>
            <div className="flex-1">
              <p className="font-mono-tech text-xs tracking-[0.3em] text-[color:var(--amber)]">[ BUILDER ]</p>
              <h3 className="mt-2 text-3xl font-bold text-[color:var(--soft-white)]">Ramaprayag <span className="text-muted-foreground">/ RamaP27</span></h3>
              <p className="mt-2 text-muted-foreground">Builder. Engineer. Precision-ag enthusiast.</p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono-tech text-xs">
                {[
                  { l: "GitHub · Bhu_Rakshak", href: "https://github.com/RamaP27/Bhu_Rakshak" },
                  { l: "GitHub · WaterSprinler", href: "https://github.com/RamaP27/WaterSprinler" },
                  { l: "Medium Article", href: "https://medium.com" },
                  { l: "LinkedIn", href: "https://www.linkedin.com/in/ramap27/" },
                ].map((l) => (
                  <a key={l.l} href={l.href} target="_blank" rel="noreferrer"
                     className="rounded-full border border-[color:var(--cyan)]/30 px-4 py-2 text-cyan-glow transition hover:bg-[color:var(--cyan)]/10">
                    {l.l} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--cyan)]/20 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md" style={{ background: "var(--forest)" }}>
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
          </span>
          <div>
            <div className="font-mono-tech text-xs tracking-[0.3em]"><span style={{ color: "#FF9933" }}>BHU</span><span className="text-cyan-glow">-RAKSHAK</span></div>
            <div className="text-xs text-muted-foreground">Growing smarter. Saving water. Feeding the future.</div>
          </div>
        </div>
        <div className="flex gap-5 font-mono-tech text-xs text-muted-foreground">
          <a href="https://github.com/RamaP27" target="_blank" rel="noreferrer" className="hover:text-cyan-glow">GITHUB</a>
          <a href="https://www.linkedin.com/in/ramap27/" target="_blank" rel="noreferrer" className="hover:text-cyan-glow">LINKEDIN</a>
          <a href="https://medium.com" target="_blank" rel="noreferrer" className="hover:text-cyan-glow">MEDIUM</a>
        </div>
        <div className="font-mono-tech text-[10px] tracking-[0.3em] text-[color:var(--amber)]">
          BUILT WITH AI · IoT · PURPOSE
        </div>
      </div>
    </footer>
  );
}
