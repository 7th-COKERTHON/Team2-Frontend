"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import Dropdown from "@/assets/dropdown.svg";
import Level1 from "@/assets/level1.svg";
import Scrap from "@/assets/scrap.svg";
import ScrapFill from "@/assets/scrap_fill.svg";

import { NavigationBar } from "@/components/common/NavigationBar";

import rawFeedData from "@/mock/feedData.json";

interface FeedItem {
  id: number;
  username: string;
  badHabit: string;
  resolution: string;
  date: Date;
}

export default function ExplorePage() {
  const router = useRouter();
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]); // 초기값 빈 배열
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  // 1. 초기 데이터 로드 및 로컬스토리지 복구
  useEffect(() => {
    setTimeout(() => {
      const saved = localStorage.getItem("savedFeedIds");
      if (saved) setSavedIds(JSON.parse(saved));

      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const shuffled = [...rawFeedData].sort(() => 0.5 - Math.random());
      const selectedRaw = shuffled.slice(0, 20);

      const processed: FeedItem[] = selectedRaw.map(item => {
        const randomTime =
          oneWeekAgo.getTime() +
          Math.random() * (now.getTime() - oneWeekAgo.getTime());
        return {
          id: item.id,
          username: "익명",
          badHabit: item.badHabit,
          resolution: item.resolution,
          date: new Date(randomTime),
        };
      });

      setFeeds(processed);
      setIsLoading(false);
    }, 0);
  }, []);

  // 2. 저장 액션 (로컬스토리지 동기화)
  const handleSave = (id: number) => {
    let updatedIds: number[];

    if (savedIds.includes(id)) {
      updatedIds = savedIds.filter(savedId => savedId !== id);
    } else {
      updatedIds = [...savedIds, id];
    }
    setSavedIds(updatedIds);
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 3000);
  };

  const handleGoHome = () => router.push("/");

  if (isLoading) return null;

  return (
    // 전체 화면을 h-screen으로 고정하고 내부에서 스크롤 분리
    <div className="bg-gray-20 relative flex h-screen w-full flex-col overflow-hidden">
      {/* 고정 헤더 영역 */}
      <div className="relative z-10 shrink-0 px-5 pt-[70px] pb-5">
        <Level1 className="text-pink-10 pointer-events-none absolute top-[28px] left-[77px] z-0 h-[80px] w-[80px]" />
        <h1 className="text-h2 relative z-10 leading-tight text-gray-100">
          다른 사람의 찔릿한 순간
        </h1>
        <h1 className="text-h2 relative z-10 leading-tight text-gray-100">
          나도 몰랐던 습관을 확인해보세요
        </h1>
      </div>

      {/* 스크롤 가능한 피드 영역 */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-5 pb-[100px]">
        <div className="flex flex-col gap-4">
          {feeds.map(feed => {
            const isSaved = savedIds.includes(feed.id);

            return (
              <div
                key={feed.id}
                className="z-10 flex flex-row gap-[15px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all"
              >
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 pb-[8px]">
                    <span className="text-gray-70 text-cap bg-gray-30 rounded-[16px] px-2 py-1 font-medium">
                      {feed.username}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <h3 className="text-h3 text-gray-100">{feed.resolution}</h3>
                    <p className="text-body2 text-gray-70 line-clamp-1">
                      {feed.badHabit}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleSave(feed.id)}
                    className="p-1 transition-transform active:scale-95"
                  >
                    {isSaved ? <ScrapFill /> : <Scrap className="h-5 w-5" />}
                  </button>
                  <button className="p-1">
                    <Dropdown className="text-gray-40 h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 네비게이션 고정 */}
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="animate-in fixed right-0 bottom-[102px] left-0 z-50 flex justify-center px-5">
          <div className="flex w-full max-w-[350px] items-center justify-between rounded-xl bg-pink-50 px-5 py-4 text-gray-100 shadow-lg">
            <span className="text-b3 font-medium">다짐이 저장되었어요!</span>
            <button
              onClick={handleGoHome}
              className="font-bold whitespace-nowrap underline"
            >
              보러가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
