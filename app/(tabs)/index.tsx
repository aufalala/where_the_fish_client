// import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

// import MapboxGL from '@rnmapbox/maps';
// import Constants from 'expo-constants';
// import { SafeAreaView } from "react-native-safe-area-context";
// import ThemedView from "../../src/components/themed/ThemedView";

// import { useEffect, useState } from "react";
// import { getAllPosts } from "../../src/services/post.service";
// import { Post } from "../../src/types/post";

// const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
// MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

// export default function Home() {

//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedPost, setSelectedPost] = useState<any | null>(null);

//   useEffect(() => {
//     getAllPosts().then(setPosts).catch(console.error);
//   }, []);


//   return (
//     <SafeAreaView style={styles.safeContainer} edges={["top"]}>
//       <ThemedView style={styles.container}>
        
//         {Platform.OS !== "web" && (
//           <MapboxGL.MapView style={styles.map}>
//             <MapboxGL.Camera
//               zoomLevel={12}
//               pitch={100}
//               centerCoordinate={[-122.4324, 37.78825]}
//             />

//             <MapboxGL.Images
//               images={posts.reduce((acc, post) => {
//                 acc[post._id] = { uri: post.image };
//                 return acc;
//               }, {} as Record<string, { uri: string }>)}
//             />

//             <MapboxGL.ShapeSource
//               id="posts"
//               shape={{
//                 type: "FeatureCollection",
//                 features: posts.map((post) => ({
//                   type: "Feature",
//                   properties: { icon: post._id, postId: post._id },
//                   geometry: {
//                     type: "Point",
//                     coordinates: post.location.coordinates,
//                   },
//                 })),
//               }}
//               onPress={(e) => {
//                 const feature = e.features?.[0];
//                 if (!feature?.properties) return;

//                 const props = feature.properties as { postId: string };
//                 const post = posts.find((p) => p._id === props.postId);
//                 if (post) setSelectedPost(post);
//               }}
//             >
//               <MapboxGL.SymbolLayer
//                 id="postMarkers"
//                 style={{
//                   iconImage: ["get", "icon"],
//                   iconAllowOverlap: true,
//                   iconSize: [
//                     "interpolate",
//                     ["linear"],
//                     ["zoom"],
//                     0, 0.01,
//                     12, 0.1,
//                     16, 0.1,
//                   ],
//                 }}
//               />
//             </MapboxGL.ShapeSource>
//           </MapboxGL.MapView>
//         )}

//         {selectedPost && (
//           <View style={styles.preview}>
//             <Image
//               source={{ uri: selectedPost.image }}
//               style={styles.previewImage}
//             />

//             <Text style={styles.previewTitle}>
//               {selectedPost.title}
//             </Text>

//             <Pressable onPress={() => setSelectedPost(null)}>
//               <Text style={styles.previewClose}>Close</Text>
//             </Pressable>
//           </View>
//         )}


//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     marginBottom: 32,
//     textAlign: "center",
//     color: "#fff",
//   },

//   map: {
//     flex: 1
//   },
//   marker: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#FF3B30",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },


//   preview: {
//     position: "absolute",
//     bottom: 20,
//     left: 16,
//     right: 16,
//     backgroundColor: "#111",
//     borderRadius: 16,
//     padding: 12,
//   },

//   previewImage: {
//     width: "100%",
//     height: "auto",
//     aspectRatio: 1/1,
//     borderRadius: 12,
//     marginBottom: 8,
//   },

//   previewTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   previewClose: {
//     color: "#FF3B30",
//     marginTop: 8,
//     textAlign: "right",
//   },


// });

//////////////////////////////////////////////////////////////

// import MapboxGL from '@rnmapbox/maps';
// import Constants from 'expo-constants';
// import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ThemedView from "../../src/components/themed/ThemedView";

// import { useEffect, useRef, useState } from "react";
// import { getAllPosts } from "../../src/services/post.service";
// import { Post } from "../../src/types/post";

// const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
// MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

// export default function Home() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const mapRef = useRef<MapboxGL.MapView>(null);
//   const shapeSourceRef = useRef<MapboxGL.ShapeSource>(null);
//   const cameraRef = useRef<MapboxGL.Camera>(null);



//   useEffect(() => {
//     getAllPosts().then(setPosts).catch(console.error);
//   }, []);

//   const onClusterPress = async (clusterFeature: any) => {
//     if (!shapeSourceRef.current || !cameraRef.current) return;

//     const clusterId = clusterFeature.properties.cluster_id;

//     const zoom = await shapeSourceRef.current.getClusterExpansionZoom(
//       clusterId
//     );

