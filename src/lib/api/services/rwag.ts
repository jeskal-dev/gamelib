import { http } from '@/lib/config';
import type { AxiosRequestConfig } from 'axios';
import { GameSchema } from '../models';
import { GameDetailSchema } from '../models/GameDetail';
import { parseResponse } from '../parser/parseResponse';
import type { RAWGRequest } from '../request';
import { RAWGResponse } from '../response';
import { GenreSchema } from '../models/Genre';
import { PlatformSchema } from '../models/Plataform';

export const rawg = {
  async getGameList(query?: RAWGRequest, axios?: AxiosRequestConfig) {
    const response = await http.get('/games', {
      ...axios,
      params: query,
    });
    const parsed = parseResponse(RAWGResponse(GameSchema), response.data);
    return parsed;
  },

  async getGameDetails(id: number, axios?: AxiosRequestConfig) {
    const response = await http.get(`/games/${id}`, axios);
    const parsed = parseResponse(GameDetailSchema, response.data);
    return parsed;
  },
  async getGenres(query?: Partial<RAWGRequest>, axios?: AxiosRequestConfig) {
    const response = await http.get('/genres', {
      ...axios,
      params: query,
    });
   
    const parsed = parseResponse(RAWGResponse(GenreSchema), response.data);
     
    return parsed;
  },
  async getPlatforms(query?: Partial<RAWGRequest>, axios?: AxiosRequestConfig) {
    const response = await http.get('/platforms', {
      ...axios,
      params: query,
    });
    const parsed = parseResponse(RAWGResponse(PlatformSchema), response.data);
    return parsed;
  },
};
