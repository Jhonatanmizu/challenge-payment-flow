import React, { useCallback } from "react";

// Components
import { FlashList } from "@shopify/flash-list";
import {
  Box,
  PaymentOption,
  RoundedButton,
  Text,
} from "@/src/app/(modules)/(common)/components";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore } from "../(common)/stores";
import { useFocusEffect } from "expo-router";
// Theme
import theme from "@/src/theme";
import { ICard } from "../(common)/types";
import {
  actuatedNormalize,
  createShadow,
  SCREEN_HEIGHT,
} from "../(common)/utils";

const PAYMENT_OPTIONS = {};

const PaymentResume = () => {
  const { t } = useTranslation();
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const accountCards = account.cards;

  const renderListHeader = useCallback(() => {
    return (
      <Box alignItems="center" justifyContent="center" m="3xl">
        <Text variant="titleBlack" fontWeight="700">
          Cartões de crédito
        </Text>
      </Box>
    );
  }, []);

  const renderCardItem = useCallback(
    ({ item }: { item: ICard; index: number }) => {
      const cardBrand = item.brand;
      const cardNumber = item.cardNumber;
      const cardBrandImage = item.brandImage;
      return (
        <PaymentOption
          cardBrandImage={cardBrandImage}
          cardNumber={cardNumber}
          cardBrand={cardBrand}
        />
      );
    },
    [isLoadingAccount, accountCards.length]
  );

  const renderSeparator = useCallback(() => {
    return <Box height={16} />;
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getAccount();
  //   }, [])
  // );

  if (isLoadingAccount) {
    return <ActivityIndicator color={theme.colors.backgroundContrast} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.contentWrapper}>
          <Text variant="headerBlack" fontWeight="900">
            {t("payment.pix_transfer")}
          </Text>
          <Text variant="titleBlack" fontWeight="700">
            {t("payment.choose_payment_method")}
          </Text>
        </View>
        <FlashList
          ListHeaderComponent={renderListHeader}
          data={accountCards}
          renderItem={renderCardItem}
          estimatedItemSize={92}
          contentContainerStyle={styles.cardList}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Box>
          <Text variant="descriptionBlack" fontWeight="600">
            Valor a ser pago
          </Text>
          <Text variant="titleBlack" fontWeight="bold">
            R$ 100,00
          </Text>
        </Box>
        <RoundedButton label="Pagar" disabled />
      </View>
    </View>
  );
};

export default PaymentResume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentWrapper: {
    rowGap: actuatedNormalize(16),
    padding: actuatedNormalize(16),
  },
  cardList: {
    padding: actuatedNormalize(16),
    paddingBottom: actuatedNormalize(120),
  },
  bottomContainer: {
    height: SCREEN_HEIGHT * 0.12,
    backgroundColor: theme.colors.white,
    padding: actuatedNormalize(16),
    alignItems: "center",
    flexDirection: "row",
    ...createShadow(20),
    justifyContent: "space-between",
  },
});