//     cameraRef.current.setCamera({
//       centerCoordinate: clusterFeature.geometry.coordinates,
//       zoomLevel: zoom,
//       animationDuration: 500,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.safeContainer} edges={["top"]}>
//       <ThemedView style={styles.container}>
//         {Platform.OS !== "web" && (
//           <MapboxGL.MapView style={styles.map} ref={mapRef}>
//             <MapboxGL.Camera
//               ref={cameraRef}
//               zoomLevel={12}
//               pitch={0}
//               centerCoordinate={[103.851959, 1.29027]}
//             />

//             <MapboxGL.Images
//               images={posts.reduce((acc, post) => {
//                 acc[post._id] = { uri: post.image };
//                 return acc;
//               }, {} as Record<string, { uri: string }>)}
//             />

//             <MapboxGL.ShapeSource
//               {...({
//                 id: "posts",
//                 ref: shapeSourceRef,
//                 cluster: true,
//                 clusterRadius: 50,
//                 clusterMaxZoom: 14,
//                 shape: {
//                   type: "FeatureCollection",
//                   features: posts.map((post) => ({
//                     type: "Feature",
//                     properties: { icon: post._id, postId: post._id },
//                     geometry: {
//                       type: "Point",
//                       coordinates: post.location.coordinates,
//                     },
//                   })),
//                 },
//                 onPress: (e: any) => {
//                   const feature = e.features?.[0];
//                   if (!feature?.properties) return;

//                   if (feature.properties.cluster) {
//                     onClusterPress(feature);
//                     return;
//                   }

//                   const postId = feature.properties.postId as string;
//                   const post = posts.find((p) => p._id === postId);
//                   if (post) setSelectedPost(post);
//                 },
//               } as any)}
//             >
//               <>
//               <MapboxGL.CircleLayer
//                 id="clusteredPoints"
//                 belowLayerID="postMarkers"
//                 filter={['has', 'point_count']}
//                 style={{
//                   circleColor: '#FF3B30',
//                   circleRadius: 25,
//                   circleOpacity: 0.8,
//                   circleStrokeWidth: 2,
//                   circleStrokeColor: '#fff',
//                 }}
//               />

//               <MapboxGL.SymbolLayer
//                 id="clusterCount"
//                 filter={['has', 'point_count']}
//                 style={{
//                   textField: ['get', 'point_count'],
//                   textSize: 14,
//                   textColor: '#fff',
//                   textIgnorePlacement: true,
//                   textAllowOverlap: true,
//                 }}
//               />

//               <MapboxGL.SymbolLayer
//                 id="postMarkers"
//                 filter={['!', ['has', 'point_count']]}
//                 style={{
//                   iconImage: ['get', 'icon'],
//                   iconSize: 0.25,
//                   iconAllowOverlap: true,
//                 }}
//               />
//               </>
//             </MapboxGL.ShapeSource>
//           </MapboxGL.MapView>
//         )}

//         {selectedPost && (
//           <View style={styles.preview}>
//             <Image
//               source={{ uri: selectedPost.image }}
//               style={styles.previewImage}
//             />
//             <Text style={styles.previewTitle}>{selectedPost.title}</Text>
//             <Pressable onPress={() => setSelectedPost(null)}>
//               <Text style={styles.previewClose}>Close</Text>
//             </Pressable>
//           </View>
//         )}
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: { flex: 1 },
//   container: { flex: 1 },
//   map: { flex: 1 },
//   preview: {
//     position: "absolute",
//     bottom: 20,
//     left: 16,
//     right: 16,
//     backgroundColor: "#111",
//     borderRadius: 16,
//     padding: 12,
//   },
//   previewImage: {
//     width: "100%",
//     height: "auto",
//     aspectRatio: 1 / 1,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   previewTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   previewClose: { color: "#FF3B30", marginTop: 8, textAlign: "right" },
// });


//////////////////////////////////////////
/////////////////////////////////////////////

// import MapboxGL from '@rnmapbox/maps';
// import Constants from 'expo-constants';
// import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ThemedView from "../../src/components/themed/ThemedView";

// import { useEffect, useRef, useState } from "react";
// import { getAllPosts } from "../../src/services/post.service";
// import { Post } from "../../src/types/post";

// const { MAPBOX_PUBLIC_TOKEN } = Constants.expoConfig?.extra || {};
// MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

// export default function Home() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const mapRef = useRef<MapboxGL.MapView>(null);
//   const cameraRef = useRef<MapboxGL.Camera>(null);

//   useEffect(() => {
//     getAllPosts().then(setPosts).catch(console.error);
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeContainer} edges={["top"]}>
//       <ThemedView style={styles.container}>
//         {Platform.OS !== "web" && (
//           <MapboxGL.MapView style={styles.map} ref={mapRef}>
//             <MapboxGL.Camera
//               ref={cameraRef}
//               zoomLevel={12}
//               pitch={0}
//               centerCoordinate={[103.851959, 1.29027]}
//             />

