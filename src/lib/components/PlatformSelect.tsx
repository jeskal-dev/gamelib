import { useCallback, useEffect, useRef } from 'preact/hooks';
import { useInfinitePlatforms } from '../hooks';
import { Select, Text } from '../ui';

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  pageSize?: number;
}

export function PlatformSelect({
  value,
  onValueChange,
  pageSize = 20,
  placeholder,
}: Props) {
  const target = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePlatforms({
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

  const platforms = data?.flatResults || [];

  return (
    <div>
      <Text className="text-muted-foreground mb-2 text-sm">Plataforma</Text>
      <Select value={value} onValueChange={(value) => onValueChange?.(value)}>
        <Select.Trigger className="text-muted-foreground w-full">
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content>
          <Select.Group className="max-h-96 scroll-auto">
            <Select.Item value="all" className="text-muted-foreground">
              Todas las plataformas
            </Select.Item>
            {platforms.map((platform) => (
              <Select.Item
                key={platform.option.value}
                value={String(platform.option.value)}
                className="text-muted-foreground"
              >
                {platform.option.label}
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
