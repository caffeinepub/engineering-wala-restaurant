import {
  CheckCircle2,
  ChefHat,
  Clock,
  MapPin,
  Package,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export interface StoredOrder {
  orderId: string;
  items: { name: string; price: number; quantity: number }[];
  address: string;
  city: string;
  payment: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode: string;
  grandTotal: number;
  placedAt: string;
  status: string;
}

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STEPS = [
  { key: "Confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { key: "Preparing", label: "Preparing Your Food", icon: ChefHat },
  { key: "Out for Delivery", label: "Out for Delivery", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: Package },
];

function getStepIndex(status: string): number {
  const s = status.toLowerCase();
  if (s.includes("confirm") || s === "pending") return 0;
  if (s.includes("prepar") || s.includes("making")) return 1;
  if (s.includes("out") || s.includes("delivery") || s.includes("on the way"))
    return 2;
  if (s.includes("deliver") || s.includes("complete")) return 3;
  return 0;
}

function TrackingBar({ status }: { status: string }) {
  const currentStep = getStepIndex(status);
  const progressPct = (currentStep / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between relative">
        {/* Base rail */}
        <div
          className="absolute top-4 left-4 right-4 h-0.5"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        {/* Animated fill rail */}
        <motion.div
          className="absolute top-4 left-4 h-0.5"
          style={{ background: "#F29A2E" }}
          initial={{ width: 0 }}
          animate={{ width: `calc(${progressPct}% - 0px)` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {STATUS_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const done = idx <= currentStep;
          const isActive = idx === currentStep;
          return (
            <motion.div
              key={step.key}
              className="flex flex-col items-center gap-1 z-10"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1 + idx * 0.1,
                duration: 0.35,
                type: "spring",
              }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? "ew-step-active" : ""
                }`}
                style={{
                  background: done ? "#F29A2E" : "#1A1F26",
                  border: done
                    ? "2px solid #F29A2E"
                    : "2px solid rgba(255,255,255,0.1)",
                }}
                animate={isActive ? { scale: [1, 1.12, 1] } : {}}
                transition={
                  isActive
                    ? { duration: 1.4, repeat: Number.POSITIVE_INFINITY }
                    : {}
                }
              >
                <Icon size={14} color={done ? "white" : "#666"} />
              </motion.div>
              <span
                className="text-center"
                style={{
                  fontSize: "9px",
                  color: done ? "#F29A2E" : "#666",
                  maxWidth: 56,
                  lineHeight: 1.2,
                }}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function getAutoProgressedStatus(order: StoredOrder): string {
  // If already cancelled or manually set beyond "Confirmed", respect it
  const manual = order.status;
  if (manual === "Cancelled") return "Cancelled";
  // Read placement time from localStorage
  const placedKey = `ew_order_${order.orderId}_placed`;
  let placedAt = localStorage.getItem(placedKey);
  if (!placedAt) {
    // Fallback to order.placedAt and store it
    placedAt = order.placedAt;
    localStorage.setItem(placedKey, placedAt);
  }
  const elapsed = (Date.now() - new Date(placedAt).getTime()) / 60000; // minutes
  if (elapsed < 5) return "Confirmed";
  if (elapsed < 15) return "Preparing";
  if (elapsed < 30) return "Out for Delivery";
  return "Delivered";
}

export function loadOrders(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem("ew_orders") ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder) {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem("ew_orders", JSON.stringify(orders.slice(0, 20)));
}

export function updateOrderStatusLocal(orderId: string, status: string) {
  const orders = loadOrders();
  const updated = orders.map((o) =>
    o.orderId === orderId ? { ...o, status } : o,
  );
  localStorage.setItem("ew_orders", JSON.stringify(updated));
}

export default function MyOrdersModal({ isOpen, onClose }: MyOrdersModalProps) {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { actor } = useActor();

  useEffect(() => {
    if (isOpen) {
      setOrders(loadOrders());
    }
  }, [isOpen]);

  // Refresh order statuses from backend
  useEffect(() => {
    if (!isOpen || !actor) return;
    const refresh = async () => {
      const stored = loadOrders();
      const updated = await Promise.all(
        stored.map(async (o) => {
          try {
            const status = await actor.getOrderStatus(BigInt(o.orderId));
            return { ...o, status };
          } catch {
            return o;
          }
        }),
      );
      const changed = JSON.stringify(updated) !== JSON.stringify(stored);
      if (changed) {
        localStorage.setItem("ew_orders", JSON.stringify(updated));
        setOrders(updated);
      } else {
        setOrders(updated);
      }
    };
    refresh();
  }, [isOpen, actor]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: "#0F1318",
                border: "1px solid rgba(242,154,46,0.2)",
                maxHeight: "85vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 flex-shrink-0">
                <div>
                  <h2 className="font-display font-bold text-lg">My Orders</h2>
                  <p className="text-xs text-muted-foreground">
                    Track your recent orders
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {orders.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Package
                      size={48}
                      className="mx-auto text-muted-foreground mb-3"
                    />
                    <p className="text-muted-foreground">
                      No orders yet. Place your first order!
                    </p>
                  </motion.div>
                ) : (
                  orders.map((order, orderIdx) => {
                    const displayStatus = getAutoProgressedStatus(order);
                    return (
                      <motion.div
                        key={order.orderId}
                        className="rounded-xl border border-border/50 overflow-hidden"
                        style={{ background: "#171C22" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: orderIdx * 0.08 }}
                        whileHover={{ borderColor: "rgba(242,154,46,0.35)" }}
                      >
                        <button
                          type="button"
                          className="w-full p-4 text-left"
                          onClick={() =>
                            setExpanded(
                              expanded === order.orderId ? null : order.orderId,
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-orange">
                                #EW-{order.orderId.padStart(4, "0")}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {new Date(order.placedAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{
                                  background:
                                    getStepIndex(displayStatus) === 3
                                      ? "rgba(34,197,94,0.15)"
                                      : "rgba(242,154,46,0.15)",
                                  color:
                                    getStepIndex(displayStatus) === 3
                                      ? "#22c55e"
                                      : "#F29A2E",
                                }}
                              >
                                {displayStatus}
                              </span>
                              <p className="text-sm font-bold text-foreground mt-1">
                                ₹{order.grandTotal}
                              </p>
                            </div>
                          </div>

                          <TrackingBar status={displayStatus} />
                        </button>

                        <AnimatePresence>
                          {expanded === order.orderId && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-4 pb-4 border-t border-border/30 overflow-hidden"
                            >
                              <div className="pt-3 space-y-2">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                  Order Items
                                </p>
                                {order.items.map((item, i) => (
                                  <div
                                    key={`${item.name}-${i}`}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-foreground">
                                      {item.name}{" "}
                                      <span className="text-muted-foreground">
                                        x{item.quantity}
                                      </span>
                                    </span>
                                    <span className="text-foreground">
                                      ₹{item.price * item.quantity}
                                    </span>
                                  </div>
                                ))}
                                <div className="border-t border-border/30 pt-2 space-y-1">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal}</span>
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Delivery</span>
                                    <span>₹{order.deliveryFee}</span>
                                  </div>
                                  {order.discount > 0 && (
                                    <div className="flex justify-between text-xs text-green-500">
                                      <span>Discount ({order.promoCode})</span>
                                      <span>-₹{order.discount}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between text-sm font-bold">
                                    <span>Total</span>
                                    <span className="text-orange">
                                      ₹{order.grandTotal}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                                  <MapPin size={12} />
                                  <span>
                                    {order.address}, {order.city}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock size={12} />
                                  <span>Payment: {order.payment}</span>
                                </div>
                                <div className="pt-2 border-t border-border/30">
                                  {displayStatus !== "Delivered" &&
                                    displayStatus !== "Cancelled" && (
                                      <button
                                        type="button"
                                        className="w-full text-xs font-semibold py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1.5"
                                        data-ocid={`orders.delete_button.${orderIdx + 1}`}
                                        onClick={() => {
                                          updateOrderStatusLocal(
                                            order.orderId,
                                            "Cancelled",
                                          );
                                          setOrders(loadOrders());
                                          const itemNames = order.items
                                            .map(
                                              (i) => `${i.name} x${i.quantity}`,
                                            )
                                            .join(", ");
                                          const msg = encodeURIComponent(
                                            `ORDER CANCELLATION - Order #EW-${order.orderId} has been cancelled by the customer. Order details: ${itemNames}. Please confirm cancellation.`,
                                          );
                                          window.open(
                                            `https://wa.me/919713225322?text=${msg}`,
                                            "_blank",
                                          );
                                          toast.success(
                                            "Order cancelled. Owner notified via WhatsApp.",
                                          );
                                        }}
                                      >
                                        <XCircle size={13} /> Cancel Order
                                      </button>
                                    )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
