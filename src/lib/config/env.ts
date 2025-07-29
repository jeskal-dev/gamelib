import z from "zod/v4";

const EnvSchema = z
  .object({
    VITE_API_URL: z.url(),
    VITE_API_KEY: z.string().min(1),
  })
  .transform(({ VITE_API_KEY, VITE_API_URL }) => ({
    apiUrl: VITE_API_URL,
    apiKey: VITE_API_KEY,
  }));

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("❌ Invalid env:", parsed.error.message);
  throw new Error("Invalid environment variables", {
    cause: parsed.error.cause,
  });
}
export const env = parsed.data;
