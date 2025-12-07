
import { useRouter } from "expo-router";
import { Text, View, Button } from "react-native";

export default function index() {
  
  const router = useRouter();
  
  return (
    <View
      style={{
        maxWidth: 500,
        backgroundColor: "rgba(137, 33, 33, 1)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Text>Edit app/index.tsx to edit this screen.</Text>

      
      <Button title="Go to About" onPress={() => router.push("/about")} />
      <Button title="Go to Camera" onPress={() => router.push("/cameraTest")} />

    </View>
  );
}

