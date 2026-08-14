import { useState, useEffect, useRef } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  Gaming: "/Gaming.png",
  Prologue: "/K-Tech.png",
  Portfilio: "/WindowsPortfolio.png",
  RealEstate: "/RealEstate.png",
  Fintech: "/FIntech.png",
  VibeCodingToolkit: "/AIToolKit.jpeg",
  PulseBand: "/PulseBand.png",
  Nexivent: "/Nexivent.png",
  CustomMcp: "/custommcp.jpeg",
  goldenCode: "/goldencode.jpg",
  memento: "/memento.jpeg",
} as const;

type ProjectCategory = "Frontend" | "Backend" | "Fullstack" | "Tools";
const projectCategories: readonly ProjectCategory[] = ["Frontend", "Backend", "Fullstack", "Tools"];

const projects = [
  {
    index: "01",
    category: "Frontend" as ProjectCategory,
    focus: "AI / Product",
    title: "Forza\nHorizon",
    description: "A gaming pre-release website that reimagines the future of gaming.",
    image: REFERENCE_IMAGES.Gaming,
    accent: "blue",
    tags: ["React", "GSAP", "JavaScript", "Vite"],
    github: "https://github.com/BYTECODENINJA/gamingwebsite",
    livePreview: "https://gaminglandingpage.vercel.app",
  },
  {
    index: "02",
    category: "Frontend" as ProjectCategory,
    focus: "Visual Design",
    title: "K-Tech\nPrologue",
    description: "A digital company profile website for a tech startup.",
    image: REFERENCE_IMAGES.Prologue,
    accent: "gold",
    tags: ["React", "Tailwind", "JavaScript"],
    github: "https://github.com/BYTECODENINJA/K-Tech",
    livePreview: "https://k-tech-six.vercel.app",
  },
  {
    index: "03",
    category: "Frontend" as ProjectCategory,
    focus: "Creative Coding",
    title: "Windows\nPortfolio",
    description: "A windows-like portfolio website that uses WebGL to render the canvas.",
    image: REFERENCE_IMAGES.Portfilio,
    accent: "violet",
    tags: ["Nextjs", "Typescript", "React"],
    github: "https://github.com/BYTECODENINJA/WindowsPortfolio",
    livePreview: "https://windows-portfolio-ruby.vercel.app",
  },
  {
    index: "04",
    category: "Backend" as ProjectCategory,
    focus: "Event Driven Architecture / Micro-Services",
    title: "Nexivent\nTickets",
    description: "An event ticketing system that uses Kafka for event streaming and PostgreSQL for data storage.",
    image: REFERENCE_IMAGES.Nexivent,
    accent: "gold",
    tags: ["Nestjs", "Kafka", "Postgres", "Redis", "TypeScript"],
    github: "https://github.com/BYTECODENINJA/Nexivent",
    livePreview: "",
  },
  {
    index: "05",
    category: "Fullstack" as ProjectCategory,
    focus: "RealEstate / APIs",
    title: "Rento\nSearch",
    description: "A rentals searching website for kenyan property owners and seekers.",
    image: REFERENCE_IMAGES.RealEstate,
    accent: "gold",
    tags: ["TypeScript", "Convex", "React", "GSAP"],
    github: "",
    livePreview: "https://rentosearch.co.ke",
  },
  {
    index: "06",
    category: "Fullstack" as ProjectCategory,
    focus: "Fintech / Banking",
    title: "Expense\nTracker",
    description: "A crud application for managing expenses and tracking savings.",
    image: REFERENCE_IMAGES.Fintech,
    accent: "violet",
    tags: ["Next.js", "MongoDb", "Gen AI", "TypeScript", "React"],
    github: "https://github.com",
    livePreview: "https://vercel.app",
  },
  {
    index: "07",
    category: "Frontend" as ProjectCategory,
    focus: "HTML BASICS / FLEXBOX / CSS",
    title: "Pulse\nBand",
    description: "A landing page for a medical smartband company.",
    image: REFERENCE_IMAGES.PulseBand,
    accent: "blue",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/BYTECODENINJA/pulseband",
    livePreview: "https://bytecodeninja.github.io/pulseband/",
  },
  {
    index: "08",
    category: "Tools" as ProjectCategory,
    focus: "Spec driven development",
    title: "Vibe Coding\nToolkit",
    description: "A collection of md files explaining how to setup AI prompts before asking AI to write code.",
    image: REFERENCE_IMAGES.VibeCodingToolkit,
    accent: "blue",
    tags: ["Prompt Eng", "Agentic", "Specs", "AI Code"],
    github: "https://github.com",
    livePreview: "",
  },
  {
    index: "09",
    category: "Tools" as ProjectCategory,
    focus: "AI / MCPs",
    title: "Custom MCP\nTool",
    description: "Just a custom tryout while trying to understand how MCPs work.",
    image: REFERENCE_IMAGES.CustomMcp,
    accent: "gold",
    tags: ["Prompt Eng", "Agentic", "Specs", "AI Code"],
    github: "https://github.com",
    livePreview: "",
  }
] as const;

interface WorkProps {
  activeProjectCategory: ProjectCategory;
  setActiveProjectCategory: (category: ProjectCategory) => void;
}

