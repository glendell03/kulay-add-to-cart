import { twMerge } from "tailwind-merge";

export const productsScreenStyles = {
  container: (className?: string) => twMerge("flex-1 bg-gray-900", className),

  productItem: (className?: string) => twMerge("mb-4 mx-2", className),

  centerItems: (className?: string) => twMerge("items-center", className),

  productItemContainer: (itemWidth: number) => ({
    width: itemWidth,
    marginHorizontal: 8,
    marginBottom: 16,
  }),

  loadingItemContainer: (itemWidth: number) => ({
    width: itemWidth,
    marginHorizontal: 8,
    marginBottom: 16,
  }),

  flashListContent: {
    padding: 16,
  } as const,
};
