import { twMerge } from "tailwind-merge";

export const productCardStyles = {
  cardContainer: (className?: string) =>
    twMerge(
      "max-w-sm group active:scale-[0.98] transition-transform duration-200 h-full",
      className
    ),

  card: (className?: string) => twMerge("flex-1 h-full", className),

  imageContainer: (className?: string) =>
    twMerge("relative aspect-square overflow-hidden", className),

  productImage: (className?: string) =>
    twMerge(
      "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
      className
    ),

  badge: (className?: string) =>
    twMerge(
      "absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-md",
      className
    ),

  badgeText: (className?: string) =>
    twMerge("text-white font-medium", className),

  contentContainer: (className?: string) => twMerge("p-4 flex-1", className),

  productTitle: (className?: string) =>
    twMerge("line-clamp-2 min-h-[3rem]", className),

  productDescription: (className?: string) =>
    twMerge(
      "text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[4.5rem]",
      className
    ),

  priceContainer: (className?: string) =>
    twMerge("justify-between items-center mt-auto pt-3", className),
};
