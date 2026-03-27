import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HelpButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello! I need help with my order at Engineering Wala. 🍴",
    );
    window.open(`https://wa.me/919713225322?text=${message}`, "_blank");
  };

  return (
    <div
      className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-2"
      data-ocid="help.button"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-xl"
            style={{
              background: "linear-gradient(135deg, #FF6B00, #FF9A3C)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(255,107,0,0.5)",
            }}
          >
            💬 Need Help? Chat Now!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: pulse
            ? ["0 0 0 0 rgba(255,107,0,0.7)", "0 0 0 18px rgba(255,107,0,0)"]
            : "0 0 0 0 rgba(255,107,0,0)",
          rotate: pulse ? [0, -12, 12, -8, 8, 0] : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        aria-label="Help - Contact us on WhatsApp"
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #FF6B00 0%, #FF9A3C 60%, #FFD700 100%)",
          border: "2.5px solid rgba(255,215,0,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner glow ring */}
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
        {/* Question mark icon */}
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          ?
        </span>
      </motion.button>
    </div>
  );
}
