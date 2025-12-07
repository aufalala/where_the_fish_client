
import { useRouter } from "expo-router";
import {  Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import MapScreen from "./map";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.testcontainer}>
        <Text>
          test hello askdjas
        </Text>
      </View>
      <Text style={styles.text}>Where The Fish 🐟</Text>
      {/* <MapScreen></MapScreen> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
  justifyContent: "center", alignItems: "center",
  backgroundColor: "#9cdfd0ff" },
  testcontainer: {  flex: 1, backgroundColor: "#c5e2daff"},
  text: { fontSize: 24, fontWeight: "bold" },
});

