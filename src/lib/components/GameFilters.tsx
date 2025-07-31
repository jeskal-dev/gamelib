import { Filter, RotateCcw } from 'lucide-react';
import {
  rating,
  selectedGenre,
  selectedPlatform,
  sortBy,
  year,
} from '../hooks/useGameFilters';
import { Button, Select, Text } from '../ui';
import { GenreSelect } from './GenreSelect';
import { PlatformSelect } from './PlatformSelect';

export function GameFilters() {
  // Función para resetear todos los filtros
  const resetFilters = () => {
    selectedGenre.value = 'all';
    selectedPlatform.value = 'all';
    year.selected.value = 'all';
    rating.selected.value = 'all';
    sortBy.selected.value = '-rating';
  };

  return (
    <div className="bg-card/50 border-border rounded-lg border p-6 shadow-md backdrop-blur">
      {/* Header de filtros */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="text-accent size-6" />
          <Text as="h3" className="text-accent font-mono tracking-wider uppercase">
            Filtros de Búsqueda
          </Text>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <RotateCcw className="size-4" />
          Limpiar
        </Button>
      </div>

      {/* Grid de filtros */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Selector de género */}
        <GenreSelect
          placeholder="Todos los géneros"
          value={selectedGenre.value}
          onValueChange={(value) => {
            selectedGenre.value = value;
          }}
        />

        <PlatformSelect
          placeholder="Todas las plataformas"
          value={selectedPlatform.value}
          onValueChange={(value) => {
            selectedPlatform.value = value;
          }}
        />

        <div>
          <Text className="text-muted-foreground mb-2 text-sm">Año de lanzamiento</Text>
          <Select
            value={year.selected.value}
            onValueChange={(value) => {
              year.selected.value = value;
            }}
          >
            <Select.Trigger className="text-muted-foreground w-full">
              <Select.Value placeholder="Todos los años" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {year.options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="text-muted-foreground"
                  >
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        </div>

        {/* Selector de rating mínimo */}
        <div>
          <Text className="text-muted-foreground mb-2 text-sm">Rating mínimo</Text>
          <Select
            value={rating.selected.value}
            onValueChange={(value) => {
              rating.selected.value = value;
            }}
          >
            <Select.Trigger className="text-muted-foreground w-full">
              <Select.Value placeholder="Cualquier rating" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {rating.options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="text-muted-foreground"
                  >
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        </div>

        {/* Selector de ordenamiento */}
        <div>
          <Text className="text-muted-foreground mb-2 text-sm">Ordenar por</Text>
          <Select
            value={sortBy.selected.value}
            onValueChange={(value) => {
              sortBy.selected.value = value;
            }}
          >
            <Select.Trigger className="text-muted-foreground w-full">
              <Select.Value placeholder="Mejor valorados" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {sortBy.options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="text-muted-foreground"
                  >
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        </div>
      </div>
    </div>
  );
}
