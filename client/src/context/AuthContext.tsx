"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // We track if component is mounted to avoid SSR issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only run localStorage code on client after mounted
  useEffect(() => {
    if (!mounted) return;

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Sync token across tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (loading) return;

    const protectedRoutes = [
      "/government/dashboard",
      "/government/complaints",
      "/government/something-else",
    ];

    if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
      router.replace("/government/login");
      return;
    }

    if (token && (pathname === "/government/login" || pathname === "/government/register")) {
      router.replace("/government/dashboard");
    }
  }, [token, pathname, router, loading, mounted]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    router.replace("/government/dashboard");
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    router.replace("/government/login");
  };

  if (!mounted || loading) {
    return <div>Loading auth...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
