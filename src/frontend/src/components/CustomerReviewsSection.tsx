import { Star } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    id: 1,
    name: "Arjun Sharma",
    avatar: "AS",
    rating: 5,
    date: "12 Mar 2026",
    title: "Best Biryani in Indore!",
    text: "Ordered the Chicken Biryani and it was absolutely divine. The spices were perfectly balanced and the portion size was generous. Delivery was super fast — barely 25 minutes!",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "PP",
    rating: 5,
    date: "9 Mar 2026",
    title: "Paneer Butter Masala ❤️",
    text: "Being a vegetarian I was skeptical, but the Paneer Butter Masala here rivals any restaurant in the city. Rich, creamy, and full of flavour. Will order again!",
  },
  {
    id: 3,
    name: "Rohit Verma",
    avatar: "RV",
    rating: 5,
    date: "5 Mar 2026",
    title: "Engineering Special Combo Value!",
    text: "The combo deal is insane value for money. Burger, fries, and a cold drink for ₹199? No other place in Bhawarkua comes close. My hostel gang orders every Friday.",
  },
  {
    id: 4,
    name: "Neha Gupta",
    avatar: "NG",
    rating: 4,
    date: "1 Mar 2026",
    title: "Momos are addictive!",
    text: "Tried the steamed momos with chilli sauce and couldn't stop. The Buy 2 Get 1 Free deal made it even better. Packaging was neat and everything arrived hot.",
  },
  {
    id: 5,
    name: "Karan Mehta",
    avatar: "KM",
    rating: 5,
    date: "25 Feb 2026",
    title: "Reliable and Delicious",
    text: "I've ordered from Engineering Wala at least 15 times now. Never been disappointed. The Dal Tadka and Roti combo is my go-to on late study nights. Highly recommend!",
  },
  {
    id: 6,
    name: "Sunita Yadav",
    avatar: "SY",
    rating: 5,
    date: "20 Feb 2026",
    title: "Friendly Service + Great Food",
    text: "Placed an order via WhatsApp and got a customised meal exactly as requested. The team is very responsive and the food quality is consistently top-notch. 5 stars!",
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={pos}
          size={14}
          className={
            pos <= rating ? "text-orange-400 fill-orange-400" : "text-gray-600"
          }
        />
      ))}
    </div>
  );
}

export default function CustomerReviewsSection() {
  return (
    <section className="py-16 px-4" style={{ background: "#0B0F14" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-orange-500 mb-3">
            What Our Customers Say
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Customer{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF6B00, #FF9F45)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reviews
            </span>
          </h2>

          {/* Overall Rating */}
          <div
            className="inline-flex items-center gap-4 mt-4 px-6 py-3 rounded-2xl border border-orange-500/25"
            style={{ background: "rgba(255,107,0,0.07)" }}
          >
            <div className="text-center">
              <p className="text-4xl font-extrabold text-orange-400">4.8</p>
              <p className="text-xs text-gray-400 mt-0.5">out of 5</p>
            </div>
            <div className="w-px h-10 bg-orange-500/20" />
            <div>
              <StarRating rating={5} />
              <p className="text-sm text-gray-400 mt-1">
                Based on 200+ reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-orange-500/15 p-5 flex flex-col gap-3"
              style={{
                background: "linear-gradient(145deg, #131920 0%, #0D1117 100%)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #FF6B00, #FF9F45)",
                  }}
                >
                  {review.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-xs">{review.date}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <p className="text-orange-300 font-semibold text-sm">
                {review.title}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
