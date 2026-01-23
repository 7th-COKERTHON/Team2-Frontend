"use client";

import Kakao from "@/assets/kakao.svg";

export function LoginBtn() {
  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_AUTH_KAKAO_ID;
    const REDIRECT_URI = "http://localhost:3000/login/callback";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="bg-yellow flex h-15 w-full items-center justify-center gap-3 rounded-xl p-[10px]"
    >
      <Kakao className="h-5 w-5" />
      <p className="text-b3 text-gray-100"> 카카오로 계속하기</p>
    </button>
  );
}
