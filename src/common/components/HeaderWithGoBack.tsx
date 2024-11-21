import React from "react";
// Components
import { StyleSheet, TouchableOpacity, View } from "react-native";
// Icons
import { Ionicons } from "@expo/vector-icons";
// Theme
import theme from "@/src/theme";
// Hooks
import { useNavigation } from "expo-router";
// Utils
import { actuatedNormalize } from "../utils";

const HeaderWithGoBack = () => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const handlePressGoBack = () => {
    if (!canGoBack) return;

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handlePressGoBack}
      >
        <Ionicons name="chevron-back" size={24} color={theme.colors.main800} />
      </TouchableOpacity>
    </View>
  );
};

export { HeaderWithGoBack };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: actuatedNormalize(8),
    alignItems: "center",
  },
  buttonWrapper: {
    padding: actuatedNormalize(8),
    borderRadius: actuatedNormalize(30),
    backgroundColor: theme.colors.main100,
    alignItems: "center",
    justifyContent: "center",
  },
});
