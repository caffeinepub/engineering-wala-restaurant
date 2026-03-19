import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WA_NUMBER = "919713225322";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%20Engineering%20Wala!%20I%20want%20to%20place%20an%20order.`;

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      data-ocid="whatsapp.button"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full shadow-2xl cursor-pointer overflow-hidden"
      style={{
        background: "#25D366",
        padding: hovered ? "12px 20px" : "14px",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.93 }}
      animate={{
        boxShadow: [
          "0 0 0 0px rgba(37,211,102,0.6)",
          "0 0 0 12px rgba(37,211,102,0)",
        ],
      }}
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        },
        padding: { duration: 0.2 },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        role="img"
        aria-label="WhatsApp"
        className="flex-shrink-0"
        style={{ width: 26, height: 26, fill: "white" }}
      >
        <title>WhatsApp</title>
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.682 4.797 1.868 6.793L2 30l7.395-1.836A13.938 13.938 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.617l-.422-.253-4.39 1.09 1.14-4.268-.277-.44A11.56 11.56 0 014.4 16c0-6.396 5.204-11.6 11.6-11.6S27.6 9.604 27.6 16 22.396 27.6 16 27.6zm6.38-8.66c-.35-.175-2.07-1.02-2.39-1.136-.32-.117-.554-.175-.787.175-.233.35-.904 1.136-1.108 1.37-.204.232-.408.262-.757.087-.35-.175-1.477-.545-2.814-1.737-1.04-.927-1.742-2.073-1.946-2.423-.204-.35-.022-.539.153-.714.157-.157.35-.408.524-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.029-.612-.087-.175-.787-1.896-1.078-2.596-.284-.682-.572-.589-.787-.6l-.67-.012c-.233 0-.612.087-.932.437-.32.35-1.224 1.196-1.224 2.917s1.253 3.385 1.428 3.619c.175.233 2.466 3.766 5.977 5.28.836.36 1.487.575 1.996.736.838.267 1.601.229 2.204.139.672-.1 2.07-.847 2.362-1.663.291-.817.291-1.517.204-1.663-.087-.146-.32-.233-.67-.408z" />
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white font-bold text-sm whitespace-nowrap overflow-hidden"
          >
            Order on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
