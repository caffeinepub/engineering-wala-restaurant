import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface OwnerAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OWNER_PASSWORD = "aadarshshukla8800";

export default function OwnerAccessModal({
  isOpen,
  onClose,
  onSuccess,
}: OwnerAccessModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (password === OWNER_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password");
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-ocid="owner_access.modal"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(0,0,0,0.75)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal box */}
          <motion.div
            className="relative w-full max-w-sm mx-4 rounded-2xl p-8 z-10"
            style={{
              background: "linear-gradient(135deg, #13181f 0%, #1a2030 100%)",
              border: "1.5px solid rgba(242,154,46,0.45)",
              boxShadow:
                "0 0 60px rgba(242,154,46,0.18), 0 24px 64px rgba(0,0,0,0.6)",
            }}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Glowing top edge */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #F29A2E, transparent)",
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-400 transition-colors"
              data-ocid="owner_access.close_button"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-5"
              style={{
                background: "rgba(242,154,46,0.12)",
                border: "1.5px solid rgba(242,154,46,0.35)",
                boxShadow: "0 0 24px rgba(242,154,46,0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 0 18px rgba(242,154,46,0.2)",
                  "0 0 36px rgba(242,154,46,0.4)",
                  "0 0 18px rgba(242,154,46,0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Lock size={28} style={{ color: "#F29A2E" }} />
            </motion.div>

            <h2
              className="text-center font-bold text-2xl mb-1"
              style={{ color: "#F29A2E" }}
            >
              🔐 Owner Access
            </h2>
            <p className="text-center text-sm text-gray-400 mb-6">
              Enter your password to access the owner panel
            </p>

            <motion.div
              animate={shaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                ref={inputRef}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                className="w-full mb-2 text-center text-lg tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: error
                    ? "1.5px solid #ef4444"
                    : "1.5px solid rgba(242,154,46,0.3)",
                  color: "#fff",
                }}
                data-ocid="owner_access.input"
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="text-red-400 text-sm text-center mb-3"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    data-ocid="owner_access.error_state"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl font-bold text-base mt-2"
              style={{
                background: "linear-gradient(135deg, #F29A2E, #e07b0f)",
                color: "#0B0F14",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 24px rgba(242,154,46,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="owner_access.submit_button"
            >
              Enter Panel
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
