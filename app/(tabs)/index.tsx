import MapboxGL from '@rnmapbox/maps';

import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';

import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedView from "../../src/components/themed/ThemedView";
import { getAllPosts } from "../../src/services/post.service";
import { Post } from "../../src/types/post";

const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const cameraRef = useRef<MapboxGL.Camera>(null);
  const isUserInteractingRef = useRef(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted');
        return;
      }
    })();
  }, []);

  useEffect(() => {
    console.log(isFollowingUser);
  }, [isFollowingUser]);


  useEffect(() => {
    setIsFollowingUser(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, [])
  );

  async function refreshPosts() {
    const data = await getAllPosts();
    setPosts(data);
  }



  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <ThemedView style={styles.container}>
        {Platform.OS !== "web" && (

          <MapboxGL.MapView
            style={styles.map}
            styleURL={"mapbox://styles/aufalala/cmj8tqbe0001x01sa6rnodqm5"}
            projection="globe"
            onTouchStart={() => {
              isUserInteractingRef.current = true;
            }}
            onTouchEnd={() => {
              isUserInteractingRef.current = false;
            }}
            onCameraChanged={() => {
              if (isFollowingUser && isUserInteractingRef.current) {
                setIsFollowingUser(false);
              }
            }}
          >
            <MapboxGL.Camera
              ref={cameraRef}
              followUserLocation={isFollowingUser}
              followZoomLevel={14}
            />

            <MapboxGL.Images
              images={posts.reduce((acc, post) => {
                acc[post._id] = { uri: post.image };
                return acc;
              }, {} as Record<string, { uri: string }>)}
            />

            <MapboxGL.ShapeSource
              id="posts"
              shape={{
                type: "FeatureCollection",
                features: posts.map((post) => ({
                  type: "Feature",
                  properties: { icon: post._id, postId: post._id },
                  geometry: { type: "Point", coordinates: post.location.coordinates },
                })),
              }}
              onPress={(e) => {
                const feature = e.features?.[0];
                if (!feature?.properties) return;
                const postId = feature.properties.postId as string;
                const post = posts.find((p) => p._id === postId);
                if (post) setSelectedPost(post);
              }}
            >
              <MapboxGL.SymbolLayer
                id="postMarkers"
                style={{
                  iconImage: ['get', 'icon'],
                  iconAllowOverlap: false,
                  iconSize: [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 0.01,
                    10, 0.1,
                    12, 0.1,
                    16, 0.2,
                    20, 0.25
                  ],
                }}
              />
            </MapboxGL.ShapeSource>

            <MapboxGL.UserLocation
              visible
            />

          </MapboxGL.MapView>
        )}

        <Pressable
          style={[styles.recenterButton, { opacity: isFollowingUser ? 0.3 : 0.7 }]}
          onPress={() => {
            setIsFollowingUser(true);
          }}
        >
          <Ionicons name="locate" size={30} color={"white"} />
        </Pressable>

        {selectedPost && (
          <Pressable
            style={styles.overlay}
            onPress={() => setSelectedPost(null)}
          >
            <Pressable
              style={styles.preview}
              onPress={() => {}}
            >
              <Image
                source={{ uri: selectedPost.image }}
                style={styles.previewImage}
              />

              <Text style={styles.previewTitle}>
                {selectedPost.title}
              </Text>
              <Text style={styles.previewClose}>{selectedPost.user.username}</Text>
            </Pressable>
          </Pressable>
        )}

      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  container: { flex: 1 },
  map: { flex: 1 },

  overlay: {
      ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "90%",
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    padding: 12,
  },
  previewImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 1 / 1,
    borderRadius: 12,
    marginBottom: 8,
  },

  previewTitle: { color: "#000000ff", fontSize: 16, fontWeight: "600", textAlign: "center" },
  previewClose: { color: "#1973bcff", marginTop: 10, marginBottom: 10, textAlign: "center"},

  recenterButton: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#696969ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b4b4b4ff',
  },
});

