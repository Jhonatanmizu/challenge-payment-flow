import React from "react";
// Components
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Button } from "react-native-paper";
// Theme
import theme from "@/src/theme";
import { Text } from "./Text";

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
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.main700,
    borderRadius: 30,
  },
  buttonDisable: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.grey400,
    borderRadius: 30,
  },
});
