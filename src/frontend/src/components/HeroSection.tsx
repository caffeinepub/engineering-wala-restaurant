import { ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export default function HeroSection({
  onOrderNow,
  onViewMenu,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center circuit-bg pt-16"
      id="home"
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #F29A2E, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #F29A2E, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange/30 text-orange text-xs font-medium mb-6"
              style={{ background: "rgba(242,154,46,0.08)" }}
            >
              <Star size={12} fill="currentColor" />
              Indore's #1 Rated Restaurant
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              <span className="text-orange">ENGINEERING</span>
              <br />
              <span className="text-foreground">WALA</span>
            </h1>

            <p className="text-xl font-bold text-foreground mb-4">
              Indore's Most Deliciously Engineered Food!
            </p>

            <p className="text-muted-foreground text-base mb-8 max-w-md leading-relaxed">
              Authentic flavors crafted with precision. From smoky tandoor
              dishes to rich curries — every bite is engineered for perfection.
              Fresh ingredients, expert chefs, delivered to your door.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onOrderNow}
                className="btn-orange px-8 py-3.5 rounded-xl font-bold text-base flex items-center gap-2"
                data-ocid="hero.primary_button"
              >
                Order Now <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={onViewMenu}
                className="btn-outline-orange px-8 py-3.5 rounded-xl font-bold text-base"
                data-ocid="hero.secondary_button"
              >
                View Menu
              </button>
            </div>

            <div className="flex gap-8 mt-10 pt-8 border-t border-border/50">
              {[
                { value: "5000+", label: "Happy Customers" },
                { value: "50+", label: "Menu Items" },
                { value: "4.8★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-orange">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              <div
                className="absolute inset-0 rounded-full orange-glow"
                style={{ border: "3px solid rgba(242,154,46,0.5)" }}
              >
                <img
                  src="/assets/generated/hero-food.dim_1200x600.jpg"
                  alt="Delicious food from Engineering Wala"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full overflow-hidden border-2 border-orange/40 orange-glow">
                <img
                  src="/assets/generated/samosa.dim_400x300.jpg"
                  alt="Samosa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full overflow-hidden border-2 border-orange/40 orange-glow">
                <img
                  src="/assets/generated/gulab-jamun.dim_400x300.jpg"
                  alt="Gulab Jamun"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-10 w-16 h-16 rounded-full overflow-hidden border-2 border-orange/40">
                <img
                  src="/assets/generated/mango-lassi.dim_400x300.jpg"
                  alt="Mango Lassi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -left-10 w-16 h-16 rounded-full overflow-hidden border-2 border-orange/40">
                <img
                  src="/assets/generated/naan.dim_400x300.jpg"
                  alt="Naan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
