import { Habit, HabitCreate } from "@/types/habit";
import { HabitExploreResponse } from "@/types/habit";

import { apiClient } from "./apiClient";

const TOKEN =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJjaHJpc3ljaG9lQG5hdmVyLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NjkyMDEyMDUsImV4cCI6MTc2OTI4NzYwNX0.RTZTGfIIqfQbk-YOAKUgHzWF8mSbqbI4oosJlWqWzawNtoZpaHZzIIHCp4U78eGlYpsbn1GQ6ifnlBpbNEdFRg";

// 공통 헤더
const authHeader = { Authorization: `Bearer ${TOKEN}` };

//습관작성
export const postHabit = async (habit: HabitCreate) => {
  try {
    // 최소값 보장
    const payload = {
      badBehavior: habit.badBehavior || "나쁜 습관",
      resolution: habit.resolution || "다짐",
    };

    // 실제 POST 요청
    const response = await apiClient.post("/habits", payload, {
      headers: authHeader, // 토큰 포함
    });

    return response.data; // 서버에서 반환된 Habit 객체
  } catch (error) {
    console.error("Failed to post habit:", error);
    throw error;
  }
};

// 홈에서 다짐 리스트
export const getHabitList = async (): Promise<Habit[]> => {
  try {
    const response = await apiClient.get<HabitExploreResponse>("/habits", {
      headers: authHeader,
    });
    return response.data.data;
  } catch (error) {
    console.error("Habit 목록 조회 실패:", error);
    throw error;
  }
};

// 홈에서 다짐 삭제
export const deleteHabit = async (habitId: number | string) => {
  try {
    const response = await apiClient.delete(`/habits/${habitId}`, {
      headers: authHeader,
    });
    return response.data;
  } catch (error) {
    console.error("Habit 삭제 실패:", error);
    throw error;
  }
};

// GET 탐색용 Habit 목록 (토큰 있음)
export const getHabitsExplore = async (size: number = 20): Promise<Habit[]> => {
  try {
    const response = await apiClient.get<HabitExploreResponse>(
      `/habits/explore?size=${size}`,
      { headers: authHeader },
    );
    return response.data.data;
  } catch (error) {
    console.error("Habits Explore 조회 실패:", error);
    throw error;
  }
};

// 탐색하기 습관 저장
export const saveHabit = async (habitId: number | string) => {
  try {
    const response = await apiClient.post(`/habits/${habitId}/save`, null, {
      headers: authHeader,
    });
    return response.data;
  } catch (error) {
    console.error(`Habit ${habitId} 저장 실패:`, error);
    throw error;
  }
};
