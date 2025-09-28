import { ProductCard, ProductSkeleton } from "@/components/product-card";
import { EmptyState, ErrorState } from "@/components/products";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/stores/products.store";
import { observer, Show } from "@legendapp/state/react";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProductsScreen } from "./products-screen.hook";
import { productsScreenStyles } from "./products-screen.styles";

const ProductsScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const { products, isLoading, error } = useProducts();
  const { numColumns, itemWidth } = useProductsScreen();

  const renderLoadingItems = () => (
    <View
      style={productsScreenStyles.loadingItemContainer(itemWidth)}
      className={productsScreenStyles.productItem()}
    >
      <ProductSkeleton />
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View
      key={item.id}
      style={productsScreenStyles.productItemContainer(itemWidth)}
      className={productsScreenStyles.productItem()}
    >
      <ProductCard product={item} />
    </View>
  );

  return (
    <View
      className={productsScreenStyles.container()}
      style={{ paddingTop: insets.top }}
    >
      <Show if={error}>{() => <ErrorState />}</Show>

      <Show if={() => isLoading && !error}>
        {() => (
          <FlashList
            data={Array.from({ length: 10 }, (_, index) => index)}
            renderItem={renderLoadingItems}
            numColumns={numColumns}
            key={`loading-${numColumns}`}
            contentContainerStyle={productsScreenStyles.flashListContent}
          />
        )}
      </Show>

      <Show if={() => !isLoading && !error}>
        {() => (
          <FlashList
            data={products}
            renderItem={renderProduct}
            numColumns={numColumns}
            key={`products-${numColumns}`}
            contentContainerStyle={productsScreenStyles.flashListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyState />}
            removeClippedSubviews={true}
          />
        )}
      </Show>
    </View>
  );
});

export default ProductsScreen;
