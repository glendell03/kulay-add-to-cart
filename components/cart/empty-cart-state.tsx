import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { memo } from "react";
import { View } from "react-native";
import { emptyCartStateStyles } from "./empty-cart-state.styles";

const EmptyCartState = () => {
  return (
    <View className={emptyCartStateStyles.container()}>
      <VStack space="md" className="items-center">
        <Text className={emptyCartStateStyles.title()}>Your cart is empty</Text>
        <Text className={emptyCartStateStyles.subtitle()}>
          Add some products to get started
        </Text>
      </VStack>
    </View>
  );
};

export default memo(EmptyCartState);
