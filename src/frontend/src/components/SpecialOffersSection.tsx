import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Gift, Percent, ShoppingBag, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRipple } from "../hooks/useRipple";

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
  {
    id: 5,
    badge: "STUDENT",
    badgeColor: "bg-blue-600",
    title: "Student Discount 15% OFF",
    description:
      "Show your student ID and get 15% off on all orders above ₹150.",
    code: "STUDENT15",
    expiry: "Always valid",
    icon: Star,
  },
  {
    id: 6,
    badge: "UPI",
    badgeColor: "bg-indigo-600",
    title: "5% OFF on UPI Payment",
    description:
      "Pay via any UPI app and enjoy 5% extra discount on your order.",
    code: "UPIOFF5",
    expiry: "Always valid",
    icon: Zap,
  },
  {
    id: 7,
    badge: "LUNCH",
    badgeColor: "bg-yellow-600",
    title: "Lunch Special ₹99 Thali",
    description:
      "Full veg thali with rice, roti, dal, sabzi, and sweet — only at ₹99.",
    code: "LUNCH99",
    expiry: "12 PM – 3 PM",
    icon: Clock,
  },
  {
    id: 8,
    badge: "FAMILY",
    badgeColor: "bg-pink-600",
    title: "Family Pack ₹499 Only",
    description:
      "Feed 3-4 people with biryani, curry, bread, and dessert combo.",
    code: "FAMILY499",
    expiry: "Weekends",
    icon: Gift,
  },
  {
    id: 9,
    badge: "NIGHT",
    badgeColor: "bg-violet-700",
    title: "Late Night 10% OFF",
    description:
      "Order after 9 PM and get 10% discount. Perfect for late study sessions!",
    code: "NIGHT10",
    expiry: "After 9 PM",
    icon: ShoppingBag,
  },
  {
    id: 10,
    badge: "BIRTHDAY",
    badgeColor: "bg-rose-600",
    title: "Birthday Free Dessert",
    description:
      "Order on your birthday and get a complimentary dessert on us!",
    code: "BDAY FREE",
    expiry: "On your birthday",
    icon: Gift,
  },
  {
    id: 11,
    badge: "REFER",
    badgeColor: "bg-teal-600",
    title: "Refer & Earn ₹30 Off",
    description:
      "Refer a friend, and both you and your friend get ₹30 off on next order.",
    code: "REFER30",
    expiry: "Always valid",
    icon: Percent,
  },
  {
    id: 12,
    badge: "CARD",
    badgeColor: "bg-cyan-700",
    title: "Card Payment 8% OFF",
    description:
      "Pay with any debit or credit card and get 8% off your total bill.",
    code: "CARD8",
    expiry: "Always valid",
    icon: Zap,
  },
  {
    id: 13,
    badge: "SUNDAY",
    badgeColor: "bg-amber-600",
    title: "Sunday Brunch Special",
    description: "Every Sunday — buy any 2 breakfast items and get 1 free.",
    code: "SUN2GET1",
    expiry: "Sundays only",
    icon: ShoppingBag,
  },
  {
    id: 14,
    badge: "COD",
    badgeColor: "bg-lime-700",
    title: "₹20 OFF on COD Orders",
    description:
      "Choose Cash on Delivery and get ₹20 discount. No minimum order.",
    code: "COD20",
    expiry: "Always valid",
    icon: Percent,
  },
  {
    id: 15,
    badge: "MONSOON",
    badgeColor: "bg-sky-600",
    title: "Monsoon Splash 12% OFF",
    description:
      "On rainy days, order above ₹200 and get 12% off. Stay home, eat hot!",
    code: "RAIN12",
    expiry: "Rainy days",
    icon: Zap,
  },
  {
    id: 16,
    badge: "PAYDAY",
    badgeColor: "bg-emerald-600",
    title: "Payday Feast 18% OFF",
    description:
      "First week of every month — celebrate payday with 18% off all orders!",
    code: "PAYDAY18",
    expiry: "1st week of month",
    icon: Percent,
  },
  {
    id: 17,
    badge: "BIRYANI",
    badgeColor: "bg-amber-700",
    title: "Biryani Bonanza — 2 for ₹399",
    description:
      "Order 2 biryanis (any type) and pay just ₹399. Save over ₹100!",
    code: "BIRA399",
    expiry: "Limited time",
    icon: ShoppingBag,
  },
  {
    id: 18,
    badge: "THALI",
    badgeColor: "bg-orange-700",
    title: "Thali Tuesday ₹20 OFF",
    description: "Every Tuesday, order any thali and get ₹20 extra off!",
    code: "THALI20",
    expiry: "Tuesdays only",
    icon: Gift,
  },
  {
    id: 19,
    badge: "APP",
    badgeColor: "bg-indigo-700",
    title: "WhatsApp Order 10% OFF",
    description:
      "Order directly via WhatsApp and get 10% off as a special tech-savvy bonus!",
    code: "WA10",
    expiry: "Always valid",
    icon: Zap,
  },
  {
    id: 20,
    badge: "VEG",
    badgeColor: "bg-green-700",
    title: "Full Veg Day — 15% OFF",
    description: "Every Monday go green! 15% off on all veg items on Mondays.",
    code: "VEGMON15",
    expiry: "Mondays only",
    icon: Star,
  },
  {
    id: 21,
    badge: "WRAP",
    badgeColor: "bg-purple-700",
    title: "Buy 3 Wraps Get 1 Free",
    description:
      "Order any 3 kathi rolls or wraps and the cheapest one is free!",
    code: "WRAP3+1",
    expiry: "Always valid",
    icon: Gift,
  },
  {
    id: 22,
    badge: "SHAKE",
    badgeColor: "bg-pink-700",
    title: "Shake + Snack Combo ₹149",
    description:
      "Any milkshake + any snack = ₹149 only. Best combo to beat the heat!",
    code: "SHAKE149",
    expiry: "Summer special",
    icon: ShoppingBag,
  },
  {
    id: 23,
    badge: "EXAM",
    badgeColor: "bg-blue-800",
    title: "Exam Season 20% OFF",
    description:
      "Exam month stress? Get 20% off to keep your energy up during exams!",
    code: "EXAM20",
    expiry: "Exam months",
    icon: Star,
  },
  {
    id: 24,
    badge: "MIDNIGHT",
    badgeColor: "bg-slate-700",
    title: "Midnight Munchies ₹30 OFF",
    description:
      "Order between 10PM-12AM and get ₹30 off. For night owl engineers!",
    code: "MID30",
    expiry: "10PM–12AM",
    icon: Clock,
  },
];

