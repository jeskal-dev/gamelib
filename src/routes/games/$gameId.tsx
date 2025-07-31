import { useAnimeDetails } from '@/lib/hooks';
import {
  Badge,
  Button,
  Card,
  Separator,
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
  Text,
} from '@/lib/ui';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { AlertTriangle, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/games/$gameId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = Route.useParams();
  const { data, isLoading, error, refetch } = useAnimeDetails(Number(gameId));

  if (isLoading)
    return (
      <div class="flex min-h-[50vh] items-center justify-center">
        <Loader2 class="text-foreground h-10 w-10 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <AlertTriangle class="text-destructive h-12 w-12" />
        <Text as="h2">Something went wrong</Text>
        <Text as="p" class="text-muted-foreground">
          {error.message}
        </Text>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );

  const game = data!;

  return (
    <div class="mx-auto max-w-5xl p-4 md:p-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{game.name}</h1>
        <p class="text-muted-foreground mt-1">Released: {game.released ?? 'TBA'}</p>
      </header>

      <Tabs defaultIndex={0} class="w-full">
        <TabsTriggerList class="grid w-full grid-cols-2 md:w-[300px]">
          <TabsTrigger>Overview</TabsTrigger>
          <TabsTrigger>Platforms</TabsTrigger>
        </TabsTriggerList>

        <TabsPanels>
          <TabsContent class="mt-6">
            <div class="grid gap-6 md:grid-cols-3">
              {/* Imagen */}
              {game.background_image && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  class="aspect-[16/9] w-full rounded-md object-cover md:col-span-1"
                />
              )}

              <div class="space-y-4 md:col-span-2">
                <Card>
                  <Card.Header>
                    <Card.Title>Rating</Card.Title>
                  </Card.Header>
                  <Card.Content class="flex items-center gap-2">
                    <span class="text-2xl font-semibold">{game.rating}</span>
                    <span class="text-muted-foreground">/ 5</span>
                  </Card.Content>
                </Card>

                {game.metacritic && (
                  <Card>
                    <Card.Header>
                      <Card.Title>Metacritic</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Badge
                        class={cn(
                          'text-lg',
                          game.metacritic >= 75
                            ? 'bg-green-600'
                            : game.metacritic >= 50
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                        )}
                      >
                        {game.metacritic}
                      </Badge>
                    </Card.Content>
                  </Card>
                )}

                {game.esrb_rating && (
                  <Card>
                    <Card.Header>
                      <Card.Title>ESRB</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Badge variant="outline">{game.esrb_rating.name}</Badge>
                    </Card.Content>
                  </Card>
                )}
              </div>
            </div>

            <Separator class="my-6" />

            <Card>
              <Card.Header>
                <Card.Title>Description</Card.Title>
              </Card.Header>
              <Card.Content>
                <div
                  class="prose prose-sm dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
              </Card.Content>
            </Card>
          </TabsContent>

          <TabsContent class="mt-6">
            <div class="grid gap-4 md:grid-cols-2">
              {game.platforms.map((p) => (
                <Card key={p.platform.id}>
                  <Card.Header>
                    <Card.Title>{p.platform.name}</Card.Title>
                    <p class="text-muted-foreground text-sm">
                      Released: {p.released_at ?? 'TBA'}
                    </p>
                  </Card.Header>
                  <Card.Content class="space-y-4">
                    {p.requirements.minimum && (
                      <div>
                        <h4 class="mb-1 text-sm font-semibold">Minimum</h4>
                        <pre class="bg-muted rounded p-2 text-xs whitespace-pre-wrap">
                          {p.requirements.minimum}
                        </pre>
                      </div>
                    )}
                    {p.requirements.recommended && (
                      <div>
                        <h4 class="mb-1 text-sm font-semibold">Recommended</h4>
                        <pre class="bg-muted rounded p-2 text-xs whitespace-pre-wrap">
                          {p.requirements.recommended}
                        </pre>
                      </div>
                    )}
                  </Card.Content>
                </Card>
              ))}
            </div>
          </TabsContent>
        </TabsPanels>
      </Tabs>
    </div>
  );
}
