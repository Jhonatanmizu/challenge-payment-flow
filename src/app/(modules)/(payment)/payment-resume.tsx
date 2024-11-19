import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Text } from "@/src/app/(modules)/(common)/components";

const PaymentResume = () => {
  return (
    <Box padding="lg">
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Box rowGap="xl">
          <Text variant="titleBlack" fontWeight="900">
            Transferência Pix
          </Text>
          <Text variant="subtitleBlack" fontWeight="700">
            Escolha uma forma de pagamento
          </Text>
        </Box>
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
