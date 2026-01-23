"use client";
import MainIcon from "@/assets/level1.svg";
import Logo from "@/assets/logo.svg";

import { NavigationBar } from "@/components/common/NavigationBar";

const Home = () => {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <MainIcon className="h-[92px] w-[91px]" />
        <Logo className="h-[70px] w-[114px]" />
      </div>
      <nav className="fixed inset-x-0 bottom-0 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>
    </main>
  );
};
export default Home;
