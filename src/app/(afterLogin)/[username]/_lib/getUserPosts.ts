import { Post } from '@/model/Post'
import { QueryFunction } from "@tanstack/query-core";

export const getUserPosts: QueryFunction<Post[], [_1:string,_2:string, string]> = async({ queryKey }) => {
    const [_1, _2, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts?cursor=0`, {
        next: {
            tags: ["posts", "users", username], // 지정된 것만 새로고침
        }, // 서버쪽 캐싱
        cache: 'no-store',
    });
    console.log(res);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}