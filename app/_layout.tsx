import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function RootStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)/_layout" />
    </Stack>
  );
}

function AuthGate() {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RootStack />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
