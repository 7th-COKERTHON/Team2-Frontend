"use client";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import MainIcon from "@/assets/level1.svg";
import PlusIcon from "@/assets/plus.svg";

import { NavigationBar } from "@/components/common/NavigationBar";
import { EmptyBg } from "@/components/home/EmptyBg";
import { HabitTracker } from "@/components/home/HabitTracker";
import { TodayHabit } from "@/components/home/TodayHabit";

import { Habit } from "@/types/habit";

import { formatLocalDate } from "@/utils/formatLocalDate";

import { getHabitList } from "./api/habit";

const Home = () => {
  // redirect("/login");
  // return null;
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHabitList();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError("다짐 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  if (loading) return <p className="text-gray-200">불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const today = new Date();

  return (
    <main className="relative mb-[100px] h-screen w-full overflow-y-auto">
      <div className="h-full">
        <section className="absolute top-[50px] left-5 flex items-center gap-[5px]">
          <MainIcon className="h-11 w-[43px] text-pink-50" />
          <p className="text-h2 text-gray-100">{formatLocalDate(today)}</p>
        </section>
        {habits.length === 0 ? (
          <EmptyBg />
        ) : (
          <section className="absolute inset-x-0 top-[114px] mx-auto flex flex-col gap-[25px] px-5 pb-[105px]">
            <section className="flex flex-col gap-[15px]">
              <div className="flex flex-col items-start gap-[2px]">
                <h1 className="text-h3 text-gray-100">오늘의 다짐</h1>
                <p className="text-b4 text-gray-100">
                  오늘은 이거 하나에 집중해봐요
                </p>
              </div>
              <TodayHabit data={habits} onDelete={fetchHabits} />
            </section>
            <section className="flex flex-col gap-[15px]">
              <div className="flex flex-col items-start gap-[2px]">
                <h1 className="text-h3 text-gray-100">나의 다짐</h1>
                <p className="text-b4 text-gray-100">매일 체크하며 실천해요</p>
              </div>
              <HabitTracker data={habits} onDelete={fetchHabits} />
            </section>
          </section>
        )}
      </div>
      <nav className="fixed inset-x-0 bottom-0 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>
      <div className="fixed inset-x-0 bottom-[105px] z-50 mx-auto w-full max-w-[390px]">
        <div className="flex justify-end pr-5">
          <button
            className="bg-gray-10 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.15)]"
            onClick={() => router.push("/habit/add")}
          >
            <PlusIcon className="text-pink-10" />
          </button>
        </div>
      </div>
    </main>
  );
};
export default Home;
