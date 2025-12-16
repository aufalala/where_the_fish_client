import Constants from "expo-constants";
import * as Location from "expo-location";
import { useState } from "react";
import { createPost } from "../services/post.service";

const { 
  EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
} = Constants.expoConfig?.extra || {};

export function usePhotoUpload() {
  const [loading, setLoading] = useState(false);

  const submitPost = async (photoUri: string, title: string) => {
    if (!photoUri || !title) throw new Error("Missing data");
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission denied");
      }
      
      const location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;

      const formData = new FormData();
      formData.append("file", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("upload_preset", EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      await createPost({ title, image: imageUrl, coords: { longitude, latitude } });
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitPost };
}
