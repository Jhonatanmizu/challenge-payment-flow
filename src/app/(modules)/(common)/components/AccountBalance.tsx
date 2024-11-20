import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import { createShadow, formatAmount } from "@/src/app/(modules)/(common)/utils";
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";

interface Props {
  accountValue: number;
  isPaymentSelected: boolean;
  onAccountPress: () => void;
}

const AccountBalance = ({
  accountValue,
  isPaymentSelected,
  onAccountPress,
}: Props) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onAccountPress}>
      <Box rowGap="sm" flexDirection="row" alignItems="center">
        <RadioButton
          value="account_balance"
          color={theme.colors.main700}
          status={isPaymentSelected ? "checked" : "unchecked"}
          onPress={onAccountPress}
        />
        <Box>
          <Text variant="titleBlack" color="main700" fontWeight="700">
            {t("common.account_balance")}
          </Text>
          <Text variant="descriptionBlack" fontWeight="600">
            {`${t("common.available")}: ${formatAmount(accountValue)}`}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export { AccountBalance };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(10),
    backgroundColor: theme.colors.grey100,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
