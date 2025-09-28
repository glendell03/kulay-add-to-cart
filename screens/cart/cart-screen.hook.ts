import { cartStore } from "@/stores/cart.store";
import { useCallback, useState } from "react";
import type { UseCartScreenReturn } from "./cart-screen.types";

export function useCartScreen(): UseCartScreenReturn {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.updateQuantity(productId, quantity);
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartStore.removeItem(productId);
  }, []);

  const clearCart = useCallback(() => {
    cartStore.clearCart();
  }, []);

  const applyDiscount = useCallback((voucherCode: string | null) => {
    if (voucherCode) {
      return cartStore.applyDiscount(voucherCode);
    } else {
      cartStore.removeDiscount();
      return true;
    }
  }, []);

  const calculateDiscountedTotal = useCallback((originalTotal: number) => {
    return cartStore.calculateDiscountedTotal(originalTotal);
  }, []);

  const appliedDiscount = cartStore.getAppliedDiscount();

  const handleCheckout = useCallback(() => {
    setShowCheckoutModal(true);
  }, []);

  const handleConfirmCheckout = useCallback(async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    cartStore.clearCart();
    setShowCheckoutModal(false);
    setIsProcessing(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (!isProcessing) {
      setShowCheckoutModal(false);
    }
  }, [isProcessing]);

  return {
    updateQuantity,
    removeItem,
    clearCart,
    handleCheckout,
    handleConfirmCheckout,
    handleCloseModal,
    showCheckoutModal,
    isProcessing,
    applyDiscount,
    appliedDiscount,
    calculateDiscountedTotal,
  };
}
