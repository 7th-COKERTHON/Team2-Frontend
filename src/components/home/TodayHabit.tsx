"use client";
import { useCallback, useEffect, useState } from "react";

import { getHabitList } from "@/app/api/habit";

import { Habit, WeeklyCheckStatus } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";
import { getDoDays } from "@/utils/getDoDays";

import { HabitItem } from "./HabitItem";

export const TodayHabit = () => {
  const todayIndex = getDayIndexStartMonth(new Date());
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

  // 오늘의 다짐만 필터링
  const todayHabits = habits.filter(habit => habit.isToday);
  if (todayHabits.length === 0)
    return <p className="text-gray-200">오늘의 다짐이 없어요</p>;

  return (
    <div className="flex w-full flex-col gap-5">
      {todayHabits.map((habit, idx) => {
        const doDays = getDoDays(habit.weeklyCheckStatus as WeeklyCheckStatus);

        return (
          <HabitItem
            key={habit.id}
            habitId={habit.id}
            title={habit.resolution}
            doDays={doDays}
            habitIdx={idx + 1}
            todayIndex={todayIndex}
            onDelete={fetchHabits}
          />
        );
      })}
    </div>
  );
};
