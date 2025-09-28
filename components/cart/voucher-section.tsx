import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cartStore } from "@/stores/cart.store";
import { observer, use$ } from "@legendapp/state/react";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { voucherSectionStyles } from "./voucher-section.styles";

const VoucherSection = observer(() => {
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState<string | null>(null);

  const appliedDiscount = use$(cartStore.state.appliedDiscount);

  const handleApplyVoucher = () => {
    if (voucherCode.trim()) {
      // Call cartStore directly for immediate state update
      const success = cartStore.applyDiscount(voucherCode.trim());

      if (success) {
        setVoucherError(null);
        setVoucherCode("");
      } else {
        setVoucherError("Invalid voucher code");
      }
    }
  };

  if (appliedDiscount) {
    return null;
  }

  return (
    <Card className={voucherSectionStyles.card()}>
      <VStack space="md" className="p-4">
        <Text size="md" className="font-semibold">
          Voucher Code
        </Text>

        <View className={voucherSectionStyles.inputContainer()}>
          <TextInput
            placeholder="Enter voucher code"
            value={voucherCode}
            onChangeText={setVoucherCode}
            className={voucherSectionStyles.input()}
          />
          <Button size="sm" onPress={handleApplyVoucher}>
            <ButtonText size="sm">Apply</ButtonText>
          </Button>
        </View>
        {voucherError && (
          <Text className="text-red-500 text-sm">{voucherError}</Text>
        )}
      </VStack>
    </Card>
  );
});

export default VoucherSection;
