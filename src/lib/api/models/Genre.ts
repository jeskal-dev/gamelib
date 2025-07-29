import { z } from 'zod/v4';

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  games_count: z.number(),
  image_background: z.url(),
});

export type GenreSchema = z.infer<typeof GenreSchema>;
