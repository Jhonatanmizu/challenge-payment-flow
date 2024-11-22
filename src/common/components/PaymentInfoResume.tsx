import React, { useMemo } from "react";
// Components
import { StyleSheet, View } from "react-native";
import { actuatedNormalize, calculatePayment, formatAmount } from "../utils";
import { Text } from "./Text";
// Types
import { ISimulation } from "../types";
// Theme
import theme from "@/src/theme";
import { useTranslation } from "react-i18next";

interface Props {
  simulationResult: ISimulation;
  amountToTransfer: number;
}

const PaymentInfoResume = ({ simulationResult, amountToTransfer }: Props) => {
  const { t } = useTranslation();

  const { fees } = calculatePayment({
    baseAmount: amountToTransfer,
    fees: simulationResult.fees,
    installments: simulationResult.installments,
  });

  return (
    <View style={styles.container}>
      <View style={styles.rowItem}>
        <Text variant="subtitleBlack" fontWeight="500">
          {t("common.amount_to_transfer")}
        </Text>
        <Text variant="subtitleBlack" fontWeight="bold">
          {formatAmount(amountToTransfer)}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text variant="subtitleBlack" fontWeight="500">
          {t("common.card_tax")}
        </Text>
        <Text variant="subtitleBlack" fontWeight="bold">
          {formatAmount(fees.fixed.amount)}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text variant="subtitleBlack" fontWeight="500">
          {t("common.installment_tax")}
        </Text>
        <Text variant="subtitleBlack" fontWeight="bold">
          {formatAmount(fees.installments.amount)}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text variant="subtitleBlack" fontWeight="500">
          {t("common.amount_to_transfer_with_tax")}
        </Text>
        <Text variant="subtitleBlack" fontWeight="bold">
          {`${simulationResult?.installments}x de ${formatAmount(
            simulationResult?.installmentAmount || 0
          )}`}
        </Text>
      </View>
    </View>
  );
};

export { PaymentInfoResume };

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.whiteAlt,
    padding: actuatedNormalize(12),
    paddingHorizontal: actuatedNormalize(16),
    borderRadius: actuatedNormalize(8),
    flex: 1,
    gap: 16,
  },

  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
