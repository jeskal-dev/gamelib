import z from 'zod/v4';

export const RAWGRequest = z.object({
  page: z.number(),
  page_size: z.number(),
  search: z.string(),
  ordering: z.string(),
  metacritic: z.string(),
  dates: z.string(),
  genres: z.string(),
  platforms: z.string(),
});

export type RAWGRequest = z.infer<typeof RAWGRequest>;
