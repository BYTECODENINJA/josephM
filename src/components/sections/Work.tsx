import { Github, ExternalLink } from "lucide-react";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  future: "/future.jpg",
  goldenCode: "/goldencode.jpg",
  memento: "/memento.jpeg",
} as const;

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

interface WorkProps {
  activeProjectCategory: ProjectCategory;
  setActiveProjectCategory: (category: ProjectCategory) => void;
}

export function Work({ activeProjectCategory, setActiveProjectCategory }: WorkProps) {
  const visibleProjects = projects.filter((project) => project.category === activeProjectCategory);

  return (
    <section className="work section section--light" id="projects">
      <div className="section-frame"><SectionEyebrow number="06" children="SELECTED WORK" /><div className="section-heading section-heading--dark reveal reveal--up" data-reveal><h2>Proof of <em>concept.</em></h2><p>A collection of tools and interfaces that prioritize utility, clarity, and the long now.</p></div><div className="project-filters reveal reveal--up" data-reveal>{projectCategories.map((category) => <button type="button" className={activeProjectCategory === category ? "project-filter is-active" : "project-filter"} key={category} onClick={() => setActiveProjectCategory(category)}><span>{category === "Frontend" ? "01" : category === "Backend" ? "02" : "03"}</span>{category}<ExternalLink size={12} /></button>)}</div><div className="project-stack">{visibleProjects.map((project) => <article className={`project-card project-card--${project.accent} reveal reveal--up`} data-reveal key={project.index}><div className="project-card__image"><img src={project.image} alt={project.title} /></div><div className="project-card__veil" /><div className="project-card__top"><span>{project.focus}</span><ExternalLink size={14} /></div><div className="project-card__body"><span className="project-category__index">{project.index}</span><h3>{project.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h3><p>{project.description}</p><div className="project-card__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-card__bottom"><div className="project-card__links">{project.github && <a href={project.github} className="project-card__link" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>}{project.livePreview && <a href={project.livePreview} className="project-card__link" target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live</a>}</div><span>{project.category}</span></div></article>)}</div></div>
    </section>
  );
}
