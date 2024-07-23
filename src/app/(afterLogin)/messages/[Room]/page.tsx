import style from "./chatRoom.module.css";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import cx from 'classnames'

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function ChatRoom() {
  const user = {
    id: "your_jin",
    nickname: "안유유진",
    image: "https://image.blip.kr/v1/file/2468e5442b85b5162d79f2c75361fcd5",
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "one1young",
      content: "ㅎㅇㅎㅇ",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "your_jin",
      content: "내일 카페갈래?",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div><h2>{user.nickname}</h2></div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "one1young") {
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)} // cx로 클래스 합성
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
