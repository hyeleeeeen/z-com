import Home from "@/app/(afterLogin)/home/page";

type Props = {
  // 주소창속의 정보들이 params에 들어있음
  params: {
    username: string;
    id: string;
    photoId: string;
  };
};

export default function page({ params }: Props) {
  // 모달 뒷 배경

  params.username; // 워녕이
  params.id;
  params.photoId;
  return <Home />;
}
