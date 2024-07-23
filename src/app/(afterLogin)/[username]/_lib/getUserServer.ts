import { cookies } from "next/headers";

// 서버컴포넌트에 import 용
export const getUserServer = async ({ queryKey }: { queryKey: [string, string] }) => { // 구조적 타이핑 (최소타입만 작성)
  const [_1, username] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, {
    next: {
      tags: ['users', username], // 지정된 것만 새로고침
    }, // 서버쪽 캐싱
    credentials: "include",
    headers: { Cookie: cookies().toString() }, // 서버에서 브라우저에 쿠키전달
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
