import { useMemo } from "react";
import type {
  UseProductCardProps,
  UseProductCardReturn,
} from "./product-card.types";

export const useProductCard = ({
  product,
}: UseProductCardProps): UseProductCardReturn => {
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.price),
    [product.price]
  );

  return {
    formattedPrice,
  };
};
