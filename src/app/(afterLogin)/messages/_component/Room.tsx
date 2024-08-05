"use client";

import style from "../message.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";
import type {Room} from '@/model/Room'
import { useSession } from "next-auth/react";

dayjs.locale("ko");
dayjs.extend(relativeTime); // 페이지마다 설정

type Props = {
  room: Room;
};

export default function Room({ room }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const onClick =() => {
    router.push(`/messages/${room.room}`);
  };
  
  const user = room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={user.image} alt={user.id}/>
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp;
          ·
          &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {room.content}
        </div>
      </div>
    </div>
  )
}