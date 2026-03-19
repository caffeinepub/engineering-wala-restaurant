import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full btn-orange flex items-center justify-center font-display font-bold text-sm">
              EW
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight">
                <span className="text-orange">Engineering</span>
                <span className="text-foreground"> Wala</span>
              </div>
              <div className="text-xs text-muted-foreground leading-none">
                Bhawarkua, Indore
              </div>
            </div>
          </div>

          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.section"
          >
            {[
              { label: "Menu", id: "menu" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="text-muted-foreground hover:text-orange transition-colors text-sm font-medium"
                data-ocid={`nav.${item.id}.link`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCartOpen}
              className="relative flex items-center gap-2 btn-outline-orange px-3 py-2 rounded-lg text-sm"
              data-ocid="cart.open_modal_button"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 btn-orange rounded-full text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-foreground hover:text-orange transition-colors font-medium py-2"
                  data-ocid={`nav.${item.id}.link`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
