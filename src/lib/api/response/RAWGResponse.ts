import z from 'zod/v4';

export function RAWGResponse<T extends z.ZodTypeAny>(item: T) {
  return z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(item),
  });
}

export type RAWGResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof RAWGResponse<T>>>;
