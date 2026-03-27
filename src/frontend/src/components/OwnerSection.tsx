import { MapPin, Phone, User } from "lucide-react";
import { motion } from "motion/react";

export default function OwnerSection() {
  return (
    <section
      className="py-12"
      style={{
        background: "#0d1117",
        borderTop: "1px solid rgba(242,154,46,0.2)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h3 className="font-display text-2xl font-bold">
            <span className="text-orange">Owner</span> Details
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-center"
          style={{
            background: "#171C22",
            border: "1px solid rgba(242,154,46,0.25)",
          }}
        >
          <div className="w-20 h-20 rounded-full btn-orange flex items-center justify-center flex-shrink-0 text-3xl font-display font-bold">
            AS
          </div>
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <User size={18} className="text-orange" />
              <span className="text-foreground font-bold text-lg">
                Aadarsh Shukla
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone size={16} className="text-orange" />
              <a
                href="tel:9713225322"
                className="text-muted-foreground hover:text-orange transition-colors text-sm"
              >
                +91 97132 25322
              </a>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <MapPin size={16} className="text-orange" />
              <span className="text-muted-foreground text-sm">
                Bhawarkua, Indore
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
