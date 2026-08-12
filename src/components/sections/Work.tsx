import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  Gaming: "/Gaming.png",
  Prologue: "/K-Tech.png",
  Portfilio: "/WindowsPortfolio.png",
  RealEstate: "/RealEstate.png",
  Fintech: "/Fintech.png",
  VibeCodingToolkit: "/AIToolKit.jpeg",
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
    github: "https://github.com",
    livePreview: "https://vercel.app",
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
    github: "https://github.com",
    livePreview: "https://vercel.app",
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
    github: "https://github.com",
    livePreview: "https://vercel.app",
  },
  {
    index: "04",
    category: "Backend" as ProjectCategory,
    focus: "E-Commerce / UI",
    title: "Golden\nCode",
    description: "An elegant e-commerce platform for high-end fashion and lifestyle.",
    image: REFERENCE_IMAGES.goldenCode,
    accent: "gold",
    tags: ["Next.js", "Tailwind", "Stripe"],
    github: "https://github.com",
    livePreview: "https://vercel.app",
  },
  {
    index: "05",
    category: "Fullstack" as ProjectCategory,
    focus: "RealEstate / APIs",
    title: "Property\nFinder",
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
    category: "Backend" as ProjectCategory,
    focus: "Architecture / APIs",
    title: "Ledger\nEngine",
    description: "High-performance financial ledger system built for scale.",
    image: REFERENCE_IMAGES.memento,
    accent: "blue",
    tags: ["Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com",
    livePreview: "",
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

  const [tabDirection, setTabDirection] = useState<"left" | "right">("right");
  const [previousCategoryIndex, setPreviousCategoryIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeProjectCategory]);

  const handleCategoryChange = (newCategory: ProjectCategory, nextIndex: number) => {
    setTabDirection(nextIndex > previousCategoryIndex ? "right" : "left");
    setPreviousCategoryIndex(nextIndex);
    setActiveProjectCategory(newCategory);
  };

  const nextProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % visibleProjects.length);
  };

  const prevProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length);
  };

  const getProjectAt = (offset: number) => {
    if (visibleProjects.length === 0) return null;
    const index = (currentIndex + offset + visibleProjects.length) % visibleProjects.length;
    return visibleProjects[index];
  };

  const renderProjectCard = (project: typeof projects[number], position: "center" | "prev" | "next") => (
    <motion.article
      whileHover="hoverState"
      initial="restState"
      animate="restState"
      className={`project-card project-card--${project.accent} reveal reveal--up is-visible project-carousel-item project-carousel-item--${position}`}
      key={`${activeProjectCategory}-${project.index}-${position}`}
      onClick={position === "prev" ? prevProject : position === "next" ? nextProject : undefined}
    >
      <div className="project-card__image" style={{ background: "#0a0a0f" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          variants={{
            restState: { opacity: 0.35, filter: "grayscale(20%) contrast(115%)" },
            hoverState: { opacity: 1.0, filter: "grayscale(0%) contrast(105%)" }
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      <div
        className="project-card__veil"
        style={{
          background: "linear-gradient(180deg, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.45) 45%, rgba(10,10,15,0.98) 100%)",
          zIndex: 0
        }}
      />

      <div className="project-card__top" style={{ position: "relative", zIndex: 1 }}>
        <span>{project.focus}</span>
        <ExternalLink size={14} />
      </div>

      <div className="project-card__body" style={{ position: "relative", zIndex: 1 }}>
        <span className="project-category__index">{project.index}</span>
        <h3 style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
          {project.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}
        </h3>
        <p style={{ color: "rgba(246, 241, 232, 0.92)", textShadow: "0 1px 6px rgba(0,0,0,0.95)" }}>
          {project.description}
        </p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} style={{ background: "rgba(10,10,15,0.7)", backdropFilter: "blur(4px)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="project-card__bottom" style={{ position: "relative", zIndex: 1 }}>
        <div className="project-card__links">
          {project.github && <a href={project.github} className="project-card__link" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>}
          {project.livePreview && <a href={project.livePreview} className="project-card__link" target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live</a>}
        </div>
        <span>{project.category}</span>
      </div>
    </motion.article>
  );

  const prevProjectData = getProjectAt(-1);
  const centerProjectData = getProjectAt(0);
  const nextProjectData = getProjectAt(1);

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="work section section--light" id="projects">
      <div className="section-frame">
        <SectionEyebrow number="06" children="SELECTED WORK" />
        <div className="section-heading section-heading--dark reveal reveal--up" data-reveal>
          <h2>Proof of <em>concept.</em></h2>
          <p>A collection of tools and interfaces that prioritize utility, clarity, and the long now.</p>
        </div>

        <div className="project-filters reveal reveal--up" data-reveal>
          {projectCategories.map((category, idx) => (
            <button
              key={category}
              type="button"
              className={activeProjectCategory === category ? "project-filter is-active" : "project-filter"}
              onClick={() => handleCategoryChange(category, idx)}
            >
              {String(idx + 1).padStart(2, "0")}
              {category}
            </button>
          ))}
        </div>

        <div className="project-carousel-container" style={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectCategory}
              custom={tabDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ display: "contents" }}
            >
              {visibleProjects.length > 0 && centerProjectData ? (
                <>
                  {visibleProjects.length > 1 && prevProjectData && renderProjectCard(prevProjectData, "prev")}
                  {renderProjectCard(centerProjectData, "center")}
                  {visibleProjects.length > 1 && nextProjectData && renderProjectCard(nextProjectData, "next")}
                </>
              ) : (
                <div
                  className="project-carousel-item project-carousel-item--spacer"
                  style={{
                    gridColumn: "2",
                    visibility: "visible",
                    textAlign: "center",
                    padding: "4rem 0",
                    color: "var(--muted-dark)",
                  }}
                >
                  No projects available under this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}