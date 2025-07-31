import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { rawg } from "../api/services/rwag";
import type { RAWGRequest } from "../api/request";

export const createPlatformsOptions = (query?: RAWGRequest) => {
  return queryOptions({
    queryKey: ['platforms', query],
    queryFn: ({ signal }) => rawg.getPlatforms(query, { signal }),
  });
};

export const createInfinitePlatformsOptions = (query: Partial<RAWGRequest> = {}) => {
  return infiniteQueryOptions({
    queryKey: ['platforms', 'infinite', query],
    queryFn: ({ signal, pageParam = 1 }) =>
      rawg.getPlatforms({ ...query, page: Number(pageParam) }, { signal }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      flatResults: data.pages.flatMap((page) =>
        page.results.map((p) => ({
          ...p,
          option: {
            value: p.id,
            label: p.name,
          },
        }))
      ),
    }),
    initialPageParam: 1,
    maxPages: 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const usePlatforms = (query?: RAWGRequest) => {
  return useQuery(createPlatformsOptions(query));
};

export const useInfinitePlatforms = (query?: Partial<RAWGRequest>) => {
  return useInfiniteQuery(createInfinitePlatformsOptions(query));
};