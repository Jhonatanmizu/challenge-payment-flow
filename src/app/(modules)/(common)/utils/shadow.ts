import type { ViewStyle } from "react-native";
import { Platform } from "react-native";

type ShadowDirection = "top" | "bottom" | "left" | "right" | "all";

interface ShadowStyle extends ViewStyle {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

export const createShadow = (
  elevation: number,
  direction: ShadowDirection = "all",
  shadowColor: string = "#000",
  shadowOpacity: number = 0.3
): ShadowStyle => {
  let shadowOffset = { width: 0, height: 0 };

  switch (direction) {
    case "top":
      shadowOffset = { width: 0, height: -elevation / 2 };
      break;
    case "bottom":
      shadowOffset = { width: 0, height: elevation / 2 };
      break;
    case "left":
      shadowOffset = { width: -elevation / 2, height: 0 };
      break;
    case "right":
      shadowOffset = { width: elevation / 2, height: 0 };
      break;
    case "all":
    default:
      shadowOffset = { width: 0, height: elevation / 2 };
      break;
  }

  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColor,
      shadowOffset: shadowOffset,
      shadowOpacity: shadowOpacity,
      shadowRadius: elevation * 0.5,
    };
  }

  if (Platform.OS === "android") {
    return {
      elevation: elevation,
    };
  }

  return {};
};
