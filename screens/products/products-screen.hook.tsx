import { useMemo } from "react";
import { Dimensions } from "react-native";
import type { UseProductsScreenReturn } from "./products-screen.types";

const { width: screenWidth } = Dimensions.get("window");

export function useProductsScreen(): UseProductsScreenReturn {
  const { numColumns, itemWidth } = useMemo(() => {
    const cols = Math.floor(screenWidth / 300);
    const width = (screenWidth - 32) / cols - 16;
    return {
      numColumns: cols,
      itemWidth: width,
    };
  }, []);

  return {
    numColumns,
    itemWidth,
  };
}
