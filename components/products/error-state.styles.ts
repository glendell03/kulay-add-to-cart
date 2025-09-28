import { twMerge } from "tailwind-merge";

export const errorStateStyles = {
  container: (className?: string) =>
    twMerge("flex-1 justify-center items-center p-4", className),

  title: (className?: string) =>
    twMerge("text-lg font-semibold text-red-400", className),

  message: (className?: string) =>
    twMerge("text-center text-gray-400", className),
};
