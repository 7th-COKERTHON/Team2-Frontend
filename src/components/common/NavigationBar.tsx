import { useRouter } from "next/navigation";

import { useState } from "react";

import HomeIcon from "@/assets/navbar/home.svg";
import MypageIcon from "@/assets/navbar/mypage.svg";
import SearchIcon from "@/assets/navbar/search.svg";

import { NavBarKey } from "@/constants/navBar";

export const NavigationBar = () => {
  const [activeKey, setActiveKey] = useState<NavBarKey>("home");
  const router = useRouter();
  return (
    <section className="bg-gray-10 flex w-full items-center justify-center gap-25 rounded-t-[20px] px-5 pt-[15px] pb-[37px]">
      <button
        className="flex flex-col items-center gap-[5px]"
        onClick={() => {
          setActiveKey("home");
          router.push("/");
        }}
        key="home"
      >
        <HomeIcon
          className={`${activeKey === "home" ? "text-gray-70" : "text-gray-50"} h-5 w-5`}
        />
        <p
          className={`${activeKey === "home" ? "text-gray-70" : "text-gray-50"} text-lab`}
        >
          홈
        </p>
      </button>
      <button
        className="flex flex-col items-center gap-[5px]"
        onClick={() => {
          setActiveKey("explore");
          router.push("/explore");
        }}
        key="explore"
      >
        <SearchIcon
          className={`${activeKey === "explore" ? "text-gray-70" : "text-gray-50"} h-5 w-5`}
        />
        <p
          className={`${activeKey === "explore" ? "text-gray-70" : "text-gray-50"} text-lab`}
        >
          탐색하기
        </p>
      </button>
      <button
        className="flex flex-col items-center gap-[5px]"
        onClick={() => {
          setActiveKey("mypage");
          router.push("/mypage");
        }}
        key="mypage"
      >
        <MypageIcon
          className={`${activeKey === "mypage" ? "text-gray-70" : "text-gray-50"} h-5 w-5`}
        />
        <p
          className={`${activeKey === "mypage" ? "text-gray-70" : "text-gray-50"} text-lab`}
        >
          마이페이지
        </p>
      </button>
    </section>
  );
};
