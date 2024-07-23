export async function getTrends() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`, { // handler파일과 연동
      next: {
        tags: ["trends"], // 지정된 것만 새로고침
      }, // 서버쪽 캐싱
      credentials: 'include', // 쿠키설정
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  