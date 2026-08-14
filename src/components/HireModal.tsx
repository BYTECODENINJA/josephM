import { useState, type FormEvent } from "react";
import { Check, Send, ArrowUpRight } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
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
  budget: string;
  skills: string;
  hireType: string;
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
  budget: "",
  skills: "",
  hireType: "",
};

export function HireModal({ onClose }: { onClose: () => void }) {
  const [state, handleSubmit] = useForm("xoeallyq");
  const [hireType, setHireType] = useState<HireType>("project");
  const [form, setForm] = useState<HireForm>(emptyHireForm);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const skillOptions = [
    "React",
    "AI / ML",
    "Backend",
    "Product design",
    "Cloud",
    "Technical strategy",
  ];

  const typeCopy: Record<HireType, { label: string; detail: string; field: string }> = {
    project: {
      label: "Project based",
      detail: "A focused build with a clear finish line.",
      field: "Project type",
    },
    startup: {
      label: "Startup",
      detail: "A trusted technical partner for the zero-to-one.",
      field: "Startup stage",
    },
    employment: {
      label: "Long-term",
      detail: "A durable role inside an ambitious team.",
      field: "Role hiring for",
    },
  };

  const update = (key: keyof HireForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleSkill = (skill: string) =>
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );

  // Keep skills in sync with form.skills when submitting
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Update form.skills with comma-separated selected skills before submit
    setForm((prev) => ({ ...prev, skills: selectedSkills.join(", ") }));
    // Also store hireType
    setForm((prev) => ({ ...prev, hireType }));
    // Now submit
    handleSubmit(event);
  };

  return (
    <ModalShell title="Make a pact" eyebrow="Open brief / JM-2026" onClose={onClose}>
      {state.succeeded ? (
        <div className="success-state">
          <div className="success-state__icon">
            <Check size={28} />
          </div>
          <span className="micro-label">Signal received</span>
          <h3>The first move is yours.</h3>
          <p>
            Your brief is staged. I’ll get back to you within two working days
            with a considered next step.
          </p>
          <button
            className="button button--gold"
            type="button"
            onClick={onClose}
          >
            Return to the temple <ArrowUpRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <div
            className="hire-tabs"
            role="tablist"
            aria-label="Hiring route"
          >
            {(Object.keys(typeCopy) as HireType[]).map((type) => (
              <button
                type="button"
                role="tab"
                aria-selected={hireType === type}
                className={hireType === type ? "hire-tab is-active" : "hire-tab"}
                key={type}
                onClick={() => setHireType(type as HireType)}
              >
                <span>{typeCopy[type as HireType].label}</span>
                <small>{type === "project" ? "01" : type === "startup" ? "02" : "03"}</small>
              </button>
            ))}
          </div>
          <p className="hire-intro">{typeCopy[hireType].detail}</p>

          <form className="hire-form" onSubmit={handleFormSubmit}>
            <div className="form-grid form-grid--two">
              <label>
                <span>Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Your name"
                />
                <ValidationError field="name" errors={state.errors} />
              </label>
              <label>
                <span>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@company.com"
                />
                <ValidationError field="email" errors={state.errors} />
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label>
                <span>Contact</span>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={(event) => update("contact", event.target.value)}
                  placeholder="Phone or preferred channel"
                />
                <ValidationError field="contact" errors={state.errors} />
              </label>
              <label>
                <span>Company</span>
                <input
                  name="company"
                  value={form.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="Company name"
                />
                <ValidationError field="company" errors={state.errors} />
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label>
                <span>Your role</span>
                <input
                  name="role"
                  value={form.role}
                  onChange={(event) => update("role", event.target.value)}
                  placeholder="Founder, product lead..."
                />
                <ValidationError field="role" errors={state.errors} />
              </label>
              <label>
                <span>{typeCopy[hireType].field}</span>
                <select
                  required
                  name="detail"
                  value={form.detail}
                  onChange={(event) => update("detail", event.target.value)}
                >
                  <option value="">Select one</option>
                  {hireType === "project" && (
                    <>
                      <option>Product build</option>
                      <option>AI experience</option>
                      <option>Platform / API</option>
                    </>
                  )}
                  {hireType === "startup" && (
                    <>
                      <option>Idea</option>
                      <option>MVP</option>
                      <option>Growth</option>
                      <option>Scale</option>
                    </>
                  )}
                  {hireType === "employment" && (
                    <>
                      <option>Backend Developer</option>
                      <option>Fullstack Developer</option>
                      <option>Product engineer</option>
                      <option>Frontend Developer</option>
                    </>
                  )}
                </select>
                <ValidationError field="detail" errors={state.errors} />
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label>
                <span>Timeline</span>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={(event) => update("timeline", event.target.value)}
                >
                  <option value="">Select a pace</option>
                  <option>2–4 weeks</option>
                  <option>1–3 months</option>
                  <option>Contract</option>
                </select>
                <ValidationError field="timeline" errors={state.errors} />
              </label>
              <label>
                <span>Budget range</span>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={(event) => update("budget", event.target.value)}
                  disabled={hireType === "employment"}
                >
                  <option value="">
                    {hireType === "employment"
                      ? "Discussed together"
                      : "KSh 250k — 500k+"}
                  </option>
                  <option>Ksh 30k — 40K</option>
                  <option>Ksh 40k — 50K</option>
                  <option>Ksh 50k — 60K</option>
                  <option>Ksh 60k — 70K</option>
                  <option>Ksh 70k — 80K</option>
                  <option>Ksh 80k — 90K</option>
                  <option>Ksh 90k — 100K</option>
                  <option>KSh 100k — 250k</option>
                </select>
                <ValidationError field="budget" errors={state.errors} />
              </label>
            </div>

            <label>
              <span>What are we making?</span>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="Give me the context, the tension, and what success looks like."
                rows={4}
              />
              <ValidationError field="description" errors={state.errors} />
            </label>

            <div className="tag-picker">
              <span>Required skills</span>
              <div>
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={
                      selectedSkills.includes(skill) ? "tag is-selected" : "tag"
                    }
                    onClick={() => toggleSkill(skill)}
                  >
                    {selectedSkills.includes(skill) && <Check size={12} />}
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="button button--gold button--full"
              type="submit"
              disabled={state.submitting}
            >
              Send the brief <Send size={16} />
            </button>
          </form>
        </>
      )}
    </ModalShell>
  );
}