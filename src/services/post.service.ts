import { Post } from "../types/post";
import { api } from "./api";

export async function getAllPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/posts");
  return res.data;
}
