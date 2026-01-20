import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, FileText, Download, ExternalLink, Camera, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <div className="font-bold text-lg tracking-tighter">ZHAOLI CAO</div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-foreground transition-colors">About</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-foreground transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-foreground transition-colors">Projects</button>
            <button onClick={() => scrollToSection('publications')} className="hover:text-foreground transition-colors">Publications</button>
            <button onClick={() => scrollToSection('photography')} className="hover:text-foreground transition-colors">Photography</button>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => window.open('/resume.pdf', '_blank')}>
              <Download className="w-4 h-4" /> Resume
            </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  Zhaoli Cao
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
                  Master of Finance in FinTech at HKU. <br/>
                  Quantitative Researcher & Trader.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2" onClick={() => window.location.href = 'mailto:tsaochaoli@gmail.com'}>
                  <Mail className="w-4 h-4" /> Contact Me
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => window.open('https://www.linkedin.com/in/eric-caozhaoli/')}>
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => window.open('https://github.com/EricZhaoliCao')}>
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {["Quantitative Trading", "Financial Modeling", "Machine Learning", "NLP", "High-Frequency Trading", "Python", "C++"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-none px-3 py-1 font-normal text-sm bg-white/5 hover:bg-white/10 border-white/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 aspect-square relative group">
              <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <img 
                src="/images/avatar.jpg" 
                alt="Zhaoli Cao" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 relative z-10 border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container">
          <h2 className="section-title">Education</h2>
          
          <div className="space-y-12">
            <div className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-2xl font-semibold group-hover:text-white/90 transition-colors">The University of Hong Kong</h3>
                <span className="font-mono text-muted-foreground">2025.09 - 2027.06</span>
              </div>
              <div className="text-lg text-white/80 mb-4">Master of Finance in Financial Technology</div>
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="flex-1">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                    <li><span className="text-white/60">GPA:</span> 4.0/4.0</li>
                    <li><span className="text-white/60">Honors:</span> Vice President of the HKU Elite Club (Fintech)</li>
                  </ul>
                </div>
                <div className="shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" /> View Transcript
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-background/95 border-white/10">
                      <DialogTitle className="text-xl font-semibold">The University of Hong Kong</DialogTitle>
                      <DialogDescription>Master of Finance in Financial Technology - Official Transcript</DialogDescription>
                      <div className="mt-4">
                        <img 
                          src="/images/hku-transcript.jpg" 
                          alt="HKU Transcript" 
                          className="w-full rounded-lg border border-white/10"
                        />
                        <p className="text-xs text-muted-foreground mt-2 text-center">* Demo snapshot only</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-2xl font-semibold group-hover:text-white/90 transition-colors">Fudan University</h3>
                <span className="font-mono text-muted-foreground">2020.09 - 2025.06</span>
              </div>
              <div className="text-lg text-white/80 mb-4">Bachelor of Science in Mathematics (Minor: Economics & Finance)</div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                <li>
                  <span className="text-white/60">Honors:</span> First-Class Scholarship (2024), 
                  <span className="inline-flex items-center gap-1 ml-1 cursor-pointer hover:text-primary transition-colors" onClick={() => window.open('/wq-certificate.pdf', '_blank')}>
                    WorldQuant Gold Medal (2025) <ExternalLink className="w-3 h-3" />
                  </span>, 
                  IMC Prosperity3 Global Top 2% (2025)
                </li>
                <li><span className="text-white/60">Core Courses:</span> Mathematical Modeling, Numerical Solution of DE, Real Analysis, Financial Engineering, Econometrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          
          <div className="grid gap-8">
            {[
              {
                company: "Matrixport",
                role: "Quantitative Trader",
                period: "Hong Kong | Sep 2025 - Nov 2025",
                desc: [
                  "Conducted crypto microstructure research, focusing on L2 signal extraction and multi-frequency factor modeling.",
                  "Microstructure & Regime Detection: Based on L2 order book and funding rate data, extracted market microstructure features and employed a Hidden Markov Model to identify latent market states.",
                  "Multimodal Temporal Modeling: Optimized an end-to-end time-series modeling framework that integrates L2 order book data with NLP-based sentiment features."
                ],
                image: "/images/strategy-curve.png"
              },
              {
                company: "Geek Union Fund",
                role: "Quantitative Research",
                period: "Shanghai | Jun 2025 - Aug 2025",
                desc: [
                  "Responsible for factor mining on daily and hourly CTA data, as well as multi-window factor training and portfolio construction.",
                  "Factor Mining: Conducted daily/hourly CTA factor research via multi-window training, dynamic smoothing, and IC-return filtering to build a library of 80+ signals.",
                  "Operator Development: Refactored core signal modules, achieving ~77% runtime improvement via Numba JIT and pybind11-based C++ extensions."
                ],
                image: "/images/strategy-geek-union.jpg"
              },
              {
                company: "KR Capital",
                role: "Quantitative Research",
                period: "Shanghai | Jan 2025 - May 2025",
                desc: [
                  "Responsible for CTA strategy and stock strategy research, backtesting, and deployment in simulation and live trading.",
                  "Cross-Sectional Futures Alpha: Built minute-level multi-factor long-short strategies using roll yield, basis momentum, and other high-frequency features.",
                  "Global Regime Rotation: Developed momentum-based ETF rotation strategies for volatile, regime-switching markets."
                ]
              }
            ].map((job, index) => (
              <div key={index} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-background border border-white/40 rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{job.company}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{job.period}</span>
                </div>
                <div className="text-lg text-white/80 mb-4 font-medium">{job.role}</div>
                
                <div className="flex flex-col gap-4">
                  <ul className="space-y-3 text-muted-foreground">
                    {job.desc.map((item, i) => (
                      <li key={i} className="leading-relaxed text-sm md:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  {job.image && (
                    <div className="mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" /> View Strategy Demo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-background/95 border-white/10">
                          <DialogTitle className="text-xl font-semibold">Strategy Performance Demo</DialogTitle>
                          <DialogDescription>Historical performance visualization for demonstration purposes.</DialogDescription>
                          <div className="mt-4">
                            <img 
                              src={job.image} 
                              alt="Strategy Performance" 
                              className="w-full rounded-lg border border-white/10 bg-white/5"
                            />
                            <p className="text-xs text-muted-foreground mt-2 text-center">* Demo snapshot only. Not a complete project representation.</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-t border-white/5">
        <div className="container">
          <h2 className="section-title">Selected Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
                title: "Fake News Detection with NLP",
                role: "MIT Supervised Project",
                date: "Mar 2025 - May 2025",
                image: "/images/project-nlp.jpg",
                tags: ["NLP", "Deep Learning", "RoBERTa"],
                desc: "Integrated RoBERTa and XLNet models with uncertainty-based pseudo-labeling algorithm, achieving F1 score of 0.985.",
                link: "https://github.com/EricZhaoliCao/Fake-News-Detection-with-NLP"
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
            ].map((project, index) => (
              <Card 
                key={index} 
                className="bg-transparent border border-white/10 hover:border-white/30 transition-colors rounded-none overflow-hidden group cursor-pointer"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-bold leading-tight">{project.title}</CardTitle>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mb-4">{project.date}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Transcripts Section */}
      <section id="publications" className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Publications & Research</h2>
              <div className="space-y-6">
                <div className="p-6 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-white/40 group-hover:text-white transition-colors mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:underline decoration-1 underline-offset-4">
                        High-Frequency Statistical Arbitrage in Crypto Markets
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Research paper exploring cointegrated pairs via 5-min bars and dynamic-beta hedged Z-score signals.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <span>Working Paper</span>
                        <span>•</span>
                        <span>2025</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Placeholder for more publications */}
                <div className="p-6 border border-white/10 border-dashed flex items-center justify-center text-muted-foreground text-sm h-32">
                  More publications coming soon...
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title">Transcripts & Certificates</h2>
              <div className="space-y-4">
                {/* HKU Transcript - Download */}
                <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group" onClick={() => window.open('/Transcript.pdf', '_blank')}>
                  <span className="font-medium text-sm group-hover:text-white transition-colors">HKU Master of Finance Transcript</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* NLP Certificate - Download */}
                <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group" onClick={() => window.open('/nlp-paper.pdf', '_blank')}>
                  <span className="font-medium text-sm group-hover:text-white transition-colors">NLP Certificate</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* WorldQuant Certificate - Download */}
                <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group" onClick={() => window.open('/WorldQuantChallengeGoldCertificate.pdf', '_blank')}>
                  <span className="font-medium text-sm group-hover:text-white transition-colors">WorldQuant Challenge Gold Medal Certificate</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Optiver Certificate - Placeholder/Download */}
                <div className="flex items-center justify-between p-4 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group" onClick={() => window.open('/OptiverCertificate.pdf', '_blank')}>
                  <span className="font-medium text-sm group-hover:text-white transition-colors">Optiver - Trading at the Close Silver Medal</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="py-24 border-t border-white/5 bg-black">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-serif italic tracking-wide mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-xl font-light leading-relaxed">
              "Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever... It remembers little things, long after you have forgotten everything."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
            {[
              { src: "/images/photo-beijing.png", title: "Ink Wash Beijing", loc: "Beijing, 2025", desc: "Rain clearing up, painting the city in shades of Jiangnan ink." },
              { src: "/images/photo-oakhurst.png", title: "Morning Glow", loc: "Oakhurst, Feb 2025", desc: "Morning glow and morning flow." },
              { src: "/images/photo-shanghai.png", title: "Shanghai Snow", loc: "Shanghai, 2024", desc: "Snowflakes swaying like elves in the rare winter breeze." },
              { src: "/images/photo-westlake.png", title: "West Lake Dawn", loc: "Hangzhou, Nov 2023", desc: "Morning glow reflecting on the tranquil waters." },
              { src: "/images/photo-kennedy-1.jpg", title: "Kennedy Town Sunset", loc: "Hong Kong, 2024", desc: "Where the tram line ends and the ocean begins." },
              { src: "/images/photo-kennedy-2.jpg", title: "Harbor Lights", loc: "Hong Kong, 2024", desc: "Chasing the last ferry under the golden hour." }
            ].map((photo, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <div className="absolute inset-0 border-[12px] border-white/5 z-10 pointer-events-none transition-colors group-hover:border-white/10"></div>
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter sepia-[0.2] group-hover:sepia-0"
                  />
                </div>
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                  <h3 className="text-lg font-medium font-serif italic">{photo.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{photo.loc}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {photo.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © 2026 Zhaoli Cao. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="mailto:tsaochaoli@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
