import type { Metadata, Viewport } from "next";
import localfont from "next/font/local";

import ServiceWorkerRegister from "@/components/sw-register";

// import "@/styles/globals.css";

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

export const metadata: Metadata = {
  // iOS 홈 화면 아이콘 설정
  appleWebApp: {
    title: "찔릿", // ios에서 short-name로 사용하는 옵션.
    capable: true, // 웹앱 모드 활성화
    statusBarStyle: "black-translucent", // 상태바 투명/검정 등 설정
  },

  // 아이콘 연결
  icons: {
    icon: "/images/zzillit-192.png",
    apple: "/images/zzillit-192.png", // 아이폰은 이 이미지를 씀
  },
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
      <body className="flex h-screen w-full max-w-[440px] overflow-y-scroll">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
