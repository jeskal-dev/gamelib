import { queryOptions, useQuery } from '@tanstack/react-query';
import { rawg } from '../api/services/rwag';

export const createAnimeDetailsOptions = (id: number) => {
  return queryOptions({
    queryKey: ['animes', 'details', id],
    queryFn: () => rawg.getGameDetails(id),
  });
};

export const useAnimeDetails = (id: number) => {
  return useQuery(createAnimeDetailsOptions(id));
};
