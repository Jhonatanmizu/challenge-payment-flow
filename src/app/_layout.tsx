import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-reanimated";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import { PaperProvider } from "react-native-paper";
import theme from "@/src/theme";

import "@/src/app/(modules)/(common)/i18n"; // i18n configuration

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Routes = () => {
  const isLoaded = true;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(modules)/(payment)/payment-resume");
    }, 1000);
  }, []);

  if (!isLoaded) return null;

  return <Slot />;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    MontserratItalic: require("../../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <RestyleProvider theme={theme}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </RestyleProvider>
      <ExpoStatusBar style="dark" backgroundColor={theme.colors.white} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    backgroundColor: theme.colors.white,
  },
});
