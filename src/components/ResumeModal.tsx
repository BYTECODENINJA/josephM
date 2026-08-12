import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { ModalShell } from "./ModalShell";
import resumePDF from "../assets/JOSEPH MULWA.pdf"; // adjust the path/filename as needed

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const openResumeInNewTab = () => {
    window.open(resumePDF, "_blank");
  };

  return (
    <ModalShell title="The digital resume" eyebrow="Archive / JM-2026" onClose={onClose}>
      <div className="resume-pdf-preview" style={{ textAlign: "center", padding: "2rem 0" }}>
        <p style={{ color: "var(--muted-dark)", marginBottom: "1.5rem" }}>
          The resume is ready --- open it in a new tab for the best viewing experience.
        </p>
        <button
          className="button button--gold"
          type="button"
          onClick={openResumeInNewTab}
          style={{ fontSize: "1.1rem" }}
        >
          <ExternalLink size={18} />
          View full resume
        </button>
      </div>

      <div className="modal-actions" style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            className="button button--gold"
            href="mailto:josephmulwa8055@gmail.com?subject=Resume request"
            onClick={onClose}
          >
            Request a conversation
            <ArrowUpRight size={16} />
          </a>
          <a
            className="button button--outline"
            href={resumePDF}
            download="Joseph_Mulwa_Resume.pdf"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
        <button className="button button--quiet" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </ModalShell>
  );
}