import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cartStore } from "@/stores/cart.store";
import { observer } from "@legendapp/state/react";
import React from "react";
import type { CartSummaryProps } from "../../screens/cart/cart-screen.types";
import { Button, ButtonText } from "../ui/button";
import { cartSummaryStyles } from "./cart-summary.styles";
import VoucherSection from "./voucher-section";

const CartSummary = ({ summary }: CartSummaryProps) => {
  const { subtotal, discountAmount, finalTotal } = summary;

  return (
    <VStack space="md">
      <Card className={cartSummaryStyles.card()}>
        <VStack space="md" className="p-4">
          <HStack className={cartSummaryStyles.row()}>
            <Text size="md">Items:</Text>
            <Text size="md">{summary.uniqueProducts} products</Text>
          </HStack>

          <HStack className={cartSummaryStyles.row()}>
            <Text size="md">Total Quantity:</Text>
            <Text size="md">{summary.totalItems}</Text>
          </HStack>

          <HStack className={cartSummaryStyles.row()}>
            <Text size="md">Subtotal:</Text>
            <Text size="md">${subtotal.toFixed(2)}</Text>
          </HStack>

          {discountAmount > 0 && (
            <>
              <HStack className={cartSummaryStyles.row()}>
                <HStack className="items-center gap-2">
                  <Button
                    variant="link"
                    onPress={() => cartStore.removeDiscount()}
                  >
                    <ButtonText>X</ButtonText>
                  </Button>
                  <Text size="md" className="text-green-600">
                    Discount:
                  </Text>
                </HStack>
                <Text size="md" className="text-green-600">
                  -${discountAmount.toFixed(2)}
                </Text>
              </HStack>
            </>
          )}

          <HStack className={cartSummaryStyles.totalRow()}>
            <Text size="lg" className={cartSummaryStyles.totalLabel()}>
              Total:
            </Text>

            <Text size="xl">${finalTotal.toFixed(2)}</Text>
          </HStack>
        </VStack>
      </Card>

      <VoucherSection />
    </VStack>
  );
};

export default observer(CartSummary);
