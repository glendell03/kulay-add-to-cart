import { twMerge } from "tailwind-merge";

export const emptyCartStateStyles = {
  container: (className?: string) =>
    twMerge("flex-1 justify-center items-center px-4", className),

  title: (className?: string) =>
    twMerge("text-xl text-gray-400 text-center mb-2", className),

  subtitle: (className?: string) =>
    twMerge("text-base text-gray-500 text-center", className),
};
