"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getComments } from "../_lib/getComments";

type Props = {
  id: string;
  noImage?: boolean;
};

export default function Comments({ id, noImage }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]); // 부모컴포넌트에서 캐싱된 데이터 가져오기
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!post, // 원본 post가 없을때 데이터를 가져오지않는다.
  });

  if (post) {
    // 원본 post가 있을 시에만 표시
    return data?.map((post) => <Post key={post.postId} post={post} noImage={noImage} />);
  }
  return null;
}
