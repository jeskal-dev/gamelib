import { GameFilters, GameGrid } from '@/lib/components';
import { searchQuery, useSyncFilterWithRouter } from '@/lib/hooks/useGameFilters';
import { Input, Text } from '@/lib/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Search, Zap } from 'lucide-react';
import { zodValidator } from '@tanstack/zod-adapter';
import { SearchFiltersSchema } from '@/lib/api/schemas/SearchFilters';
export const Route = createFileRoute('/games/')({
  component: RouteComponent,
  validateSearch: zodValidator(SearchFiltersSchema),
});

function RouteComponent() {
  useSyncFilterWithRouter();
  return (
    <div className="bg-background min-h-screen">
      <div className="border-border bg-card/50 border-b backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <Zap className="text-accent size-8 animate-pulse" />
              <Text as="h1" className="font-head text-primary text-5xl tracking-wider">
                GAME EXPLORER
              </Text>
              <Zap className="text-accent size-8 animate-pulse" />
            </div>
            <Text className="text-muted-foreground font-mono text-lg">
              Descubre los mejores videojuegos del mundo
            </Text>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery.value}
                onChange={(e) => {
                  searchQuery.value = e.currentTarget.value;
                }}
                className="bg-card border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border py-4 pr-4 pl-12 text-lg shadow-lg focus:ring-2"
              />
              <Search className="text-accent absolute top-1/2 left-4 size-6 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <GameFilters />
      </div>

      <div className="container mx-auto px-4 pb-12">
        <GameGrid />
      </div>
    </div>
  );
}
