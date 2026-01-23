import habitData from "@/mock/habitData.json";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";

import { HabitItem } from "./HabitItem";

export const TodayHabit = () => {
  const todayIndex = getDayIndexStartMonth(new Date());
  const habit = habitData[0];

  return (
    <div className="flex w-full flex-col gap-5">
      <HabitItem
        title={habit.title}
        doDays={habit.doDays}
        habitIdx={0}
        todayIndex={todayIndex}
      />
    </div>
  );
};
