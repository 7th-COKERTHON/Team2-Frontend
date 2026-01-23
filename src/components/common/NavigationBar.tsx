import HomeIcon from "@/assets/navbar/home.svg";
import MypageIcon from "@/assets/navbar/mypage.svg";
import SearchIcon from "@/assets/navbar/search.svg";

export const NavigationBar = () => {
  return (
    <nav className="flex w-full items-center gap-25 px-5 pt-[15px] pb-[37px]">
      <div className="flex flex-col gap-[5px]">
        <HomeIcon className="h-5 w-5" />
        <p className="text-cap">홈</p>
      </div>
      <div className="flex flex-col gap-[5px]">
        <SearchIcon className="h-5 w-5" />
        <p className="text-cap">탐색하기</p>
      </div>
      <div className="flex flex-col gap-[5px]">
        <MypageIcon className="h-5 w-5" />
        <p className="text-cap">마이페이지</p>
      </div>
    </nav>
  );
};
