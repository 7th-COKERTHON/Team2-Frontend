import type { Metadata, Viewport } from "next";
import localfont from "next/font/local";

import ServiceWorkerRegister from "@/components/sw-register";

import "@/styles/global.css";

export const metadata: Metadata = {
  title: "찔릿 ZZILLIT",
  description: "무의식의 나쁜 행동을 바로 잡을 수 있는 웹 서비스",
  keywords: [
    "습관",
    "습관형성",
    "나쁜습관",
    "코테이토",
    "해커톤",
    "흑과백",
    "좋은습관",
    "무의식",
    "찔릿",
  ],
  // iOS 홈 화면 아이콘 설정
  appleWebApp: {
    title: "찔릿", // ios에서 short-name로 사용하는 옵션.
    capable: true, // 웹앱 모드 활성화
    statusBarStyle: "black-translucent", // 상태바 투명/검정 등 설정
  },
  icons: {
    icon: "/images/favicon.svg",
    apple: "/images/favicon.svg", // 아이폰은 이 이미지를 씀
  },
};

const pretendard = localfont({
  src: "../../public/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.className} scrollbar-hide flex items-center justify-center`}
    >
      <body className="flex h-screen w-full max-w-[390px] overflow-y-scroll shadow-2xl">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
