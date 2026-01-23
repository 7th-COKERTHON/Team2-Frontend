export interface Habit {
  id: number;
  badBehavior: string;
  resolution: string;
  displayOrder: number;
  isOriginal?: boolean;
  originalHabitId?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  isToday?: boolean;
  weeklyCheckStatus: WeeklyCheckStatus;
}

export interface WeeklyCheckStatus {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface HabitExploreResponse {
  status: string;
  timestamp: string;
  data: Habit[];
}

export interface HabitCreate {
  badBehavior: string;
  resolution: string;
}
