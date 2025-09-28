export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCheckout: () => void;
  isProcessing: boolean;
  summary: {
    uniqueProducts: number;
    totalItems: number;
    totalPrice: number;
  };
  calculateDiscountedTotal: (originalTotal: number) => number;
}
