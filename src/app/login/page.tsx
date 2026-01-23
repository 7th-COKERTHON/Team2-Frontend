"use client";

import MainIcon from "@/assets/level1.svg";
import Logo from "@/assets/logo.svg";

import { LoginBtn } from "@/components/auth/LoginBtb";
import { UserProfile } from "@/components/auth/UserProfile";

export default function Login() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <MainIcon className="h-[92px] w-[91px]" />
          <Logo className="h-[70px] w-[114px]" />
        </div>
        <div className="flex gap-[3px]">
          <h1 className="text-b2">내 무의식의 나쁜 습관을,</h1>
          <h1 className="text-h3 text-gray-100">찔릿</h1>
        </div>
      </div>

      {/* 프로필 영역 */}
      <div className="mt-10">
        <UserProfile />
      </div>

      {/* 로그인 버튼 */}
      <div className="absolute bottom-[74px] w-full px-5">
        <LoginBtn />
      </div>
    </main>
  );
}
