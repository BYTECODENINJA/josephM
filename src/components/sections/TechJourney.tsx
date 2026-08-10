import React from "react";
import { SectionEyebrow } from "../SectionEyebrow";

const techJourney = [
  { number: "01", era: "THE FIRST COMMIT", title: "Learning the language", text: "Started with the fundamentals: syntax, structure, and the patience to understand what the machine was really saying." },
  { number: "02", era: "THE INTERFACE", title: "Making systems human", text: "Moved from writing code to shaping experiences — where clarity, hierarchy, and motion turn software into something people can trust." },
  { number: "03", era: "THE FULL STACK", title: "Thinking in connections", text: "Connected frontends to APIs, data, deployments, and the quiet engineering that makes a product feel effortless." },
  { number: "04", era: "THE NEXT HORIZON", title: "Building with intent", text: "Now exploring AI-native products, realtime systems, and digital spaces that remain useful long after the novelty fades." },
] as const;

export function TechJourney() {
  return (
    <section className="tech-journey section" id="tech-journey">
      <div className="section-frame"><SectionEyebrow number="04" children="TECH JOURNEY" /><div className="section-heading reveal reveal--up" data-reveal><h2>From syntax<br /><em>to systems.</em></h2><p>A living route through the tools, instincts, and questions that shape how I build.</p></div><div className="journey-rail parallax-target" data-parallax data-parallax-x="-12" data-parallax-y="18">{techJourney.map((step) => <article className="journey-step reveal reveal--up" data-reveal key={step.number}><div className="journey-step__number">{step.number}</div><div className="journey-step__signal"><span /></div><div className="journey-step__body"><span className="micro-label">{step.era}</span><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></div>
    </section>
  );
}
