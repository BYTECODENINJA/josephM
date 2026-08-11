import { ArrowDown, ArrowUpRight, Download, Quote } from "lucide-react";
import { Constellation } from "../Constellation";

interface HeroProps {
  scrollTo: (id: string) => void;
  setResumeOpen: (open: boolean) => void;
  downloadResume: () => void;
}

export function Hero({ scrollTo, setResumeOpen, downloadResume }: HeroProps) {
  return (
    <section className="hero section" id="top">
      <Constellation />
      <div className="hero__architecture hero__architecture--left" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero__architecture hero__architecture--right" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero__meta hero__meta--top parallax-target" data-parallax data-parallax-x="16" data-parallax-y="-10"><span>EST.  / NAIROBI</span><span>SCROLL TO ENTER <ArrowDown size={14} /></span></div>
      <div className="hero__content parallax-target" data-parallax data-parallax-x="-14" data-parallax-y="10">
        <div className="hero__overline reveal reveal--up" data-reveal><span className="status-dot" /><span>FULL-STACK DEVELOPER</span><span className="hero__overline-divider">/</span><span>DIGITAL BUILDER</span></div>
        <h1 className="hero__title reveal reveal--up" data-reveal><span className="hero__title-line">Joseph</span><span className="hero__title-line hero__title-line--offset">Mulwa<span className="hero__title-mark">✦</span></span></h1>
        <div className="hero__bottom reveal reveal--up" data-reveal>
          <p className="hero__statement">Building the future,<br /><em>one line of code at a time.</em></p>
          <div className="hero__actions"><button className="button button--gold" type="button" onClick={() => setResumeOpen(true)}>View resume <ArrowUpRight size={16} /></button><button className="text-button" type="button" onClick={downloadResume}>Download PDF <Download size={15} /></button></div>
        </div>
      </div>
      <div className="hero__quote parallax-target" data-parallax data-parallax-x="22" data-parallax-y="-18" data-parallax-rotate="-1.5"><Quote size={24} /><span className="text-lg">“The impediment to action advances action.”</span><small>— Marcus Aurelius</small></div>
      <button className="scroll-cue" type="button" onClick={() => scrollTo("about")} aria-label="Scroll to about section"><span className="scroll-cue__circle"><ArrowDown size={16} /></span><span>Begin the descent</span></button>
    </section>
  );
}
