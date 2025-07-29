import { z } from 'zod/v4';
import { GameSchema } from './Game';
import { GamePlatformSchema } from './GamePlatform';

export const GameDetailSchema = GameSchema.extend({
  description: z.string(),
  platforms: z.object(GamePlatformSchema),
  metacritic: z.number(),
  metacritic_platforms: z.array(
    z.object({
      metascore: z.number(),
      url: z.url(),
    })
  ),
});
