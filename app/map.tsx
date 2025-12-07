import React from "react";
import { StyleSheet, View } from "react-native";
import { Platform } from "react-native";

// let MapboxGL: any;
// if (Platform.OS !== "web") {
//   MapboxGL = require("@rnmapbox/maps").default;
// }

// MapboxGL.setAccessToken(""); // replace with @env later

import MapboxGL from '@rnmapbox/maps';
import { env } from 'expo-env';

// Set the public token at runtime
MapboxGL.setAccessToken(env.MAPBOX_PUBLIC_TOKEN);

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* {Platform.OS !== "web" && (
        <MapboxGL.MapView style={{ flex: 1 }}>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[-122.4324, 37.78825]}
          />
        </MapboxGL.MapView>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
