
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapScreen from "./MapScreen";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <MapScreen></MapScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ca9cdfff",
  },
});

