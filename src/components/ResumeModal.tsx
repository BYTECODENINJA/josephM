import { BadgeCheck, ArrowUpRight } from "lucide-react";
import { ModalShell } from "./ModalShell";

export function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell title="The digital resume" eyebrow="Archive / JM-2026" onClose={onClose}>
      <div className="resume-paper">
        <div className="resume-paper__header">
          <div><span className="micro-label">Joseph Mulwa</span><h3>Full-stack developer<br /><em>architect of digital experiences.</em></h3></div>
          <span className="resume-paper__seal"><BadgeCheck size={30} /><small>JM / 26</small></span>
        </div>
        <div className="resume-paper__grid">
          <div><span className="micro-label">Current thesis</span><p>Technology should feel inevitable in the hand: clear, human, quietly powerful.</p></div>
          <div><span className="micro-label">Working range</span><p>Product systems · Web applications · AI interfaces · Technical direction</p></div>
        </div>
        <div className="resume-paper__rule" />
        <div className="resume-paper__footer"><span>Based in Nairobi, Kenya</span><span>Available for select collaborations</span></div>
      </div>
      <div className="modal-actions"><a className="button button--gold" href="mailto:josephmulwa8055@gmail.com.com?subject=Resume request" onClick={onClose}>Request a conversation <ArrowUpRight size={16} /></a><button className="button button--quiet" type="button" onClick={onClose}>Close</button></div>
    </ModalShell>
  );
}
