import { queryOptions, useQuery } from '@tanstack/react-query';
import type { RAWGRequest } from '../api/request';
import { rawg } from '../api/services/rwag';

export const createAnimeListOptions = (query?: RAWGRequest) => {
  return queryOptions({
    queryKey: ['animes', query],
    queryFn: ({ signal }) => rawg.getGameList(query, { signal }),
  });
};

export const useAnimeList = (query?: RAWGRequest) => {
  return useQuery(createAnimeListOptions(query));
};
