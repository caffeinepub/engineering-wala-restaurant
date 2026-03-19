import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    available: boolean;
    category: string;
    price: bigint;
}
export interface CartItem {
    quantity: bigint;
    menuItemId: bigint;
}
export interface MenuItemInput {
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addMenuItem(input: MenuItemInput): Promise<bigint>;
    addToCart(menuItemId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getCart(): Promise<Array<CartItem>>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getOrderStatus(orderId: bigint): Promise<string>;
    placeOrder(address: string, paymentMethod: string): Promise<bigint>;
    setMenuItemAvailability(menuItemId: bigint, available: boolean): Promise<void>;
    updateOrderStatus(orderId: bigint, status: string): Promise<void>;
}
