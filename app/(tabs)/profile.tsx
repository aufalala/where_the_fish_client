import { useAuth } from "@/src/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deletePost, getMyPosts } from "../../src/services/post.service";
import { Post } from "../../src/types/post";


const screenWidth = Dimensions.get("window").width;
const cardMargin = 8;

export default function Profile() {
  const {signout} = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMyPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMyPosts();
    }, [])
  );

  const handleSignout = async () => {

    try {
      await signout();
    } catch (err: any) {
      Alert.alert("Clean Signout Failed", err?.response?.data?.error ?? err.message);
    } finally {
      // router.replace("/");
    }
  }

  async function onDelete(postId: string) {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No posts yet</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeView} edges={["top"]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Pressable style={styles.deleteButton} onPress={() => onDelete(item._id)}>
              <Ionicons name="trash" color="red"/>
            </Pressable>

            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.signoutContainer}>
        <TouchableOpacity style={styles.signoutButton} onPress={handleSignout}>
          <Text style={styles.signoutText}>
            SIGN OUT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    // flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  empty: {
    color: "#888",
  },

  list: {
    // flex: 1,
    padding: 12,
    backgroundColor: "#ffffffff",
  },

  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111",
    marginHorizontal: cardMargin,
    width: (screenWidth / 2) - (cardMargin * 3),
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  deleteButton: {
    position: "absolute",
    right: 0,
    margin: 10,
  },

  signoutContainer: {
    padding: 10,
    backgroundColor: "#898989ff",
    justifyContent: "center",
    alignItems: "center",
  },
  signoutButton: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#ff0000ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signoutText: {
    fontWeight: 800,
    color: "#ffffff"
  }
});