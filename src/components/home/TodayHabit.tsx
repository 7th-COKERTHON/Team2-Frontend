"use client";
import { useCallback, useEffect, useState } from "react";

import { getHabitList } from "@/app/api/habit";

import { Habit, WeeklyCheckStatus } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";
import { getDoDays } from "@/utils/getDoDays";

import { HabitItem } from "./HabitItem";

interface TodayHabitProps {
  data: Habit[];
  onDelete: () => void;
}
export const TodayHabit = ({ data, onDelete }: TodayHabitProps) => {
  const todayIndex = getDayIndexStartMonth(new Date());

  // 오늘의 다짐만 필터링
  const todayHabits = data.filter(data => data.isToday);
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
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};
