import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === "dark" ? Colors.dark : Colors.light;
}

export type ThemeColors = ReturnType<typeof useThemeColors>;
