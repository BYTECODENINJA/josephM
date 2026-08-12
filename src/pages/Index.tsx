import { type FormEvent, useEffect, useMemo, useState } from "react";
import resumePDF from "../assets/JOSEPH MULWA.pdf";
import {
  ArrowUpRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

import { AppMark } from "../components/AppMark";
import { Constellation } from "../components/Constellation";
import { ResumeModal } from "../components/ResumeModal";
import { HireModal } from "../components/HireModal";
import { Footer } from "../components/Footer";
import { Hero } from "../components/sections/Hero";
import { Manifesto } from "../components/sections/Manifesto";
import { Arsenal } from "../components/sections/Arsenal";
import { Experience } from "../components/sections/Experience";
import { TechJourney } from "../components/sections/TechJourney";
import { Philosophy } from "../components/sections/Philosophy";
import { Work } from "../components/sections/Work";
import { Contact } from "../components/sections/Contact";

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Tech Journey", id: "tech-journey" },
  { label: "Interests", id: "interests" },
  { label: "Projects", id: "projects" },
  { label: "Contacts", id: "contacts" },
];

const constellationDotsCount = 16;

type ProjectCategory = "Frontend" | "Backend" | "Fullstack";
type ContactForm = { name: string; email: string; subject: string; message: string };

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

const downloadResume = () => {
  // Use the imported PDF URL directly
  const link = document.createElement("a");
  link.href = resumePDF;
  link.download = "JOSEPH MULWA.pdf"; // desired filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

  const constellation = useMemo(() => constellationDotsCount, []);
  
  const scrollTo = (id: string) => {
    setMobileMenu(false);
    if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const updateContact = (key: keyof ContactForm, value: string) =>
    setContact((current) => ({
      ...current, [key]: value }));
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setContactSent(true); };

  return (
    <main className="site-shell">
      <div className={introComplete ? "intro-screen is-complete" : "intro-screen"} aria-hidden={introComplete}>
        <div className="intro-screen__grid" />
        <div className="intro-screen__stars"><Constellation /></div>
        <div className="intro-eagle">
          <span className="intro-eagle__wing intro-eagle__wing--left" />
          <span className="intro-eagle__body">◈</span>
          <span className="intro-eagle__wing intro-eagle__wing--right" />
        </div>
        <div className="intro-scroll"><span>JOSEPH MULWA</span>
          <small>ARCHITECT OF DIGITAL EXPERIENCES</small>
        </div>
        <div className="intro-screen__footer">
          <span>THE DIGITAL ARCHITECT</span>
          <span>INITIALIZING / {constellation} SIGNALS</span>
        </div>
      </div>

      <div className="progress-rail" aria-hidden="true">
        <span />
      </div>
      <div className="noise" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--left" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--right" aria-hidden="true" />

      <header className="site-header">
        <button className="brand-lockup" type="button" onClick={() => scrollTo("top")}
                aria-label="Back to top">
          <AppMark />
          <span>
            <strong>JOSEPH MULWA</strong>
            <small>THE DIGITAL ARCHITECT</small>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {sectionLinks.map(
            (link, index) => <
              button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
              <span>0{index + 1}</span>{link.label}
            </button>
          )}
        </nav>
        <button className="header-cta" type="button" onClick={() => setHireOpen(true)}>
          Hire me
          <ArrowUpRight size={15} />
        </button>
        <button className="mobile-menu-toggle" type="button" onClick={() =>
          setMobileMenu((open) => !open)} aria-label="Toggle navigation">
          {mobileMenu ?
            <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {mobileMenu &&
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {sectionLinks.map((link, index) =>
            <button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
              <span>0{index + 1}</span>
              {link.label}<ArrowUpRight size={15} />
            </button>
          )}
          <button type="button" className="mobile-nav__hire" onClick={() => {
            setMobileMenu(false); setHireOpen(true);
          }}>
            Start a conversation
            <Sparkles size={15} />
          </button>
        </nav>}

      <Hero scrollTo={scrollTo} setResumeOpen={setResumeOpen} downloadResume={downloadResume} />
      <Manifesto scrollTo={scrollTo} />
      <Arsenal constellation={constellation} />
      <Experience />
      <TechJourney />
      <Philosophy activeInterest={activeInterest} setActiveInterest={setActiveInterest} />
      <Work activeProjectCategory={activeProjectCategory} setActiveProjectCategory={setActiveProjectCategory} />
      <Contact contact={contact} updateContact={updateContact} handleContactSubmit={handleContactSubmit} contactSent={contactSent} />

      <Footer scrollTo={scrollTo} />

      <button className="floating-hire" type="button" onClick={() =>
        setHireOpen(true)}><span className="floating-hire__pulse" />
        <span>Hire me</span>
        <ArrowUpRight size={16} />
      </button>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      {hireOpen && <HireModal onClose={() => setHireOpen(false)} />}
    </main>
  );
};

export default Index;
