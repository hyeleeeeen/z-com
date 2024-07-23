import style from "./trend.module.css";
import Link from "next/link";
import {Hashtag} from '@/model/Hashtag'

type Prop = {
  trend: Hashtag;
};

export default function Trend({ trend }: Prop) {
  return ( // '#'주소창에서 빼기 작업
    <Link href={`/search?q=${encodeURIComponent(trend.title)}`} className={style.container}> 
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
