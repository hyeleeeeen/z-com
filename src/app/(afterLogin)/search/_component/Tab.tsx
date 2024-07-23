"use client";

import style from "../search.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const [tab, setTab] = useState("hot");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickHot = ()  => {
    setTab("hot");
    const newSearchParams = new URLSearchParams(searchParams) // 현재 쿼리 매개변수를 복사하여 새로운 객체를 생성
    newSearchParams.delete('f')
    router.replace(`/search?${newSearchParams.toString()}`) // 쿼리 매개변수들을 문자열 형태로 변환
  };

  const onClickNew = () => {
    setTab("new");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('f','live')
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div hidden={tab === "new"} className={style.tabIndicator}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div hidden={tab === "hot"} className={style.tabIndicator}></div>
        </div>
      </div>
    </div>
  );
}
