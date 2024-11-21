import React from "react";
// Components
import { StyleSheet, TouchableOpacity } from "react-native";
// Theme
import theme from "@/src/theme";
// Icons
import { Ionicons } from "@expo/vector-icons";

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
    padding: 8,
    borderRadius: 30,
    backgroundColor: theme.colors.main100,
    alignItems: "center",
    justifyContent: "center",
  },
});
