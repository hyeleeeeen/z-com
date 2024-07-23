// zustand로 상태 공유하기
// 초기값 설정

import { Post } from "@/model/Post";
import { create } from "zustand";

interface ModalState { // 모드가 comment고 post가 있으면 답글모드로 인식
mode: 'new' | 'comment',
data: Post | null,
setMode(mode: 'new' | 'comment'): void;
setData(data: Post): void;
reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({
    mode: 'new', 
    data: null,
    setMode(mode) {
        set({ mode })
    },
    setData(data) { // 불변성유지를 위해 set 함수로 값 변경
        set({ data })
    },
    reset() {
        set({
            mode: 'new',
            data: null,
        })
    }
}))