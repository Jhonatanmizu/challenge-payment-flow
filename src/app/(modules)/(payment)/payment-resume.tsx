import React, { useCallback, useMemo, useState } from "react";
// Components
import {
  AccountBalance,
  Box,
  HeaderWithGoBack,
  InstallmentsBottomSheet,
  PaymentOptionList,
  RoundedButton,
  Text,
} from "@/src/common/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

// Hooks
import { useTranslation } from "react-i18next";
import { useAccountStore, usePaymentStore } from "@/src/common/stores";
import { useRouter } from "expo-router";
// Theme
import theme from "@/src/theme";
// Types
import { ISimulation } from "@/src/common/types";
// Utils
import {
  actuatedNormalize,
  createShadow,
  formatAmount,
  SCREEN_HEIGHT,
} from "@/src/common/utils";

const AMOUNT_IN_ACCOUNT_ID = "-1";

const PaymentResume = () => {
  const { t } = useTranslation();
  const { getAccount, isLoadingAccount, account } = useAccountStore();
  const { getSimulations, isLoadingSimulations, payment } = usePaymentStore();
  const simulations = payment.simulation;
  const router = useRouter();
  const accountCards = account.cards;
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const [showInstallmentBottomSheet, setShowInstallmentBottomSheet] =
    useState(false);
  const [installmentSelectedAmount, setInstallmentSelectedAmount] = useState<
    number | null
  >(null);
  const simulationResult = useMemo(() => {
    if (!installmentSelectedAmount) return null;
    return (
      simulations.find((s) => s.installments === installmentSelectedAmount) ||
      null
    );
  }, [installmentSelectedAmount]);

  const handleToggleShowInstallmentBottomSheet = () => {
    setShowInstallmentBottomSheet((prevValue) => !prevValue);
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
          <Text variant="titleBlack" fontWeight="700">
            {t("common.midway_account")}
          </Text>
          <AccountBalance
            accountValue={2000}
            isPaymentSelected={selectedPaymentId === AMOUNT_IN_ACCOUNT_ID}
            onAccountPress={() => {
              setSelectedPaymentId(AMOUNT_IN_ACCOUNT_ID);
              setInstallmentSelectedAmount(null);
            }}
          />
        </View>

        <PaymentOptionList
          amountToTransfer={payment.amount}
          items={accountCards}
          handlePickInstallments={handleToggleShowInstallmentBottomSheet}
          handleSelectPayment={handleSelectPayment}
          isLoading={isLoadingAccount}
          selectedPaymentId={selectedPaymentId}
          simulationResult={simulationResult}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Box>{renderAmountToPay()}</Box>
        <RoundedButton
          label={t("common.pay")}
          disabled={!selectedPaymentId || !installmentSelectedAmount}
          onPress={handleProcessPayment}
        />
      </View>
      <InstallmentsBottomSheet
        onClose={handleToggleShowInstallmentBottomSheet}
        visible={showInstallmentBottomSheet}
        handleSelectSimulation={handleSelectSimulation}
        renderAmountToPay={renderAmountToPay}
        simulations={simulations}
        installmentSelectedAmount={installmentSelectedAmount}
      />
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
    rowGap: actuatedNormalize(32),
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
