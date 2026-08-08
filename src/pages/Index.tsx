import { type FormEvent, useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Check,
  Code2,
  Compass,
  Database,
  Download,
  Github,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MoveDownRight,
  Music2,
  Orbit,
  Phone,
  Quote,
  Send,
  ServerCog,
  Sparkles,
  Twitter,
  X,
} from "lucide-react";

const REFERENCE_IMAGES = {
  blindfold: "/blindfold.jpg",
  philosophers: "/philosophers.jpg",
  mountain: "/mountain.jpg",
  future: "/future.jpg",
  thinker: "/thinker.jpeg",
  memento: "/memento.jpeg",
  goldenCode: "/goldencode.jpg",
  history: "/history.jpeg",
  social: "/social.jpg",
} as const;

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Tech Journey", id: "tech-journey" },
  { label: "Interests", id: "interests" },
  { label: "Projects", id: "projects" },
  { label: "Contacts", id: "contacts" },
];

const skillGroups = [
  {
    label: "01 / Core syntax",
    title: "Languages",
    icon: Code2,
    skills: ["TypeScript", "JavaScript", "Python"],
    accent: "blue",
  },
  {
    label: "02 / Delivery",
    title: "DevOps & tools",
    icon: Layers3,
    skills: ["Docker", "Git", "GitHub"],
    accent: "gold",
  },
  {
    label: "03 / Persistence",
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "Postgres", "MySQL"],
    accent: "violet",
  },
  {
    label: "04 / Composition",
    title: "Frameworks",
    icon: ServerCog,
    skills: ["React", "NestJS", "Next.js", "Express", "Node.js"],
    accent: "patina",
  },
] as const;

const techJourney = [
  { number: "01", era: "THE FIRST COMMIT", title: "Learning the language", text: "Started with the fundamentals: syntax, structure, and the patience to understand what the machine was really saying." },
  { number: "02", era: "THE INTERFACE", title: "Making systems human", text: "Moved from writing code to shaping experiences — where clarity, hierarchy, and motion turn software into something people can trust." },
  { number: "03", era: "THE FULL STACK", title: "Thinking in connections", text: "Connected frontends to APIs, data, deployments, and the quiet engineering that makes a product feel effortless." },
  { number: "04", era: "THE NEXT HORIZON", title: "Building with intent", text: "Now exploring AI-native products, realtime systems, and digital spaces that remain useful long after the novelty fades." },
] as const;

type ProjectCategory = "Frontend" | "Backend" | "Fullstack";
const projectCategories: readonly ProjectCategory[] = ["Frontend", "Backend", "Fullstack"];

const projects = [
  {
    index: "01",
    category: "Frontend" as ProjectCategory,
    focus: "AI / Product",
    title: "Axiom\nIntelligence",
    description: "A calm, high-signal operating layer for teams making decisions in motion.",
    image: REFERENCE_IMAGES.future,
    accent: "blue",
    tags: ["React", "AI systems", "Realtime"],
    github: "https://github.com/josephmulwa/axiom-intelligence",
    livePreview: "https://axiom-intelligence.vercel.app",
  },
  {
    index: "02",
    category: "Backend" as ProjectCategory,
    focus: "Fintech / APIs",
    title: "The\nLedger",
    description: "A wealth interface that turns complex financial behavior into a daily ritual.",
    image: REFERENCE_IMAGES.goldenCode,
    accent: "gold",
    tags: ["TypeScript", "Node.js", "Postgres"],
    github: "https://github.com/josephmulwa/the-ledger",
    livePreview: undefined,
  },
  {
    index: "03",
    category: "Fullstack" as ProjectCategory,
    focus: "Culture / Editorial",
    title: "Memento\nMori",
    description: "A digital archive for the questions that outlive their answers.",
    image: REFERENCE_IMAGES.memento,
    accent: "violet",
    tags: ["Next.js", "Motion", "Editorial"],
    github: "https://github.com/josephmulwa/memento-mori",
    livePreview: "https://memento-mori.vercel.app",
  },
] as const;

const interests = [
  { title: "Artificial intelligence", principle: "Amor fati — work with what is", icon: Bot },
  { title: "Philosophy", principle: "The obstacle becomes the way", icon: BookOpen },
  { title: "Chess", principle: "See the board before the move", icon: Brain },
  { title: "Music & sound", principle: "Rhythm makes a system memorable", icon: Music2 },
  { title: "Architecture", principle: "Form follows the human need", icon: Compass },
  { title: "Game worlds", principle: "Play is a serious way of knowing", icon: Orbit },
];

