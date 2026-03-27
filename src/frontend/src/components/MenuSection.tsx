import { Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend";
import { CATEGORIES, type MenuItemData } from "../data/menuData";
import { useRipple } from "../hooks/useRipple";
import DishDetailModal from "./DishDetailModal";

interface MenuSectionProps {
  menuItems: MenuItem[];
  localMenu: MenuItemData[];
  onAddToCart: (item: MenuItem) => void;
  addingIds: Set<string>;
}

type EnrichedItem = MenuItemData & {
  id: bigint;
  hasBackend: boolean;
  backendItem?: MenuItem;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={
            s <= Math.floor(rating)
              ? "text-yellow-400"
              : "text-muted-foreground"
          }
          fill={s <= Math.floor(rating) ? "currentColor" : "none"}
        />
      ))}
      <span className="text-xs font-semibold text-yellow-400 ml-1">
        {rating}
      </span>
    </div>
  );
}

export default function MenuSection({
  menuItems,
  localMenu,
  onAddToCart,
  addingIds,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<EnrichedItem | null>(null);
  const createRipple = useRipple();

  const enriched: EnrichedItem[] = localMenu.map((local) => {
    const backend = menuItems.find((m) => m.name === local.name);
    return {
      ...local,
      id: backend?.id ?? BigInt(0),
      price: backend ? Number(backend.price) : local.price,
      hasBackend: !!backend,
      backendItem: backend,
    };
  });

  const filtered =
    activeCategory === "All"
      ? enriched
      : enriched.filter((i) => i.category === activeCategory);

  return (
    <>
      <section
        id="menu"
        className="py-20 circuit-bg"
        style={{ scrollMarginTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold mb-3">
              The <span className="text-orange">Blueprint</span> of Taste
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every dish engineered with precision, crafted with love. Click any
              dish to view details and order.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                onMouseDown={createRipple}
                className={`relative overflow-hidden px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "btn-orange"
                    : "border border-border text-muted-foreground hover:border-orange/50 hover:text-orange"
                }`}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.94 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (idx % 8) * 0.06, duration: 0.45 }}
                whileHover={{
                  y: -6,
                  scale: 1.025,
                  boxShadow:
                    "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(242,154,46,0.2)",
                  transition: { duration: 0.2 },
                }}
                className="rounded-xl overflow-hidden card-glow border border-border/50 flex flex-col group cursor-pointer"
                style={{ background: "#171C22" }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden bg-[#1a2030]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (
                        e.target as HTMLImageElement
                      ).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div
                    className="hidden w-full h-full absolute inset-0 flex items-center justify-center text-5xl"
                    style={{
                      background: "linear-gradient(135deg, #1a2030, #232d3f)",
                    }}
                  >
                    🍽️
                  </div>
                  <div className="absolute top-2 left-2">
                    <span
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center text-xs font-bold ${
                        item.isVeg
                          ? "border-green-500 text-green-500 bg-black/60"
                          : "border-red-500 text-red-500 bg-black/60"
                      }`}
                    >
                      {item.isVeg ? "●" : "▲"}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <motion.span
                      className="bg-orange text-white text-sm font-extrabold px-3 py-1 rounded-full shadow-lg block"
                      whileHover={{ scale: 1.1 }}
                    >
                      ₹{item.price}
                    </motion.span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <motion.span
                      className="text-white text-sm font-bold bg-orange/80 px-3 py-1 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                    >
                      View Details
                    </motion.span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground text-sm leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 flex-1 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <StarRating rating={item.rating} />
                    <motion.button
                      type="button"
                      onMouseDown={createRipple}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.backendItem) onAddToCart(item.backendItem);
                      }}
                      disabled={
                        !item.hasBackend || addingIds.has(String(item.id))
                      }
                      className="relative overflow-hidden btn-orange px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={12} />
                      {addingIds.has(String(item.id)) ? "Adding..." : "Add"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DishDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(backendItem) => {
          onAddToCart(backendItem);
          setSelectedItem(null);
        }}
        isAdding={selectedItem ? addingIds.has(String(selectedItem.id)) : false}
      />
    </>
  );
}
