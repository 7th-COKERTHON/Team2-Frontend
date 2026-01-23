import type { Metadata } from "next";
import localfont from "next/font/local";

// import "@/styles/globals.css";
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
};

const pretendard = localfont({
  src: "../../public/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});
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
        {children}
      </body>
    </html>
  );
}
