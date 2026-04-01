import { ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useRipple } from "../hooks/useRipple";
import AnimatedNumber from "./AnimatedNumber";

interface HeroSectionProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

const STATS = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 70, suffix: "+", label: "Menu Items" },
  { value: 4, suffix: ".8★", label: "Rating" },
];

export default function HeroSection({
  onOrderNow,
  onViewMenu,
}: HeroSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const createRipple = useRipple();

  return (
    <section
      className="relative min-h-screen flex items-center circuit-bg pt-16"
      id="home"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F29A2E, transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F29A2E, transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange/30 text-orange text-xs font-medium mb-6"
              style={{ background: "rgba(242,154,46,0.08)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <Star size={12} fill="currentColor" />
              </motion.span>
              Indore's #1 Rated Restaurant
            </motion.div>

            <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              <motion.span
                className="block text-orange"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                ENGINEERING
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                WALA
              </motion.span>
            </div>

            <motion.p
              className="text-xl font-bold text-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Indore's Most Deliciously Engineered Food!
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.5 }}
            >
              Authentic flavors crafted with precision. From smoky tandoor
              dishes to rich curries — every bite is engineered for perfection.
              Fresh ingredients, expert chefs, delivered to your door.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
            >
              <motion.button
                type="button"
                onClick={onOrderNow}
                onMouseDown={createRipple}
                className="relative overflow-hidden btn-orange px-8 py-3.5 rounded-xl font-bold text-base flex items-center gap-2"
                data-ocid="hero.primary_button"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 28px rgba(242,154,46,0.5)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                Order Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                >
                  <ChevronRight size={18} />
                </motion.span>
              </motion.button>
              <motion.button
                type="button"
                onClick={onViewMenu}
                onMouseDown={createRipple}
                className="relative overflow-hidden btn-outline-orange px-8 py-3.5 rounded-xl font-bold text-base"
                data-ocid="hero.secondary_button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                View Menu
              </motion.button>
            </motion.div>

            <motion.div
              ref={statsRef}
              className="flex gap-8 mt-10 pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.1, duration: 0.4 }}
                >
                  <div className="text-2xl font-extrabold text-orange">
                    {stat.suffix === ".8★" ? (
                      <span>4.8★</span>
                    ) : (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side decorative panel */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(242,154,46,0.18) 0%, rgba(242,154,46,0.04) 60%, transparent 100%)",
                border: "1px solid rgba(242,154,46,0.2)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "#f29a2e",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(130px) translateY(-50%)`,
                    opacity: 0.5 + (deg / 300) * 0.5,
                  }}
                />
              ))}
            </motion.div>
            {/* Center logo */}
            <div
              className="absolute w-28 h-28 rounded-full btn-orange flex items-center justify-center font-display font-bold text-3xl shadow-2xl ew-float"
              style={{ boxShadow: "0 0 40px rgba(242,154,46,0.4)" }}
            >
              EW
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
