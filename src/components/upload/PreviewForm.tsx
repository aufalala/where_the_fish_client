import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  photoUri: string;
  title: string;
  setTitle: (t: string) => void;
  onSubmit: () => void;
  onRetake: () => void;
  loading: boolean;
}

export function PreviewForm({ photoUri, title, setTitle, onSubmit, onRetake, loading }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Image source={{ uri: photoUri }} style={styles.preview} />
      <TextInput
        placeholder="Give this catch a title"
        placeholderTextColor="#888"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Pressable style={styles.submit} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Post</Text>}
      </Pressable>
      <Pressable onPress={onRetake}><Text style={styles.retake}>Retake</Text></Pressable>
    </SafeAreaView>
  );
}

 const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1 },
  input: { backgroundColor: "#111", color: "#fff", padding: 12, margin: 12, borderRadius: 8 },
  submit: { backgroundColor: "#1e90ff", padding: 14, marginHorizontal: 12, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "600" },
  retake: { color: "#ff3b30", textAlign: "center", marginTop: 12 },
});
