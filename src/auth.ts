import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";

export const { handlers: { GET, POST } // API라우트 (실제주소가 된다)
    , signIn, auth } = NextAuth({
        pages: {
            signIn: '/i/flow/login', // 페이지연결
            newUser: '/i/flow/signup',
        },

        // callbacks: { // 로그인 안하고 접근할때 로그인 페이지로 돌리기
        //    async authorized({request, auth}) {
        //    if (!auth) {
        //     return Response.redirect('http://localhost:3000/i/flow/login')
        //    }
        //    return true;
        //    }
        //   },

        events: {
            signOut(data) {
              fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                method: "POST",
                credentials: 'include'
              })}},
      

        providers: [CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, { // 백엔드서버 로그인 (토큰을 쿠키에 넣어서 전송)
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.username,
                        password: credentials.password,
                    }),
                })

                let setCookie = authResponse.headers.get('Set-Cookie');
                console.log('set-cookie', setCookie);
                if (setCookie) {
                    const parsed = cookie.parse(setCookie);
                    cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키심어주기 (프론트서버에 심게 될 경우 보안이슈 )
                }

                if (!authResponse.ok) { // 로그인 실패
                    return null;
                }

                const user = await authResponse.json(); // 로그인 성공시 user정보가 여기에 담김

                return {
                    // user
                    email: user.id,
                    name: user.nickname, // ts때문에 추가 설정
                    image: user.image,
                    ...user,
                }
            },
        }),],
    })