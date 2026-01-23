import habitData from "@/mock/habitData.json";

import { Habit } from "@/types/habit";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";

import { HabitItem } from "./HabitItem";

export const TodayHabit = () => {
  const todayIndex = getDayIndexStartMonth(new Date());

  const todayHabits: Habit[] = habitData.filter(habit => habit.isToday);

  if (todayHabits.length === 0)
    return <p className="text-gray-200">오늘의 다짐이 없어요</p>;

  return (
    <div className="flex w-full flex-col gap-5">
      {todayHabits.map((habit, idx) => (
        <HabitItem
          key={idx}
          title={habit.resolution}
          doDays={habit.doDays}
          habitIdx={idx}
          todayIndex={todayIndex}
        />
      ))}
    </div>
  );
};
