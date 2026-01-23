"use client";

import { signOut } from "next-auth/react";

export function LogoutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-b1 w-full rounded-xl bg-gray-200 py-4 text-center text-gray-800"
    >
      로그아웃
    </button>
  );
}
