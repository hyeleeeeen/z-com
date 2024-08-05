"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    // Object: 모든값이 다 가능. 객체x
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  return null;
}
