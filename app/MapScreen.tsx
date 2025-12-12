import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';

const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>hi</Text> */}
      {Platform.OS !== "web" && (
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={12}
            pitch={60}
            centerCoordinate={[-122.4324, 37.78825]}
          />
        </MapboxGL.MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
