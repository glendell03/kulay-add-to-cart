import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cartStore } from "@/stores/cart.store";
import { observer } from "@legendapp/state/react";
import React from "react";
import type { CartItemComponentProps } from "../../screens/cart/cart-screen.types";
import { cartItemStyles } from "./cart-item.styles";

const CartItemComponent = ({ item }: CartItemComponentProps) => {
  return (
    <Card className={cartItemStyles.container()}>
      <VStack space="md" className={cartItemStyles.content()}>
        <HStack space="md" className="items-center">
          <Image
            alt={item.product.productName}
            source={{ uri: item.product.image }}
            size="sm"
            className={cartItemStyles.productImage()}
            resizeMode="cover"
          />

          <VStack className="flex-1" space="sm">
            <Text size="md" className={cartItemStyles.productName()}>
              {item.product.productName}
            </Text>
            <Text size="sm" className={cartItemStyles.productPrice()}>
              ${item.product.price.toFixed(2)} each
            </Text>
          </VStack>
        </HStack>

        <HStack className={cartItemStyles.quantityContainer()}>
          <HStack space="sm" className={cartItemStyles.quantityControls()}>
            <Button
              size="sm"
              variant="outline"
              onPress={() => {
                cartStore.updateQuantity(item.product.id, item.quantity - 1);
              }}
            >
              <ButtonText>-</ButtonText>
            </Button>

            <Text size="md" className={cartItemStyles.quantityText()}>
              {item.quantity}
            </Text>

            <Button
              size="sm"
              variant="outline"
              onPress={() => {
                cartStore.updateQuantity(item.product.id, item.quantity + 1);
              }}
            >
              <ButtonText>+</ButtonText>
            </Button>
          </HStack>

          <Text size="lg" className={cartItemStyles.totalPrice()}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
};

export default observer(CartItemComponent);
