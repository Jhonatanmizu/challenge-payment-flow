import React from "react";
// Components
import { Box } from "./Box";
import { Text } from "./Text";
import { createShadow } from "@/src/app/(modules)/(common)/utils";
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";

interface Props {
  brand: string;
  cardNumber: string;
}

const PaymentOption = ({ brand, cardNumber }: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Box rowGap="sm">
        <Text variant="headerBlack" color="main700" fontWeight="700">
          Cartão Visa
        </Text>
        <Text variant="descriptionBlack" fontWeight="600">
          Final ***1234
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { PaymentOption };

const styles = StyleSheet.create({
  wrapper: {
    ...createShadow(10),
    backgroundColor: theme.colors.grey100,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
