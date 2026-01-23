"use client";

import { useRouter } from "next/navigation";

import Kakao from "@/assets/kakao.svg";

export function LoginBtn() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="bg-yellow flex h-15 w-full items-center justify-center gap-3 rounded-xl p-[10px]"
    >
      <Kakao className="h-5 w-5" />
      <p className="text-b3 text-gray-100"> 카카오로 계속하기</p>
    </button>
  );
}
