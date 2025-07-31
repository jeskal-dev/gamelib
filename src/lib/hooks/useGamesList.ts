import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import type { RAWGRequest } from '../api/request';
import { rawg } from '../api/services/rwag';

export const createGameListOptions = (query?: Partial<RAWGRequest>) => {
  return queryOptions({
    queryKey: ['games', query],
    queryFn: ({ signal }) => rawg.getGameList(query as RAWGRequest, { signal }),
  });
};

export const createInfiniteGameListOptions = (query: Partial<RAWGRequest> = {}) => {
  return infiniteQueryOptions({
    queryKey: ['games', 'infinite', query],
    queryFn: ({ signal, pageParam = 1 }) =>
      rawg.getGameList({ ...query, page: Number(pageParam) } as RAWGRequest, {
        signal,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      flatResults: data.pages.flatMap((page) => page.results),
      count: data.pages.at(-1)?.count ,
    }),
    initialPageParam: 1,
    maxPages: 10,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useGameList = (query?: Partial<RAWGRequest>) => {
  return useQuery(createGameListOptions(query));
};

export const useInfiniteGameList = (query?: Partial<RAWGRequest>) => {
  return useInfiniteQuery(createInfiniteGameListOptions(query));
};
