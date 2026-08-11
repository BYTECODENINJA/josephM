import {
  Quote,
  ArrowUpRight,
  BookOpen,
  Orbit,
  ShieldCheck, Zap, Gamepad2, Brain, CloudSync, Blocks,
} from "lucide-react";
import { SectionEyebrow } from "../SectionEyebrow";

const REFERENCE_IMAGES = {
  philosophers: "/philosophers.jpg",
  thinker: "/thinker.jpeg",
} as const;

const interests = [
  { title: "Web Perfomance", principle: "Optimizing load times, Core Web Vitals, and rendering strategies.", icon: Zap },
  { title: "Philosophy", principle: "Understanding human actions and motivation behind them.", icon: BookOpen },
  { title: "Cybersecurity", principle: "Securing applications, APIs, and infrastructure against modern threats.Understanding security best practices, ethical hacking, and building secure applications from the ground up.", icon: ShieldCheck },
  { title: "Gaming Tech", principle: "High-performance game engines and rendering pipelines.", icon: Gamepad2 },
  { title: "AI & ML", principle: "Exploring machine learning algorithms, neural networks, and AI-powered applications. Fascinated by how AI is transforming software development.", icon: Brain },
  { title: "Cloud Computing", principle: "Scalable distributed systems and serverless architectures.", icon: CloudSync },
  {title: "Blockchain & Web3.0", principle: "Decentralized applications, smart contracts, and the future of the internet.", icon: Blocks },
  { title: "System Design", principle: "Creating music with code, exploring new genres, and exploring the creative process.", icon: Orbit }
];

interface PhilosophyProps {
  activeInterest: number;
  setActiveInterest: (index: number) => void;
}

export function Philosophy({ activeInterest, setActiveInterest }: PhilosophyProps) {
  return (
    <section className="philosophy section" id="interests">
      <div className="section-frame">
        <SectionEyebrow number="05" children="INTERESTS" />
        <div className="philosophy__layout parallax-target" data-parallax data-parallax-x="12" data-parallax-y="-14">
          <div className="philosophy__intro reveal reveal--left" data-reveal>
            <span className="micro-label">Beyond the deliverable</span>
            <h2>What I’m <em>drawn</em> to.</h2>
            <p>Interests are not a sidebar. They are the raw material. The way I think about a product is shaped by the way I move through the world.</p>
            <div className="philosophy__quote"><Quote size={18} />
              <p>“Waste no more time arguing what a good person should be. Be one.”</p>
              <span>Marcus Aurelius</span>
            </div>
          </div>
          <div className="interest-grid reveal reveal--right" data-reveal>
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return <button type="button" className={activeInterest === index ? "interest-card is-active" : "interest-card"}
                             key={interest.title} onMouseEnter={() =>
                setActiveInterest(index)} onFocus={() => setActiveInterest(index)}
                             onClick={() => setActiveInterest(index)}>
                <span className="interest-card__number">0{index + 1}</span>
                <Icon size={20} /><strong>{interest.title}</strong>
                <small>{interest.principle}</small>
                <ArrowUpRight size={15} />
              </button>
                })}
          </div>
        </div>
        <div className="philosophy__image parallax-target" data-parallax data-parallax-x="-16" data-parallax-y="12">
          <img src={activeInterest % 2 === 0 ? REFERENCE_IMAGES.thinker : REFERENCE_IMAGES.philosophers} alt="Classical sculpture reimagined with technology" />
          <div className="philosophy__image-overlay">
            <span>STILL / MOVING</span>
            <span>STATE {String(activeInterest + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
