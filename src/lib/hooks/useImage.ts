import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchImage(src: string, signal: AbortSignal) {
  const res = await axios.get(src, {
    responseType: 'blob',
    signal,
  });
  return URL.createObjectURL(res.data);
}

export function useImage(src?: string) {
  return useQuery({
    queryKey: ['image', src],
    queryFn: ({ signal }) => fetchImage(src!, signal),
    enabled: !!src,
    staleTime: Infinity,
  });
}
