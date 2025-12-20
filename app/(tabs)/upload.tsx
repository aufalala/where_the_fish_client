import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, Keyboard, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraCapture } from "../../src/components/upload/CameraCapture";
import { PreviewForm } from "../../src/components/upload/PreviewForm";
import { usePhotoUpload } from "../../src/hooks/usePhotoUpload";

export default function Upload() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const { loading, submitPost } = usePhotoUpload();
  const [keyboardHeight] = useState(new Animated.Value(0));
  
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

      const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height + 20,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  if (!photoUri) return <CameraCapture onCapture={setPhotoUri} />;

  return (
    <SafeAreaView style={styles.safeView} edges={["top"]}>
    <Animated.View style={{ flex: 1, paddingBottom: keyboardHeight }}>
      <PreviewForm
        photoUri={photoUri}
        title={title}
        setTitle={setTitle}
        onSubmit={() =>
          submitPost(photoUri, title).then(() => {
            setPhotoUri(null);
            setTitle("");
            router.replace("/")
          })
        }
        onRetake={() => setPhotoUri(null)}
        loading={loading}
      />
    </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "#000000ff",
  },
});
