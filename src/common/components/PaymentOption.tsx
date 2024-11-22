import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import { RadioButton } from "react-native-paper";
import { PickInstallments } from "./PickInstallments";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// Theme
import theme from "@/src/theme";
// i18n
import { useTranslation } from "react-i18next";
// Utils
import { actuatedNormalize, createShadow } from "@/src/common/utils";
// Types
import { ISimulation } from "../types";
import { PaymentInfoResume } from "./PaymentInfoResume";

interface Props {
  cardBrand: string;
  cardNumber: string;
  cardBrandImage: ImageSourcePropType;
  isPaymentSelected: boolean;
  onPaymentPress: () => void;
  onPickInstallments: () => void;
  simulationResult: ISimulation | null;
  amountToTransfer: number;
}

const PaymentOption = ({
  cardBrand,
  cardNumber,
  cardBrandImage,
  isPaymentSelected,
  onPaymentPress,
  onPickInstallments,
  simulationResult,
  amountToTransfer,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Box rowGap="xl">
      <TouchableOpacity style={styles.wrapper} onPress={onPaymentPress}>
        <Box rowGap="sm" flexDirection="row" alignItems="center">
          <RadioButton
            value={cardBrand}
            color={theme.colors.main700}
            status={isPaymentSelected ? "checked" : "unchecked"}
            onPress={onPaymentPress}
          />
          <Box rowGap="xs">
            <Box flexDirection="row" alignItems="center" gap="sm">
              <Image source={cardBrandImage} resizeMode="cover" />
              <Text variant="titleBlack" color="main700" fontWeight="700">
                {t("common.card")} {cardBrand}
              </Text>
            </Box>
            <Text variant="descriptionBlack" fontWeight="600">
              {t("common.end")} {cardNumber}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
      {isPaymentSelected && (
        <PickInstallments
          onPickInstallments={onPickInstallments}
          simulationResult={simulationResult}
        />
      )}
      {!!simulationResult && isPaymentSelected && (
        <PaymentInfoResume
          amountToTransfer={amountToTransfer}
          simulationResult={simulationResult}
        />
      )}
    </Box>
  );
};

export { PaymentOption };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(3),
    backgroundColor: theme.colors.whiteAlt,
    paddingVertical: actuatedNormalize(12),
    paddingHorizontal: actuatedNormalize(16),
    borderRadius: actuatedNormalize(8),
    flexDirection: "row",
    alignItems: "center",
  },
});