//             <MapboxGL.Images
//               images={posts.reduce((acc, post) => {
//                 acc[post._id] = { uri: post.image };
//                 return acc;
//               }, {} as Record<string, { uri: string }>)}
//             />

//             <MapboxGL.ShapeSource
//               id="posts"
//               shape={{
//                 type: "FeatureCollection",
//                 features: posts.map((post) => ({
//                   type: "Feature",
//                   properties: { icon: post._id, postId: post._id },
//                   geometry: { type: "Point", coordinates: post.location.coordinates },
//                 })),
//               }}
//               onPress={(e) => {
//                 const feature = e.features?.[0];
//                 if (!feature?.properties) return;
//                 const postId = feature.properties.postId as string;
//                 const post = posts.find((p) => p._id === postId);
//                 if (post) setSelectedPost(post);
//               }}
//             >
//               <MapboxGL.SymbolLayer
//                 id="postMarkers"
//                 style={{
//                   iconImage: ['get', 'icon'],
//                   iconAllowOverlap: true,
//                   iconSize: [
//                     'interpolate',
//                     ['linear'],
//                     ['zoom'],
//                     0, 0.01,
//                     10, 0.1,
//                     12, 0.1,
//                     16, 0.2,
//                     20, 0.25
//                   ],
//                 }}
//               />
//             </MapboxGL.ShapeSource>
//           </MapboxGL.MapView>
//         )}

//         {selectedPost && (
//           <View style={styles.preview}>
//             <Image
//               source={{ uri: selectedPost.image }}
//               style={styles.previewImage}
//             />
//             <Text style={styles.previewTitle}>{selectedPost.title}</Text>
//             <Pressable onPress={() => setSelectedPost(null)}>
//               <Text style={styles.previewClose}>Close</Text>
//             </Pressable>
//           </View>
//         )}
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeContainer: { flex: 1 },
//   container: { flex: 1 },
//   map: { flex: 1 },
//   preview: {
//     position: "absolute",
//     bottom: 20,
//     left: 16,
//     right: 16,
//     backgroundColor: "#111",
//     borderRadius: 16,
//     padding: 12,
//   },
//   previewImage: {
//     width: "100%",
//     height: "auto",
//     aspectRatio: 1 / 1,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   previewTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   previewClose: { color: "#FF3B30", marginTop: 8, textAlign: "right" },
// });


///////////////////////////
/////////////////////////////
///////////////////////////////



import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import { useEffect, useRef, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
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
  // const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const cameraRef = useRef<MapboxGL.Camera>(null);
  const isUserInteractingRef = useRef(false);
  // const mapRef = useRef<MapboxGL.MapView>(null);

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
    getAllPosts().then(setPosts).catch(console.error);
    setIsFollowingUser(true);
  }, []);



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
              // followUserLocation
              // followZoomLevel={14}
              // zoomLevel={12}
              // centerCoordinate={[103.851959, 1.29027]}
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
                  iconAllowOverlap: true,
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
              showsUserHeadingIndicator
              // onUpdate={(loc) => {
              //   setUserLocation([
              //     loc.coords.longitude,
              //     loc.coords.latitude,
              //   ]);
              // }}
            />

          </MapboxGL.MapView>
        )}

        <Pressable
          style={styles.recenterButton}
          onPress={() => {
            setIsFollowingUser(true);
          }}

          // onPress={async () => {
          //   if (!cameraRef.current) return;

          //   const location = await MapboxGL.locationManager.getLastKnownLocation();
          //   if (!location) return;

          //   cameraRef.current.setCamera({
          //     centerCoordinate: [
          //       location.coords.longitude,
          //       location.coords.latitude,
          //     ],
          //     zoomLevel: 15,
          //     animationDuration: 600,
          //   });
          // }}
        >
          <Text style={styles.recenterText}>◎</Text>
        </Pressable>

        {selectedPost && (
          <View style={styles.preview}>
            
            <Image
              source={{ uri: selectedPost.image }}
              style={styles.previewImage}
            />

            <Text style={styles.previewTitle}>
              {selectedPost.title}
            </Text>
            
            <Pressable onPress={() => setSelectedPost(null)}>
              <Text style={styles.previewClose}>Close</Text>
            </Pressable>

          </View>
        )}

      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  container: { flex: 1 },
  map: { flex: 1 },

  preview: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#111",
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

  previewTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  previewClose: { color: "#FF3B30", marginTop: 8, textAlign: "right" },

  recenterButton: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  recenterText: {
    color: '#fff',
    fontSize: 20,
  },

});

