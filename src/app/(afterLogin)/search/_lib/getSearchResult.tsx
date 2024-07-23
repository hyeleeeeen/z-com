import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";

export const getSearchResult: QueryFunction<Post[],[_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]>
   = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey; // 구조분해 할당
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${urlSearchParams.toString()}`, {
    next: {
      tags: ["posts", "search", searchParams.q], // 지정된 것만 새로고침
    }, // 서버쪽 캐싱
    credentials: 'include',
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
