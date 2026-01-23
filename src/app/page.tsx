"use client";
import MainIcon from "@/assets/level1.svg";
import Logo from "@/assets/logo.svg";

const Home = () => {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <MainIcon className="h-[92px] w-[91px]" />
        <Logo className="h-[70px] w-[114px]" />
      </div>
    </main>
  );
};
export default Home;
