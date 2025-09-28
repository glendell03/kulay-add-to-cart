import { cartStore } from "@/stores";
import { productsStore } from "@/stores/products.store";
import { use$ } from "@legendapp/state/react";
import { useEffect } from "react";

export function useProducts() {
  const products = use$(productsStore.state.products);
  const isLoading = use$(productsStore.state.isLoading);
  const error = use$(productsStore.state.error);

  useEffect(() => {
    productsStore.sync();
    const syncCart = async () => {
      await cartStore.sync();
    };

    syncCart();
  }, []);

  return {
    products,
    isLoading,
    error,
  };
}
