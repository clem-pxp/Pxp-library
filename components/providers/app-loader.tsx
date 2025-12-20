"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { CurrentUser } from "@/src/lib/auth-utils";
import type { CategoryWithCount } from "@/lib/data/categories";

async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const res = await fetch("/api/user/me");
  if (!res.ok) return null;
  return res.json();
}

async function fetchCategories(): Promise<CategoryWithCount[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export function AppLoader({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["currentUser"],
      queryFn: fetchCurrentUser,
      staleTime: 1000 * 60 * 10,
    });

    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: fetchCategories,
      staleTime: 1000 * 60 * 10,
    });
  }, [queryClient]);

  return <>{children}</>;
}
