import { Post } from "../types/post";
import { api } from "./api";

export async function getAllPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/posts");
  return res.data;
}

export async function createPost(post: {
  title: string;
  image: string;
  coords: { longitude: number; latitude: number };
}): Promise<Post> {
  const res = await api.post<Post>("/posts", post, { authRequired: true });
  return res.data;
}

export async function getMyPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/posts/user/me", {
    authRequired: true,
  });
  return res.data;
}

export async function deletePost(postId: string): Promise<void> {
  await api.delete(`/posts/${postId}`, {
    authRequired: true,
  });
}