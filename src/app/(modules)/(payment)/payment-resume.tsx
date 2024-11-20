import React, { useCallback, useState } from "react";
// Components
import {
  Box,
  HeaderWithGoBack,
  PaymentOption,
  RoundedButton,
  Text,
} from "@/src/app/(modules)/(common)/components";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore } from "../(common)/stores";
import { useFocusEffect, useRouter } from "expo-router";
// Theme
import theme from "@/src/theme";
import { ICard } from "../(common)/types";
import {
  actuatedNormalize,
  createShadow,
  SCREEN_HEIGHT,
} from "../(common)/utils";

const PaymentResume = () => {
  const { t } = useTranslation();
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const router = useRouter();
  const accountCards = account.cards;

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

  useFocusEffect(
    useCallback(() => {
      getAccount();
    }, [])
  );

  if (isLoadingAccount) {
    return <ActivityIndicator color={theme.colors.backgroundContrast} />;
  }

  return (
    <View style={styles.container}>
      <HeaderWithGoBack />
      <View style={styles.wrapper}>
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
        </View>
        <FlatList
          ListHeaderComponent={renderListHeader}
          data={accountCards}
          renderItem={renderCardItem}
          contentContainerStyle={styles.cardList}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.cardId}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Box>
          <Text variant="descriptionBlack" fontWeight="600">
            {t("payment.value_to_be_paid")}
          </Text>
          <Text variant="titleBlack" fontWeight="bold">
            R$ 100,00
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
    height: SCREEN_HEIGHT * 0.12,
    backgroundColor: theme.colors.white,
    padding: actuatedNormalize(16),
    alignItems: "center",
    flexDirection: "row",
    ...createShadow(20),
    justifyContent: "space-between",
  },
});
