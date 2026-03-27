import { ChefHat, Clock, Leaf, MapPin, Phone, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const whyCards = [
  {
    icon: Leaf,
    title: "100% Fresh",
    desc: "Ingredients sourced fresh every morning from local markets",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    desc: "Trained culinary professionals with 10+ years of experience",
  },
  {
    icon: Zap,
    title: "30 Min Delivery",
    desc: "Express delivery guaranteed within Indore city limits",
  },
  {
    icon: Users,
    title: "5000+ Happy Customers",
    desc: "Trusted by thousands of families in Indore",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ background: "#0D1118", scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold mb-4">
            Crafted with <span className="text-orange">Passion</span>,<br />
            Engineered for <span className="text-orange">Taste</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Engineering Wala was born from a simple idea: that great food
            deserves the same precision and care as great engineering. Nestled
            in the heart of Bhawarkua, Indore, we bring you authentic Indian
            flavors with a modern twist.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: MapPin,
              title: "Our Location",
              lines: [
                "Near Bhawarkua Square,",
                "Indore, Madhya Pradesh - 452010",
              ],
            },
            {
              icon: Phone,
              title: "Call Us",
              lines: ["+91 97132 25322", "Available 10 AM - 11 PM"],
            },
            {
              icon: Clock,
              title: "Opening Hours",
              lines: ["Mon - Sun: 10:00 AM - 11:00 PM", "365 days a year"],
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 text-center card-glow"
              style={{ background: "#171C22" }}
            >
              <div className="w-12 h-12 rounded-full btn-orange flex items-center justify-center mx-auto mb-4">
                <card.icon size={22} />
              </div>
              <h3 className="font-bold text-foreground mb-2">{card.title}</h3>
              {card.lines.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-8">
          <h3 className="font-display text-2xl font-bold">
            Why Choose <span className="text-orange">Engineering Wala?</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {whyCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border/50 text-center hover:border-orange/40 transition-all card-glow"
              style={{ background: "#171C22" }}
            >
              <div className="w-10 h-10 rounded-full btn-orange flex items-center justify-center mx-auto mb-3">
                <card.icon size={18} />
              </div>
              <h4 className="font-bold text-sm text-foreground mb-1">
                {card.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
