"use client";
import MainIcon from "@/assets/level1.svg";

import { NavigationBar } from "@/components/common/NavigationBar";

import { formatLocalDate } from "@/utils/formatLocalDate";

const Home = () => {
  const today = new Date();
  return (
    <main className="bg-gray-20 relative w-full">
      <section className="absolute top-10 left-5 flex items-center gap-[5px]">
        <MainIcon className="h-11 w-[43px]" />
        <p className="text-h2 text-gray-100">{formatLocalDate(today)}</p>
      </section>
      <nav className="absolute inset-x-0 bottom-0 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>
    </main>
  );
};
export default Home;