export default function SpecialOffersSection() {
  const createRipple = useRipple();

  return (
    <section className="py-16 px-4" style={{ background: "#0D1117" }}>
      <div className="max-w-7xl mx-auto">
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
            24+ exclusive deals crafted for every engineering appetite.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: (i % 4) * 0.1,
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              whileHover={{
                scale: 1.04,
                y: -6,
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(242,154,46,0.15)",
              }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "#161B22",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 ew-shimmer" />

              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(242,154,46,0.12)",
                      border: "1px solid rgba(242,154,46,0.25)",
                    }}
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <offer.icon size={20} className="text-orange-400" />
                  </motion.div>
                  <Badge
                    className={`${offer.badgeColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-0`}
                  >
                    {offer.badge}
                  </Badge>
                </div>

                <h3 className="font-bold text-white text-xs mb-1.5 leading-snug">
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
                  {offer.description}
                </p>

                <div
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 mb-3"
                  style={{
                    background: "rgba(242,154,46,0.06)",
                    border: "1px dashed rgba(242,154,46,0.3)",
                  }}
                >
                  <span className="text-orange-400 font-mono font-bold text-xs tracking-widest">
                    {offer.code}
                  </span>
                  <span className="text-[9px] text-gray-500 flex items-center gap-1">
                    <Clock size={9} /> {offer.expiry}
                  </span>
                </div>

                <Button
                  size="sm"
                  onMouseDown={createRipple}
                  className="relative overflow-hidden w-full btn-orange rounded-xl text-xs font-bold border-0 hover:opacity-90"
                  data-ocid={`offers.item.${i + 1}.button`}
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
