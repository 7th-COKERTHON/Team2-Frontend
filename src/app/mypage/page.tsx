import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { LogoutBtn } from "@/components/auth/LogOutBtn";

// 1. API 응답 타입 정의
interface UserProfileResponse {
  status: string;
  data: {
    userId: number;
    name: string;
    email: string;
    provider: string;
    nickname: string;
    level: number;
    levelProgress: number;
  };
}

// 2. 사용자 정보 가져오는 함수 (Server Side Fetching)
async function getUserProfile(
  accessToken: string,
): Promise<UserProfileResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // 최신 데이터 유지를 위해 캐시 사용 안 함
    });

    if (!res.ok) {
      console.error("사용자 정보 조회 실패:", await res.text());
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("API 통신 에러:", error);
    return null;
  }
}

export default async function MyPage() {
  const session = await auth();

  // 비로그인 상태면 로그인 페이지로 리다이렉트
  if (!session || !session.user.accessToken) {
    redirect("/login");
  }

  // API 호출하여 최신 정보 가져오기
  const profileResponse = await getUserProfile(session.user.accessToken);
  const user = profileResponse?.data;

  // API 호출 실패 시 세션 정보라도 보여주기 위한 폴백(Fallback)
  const displayName =
    user?.nickname || user?.name || session.user.name || "이름 없음";
  const displayEmail = user?.email || session.user.email || "";
  const displayImage = session.user.image; // 카카오 이미지는 세션에 있음
  const displayLevel = user?.level ?? 1;
  const displayProgress = user?.levelProgress ?? 0;

  return (
    <main className="flex-co l relative flex min-h-screen w-full bg-gray-900 text-white">
      <div className="flex flex-1 flex-col px-5 pt-10">
        <h1 className="text-h2 mb-8">마이페이지</h1>

        {/* 1. 프로필 섹션 */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-700 bg-gray-800">
            {displayImage ? (
              <Image
                src={displayImage}
                alt="프로필 이미지"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                No IMG
              </div>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-h3">{displayName}</h2>
            <p className="text-b2 text-gray-400">{displayEmail}</p>
          </div>
        </div>

        {/* 2. 레벨 및 진행도 카드 */}
        <div className="mb-8 rounded-2xl bg-gray-800 p-5 shadow-lg">
          <div className="mb-3 flex items-end justify-between">
            <span className="text-b1 font-bold text-gray-200">현재 레벨</span>
            <span className="text-h3 text-primary-400">Lv. {displayLevel}</span>
          </div>

          {/* 진행도 바 */}
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className="bg-primary-500 absolute top-0 left-0 h-full transition-all duration-500"
              style={{ width: `${Math.min(displayProgress * 100, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-gray-400">
            다음 레벨까지 {Math.round(displayProgress * 100)}%
          </p>
        </div>

        {/* 3. 개발자 디버깅용 (필요 시 주석 처리) */}
        <div className="mb-10 flex flex-col gap-2 rounded-lg bg-black/30 p-4">
          <h3 className="text-xs font-bold text-gray-500">DEVELOPER INFO</h3>
          <div className="flex flex-col gap-1 overflow-hidden text-[10px] text-gray-500">
            <p>ID: {user?.userId || session.user.userId}</p>
            <p>Provider: {user?.provider || "kakao"}</p>
            <p className="truncate">
              Token: {session.user.accessToken?.slice(0, 15)}...
            </p>
          </div>
        </div>

        {/* 4. 로그아웃 버튼 */}
        <div className="mt-auto mb-24">
          <LogoutBtn />
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
    </main>
  );
}
