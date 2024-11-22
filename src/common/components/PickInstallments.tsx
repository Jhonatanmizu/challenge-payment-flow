import React, { useCallback, useEffect, useState } from "react";
// Components
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
// Utils
import { actuatedNormalize, formatAmount } from "../utils";
// Text
import { Text } from "./Text";
// Icons
import { Ionicons } from "@expo/vector-icons";
// Theme
import theme from "@/src/theme";
// i18n
import { useTranslation } from "react-i18next";
// Types
import { ISimulation } from "../types";

interface Props {
  onPickInstallments: () => void;
  simulationResult: ISimulation | null;
}

const PickInstallments = ({ onPickInstallments, simulationResult }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.wrapper}>
          <ActivityIndicator color={theme.colors.main700} />
        </View>
      );
    }

    if (!!simulationResult?.amountToPay) {
      return (
        <TouchableOpacity style={styles.container} onPress={onPickInstallments}>
          <Text variant="titleBlack" fontWeight="bold" color="main700">
            {`${simulationResult?.installments}x de ${formatAmount(
              simulationResult?.installmentAmount || 0
            )}`}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.main700}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.container} onPress={onPickInstallments}>
        <Text variant="titleBlack" fontWeight="bold" color="main700">
          {t("common.pick_installments")}
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.main700}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, [
    isLoading,
    simulationResult?.amountToPay,
    simulationResult?.installments,
    simulationResult?.installmentAmount,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Animatable.View animation="fadeIn">{renderContent()}</Animatable.View>
  );
};

export { PickInstallments };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: actuatedNormalize(8),
    height: actuatedNormalize(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: actuatedNormalize(8),
    backgroundColor: theme.colors.whiteAlt,
  },
  wrapper: {
    width: "100%",
    padding: actuatedNormalize(8),
    height: actuatedNormalize(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: actuatedNormalize(8),
    backgroundColor: theme.colors.whiteAlt,
  },
});
