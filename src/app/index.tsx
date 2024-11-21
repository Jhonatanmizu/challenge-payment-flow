import React, { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";
// Components
import { Box } from "@/src/common/components";
// Theme
import LottieView from "lottie-react-native";

const InitialScreen = () => {
  const animation = useRef<LottieView>(null);
  useFocusEffect(
    useCallback(() => {
      animation.current?.play();
    }, [])
  );
  return (
    <Box alignItems="center" height="100%" justifyContent="center">
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="cover"
        source={require("../assets/animations/loading_animation.json")}
      />
    </Box>
  );
};

export default InitialScreen;
