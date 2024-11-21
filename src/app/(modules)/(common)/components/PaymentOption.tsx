import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import { createShadow } from "@/src/app/(modules)/(common)/utils";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// Theme
import theme from "@/src/theme";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";
import { PickInstallments } from "./PickInstallments";

interface Props {
  cardBrand: string;
  cardNumber: string;
  cardBrandImage: ImageSourcePropType;
  isPaymentSelected: boolean;
  onPaymentPress: () => void;
  onPickInstallments: () => void;
}

const PaymentOption = ({
  cardBrand,
  cardNumber,
  cardBrandImage,
  isPaymentSelected,
  onPaymentPress,
  onPickInstallments,
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
          <Box>
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
        <PickInstallments onPickInstallments={onPickInstallments} />
      )}
    </Box>
  );
};

export { PaymentOption };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(3),
    backgroundColor: theme.colors.whiteAlt,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
