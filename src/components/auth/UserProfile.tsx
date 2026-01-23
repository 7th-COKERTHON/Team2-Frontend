"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

import { useAuthStore } from "@/stores/useAuthStore";

export function UserProfile() {
  const { user, isLoggedIn } = useAuthStore();

  if (!isLoggedIn || !user)
    return <p className="text-gray-500">로그인이 필요합니다.</p>;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border p-6 shadow-sm">
      {user.image && (
        <Image
          src={user.image}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
        />
      )}
      <h2 className="text-xl font-bold">{user.name}님 반가워요!</h2>
      <p className="text-gray-500">{user.email}</p>
      <button
        onClick={() => signOut()}
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        로그아웃
      </button>
    </div>
  );
}
