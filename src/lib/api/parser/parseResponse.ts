import type z from 'zod/v4';

export function parseResponse<T extends z.ZodTypeAny>(schema: T, data: any) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.log(parsed.error)
    throw new Error(parsed.error.message, {
      cause: parsed.error.cause,
    });
  }
  return parsed.data;
}
