"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import Dropdown from "@/assets/dropdown.svg";
import Level1 from "@/assets/level1.svg";
import Scrap from "@/assets/scrap.svg";

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
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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

    // 핵심 수정: microtask로 상태 업데이트 넘김
    queueMicrotask(() => {
      setFeeds(processed);
      setIsLoading(false);
    });
  }, []);

  const handleSave = (id: number) => {
    if (!savedIds.includes(id)) {
      setSavedIds(prev => [...prev, id]);
    }

    setShowToast(true);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleGoHome = () => router.push("/");

  if (isLoading) return null;

  return (
    <div className="bg-gray-20 relative flex min-h-screen w-full flex-col pb-10">
      <div className="relative z-10 px-5 pt-[70px] pb-5">
        <h1 className="text-h2 leading-tight text-gray-100">
          다른 사람의 찔릿한 순간
        </h1>
        <h1 className="text-h2 leading-tight text-gray-100">
          나도 몰랐던 습관을 확인해보세요
        </h1>
      </div>

      <div className="flex w-full flex-col gap-4 px-5">
        <Level1 className="pointer-events-none absolute top-[28px] right-[204px] left-[77px] z-0 h-[80px] w-[80px] opacity-50" />

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
                  <Scrap
                    style={{
                      stroke: isSaved ? "#FF5C8A" : "#C4C4C4",
                      fill: "none",
                    }}
                    className="h-5 w-5 transition-colors"
                  />
                </button>

                <button className="p-1">
                  <Dropdown className="text-gray-40 h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showToast && (
        <div className="fixed right-0 bottom-[90px] left-0 z-50 flex justify-center px-5">
          <div className="flex w-full max-w-[420px] items-center justify-between rounded-xl bg-[#FF9EC4] px-5 py-4 text-gray-100 shadow-lg">
            <span className="text-b3 text-gray-100">다짐이 저장되었어요!</span>
            <button
              onClick={handleGoHome}
              className="font-semibold whitespace-nowrap text-gray-100"
            >
              보러가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
