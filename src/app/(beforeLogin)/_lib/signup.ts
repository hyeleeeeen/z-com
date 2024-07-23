"use server"; // 서버 API

import { redirect } from "next/navigation";
import { signIn } from '@/auth' // 서버


export default async function onSubmit(prevState: any, formData: FormData) {


    if (!formData.get("id") || !(formData.get('id') as string)?.trim()) {
        // form 데이터 유효성검증 (input의 name 값으로)
        return { message: "no_id" };
    }

    if (!formData.get("password") || !(formData.get('password') as string)?.trim()) {
        return { message: "no_password" };
    }

    if (!formData.get("name") || !(formData.get('name') as string)?.trim()) {
        return { message: "no_name" };
    }

    if (!formData.get("image")) {
        return { message: "no_image" };
    }

    formData.set('nickname', formData.get('name') as string);
    let shouldRedirect = false;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            {
                // 서버로 요청보내기
                method: "post",
                body: formData,
                credentials: "include", // 세션쿠키 전달 (필수)
            }
        );
        console.log(response.status);
        if (response.status === 403) {
            return { message: "user_exists" };
        }

        console.log(await response.json());
        shouldRedirect = true;

        await signIn("credentials", { // 회원가입 후 바로 로그인
            username: formData.get('id'),
            password: formData.get('password'),
            redirect: false, // 서버쪽 리다이렉트
        });
        
    } catch (err) {
        console.log(err);
        return { message:null };
    }

    if (shouldRedirect) {
        redirect("/home"); // try/catch문 안에서 X
    }
};