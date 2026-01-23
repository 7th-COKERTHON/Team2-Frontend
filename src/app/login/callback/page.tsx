"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      signIn("kakao", { redirect: true, callbackUrl: "/" });
    } else {
      router.push("/login");
    }
  }, [code, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="border-t-primary-500 h-10 w-10 animate-spin rounded-full border-4 border-gray-300" />
      <p className="text-gray-500">로그인 처리 중입니다...</p>
    </div>
  );
}

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
