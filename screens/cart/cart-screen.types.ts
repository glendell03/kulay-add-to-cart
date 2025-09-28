import type { CartItem, CartSummary } from "@/stores/cart.store";

export interface UseCartScreenReturn {
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  handleCheckout: () => void;
  handleConfirmCheckout: () => void;
  handleCloseModal: () => void;
  showCheckoutModal: boolean;
  isProcessing: boolean;
  applyDiscount: (voucherCode: string | null) => boolean;
  appliedDiscount: { code: string; percentage: number } | null;
  calculateDiscountedTotal: (originalTotal: number) => number;
}

export interface CartItemComponentProps {
  item: CartItem;
}

export interface CartSummaryProps {
  summary: CartSummary;
}
