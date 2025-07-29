import { useCallback, useEffect, useRef } from 'preact/hooks';
import { useInfiniteGenres } from '../hooks/useGenres';
import { Select, Text } from '../ui';

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  pageSize?: number;
}

export function GenreSelect({
  value,
  onValueChange,
  pageSize = 20,
  placeholder,
}: Props) {
  const target = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGenres({
      page_size: pageSize,
      ordering: 'name',
    });

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px',
      threshold: 0.1,
    });
    observer.observe(element);
    return observer.disconnect;
  }, [handleIntersection]);

  const genres = data?.flatResults || [];

  return (
    <div>
      <Text className="text-muted-foreground mb-2 text-sm">Género</Text>
      <Select>
        <Select.Trigger value={value} className="text-muted-foreground w-full">
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content>
          <Select.Group className="max-h-96 scroll-auto">
            {genres.map((genre) => (
              <Select.Item
                key={genre.option.value}
                value={String(genre.option.value)}
                onSelect={() => onValueChange?.(String(genre.option.value))}
                className="text-muted-foreground"
              >
                {genre.option.label}
              </Select.Item>
            ))}
            <div ref={target} className="h-10" />
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="border-primary size-5 animate-spin rounded-full border-b-2"></div>
              </div>
            )}
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  );
}
