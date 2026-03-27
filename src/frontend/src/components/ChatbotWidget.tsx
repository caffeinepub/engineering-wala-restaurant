import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const WA_NUMBER = "919713225322";

const BOT_OPTIONS = [
  {
    id: "order",
    label: "🛒 Place New Order",
    action: () => {
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place a new order at Engineering Wala. 🍽️")}`,
        "_blank",
      );
    },
  },
  {
    id: "track",
    label: "📦 Track My Order",
    action: null, // handled inline
  },
  {
    id: "offers",
    label: "🎁 View Today's Offers",
    action: () => {
      const el = document.getElementById("offers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: "help",
    label: "💬 Talk to Owner",
    action: () => {
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Aadarsh bhai! I need help with Engineering Wala. 🙏")}`,
        "_blank",
      );
    },
  },
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [trackMode, setTrackMode] = useState(false);
  const [orderId, setOrderId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOption = (opt: (typeof BOT_OPTIONS)[0]) => {
    if (opt.id === "track") {
      setTrackMode(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    if (opt.id === "offers") {
      setOpen(false);
    }
    opt.action?.();
  };

  const handleTrackSubmit = () => {
    if (!orderId.trim()) return;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'd like to track my order #EW-${orderId.trim()} at Engineering Wala. Please provide an update. 🙏`)}`,
      "_blank",
    );
    setTrackMode(false);
    setOrderId("");
  };

  return (
    <div
      className="fixed z-40"
      style={{ bottom: "6rem", left: "1.25rem" }}
      data-ocid="chatbot.button"
    >
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="absolute bottom-16 left-0 w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "#161B22",
              border: "1px solid rgba(242,154,46,0.25)",
            }}
            data-ocid="chatbot.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "linear-gradient(135deg,#F29A2E,#FF6B00)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                  🤖
                </div>
                <div>
                  <p className="text-white font-bold text-sm">EW Bot</p>
                  <p className="text-white/70 text-[10px]">
                    Engineering Wala Assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setTrackMode(false);
                  setOrderId("");
                }}
                className="text-white/70 hover:text-white transition-colors"
                data-ocid="chatbot.close_button"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              {/* Bot message */}
              <div className="flex gap-2">
                <span className="text-lg">🤖</span>
                <div
                  className="text-xs text-gray-300 rounded-xl rounded-tl-none px-3 py-2 leading-relaxed"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {trackMode
                    ? "Enter your Order ID below (e.g. 1234) and I'll help you track it! 📦"
                    : "Hi! I'm EW Bot 🤖 — How can I help you today?"}
                </div>
              </div>

              {trackMode ? (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter Order ID..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTrackSubmit()}
                    className="w-full text-sm text-white rounded-xl px-3 py-2 border border-orange-500/30 outline-none focus:border-orange-500"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    data-ocid="chatbot.input"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleTrackSubmit}
                      className="flex-1 text-xs font-bold py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg,#F29A2E,#FF6B00)",
                      }}
                      data-ocid="chatbot.submit_button"
                    >
                      Track via WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackMode(false);
                        setOrderId("");
                      }}
                      className="text-xs px-3 py-2 rounded-xl text-gray-400 hover:text-white border border-white/10"
                      data-ocid="chatbot.cancel_button"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {BOT_OPTIONS.map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleOption(opt)}
                      className="w-full text-left text-xs text-gray-200 rounded-xl px-3 py-2.5 border border-white/10 hover:border-orange-500/40 hover:text-white transition-all"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                      data-ocid={`chatbot.item.${i + 1}`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}

              <p className="text-[9px] text-gray-600 text-center">
                Powered by Engineering Wala 🍽️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setTrackMode(false);
          setOrderId("");
        }}
        className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: open
            ? "#1A1F26"
            : "linear-gradient(135deg,#F29A2E,#FF6B00)",
          border: open ? "2px solid rgba(242,154,46,0.5)" : "none",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        animate={
          open
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0 rgba(242,154,46,0.5)",
                  "0 0 0 10px rgba(242,154,46,0)",
                ],
              }
        }
        transition={
          open
            ? {}
            : {
                duration: 1.6,
                repeat: Number.POSITIVE_INFINITY,
              }
        }
        aria-label={open ? "Close chat" : "Open chat bot"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} className="text-orange-400" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
