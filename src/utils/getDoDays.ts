import { WeeklyCheckStatus } from "@/types/habit";

export function getDoDays(status: WeeklyCheckStatus): string[] {
  return Object.entries(status)
    .filter(([_, checked]) => checked)
    .map(([day]) => day);
}
