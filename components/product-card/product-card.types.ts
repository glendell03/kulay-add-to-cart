import type { Product } from "../../stores/products.store";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export type UseProductCardProps = Omit<ProductCardProps, "className">;

export interface UseProductCardReturn {
  formattedPrice: string;
}
