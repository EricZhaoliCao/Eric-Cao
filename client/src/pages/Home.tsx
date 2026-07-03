import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Github, Linkedin, Mail, FileText, Download, ExternalLink, Eye, ArrowUpRight, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ParticleField from "@/components/ParticleField";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import Magnetic from "@/components/Magnetic";
import Typewriter from "@/components/Typewriter";
import TerminalBar from "@/components/TerminalBar";
import AvatarStage from "@/components/AvatarStage";
import Spotlight from "@/components/Spotlight";
import TiltCard from "@/components/TiltCard";
import SectionTitle from "@/components/SectionTitle";

const experience = [
  {
    company: "Longqi Scientific Investment",
    mono: "LQ",
    slug: "longqi",
    logo: "/images/logos/longqi.png",
    tag: "Top 10 Quant Fund · AUM ¥60B+",
    role: "Quantitative Researcher — ML-Based Portfolio Optimization",
    period: "Hangzhou | Jun 2026 - Present",
    desc: [
      "Research on machine-learning-based portfolio optimization at a top-10 domestic quantitative fund (¥60B+ AUM).",
      "Portfolio Optimization: Developing ML-driven allocation models that combine multi-horizon return forecasts with risk-, cost-, and constraint-aware optimization."
    ]
  },
  {
    company: "NonConvex Technology",
    mono: "NC",
    slug: "nonconvex",
    logo: "/images/logos/nonconvex.png",
    tag: "HFT · ¥35B+ ADV",
    role: "Quantitative Researcher",
    period: "Shanghai | Mar 2026 - Present",
    desc: [
      "Conducted proprietary HFT research on equity index futures, focusing on microstructure alpha and execution optimization.",
      "Low-Latency Execution: Built Rust-based execution modules with queue-reactive order slicing and impact-aware execution."
    ]
  },
  {
    company: "Matrixport",
    mono: "MX",
    slug: "matrixport",
    logo: "/images/logos/matrixport.png",
    tag: "AUM $10B+ digital assets",
    role: "Quantitative Trader",
    period: "Hong Kong | Sep 2025 - Dec 2025",
    desc: [
      "Conducted crypto microstructure research, focusing on L2 signal extraction and multi-frequency factor modeling.",
      "Market Making Strategy Research (Crypto): Studied inventory-aware optimal quoting in a limit order book, adjusting bid–ask spreads and order skew using L2 order book dynamics and funding-rate signals to improve execution quality in backtests.",
      "Microstructure & Regime Detection: Based on L2 order book and funding rate data, extracted market microstructure features and employed a Hidden Markov Model to identify latent market states, enabling dynamic signal adaptation.",
      "Multimodal Temporal Modeling: Optimized an end-to-end time-series modeling framework that integrates L2 order book data with NLP-based sentiment features, utilizing LSTM/Transformer to capture market dynamics."
    ],
    image: "/images/strategy-curve.png"
  }
];

const projects = [
  {
    title: "eLove — Alpha Factor Research Platform",
    role: "Founder & Sole Developer",
    date: "2026 - Present",
    image: "/images/project-nlp.jpg",
    tags: ["Quant Research", "Factor Mining", "Live Portal"],
    desc: "A production quant framework with 800+ alpha factors mined via GP / RL / LLM engines, full portfolio construction, and a live read-only research portal.",
    link: "https://research.erictsao.cn"
  },
  {
    title: "IMC Prosperity3 Trading Competition",
    role: "Team Leader (Global Top 2%)",
    date: "Apr 2025",
    image: "/images/project-finance.jpg",
    tags: ["Quant Trading", "Market Making", "Arbitrage"],
    desc: "Led quantitative strategy design including order book market making, ETF premium arbitrage, and cross-asset relative value strategies.",
    link: "https://github.com/EricZhaoliCao/IMC-Prosperity3"
  },
  {
    title: "Bitcoin Price Prediction",
    role: "Machine Learning Strategy",
    date: "Feb 2025 - May 2025",
    image: "/images/project-crypto.jpg",
    tags: ["Crypto", "Bayesian Opt", "Backtesting"],
    desc: "Developed a multi-model prediction framework with feature engineering on adjusted Bitcoin price series. Sharpe Ratio 2.704.",
    link: "/Thesis.pdf"
  }
];

