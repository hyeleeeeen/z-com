import { QueryFunction } from "@tanstack/react-query";
import { Post } from '@/model/Post'

export const getUserPosts: QueryFunction<Post[], [_1:string,_2:string, string]> = async({ queryKey }) => {
    const [_1, _2, username] = queryKey;
    const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, { // handler파일과 연동
        next: {
            tags: ["posts", "users", username], // 지정된 것만 새로고침
        }, // 서버쪽 캐싱
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}