import { BadgeDollarSign, Leaf, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  { icon: Zap, title: "Fast Delivery", desc: "30-45 minutes to your door" },
  { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced fresh daily" },
  {
    icon: BadgeDollarSign,
    title: "Best Prices",
    desc: "Value for every budget",
  },
];

export default function FeaturesStrip() {
  return (
    <section
      className="py-8"
      style={{
        background: "rgba(242,154,46,0.06)",
        borderTop: "1px solid rgba(242,154,46,0.2)",
        borderBottom: "1px solid rgba(242,154,46,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="w-10 h-10 rounded-full btn-orange flex items-center justify-center flex-shrink-0">
                <f.icon size={18} />
              </div>
              <div>
                <div className="font-bold text-foreground">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
