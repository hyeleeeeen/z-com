// type 지정을 위한 파일

interface UserID {
    id: string,
}

export interface User {
    id: string;
    nickname: string;
    image: string;
    Followers: UserID[],
    _count: {
        Followers: number,
        Followings: number,
    }
}