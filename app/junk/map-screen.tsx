import React from "react";
import { Platform, StyleSheet } from "react-native";

import ThemedView from "@/src/components/themed/ThemedView";
import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';

const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

export default function MapScreen() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
