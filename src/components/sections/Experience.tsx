import React from "react";
import { SectionEyebrow } from "../SectionEyebrow";

export function Experience() {
  return (
    <section className="experience section section--marble" id="experience">
      <div className="section-frame"><SectionEyebrow number="03" children="EXPERIENCE" /><div className="section-heading section-heading--dark reveal reveal--up" data-reveal><h2>Built in public.<br /><em>Refined in private.</em></h2><p>A trail of product thinking, technical range, and the occasional beautiful constraint.</p></div>
        <div className="timeline parallax-target" data-parallax data-parallax-x="8" data-parallax-y="-12"><article className="timeline-entry reveal reveal--left" data-reveal><div className="timeline-entry__year">2024—NOW</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">Independent / Nairobi</span><h3>Product engineer &amp; technical partner</h3><p>Helping founders move from “what if” to “here it is” — with systems that feel as considered as the idea.</p><div className="timeline-entry__tags"><span>Strategy</span><span>Architecture</span><span>Shipping</span></div></div></article><article className="timeline-entry reveal reveal--right" data-reveal><div className="timeline-entry__year">2021—24</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">Digital studio / Remote</span><h3>Full-stack developer</h3><p>Built platforms and product surfaces for teams working across commerce, culture, and emerging technology.</p><div className="timeline-entry__tags"><span>React</span><span>Node.js</span><span>Cloud</span></div></div></article><article className="timeline-entry reveal reveal--left" data-reveal><div className="timeline-entry__year">2018—21</div><div className="timeline-entry__marker"><span /></div><div className="timeline-entry__content"><span className="micro-label">The first commit</span><h3>Curiosity became a discipline</h3><p>Started with interfaces, stayed for the systems underneath them. Never stopped asking why.</p><div className="timeline-entry__tags"><span>Web</span><span>Design</span><span>Learning</span></div></div></article></div>
      </div>
    </section>
  );
}
