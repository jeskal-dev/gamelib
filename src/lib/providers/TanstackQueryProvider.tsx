import type { PropsWithChildren } from 'preact/compat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { AxiosError } from 'axios';
import { IDBStorage } from '../config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const IDB_STORAGE = new IDBStorage('imageCacheDB', 'imageStore');

const MAX_AGE = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME = 1000 * 60 * 60 * 24;
const GC_TIME = 1000 * 60 * 60 * 24 * 7;

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry(failureCount, error) {
        if (!(error instanceof AxiosError)) return failureCount < 3;
        if (error.response?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: IDB_STORAGE,
  key: 'storage-persister',
});

persistQueryClient({
  queryClient: client,
  persister,
  maxAge: MAX_AGE,
});

export function TanstackQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
