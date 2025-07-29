import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import type { RAWGRequest } from '../api/request';
import { rawg } from '../api/services/rwag';

export const createGenresOptions = (query?: RAWGRequest) => {
  return queryOptions({
    queryKey: ['genres', query],
    queryFn: ({ signal }) => rawg.getGenres(query, { signal }),
  });
};

export const createInfiniteGenresOptions = (query: Partial<RAWGRequest> = {}) => {
  return infiniteQueryOptions({
    queryKey: ['genres', 'infinite', query],
    queryFn: ({ signal, pageParam = 1 }) =>
      rawg.getGenres({ ...query, page: Number(pageParam) }, { signal }),
    getNextPageParam: (lastPage) => {
      
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    select: (data) => {
      
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        flatResults: data.pages.flatMap((page) =>
          page.results.map((g) => ({
            ...g,
            option: {
              value: g.id,
              label: g.name,
              image: g.image_background,
            },
          }))
        ),
      };
    },
    initialPageParam: 1,
    maxPages: 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useGenres = (query?: RAWGRequest) => {
  return useQuery(createGenresOptions(query));
};

export const useInfiniteGenres = (query?: Partial<RAWGRequest>) => {
  
  return useInfiniteQuery(createInfiniteGenresOptions(query));
};
