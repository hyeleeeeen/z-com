// 커스텀훅

'use client'

import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { io, Socket } from 'socket.io-client';

let socket: Socket | null; // 안티패턴

export default function useSocket(): [Socket | null, () => void] {
    const { data: session } = useSession();
    const disconnect = useCallback(() => {
        socket?.disconnect();
        socket = null;
    }, []);

    useEffect(() => {
        if (!socket) { // 중복 연결 방지
            socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, // 서버- 웹소켓 연결 하는 주소
                { transports: ['websocket'] }) // 구형 브라우저 제외하는 옵션
            socket.on('connect_error', (err) => {
                console.error(err); // 에러처리
                console.log(`${err.message}이거 때문에 에러발생`);
            })
        }

    }, [session]);

    useEffect(() => {
        if (socket?.connected && session?.user?.email) {
            socket.emit('login', { id: session.user.email });
        }
    })


    return [socket, disconnect];
}