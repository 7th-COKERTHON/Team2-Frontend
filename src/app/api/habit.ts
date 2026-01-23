import { Habit } from "@/types/habit";

import { apiClient } from "./apiClient";

export const postHabit = async (habit: Habit): Promise<Habit> => {
  try {
    const response = await apiClient.post<Habit>("/habits", habit);
    return response.data;
  } catch (error) {
    console.error("Failed to post habit:", error);
    throw error;
  }
};