const credentials = [
  { label: "HKU Master of Finance Transcript", file: "/Transcript.pdf" },
  { label: "BOC Financial Technology Talent Cultivation Scholarship (HK$100,000)", file: "/boc-talent-scholarship.pdf" },
  { label: "MFFinTech Scholarship (HK$46,200)", file: "/mffintech-scholarship.pdf" },
  { label: "MFIN7060 Gold Presentation Recognition", file: "/images/mfin7060-gold-presentation.jpg" },
  { label: "MFIN7060 Group Leader Contribution Recognition", file: "/images/mfin7060-group-leader.jpg" },
  { label: "FinTech & Data Analytic Club - Certificate of Appreciation (VP)", file: "/fintech-club-appreciation.pdf" },
  { label: "NLP Certificate", file: "/nlp-paper.pdf" },
  { label: "WorldQuant Challenge Gold Medal Certificate", file: "/WorldQuantChallengeGoldCertificate.pdf" },
  { label: "DRW - Crypto Market Prediction", file: "/Kaggle.pdf" }
];

const gallery = [
  { src: "/images/photo-beijing.png", title: "Ink Wash Beijing", loc: "Beijing, 2025", desc: "Rain clearing up, painting the city in shades of Jiangnan ink." },
  { src: "/images/photo-oakhurst.png", title: "Morning Glow", loc: "Oakhurst, Feb 2025", desc: "Morning glow and morning flow." },
  { src: "/images/photo-shanghai.png", title: "Shanghai Snow", loc: "Shanghai, 2024", desc: "Snowflakes swaying like elves in the rare winter breeze." },
  { src: "/images/photo-westlake.png", title: "West Lake Dawn", loc: "Hangzhou, Nov 2023", desc: "Morning glow reflecting on the tranquil waters." },
  { src: "/images/photo-kennedy-1.jpg", title: "Kennedy Town Sunset", loc: "Hong Kong, 2025", desc: "Where the tram line ends and the ocean begins." },
  { src: "/images/photo-kennedy-2.jpg", title: "Harbor Lights", loc: "Hong Kong, 2026", desc: "Chasing the last ferry under the golden hour." }
];

// Treemap-style tiles (S&P-heatmap look): a 4×4 grid packed with no gaps.
// Long names live in wide tiles; core skills get the big block + deeper green.
const skills = [
  { name: "Quantitative Trading", desc: "Systematic strategy design, backtesting, and live/sim deployment across equities, index futures, and crypto.", area: "col-start-1 col-span-2 row-start-1 row-span-2", tone: "bg-signal/[0.22]", size: "text-xs md:text-base" },
  { name: "Machine Learning", desc: "Supervised & sequence models (XGBoost, LSTM/Transformer) for alpha, regime detection, and allocation.", area: "col-start-3 col-span-2 row-start-1 row-span-1", tone: "bg-signal/[0.15]", size: "text-[11px] md:text-xs" },
  { name: "High-Frequency Trading", desc: "L2 microstructure alpha, queue-reactive order slicing, and impact-aware execution.", area: "col-start-3 col-span-2 row-start-2 row-span-1", tone: "bg-signal/[0.16]", size: "text-[11px] md:text-xs" },
  { name: "Financial Modeling", desc: "Return & risk forecasting, factor models, and portfolio optimization under cost and constraint budgets.", area: "col-start-1 col-span-2 row-start-3 row-span-1", tone: "bg-signal/[0.12]", size: "text-[11px] md:text-xs" },
  { name: "Python", desc: "Primary research stack — pandas / NumPy / PyTorch, factor pipelines, and tooling.", area: "col-start-3 col-span-1 row-start-3 row-span-1", tone: "bg-signal/[0.10]", size: "text-[10px] md:text-[11px]" },
  { name: "Rust", desc: "Latency-critical execution modules and fast backtesting components.", area: "col-start-4 col-span-1 row-start-3 row-span-1", tone: "bg-signal/[0.08]", size: "text-[10px] md:text-[11px]" },
  { name: "NLP", desc: "Sentiment and text features from filings/news fused into multi-modal time-series signals.", area: "col-start-1 col-span-2 row-start-4 row-span-1", tone: "bg-signal/[0.09]", size: "text-[10px] md:text-[11px]" },
  { name: "C++", desc: "SIMD (AVX2) operators and pybind11 extensions for hot-path compute (~77% speedups).", area: "col-start-3 col-span-2 row-start-4 row-span-1", tone: "bg-signal/[0.11]", size: "text-[10px] md:text-[11px]" },
];

