import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onCapture: (uri: string) => void;
}

export function CameraCapture({ onCapture }: Props) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => { requestPermission(); }, []);

  if (!permission?.granted) {
    return <View style={styles.center}><Text>Camera permission required</Text></View>;
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) onCapture(photo.uri);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} />
      <Pressable style={styles.capture} onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  capture: {
    position: "absolute", bottom: 40, alignSelf: "center",
    width: 72, height: 72, borderRadius: 36, backgroundColor: "#fff",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
