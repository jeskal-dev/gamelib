import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Calendar, Star } from 'lucide-react';
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
      <Card className="w-80 cursor-pointer">
        <Card.Header>
          <div className="relative">
            <Image
              src={item.background_image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge>
                <Star className="mr-1 inline size-4" />
                {item.rating.toFixed(1)}
              </Badge>
            </div>
          </div>
        </Card.Header>

        {/* Contenido */}
        <Card.Content>
          <div className="space-y-3 p-4">
            <Text as="h4" className="text-foreground truncate">
              {item.name}
            </Text>

            <Text
              as="p"
              className="text-foreground flex items-center space-x-2 text-sm"
            >
              <Calendar className="size-4" />
              <span>{item.released}</span>
            </Text>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}
