import type { GenreSchema } from '../api/models/Genre';
import { Text } from '../ui';
import { Image } from './Image';

export function GenreCard({ genre }: { genre: GenreSchema }) {
  return (
    <div className="group border-border bg-card hover:border-primary relative overflow-hidden rounded-lg border shadow transition-all duration-200 hover:shadow-md">
      <Image
        src={genre.image_background}
        alt={genre.name}
        className="h-32 w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-3">
        <Text className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
          {genre.name}
        </Text>
        <Text className="text-muted-foreground text-xs">
          {genre.games_count} juegos
        </Text>
      </div>
    </div>
  );
}
