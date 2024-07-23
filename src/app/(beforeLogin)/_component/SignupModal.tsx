"use client";

import style from "@/app/(beforeLogin)/_component/signup.module.css";
import BackButton from "./BackButton";
import onSubmit from "@/app/(beforeLogin)/_lib/signup";
import { useFormState, useFormStatus } from "react-dom";

const showMessage = (message: string | null | undefined) => {
  if (message === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (message === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (message === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (message === "no_image") {
    return "이미지를 업로드하세요.";
  }
  if (message === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  return "";
};

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <BackButton />
          <div>계정을 생성하세요.</div>
        </div>
        <form action={formAction}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                className={style.input}
                id="id"
                name="id"
                type="text"
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="name">
                닉네임
              </label>
              <input
                className={style.input}
                id="name"
                type="text"
                name="name"
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                className={style.input}
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="image">
                프로필
              </label>
              <input
                className={style.input}
                id="image"
                type="file"
                name="image"
                required
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <button
              className={style.actionButton}
              type="submit"
              disabled={pending}
            >
              가입하기
            </button>
            <div className={style.error}>{showMessage(state?.message)}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
