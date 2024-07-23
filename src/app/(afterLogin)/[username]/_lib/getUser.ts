import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/query-core";

export const getUser: QueryFunction<User, [_1: string, _2: string]>
  = async ({ queryKey }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, { // handler파일과 연동
      next: {
        tags: ['users', username], // 지정된 것만 새로고침
      }, // 서버쪽 캐싱
      credentials: "include",
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }


