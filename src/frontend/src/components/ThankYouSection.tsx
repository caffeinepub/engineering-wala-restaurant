import { motion } from "motion/react";

const FLOAT_HEARTS = ["h0", "h1", "h2", "h3", "h4", "h5", "h6"];

export default function ThankYouSection() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "#0B0F14" }}
    >
      {/* Deep glow behind heart */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 80%, rgba(239,68,68,0.14) 0%, rgba(242,154,46,0.04) 60%, transparent 80%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 3D grid floor effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,154,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,154,46,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "perspective(200px) rotateX(60deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(transparent, black)",
        }}
      />

      {/* Floating hearts */}
      {FLOAT_HEARTS.map((key, i) => (
        <motion.div
          key={key}
          className="absolute select-none pointer-events-none text-red-400"
          style={{
            left: `${8 + i * 13}%`,
            bottom: "12%",
            fontSize: `${12 + (i % 3) * 8}px`,
          }}
          animate={{
            y: [-0, -90, -140],
            opacity: [0.5, 0.7, 0],
            scale: [1, 1.15, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.55,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* 3D glowing heart */}
        <motion.div
          className="inline-block mb-8"
          animate={{
            scale: [1, 1.18, 1, 1.12, 1],
            filter: [
              "drop-shadow(0 0 8px rgba(239,68,68,0.4))",
              "drop-shadow(0 0 24px rgba(239,68,68,0.85))",
              "drop-shadow(0 0 8px rgba(239,68,68,0.4))",
            ],
          }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ fontSize: "6rem" }}
        >
          ❤️
        </motion.div>

        {/* 3D layered title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight"
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            background:
              "linear-gradient(135deg, #F29A2E 0%, #FF6B6B 50%, #F29A2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
            textShadow: "0 4px 30px rgba(242,154,46,0.2)",
          }}
        >
          Thank You for Choosing
          <br />
          Engineering Wala
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-xl mx-auto"
          style={{ fontFamily: "Fraunces, serif", fontStyle: "italic" }}
        >
          Made with ❤️ for every hungry engineer in Bhawarkua, Indore
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-base leading-relaxed mb-8 max-w-xl mx-auto"
        >
          Every meal is crafted with love, passion, and a pinch of engineering
          magic. Thank you for being part of our growing family.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
          className="inline-block px-6 py-3 rounded-2xl"
          style={{
            background: "rgba(242,154,46,0.08)",
            border: "1px solid rgba(242,154,46,0.25)",
          }}
        >
          <p className="text-orange-400 font-medium text-sm">
            — Aadarsh Shukla &amp; the Engineering Wala Family ❤️
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
