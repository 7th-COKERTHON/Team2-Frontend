"use client";

import { SessionProvider, useSession } from "next-auth/react";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

function AuthSync() {
  const { data: session, status } = useSession();
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      login(session.user);
    } else if (status === "unauthenticated") {
      logout();
    }
  }, [session, status, login, logout]);

  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}
