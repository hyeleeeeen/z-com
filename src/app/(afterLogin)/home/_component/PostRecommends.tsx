"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]] -> 2차원 배열
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // 마지막 게시물
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({ //
    threshold: 0, // inView가 보이자 마자 호출
    delay: 0, // 몇초후 이벤트 발생?
  });

  useEffect(() => {
    if (inView) { // inView div가 화면에 보이자마자 true로 변함
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, inView]); 

  if(isError) {
    return '에러처리해!!'
  }

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} /> 
    </>
  );
}
