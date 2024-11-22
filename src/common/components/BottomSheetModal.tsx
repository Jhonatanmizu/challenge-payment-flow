import React, { useState, useEffect, PropsWithChildren } from "react";
// Components
import {
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// Utils
import { actuatedNormalize, SCREEN_HEIGHT } from "../utils";
// Theme
import theme from "@/src/theme";

interface Props {
  visible: boolean;
  onClose: () => void;
  enableKeyboardAvoidingView?: boolean;
}

type CustomProps = Props & PropsWithChildren;

const BottomSheetModal = ({
  visible,
  children,
  onClose,
  enableKeyboardAvoidingView = true,
}: CustomProps) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const renderContent = () => (
    <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
        {enableKeyboardAvoidingView ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -50 : undefined}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              {renderContent()}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        ) : (
          renderContent()
        )}
      </View>
    </Modal>
  );
};

export { BottomSheetModal };

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  modal: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: actuatedNormalize(20),
    borderTopRightRadius: actuatedNormalize(20),
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
