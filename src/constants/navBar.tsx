export const NAV_BAR = [
  { key: "home", label: "홈" },
  { key: "explore", label: "탐색하기" },
  { key: "mypage", label: "마이페이지" },
] as const;

export type NavBarKey = (typeof NAV_BAR)[number]["key"];
