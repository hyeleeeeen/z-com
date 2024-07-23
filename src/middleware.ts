import { auth } from "@/auth"
import { NextResponse } from "next/server";
// 페이지 접근 권한 설정


export async function middleware() {
    const session = await auth();
    if (!session) {
        return NextResponse.redirect('http://localhost:80/i/flow/login');
    } // 로그인 정보가 없다면 로그인페이지로 리다이렉션
}

export const config = {
    matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'], // 로그인 전용 페이지
} // 위 페이지에서만 middleware 함수가 실행됨.