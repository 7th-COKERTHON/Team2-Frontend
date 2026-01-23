"use client";
import MainIcon from "@/assets/level1.svg";

import { NavigationBar } from "@/components/common/NavigationBar";
import { HabitItem } from "@/components/home/HabitItem";
import { HabitTracker } from "@/components/home/HabitTracker";
import { TodayHabit } from "@/components/home/TodayHabit";

import { formatLocalDate } from "@/utils/formatLocalDate";

const Home = () => {
  const today = new Date();
  return (
    <main className="bg-gray-20 relative mb-[100px] h-screen w-full overflow-y-auto">
      <div className="h-full">
        <section className="absolute top-10 left-5 flex items-center gap-[5px]">
          <MainIcon className="h-11 w-[43px] text-pink-50" />
          <p className="text-h2 text-gray-100">{formatLocalDate(today)}</p>
        </section>
        <section className="absolute inset-x-0 top-[114px] mx-auto flex flex-col gap-[25px] px-5 pb-[105px]">
          <div>
            <h1 className="text-h3 text-gray-100">오늘의 다짐</h1>
            <p className="text-b4 text-gray-100">매일 체크하며 실천해요</p>
          </div>
          <TodayHabit />
          <div>
            <h1 className="text-h3 text-gray-100">나의 다짐</h1>
            <p className="text-b4 text-gray-100">매일 체크하며 실천해요</p>
          </div>
          <HabitTracker />
        </section>
      </div>
      <nav className="fixed inset-x-0 bottom-0 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>
    </main>
  );
};
export default Home;
