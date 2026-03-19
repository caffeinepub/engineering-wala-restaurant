# Engineering Wala

## Current State
Fully deployed restaurant website with menu, cart, checkout, reviews, special offers, WhatsApp button, and owner details. Navigation links (Menu, About, Contact) scroll to sections. Footer quick links scroll to sections. No owner panel. No promo code system. Feedback form does not send WhatsApp notification. "Bhavarkua" spelling in Header and ContactSection. Backend stores menu items, cart, and orders.

## Requested Changes (Diff)

### Add
- **Owner Panel** at route `/owner` (hash-based): password-protected page (password: `aadarshshukla8800`) showing all orders and all feedback in tables. Owner can update order status. Separate shareable link.
- **Promo/Referral Code field** in CheckoutModal (address step): auto-validates as user types. Valid codes show discount applied. Invalid codes show "Sorry, your referral code is invalid." Discount codes: `EW10` (10% off), `ENGINEER20` (20% off), `WALA15` (15% off), `FIRSTORDER` (₹50 off), `SPECIAL25` (25% off).
- **WhatsApp notification on order placed**: After order confirmed, open WhatsApp to 9713225322 with full order details (items, address, payment method, total).
- **WhatsApp notification on feedback submit**: ContactSection form submission opens WhatsApp to 9713225322 with full feedback details.
- **Feedback storage** in backend: `submitFeedback` stores name, phone, email, message, timestamp.
- **Backend queries** `getAllOrders` and `getAllFeedback` for owner panel.
- **Quantity/serving info** added to every dish in menuData descriptions (e.g. "Serves 1 | 2 pieces").

### Modify
- Fix "Bhavarkua" → "Bhawarkua" in Header.tsx subtitle, ContactSection.tsx address text and map URL.
- App.tsx: add hash-based routing to render OwnerPanel at `#/owner`, else render main site.
- CheckoutModal: add promo code input field, show discount in price summary, pass discounted total to order.
- ContactSection: on form submit, open WhatsApp with feedback details to 9713225322 (instead of just resetting).
- Footer Quick Links: already scroll to sections -- keep as-is (they work).
- Header nav links: already scroll to sections -- keep as-is (they work). Also fix "Bhavarkua" in subtitle.

### Remove
- Nothing removed.

## Implementation Plan
1. Update backend (main.mo): add `Feedback` type, `submitFeedback`, `getAllFeedback`, `getAllOrders` functions.
2. Update menuData.ts: add serving/quantity info to each dish description.
3. Update Header.tsx: fix "Bhavarkua" → "Bhawarkua".
4. Update ContactSection.tsx: fix address text + map URL + WhatsApp notification on submit.
5. Update CheckoutModal.tsx: add promo code field with real-time validation, discount calculation, pass final total.
6. Update CheckoutModal confirmation step: trigger WhatsApp message to 9713225322 with order details.
7. Create OwnerPanel.tsx: password gate (aadarshshukla8800), tabs for Orders and Feedback, update order status.
8. Update App.tsx: hash-based routing for `#/owner` → OwnerPanel; update handlePlaceOrder to pass cart items for WhatsApp message.
