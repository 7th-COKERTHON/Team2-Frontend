"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { getHabitsExplore } from "@/app/api/habit";
import { saveHabit } from "@/app/api/habit";

import Dropdown from "@/assets/dropdown.svg";
import Level1 from "@/assets/level1.svg";
import Scrap from "@/assets/scrap.svg";
import ScrapFill from "@/assets/scrap_fill.svg";

import { NavigationBar } from "@/components/common/NavigationBar";

import { Habit } from "@/types/habit";

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
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Habits Explore API 호출
        const habits: Habit[] = await getHabitsExplore(20);

        // 로컬스토리지에서 저장된 feed 복구
        const saved = localStorage.getItem("savedFeedIds");
        if (saved) setSavedIds(JSON.parse(saved));

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Habit -> FeedItem 변환 (랜덤 날짜 포함)
        const processed: FeedItem[] = habits.map((habit, idx) => {
          const randomTime =
            oneWeekAgo.getTime() +
            Math.random() * (now.getTime() - oneWeekAgo.getTime());
          return {
            id: habit.id,
            username: "익명",
            badHabit: habit.badBehavior,
            resolution: habit.resolution,
            date: new Date(randomTime),
          };
        });

        setFeeds(processed);
      } catch (error) {
        console.error("Habits Explore 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (id: number) => {
    try {
      // API 호출
      await saveHabit(id);

      // 로컬 상태 업데이트
      let updatedIds: number[];
      if (savedIds.includes(id)) {
        updatedIds = savedIds.filter(savedId => savedId !== id);
      } else {
        updatedIds = [...savedIds, id];
      }

      setSavedIds(updatedIds);
      localStorage.setItem("savedFeedIds", JSON.stringify(updatedIds));

      // 토스트
      setShowToast(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(`Habit ${id} 저장 실패`, error);
    }
  };

  const handleGoHome = () => router.push("/");

  if (isLoading) return null;

  return (
    <div className="bg-gray-20 relative flex h-screen w-full flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="relative z-10 shrink-0 px-5 pt-[70px] pb-5">
        <Level1 className="text-pink-10 pointer-events-none absolute top-[28px] left-[77px] z-0 h-[80px] w-[80px]" />
        <h1 className="text-h2 relative z-10 leading-tight text-gray-100">
          다른 사람의 찔릿한 순간
        </h1>
        <h1 className="text-h2 relative z-10 leading-tight text-gray-100">
          나도 몰랐던 습관을 확인해보세요
        </h1>
      </div>

      {/* 피드 */}
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
                    <p className="text-body2 text-gray-70">{feed.badHabit}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleSave(feed.id)}
                    className="p-1 transition-transform active:scale-95"
                  >
                    {isSaved ? <ScrapFill /> : <Scrap className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 네비 */}
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>

      {/* 토스트 */}
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
