import { useState, type FormEvent } from "react";
import { Check, Send, ArrowUpRight } from "lucide-react";
import { ModalShell } from "./ModalShell";

type HireType = "project" | "startup" | "employment";
type HireForm = {
  name: string;
  email: string;
  contact: string;
  company: string;
  role: string;
  detail: string;
  timeline: string;
  description: string;
};

const emptyHireForm: HireForm = {
  name: "",
  email: "",
  contact: "",
  company: "",
  role: "",
  detail: "",
  timeline: "",
  description: "",
};

export function HireModal({ onClose }: { onClose: () => void }) {
  const [hireType, setHireType] = useState<HireType>("project");
  const [form, setForm] = useState<HireForm>(emptyHireForm);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const skillOptions = ["React", "AI / ML", "Backend", "Product design", "Cloud", "Technical strategy"];
  const typeCopy: Record<HireType, { label: string; detail: string; field: string }> = {
    project: { label: "Project based", detail: "A focused build with a clear finish line.", field: "Project type" },
    startup: { label: "Startup", detail: "A trusted technical partner for the zero-to-one.", field: "Startup stage" },
    employment: { label: "Long-term", detail: "A durable role inside an ambitious team.", field: "Role hiring for" },
  };
  const update = (key: keyof HireForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toggleSkill = (skill: string) => setSelectedSkills((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <ModalShell title="Make a pact" eyebrow="Open brief / JM-2026" onClose={onClose}>
      {sent ? (
        <div className="success-state"><div className="success-state__icon"><Check size={28} /></div><span className="micro-label">Signal received</span><h3>The first move is yours.</h3><p>Your brief is staged. I’ll get back to you within two working days with a considered next step.</p><button className="button button--gold" type="button" onClick={onClose}>Return to the temple <ArrowUpRight size={16} /></button></div>
      ) : (
        <>
          <div className="hire-tabs" role="tablist" aria-label="Hiring route">
            {(Object.keys(typeCopy) as HireType[]).map((type) => <button type="button" role="tab" aria-selected={hireType === type} className={hireType === type ? "hire-tab is-active" : "hire-tab"} key={type} onClick={() => setHireType(type as HireType)}><span>{typeCopy[type as HireType].label}</span><small>{type === "project" ? "01" : type === "startup" ? "02" : "03"}</small></button>)}
          </div>
          <p className="hire-intro">{typeCopy[hireType].detail}</p>
          <form className="hire-form" onSubmit={handleSubmit}>
            <div className="form-grid form-grid--two">
              <label>
                <span>Name</span>
                <input required value={form.name} onChange={
                  (event) =>
                    update("name", event.target.value)} placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" />
              </label>
            </div>
            <div className="form-grid form-grid--two">
              <label>
                <span>Contact</span>
                <input value={form.contact} onChange={(event) => update("contact", event.target.value)} placeholder="Phone or preferred channel" />
              </label>
              <label>
                <span>Company</span>
                <input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company name" />
              </label>
            </div>
            <div className="form-grid form-grid--two">
              <label>
                <span>Your role</span>
                <input value={form.role} onChange={(event) => update("role", event.target.value)} placeholder="Founder, product lead..." />
              </label>
              <label>
                <span>{typeCopy[hireType].field}</span>
                <select required value={form.detail} onChange={(event) => update("detail", event.target.value)}>
                  <option value="">Select one</option>
                  {hireType === "project" && <>
                    <option>Product build</option>
                    <option>AI experience</option>
                    <option>Platform / API</option>
                  </>}{hireType === "startup" &&
                  <>
                    <option>Idea</option>
                  <option>MVP</option>
                  <option>Growth</option>
                  <option>Scale</option>
                </>}{hireType === "employment" &&
                  <>
                  <option>Backend Developer</option>
                  <option>Fullsatck Developer</option>
                  <option>Product engineer</option>
                    <option>Frontend Developer</option>
                </>
                  }
                </select>
              </label>
            </div>
            <div className="form-grid form-grid--two">
              <label>
                <span>Timeline</span>
                <select value={form.timeline}
                        onChange={(event) =>
                          update("timeline", event.target.value)}>
                  <option value="">Select a pace</option>
                  <option>2–4 weeks</option>
                  <option>1–3 months</option>
                  <option>Contract</option>
                </select>
              </label>
              <label>
                <span>Budget range</span>
                <select value={form.detail === "" ? "" : undefined} onChange={() => undefined} disabled={hireType === "employment"}>
                  <option>{hireType === "employment" ? "Discussed together" : "KSh 250k — 500k+"}</option>
                  <option>Ksh 30k — 40K</option>
                  <option>Ksh 40k — 50K</option>
                  <option>Ksh 50k — 60K</option>
                  <option>Ksh 60k — 70K</option>
                  <option>Ksh 70k — 80K</option>
                  <option>Ksh 80k — 90K</option>
                  <option>Ksh 90k — 100K</option>
                  <option>KSh 100k — 250k</option>
                </select>
              </label>
            </div>
            <label>
              <span>What are we making?</span>
              <textarea required value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Give me the context, the tension, and what success looks like." rows={4} />
            </label>
            <div className="tag-picker">
              <span>Required skills</span>
              <div>{skillOptions.map((skill) => <button key={skill} type="button" className={selectedSkills.includes(skill) ? "tag is-selected" : "tag"} onClick={() => toggleSkill(skill)}>{selectedSkills.includes(skill) && <Check size={12} />}{skill}</button>)}
              </div>
            </div>
            <button className="button button--gold button--full" type="submit">Send the brief <Send size={16} />
            </button>
          </form>
        </>
      )}
    </ModalShell>
  );
}
