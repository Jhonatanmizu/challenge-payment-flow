import React from "react";
// Components
import { Box } from "@/src/app/(modules)/(common)/components";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
// Theme
import theme from "@/src/theme";

const InitialScreen = () => {
  return (
    <Box alignItems="center" height="100%" justifyContent="center">
      <ActivityIndicator size="large" color={theme.colors.main700} />
    </Box>
  );
};

export default InitialScreen;
