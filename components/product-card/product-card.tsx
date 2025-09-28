import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useProductCartStatus } from "@/hooks/use-cart";
import { Show, observer } from "@legendapp/state/react";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useProductCard } from "./product-card.hook";
import { productCardStyles } from "./product-card.styles";
import type { ProductCardProps } from "./product-card.types";

const ProductCardComponent = ({ product, className }: ProductCardProps) => {
  const { formattedPrice } = useProductCard({
    product,
  });

  const { isInCart, quantity, addToCart } = useProductCartStatus(product.id);

  return (
    <TouchableOpacity
      className={productCardStyles.cardContainer(className)}
      activeOpacity={0.95}
    >
      <Card className={productCardStyles.card()}>
        <Box className={productCardStyles.imageContainer()}>
          <Image
            alt={product.productName}
            source={{
              uri: product.image,
            }}
            className={productCardStyles.productImage()}
            resizeMode="cover"
          />

          <Box className={productCardStyles.badge()}>
            <Text size="xs" className={productCardStyles.badgeText()}>
              In Stock
            </Text>
          </Box>
        </Box>

        <VStack space="sm" className={productCardStyles.contentContainer()}>
          <Text
            size="md"
            bold
            className={productCardStyles.productTitle()}
            numberOfLines={2}
          >
            {product.productName}
          </Text>

          <Text
            size="sm"
            className={productCardStyles.productDescription()}
            numberOfLines={3}
          >
            {product.description}
          </Text>

          <HStack className={productCardStyles.priceContainer()}>
            <Text size="lg" bold>
              {formattedPrice}
            </Text>

            <Show
              if={() => !isInCart}
              else={() => (
                <HStack space="sm" className="items-center">
                  <Text size="sm" className="text-green-600">
                    In Cart ({quantity})
                  </Text>
                  <Button
                    onPress={() => addToCart(product, 1)}
                    size="sm"
                    action="secondary"
                  >
                    <ButtonText>Add More</ButtonText>
                  </Button>
                </HStack>
              )}
            >
              {() => (
                <Button
                  onPress={() => addToCart(product, 1)}
                  size="sm"
                  action="primary"
                >
                  <ButtonText>Add to Cart</ButtonText>
                </Button>
              )}
            </Show>
          </HStack>
        </VStack>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(ProductCardComponent);
