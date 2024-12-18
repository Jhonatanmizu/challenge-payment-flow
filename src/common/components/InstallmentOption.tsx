import React from "react";
// Components
import { Box } from "./Box";
import { RadioButton } from "react-native-paper";
import { Text } from "./Text";
import { StyleSheet, TouchableOpacity } from "react-native";
// Utils
import { actuatedNormalize, createShadow, formatAmount } from "../utils";
// Theme
import theme from "@/src/theme";
// i18n
import { useTranslation } from "react-i18next";

interface Props {
  installments: number;
  installmentAmount: number;
  isInstallmentSelected: boolean;
  onPickInstallment: () => void;
}

const InstallmentOption = ({
  isInstallmentSelected,
  onPickInstallment,
  installments,
  installmentAmount,
}: Props) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPickInstallment}>
      <Box rowGap="sm" flexDirection="row" alignItems="center">
        <RadioButton
          value={installments?.toString()}
          color={theme.colors.main700}
          status={isInstallmentSelected ? "checked" : "unchecked"}
          onPress={onPickInstallment}
        />
        <Text variant="titleBlack" color="main700" fontWeight="700">
          {`${installments}x de ${formatAmount(installmentAmount)}`}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { InstallmentOption };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(3),
    backgroundColor: theme.colors.whiteAlt,
    padding: actuatedNormalize(12),
    paddingHorizontal: actuatedNormalize(16),
    borderRadius: actuatedNormalize(8),
    flexDirection: "row",
    alignItems: "center",
  },
});
