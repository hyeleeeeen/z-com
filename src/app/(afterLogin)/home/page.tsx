import style from "./home.module.css";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabProvider from "./_component/TabProvider";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/auth";

export const metadata = {
title: "홈 / Z",
description: "홈",
}


export default async function Home() {
  const session = await auth();
  return (
    // Suspense 안에서만 로딩 생성
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