export function Work({ activeProjectCategory, setActiveProjectCategory }: WorkProps) {
  const visibleProjects = projects.filter((project) => project.category === activeProjectCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeProjectCategory]);

  const nextProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % visibleProjects.length);
    scrollToActiveTile();
  };

  const prevProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length);
    scrollToActiveTile();
  };

  const handleTileClick = (targetIndex: string) => {
    const foundIndex = visibleProjects.findIndex((p) => p.index === targetIndex);
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      scrollToActiveTile();
    }
  };

  const scrollToActiveTile = () => {
    setTimeout(() => {
      const activeTile = document.querySelector(`[data-index="${visibleProjects[currentIndex]?.index}"]`);
      if (activeTile && scrollContainerRef.current) {
        activeTile.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 50);
  };

  const activeProject = visibleProjects[currentIndex];

  if (visibleProjects.length === 0 || !activeProject) {
    return (
      <section className="work section section--light" id="projects" style={{ background: "#0a0a0f", color: "#ffffff" }}>
        <div className="section-frame">
          <SectionEyebrow number="06" children="SELECTED WORK" />
          <div className="section-heading reveal reveal--up" style={{ color: "#ffffff", border: "none" }}>
            <h2>Proof of <em>concept.</em></h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              A collection of tools and interfaces that prioritize utility, clarity, and the long now.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "5rem 0", color: "rgba(255,255,255,0.3)", font: "14px 'DM Mono', monospace" }}>
            No projects found under this section.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="work section section--light" id="projects" style={{ background: "#0a0a0f", color: "#ffffff" }}>
      <div className="section-frame">
        <SectionEyebrow number="06" children="SELECTED WORK" />

        <div className="section-heading reveal reveal--up" style={{ color: "#ffffff", border: "none" }}>
          <h2>Proof of <em>concept.</em></h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            A collection of tools and interfaces that prioritize utility, clarity, and the long now.
          </p>
        </div>

        {/* Filters */}
        <div className="project-filters" style={{ borderColor: "rgba(255,255,255,0.1)", marginBottom: "40px" }}>
          {projectCategories.map((category, idx) => (
            <button
              key={category}
              type="button"
              className={activeProjectCategory === category ? "project-filter is-active" : "project-filter"}
              style={{
                color: activeProjectCategory === category ? "#0a0a0f" : "rgba(255,255,255,0.6)",
                borderColor: "rgba(255,255,255,0.15)",
                backgroundColor: activeProjectCategory === category ? "#c9a84c" : "transparent"
              }}
              onClick={() => setActiveProjectCategory(category)}
            >
              <span style={{ color: activeProjectCategory === category ? "#0a0a0f" : "#c9a84c" }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project Card with integrated queue */}
        <div>
          <h4 style={{ font: "600 14px 'DM Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            FEATURED PROJECT
          </h4>
          <motion.div
            key={activeProject.index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: "720px", // increased to exactly 640px
              background: "#000",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Background image + darker overlay for readability */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.5) 60%, rgba(10,10,15,0.9) 100%)"
                }}
              />
            </div>

            {/* Content wrapper with backdrop blur for readability */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "40px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "640px",
                background: "rgba(10,10,15,0.25)", // semi-transparent background
                backdropFilter: "blur(.5px)", // the blur effect
                WebkitBackdropFilter: "blur(3px)",
              }}
            >
              {/* Main details – moved up by reducing gap */}
              <div style={{ maxWidth: "700px", marginBottom: "8px" }}> {/* smaller margin */}
                <span style={{ font: "11px 'DM Mono', monospace", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {activeProject.focus}
                </span>
                <h3 style={{ font: "500 clamp(2rem, 4vw, 3.2rem)/1.1 'Playfair Display', serif", color: "#ffffff", letterSpacing: "-0.03em", margin: "12px 0 8px 0" }}>
                  {activeProject.title}
                </h3>
                <p style={{ font: "16px 'Manrope', sans-serif", color: "rgba(246,241,232,0.9)", lineHeight: "1.6", marginBottom: "16px" }}>
                  {activeProject.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "4px",
                        font: "11px 'DM Mono', monospace",
                        color: "rgba(255,255,255,0.8)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", font: "11px 'DM Mono', monospace", color: "#ead18b", textTransform: "uppercase" }}
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {activeProject.livePreview && (
                    <a
                      href={activeProject.livePreview}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", font: "11px 'DM Mono', monospace", color: "#ead18b", textTransform: "uppercase" }}
                    >
                      <ExternalLink size={14} /> Live Preview
                    </a>
                  )}
                </div>
              </div>

              {/* Queue inside the card – moved up closer to text */}
              <div style={{ marginTop: "8px" }}> {/* reduced from 24px to 8px */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ font: "11px 'DM Mono', monospace", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    PROJECT QUEUE ({visibleProjects.length})
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={prevProject}
                      style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "grid", placeItems: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={nextProject}
                      style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "grid", placeItems: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div
                  ref={scrollContainerRef}
                  style={{
                    display: "flex",
                    gap: "12px",
                    overflowX: "auto",
                    paddingBottom: "8px",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {visibleProjects.map((project, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <motion.div
                        key={project.index}
                        data-index={project.index}
                        onClick={() => handleTileClick(project.index)}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        style={{
                          flex: "0 0 140px",
                          height: "100px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          cursor: "pointer",
                          border: isActive ? "2px solid #c9a84c" : "1px solid rgba(255,255,255,0.2)",
                          boxShadow: isActive ? "0 6px 12px rgba(201,168,76,0.3)" : "0 2px 8px rgba(0,0,0,0.4)",
                          scrollSnapAlign: "center",
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isActive ? 0.9 : 0.5,
                            filter: isActive ? "grayscale(0%)" : "grayscale(50%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "6px",
                            left: "8px",
                            right: "8px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                          }}
                        >
                          <span style={{ font: "8px 'DM Mono', monospace", color: isActive ? "#c9a84c" : "rgba(255,255,255,0.5)" }}>
                            {project.index}
                          </span>
                          <span style={{ font: "500 11px 'Playfair Display', serif", color: "#ffffff", whiteSpace: "pre-line", lineHeight: "1.1" }}>
                            {project.title.replace("\n", " ")}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}