import habitData from "@/mock/habitData.json";

import { Habit } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";

import { HabitItem } from "./HabitItem";

export const HabitTracker = () => {
  const todayIndex = getDayIndexStartMonth(new Date());

  // isToday가 아닌 항목만 보여주기
  const trackerHabits: Habit[] = habitData.filter(habit => !habit.isToday);

  return (
    <div className="flex w-full flex-col gap-5">
      {trackerHabits.map((habit, idx) => (
        <HabitItem
          key={idx}
          title={habit.resolution}
          doDays={habit.doDays}
          habitIdx={idx + 1}
          todayIndex={todayIndex}
        />
      ))}
    </div>
  );
};
