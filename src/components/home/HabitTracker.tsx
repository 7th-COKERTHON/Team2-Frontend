"use client";
import { Habit, WeeklyCheckStatus } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";
import { getDoDays } from "@/utils/getDoDays";

import { HabitItem } from "./HabitItem";

interface HabitTrackerProps {
  data: Habit[];
  onDelete: () => void;
}

export const HabitTracker = ({ data, onDelete }: HabitTrackerProps) => {
  const todayIndex = getDayIndexStartMonth(new Date());

  // isToday가 아닌 항목만 보여주기
  const trackerHabits = data.filter(habit => !habit.isToday);
  if (trackerHabits.length === 0)
    return <p className="text-gray-200">등록된 다짐이 없어요</p>;

  return (
    <div className="flex w-full flex-col gap-5">
      {trackerHabits.map((habit, idx) => {
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
