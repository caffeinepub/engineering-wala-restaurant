import { Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend";
import { CATEGORIES, type MenuItemData } from "../data/menuData";
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
      <section id="menu" className="py-20 circuit-bg">
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

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "btn-orange" : "border border-border text-muted-foreground hover:border-orange/50 hover:text-orange"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 8) * 0.05 }}
                className="rounded-xl overflow-hidden card-glow border border-border/50 flex flex-col group cursor-pointer"
                style={{ background: "#171C22" }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden bg-[#1a2030]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <span className="bg-orange text-white text-sm font-extrabold px-3 py-1 rounded-full shadow-lg">
                      ₹{item.price}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold bg-orange/80 px-3 py-1 rounded-full">
                      View Details
                    </span>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.backendItem) onAddToCart(item.backendItem);
                      }}
                      disabled={
                        !item.hasBackend || addingIds.has(String(item.id))
                      }
                      className="btn-orange px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      <Plus size={12} />
                      {addingIds.has(String(item.id)) ? "Adding..." : "Add"}
                    </button>
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
