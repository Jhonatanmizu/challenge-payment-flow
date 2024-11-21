import React from "react";
// Components
import { Box, CloseButton, Text } from "../(common)/components";
import { Image, StyleSheet } from "react-native";
// Translation
import { useTranslation } from "react-i18next";
// Utils
import { formatDateToLocaleBrazil } from "../(common)/utils";
import { useRouter } from "expo-router";

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const paymentDate = formatDateToLocaleBrazil(new Date(Date.now()));

  const handleClose = () => {
    router.push("/(modules)/(payment)/payment-resume");
  };

  return (
    <Box height="100%" backgroundColor="white" padding="lg">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        mb="2xl"
      >
        <CloseButton onClosePress={handleClose} />
      </Box>
      <Box mb="4xl">
        <Text variant="headerBlack" fontWeight="700" color="main800">
          {t("payment.pix_transfer_done_with")}
        </Text>
        <Text variant="headerBlack" fontWeight="700" color="main800">
          {`${t("common.success")}!`}
        </Text>
      </Box>
      <Box alignItems="center" rowGap="xs" justifyContent="center">
        <Image
          source={require("../../../assets/success_payment.png")}
          resizeMode="cover"
        />
        <Text variant="titleBlack" fontWeight="700" color="main800">
          {t("common.to")}
        </Text>
        <Text variant="titleBlack" fontWeight="bold" color="main800">
          Maria da Silva Maria da Silva
        </Text>
        <Box flexDirection="row" columnGap="lg">
          <Box alignItems="center">
            <Text variant="titleBlack" fontWeight="bold" color="main800">
              {t("common.value")}
            </Text>
            <Text variant="titleBlack" fontWeight="bold" color="main800">
              R$100,00
            </Text>
          </Box>
          <Box alignItems="center">
            <Text variant="titleBlack" fontWeight="bold" color="main800">
              {t("common.date")}
            </Text>
            <Text variant="titleBlack" fontWeight="bold" color="main800">
              {paymentDate}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({});
