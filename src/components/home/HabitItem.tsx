import { useState } from "react";

import MenuIcon from "@/assets/kebab menu.svg";
import MainIcon from "@/assets/level1.svg";

import { DAY_TO_KOREAN } from "@/constants/dayToKorean";
import { INDEX_COLOR_MAP } from "@/constants/indexColor";

import { HabitMenuModal } from "./HabitMenuModal";

interface HabitItemProps {
  title: string;
  doDays: string[];
  habitIdx: number;
  todayIndex: number;
}

export const HabitItem = ({
  title,
  doDays,
  habitIdx,
  todayIndex,
}: HabitItemProps) => {
  const colorSet = INDEX_COLOR_MAP[habitIdx % INDEX_COLOR_MAP.length];
  const { lightColor, mainColor, bgColor } = colorSet;

  const [buttonClick, setButtonClick] = useState(false);
  const [modalPos, setModalPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const modalWidth = 390;
    const x = Math.min(rect.right, window.innerWidth - modalWidth / 2);
    setButtonClick(true);
    setModalPos({ x: x, y: rect.bottom });
  };

  return (
    <div className="bg-gray-10 relative flex h-[157px] w-full flex-col items-center justify-center rounded-[20px] shadow-[0_0_10px_-2px_rgba(0,0,0,0.10)]">
      <button
        className="absolute top-[30px] right-[14px] cursor-pointer"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </button>

      <div className="flex gap-[6px]">
        <MainIcon className={`h-[23px] w-[23px] ${lightColor}`} />
        <p className="text-h3 text-gray-100">{title}</p>
      </div>

      {/* 요일 라벨 */}
      <div className="mt-[10px] mb-[15px] flex gap-[25px]">
        {DAY_TO_KOREAN.map(({ label, key }, dayIdx) => {
          const isToday = dayIdx === todayIndex;

          return (
            <div
              key={key}
              className={`${
                isToday ? `${mainColor} text-cap-b` : "text-gray-70 text-cap"
              } w-[19px]`}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* 상태 아이콘 */}
      <div className="flex gap-[12px]">
        {DAY_TO_KOREAN.map(({ key }, dayIdx) => {
          const habitDone = dayIdx <= todayIndex && doDays.includes(key);

          return (
            <div
              key={key}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                habitDone ? bgColor : "bg-gray-50"
              }`}
            >
              <MainIcon
                className={`h-[22px] w-[22px] ${
                  habitDone ? mainColor : "text-gray-70"
                }`}
              />
            </div>
          );
        })}
      </div>

      {buttonClick && (
        <>
          {/* 배경 dim */}
          <div
            className="fixed inset-0 z-80 bg-gray-100/50"
            onClick={() => setButtonClick(false)}
          />

          {/* 모달: 위치 그대로 */}
          <div className="absolute top-[20px] right-[14px] z-90">
            <HabitMenuModal onClose={() => setButtonClick(false)} />
          </div>
        </>
      )}
    </div>
  );
};
