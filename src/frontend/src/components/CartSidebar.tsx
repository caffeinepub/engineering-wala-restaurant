import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MenuItem } from "../backend";

export interface CartDisplayItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartDisplayItem[];
  onIncrement: (itemId: bigint) => void;
  onDecrement: (itemId: bigint) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  onIncrement,
  onDecrement,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.menuItem.price) * i.quantity,
    0,
  );
  const deliveryFee = items.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{
              background: "#0F1318",
              borderLeft: "1px solid rgba(242,154,46,0.2)",
            }}
            data-ocid="cart.panel"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-orange" size={20} />
                <h2 className="font-display font-bold text-lg">Your Cart</h2>
                {items.length > 0 && (
                  <span className="btn-orange w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="cart.close_button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag
                    size={56}
                    className="text-muted-foreground/30 mb-4"
                  />
                  <p className="text-muted-foreground font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Add some delicious items!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={String(item.menuItem.id)}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/50"
                      style={{ background: "#171C22" }}
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {item.menuItem.name}
                        </p>
                        <p className="text-orange text-sm font-bold">
                          ₹{Number(item.menuItem.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onDecrement(item.menuItem.id)}
                          className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center hover:border-orange/50 hover:text-orange transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 size={12} />
                          ) : (
                            <Minus size={12} />
                          )}
                        </button>
                        <span className="w-6 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncrement(item.menuItem.id)}
                          className="w-7 h-7 rounded-full btn-orange flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <p className="text-sm font-bold text-foreground">
                          ₹{Number(item.menuItem.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div
                className="px-6 py-4 border-t border-border/50"
                style={{ background: "#0B0F14" }}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="text-foreground">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border/50 pt-2">
                    <span>Grand Total</span>
                    <span className="text-orange">₹{total}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="btn-orange w-full py-3.5 rounded-xl font-bold text-base"
                  data-ocid="cart.submit_button"
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
