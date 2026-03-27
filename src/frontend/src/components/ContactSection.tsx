import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "919713225322";
    const msg = `📝 NEW FEEDBACK\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const contactFields = [
    { key: "name", label: "Your Name", placeholder: "Full name", type: "text" },
    {
      key: "phone",
      label: "Phone Number",
      placeholder: "+91 XXXXX XXXXX",
      type: "text",
    },
    {
      key: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      type: "email",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 circuit-bg"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold mb-3">
            Get In <span className="text-orange">Touch</span>
          </h2>
          <p className="text-muted-foreground">
            We're here to help. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div
              className="rounded-2xl overflow-hidden border border-border/50 h-64"
              style={{ background: "#171C22" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.8577!3d22.6926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd4d2d17c5e7%3A0x5c9c2f53d5d4e3cb!2sBhawarkua%2C+Indore!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                title="Engineering Wala Location"
              />
            </div>

            <div
              className="p-6 rounded-2xl border border-border/50 card-glow space-y-4"
              style={{ background: "#171C22" }}
            >
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Near Bhawarkua Square, Indore, MP - 452010",
                },
                { icon: Phone, label: "Phone", value: "+91 97132 25322" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@engineeringwala.in",
                },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg btn-orange flex items-center justify-center flex-shrink-0">
                    <info.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-border/50 card-glow"
            style={{ background: "#171C22" }}
          >
            <h3 className="font-bold text-foreground mb-6">
              Send us a Message
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <CheckCircle2 size={48} className="text-green-500 mb-3" />
                <p className="font-bold text-foreground">
                  Message Sent via WhatsApp!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {contactFields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={`contact-${field.key}`}
                      className="text-xs text-muted-foreground mb-1 block"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`contact-${field.key}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none"
                      style={{
                        background: "#0B0F14",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      data-ocid={`contact.${field.key}.input`}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Your message..."
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none resize-none"
                    style={{
                      background: "#0B0F14",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-orange w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  data-ocid="contact.submit_button"
                >
                  <Send size={16} /> Send via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
