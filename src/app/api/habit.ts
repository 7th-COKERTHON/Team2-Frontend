import { Habit } from "@/types/habit";

import { apiClient } from "./apiClient";

//습관작성
export const postHabit = async (habit: Habit): Promise<Habit> => {
  try {
    const response = await apiClient.post<Habit>("/habits", habit);
    return response.data;
  } catch (error) {
    console.error("Failed to post habit:", error);
    throw error;
  }
};

//홈에서 다짐리스트
export const getHabitList = async (): Promise<Habit[]> => {
  try {
    const response = await apiClient.get<Habit[]>("/habits");
    return response.data;
  } catch (error) {
    console.error("Habit 목록 조회 실패:", error);
    throw error;
  }
};

// 홈에서 다짐 삭제
export const deleteHabit = async (habitId: number | string) => {
  try {
    const response = await apiClient.delete(`/habits/${habitId}`);
    return response.data;
  } catch (error) {
    console.error("Habit 삭제 실패:", error);
    throw error;
  }
};
/** GET 탐색용 Habit 목록 (토큰 없음) */
export const getHabitsExplore = async (size: number = 20): Promise<Habit[]> => {
  try {
    const response = await apiClient.get<Habit[]>(
      `/habits/explore?size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error("Habits Explore 조회 실패:", error);
    throw error;
  }
};
// 탐색하기 습관 저장
export const saveHabit = async (habitId: number | string) => {
  try {
    const response = await apiClient.post(`/habits/${habitId}/save`, null);
    return response.data;
  } catch (error) {
    console.error(`Habit ${habitId} 저장 실패:`, error);
    throw error;
  }
};
