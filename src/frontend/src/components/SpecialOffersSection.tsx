import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Gift, Percent, ShoppingBag, Zap } from "lucide-react";
import { motion } from "motion/react";

const OFFERS = [
  {
    id: 1,
    icon: Percent,
    badge: "HOT DEAL",
    badgeColor: "bg-red-500",
    title: "20% OFF on orders above ₹299",
    description: "Save big on your favourite meals. Valid on all categories.",
    code: "ENGG20",
    expiry: "Ends Tonight",
  },
  {
    id: 2,
    icon: Gift,
    badge: "NEW USER",
    badgeColor: "bg-green-600",
    title: "Free Delivery on First Order",
    description: "Welcome to Engineering Wala! Your first delivery is on us.",
    code: "FIRST FREE",
    expiry: "One-time offer",
  },
  {
    id: 3,
    icon: Zap,
    badge: "COMBO",
    badgeColor: "bg-orange-500",
    title: "Engineering Special Combo",
    description:
      "Burger + Fries + Cold Drink — the ultimate fuel pack for ₹199.",
    code: "ENGCOMBO",
    expiry: "Limited stock",
  },
  {
    id: 4,
    icon: ShoppingBag,
    badge: "BOGO",
    badgeColor: "bg-purple-600",
    title: "Buy 2 Get 1 Free on Momos",
    description:
      "Order any 2 plates of momos and get the 3rd plate absolutely free.",
    code: "MOMO3FOR2",
    expiry: "Weekends only",
  },
];

export default function SpecialOffersSection() {
  return (
    <section className="py-16 px-4" style={{ background: "#0D1117" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-orange-500 mb-3">
            Limited Time
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Special{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF6B00, #FF9F45)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Offers
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Exclusive deals crafted for every engineering appetite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="relative rounded-2xl overflow-hidden border border-orange-500/20 flex flex-col"
              style={{
                background: "linear-gradient(145deg, #131920 0%, #0B0F14 100%)",
                boxShadow: "0 0 30px rgba(255,107,0,0.08)",
              }}
              data-ocid={`offers.item.${i + 1}`}
            >
              {/* Glow strip top */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #FF6B00, #FF9F45, transparent)",
                }}
              />

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full text-white ${offer.badgeColor}`}
                  >
                    {offer.badge}
                  </span>
                  <offer.icon size={20} className="text-orange-400" />
                </div>

                <h3 className="text-white font-bold text-base leading-snug">
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {offer.description}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded border border-orange-500/40 text-orange-400"
                    style={{ background: "rgba(255,107,0,0.08)" }}
                  >
                    {offer.code}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={11} />
                    {offer.expiry}
                  </span>
                </div>

                <Button
                  size="sm"
                  className="w-full font-bold mt-1 text-white"
                  style={{
                    background: "linear-gradient(90deg, #FF6B00, #FF9F45)",
                    border: "none",
                  }}
                  data-ocid={`offers.primary_button.${i + 1}`}
                  onClick={() =>
                    document
                      .getElementById("menu")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Grab Deal
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
