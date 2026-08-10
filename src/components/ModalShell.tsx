import React from "react";
import { X } from "lucide-react";

export function ModalShell({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-shell" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-shell__topline">
          <span className="micro-label">{eyebrow}</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        <h2 className="modal-shell__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
