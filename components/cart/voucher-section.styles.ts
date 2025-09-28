import { twMerge } from "tailwind-merge";

export const voucherSectionStyles = {
  card: (className?: string) =>
    twMerge("bg-background-0 rounded-xl", className),

  inputContainer: (className?: string) =>
    twMerge("flex-row items-center gap-2", className),

  input: (className?: string) =>
    twMerge(
      "flex-1 border border-background-600 rounded-lg px-3 py-2 text-white",
      className
    ),
};
