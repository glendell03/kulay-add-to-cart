import {
  CartItemComponent,
  CartSummary,
  CheckoutModal,
  EmptyCartState,
} from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/hooks/use-cart";
import { type CartItem } from "@/stores/cart.store";
import { observer } from "@legendapp/state/react";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCartScreen } from "./cart-screen.hook";
import { cartScreenStyles } from "./cart-screen.styles";

const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const { items, summary, isEmpty } = useCart();
  const {
    clearCart,
    handleCheckout,
    handleConfirmCheckout,
    handleCloseModal,
    showCheckoutModal,
    isProcessing,
    calculateDiscountedTotal,
  } = useCartScreen();

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return <CartItemComponent item={item} />;
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className={cartScreenStyles.container()}
    >
      <View>
        <Text className={cartScreenStyles.headerTitle()}>Shopping Cart</Text>
      </View>

      {isEmpty ? (
        <EmptyCartState />
      ) : (
        <VStack className={cartScreenStyles.contentWithButtons()}>
          <HStack className={cartScreenStyles.mainContent()} space="lg">
            <View className={cartScreenStyles.itemsColumn()}>
              <FlashList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
              />
            </View>

            <View className={cartScreenStyles.summaryColumn()}>
              <CartSummary summary={summary} />
            </View>
          </HStack>

          <VStack space="sm" className={cartScreenStyles.bottomButtons()}>
            <Button
              action="primary"
              className={cartScreenStyles.checkoutButton()}
              onPress={handleCheckout}
            >
              <ButtonText>Checkout</ButtonText>
            </Button>

            <Button
              action="secondary"
              variant="outline"
              className={cartScreenStyles.clearButton()}
              onPress={clearCart}
            >
              <ButtonText>Clear Cart</ButtonText>
            </Button>
          </VStack>
        </VStack>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseModal}
        onConfirmCheckout={handleConfirmCheckout}
        isProcessing={isProcessing}
        summary={summary}
        calculateDiscountedTotal={calculateDiscountedTotal}
      />
    </View>
  );
};

export default observer(CartScreen);
