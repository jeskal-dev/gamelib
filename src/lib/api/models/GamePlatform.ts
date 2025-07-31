import z from "zod/v4";

export const GamePlatformSchema = z.object({
  platform: z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
  }),
  released_at: z.string(),
  requirements: z.object({
    minimum: z.string().optional(),
    recommended: z.string().optional(),
  }),
});

export type GamePlatformSchema = z.infer<typeof GamePlatformSchema>;
