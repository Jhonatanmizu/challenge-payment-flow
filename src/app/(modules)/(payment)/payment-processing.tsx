import React, { useEffect, useRef } from "react";
// Components
import { StyleSheet } from "react-native";
import { Box, Text } from "@/src/common/components";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

const PaymentProcessing = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const animation = useRef<LottieView>(null);
  useEffect(() => {
    animation.current?.play();
    setTimeout(() => {
      router.push("/(modules)/(payment)/payment-success");
    }, 2000);
  }, []);
  return (
    <Box
      height="100%"
      backgroundColor="main700"
      alignItems="center"
      justifyContent="center"
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="cover"
        source={require("../../../assets/animations/loading_animation.json")}
      />
      <Animatable.View animation="fadeIn">
        <Text
          variant="headerWhite"
          fontWeight="bold"
          textAlign="center"
          numberOfLines={2}
        >
          {t("common.processing")}
        </Text>
        <Text
          variant="headerWhite"
          fontWeight="bold"
          textAlign="center"
          numberOfLines={2}
        >
          {t("common.your_transfer")}
        </Text>
      </Animatable.View>
    </Box>
  );
};

export default PaymentProcessing;

const styles = StyleSheet.create({});
