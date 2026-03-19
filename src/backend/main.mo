import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  // Types
  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    available : Bool;
  };

  type CartItem = {
    menuItemId : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    userId : Principal;
    items : [CartItem];
    address : Text;
    paymentMethod : Text;
    status : Text;
    timestamp : Int;
  };

  type Feedback = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type MenuItemInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
  };

  type FeedbackInput = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  type Cart = Map.Map<Nat, CartItem>;

  // Storage
  let menuItems = Map.empty<Nat, MenuItem>();
  let carts = Map.empty<Principal, Cart>();
  let orders = Map.empty<Nat, Order>();
  let feedbacks = Map.empty<Nat, Feedback>();

  var nextMenuItemId = 1;
  var nextOrderId = 1;
  var nextFeedbackId = 1;

  // MenuItem Module
  module MenuItem {
    public func compare(a : MenuItem, b : MenuItem) : Order.Order {
      switch (Text.compare(a.category, b.category)) {
        case (#equal) { Text.compare(a.name, b.name) };
        case (order) { order };
      };
    };
  };

  // Cart Functions
  public shared ({ caller }) func addToCart(menuItemId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1.") };

    let userCart = switch (carts.get(caller)) {
      case (null) { Map.empty<Nat, CartItem>() };
      case (?existingCart) { existingCart };
    };

    if (userCart.containsKey(menuItemId)) {
      switch (userCart.get(menuItemId)) {
        case (null) { Runtime.trap("Unexpected error: Item should exist in cart.") };
        case (?existingItem) {
          let updatedItem : CartItem = {
            menuItemId;
            quantity = existingItem.quantity + quantity;
          };
          userCart.add(menuItemId, updatedItem);
        };
      };
    } else {
      let newItem : CartItem = {
        menuItemId;
        quantity;
      };
      userCart.add(menuItemId, newItem);
    };

    carts.add(caller, userCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  // Order Functions
  public shared ({ caller }) func placeOrder(
    address : Text,
    paymentMethod : Text,
  ) : async Nat {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty.") };
      case (?cart) {
        if (cart.isEmpty()) { Runtime.trap("Cart is empty.") };
        cart;
      };
    };

    let cartItemsArr = cart.entries().map(func((id, item)) { item }).toArray();

    let newOrder : Order = {
      id = nextOrderId;
      userId = caller;
      items = cartItemsArr;
      address;
      paymentMethod;
      status = "Pending";
      timestamp = Time.now();
    };

    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;

    carts.remove(caller);

    newOrder.id;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : Text) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist.") };
      case (?order) {
        let updatedOrder : Order = { order with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  // Feedback
  public shared func submitFeedback(input : FeedbackInput) : async Nat {
    let fb : Feedback = {
      id = nextFeedbackId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      message = input.message;
      timestamp = Time.now();
    };
    feedbacks.add(nextFeedbackId, fb);
    nextFeedbackId += 1;
    fb.id;
  };

  // Menu Management
  public shared ({ caller }) func addMenuItem(input : MenuItemInput) : async Nat {
    let newItem : MenuItem = {
      id = nextMenuItemId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      available = true;
    };

    menuItems.add(nextMenuItemId, newItem);
    nextMenuItemId += 1;
    newItem.id;
  };

  public shared ({ caller }) func setMenuItemAvailability(menuItemId : Nat, available : Bool) : async () {
    switch (menuItems.get(menuItemId)) {
      case (null) { Runtime.trap("Item does not exist.") };
      case (?item) {
        let updatedItem : MenuItem = { item with available };
        menuItems.add(menuItemId, updatedItem);
      };
    };
  };

  // Queries
  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?userCart) {
        userCart.values().toArray();
      };
    };
  };

  public query ({ caller }) func getOrderStatus(orderId : Nat) : async Text {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist.") };
      case (?order) { order.status };
    };
  };

  public query func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public query func getAllFeedback() : async [Feedback] {
    feedbacks.values().toArray();
  };
};
