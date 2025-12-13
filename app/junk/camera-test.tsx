
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function CameraTest() {
  const [permission, requestPermission] = useCameraPermissions();
  const [open, setOpen] = useState(true);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Button title="Give Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }}>
      {open ? (
        <CameraView style={{ 
          // flex: 1,
          // display: "flex",
          width: 100,
          height: 100,
        }} >
          {/* <Text>cool</Text> */}
        </CameraView>
      ) : (
        <View style={styles.center}>
          <Button title="Open Camera" onPress={() => setOpen(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
