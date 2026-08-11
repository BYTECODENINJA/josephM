import  { type CSSProperties } from "react";
import { MoveDownRight, Code2, Layers3, Database, ServerCog } from "lucide-react";
import { SectionEyebrow } from "../SectionEyebrow";

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
    skills: ["MongoDB", "Postgres", "MySQL", "Redis"],
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

interface ArsenalProps {
  constellation: number;
}

export function Arsenal({ constellation }: ArsenalProps) {
  return (
    <section className="arsenal section" id="skills">
      <div className="section-frame"><SectionEyebrow number="02" children="THE SKILLS" />
        <div className="section-heading reveal reveal--up parallax-target" data-reveal data-parallax data-parallax-x="10" data-parallax-y="-12">
          <div>
            <h2>Tools for the <em>unknown.</em></h2>
          </div>
          <p>I choose technology the way a craftsperson chooses a tool: for the problem in front of us, not the trend behind us.</p>
        </div>
        <div className="skill-grid parallax-target" data-parallax data-parallax-x="-8" data-parallax-y="14">
          {skillGroups.map((group, index) => {
            const Icon = group.icon; return <article className={`skill-card skill-card--${group.accent} reveal reveal--up`} data-reveal key={group.title} style={{ transitionDelay: `${index * 80}ms` } as CSSProperties}>
              <div className="skill-card__top">
                <span>{group.label}</span>
                <Icon size={18} />
              </div>
              <div className="skill-card__icon">
                <Icon size={30} strokeWidth={1.2} />
              </div>
              <h3>{group.title}</h3>
              <div className="skill-card__skills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              <div className="skill-card__footer">
                <span>Depth / {index === 0 ? "01" : index === 1 ? "02" : index === 2 ? "03" : "04"}</span>
                <MoveDownRight size={16} />
              </div>
            </article>
          })}
        </div>
        <div className="arsenal__footer">
          <span className="arsenal__orbit">
            <span /><span /><span /></span><p>Good systems leave room<br />for <em>better questions.</em></p>
          <span className="micro-label">{constellation} signals / still learning</span>
        </div>
      </div>
    </section>
  );
}
