import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import { createShadow } from "@/src/app/(modules)/(common)/utils";
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";
import { useTranslation } from "react-i18next";

interface Props {
  cardBrand: string;
  cardNumber: string;
}

const PaymentOption = ({ cardBrand, cardNumber }: Props) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Box rowGap="sm">
        <Text variant="headerBlack" color="main700" fontWeight="700">
          {t("common.card")} {cardBrand}
        </Text>
        <Text variant="descriptionBlack" fontWeight="600">
          {t("common.end")} {cardNumber}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { PaymentOption };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(10),
    backgroundColor: theme.colors.grey100,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
