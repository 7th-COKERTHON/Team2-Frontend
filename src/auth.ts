import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Kakao from "next-auth/providers/kakao";

// JWT 만료 시간을 추출하기 위한 간단한 유틸리티 함수
function getJwtExpiration(token: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    return payload.exp * 1000;
  } catch (error) {
    console.error("[JWT Parsing Error] 토큰 파싱 실패:", error);
    return Date.now() + 60 * 60 * 1000;
  }
}

// [수정] 반환 타입을 Promise<JWT>로 명시
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("[Token Refresh] 토큰 갱신을 시도합니다.");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

    if (!token.refreshToken) {
      console.error("[Token Refresh Error] Refresh Token이 없습니다.");
      throw new Error("No Refresh Token");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[Token Refresh Error] 응답 실패:", result);
      throw result;
    }

    const { data } = result;
    console.log("[Token Refresh Success] 토큰 갱신 성공");

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: getJwtExpiration(data.accessToken),
      error: undefined, // 성공 시 에러 필드 제거
    } as JWT; // [수정] JWT 타입으로 강제 변환
  } catch (error) {
    console.error("[Token Refresh Exception] 통신 에러:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    } as JWT; // [수정] JWT 타입으로 강제 변환
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Kakao({
      clientId: process.env.NEXT_PUBLIC_AUTH_KAKAO_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_KAKAO_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 1. 최초 로그인 시
      if (account && account.provider === "kakao") {
        console.log(
          "[Login Start] 카카오 로그인 감지. 백엔드로 토큰 전송 시도...",
        );
        try {
          const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`;

          const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: account.access_token,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            const data = result.data || result;

            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
            token.userId = data.userId;
            token.accessTokenExpires = getJwtExpiration(data.accessToken);
          } else {
            const errorText = await response.text();
            console.error("[Backend Error] 백엔드 로그인 실패:", errorText);
          }
        } catch (error) {
          console.error("[Network Error] 백엔드 통신 오류:", error);
        }
        return token;
      }

      // 2. 토큰 만료 체크
      const now = Date.now();
      const expiresAt = token.accessTokenExpires as number;

      if (expiresAt && now < expiresAt - 60000) {
        return token;
      }

      console.log("[Token Expired] 토큰이 만료되었습니다.");

      // 3. 토큰 갱신 (반환값이 Promise<JWT>이므로 await 결과는 JWT)
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.userId = token.userId as number;
        session.user.error = token.error as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
