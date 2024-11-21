import React, { useCallback, useMemo, useRef, useState } from "react";
// Components
import {
  AccountBalance,
  Box,
  CloseButton,
  HeaderWithGoBack,
  InstallmentOption,
  PaymentOption,
  PaymentOptionList,
  RoundedButton,
  Text,
} from "@/src/common/components";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore, usePaymentStore } from "@/src/common/stores";
import { useFocusEffect, useRouter } from "expo-router";
// Theme
import theme from "@/src/theme";
import { ICard, ISimulation } from "@/src/common/types";
import {
  actuatedNormalize,
  createShadow,
  formatAmount,
  SCREEN_HEIGHT,
} from "@/src/common/utils";

const PaymentResume = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const { getSimulations, isLoadingSimulations, payment } = usePaymentStore();
  const simulations = payment.simulation;
  const router = useRouter();
  const accountCards = account.cards;
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const [installmentSelectedAmount, setInstallmentSelectedAmount] = useState<
    number | null
  >(null);
  const simulationResult = useMemo(() => {
    if (!installmentSelectedAmount) return null;
    return simulations.find(
      (s) => s.installments === installmentSelectedAmount
    );
  }, [installmentSelectedAmount]);

  const bottomSheetSnapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handlePickInstallments = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

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

  const handleSelectSimulation = (simulation: ISimulation) => {
    setInstallmentSelectedAmount(simulation.installments);
  };

  const renderBottomSheetHeader = useCallback(() => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="xl"
      >
        <Text variant="titleBlack" fontWeight="bold">
          {t("payment.payment_installments")}
        </Text>
        <CloseButton onClosePress={handleCloseBottomSheet} />
      </Box>
    );
  }, []);

  const renderInstallmentItem = useCallback(
    ({ item }: { item: ISimulation }) => {
      const installmentAmount = item.installmentAmount;
      const installments = item.installments;
      const isSelected = installmentSelectedAmount === installments;
      return (
        <InstallmentOption
          installments={installments}
          installmentAmount={installmentAmount}
          isInstallmentSelected={isSelected}
          onPickInstallment={() => handleSelectSimulation(item)}
        />
      );
    },
    [installmentSelectedAmount]
  );

  const renderAmountToPay = useCallback(() => {
    return (
      <>
        {!!simulationResult ? (
          <>
            <Text variant="descriptionBlack" fontWeight="600">
              {t("payment.value_to_be_paid")}
            </Text>
            <Text variant="titleBlack" fontWeight="bold">
              {`${simulationResult?.installments}x de ${formatAmount(
                simulationResult?.installmentAmount || 0
              )}`}
            </Text>
          </>
        ) : (
          <>
            <Text variant="descriptionBlack" fontWeight="600">
              {t("payment.value_to_be_paid")}
            </Text>
            <Text variant="titleBlack" fontWeight="bold">
              {formatAmount(payment.amount)}
            </Text>
          </>
        )}
      </>
    );
  }, [installmentSelectedAmount, selectedPaymentId]);

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

        <PaymentOptionList
          items={accountCards}
          handlePickInstallments={handlePickInstallments}
          handleSelectPayment={handleSelectPayment}
          isLoading={isLoadingAccount}
          selectedPaymentId={selectedPaymentId}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Box>{renderAmountToPay()}</Box>
        <RoundedButton
          label={t("common.pay")}
          disabled={!selectedPaymentId}
          onPress={handleProcessPayment}
        />
      </View>
      {/* <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={bottomSheetSnapPoints}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <BottomSheetFlashList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 8,
            }}
            estimatedItemSize={74}
            ListHeaderComponent={renderBottomSheetHeader}
            data={simulations}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderInstallmentItem}
          />
        </BottomSheetView>
        <View style={styles.bottomContainer}>
          <Box>{renderAmountToPay()}</Box>
          <RoundedButton
            label={t("common.confirm")}
            onPress={handleCloseBottomSheet}
          />
        </View>
      </BottomSheet> */}
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

  bottomSheetContent: {
    padding: 16,
    justifyContent: "space-between",
    flex: 1,
  },
});
