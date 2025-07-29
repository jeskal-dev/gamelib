import z from "zod/v4";

export const GameSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  background_image: z.url(),
  rating: z.number(),
  released: z.string(),
});

export type GameSchema = z.infer<typeof GameSchema>;
