import React from "react";
// Components
import { View, TouchableOpacity, StyleSheet } from "react-native";
// Utils
import { actuatedNormalize } from "../utils";

interface Props {
  selected: boolean;
  onPress: () => void;
}

const RadioButton = ({ selected, onPress }: Props) => {
  console.log("HADOUKEN", selected);

  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={[styles.circle, selected && styles.selectedCircle]} />
    </TouchableOpacity>
  );
};

export { RadioButton };

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    borderWidth: actuatedNormalize(2),
    borderColor: "#000",
    marginRight: actuatedNormalize(10),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    backgroundColor: "#000",
  },
});
