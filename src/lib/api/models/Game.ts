import z from "zod/v4";

export const GameSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  background_image: z.url().nullable(),
  rating: z.number(),
  released: z.string().nullable(),
});

export type GameSchema = z.infer<typeof GameSchema>;
