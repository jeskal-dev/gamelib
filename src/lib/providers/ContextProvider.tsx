import type { QueryClient } from "@tanstack/react-query";

export interface ApplicationContext {
  queryClient: QueryClient;
}

export function createContext(values: ApplicationContext): ApplicationContext {
  return values;
}
