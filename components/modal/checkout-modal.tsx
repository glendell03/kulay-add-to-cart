import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import type { CheckoutModalProps } from "./checkout-modal.types";

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirmCheckout,
  isProcessing,
  summary,
  calculateDiscountedTotal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack space="lg" className="p-6 bg-background-0 rounded-lg w-[60%]">
        {isProcessing ? (
          <Center>
            <Spinner />
            <Text size="md" className="text-center">
              Please wait while we process your payment and prepare your order.
            </Text>
          </Center>
        ) : (
          <>
            <Text size="xl" className="font-bold text-center">
              Ready to Checkout?
            </Text>

            <VStack space="sm" className="p-4 rounded-lg">
              <Text size="md" className="font-semibold">
                Order Summary:
              </Text>
              <HStack className="justify-between">
                <Text size="sm" className="">
                  Items ({summary.uniqueProducts} products):
                </Text>
                <Text size="sm" className="font-medium">
                  {summary.totalItems} items
                </Text>
              </HStack>

              <HStack className="justify-between">
                <Text size="sm" className="">
                  Subtotal:
                </Text>
                <Text size="sm" className="font-medium">
                  ${summary.totalPrice.toFixed(2)}
                </Text>
              </HStack>

              <HStack className="justify-between border-t border-gray-200 pt-2">
                <Text size="lg" className="font-bold">
                  Total Amount:
                </Text>
                <Text size="lg" className="font-bold">
                  ${calculateDiscountedTotal(summary.totalPrice).toFixed(2)}
                </Text>
              </HStack>
            </VStack>

            <VStack space="sm">
              <Button action="primary" onPress={onConfirmCheckout}>
                <ButtonText>Complete Purchase</ButtonText>
              </Button>

              <Button action="secondary" variant="outline" onPress={onClose}>
                <ButtonText>Continue Shopping</ButtonText>
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </Modal>
  );
};

export default CheckoutModal;
