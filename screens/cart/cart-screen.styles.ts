import { twMerge } from "tailwind-merge";

export const cartScreenStyles = {
  container: (className?: string) => twMerge("flex-1 bg-gray-900", className),

  header: (className?: string) => twMerge("p-4", className),

  headerTitle: (className?: string) =>
    twMerge("text-2xl font-bold text-white px-4 mb-4", className),

  content: (className?: string) => twMerge("flex-1 mx-4", className),

  contentWithButtons: (className?: string) => twMerge("flex-1", className),

  mainContent: (className?: string) =>
    twMerge("flex-1 mx-4 flex-row", className),

  itemsColumn: (className?: string) => twMerge("flex-1 mr-2", className),

  summaryColumn: (className?: string) => twMerge("flex-1 ml-2", className),

  checkoutButton: (className?: string) => twMerge("", className),

  clearButton: (className?: string) => twMerge("", className),

  bottomButtons: (className?: string) => twMerge("mx-4 mb-4 mt-4", className),

  flashListContent: (className?: string) => twMerge("pb-4", className),
};
