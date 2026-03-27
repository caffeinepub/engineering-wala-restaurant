import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "Food is our common ground, a universal experience.",
    author: "James Beard",
  },
  {
    text: "First we eat, then we do everything else.",
    author: "M.F.K. Fisher",
  },
  {
    text: "The secret ingredient is always love.",
    author: "Engineering Wala",
  },
  {
    text: "Good food is the foundation of genuine happiness.",
    author: "Auguste Escoffier",
  },
  {
    text: "Life is too short for bad food. Choose Engineering Wala.",
    author: "Our Promise",
  },
];

export default function FoodQuotesSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % QUOTES.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const quote = QUOTES[current];

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Decorative glowing orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(242,154,46,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-orange-500 mb-3">
          Food for the Soul
        </span>
        <h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-2"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          Wisdom from the Kitchen
        </h2>
        <p className="text-gray-500 text-sm mb-12">
          Wisdom from the kitchen that feeds the heart.
        </p>

        {/* Quote display */}
        <div
          className="relative mx-auto max-w-2xl rounded-3xl p-8 md:p-12"
          style={{
            background: "#161B22",
            border: "1px solid rgba(242,154,46,0.15)",
            boxShadow: "0 0 60px rgba(242,154,46,0.06)",
          }}
        >
          {/* Animated big quote marks */}
          <div
            className="absolute -top-5 left-8 text-8xl font-serif leading-none select-none"
            style={{ color: "rgba(242,154,46,0.25)" }}
          >
            &#8220;
          </div>
          <div
            className="absolute -bottom-8 right-8 text-8xl font-serif leading-none select-none"
            style={{ color: "rgba(242,154,46,0.25)" }}
          >
            &#8221;
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <p
              className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6"
              style={{ fontFamily: "Fraunces, serif", fontStyle: "italic" }}
            >
              {quote.text}
            </p>
            <p className="text-orange-400 font-bold text-sm tracking-wider">
              — {quote.author}
            </p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {QUOTES.map((quote, i) => (
            <button
              key={quote.text}
              type="button"
              onClick={() => {
                setVisible(false);
                setTimeout(() => {
                  setCurrent(i);
                  setVisible(true);
                }, 300);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? "#F29A2E" : "rgba(242,154,46,0.25)",
              }}
              data-ocid={"quotes.tab"}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
