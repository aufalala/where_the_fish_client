import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { deletePost, getMyPosts } from "../../src/services/post.service";
import { Post } from "../../src/types/post";

export default function Profile() {
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
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>

            <Pressable onPress={() => onDelete(item._id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
    padding: 12,
    backgroundColor: "#000",
  },

  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111",
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

  delete: {
    color: "#ff3b30",
    fontWeight: "600",
  },
});