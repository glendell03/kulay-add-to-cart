import { twMerge } from "tailwind-merge";

export const cartSummaryStyles = {
  card: (className?: string) =>
    twMerge("bg-background-0 border rounded-xl", className),

  row: (className?: string) =>
    twMerge("flex-row justify-between items-center", className),

  totalRow: (className?: string) =>
    twMerge(
      "flex-row justify-between items-center border-t pt-3 mt-3",
      className
    ),

  totalLabel: (className?: string) =>
    twMerge("text-lg font-bold text-white", className),

  totalAmount: (className?: string) => twMerge("text-xl font-bold", className),

  totalPrice: (className?: string) => twMerge("font-bold", className),
};
