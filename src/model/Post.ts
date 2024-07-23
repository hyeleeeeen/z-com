// 자주쓰는 type 지정을 위한 파일

import { User } from './User';
import { PostImage } from './PostImage';

interface UserID {
    userId: string;
}

export interface Post { // 객체의 타입을 작성
postId: number;
User: User;
content: string;
createdAt: Date;
Images: PostImage[],
Hearts: UserID[],
Reposts: UserID[],
Comments: UserID[],
_count: {
    Hearts: number,
    Reposts: number,
    Comments: number,
},
Parent?: Post; // 답글
Original?: Post; // 재게시
}


