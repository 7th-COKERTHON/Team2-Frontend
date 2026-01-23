import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.NEXT_PUBLIC_AUTH_KAKAO_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_KAKAO_SECRET,
    }),
  ],
  callbacks: {
    // 1. 로그인 성공 후, JWT를 생성할 때 실행됨
    async jwt({ token, account }) {
      if (account && account.provider === "kakao") {
        try {
          // 2. 백엔드로 카카오 액세스 토큰 전송하여 서비스 전용 토큰 발급받기
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accessToken: account.access_token,
              }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            // 3. 백엔드에서 받은 토큰을 JWT에 저장
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
            token.id = data.userId; // 유저 ID 등 필요한 정보 저장
          } else {
            console.error("백엔드 로그인 실패");
          }
        } catch (error) {
          console.error("백엔드 통신 에러", error);
        }
      }
      return token;
    },

    // 4. 클라이언트에서 세션을 조회할 때(useSession) 실행됨
    async session({ session, token }) {
      // JWT에 저장된 토큰을 세션으로 전달
      if (token.accessToken) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.userId = token.userId as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // 에러 발생 시 리다이렉트 될 페이지
  },
});
