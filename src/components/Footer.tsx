import { ArrowDown, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { AppMark } from "./AppMark";

interface FooterProps {
  scrollTo: (id: string) => void;
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-brand">
          <AppMark />
          <span><strong>JOSEPH MULWA</strong><small>THE DIGITAL ARCHITECT</small></span>
        </div>
        <p>Useful things for<br /><em>the long now.</em></p>
        <button type="button" className="footer-up" onClick={() => scrollTo("top")} aria-label="Back to top">
          <ArrowDown size={16} />
        </button>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Joseph Mulwa</span>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={16} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
        </div>
        <span>Made with intent / NBO</span>
      </div>
    </footer>
  );
}
