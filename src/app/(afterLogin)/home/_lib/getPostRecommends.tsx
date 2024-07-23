type Props ={
  pageParam? : number
};

export async function getPostRecommends({pageParam}: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`, {
    next: {
      tags: ["posts", "recommends"], // 지정된 것만 새로고침
    },
  });


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }


  // revalidatePath('/home'); // home 페이지에 관련된 모든 요청(데이터)을 새로고침
  return res.json();
}
