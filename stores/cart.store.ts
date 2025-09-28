import { batch, observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import type { Product } from "./products.store";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  uniqueProducts: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
}

export interface AppliedDiscount {
  code: string;
  percentage: number;
}

interface CartStoreState {
  items: CartItem[];
  summary: CartSummary;
  isEmpty: boolean;
  itemsCount: number;
  appliedDiscount: AppliedDiscount | null;
}

const cartStore$ = observable<CartStoreState>({
  items: [],
  summary: {
    totalItems: 0,
    totalPrice: 0,
    uniqueProducts: 0,
    subtotal: 0,
    discountAmount: 0,
    finalTotal: 0,
  },
  isEmpty: true,
  itemsCount: 0,
  appliedDiscount: null,
});

syncObservable(cartStore$.items, {
  persist: {
    plugin: ObservablePersistMMKV,
    name: "cart-items",
  },
});

syncObservable(cartStore$.appliedDiscount, {
  persist: {
    plugin: ObservablePersistMMKV,
    name: "cart-discount",
  },
});

const calculateSummary = (
  items: CartItem[],
  appliedDiscount: AppliedDiscount | null | undefined
): CartSummary => {
  const totalItems = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );
  const uniqueProducts = items.length;

  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount.percentage) / 100
    : 0;
  const finalTotal = subtotal - discountAmount;

  return {
    totalItems,
    totalPrice: subtotal,
    uniqueProducts,
    subtotal,
    discountAmount,
    finalTotal,
  };
};

const recalculateValues = () => {
  const items = cartStore$.items.peek() ?? [];
  const appliedDiscount = cartStore$.appliedDiscount.peek();

  batch(() => {
    if (items.length === 0 && appliedDiscount) {
      cartStore$.appliedDiscount.delete();
    }

    const currentDiscount = items.length === 0 ? null : appliedDiscount;
    const summary = calculateSummary(items, currentDiscount);

    cartStore$.summary.set(summary);
    cartStore$.isEmpty.set(items.length === 0);
    cartStore$.itemsCount.set(summary.totalItems);
  });
};

cartStore$.items.onChange(recalculateValues);
cartStore$.appliedDiscount.onChange(recalculateValues);

export const cartStore = {
  state: cartStore$,

  sync: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 50));

      const items = cartStore$.items.peek() ?? [];
      const appliedDiscount = cartStore$.appliedDiscount.peek();

      batch(() => {
        if (items.length === 0 && appliedDiscount) {
          cartStore$.appliedDiscount.delete();
        }

        const currentDiscount = items.length === 0 ? null : appliedDiscount;
        const summary = calculateSummary(items, currentDiscount);

        cartStore$.summary.set(summary);
        cartStore$.isEmpty.set(items.length === 0);
        cartStore$.itemsCount.set(summary.totalItems);
      });
    } catch (error) {
      console.error("Error syncing cart:", error);
    }

    return cartStore$.items;
  },

  addItem: (product: Product, quantity: number = 1) => {
    batch(() => {
      const items = cartStore$.items.peek() ?? [];
      const existingItemIndex = items.findIndex(
        (item: CartItem) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...items];
        const oldQuantity = updatedItems[existingItemIndex].quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: oldQuantity + quantity,
        };
        cartStore$.items.set(updatedItems);
      } else {
        const newItem: CartItem = {
          id: `cart-item-${product.id}-${Date.now()}`,
          product,
          quantity,
          addedAt: Date.now(),
        };
        const updatedItems = [...items, newItem];
        cartStore$.items.set(updatedItems);
      }
    });
  },

  removeItem: (productId: string) => {
    batch(() => {
      const items = cartStore$.items.peek() ?? [];
      const updatedItems = items.filter(
        (item: CartItem) => item.product.id !== productId
      );
      cartStore$.items.set(updatedItems);
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    batch(() => {
      const items = cartStore$.items.peek() ?? [];
      const index = items.findIndex(
        (item: CartItem) => item.product.id === productId
      );
      if (index >= 0) {
        if (quantity <= 0) {
          const updatedItems = items.filter(
            (item: CartItem) => item.product.id !== productId
          );
          cartStore$.items.set(updatedItems);
        } else {
          const updatedItems = [...items];
          updatedItems[index] = {
            ...updatedItems[index],
            quantity: quantity,
          };
          cartStore$.items.set(updatedItems);
        }
      }
    });
  },

  clearCart: () => {
    batch(() => {
      cartStore$.appliedDiscount.delete();
      cartStore$.items.set([]);
    });
  },

  applyDiscount: (voucherCode: string): boolean => {
    const validVouchers: { [key: string]: AppliedDiscount } = {
      DISCOUNT10: { code: "DISCOUNT10", percentage: 10 },
    };

    const upperVoucherCode = voucherCode.toUpperCase();
    const discount = validVouchers[upperVoucherCode];

    if (discount) {
      batch(() => {
        cartStore$.appliedDiscount.set(discount);
        const items = cartStore$.items.peek() ?? [];
        const summary = calculateSummary(items, discount);
        cartStore$.summary.set(summary);
      });
      return true;
    }

    return false;
  },

  removeDiscount: () => {
    batch(() => {
      cartStore$.appliedDiscount.delete();
      const items = cartStore$.items.peek() ?? [];
      const summary = calculateSummary(items, null);
      cartStore$.summary.set(summary);
    });
  },

  getItems: (): CartItem[] => cartStore$.items.peek() ?? [],
  getSummary: (): CartSummary => cartStore$.summary.peek(),
  getItemsCount: (): number => cartStore$.itemsCount.peek(),
  getIsEmpty: (): boolean => cartStore$.isEmpty.peek(),

  findItem: (productId: string): CartItem | undefined => {
    const items = cartStore$.items.peek();
    return items?.find((item: CartItem) => item.product.id === productId);
  },

  getAppliedDiscount: (): AppliedDiscount | null =>
    cartStore$.appliedDiscount.peek() ?? null,

  calculateDiscountedTotal: (originalTotal: number): number => {
    const appliedDiscount = cartStore$.appliedDiscount.peek();
    if (!appliedDiscount) return originalTotal;
    const discountAmount = (originalTotal * appliedDiscount.percentage) / 100;
    return originalTotal - discountAmount;
  },
};
