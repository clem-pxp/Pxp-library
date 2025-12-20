"use client";

import { useQuery } from "@tanstack/react-query";
import type { CurrentUser } from "@/src/lib/auth-utils";

async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const res = await fetch("/api/user/me");
  if (!res.ok) return null;
  return res.json();
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}
