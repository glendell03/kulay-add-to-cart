import { twMerge } from "tailwind-merge";

export const emptyStateStyles = {
  container: (className?: string) =>
    twMerge("flex-1 justify-center items-center p-8", className),

  title: (className?: string) =>
    twMerge("text-lg font-semibold text-gray-300", className),

  message: (className?: string) =>
    twMerge("text-center text-gray-500", className),
};
