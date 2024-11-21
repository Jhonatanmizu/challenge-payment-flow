import React from "react";
// Components
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";
// Icons
import { Ionicons } from "@expo/vector-icons";
import { actuatedNormalize } from "../utils";

interface Props {
  onClosePress: () => void;
}

const CloseButton = ({ onClosePress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClosePress}>
      <Ionicons name="close" size={24} />
    </TouchableOpacity>
  );
};

export { CloseButton };

const styles = StyleSheet.create({
  button: {
    width: "auto",
    padding: actuatedNormalize(8),
    borderRadius: actuatedNormalize(30),
    backgroundColor: theme.colors.main100,
    alignItems: "center",
    justifyContent: "center",
  },
});
