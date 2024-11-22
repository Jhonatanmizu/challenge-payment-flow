import React, { PropsWithChildren, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "./BottomSheetModal";
import { ISimulation } from "../types";
import { InstallmentOption } from "./InstallmentOption";
import { Box } from "./Box";
import { CloseButton } from "./CloseButton";
import { Text } from "./Text";
import { useTranslation } from "react-i18next";
import { actuatedNormalize, createShadow, SCREEN_HEIGHT } from "../utils";
import theme from "@/src/theme";
import { RoundedButton } from "./RoundedButton";

interface Props {
  visible: boolean;
  onClose: () => void;
  enableKeyboardAvoidingView?: boolean;
  simulations: ISimulation[];
  installmentSelectedAmount: number | null;
  handleSelectSimulation: (newSimulation: ISimulation) => void;
  renderAmountToPay: () => React.ReactNode;
}

const InstallmentsBottomSheet = ({
  onClose,
  visible,
  enableKeyboardAvoidingView,
  simulations,
  installmentSelectedAmount,
  handleSelectSimulation,
  renderAmountToPay,
}: Props) => {
  const { t } = useTranslation();

  const renderSeparator = useCallback(() => {
    return <Box height={16} />;
  }, []);

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
        <CloseButton onClosePress={onClose} />
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

  return (
    <BottomSheetModal
      onClose={onClose}
      visible={visible}
      enableKeyboardAvoidingView={enableKeyboardAvoidingView}
    >
      <View style={styles.header}>{renderBottomSheetHeader()}</View>
      <FlatList
        contentContainerStyle={styles.list}
        data={simulations}
        renderItem={renderInstallmentItem}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.bottomContainer}>
        <Box>{renderAmountToPay()}</Box>
        <RoundedButton
          disabled={!installmentSelectedAmount}
          label={t("common.confirm")}
          onPress={onClose}
        />
      </View>
    </BottomSheetModal>
  );
};

export { InstallmentsBottomSheet };

const styles = StyleSheet.create({
  header: {
    padding: 8,
  },
  list: {
    padding: 8,
    paddingBottom: 120,
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
