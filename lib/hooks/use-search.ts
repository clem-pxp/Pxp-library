"use client";

import { useQuery } from "@tanstack/react-query";
import type { SearchComponent } from "@/app/api/search/route";

async function fetchSearchResults(query: string): Promise<SearchComponent[]> {
  if (!query || query.length < 1) return [];

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length >= 1,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}
