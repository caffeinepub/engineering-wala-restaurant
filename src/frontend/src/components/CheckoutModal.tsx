import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Loader2,
  MapPin,
  Smartphone,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface CartItemDisplay {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  cartItems: CartItemDisplay[];
  onPlaceOrder: (address: string, paymentMethod: string) => Promise<bigint>;
}

type Step = "address" | "payment" | "confirmation";
type PaymentMethod = "UPI" | "Card" | "COD";

const QR_PATTERN = [
  1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0,
];
const QR_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
];

const PROMO_CODES: Record<string, { type: "percent" | "flat"; value: number }> =
  {
    EW10: { type: "percent", value: 10 },
    ENGINEER20: { type: "percent", value: 20 },
    WALA15: { type: "percent", value: 15 },
    FIRSTORDER: { type: "flat", value: 50 },
    SPECIAL25: { type: "percent", value: 25 },
  };

export default function CheckoutModal({
  isOpen,
  onClose,
  total,
  cartItems,
  onPlaceOrder,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    type: "percent" | "flat";
    value: number;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "Indore",
  });
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const deliveryFee = 40;

  const discountAmount = appliedPromo
    ? appliedPromo.type === "percent"
      ? Math.round((total * appliedPromo.value) / 100)
      : appliedPromo.value
    : 0;

  const grandTotal = total + deliveryFee - discountAmount;

  const promoStatus: "idle" | "valid" | "invalid" = (() => {
    if (promoCode.length < 3) return "idle";
    const key = promoCode.toUpperCase();
    return PROMO_CODES[key] ? "valid" : "invalid";
  })();

  const handlePromoChange = (val: string) => {
    setPromoCode(val);
    const key = val.toUpperCase();
    if (PROMO_CODES[key]) {
      setAppliedPromo(PROMO_CODES[key]);
    } else {
      setAppliedPromo(null);
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const fullAddress = `${form.name}, ${form.address}, ${form.city} - ${form.pincode}, Phone: ${form.phone}`;
      const id = await onPlaceOrder(fullAddress, paymentMethod);
      setOrderId(id);
      setStep("confirmation");

      // Send WhatsApp notification to owner
      const phone = "919713225322";
      const itemsList = cartItems
        .map((i) => `  • ${i.name} x${i.quantity} = ₹${i.price * i.quantity}`)
        .join("\n");
      const msg = [
        `🍽️ NEW ORDER #EW-${String(id).padStart(4, "0")}`,
        "",
        `Customer: ${form.name}`,
        `Phone: ${form.phone}`,
        `Address: ${form.address}, ${form.city} - ${form.pincode}`,
        `Payment: ${paymentMethod}`,
        "",
        "Items:",
        itemsList,
        "",
        `Subtotal: ₹${total}`,
        `Delivery: ₹${deliveryFee}`,
        ...(discountAmount > 0
          ? [`Promo (${promoCode.toUpperCase()}): -₹${discountAmount}`]
          : []),
        `Grand Total: ₹${grandTotal}`,
        "",
        "Please confirm the order!",
      ].join("\n");
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlacing(false);
    }
  };

  const handleClose = () => {
    setStep("address");
    setOrderId(null);
    setPromoCode("");
    setAppliedPromo(null);
    onClose();
  };

  const stepNumber = step === "address" ? 1 : step === "payment" ? 2 : 3;

  const addressFields = [
    { key: "name", label: "Full Name", placeholder: "Your name" },
    { key: "phone", label: "Phone", placeholder: "+91 XXXXX XXXXX" },
    {
      key: "address",
      label: "Address",
      placeholder: "House/Flat, Street, Area",
    },
    { key: "pincode", label: "Pincode", placeholder: "452001" },
  ];

  const cardFields = [
    { key: "name", label: "Cardholder Name", placeholder: "Name on card" },
    { key: "number", label: "Card Number", placeholder: "1234 5678 9012 3456" },
  ];

  const cardSmallFields = [
    { key: "expiry", label: "Expiry", placeholder: "MM/YY" },
    { key: "cvv", label: "CVV", placeholder: "•••" },
  ];

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
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: "#0F1318",
                border: "1px solid rgba(242,154,46,0.2)",
              }}
              data-ocid="checkout.modal"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                <div>
                  <h2 className="font-display font-bold text-lg">Checkout</h2>
                  {step !== "confirmation" && (
                    <div className="flex items-center gap-2 mt-1">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              s <= stepNumber
                                ? "btn-orange"
                                : "border border-border text-muted-foreground"
                            }`}
                          >
                            {s}
                          </div>
                          {s < 3 && (
                            <div
                              className={`w-8 h-px ${s < stepNumber ? "bg-orange" : "bg-border"}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="checkout.close_button"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {step === "address" && (
                  <div className="space-y-4" data-ocid="checkout.panel">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <MapPin className="text-orange" size={16} /> Delivery
                      Address
                    </h3>
                    {addressFields.map((field) => (
                      <div key={field.key}>
                        <label
                          htmlFor={`addr-${field.key}`}
                          className="text-xs text-muted-foreground mb-1 block"
                        >
                          {field.label}
                        </label>
                        <input
                          id={`addr-${field.key}`}
                          type="text"
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none"
                          style={{
                            background: "#171C22",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          data-ocid={`checkout.${field.key}.input`}
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="addr-city"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        City
                      </label>
                      <input
                        id="addr-city"
                        type="text"
                        value={form.city}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, city: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none"
                        style={{
                          background: "#171C22",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        data-ocid="checkout.city.input"
                      />
                    </div>

                    {/* Promo Code */}
                    <div>
                      <label
                        htmlFor="promo-code"
                        className="text-xs text-muted-foreground mb-1 block flex items-center gap-1"
                      >
                        <Tag size={12} /> Promo / Referral Code (Optional)
                      </label>
                      <input
                        id="promo-code"
                        type="text"
                        placeholder="Enter code e.g. EW10"
                        value={promoCode}
                        onChange={(e) => handlePromoChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground outline-none"
                        style={{
                          background: "#171C22",
                          border: `1px solid ${
                            promoStatus === "valid"
                              ? "rgba(34,197,94,0.5)"
                              : promoStatus === "invalid"
                                ? "rgba(239,68,68,0.5)"
                                : "rgba(255,255,255,0.1)"
                          }`,
                        }}
                        data-ocid="checkout.promo.input"
                      />
                      {promoStatus === "valid" && appliedPromo && (
                        <p className="text-xs text-green-500 mt-1 font-medium">
                          ✓ Code applied!{" "}
                          {appliedPromo.type === "percent"
                            ? `${appliedPromo.value}% off`
                            : `₹${appliedPromo.value} off`}
                        </p>
                      )}
                      {promoStatus === "invalid" && (
                        <p
                          className="text-xs text-red-500 mt-1"
                          data-ocid="checkout.promo.error_state"
                        >
                          Sorry, your referral code is invalid
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep("payment")}
                      disabled={
                        !form.name ||
                        !form.phone ||
                        !form.address ||
                        !form.pincode
                      }
                      className="btn-orange w-full py-3 rounded-xl font-bold disabled:opacity-50"
                      data-ocid="checkout.continue.primary_button"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                )}

                {step === "payment" && (
                  <div className="space-y-4" data-ocid="checkout.payment.panel">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <CreditCard className="text-orange" size={16} /> Payment
                      Method
                    </h3>

                    {(
                      [
                        {
                          id: "UPI",
                          label: "UPI / QR Code",
                          icon: Smartphone,
                          desc: "Scan to pay instantly",
                        },
                        {
                          id: "Card",
                          label: "Debit / Credit Card",
                          icon: CreditCard,
                          desc: "Visa, Mastercard, RuPay",
                        },
                        {
                          id: "COD",
                          label: "Cash on Delivery",
                          icon: Banknote,
                          desc: "Pay when delivered",
                        },
                      ] as const
                    ).map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          paymentMethod === pm.id
                            ? "border-orange/50"
                            : "border-border/50 hover:border-orange/30"
                        }`}
                        style={{
                          background:
                            paymentMethod === pm.id
                              ? "rgba(242,154,46,0.08)"
                              : "#171C22",
                        }}
                        data-ocid={`checkout.payment.${pm.id.toLowerCase()}.toggle`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            paymentMethod === pm.id
                              ? "btn-orange"
                              : "border border-border"
                          }`}
                        >
                          <pm.icon size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {pm.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pm.desc}
                          </p>
                        </div>
                      </button>
                    ))}

                    {paymentMethod === "UPI" && (
                      <div
                        className="p-4 rounded-xl border border-border/50 text-center"
                        style={{ background: "#171C22" }}
                      >
                        <div
                          className="w-24 h-24 mx-auto rounded-lg grid grid-cols-5 gap-0.5 p-2"
                          style={{ background: "white" }}
                        >
                          {QR_PATTERN.map((val, i) => (
                            <div
                              key={QR_KEYS[i]}
                              className="w-3 h-3 rounded-sm"
                              style={{
                                background: val ? "#0B0F14" : "transparent",
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-white text-xs font-bold">
                          Scan to Pay
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          UPI ID: engineeringwala@upi
                        </p>
                        <p className="text-sm font-bold text-orange mt-1">
                          ₹{grandTotal}
                        </p>
                      </div>
                    )}

                    {paymentMethod === "Card" && (
                      <div
                        className="space-y-3 p-4 rounded-xl border border-border/50"
                        style={{ background: "#171C22" }}
                      >
                        {cardFields.map((f) => (
                          <div key={f.key}>
                            <label
                              htmlFor={`card-${f.key}`}
                              className="text-xs text-muted-foreground mb-1 block"
                            >
                              {f.label}
                            </label>
                            <input
                              id={`card-${f.key}`}
                              type="text"
                              placeholder={f.placeholder}
                              value={cardForm[f.key as keyof typeof cardForm]}
                              onChange={(e) =>
                                setCardForm((prev) => ({
                                  ...prev,
                                  [f.key]: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg text-sm text-foreground outline-none"
                              style={{
                                background: "#0B0F14",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }}
                              data-ocid={`checkout.card.${f.key}.input`}
                            />
                          </div>
                        ))}
                        <div className="grid grid-cols-2 gap-3">
                          {cardSmallFields.map((f) => (
                            <div key={f.key}>
                              <label
                                htmlFor={`card-${f.key}`}
                                className="text-xs text-muted-foreground mb-1 block"
                              >
                                {f.label}
                              </label>
                              <input
                                id={`card-${f.key}`}
                                type="text"
                                placeholder={f.placeholder}
                                value={cardForm[f.key as keyof typeof cardForm]}
                                onChange={(e) =>
                                  setCardForm((prev) => ({
                                    ...prev,
                                    [f.key]: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-2 rounded-lg text-sm text-foreground outline-none"
                                style={{
                                  background: "#0B0F14",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                }}
                                data-ocid={`checkout.card.${f.key}.input`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {paymentMethod === "COD" && (
                      <div
                        className="p-4 rounded-xl border border-green-500/20 text-center"
                        style={{ background: "rgba(34,197,94,0.05)" }}
                      >
                        <Banknote
                          className="mx-auto text-green-500 mb-2"
                          size={32}
                        />
                        <p className="text-sm text-foreground font-medium">
                          Pay ₹{grandTotal} in cash when your order arrives
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Keep exact change ready!
                        </p>
                      </div>
                    )}

                    <div
                      className="p-3 rounded-xl border border-border/50"
                      style={{ background: "rgba(242,154,46,0.04)" }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Order Total
                        </span>
                        <span className="text-foreground">₹{total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-foreground">₹{deliveryFee}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-500">
                            Promo Discount ({promoCode.toUpperCase()})
                          </span>
                          <span className="text-green-500">
                            -₹{discountAmount}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold border-t border-border/50 pt-2 mt-2">
                        <span>Grand Total</span>
                        <span className="text-orange">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isPlacing}
                      className="btn-orange w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      data-ocid="checkout.place_order.primary_button"
                    >
                      {isPlacing ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Placing
                          Order...
                        </>
                      ) : (
                        `Place Order - ₹${grandTotal}`
                      )}
                    </button>
                  </div>
                )}

                {step === "confirmation" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                    data-ocid="checkout.success_state"
                  >
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: "rgba(34,197,94,0.1)" }}
                    >
                      <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-2">
                      Order Placed! 🎉
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Your food is being engineered to perfection.
                    </p>

                    <div
                      className="p-4 rounded-xl border border-orange/20 mb-4"
                      style={{ background: "rgba(242,154,46,0.05)" }}
                    >
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="text-xl font-bold text-orange">
                        #EW-
                        {orderId ? String(orderId).padStart(4, "0") : "0001"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div
                        className="p-3 rounded-xl border border-border/50"
                        style={{ background: "#171C22" }}
                      >
                        <p className="text-xs text-muted-foreground">
                          Estimated Delivery
                        </p>
                        <p className="font-bold text-foreground">30-45 mins</p>
                      </div>
                      <div
                        className="p-3 rounded-xl border border-border/50"
                        style={{ background: "#171C22" }}
                      >
                        <p className="text-xs text-muted-foreground">Payment</p>
                        <p className="font-bold text-foreground">
                          {paymentMethod}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      Delivering to:{" "}
                      <span className="text-foreground">
                        {form.address}, {form.city}
                      </span>
                    </p>
                    <p className="text-xs text-green-500 mb-4">
                      ✓ Order details sent to owner via WhatsApp
                    </p>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-orange px-8 py-3 rounded-xl font-bold"
                      data-ocid="checkout.confirm_button"
                    >
                      Track Your Order
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
