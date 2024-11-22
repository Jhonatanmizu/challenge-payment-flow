import React, { useMemo } from "react";
// Components
import { StyleSheet, View } from "react-native";
import { actuatedNormalize, calculateFixedFee, formatAmount } from "../utils";
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
  // TODO Try to fix this logic, because i dont understand yeat how is applied the tax
  const { t } = useTranslation();
  const amountToPay = simulationResult?.amountToPay;
  const installmentAmount = simulationResult?.installmentAmount;
  const installments = simulationResult?.installments;
  const feesFixed = simulationResult?.fees?.fixed;
  const feesInstallmentsAmount = simulationResult?.fees?.installments.amount;
  const feesInstallmentsPercentage =
    simulationResult?.fees?.installments?.percentage;
  const fixedFees = calculateFixedFee(100, feesFixed) || 0;
  const installmentFee = useMemo(() => {
    const result = feesInstallmentsPercentage * feesInstallmentsAmount;
    return result;
  }, [feesInstallmentsAmount, feesInstallmentsPercentage]);

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
          {fixedFees}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text variant="subtitleBlack" fontWeight="500">
          {t("common.installment_tax")}
        </Text>
        <Text variant="subtitleBlack" fontWeight="bold">
          {installmentFee}
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
