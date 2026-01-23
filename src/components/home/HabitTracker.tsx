"use client"; // Next.js 13 app 디렉토리 기준
import { useEffect, useState } from "react";

import { getHabitList } from "@/app/api/habit";

import { Habit, WeeklyCheckStatus } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";
import { getDoDays } from "@/utils/getDoDays";

import { HabitItem } from "./HabitItem";

export const HabitTracker = () => {
  const todayIndex = getDayIndexStartMonth(new Date());
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabitList();
        setHabits(data);
      } catch (err) {
        setError("다짐 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) return <p className="text-gray-200">불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // isToday가 아닌 항목만 보여주기
  const trackerHabits = habits.filter(habit => !habit.isToday);
  if (trackerHabits.length === 0)
    return <p className="text-gray-200">등록된 다짐이 없어요</p>;

  return (
    <div className="flex w-full flex-col gap-5">
      {trackerHabits.map((habit, idx) => {
        const doDays = getDoDays(habit.weeklyCheckStatus as WeeklyCheckStatus);

        return (
          <HabitItem
            key={habit.id}
            title={habit.resolution}
            doDays={doDays}
            habitIdx={idx + 1}
            todayIndex={todayIndex}
          />
        );
      })}
    </div>
  );
};
