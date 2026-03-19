import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { MenuItem } from "./backend";
import { MENU_ITEMS } from "./data/menuData";
import { useActor } from "./hooks/useActor";
import {
  useAddMenuItem,
  useAddToCart,
  useCart,
  useMenuItems,
  usePlaceOrder,
} from "./hooks/useQueries";

import AboutSection from "./components/AboutSection";
import CartSidebar, { type CartDisplayItem } from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import ContactSection from "./components/ContactSection";
import CustomerReviewsSection from "./components/CustomerReviewsSection";
import FeaturesStrip from "./components/FeaturesStrip";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import OwnerPanel from "./components/OwnerPanel";
import OwnerSection from "./components/OwnerSection";
import SpecialOffersSection from "./components/SpecialOffersSection";
import WhatsAppButton from "./components/WhatsAppButton";

function getPage() {
  return window.location.hash === "#/owner" ? "owner" : "main";
}

export default function App() {
  const { actor, isFetching } = useActor();
  const { data: menuItems = [], isLoading: menuLoading } = useMenuItems();
  const { data: cartItems = [] } = useCart();
  const addToCartMutation = useAddToCart();
  const placeOrderMutation = usePlaceOrder();
  const addMenuItemMutation = useAddMenuItem();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(getPage);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addingIds, setAddingIds] = useState<Set<string>>(new Set());
  const [localCart, setLocalCart] = useState<Map<string, number>>(new Map());
  const [seeded, setSeeded] = useState(false);

  // Listen for hash changes to switch between main site and owner panel
  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const mutateAsync = addMenuItemMutation.mutateAsync;
  const invalidateQueries = queryClient.invalidateQueries.bind(queryClient);

  // Seed menu items
  useEffect(() => {
    if (!actor || isFetching || menuLoading || seeded) return;
    if (menuItems.length === 0) {
      setSeeded(true);
      const seedAll = async () => {
        try {
          await Promise.all(
            MENU_ITEMS.map((item) =>
              mutateAsync({
                name: item.name,
                description: item.description,
                category: item.category,
                price: BigInt(item.price),
              }),
            ),
          );
          invalidateQueries({ queryKey: ["menuItems"] });
          toast.success("Menu loaded!");
        } catch (e) {
          console.error("Seeding failed:", e);
        }
      };
      seedAll();
    } else {
      setSeeded(true);
    }
  }, [
    actor,
    isFetching,
    menuLoading,
    menuItems.length,
    seeded,
    mutateAsync,
    invalidateQueries,
  ]);

  // Sync local cart from backend cart
  useEffect(() => {
    const map = new Map<string, number>();
    for (const ci of cartItems) {
      map.set(String(ci.menuItemId), Number(ci.quantity));
    }
    setLocalCart(map);
  }, [cartItems]);

  const handleAddToCart = useCallback(
    async (item: MenuItem) => {
      const id = String(item.id);
      setAddingIds((prev) => new Set(prev).add(id));
      setLocalCart((prev) => {
        const next = new Map(prev);
        next.set(id, (next.get(id) ?? 0) + 1);
        return next;
      });
      try {
        await addToCartMutation.mutateAsync({
          menuItemId: item.id,
          quantity: 1n,
        });
        toast.success(`${item.name} added to cart!`);
      } catch {
        setLocalCart((prev) => {
          const next = new Map(prev);
          const curr = next.get(id) ?? 1;
          if (curr <= 1) next.delete(id);
          else next.set(id, curr - 1);
          return next;
        });
        toast.error("Failed to add item");
      } finally {
        setAddingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [addToCartMutation],
  );

  const handleIncrement = useCallback(
    async (itemId: bigint) => {
      const id = String(itemId);
      setLocalCart((prev) => {
        const next = new Map(prev);
        next.set(id, (next.get(id) ?? 0) + 1);
        return next;
      });
      try {
        await addToCartMutation.mutateAsync({
          menuItemId: itemId,
          quantity: 1n,
        });
      } catch {
        setLocalCart((prev) => {
          const next = new Map(prev);
          const curr = next.get(id) ?? 1;
          if (curr <= 1) next.delete(id);
          else next.set(id, curr - 1);
          return next;
        });
      }
    },
    [addToCartMutation],
  );

  const handleDecrement = useCallback(
    async (itemId: bigint) => {
      const id = String(itemId);
      const current = localCart.get(id) ?? 0;
      if (current <= 1) {
        setLocalCart((prev) => {
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
      } else {
        setLocalCart((prev) => {
          const next = new Map(prev);
          next.set(id, current - 1);
          return next;
        });
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }, 500);
    },
    [localCart, queryClient],
  );

  const cartDisplayItems: CartDisplayItem[] = [];
  for (const [id, qty] of localCart) {
    const menuItem = menuItems.find((m) => String(m.id) === id);
    if (menuItem && qty > 0) {
      cartDisplayItems.push({ menuItem, quantity: qty });
    }
  }

  const cartTotal = cartDisplayItems.reduce(
    (sum, i) => sum + Number(i.menuItem.price) * i.quantity,
    0,
  );
  const cartCount = cartDisplayItems.reduce((s, i) => s + i.quantity, 0);

  const checkoutCartItems = cartDisplayItems.map((i) => ({
    name: i.menuItem.name,
    price: Number(i.menuItem.price),
    quantity: i.quantity,
  }));

  const handlePlaceOrder = async (address: string, paymentMethod: string) => {
    const orderId = await placeOrderMutation.mutateAsync({
      address,
      paymentMethod,
    });
    setLocalCart(new Map());
    return orderId;
  };

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  if (page === "owner") {
    return (
      <>
        <Toaster position="top-right" />
        <OwnerPanel />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0B0F14" }}>
      <Toaster position="top-right" />

      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <HeroSection
          onOrderNow={() => {
            scrollToMenu();
            setCartOpen(false);
          }}
          onViewMenu={scrollToMenu}
        />

        <SpecialOffersSection />

        <FeaturesStrip />

        <MenuSection
          menuItems={menuItems}
          localMenu={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          addingIds={addingIds}
        />

        <AboutSection />

        <CustomerReviewsSection />

        <ContactSection />
      </main>

      <OwnerSection />

      <Footer />

      <WhatsAppButton />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartDisplayItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={cartTotal}
        cartItems={checkoutCartItems}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