const constellationDots = [
  [7, 20, 0.3], [15, 62, 1.2], [22, 33, 2.1], [30, 14, 0.8], [39, 48, 2.7], [48, 22, 1.5],
  [56, 74, 0.1], [64, 37, 2.3], [72, 15, 1.8], [81, 54, 0.5], [90, 29, 2.8], [95, 70, 1.1],
  [12, 88, 2.4], [44, 91, 0.9], [68, 87, 1.6], [84, 80, 2.2],
] as const;

type HireType = "project" | "startup" | "employment";
type ContactForm = { name: string; email: string; subject: string; message: string };
type HireForm = {
  name: string;
  email: string;
  contact: string;
  company: string;
  role: string;
  detail: string;
  timeline: string;
  description: string;
};

const emptyHireForm: HireForm = {
  name: "",
  email: "",
  contact: "",
  company: "",
  role: "",
  detail: "",
  timeline: "",
  description: "",
};

function useCinematicSignals() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        root.style.setProperty("--scroll-progress", progress.toFixed(3));

        if (prefersReducedMotion) return;
        parallaxTargets.forEach((target) => {
          const rect = target.getBoundingClientRect();
          const viewportOffset = (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / window.innerHeight;
          const strengthX = Number(target.dataset.parallaxX ?? "0");
          const strengthY = Number(target.dataset.parallaxY ?? "0");
          const strengthRotate = Number(target.dataset.parallaxRotate ?? "0");
          target.style.setProperty("--parallax-x", `${viewportOffset * strengthX}px`);
          target.style.setProperty("--parallax-y", `${viewportOffset * strengthY}px`);
          target.style.setProperty("--parallax-rotate", `${viewportOffset * strengthRotate}deg`);
        });
      });
    };
    const updatePointer = (event: PointerEvent) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;
      root.style.setProperty("--mouse-x", `${(event.clientX / window.innerWidth - 0.5) * 2}`);
      root.style.setProperty("--mouse-y", `${(event.clientY / window.innerHeight - 0.5) * 2}`);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function AppMark() {
  return (
    <span className="app-mark" aria-hidden="true">
      <span className="app-mark__ring" />
      <span className="app-mark__core">JM</span>
    </span>
  );
}

