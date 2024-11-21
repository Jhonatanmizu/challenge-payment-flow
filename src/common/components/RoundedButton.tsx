import React from "react";
// Components
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";
// Theme
import theme from "@/src/theme";
import { actuatedNormalize } from "../utils";

interface Props {
  label: string;
}

type CustomProps = Props & TouchableOpacityProps;

const RoundedButton = ({ label, ...props }: CustomProps) => {
  const style: ViewStyle = props.disabled
    ? styles.buttonDisable
    : styles.button;
  return (
    <TouchableOpacity style={style} {...props}>
      <Text variant="titleWhite" fontWeight="700">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export { RoundedButton };

const styles = StyleSheet.create({
  button: {
    paddingVertical: actuatedNormalize(7),
    paddingHorizontal: actuatedNormalize(16),
    backgroundColor: theme.colors.main700,
    borderRadius: actuatedNormalize(30),
  },
  buttonDisable: {
    paddingVertical: actuatedNormalize(7),
    paddingHorizontal: actuatedNormalize(16),
    backgroundColor: theme.colors.grey400,
    borderRadius: actuatedNormalize(30),
  },
});