function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <Reveal className="section-head">
      <span className="section-head__index">{index}</span>
      <SectionTitle text={title} className="section-head__title" />
      <span className="section-head__rule" />
    </Reveal>
  );
}

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Dismissible ("close the window") cards — the red terminal dot removes a card.
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const close = (id: string) => setClosed((prev) => new Set(prev).add(id));
  const restoreAll = () => setClosed(new Set());
  const visibleExp = experience.filter((j) => !closed.has(`exp:${j.slug}`));
  const eduClosed = ["edu:hku", "edu:fudan"].filter((id) => closed.has(id));

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-signal/25">
      <ScrollProgress />
      <ParticleField className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("about")} className="flex items-center gap-2.5 group">
            <span className="w-2 h-2 bg-signal shadow-[0_0_10px_var(--signal)] transition-transform group-hover:scale-125" />
            <span className="font-mono text-sm font-semibold tracking-[0.15em]">ERIC&nbsp;TSAO</span>
          </button>
          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[
              ["about", "About"],
              ["experience", "Experience"],
              ["projects", "Projects"],
              ["publications", "Publications"],
              ["photography", "Gallery"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className="link-underline hover:text-foreground transition-colors">
                {label}
              </button>
            ))}
            <Magnetic>
              <a
                href="https://research.erictsao.cn"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-1.5 bg-signal text-background font-medium px-3.5 py-1.5 rounded-none hover:bg-signal/90 transition-colors shadow-[0_0_18px_-4px_var(--signal)]"
              >
                Research <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
          </div>
          <Magnetic>
            <Button variant="outline" size="sm" className="gap-2 border-white/15 hover:border-signal/50 hover:text-signal" onClick={() => window.open("/resume.pdf", "_blank")}>
              <Download className="w-4 h-4" /> Resume
            </Button>
          </Magnetic>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="relative pt-32 pb-12 md:pt-48 md:pb-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="flex-1 space-y-9">
              <Reveal className="flex items-center gap-3 overline">
                <span className="w-6 h-px bg-signal" />
                Quantitative Researcher · Trader
              </Reveal>

              <Reveal delay={0.05} className="space-y-5">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05]">
                  <Typewriter text="Eric Tsao" />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                  Master of Finance in FinTech at HKU.<br />
                  Building alpha at the intersection of{" "}
                  <span className="text-foreground">mathematics, markets, and machine learning</span>.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="flex flex-wrap gap-3">
                <Magnetic>
                  <Button className="gap-2" onClick={() => (window.location.href = "mailto:tsaochaoli@gmail.com")}>
                    <Mail className="w-4 h-4" /> Contact Me
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button variant="outline" className="gap-2 border-white/15 hover:border-signal/50 hover:text-signal" onClick={() => window.open("https://www.linkedin.com/in/eric-caozhaoli/")}>
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button variant="outline" className="gap-2 border-white/15 hover:border-signal/50 hover:text-signal" onClick={() => window.open("https://github.com/EricZhaoliCao")}>
                    <Github className="w-4 h-4" /> GitHub
                  </Button>
                </Magnetic>
              </Reveal>

              <Reveal delay={0.15} className="pt-8 border-t border-white/10">
                <h3 className="overline mb-4">Core Competencies <span className="text-signal-dim normal-case tracking-normal">— click to expand</span></h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Popover key={skill.name}>
                      <PopoverTrigger asChild>
                        <button className="rounded-none px-3 py-1 font-normal text-sm bg-[oklch(0.18_0.012_250/0.8)] backdrop-blur-sm hover:bg-signal/10 hover:text-signal border border-white/10 hover:border-signal/40 data-[state=open]:bg-signal/15 data-[state=open]:text-signal data-[state=open]:border-signal/50 transition-colors cursor-pointer">
                          {skill.name}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 bg-background/95 backdrop-blur border-signal/20 text-sm">
                        <div className="font-mono text-xs text-signal mb-1.5">$ {skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</div>
                        <p className="text-muted-foreground leading-relaxed">{skill.desc}</p>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="w-full md:w-1/3">
              <AvatarStage src="/images/avatar.jpg" alt="Eric Tsao" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="pt-12 pb-24 md:pt-14 border-t border-white/5">
        <div className="container">
          <SectionHead index="01" title="Education" />
          <div className="space-y-5">
            <AnimatePresence initial={false}>
            {!closed.has("edu:hku") && (
            <motion.div key="edu-hku" layout exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}>
            <Reveal x={-16} rotate={-1.2} scale={0.97}>
              <TiltCard className="group p-6 md:p-7">
              <TerminalBar title="~/education/hku.log" onClose={() => close("edu:hku")} />
              <div className="flex items-start gap-5 mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 grid place-items-center border border-white/10 bg-white/[0.04] overflow-hidden">
                  <img src="/images/logos/hku.png" alt="HKU crest" className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                    <h3 className="text-2xl font-semibold group-hover:text-signal transition-colors">The University of Hong Kong</h3>
                    <span className="data text-muted-foreground shrink-0">2025.09 - 2026.11</span>
                  </div>
                  <div className="text-lg text-white/80">Master of Finance in Financial Technology</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 border-t border-white/5 pt-4">
                <div className="flex-1">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                    <li><span className="text-white/60">GPA:</span> <span className="data text-signal">3.99/4.0</span></li>
                    <li>
                      <span className="text-white/60">Honors:</span>{" "}
                      <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/boc-talent-scholarship.pdf", "_blank")}>
                        BOC Financial Technology Talent Cultivation Scholarship (HK$100,000) <ExternalLink className="w-3 h-3" />
                      </span>,{" "}
                      <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/mffintech-scholarship.pdf", "_blank")}>
                        MFFinTech Scholarship (HK$46,200) <ExternalLink className="w-3 h-3" />
                      </span>,{" "}
                      <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/images/mfin7060-gold-presentation.jpg", "_blank")}>
                        MFIN7060 Gold Presentation Recognition <ExternalLink className="w-3 h-3" />
                      </span>,{" "}
                      <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/images/mfin7060-group-leader.jpg", "_blank")}>
                        MFIN7060 Group Leader Contribution Recognition <ExternalLink className="w-3 h-3" />
                      </span>,{" "}
                      <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/fintech-club-appreciation.pdf", "_blank")}>
                        Vice President, FinTech &amp; Data Analytic Club <ExternalLink className="w-3 h-3" />
                      </span>
                    </li>
                    <li><span className="text-white/60">Core Courses:</span> Quantitative Trading, Machine Learning and AI, Mathematical Techniques in Finance, Derivative Securities, Investment Analysis &amp; Portfolio Management, Advanced Financial Programming, Text Analytics &amp; NLP in FinTech</li>
                  </ul>
                </div>
                <div className="shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 border-white/15 hover:border-signal/50 hover:text-signal">
                        <Eye className="w-4 h-4" /> View Transcript
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-background/95 border-white/10">
                      <DialogTitle className="text-xl font-semibold">The University of Hong Kong</DialogTitle>
                      <DialogDescription>Master of Finance in Financial Technology - Official Transcript</DialogDescription>
                      <div className="mt-4">
                        <img src="/images/hku-transcript.jpg" alt="HKU Transcript" className="w-full border border-white/10" />
                        <p className="text-xs text-muted-foreground mt-2 text-center">* Demo snapshot only</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              </TiltCard>
            </Reveal>
            </motion.div>
            )}
            {!closed.has("edu:fudan") && (
            <motion.div key="edu-fudan" layout exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}>
            <Reveal x={-16} rotate={-1.2} scale={0.97}>
              <TiltCard className="group p-6 md:p-7">
              <TerminalBar title="~/education/fudan.log" onClose={() => close("edu:fudan")} />
              <div className="flex items-start gap-5 mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 grid place-items-center border border-white/10 bg-white/[0.04] overflow-hidden">
                  <img src="/images/logos/fudan.png" alt="Fudan crest" className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                    <h3 className="text-2xl font-semibold group-hover:text-signal transition-colors">Fudan University</h3>
                    <span className="data text-muted-foreground shrink-0">2020.09 - 2025.06</span>
                  </div>
                  <div className="text-lg text-white/80">Bachelor of Science in Mathematics (Minor: Economics & Finance)</div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground border-t border-white/5 pt-4">
                <li><span className="text-white/60">GPA:</span> <span className="data text-signal">3.76 / 4.0</span></li>
                <li>
                  <span className="text-white/60">Honors:</span>{" "}
                  <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/wq-certificate.pdf", "_blank")}>
                    WorldQuant Gold Medal (2025) <ExternalLink className="w-3 h-3" />
                  </span>,
                  First-Class Scholarship (2024),
                  IMC Prosperity3 Global Top 2% (2025),{" "}
                  <span className="inline-flex items-center gap-1 cursor-pointer text-white/90 hover:text-signal transition-colors" onClick={() => window.open("/Kaggle.pdf", "_blank")}>
                    Kaggle DRW Crypto Market Prediction Top 10% (2025) <ExternalLink className="w-3 h-3" />
                  </span>,
                  MCM Meritorious Winner (2023)
                </li>
                <li><span className="text-white/60">Core Courses:</span> Mathematical Modeling, Numerical Solution of DE, Real Analysis, Financial Engineering, Econometrics</li>
              </ul>
              </TiltCard>
            </Reveal>
            </motion.div>
            )}
            </AnimatePresence>
            {eduClosed.length > 0 && (
              <button onClick={restoreAll} className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-signal-dim hover:text-signal transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> restore {eduClosed.length} closed window{eduClosed.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative py-24 border-t border-white/5 bg-white/[0.015] dot-grid">
        <div className="container">
          <SectionHead index="02" title="Professional Experience" />
          <div className="grid gap-5">
            <AnimatePresence initial={false}>
            {visibleExp.map((job, index) => (
              <motion.div key={job.slug} layout exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}>
              <Reveal delay={Math.min(index * 0.05, 0.15)} x={-16} rotate={-1.2} scale={0.97}>
                <TiltCard className="p-6 md:p-7 group">
                  {/* faint index watermark */}
                  <span className="pointer-events-none absolute top-3 right-4 font-mono text-4xl md:text-5xl font-bold text-white/[0.03] select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <TerminalBar title={`~/experience/${job.slug}.log`} onClose={() => close(`exp:${job.slug}`)} />
                  <div className="flex gap-5">
                    {job.logo ? (
                      <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 grid place-items-center border border-white/10 bg-white/[0.04] overflow-hidden">
                        <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain p-1" />
                      </div>
                    ) : (
                      <div className="mono-tile w-12 h-12 md:w-14 md:h-14 text-base md:text-lg">{job.mono}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-xl font-bold group-hover:text-signal transition-colors">{job.company}</h3>
                        <span className="data text-sm text-muted-foreground shrink-0">{job.period}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 mb-1">
                        <span className="text-signal-dim font-medium">{job.role}</span>
                        {job.tag && (
                          <span className="font-mono text-[10px] uppercase tracking-wider border border-white/10 px-2 py-0.5 text-white/55">
                            {job.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2.5 text-muted-foreground border-t border-white/5 pt-4">
                    {job.desc.map((item, i) => (
                      <li key={i} className="leading-relaxed text-sm md:text-[15px] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-px before:bg-signal/60">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {job.image && (
                    <div className="mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2 border-white/15 hover:border-signal/50 hover:text-signal">
                            <Eye className="w-4 h-4" /> View Strategy Demo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-background/95 border-white/10">
                          <DialogTitle className="text-xl font-semibold">Strategy Performance Demo</DialogTitle>
                          <DialogDescription>Historical performance visualization for demonstration purposes.</DialogDescription>
                          <div className="mt-4">
                            <img src={job.image} alt="Strategy Performance" className="w-full border border-white/10 bg-white/5" />
                            <p className="text-xs text-muted-foreground mt-2 text-center">* Demo snapshot only. Not a complete project representation.</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </TiltCard>
              </Reveal>
              </motion.div>
            ))}
            </AnimatePresence>
            {experience.length - visibleExp.length > 0 && (
              <button onClick={restoreAll} className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-signal-dim hover:text-signal transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> restore {experience.length - visibleExp.length} closed window{experience.length - visibleExp.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 border-t border-white/5">
        <div className="container">
          <SectionHead index="03" title="Selected Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Reveal key={index} delay={Math.min(index * 0.07, 0.2)} className="h-full">
                <Spotlight className="h-full">
                <Card
                  className="h-full bg-[oklch(0.16_0.012_250/0.9)] backdrop-blur-md border border-white/10 hover:border-signal/40 transition-colors rounded-none overflow-hidden group cursor-pointer"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg font-bold leading-tight group-hover:text-signal transition-colors">{project.title}</CardTitle>
                      <ArrowUpRight className="w-4 h-4 text-signal opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    <div className="data text-xs text-muted-foreground mb-4">{project.date}</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 text-white/60 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                  </CardHeader>
                </Card>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Credentials */}
      <section id="publications" className="py-24 border-t border-white/5 bg-white/[0.015]">
        <div className="container">
          <SectionHead index="04" title="Publications & Credentials" />
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
              <h3 className="overline mb-6">Publications & Research</h3>
              <div className="space-y-4">
                <div className="p-6 bg-[oklch(0.16_0.012_250/0.88)] backdrop-blur-md border border-white/10 hover:border-signal/30 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-white/40 group-hover:text-signal transition-colors mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-signal transition-colors">
                        High-Frequency Statistical Arbitrage in Crypto Markets
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Research paper exploring cointegrated pairs via 5-min bars and dynamic-beta hedged Z-score signals.
                      </p>
                      <div className="flex items-center gap-2 data text-xs text-white/50">
                        <span>Working Paper</span><span>•</span><span>2025</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-white/10 border-dashed flex items-center justify-center text-muted-foreground text-sm h-32">
                  More publications coming soon...
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h3 className="overline mb-6">Transcripts & Certificates</h3>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div key={c.label} className="flex items-center justify-between p-4 bg-[oklch(0.16_0.012_250/0.85)] backdrop-blur-md border border-white/10 hover:border-signal/40 transition-colors cursor-pointer group" onClick={() => window.open(c.file, "_blank")}>
                    <span className="font-medium text-sm group-hover:text-signal transition-colors">{c.label}</span>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-signal transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Photography */}
      <section id="photography" className="py-28 border-t border-white/5 bg-black/40">
        <div className="container">
          <Reveal className="flex flex-col items-center text-center mb-16">
            <span className="overline mb-4">05 — Off the Desk</span>
            <h2 className="font-script text-6xl md:text-7xl leading-none mb-6"><span className="text-signal">G</span>allery</h2>
            <p className="text-muted-foreground max-w-xl font-light leading-relaxed">
              "Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever... It remembers little things, long after you have forgotten everything."
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((photo, i) => (
              <Reveal key={i} delay={Math.min((i % 3) * 0.07, 0.15)} className="group">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="relative overflow-hidden aspect-[4/3] mb-4">
                        <div className="absolute inset-0 border-[10px] border-white/5 z-10 pointer-events-none transition-colors group-hover:border-signal/10" />
                        <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] uppercase tracking-wider text-white/70 bg-black/50 backdrop-blur px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to view
                        </div>
                        <img src={photo.src} alt={photo.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter sepia-[0.2] group-hover:sepia-0" />
                      </div>
                      <div className="flex justify-between items-baseline border-b border-white/10 pb-2 group-hover:border-signal/30 transition-colors">
                        <h3 className="font-script text-2xl leading-none"><span className="text-signal">{photo.title.slice(0, 1)}</span>{photo.title.slice(1)}</h3>
                        <span className="data text-xs text-muted-foreground">{photo.loc}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        {photo.desc}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl bg-background/95 border-white/10 p-0 overflow-hidden">
                    <img src={photo.src} alt={photo.title} className="w-full max-h-[74vh] object-contain bg-black" />
                    <div className="p-5">
                      <div className="flex justify-between items-baseline gap-4">
                        <DialogTitle className="font-script text-3xl leading-none"><span className="text-signal">{photo.title.slice(0, 1)}</span>{photo.title.slice(1)}</DialogTitle>
                        <span className="data text-sm text-muted-foreground shrink-0">{photo.loc}</span>
                      </div>
                      <DialogDescription className="mt-2 text-muted-foreground font-light leading-relaxed">{photo.desc}</DialogDescription>
                    </div>
                  </DialogContent>
                </Dialog>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/60">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-signal rounded-full" />
            © 2026 Eric Tsao. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="mailto:tsaochaoli@gmail.com" className="link-underline hover:text-foreground transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/eric-caozhaoli/" target="_blank" rel="noopener" className="link-underline hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://github.com/EricZhaoliCao" target="_blank" rel="noopener" className="link-underline hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
