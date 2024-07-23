import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth"; // 사용자의 세션을 확인하는 함수
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth(); // 사용자의 세션 정보를 반환
  if (session?.user) {  // 로그인 됐다면 
    redirect('/home'); // /home으로 이동
    return null;
  }
  return <Main />;
}
