import BackButton from "../_component/BackButton";
import SearchForm from "../_component/SearchForm";
import Tab from "./_component/Tab";
import style from './search.module.css';
import SearchResult from "./_component/SearchResult";
import { Metadata } from "next";


type Props ={
  searchParams: { q: string, f?: string, pf?:string }
}

export async function generateMetadata({searchParams}: Props): Promise<Metadata> { // 동적으로 생성
  return {
    title: `${searchParams.q} - 검색 / Z`,
    description: `${searchParams.q} - 검색 / Z`,
  }
} 

export default function Search({ searchParams }: Props) {
  return (
    <div className={style.main}>
      <header className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </header>
      <div className={style.list}>
      <SearchResult searchParams={searchParams} /> 
      </div>
    </div>
  );
}
