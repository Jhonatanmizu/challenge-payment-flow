import React, { useCallback, useState } from "react";
// Components
import {
  AccountBalance,
  Box,
  HeaderWithGoBack,
  PaymentOption,
  RoundedButton,
  Text,
} from "@/src/app/(modules)/(common)/components";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore, usePaymentStore } from "../(common)/stores";
import { useFocusEffect, useRouter } from "expo-router";
// Theme
import theme from "@/src/theme";
import { ICard } from "../(common)/types";
import {
  actuatedNormalize,
  createShadow,
  formatAmount,
  SCREEN_HEIGHT,
} from "../(common)/utils";

const PaymentResume = () => {
  const { t } = useTranslation();
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const { getSimulations, isLoadingSimulations, payment } = usePaymentStore();
  const simulations = payment.simulation;
  const router = useRouter();
  const accountCards = account.cards;

  const handlePickInstallments = () => {};

  const handleSelectPayment = (paymentId: string) => {
    const isAlreadySelected = paymentId === selectedPaymentId;
    if (!isAlreadySelected) {
      return setSelectedPaymentId(paymentId);
    }

    setSelectedPaymentId("");
  };

  const handleProcessPayment = () => {
    router.push("/(modules)/(payment)/payment-processing");
  };

  const renderListHeader = useCallback(() => {
    return (
      <Box alignItems="center" justifyContent="center" m="3xl">
        <Text variant="titleBlack" fontWeight="700">
          {t("common.credit_cards")}
        </Text>
      </Box>
    );
  }, []);

  const renderCardItem = useCallback(
    ({ item }: { item: ICard; index: number }) => {
      const isSelected = item.cardId === selectedPaymentId;
      const cardBrand = item.brand;
      const cardNumber = item.cardNumber;
      const cardBrandImage = item.brandImage;
      return (
        <PaymentOption
          isPaymentSelected={isSelected}
          onPaymentPress={() => handleSelectPayment(item.cardId)}
          onPickInstallments={handlePickInstallments}
          cardBrandImage={cardBrandImage}
          cardNumber={cardNumber}
          cardBrand={cardBrand}
        />
      );
    },
    [isLoadingAccount, accountCards.length, selectedPaymentId]
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
      <HeaderWithGoBack />
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <Text variant="headerBlack" fontWeight="900">
            {t("payment.pix_transfer")}
          </Text>
          <Text variant="titleBlack" fontWeight="700">
            {t("payment.choose_payment_method")}
          </Text>
        </View>
        <View style={styles.contentWrapper}>
          <Text variant="titleBlack" fontWeight="bold">
            {t("common.midway_account")}
          </Text>
          <AccountBalance
            accountValue={2000}
            isPaymentSelected={selectedPaymentId === "-1"}
            onAccountPress={() => setSelectedPaymentId("-1")}
          />
        </View>
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={renderListHeader}
          data={accountCards}
          renderItem={renderCardItem}
          contentContainerStyle={styles.cardList}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.cardId}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Box>
          <Text variant="descriptionBlack" fontWeight="600">
            {t("payment.value_to_be_paid")}
          </Text>
          <Text variant="titleBlack" fontWeight="bold">
            {formatAmount(payment.amount)}
          </Text>
        </Box>
        <RoundedButton
          label={t("common.pay")}
          disabled={!selectedPaymentId}
          onPress={handleProcessPayment}
        />
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
  wrapper: {
    flex: 1,
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
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: theme.colors.whiteAlt,
    padding: actuatedNormalize(16),
    alignItems: "center",
    flexDirection: "row",
    ...createShadow(20),
    justifyContent: "space-between",
  },
});
