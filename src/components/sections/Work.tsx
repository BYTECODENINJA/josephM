import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  Gaming: "/Gaming.png",
  Prologue: "/K-Tech.png",
  Portfilio: "/WindowsPortfolio.png",
  RealEstate: "/RealEstate.png",
  Fintech: "/Fintech.png",
  goldenCode: "/goldencode.jpg",
  memento: "/memento.jpeg",
  toolsDummy: "/tools-placeholder.jpg" // Added fallback image parameter for the Tools category
} as const;

// 1. Updated categories schema to include your requested "Tools" option
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
    focus: "Developer Experience",
    title: "CLI\nToolkit",
    description: "A collection of automated script tools optimizing localized builds.",
    image: REFERENCE_IMAGES.toolsDummy,
    accent: "blue",
    tags: ["Rust", "Shell", "Docker"],
    github: "https://github.com",
    livePreview: "",
  },
] as const;

interface WorkProps {
  activeProjectCategory: ProjectCategory;
  setActiveProjectCategory: (category: ProjectCategory) => void;
}

export function Work({ activeProjectCategory, setActiveProjectCategory }: WorkProps) {
  // Extract only the matching subset array dynamically
  const visibleProjects = projects.filter((project) => project.category === activeProjectCategory);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically reset the internal slide view pointer back to 0 when swapping categories
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeProjectCategory]);

  const nextProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % visibleProjects.length);
  };

  const prevProject = () => {
    if (visibleProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length);
  };

  // Safe cyclic layout parsing to handle endless looping mechanics over smaller lengths
  const getProjectAt = (offset: number) => {
    if (visibleProjects.length === 0) return null;
    const index = (currentIndex + offset + visibleProjects.length) % visibleProjects.length;
    return visibleProjects[index];
  };

  const renderProjectCard = (project: typeof projects[number], position: "center" | "prev" | "next") => (
    <article
      className={`project-card project-card--${project.accent} reveal reveal--up is-visible project-carousel-item project-carousel-item--${position}`}
      key={`${activeProjectCategory}-${project.index}-${position}`}
      // Clicking left shifts previous into focus, clicking right brings the next item forward
      onClick={position === "prev" ? prevProject : position === "next" ? nextProject : undefined}
    >
      <div className="project-card__image"><img src={project.image} alt={project.title} /></div>
      <div className="project-card__veil" />
      <div className="project-card__top"><span>{project.focus}</span><ExternalLink size={14} /></div>
      <div className="project-card__body">
        <span className="project-category__index">{project.index}</span>
        <h3>{project.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h3>
        <p>{project.description}</p>
        <div className="project-card__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-card__bottom">
        <div className="project-card__links">
          {project.github && <a href={project.github} className="project-card__link" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>}
          {project.livePreview && <a href={project.livePreview} className="project-card__link" target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live</a>}
        </div>
        <span>{project.category}</span>
      </div>
    </article>
  );

  const prevProjectData = getProjectAt(-1);
  const centerProjectData = getProjectAt(0);
  const nextProjectData = getProjectAt(1);

  return (
    <section className="work section section--light" id="projects">
      <div className="section-frame">
        <SectionEyebrow number="06" children="SELECTED WORK" />
        <div className="section-heading section-heading--dark reveal reveal--up" data-reveal>
          <h2>Proof of <em>concept.</em></h2>
          <p>A collection of tools and interfaces that prioritize utility, clarity, and the long now.</p>
        </div>

        {/* Navigation Categories Tab Bar Filter */}
        <div className="project-filters reveal reveal--up" data-reveal>
          {projectCategories.map((category, idx) => (
            <button
              type="button"
              className={activeProjectCategory === category ? "project-filter is-active" : "project-filter"}
              key={category}
              onClick={() => setActiveProjectCategory(category)}
            >
              <span>{`0${idx + 1}`}</span>
              {category}
              <ExternalLink size={12} />
            </button>
          ))}
        </div>

        {/* Strict Horizontal Viewport Layout Wrapper matching your CSS mapping */}
        <div className="project-carousel-container">
          {visibleProjects.length > 0 && centerProjectData ? (
            <>
              {/* Prev Project Slide (Left 1/3 viewport column) */}
              {visibleProjects.length > 1 && prevProjectData ? (
                renderProjectCard(prevProjectData, "prev")
              ) : (
                <div className="project-carousel-item project-carousel-item--spacer" />
              )}

              {/* Active Project Slide (Center Column) */}
              {renderProjectCard(centerProjectData, "center")}

              {/* Next Project Slide (Right 1/3 viewport column) */}
              {visibleProjects.length > 1 && nextProjectData ? (
                renderProjectCard(nextProjectData, "next")
              ) : (
                <div className="project-carousel-item project-carousel-item--spacer" />
              )}
            </>
          ) : (
            // Fallback empty indicator placeholder styled elegantly within the container
            <div className="project-carousel-item project-carousel-item--spacer" style={{ gridColumn: "2", visibility: "visible", textAlign: "center", padding: "4rem 0", color: "var(--muted-dark)" }}>
              <p>No projects available under this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
