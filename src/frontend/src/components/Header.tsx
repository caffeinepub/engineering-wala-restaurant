import { ClipboardList, Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRipple } from "../hooks/useRipple";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onMyOrders: () => void;
}

export default function Header({
  cartCount,
  onCartOpen,
  onMyOrders,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const prevCount = useRef(cartCount);
  const createRipple = useRipple();

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setCartAnim(true);
      const t = setTimeout(() => setCartAnim(false), 500);
      prevCount.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setMobileOpen(false), 50);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
      style={{
        background: "rgba(11,15,20,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full btn-orange flex items-center justify-center font-display font-bold text-sm"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              EW
            </motion.div>
            <div>
              <div className="font-display font-bold text-lg leading-tight">
                <span className="text-orange">Engineering</span>
                <span className="text-foreground"> Wala</span>
              </div>
              <div className="text-xs text-muted-foreground leading-none">
                Bhawarkua, Indore
              </div>
            </div>
          </motion.div>

          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.section"
          >
            {[
              { label: "Menu", id: "menu" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="nav-link-anim text-muted-foreground hover:text-orange transition-colors text-sm font-medium"
                data-ocid={`nav.${item.id}.link`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              type="button"
              onClick={onMyOrders}
              className="nav-link-anim flex items-center gap-1.5 text-muted-foreground hover:text-orange transition-colors text-sm font-medium"
              data-ocid="nav.myorders.link"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.31, duration: 0.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ClipboardList size={15} />
              My Orders
            </motion.button>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={onCartOpen}
              onMouseDown={createRipple}
              className="relative overflow-hidden flex items-center gap-2 btn-outline-orange px-3 py-2 rounded-lg text-sm"
              data-ocid="cart.open_modal_button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 w-5 h-5 btn-orange rounded-full text-xs flex items-center justify-center font-bold ${
                    cartAnim ? "ew-cart-pop" : ""
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </motion.button>
            <button
              type="button"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50"
            style={{ background: "rgba(11,15,20,0.98)" }}
            data-ocid="nav.panel"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {[
                { label: "Menu", id: "menu" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-foreground hover:text-orange transition-colors font-medium py-2"
                  data-ocid={`nav.${item.id}.link`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  onMyOrders();
                  setTimeout(() => setMobileOpen(false), 50);
                }}
                className="text-left text-foreground hover:text-orange transition-colors font-medium py-2 flex items-center gap-2"
                data-ocid="nav.myorders.link"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 }}
              >
                <ClipboardList size={16} />
                My Orders
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
