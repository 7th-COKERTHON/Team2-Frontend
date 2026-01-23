"use server";

import { signIn } from "@/auth";

export async function loginWithKakao() {
  await signIn("kakao");
}
