import { useCallback, useEffect, useRef } from 'preact/hooks';
import { AlertTriangle, Gamepad2, Loader2 } from 'lucide-react';
import { Button, Text } from '../ui';
import { GameCard } from './GameCard';
import { useInfiniteGameList } from '../hooks';
import type { RAWGRequest } from '../api/request';
import { filters, searchQuery } from '../hooks/useGameFilters';
import { useComputed } from '@preact/signals';

export function GameGrid() {
  const target = useRef<HTMLDivElement>(null);

  // Construir query para la API
  const query = useComputed(
    (): Partial<RAWGRequest> => ({
      page_size: 20,
      ordering: filters.value.ordering || '-rating',
      ...(searchQuery && { search: searchQuery.value }),
      ...(filters.value.genres && { genres: filters.value.genres }),
      ...(filters.value.platforms && { platforms: filters.value.platforms }),
      ...(filters.value.dates && { dates: filters.value.dates }),
      ...(filters.value.metacritic && { metacritic: filters.value.metacritic }),
    })
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteGameList(query.value);

  // Intersection Observer para scroll infinito
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px',
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const games = data?.flatResults || [];

  // Estado de carga inicial
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-4 size-12 animate-spin" />
          <Text className="text-muted-foreground font-mono">
            Cargando videojuegos...
          </Text>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="text-destructive mx-auto mb-4 size-12" />
          <Text as="h3" className="text-foreground mb-2">
            Error al cargar los juegos
          </Text>
          <Text className="text-muted-foreground mb-4">
            Hubo un problema al conectar con la API
          </Text>
          <Button onClick={() => refetch()} variant="outline">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  // Estado sin resultados
  if (games.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="text-muted-foreground mx-auto mb-4 size-20" />
          <Text as="h3" className="text-foreground mb-2 font-mono text-xl">
            No se encontraron juegos
          </Text>
          <Text className="text-muted-foreground/70">
            {searchQuery.value
              ? `No hay resultados para "${searchQuery}"`
              : 'Intenta ajustar los filtros de búsqueda'}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Text className="text-muted-foreground font-mono text-sm">
          {data?.count} juegos encontrados
          {searchQuery.value && (
            <span className="text-accent ml-2">para "{searchQuery}"</span>
          )}
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {games.map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            className="animate-in fade-in-0 slide-in-from-bottom-4"
            style={{
              animationDelay: `${(index % 20) * 50}ms`,
              animationFillMode: 'both',
            }}
          >
            <GameCard item={game} />
          </div>
        ))}
      </div>

      <div ref={target} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <div className="text-center">
            <Loader2 className="text-primary mx-auto mb-2 size-6 animate-spin" />
            <Text className="text-muted-foreground text-sm">
              Cargando más juegos...
            </Text>
          </div>
        )}
        {!hasNextPage && games.length > 0 && (
          <Text className="text-muted-foreground text-center text-sm">
            ¡Has visto todos los juegos disponibles!
          </Text>
        )}
      </div>
    </div>
  );
}
