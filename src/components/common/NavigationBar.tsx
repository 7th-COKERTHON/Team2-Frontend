import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/assets/navbar/home.svg";
import SearchIcon from "@/assets/navbar/search.svg";

import { NavBarKey } from "@/constants/navBar";

export const NavigationBar = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isExplore = pathname.startsWith("/explore");
  return (
    <section className="bg-gray-10 z-90 flex w-full items-center justify-center gap-25 rounded-t-[20px] px-5 pt-[15px] pb-[37px]">
      <Link
        className="flex cursor-pointer flex-col items-center gap-[5px]"
        href={"/"}
        key="home"
      >
        <HomeIcon
          className={`${isHome ? "text-gray-70" : "text-gray-50"} h-5 w-5`}
        />
        <p className={`${isHome ? "text-gray-70" : "text-gray-50"} text-lab`}>
          홈
        </p>
      </Link>
      <Link
        className="flex cursor-pointer flex-col items-center gap-[5px]"
        href={"/explore"}
        key="explore"
      >
        <SearchIcon
          className={`${isExplore ? "text-gray-70" : "text-gray-50"} h-5 w-5`}
        />
        <p
          className={`${isExplore ? "text-gray-70" : "text-gray-50"} text-lab`}
        >
          탐색하기
        </p>
      </Link>
    </section>
  );
};
