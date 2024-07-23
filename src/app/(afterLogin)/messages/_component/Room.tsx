"use client";

import style from "../message.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";

dayjs.locale("ko");
dayjs.extend(relativeTime); // 페이지마다 설정

export default function Room() {
  const user = {
    id: "your_jin",
    nickname: "안유유진",
    image: "https://image.blip.kr/v1/file/2468e5442b85b5162d79f2c75361fcd5",
    Messages: [
      { roomId: 123, content: "뭐해?", createdAt: new Date() }, // user1의 첫번째 메세지
      { roomId: 123, content: "내일 카페갈래?", createdAt: new Date() }, // 두번째 메세지
    ],
  };

  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };
// onClickCapture()
  return (
    <div className={style.room} onClick={onClick}> 
      <div className={style.roomUserImage}>
        <img src={user.image} alt={user.id} />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div>{user.Messages?.at(-1)?.content}</div>
      </div>
    </div>
  );
}
