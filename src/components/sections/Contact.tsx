import { type FormEvent, useState } from "react";
import { Mail, Phone, ArrowUpRight, Send, Check } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { SectionEyebrow } from "../SectionEyebrow";
import { Constellation } from "../Constellation";

type ContactForm = { name: string; email: string; subject: string; message: string };

export function Contact() {
  const [state, handleSubmit] = useForm("xoeallyq");
  const [contact, setContact] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateContact = (key: keyof ContactForm, value: string) => {
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="contact section" id="contacts">
      <Constellation />
      <div className="section-frame">
        <SectionEyebrow number="07" children="CONTACT" />
        <div className="contact__layout">
          <div className="contact__intro reveal reveal--left" data-reveal>
            <h2>Let’s <em>build</em> something.</h2>
            <p>
              Whether it’s a focused project, a startup at the edge of possible,
              or a long-term technical partnership, I’m always open to the right
              question.
            </p>
            <div className="contact__direct">
              <a href="mailto:josephmulwa9055@gmail.com">
                <Mail size={16} /> josephmulwa8055@gmail.com
              </a>
              <a href="mailto:josephmulwa808@outlook.com">
                <Mail size={16} /> josephmulwa808@outlook.com
              </a>
              <a href="tel:+254708644969">
                <Phone size={16} /> +254 708 644 969
              </a>
            </div>
            <div className="contact__seal">
              <span>Intent</span>
              <span>/</span>
              <span>NBO</span>
            </div>
          </div>

          <div className="contact__form-wrap reveal reveal--right" data-reveal>
            {state.succeeded ? (
              <div className="success-state success-state--contact">
                <div className="success-state__icon">
                  <Check size={28} />
                </div>
                <span className="micro-label">Message sent</span>
                <h3>The line is open.</h3>
                <p>
                  I’ve received your signal. Expect a response within one
                  working day.
                </p>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Send another message <ArrowUpRight size={15} />
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid form-grid--two">
                  <label>
                    <span>Name</span>
                    <input
                      required
                      name="name"
                      value={contact.name}
                      onChange={(e) => updateContact("name", e.target.value)}
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
                      value={contact.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                      placeholder="you@company.com"
                    />
                    <ValidationError field="email" errors={state.errors} />
                  </label>
                </div>
                <label>
                  <span>Subject</span>
                  <input
                    required
                    name="subject"
                    value={contact.subject}
                    onChange={(e) => updateContact("subject", e.target.value)}
                    placeholder="What are we discussing?"
                  />
                  <ValidationError field="subject" errors={state.errors} />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    required
                    name="message"
                    value={contact.message}
                    onChange={(e) => updateContact("message", e.target.value)}
                    placeholder="Tell me about the project, the timeline, and the goals."
                    rows={5}
                  />
                  <ValidationError field="message" errors={state.errors} />
                </label>
                <button
                  className="button button--gold"
                  type="submit"
                  disabled={state.submitting}
                >
                  Send message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}