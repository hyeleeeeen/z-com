"use client";

import { Session } from "@auth/core/types";
import style from "./logoutButton.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  me: Session | null
}


export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  // const { data: me } = useSession();  // 내 정보 불러오기

  const queryClient = useQueryClient();

  const onLogout = () => { 
    queryClient.invalidateQueries({// 캐시된 데이터 날려주기
      queryKey: ["posts"],
    });

    queryClient.invalidateQueries({
      queryKey:["users"],
    })
    signOut({ callbackUrl: '/' })
      .then(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,{ // 로그아웃 서버요청 (connect.sid)
          method: 'post',
          credentials:"include",
        });
        router.refresh();
        router.replace("/");
      });
  };

  if (!me?.user) {
    return null; // 로그아웃버튼 숨기기
  }
  return (
    <button className={style.logoutButton} onClick={onLogout}>
      <div className={style.logoutUserImage}>
        <img src={me.user?.image as  string} alt={me.user?.email as string} /> {/*서버 리소스*/}
      </div>
      <div className={style.logoutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
