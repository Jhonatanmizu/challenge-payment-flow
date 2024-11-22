import React, { useCallback } from "react";
// Components
import { FlatList, StyleSheet } from "react-native";
import { Box } from "./Box";
import { PaymentOption } from "./PaymentOption";
import { Text } from "./Text";
// Types
import { ICard, ISimulation } from "../types";
// i18n
import { useTranslation } from "react-i18next";
// Utils
import { actuatedNormalize } from "../utils";

interface Props {
  selectedPaymentId: string;
  handleSelectPayment: (selectedPaymentId: string) => void;
  handlePickInstallments: () => void;
  isLoading: boolean;
  items: ICard[];
  simulationResult: ISimulation | null;
}

const PaymentOptionList = ({
  isLoading,
  items,
  selectedPaymentId,
  handleSelectPayment,
  handlePickInstallments,
  simulationResult,
}: Props) => {
  const { t } = useTranslation();

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
          simulationResult={simulationResult}
        />
      );
    },
    [
      isLoading,
      items.length,
      selectedPaymentId,
      simulationResult?.installments,
      simulationResult?.installmentAmount,
      simulationResult?.amountToPay,
    ]
  );

  const renderSeparator = useCallback(() => {
    return <Box height={16} />;
  }, []);

  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={renderListHeader}
      data={items}
      renderItem={renderCardItem}
      contentContainerStyle={styles.cardList}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(item) => item.cardId}
    />
  );
};

export { PaymentOptionList };

const styles = StyleSheet.create({
  cardList: {
    padding: actuatedNormalize(16),
    paddingBottom: actuatedNormalize(120),
  },
});
