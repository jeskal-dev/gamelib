import { GameCard } from '@/lib/components/GameCard';
import { GenreSelect } from '@/lib/components/GenreSelect';
import { Input, Select, Text } from '@/lib/ui';
import { computed, signal } from '@preact/signals';
import { createFileRoute } from '@tanstack/react-router';
import { Filter, Gamepad2, Search } from 'lucide-react';
export const Route = createFileRoute('/games/')({
  component: RouteComponent,
});

const mockGames = [
  {
    id: 1,
    name: 'Super Mario Bros Wonder',
    background_image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    rating: 4.8,
    released: '2023-10-20',
  },
  {
    id: 2,
    name: 'Cyberpunk 2077: Phantom Liberty',
    background_image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    rating: 4.6,
    released: '2023-09-26',
  },
  {
    id: 3,
    name: "Baldur's Gate 3",
    background_image:
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop',
    rating: 4.9,
    released: '2023-08-03',
  },
  {
    id: 4,
    name: 'Hollow Knight: Silksong',
    background_image:
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    rating: 4.7,
    released: '2024-06-21',
  },
  {
    id: 5,
    name: 'Stardew Valley',
    background_image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    rating: 4.5,
    released: '2016-02-26',
  },
  {
    id: 6,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    background_image:
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop',
    rating: 4.9,
    released: '2023-05-12',
  },
];

// Signals
const searchQuery = signal('');
const selectedGenre = signal('all');
const selectedPlatform = signal('all');
const sortBy = signal('rating');

const genres = [
  { value: 'all', label: 'Todos los géneros' },
  { value: 'action', label: 'Action' },
  { value: 'rpg', label: 'RPG' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'indie', label: 'Indie' },
  { value: 'adventure', label: 'Adventure' },
];

const platforms = [
  { value: 'all', label: 'Todas las plataformas' },
  { value: 'pc', label: 'PC' },
  { value: 'playstation', label: 'PlayStation' },
  { value: 'xbox', label: 'Xbox' },
  { value: 'switch', label: 'Nintendo Switch' },
];

const sortOptions = [
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'release', label: 'Más recientes' },
  { value: 'name', label: 'A-Z' },
];

// Computed filtered games
const filteredGames = computed(() => {
  let games = [...mockGames];

  // Filter by search
  if (searchQuery.value) {
    games = games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sort games
  games.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return b.rating - a.rating;
      case 'release':
        return new Date(b.released).getTime() - new Date(a.released).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return games;
});

function RouteComponent() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-border bg-card/50 border-b backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-center gap-4">
            <Gamepad2 className="text-primary size-10" />
            <Text as="h1" className="font-head text-primary text-4xl tracking-wider">
              EXPLORAR JUEGOS
            </Text>
            <Gamepad2 className="text-primary size-10" />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery.value}
                onChange={(e) => (searchQuery.value = e.currentTarget.value)}
                className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border py-3 pr-4 pl-12 shadow focus:ring-2"
              />
              <Search className="text-primary absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-card/50 border-border rounded-lg border p-4 shadow-md backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="text-accent size-5" />
            <Text className="text-accent font-mono text-sm uppercase">Filtros</Text>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <GenreSelect
              placeholder="Todos los generos"
              value={selectedGenre.value}
              onValueChange={(value) => (selectedGenre.value = value)}
            />

            <div>
              <Text className="text-muted-foreground mb-2 text-sm">Plataforma</Text>
              <Select>
                <Select.Trigger className="text-muted-foreground w-full">
                  <Select.Value placeholder="Todas las plataformas" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {platforms.map((platform) => (
                      <Select.Item
                        key={platform.value}
                        value={platform.value}
                        onSelect={() => (selectedPlatform.value = platform.value)}
                        className="text-muted-foreground"
                      >
                        {platform.label}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select>
            </div>

            <div>
              <Text className="text-muted-foreground mb-2 text-sm">Ordenar</Text>
              <Select>
                <Select.Trigger className="text-muted-foreground w-full">
                  <Select.Value placeholder="Mejor valorados" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {sortOptions.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        onSelect={() => (sortBy.value = option.value)}
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
      </div>

      <div className="container mx-auto px-4 py-4">
        <Text className="text-muted-foreground font-mono text-sm">
          {filteredGames.value.length} juegos encontrados
        </Text>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {filteredGames.value.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.value.map((game) => (
              <GameCard key={game.id} item={game as any} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Gamepad2 className="text-muted-foreground mx-auto mb-4 size-20" />
            <Text className="text-muted-foreground font-mono text-xl">
              No se encontraron juegos
            </Text>
            <Text className="text-muted-foreground/70 mt-2">
              Intenta con otra búsqueda
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
