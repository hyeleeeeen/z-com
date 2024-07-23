import { getPostRecommends } from "../_lib/getPostRecommends";
import TabDecider from "./TabDecider";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function TabDeciderSuspense() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
      // 서버에서 데이터 미리가져와서 저장
      queryKey: ["posts", "recommends"], // queryKey 배열을 가지고 있을때는
      queryFn: getPostRecommends, // queryFn 함수를 실행해서 데이터를 가져와라
      initialPageParam: 0, // 인피니트 스크롤링 설정 (초기 cursor값)
    });
    const dehydratedState = dehydrate(queryClient); // 상태저장
  
  return (//  클라이언트 측에서 데이터 복원
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
