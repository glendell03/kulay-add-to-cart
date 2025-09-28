import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { memo } from "react";
import { View } from "react-native";
import { errorStateStyles } from "./error-state.styles";

const ErrorState = () => {
  return (
    <View className={errorStateStyles.container()}>
      <VStack space="md" className="items-center">
        <Text className={errorStateStyles.title()}>Error Loading Products</Text>
        <Text className={errorStateStyles.message()}>
          Failed to load products
        </Text>
      </VStack>
    </View>
  );
};

export default memo(ErrorState);
