import { Product } from "@/stores";
import { cartStore } from "@/stores/cart.store";
import { use$ } from "@legendapp/state/react";

export function useCart() {
  const items = use$(cartStore.state.items);
  const summary = use$(cartStore.state.summary);
  const isEmpty = use$(cartStore.state.isEmpty);
  const itemsCount = use$(cartStore.state.itemsCount);

  return {
    items,
    summary,
    isEmpty,
    itemsCount,

    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
  };
}

export function useProductCartStatus(productId: string) {
  const cartItems = use$(cartStore.state.items);

  const cartItem = cartItems?.find((item) => item.product.id === productId);
  const isInCart = Boolean(cartItem);
  const quantity = cartItem?.quantity ?? 0;

  return {
    isInCart,
    quantity,
    cartItem,

    addToCart: (product: Product, quantity: number = 1) => {
      cartStore.addItem(product, quantity);
    },
    removeFromCart: () => cartStore.removeItem(productId),
    updateQuantity: (quantity: number) =>
      cartStore.updateQuantity(productId, quantity),
  };
}