function Constellation() {
  return (
    <div className="constellation" aria-hidden="true">
      <div className="constellation__line constellation__line--one" />
      <div className="constellation__line constellation__line--two" />
      {constellationDots.map(([left, top, delay]) => (
        <span
          className="constellation__dot"
          key={`${left}-${top}`}
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

function SectionEyebrow({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow__number">{number}</span>
      <span className="section-eyebrow__line" />
      <span>{children}</span>
    </div>
  );
}

function ModalShell({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-shell" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-shell__topline">
          <span className="micro-label">{eyebrow}</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        <h2 className="modal-shell__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell title="The digital resume" eyebrow="Archive / JM-2026" onClose={onClose}>
      <div className="resume-paper">
        <div className="resume-paper__header">
          <div><span className="micro-label">Joseph Mulwa</span><h3>Full-stack developer<br /><em>architect of digital experiences.</em></h3></div>
          <span className="resume-paper__seal"><BadgeCheck size={30} /><small>JM / 26</small></span>
        </div>
        <div className="resume-paper__grid">
          <div><span className="micro-label">Current thesis</span><p>Technology should feel inevitable in the hand: clear, human, quietly powerful.</p></div>
          <div><span className="micro-label">Working range</span><p>Product systems · Web applications · AI interfaces · Technical direction</p></div>
        </div>
        <div className="resume-paper__rule" />
        <div className="resume-paper__footer"><span>Based in Nairobi, Kenya</span><span>Available for select collaborations</span></div>
      </div>
      <div className="modal-actions"><a className="button button--gold" href="mailto:joseph@example.com?subject=Resume request" onClick={onClose}>Request a conversation <ArrowUpRight size={16} /></a><button className="button button--quiet" type="button" onClick={onClose}>Close</button></div>
    </ModalShell>
  );
}

function HireModal({ onClose }: { onClose: () => void }) {
  const [hireType, setHireType] = useState<HireType>("project");
  const [form, setForm] = useState<HireForm>(emptyHireForm);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const skillOptions = ["React", "AI / ML", "Backend", "Product design", "Cloud", "Technical strategy"];
  const typeCopy: Record<HireType, { label: string; detail: string; field: string }> = {
    project: { label: "Project based", detail: "A focused build with a clear finish line.", field: "Project type" },
    startup: { label: "Startup", detail: "A trusted technical partner for the zero-to-one.", field: "Startup stage" },
    employment: { label: "Long-term", detail: "A durable role inside an ambitious team.", field: "Role hiring for" },
  };
  const update = (key: keyof HireForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toggleSkill = (skill: string) => setSelectedSkills((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <ModalShell title="Make a pact" eyebrow="Open brief / JM-2026" onClose={onClose}>
      {sent ? (
        <div className="success-state"><div className="success-state__icon"><Check size={28} /></div><span className="micro-label">Signal received</span><h3>The first move is yours.</h3><p>Your brief is staged. I’ll get back to you within two working days with a considered next step.</p><button className="button button--gold" type="button" onClick={onClose}>Return to the temple <ArrowUpRight size={16} /></button></div>
      ) : (
        <>
          <div className="hire-tabs" role="tablist" aria-label="Hiring route">
            {(Object.keys(typeCopy) as HireType[]).map((type) => <button type="button" role="tab" aria-selected={hireType === type} className={hireType === type ? "hire-tab is-active" : "hire-tab"} key={type} onClick={() => setHireType(type)}><span>{typeCopy[type].label}</span><small>{type === "project" ? "01" : type === "startup" ? "02" : "03"}</small></button>)}
          </div>
          <p className="hire-intro">{typeCopy[hireType].detail}</p>
          <form className="hire-form" onSubmit={handleSubmit}>
            <div className="form-grid form-grid--two"><label><span>Name</span><input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" /></label><label><span>Email</span><input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" /></label></div>
            <div className="form-grid form-grid--two"><label><span>Contact</span><input value={form.contact} onChange={(event) => update("contact", event.target.value)} placeholder="Phone or preferred channel" /></label><label><span>Company</span><input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company name" /></label></div>
            <div className="form-grid form-grid--two"><label><span>Your role</span><input value={form.role} onChange={(event) => update("role", event.target.value)} placeholder="Founder, product lead..." /></label><label><span>{typeCopy[hireType].field}</span><select required value={form.detail} onChange={(event) => update("detail", event.target.value)}><option value="">Select one</option>{hireType === "project" && <><option>Product build</option><option>AI experience</option><option>Platform / API</option></>}{hireType === "startup" && <><option>Idea</option><option>MVP</option><option>Growth</option><option>Scale</option></>}{hireType === "employment" && <><option>Technical lead</option><option>Senior engineer</option><option>Product engineer</option></>}</select></label></div>
            <div className="form-grid form-grid--two"><label><span>Timeline</span><select value={form.timeline} onChange={(event) => update("timeline", event.target.value)}><option value="">Select a pace</option><option>2–4 weeks</option><option>1–3 months</option><option>Ongoing</option></select></label><label><span>Budget range</span><select value={form.detail === "" ? "" : undefined} onChange={() => undefined} disabled={hireType === "employment"}><option>{hireType === "employment" ? "Discussed together" : "KSh 250k — 500k+"}</option><option>KSh 100k — 250k</option><option>KSh 500k — 1M+</option></select></label></div>
            <label><span>What are we making?</span><textarea required value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Give me the context, the tension, and what success looks like." rows={4} /></label>
            <div className="tag-picker"><span>Required skills</span><div>{skillOptions.map((skill) => <button key={skill} type="button" className={selectedSkills.includes(skill) ? "tag is-selected" : "tag"} onClick={() => toggleSkill(skill)}>{selectedSkills.includes(skill) && <Check size={12} />}{skill}</button>)}</div></div>
            <button className="button button--gold button--full" type="submit">Send the brief <Send size={16} /></button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

const downloadResume = () => {
  const pdf = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 212 >>\nstream\nBT\n/F1 22 Tf\n72 700 Td\n(Joseph Mulwa) Tj\n/F1 12 Tf\n0 -28 Td\n(Full-stack developer | Architect of digital experiences) Tj\n0 -42 Td\n(React, TypeScript, Node.js, product systems, AI interfaces) Tj\n0 -24 Td\n(Nairobi, Kenya | joseph@example.com) Tj\nET\nendstream\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "joseph-mulwa-resume.pdf";
  link.click();
  URL.revokeObjectURL(url);
};

const Index = () => {
  useCinematicSignals();
  const [introComplete, setIntroComplete] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const [contact, setContact] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [activeInterest, setActiveInterest] = useState(0);
  const [activeProjectCategory, setActiveProjectCategory] = useState<ProjectCategory>("Frontend");

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const constellation = useMemo(() => constellationDots.length, []);
  const visibleProjects = projects.filter((project) => project.category === activeProjectCategory);
  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const updateContact = (key: keyof ContactForm, value: string) => setContact((current) => ({ ...current, [key]: value }));
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setContactSent(true); };

  return (
    <main className="site-shell">
      <div className={introComplete ? "intro-screen is-complete" : "intro-screen"} aria-hidden={introComplete}>
        <div className="intro-screen__grid" />
        <div className="intro-screen__stars"><Constellation /></div>
        <div className="intro-eagle"><span className="intro-eagle__wing intro-eagle__wing--left" /><span className="intro-eagle__body">◈</span><span className="intro-eagle__wing intro-eagle__wing--right" /></div>
        <div className="intro-scroll"><span>JOSEPH MULWA</span><small>ARCHITECT OF DIGITAL EXPERIENCES</small></div>
        <div className="intro-screen__footer"><span>THE DIGITAL TEMPLE</span><span>INITIALIZING / {constellation} SIGNALS</span></div>
      </div>

      <div className="progress-rail" aria-hidden="true"><span /></div>
      <div className="noise" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--left" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--right" aria-hidden="true" />

      <header className="site-header">
        <button className="brand-lockup" type="button" onClick={() => scrollTo("top")} aria-label="Back to top"><AppMark /><span><strong>JOSEPH MULWA</strong><small>THE DIGITAL TEMPLE</small></span></button>
        <nav className="desktop-nav" aria-label="Primary navigation">{sectionLinks.map((link, index) => <button key={link.id} type="button" onClick={() => scrollTo(link.id)}><span>0{index + 1}</span>{link.label}</button>)}</nav>
        <button className="header-cta" type="button" onClick={() => setHireOpen(true)}>Hire me <ArrowUpRight size={15} /></button>
        <button className="mobile-menu-toggle" type="button" onClick={() => setMobileMenu((open) => !open)} aria-label="Toggle navigation">{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button>
      </header>
      {mobileMenu && <nav className="mobile-nav" aria-label="Mobile navigation">{sectionLinks.map((link, index) => <button key={link.id} type="button" onClick={() => scrollTo(link.id)}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={15} /></button>)}<button type="button" className="mobile-nav__hire" onClick={() => { setMobileMenu(false); setHireOpen(true); }}>Start a conversation <Sparkles size={15} /></button></nav>}

      <section className="hero section" id="top">
        <Constellation />
        <div className="hero__architecture hero__architecture--left" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero__architecture hero__architecture--right" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero__meta hero__meta--top parallax-target" data-parallax data-parallax-x="16" data-parallax-y="-10"><span>EST.  / NAIROBI</span><span>SCROLL TO ENTER <ArrowDown size={14} /></span></div>
        <div className="hero__content parallax-target" data-parallax data-parallax-x="-14" data-parallax-y="10">
          <div className="hero__overline reveal reveal--up" data-reveal><span className="status-dot" /><span>FULL-STACK DEVELOPER</span><span className="hero__overline-divider">/</span><span>BUILDER OF WORLDS</span></div>
          <h1 className="hero__title reveal reveal--up" data-reveal><span className="hero__title-line">Joseph</span><span className="hero__title-line hero__title-line--offset">Mulwa<span className="hero__title-mark">✦</span></span></h1>
          <div className="hero__bottom reveal reveal--up" data-reveal>
            <p className="hero__statement">Building the future,<br /><em>one line of code at a time.</em></p>
            <div className="hero__actions"><button className="button button--gold" type="button" onClick={() => setResumeOpen(true)}>View resume <ArrowUpRight size={16} /></button><button className="text-button" type="button" onClick={downloadResume}>Download PDF <Download size={15} /></button></div>
          </div>
        </div>
        <div className="hero__quote parallax-target" data-parallax data-parallax-x="22" data-parallax-y="-18" data-parallax-rotate="-1.5"><Quote size={24} /><span>“The impediment to action advances action.”</span><small>— Marcus Aurelius</small></div>
        <button className="scroll-cue" type="button" onClick={() => scrollTo("about")} aria-label="Scroll to about section"><span className="scroll-cue__circle"><ArrowDown size={16} /></span><span>Begin the descent</span></button>
      </section>

      <section className="manifesto section section--light" id="about">
        <div className="section-frame"><SectionEyebrow number="01" children="THE THESIS" />
          <div className="manifesto__layout parallax-target" data-parallax data-parallax-x="-10" data-parallax-y="16">
            <div className="manifesto__visual reveal reveal--left" data-reveal><div className="portrait-frame"><img src={REFERENCE_IMAGES.blindfold} alt="Marble sculpture with red blindfold" /><div className="portrait-frame__scan" /><span className="portrait-frame__label">FIG. 01 / SEE BEYOND</span><span className="portrait-frame__corner portrait-frame__corner--one" /><span className="portrait-frame__corner portrait-frame__corner--two" /></div><div className="manifesto__stamp">MEMENTO<br /><em>BUILD</em></div></div>
            <div className="manifesto__copy reveal reveal--right" data-reveal><span className="micro-label">A brief introduction</span><h2>I build at the edge of <em>clarity</em>.</h2><p className="lede">The best digital products do not ask for attention. They earn it. I’m Joseph — a full-stack developer who turns ambitious ideas into useful, expressive systems.</p><p>I work across product, engineering, and the space between them: translating a sharp question into an interface people can trust, then giving it the architecture to grow.</p><button className="text-button text-button--dark" type="button" onClick={() => scrollTo("projects")}>See selected work <ArrowUpRight size={15} /></button>
              <div className="stats-row"><div><strong>2</strong><span>Years into Modeling the skill</span></div><div><strong>22</strong><span>Complete Github repositories</span></div><div><strong>∞</strong><span>Questions remaining</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="arsenal section" id="skills">
        <div className="section-frame"><SectionEyebrow number="02" children="THE SKILLS" />
          <div className="section-heading reveal reveal--up parallax-target" data-reveal data-parallax data-parallax-x="10" data-parallax-y="-12"><div><h2>Tools for the <em>unknown.</em></h2></div><p>I choose technology the way a craftsperson chooses a tool: for the problem in front of us, not the trend behind us.</p></div>
          <div className="skill-grid parallax-target" data-parallax data-parallax-x="-8" data-parallax-y="14">{skillGroups.map((group, index) => { const Icon = group.icon; return <article className={`skill-card skill-card--${group.accent} reveal reveal--up`} data-reveal key={group.title} style={{ transitionDelay: `${index * 80}ms` } as CSSProperties}><div className="skill-card__top"><span>{group.label}</span><Icon size={18} /></div><div className="skill-card__icon"><Icon size={30} strokeWidth={1.2} /></div><h3>{group.title}</h3><div className="skill-card__skills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="skill-card__footer"><span>Depth / {index === 0 ? "01" : index === 1 ? "02" : index === 2 ? "03" : "04"}</span><MoveDownRight size={16} /></div></article>; })}</div>
          <div className="arsenal__footer"><span className="arsenal__orbit"><span /><span /><span /></span><p>Good systems leave room<br />for <em>better questions.</em></p><span className="micro-label">{constellation} signals / still learning</span></div>
        </div>
      </section>

      <section className="experience section section--marble" id="experience">
        <div className="section-frame"><SectionEyebrow number="03" children="EXPERIENCE" /><div className="section-heading section-heading--dark reveal reveal--up" data-reveal><h2>Built in public.<br /><em>Refined in private.</em></h2><p>A trail of product thinking, technical range, and the occasional beautiful constraint.</p></div>
          <div className="timeline parallax-target" data-parallax data-parallax-x="8" data-parallax-y="-12"><article className="timeline-entry reveal reveal--left" data-reveal><div className="timeline-entry__year">2024—NOW</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">Independent / Nairobi</span><h3>Product engineer &amp; technical partner</h3><p>Helping founders move from “what if” to “here it is” — with systems that feel as considered as the idea.</p><div className="timeline-entry__tags"><span>Strategy</span><span>Architecture</span><span>Shipping</span></div></div></article><article className="timeline-entry reveal reveal--right" data-reveal><div className="timeline-entry__year">2021—24</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">Digital studio / Remote</span><h3>Full-stack developer</h3><p>Built platforms and product surfaces for teams working across commerce, culture, and emerging technology.</p><div className="timeline-entry__tags"><span>React</span><span>Node.js</span><span>Cloud</span></div></div></article><article className="timeline-entry reveal reveal--left" data-reveal><div className="timeline-entry__year">2018—21</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">The first commit</span><h3>Curiosity became a discipline</h3><p>Started with interfaces, stayed for the systems underneath them. Never stopped asking why.</p><div className="timeline-entry__tags"><span>Web</span><span>Design</span><span>Learning</span></div></div></article></div>
        </div>
      </section>

      <section className="tech-journey section" id="tech-journey">
        <div className="section-frame"><SectionEyebrow number="04" children="TECH JOURNEY" /><div className="section-heading reveal reveal--up" data-reveal><h2>From syntax<br /><em>to systems.</em></h2><p>A living route through the tools, instincts, and questions that shape how I build.</p></div><div className="journey-rail parallax-target" data-parallax data-parallax-x="-12" data-parallax-y="18">{techJourney.map((step) => <article className="journey-step reveal reveal--up" data-reveal key={step.number}><div className="journey-step__number">{step.number}</div><div className="journey-step__signal"><span /></div><div className="journey-step__body"><span className="micro-label">{step.era}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></div>
      </section>

      <section className="philosophy section" id="interests">
        <div className="section-frame"><SectionEyebrow number="05" children="INTERESTS" /><div className="philosophy__layout parallax-target" data-parallax data-parallax-x="12" data-parallax-y="-14"><div className="philosophy__intro reveal reveal--left" data-reveal><span className="micro-label">Beyond the deliverable</span><h2>What I’m <em>drawn</em> to.</h2><p>Interests are not a sidebar. They are the raw material. The way I think about a product is shaped by the way I move through the world.</p><div className="philosophy__quote"><Quote size={18} /><p>“Waste no more time arguing what a good person should be. Be one.”</p><span>Marcus Aurelius</span></div></div><div className="interest-grid reveal reveal--right" data-reveal>{interests.map((interest, index) => { const Icon = interest.icon; return <button type="button" className={activeInterest === index ? "interest-card is-active" : "interest-card"} key={interest.title} onMouseEnter={() => setActiveInterest(index)} onFocus={() => setActiveInterest(index)} onClick={() => setActiveInterest(index)}><span className="interest-card__number">0{index + 1}</span><Icon size={20} /><strong>{interest.title}</strong><small>{interest.principle}</small><ArrowUpRight size={15} /></button>; })}</div></div><div className="philosophy__image parallax-target" data-parallax data-parallax-x="-16" data-parallax-y="12"><img src={activeInterest % 2 === 0 ? REFERENCE_IMAGES.thinker : REFERENCE_IMAGES.philosophers} alt="Classical sculpture reimagined with technology" /><div className="philosophy__image-overlay"><span>STILL / MOVING</span><span>STATE {String(activeInterest + 1).padStart(2, "0")}</span></div></div></div>
      </section>

      <section className="work section section--light" id="projects">
        <div className="section-frame"><SectionEyebrow number="06" children="PROJECTS" /><div className="section-heading reveal reveal--up" data-reveal><h2>Proof of <em>practice.</em></h2><p>Choose a discipline to explore the work behind the systems.</p></div><div className="project-filters" role="tablist" aria-label="Project categories">{projectCategories.map((category, index) => { const isActive = activeProjectCategory === category; return <button className={isActive ? "project-filter is-active" : "project-filter"} type="button" role="tab" aria-selected={isActive} aria-controls={`project-panel-${category.toLowerCase()}`} id={`project-filter-${category.toLowerCase()}`} key={category} onClick={() => setActiveProjectCategory(category)}><span>0{index + 1}</span>{category}<ArrowUpRight size={14} /></button>; })}</div><div className="project-stack parallax-target" data-parallax data-parallax-x="9" data-parallax-y="-16"><section className={`project-category project-category--${activeProjectCategory.toLowerCase()}`} id={`project-panel-${activeProjectCategory.toLowerCase()}`} role="tabpanel" aria-labelledby={`project-filter-${activeProjectCategory.toLowerCase()}`}><div className="project-category__header"><span className="project-category__index">0{projectCategories.indexOf(activeProjectCategory) + 1}</span><div><span className="micro-label">Selected discipline</span><h3>{activeProjectCategory}</h3></div><span className="project-category__count">{String(visibleProjects.length).padStart(2, "0")} {visibleProjects.length === 1 ? "study" : "studies"}</span></div><div className="project-category__cards">{visibleProjects.map((project, index) => <article className={`project-card project-card--${project.accent} reveal reveal--up`} data-reveal key={project.index} style={{ transitionDelay: `${index * 100}ms` } as CSSProperties}><div className="project-card__image"><img src={project.image} alt="" /><div className="project-card__veil" /></div><div className="project-card__top"><span>{project.index} / {project.focus}</span></div><div className="project-card__body"><h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{project.description}</p><div className="project-card__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-card__bottom"><span>Project links</span><div className="project-card__links"><a className="project-card__link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title.replace("\n", " ")} on GitHub`}><Github size={15} /><span>GitHub</span></a>{project.livePreview ? <a className="project-card__link" href={project.livePreview} target="_blank" rel="noreferrer" aria-label={`Open live preview of ${project.title.replace("\n", " ")}`}><Globe2 size={15} /><span>Live preview</span></a> : null}</div></div></article>)}</div></section></div></div>
      </section>

      <section className="contact section" id="contacts">
        <Constellation /><div className="section-frame"><SectionEyebrow number="07" children="CONTACTS" /><div className="contact__layout parallax-target" data-parallax data-parallax-x="-10" data-parallax-y="12"><div className="contact__intro reveal reveal--left" data-reveal><span className="micro-label">Have a worthy question?</span><h2>Let’s make<br /><em>something inevitable.</em></h2><p>Tell me what you’re building, what’s in the way, and why now. I’ll meet you there.</p><div className="contact__direct"><a href="mailto:joseph@example.com"><Mail size={16} /> joseph@example.com</a><a href="tel:+254700000000"><Phone size={16} /> +254 700 000 000</a></div><div className="contact__seal"><span>NAI</span><span>01</span><span>26</span></div></div><div className="contact__form-wrap reveal reveal--right" data-reveal>{contactSent ? <div className="success-state success-state--contact"><div className="success-state__icon"><Check size={28} /></div><span className="micro-label">Message received</span><h3>Consider it in motion.</h3><p>Thank you for the signal. I’ll be in touch soon.</p><button type="button" className="text-button" onClick={() => setContactSent(false)}>Send another <ArrowUpRight size={15} /></button></div> : <form className="contact-form" onSubmit={handleContactSubmit}><label><span>01 / Your name</span><input required value={contact.name} onChange={(event) => updateContact("name", event.target.value)} placeholder="How should I address you?" /></label><label><span>02 / Email</span><input required type="email" value={contact.email} onChange={(event) => updateContact("email", event.target.value)} placeholder="you@company.com" /></label><label><span>03 / Subject</span><input required value={contact.subject} onChange={(event) => updateContact("subject", event.target.value)} placeholder="The question worth asking" /></label><label><span>04 / Message</span><textarea required rows={4} value={contact.message} onChange={(event) => updateContact("message", event.target.value)} placeholder="A little context goes a long way." /></label><button type="submit" className="button button--gold">Send message <Send size={16} /></button></form>}</div></div></div>
      </section>

      <footer className="site-footer"><div className="site-footer__top"><div className="footer-brand"><AppMark /><span><strong>JOSEPH MULWA</strong><small>THE DIGITAL TEMPLE</small></span></div><p>Useful things for<br /><em>the long now.</em></p><button type="button" className="footer-up" onClick={() => scrollTo("top")} aria-label="Back to top"><ArrowDown size={16} /></button></div><div className="site-footer__bottom"><span>© 2026 Joseph Mulwa</span><div className="footer-links"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={16} /></a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a></div><span>Made with intent / NBO</span></div></footer>

      <button className="floating-hire" type="button" onClick={() => setHireOpen(true)}><span className="floating-hire__pulse" /><span>Hire me</span><ArrowUpRight size={16} /></button>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      {hireOpen && <HireModal onClose={() => setHireOpen(false)} />}
    </main>
  );
};

export default Index;
