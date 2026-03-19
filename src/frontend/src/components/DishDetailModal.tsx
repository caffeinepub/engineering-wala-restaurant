import { Plus, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MenuItem } from "../backend";
import type { MenuItemData } from "../data/menuData";

interface DishDetailModalProps {
  item:
    | (MenuItemData & {
        id: bigint;
        hasBackend: boolean;
        backendItem?: MenuItem;
      })
    | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  isAdding: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={18}
          className={
            s <= Math.floor(rating)
              ? "text-yellow-400"
              : "text-muted-foreground"
          }
          fill={s <= Math.floor(rating) ? "currentColor" : "none"}
        />
      ))}
      <span className="text-base font-bold text-yellow-400 ml-1">{rating}</span>
    </div>
  );
}

export default function DishDetailModal({
  item,
  onClose,
  onAddToCart,
  isAdding,
}: DishDetailModalProps) {
  if (!item) return null;

  const waNumber = "919713225322";
  const waMsg = encodeURIComponent(
    `Hi Engineering Wala! I want to order: ${item.name} (₹${item.price}). Please confirm availability.`,
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden"
          style={{
            background: "#171C22",
            border: "1px solid rgba(242,154,46,0.3)",
          }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-7xl"
                style={{
                  background: "linear-gradient(135deg, #1a2030, #232d3f)",
                }}
              >
                🍽️
              </div>
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, #171C22 0%, transparent 50%)",
              }}
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="absolute top-3 left-3">
              <span
                className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center text-xs font-bold ${
                  item.isVeg
                    ? "border-green-500 text-green-500 bg-black/60"
                    : "border-red-500 text-red-500 bg-black/60"
                }`}
              >
                {item.isVeg ? "●" : "▲"}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {item.name}
              </h2>
              <span className="bg-orange text-white text-lg font-extrabold px-4 py-1 rounded-full ml-3 flex-shrink-0">
                ₹{item.price}
              </span>
            </div>

            <div className="mb-3">
              <StarRating rating={item.rating} />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {item.description}
            </p>

            <div
              className="mb-4 p-3 rounded-lg"
              style={{
                background: "rgba(242,154,46,0.08)",
                border: "1px solid rgba(242,154,46,0.2)",
              }}
            >
              <p className="text-xs text-orange font-semibold mb-1">Category</p>
              <p className="text-sm text-foreground">{item.category}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (item.backendItem) onAddToCart(item.backendItem);
                }}
                disabled={!item.hasBackend || isAdding}
                className="btn-orange flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                <Plus size={16} />
                {isAdding ? "Adding to Cart..." : "Add to Cart"}
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm text-white"
                style={{ background: "#25D366" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  style={{ width: 18, height: 18, fill: "white" }}
                >
                  <title>WhatsApp</title>
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.682 4.797 1.868 6.793L2 30l7.395-1.836A13.938 13.938 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.617l-.422-.253-4.39 1.09 1.14-4.268-.277-.44A11.56 11.56 0 014.4 16c0-6.396 5.204-11.6 11.6-11.6S27.6 9.604 27.6 16 22.396 27.6 16 27.6zm6.38-8.66c-.35-.175-2.07-1.02-2.39-1.136-.32-.117-.554-.175-.787.175-.233.35-.904 1.136-1.108 1.37-.204.232-.408.262-.757.087-.35-.175-1.477-.545-2.814-1.737-1.04-.927-1.742-2.073-1.946-2.423-.204-.35-.022-.539.153-.714.157-.157.35-.408.524-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.029-.612-.087-.175-.787-1.896-1.078-2.596-.284-.682-.572-.589-.787-.6l-.67-.012c-.233 0-.612.087-.932.437-.32.35-1.224 1.196-1.224 2.917s1.253 3.385 1.428 3.619c.175.233 2.466 3.766 5.977 5.28.836.36 1.487.575 1.996.736.838.267 1.601.229 2.204.139.672-.1 2.07-.847 2.362-1.663.291-.817.291-1.517.204-1.663-.087-.146-.32-.233-.67-.408z" />
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
