import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { ThemeColors, useThemeColors } from "../../hooks/useThemeColors";

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

export default function ThemedView({ style, ...props }: ThemedViewProps) {
  const theme: ThemeColors = useThemeColors();

  return (
    <View
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  );
}
