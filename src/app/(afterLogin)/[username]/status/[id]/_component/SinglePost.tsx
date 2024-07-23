"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "../_lib/getSinglePost";
import style from '../singlePost.module.css'

type Props = {
  id: string;
  noImage?: boolean;
};

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (error) {
    return <div className={style.noPost}>게시글을 찾을 수 없습니다.</div>
  }

  if (!post) { // 로딩중 상황 (에러x 게시글 x)
    return null;
  }
  return <Post post={post} noImage={noImage} />
}
