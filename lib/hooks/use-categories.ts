"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryWithCount } from "@/lib/data/categories";

async function fetchCategories(): Promise<CategoryWithCount[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}

export function usePrefetchCategories() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: fetchCategories,
    });
  };
}
