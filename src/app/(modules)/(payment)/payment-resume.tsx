import React, { useCallback } from "react";

// Components
import { FlashList } from "@shopify/flash-list";
import {
  Box,
  PaymentOption,
  Text,
} from "@/src/app/(modules)/(common)/components";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore } from "../(common)/stores";
import { useFocusEffect } from "expo-router";
// Theme
import theme from "@/src/theme";
import { ICard } from "../(common)/types";

const PAYMENT_OPTIONS = {};

const PaymentResume = () => {
  const { t } = useTranslation();
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const accountCards = account.cards;

  const renderCardItem = useCallback(
    ({ item, index }: { item: ICard; index: number }) => {
      const cardBrand = item.brand;
      const cardNumber = item.cardNumber;
      return <PaymentOption cardNumber={cardNumber} cardBrand={cardBrand} />;
    },
    [isLoadingAccount, accountCards.length]
  );

  useFocusEffect(
    useCallback(() => {
      getAccount();
    }, [])
  );

  if (isLoadingAccount) {
    return <ActivityIndicator color={theme.colors.backgroundContrast} />;
  }

  return (
    <Box padding="lg">
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Box rowGap="xl">
          <Text variant="headerBlack" fontWeight="900">
            {t("payment.pix_transfer")}
          </Text>
          <Text variant="titleBlack" fontWeight="700">
            {t("payment.choose_payment_method")}
          </Text>
        </Box>
        <FlashList
          data={accountCards}
          renderItem={renderCardItem}
          estimatedItemSize={92}
          contentContainerStyle={styles.cardList}
        />
      </ScrollView>
    </Box>
  );
};

export default PaymentResume;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 120,
  },
  cardList: {
    padding: 8,
    paddingBottom: 120,
  },
});
