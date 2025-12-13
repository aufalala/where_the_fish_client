import { Platform, StyleSheet } from "react-native";

import ThemedView from "@/src/components/themed/ThemedView";
import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { SafeAreaView } from "react-native-safe-area-context";

const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* <Text>hi</Text> */}
        {Platform.OS !== "web" && (
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={12}
              pitch={100}
              centerCoordinate={[-122.4324, 37.78825]}
            />
          </MapboxGL.MapView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  map: { flex: 1 },
});
