export async function getFollowRecommends() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`, { // handler파일과 연동
      next: {
        tags: ["users","followRecommends"], // 키값 설정 (이 키값만 새로고침)
      }, // 서버쪽 캐싱
      credentials: 'include', // 쿠키설정 (로그인 여부)
      cache: "no-store", // 캐싱x 데이터업데이트
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  