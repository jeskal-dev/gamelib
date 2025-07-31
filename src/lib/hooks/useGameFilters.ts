import { computed, type Signal, signal, useSignalEffect } from '@preact/signals';
import type { RAWGRequest } from '../api/request';
import { getCurrentYear } from '../helpers';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useEffect } from 'preact/hooks';
import { SearchFiltersSchema } from '../api/schemas/SearchFilters';

type YearOptions = {
  selected: Signal<string>;
  current: number;
  options: Array<{ value: string; label: string }>;
};

export const selectedGenre = signal('all');
export const selectedPlatform = signal('all');

const currentYear = getCurrentYear();
export const year: YearOptions = {
  selected: signal('all'),
  current: currentYear,
  options: [
    { value: 'all', label: 'Todos los años' },
    ...Array.from({ length: 10 }, (_, i) => {
      const current = String(currentYear - i);
      return { value: current, label: current };
    }),
  ],
};

export const rating = {
  selected: signal('all'),
  options: [
    { value: 'all', label: 'Cualquier rating' },
    { value: '4', label: '4+ estrellas' },
    { value: '3', label: '3+ estrellas' },
    { value: '2', label: '2+ estrellas' },
    { value: '1', label: '1+ estrellas' },
  ],
};

export const sortBy = {
  selected: signal('-rating'),
  options: [
    { value: '-rating', label: 'Mejor valorados' },
    { value: '-released', label: 'Más recientes' },
    { value: 'released', label: 'Más antiguos' },
    { value: 'name', label: 'A-Z' },
    { value: '-name', label: 'Z-A' },
    { value: '-metacritic', label: 'Metacritic' },
    { value: '-added', label: 'Más populares' },
  ],
};

export const searchQuery = signal('');

export const filters = computed(
  (): Partial<RAWGRequest> => ({
    ordering: sortBy.selected.value,
    genres: selectedGenre.value !== 'all' ? selectedGenre.value : undefined,
    platforms: selectedPlatform.value !== 'all' ? selectedPlatform.value : undefined,
    dates:
      year.selected.value !== 'all'
        ? `${year.selected.value}-01-01,${year.selected.value}-12-31`
        : undefined,
    metacritic:
      rating.selected.value !== 'all'
        ? `${parseInt(rating.selected.value) * 20},100`
        : undefined,
  })
);

export function applyFiltersToSelectors(f: Partial<RAWGRequest>) {
  if (f.ordering !== undefined) sortBy.selected.value = f.ordering;

  if (f.genres !== undefined) selectedGenre.value = f.genres;
  else selectedGenre.value = 'all';

  if (f.platforms !== undefined) selectedPlatform.value = f.platforms;
  else selectedPlatform.value = 'all';

  if (f.dates !== undefined) {
    const [start] = f.dates.split(',');
    const yearStr = start.split('-')[0];
    year.selected.value = yearStr;
  } else {
    year.selected.value = 'all';
  }

  /* metacritic (formato "min,100") */
  if (f.metacritic !== undefined) {
    const [minStr] = f.metacritic.split(',');
    const ratingVal = Math.round(Number(minStr) / 20).toString();
    rating.selected.value = ratingVal;
  } else {
    rating.selected.value = 'all';
  }
}

export function useSyncFilterWithRouter() {
  const router = useRouter();
  const search = useSearch({
    from: '/games/',
  });

  useEffect(() => {
    sortBy.selected.value = search.ordering ?? '-rating';
    selectedGenre.value = search.genres ?? 'all';
    selectedPlatform.value = search.platforms ?? 'all';
    year.selected.value = search.dates ?? 'all';
    rating.selected.value = search.metacritic ?? 'all';
  }, [search]);

  useSignalEffect(() => {
    const next = SearchFiltersSchema.parse(filters.value);

    router.navigate({ search: next as any, replace: true });
  });
}
