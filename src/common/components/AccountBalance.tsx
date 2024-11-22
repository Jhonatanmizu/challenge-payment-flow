import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import {
  actuatedNormalize,
  createShadow,
  formatAmount,
} from "@/src/common/utils";
import { Skeleton } from "./Skeleton";
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";

interface Props {
  accountValue: number;
  isPaymentSelected: boolean;
  onAccountPress: () => void;
  isLoading: boolean;
}

const AccountBalance = ({
  accountValue,
  isPaymentSelected,
  onAccountPress,
  isLoading,
}: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <Skeleton customStyles={styles.skeletonItem} />;
  }

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onAccountPress}>
      <Box rowGap="sm" flexDirection="row" alignItems="center">
        <RadioButton
          value="account_balance"
          color={theme.colors.main700}
          status={isPaymentSelected ? "checked" : "unchecked"}
          onPress={onAccountPress}
        />
        <Box rowGap="xs">
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
    ...createShadow(10, "all", theme.colors.grey100),
    backgroundColor: theme.colors.grey100,
    paddingVertical: actuatedNormalize(12),
    paddingHorizontal: actuatedNormalize(16),
    borderRadius: actuatedNormalize(8),
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonItem: {
    width: "100%",
    height: 56,
    borderRadius: 8,
  },
});
