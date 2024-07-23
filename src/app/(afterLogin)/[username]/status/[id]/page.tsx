import BackButton from "@/app/(afterLogin)/_component/BackButton";
import CommentForm from "./_component/CommentForm";
import style from "./singlePost.module.css";
import SinglePost from "./_component/SinglePost";
import Comments from "./_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getComments } from "./_lib/getComments";
import { Metadata } from "next";
import { getUserServer } from "../../_lib/getUserServer";
import { User } from "@/model/User";
import { Post } from "@/model/Post";
import { getSinglePostServer } from "./_lib/getSinglePostServer";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 동적으로 생성
  const user: User = await getUserServer({
    queryKey: ["uesrs", params.username],
  }); // 데이터 가져오기
  const post: Post = await getSinglePostServer({ 
    queryKey: ["posts", params.id] });
  return {
    title: `Z에서 ${user.nickname}님: ${post.content} / Z`,
    description: `${user.nickname} (${params.username}) / Z`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = params; // const id = params.id;
  const queryClient = new QueryClient(); // 데이터 캐싱 및 관리
  await queryClient.prefetchQuery({
    // 데이터 미리 불러오기
    queryKey: ["posts", id], // 쿼리를 식별하는 유니크한 키
    queryFn: getSinglePostServer, // 데이터를 가져오는 함수
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <header className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </header>
        <main>
          <SinglePost id={id} />
          <CommentForm id={id} />
          <div>
            <Comments id={id} />
          </div>
        </main>
      </HydrationBoundary>
    </div>
  );
}
