export async function getFollowingPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`, {
      next: {
        tags: ["posts", "followings"], // 지정된 것만 새로고침
      }, // 서버쪽 캐싱
      credentials: 'include', // 쿠키설정
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  