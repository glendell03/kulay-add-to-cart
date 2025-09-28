import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { memo } from "react";
import { View } from "react-native";
import { emptyStateStyles } from "./empty-state.styles";

const EmptyState = () => {
  return (
    <View className={emptyStateStyles.container()}>
      <VStack space="md" className="items-center">
        <Text className={emptyStateStyles.title()}>No Products Found</Text>
        <Text className={emptyStateStyles.message()}>
          We could not find any products to display.
        </Text>
      </VStack>
    </View>
  );
};

export default memo(EmptyState);
