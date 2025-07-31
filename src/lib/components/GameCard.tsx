import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Calendar, Gamepad2, Star } from 'lucide-react';
import type { GameSchema } from '../api/models';
import { createAnimeDetailsOptions } from '../hooks';
import { Badge, Card, Text } from '../ui';
import { Image } from './Image';

interface Props {
  item: GameSchema;
}

export function GameCard({ item }: Props) {
  const client = useQueryClient();

  return (
    <Link
      to="/games/$gameId"
      params={{ gameId: String(item.id) }}
      onMouseEnter={() => {
        client.prefetchQuery(createAnimeDetailsOptions(item.id));
      }}
    >
      <Card className="group w-full max-w-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Card.Header>
          <div className="relative">
            <Image
              src={item.background_image ?? ''}
              alt={item.name}
              className="h-48 w-full rounded-t-lg object-cover transition-all duration-300 group-hover:brightness-110"
              skeletonClassName="h-48 w-full rounded-t-lg bg-muted animate-pulse flex items-center justify-center"
              errorClassName="h-48 w-full rounded-t-lg bg-muted flex items-center justify-center"
            />

            {/* Overlay gradient */}
            <div className="from-background/60 absolute inset-0 rounded-t-lg bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Rating badge */}
            <div className="absolute top-3 right-3">
              <Badge
                variant="solid"
                className="bg-primary/90 text-primary-foreground backdrop-blur-sm"
              >
                <Star className="mr-1 inline size-4" />
                {item.rating.toFixed(1)}
              </Badge>
            </div>

            {/* Fallback icon for broken images */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20">
              <Gamepad2 className="text-primary size-16" />
            </div>
          </div>
        </Card.Header>

        {/* Content */}
        <Card.Content>
          <div className="space-y-3 p-4 pt-2">
            {/* Game title */}
            <Text
              as="h4"
              className="text-foreground group-hover:text-primary line-clamp-2 min-h-[3rem] transition-colors duration-200"
              title={item.name}
            >
              {item.name}
            </Text>

            {/* Release date */}
            <div className="flex items-center justify-between">
              <Text
                as="p"
                className="text-muted-foreground flex items-center space-x-2 text-sm"
              >
                <Calendar className="size-4" />
                <span>
                  {item.released
                    ? new Date(item.released).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                      })
                    : 'Desconocida'}
                </span>
              </Text>

              {/* Hover indicator */}
              <div className="text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Text className="font-mono text-xs">Ver más →</Text>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}
