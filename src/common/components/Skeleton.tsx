import theme from "@/src/theme";
import React, { useEffect, useRef } from "react";
// Types
import type { ViewStyle } from "react-native";
// Components
import { StyleSheet, Animated } from "react-native";

interface Props {
  customStyles: ViewStyle;
}

const Skeleton = ({ customStyles }: Props) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[{ opacity }, styles.wrapper, customStyles]} />;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.grey400,
  },
});

export { Skeleton };
