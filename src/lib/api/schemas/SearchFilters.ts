import z from 'zod/v4';

export const SearchFiltersSchema = z.object({
  ordering: z.string().optional(),
  genres: z.string().optional(),
  platforms: z.string().optional(),
  dates: z.string().optional(),
  metacritic: z.string().optional(),
});
export type SearchFilters = z.infer<typeof SearchFiltersSchema>;
