import { DAY_TO_KOREAN } from "@/constants/dayToKorean";

export const formatLocalDate = (localDate: Date = new Date()) => {
  const month = localDate.getMonth() + 1;
  const date = localDate.getDate();
  const dayIndex = getDayIndexStartMonth(localDate);
  const koreanDay = DAY_TO_KOREAN[dayIndex].label; // 월

  //1월 24일 토요일
  const formattedDay = `${month}월 ${date}일 ${koreanDay}요일`;
  return formattedDay;
};

export const getDayIndexStartMonth = (localDate: Date = new Date()) => {
  const dayIndex = localDate.getDay() === 0 ? 6 : localDate.getDay() - 1; // 월요일 시작
  return dayIndex;
};
