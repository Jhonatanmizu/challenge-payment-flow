import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {
  Box,
  PaymentOption,
  Text,
} from "@/src/app/(modules)/(common)/components";

const PAYMENT_OPTIONS = {};

const PaymentResume = () => {
  return (
    <Box padding="lg">
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Box rowGap="xl">
          <Text variant="headerBlack" fontWeight="900">
            Transferência Pix
          </Text>
          <Text variant="titleBlack" fontWeight="700">
            Escolha uma forma de pagamento
          </Text>
        </Box>
        <PaymentOption />
      </ScrollView>
    </Box>
  );
};

export default PaymentResume;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 120,
  },
});
