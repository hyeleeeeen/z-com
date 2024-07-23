import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserPosts } from "./_lib/getUserPosts";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import { auth } from "@/auth";
import { getUserServer } from "./_lib/getUserServer";
import { Metadata } from "next";
import { User } from "@/model/User";


type Props = {
  params: { username: string };
};


export async function generateMetadata({params}: Props): Promise<Metadata> { // 동적으로 생성
  const user: User = await getUserServer({ queryKey: ["uesrs",params.username]}); // 데이터 가져오기
  return {
    
    title: `${user.nickname} (${params.username}) / Z`,
    description: `${user.nickname} (${params.username}) / Z`,
  }
} 

export default async function Profile({ params }: Props) {
  const session = await auth();
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ // 서버에서 미리 만들어서 보내줌 (로딩화면띄우기는 불가)
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}
