import z from "zod/v4";

export const PlatformSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  games_count: z.number(),
  image_background: z.url().nullable(),
});

export type PlatformSchema = z.infer<typeof PlatformSchema>;