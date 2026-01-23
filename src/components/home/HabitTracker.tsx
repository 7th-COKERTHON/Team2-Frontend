import habitData from "@/mock/habitData.json";

import { getDayIndexStartMonth } from "@/utils/formatLocalDate";

import { HabitItem } from "./HabitItem";

export const HabitTracker = () => {
  const todayIndex = getDayIndexStartMonth(new Date());

  return (
    <div className="flex w-full flex-col gap-5">
      {habitData.map((habit, idx) => (
        <HabitItem
          key={idx}
          title={habit.title}
          doDays={habit.doDays}
          habitIdx={idx + 1}
          todayIndex={todayIndex}
        />
      ))}
    </div>
  );
};
