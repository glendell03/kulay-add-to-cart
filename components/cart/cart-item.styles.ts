import { twMerge } from "tailwind-merge";

export const cartItemStyles = {
  container: (className?: string) => twMerge("mb-4 rounded-xl", className),

  content: (className?: string) => twMerge("p-4", className),

  productImage: (className?: string) => twMerge("rounded-lg", className),

  productName: (className?: string) =>
    twMerge("text-white font-semibold", className),

  productPrice: (className?: string) => twMerge("text-gray-400", className),

  quantityContainer: (className?: string) =>
    twMerge("items-center justify-between", className),

  quantityControls: (className?: string) => twMerge("items-center", className),

  quantityButton: (className?: string) => twMerge("min-w-8 h-8", className),

  quantityText: (className?: string) =>
    twMerge("text-white font-bold mx-3 min-w-[30px] text-center", className),

  totalPrice: (className?: string) => twMerge("font-bold", className),
};
