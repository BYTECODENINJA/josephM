import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  blindfold: "/blindfold.jpg",
} as const;

interface ManifestoProps {
  scrollTo: (id: string) => void;
}

export function Manifesto({ scrollTo }: ManifestoProps) {
  return (
    <section className="manifesto section section--light" id="about">
      <div className="section-frame"><SectionEyebrow number="01" children="THE THESIS" />
        <div className="manifesto__layout parallax-target" data-parallax data-parallax-x="-10" data-parallax-y="16">
          <div className="manifesto__visual reveal reveal--left" data-reveal>
            <div className="portrait-frame">
              <img src={REFERENCE_IMAGES.blindfold} alt="Marble sculpture with red blindfold" />
              <div className="portrait-frame__scan" />
              <span className="portrait-frame__label">FIG. 01 / SEE BEYOND</span>
              <span className="portrait-frame__corner portrait-frame__corner--one" />
              <span className="portrait-frame__corner portrait-frame__corner--two" />
            </div>
            <div className="manifesto__stamp">MEMENTO<br /><em>BUILD</em></div>
          </div>
          <div className="manifesto__copy reveal reveal--right" data-reveal>
            <span className="micro-label">A brief introduction</span>
            <h2>I build at the edge of <em>clarity</em>.</h2>
            <p className="lede">The best digital products do not ask for attention. They earn it.
              I’m Joseph Mulwa — a full-stack developer eager to turn ambitious ideas into useful, expressive systems.</p>
            <p>I work across web-development, system design and the space between them: translating a
              sharp question into an interface people can trust, then giving it the architecture to grow.</p>
            <button className="text-button text-button--dark" type="button" onClick={() => scrollTo("projects")}>See selected work <ArrowUpRight size={15} />
            </button>
            <div className="stats-row">
              <div>
                <strong>3</strong>
                <span>Years into Modeling the skill</span>
              </div>
              <div>
                <strong>22</strong>
                <span>Complete Github repositories</span>
              </div>
              <div>
                <strong>New</strong>
                <span>To the industry but confident to craft</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>Questions remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
