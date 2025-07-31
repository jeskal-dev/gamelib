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
import { Image } from '@/lib/components';
import { cn } from '@/lib/utils';
import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Gamepad2, 
  Loader2, 
  Monitor, 
  Star, 
  Trophy,
  Users,
  Zap
} from 'lucide-react';

export const Route = createFileRoute('/games/$gameId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameId } = Route.useParams();
  const { data, isLoading, error, refetch } = useAnimeDetails(Number(gameId));

  // Loading state with retro aesthetic
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <Gamepad2 className="text-primary size-20 animate-pulse mx-auto" />
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
          </div>
          <div className="space-y-2">
            <Text as="h2" className="text-accent font-mono tracking-wider">
              LOADING GAME DATA
            </Text>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retro styling
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <Card.Header>
            <div className="mx-auto mb-4 p-4 bg-destructive/10 rounded-full w-fit">
              <AlertTriangle className="text-destructive size-12" />
            </div>
            <Text as="h2" className="text-destructive font-mono tracking-wider">
              SYSTEM ERROR
            </Text>
          </Card.Header>
          <Card.Content className="space-y-4">
            <Text className="text-muted-foreground font-mono text-sm">
              {error.message || 'Failed to load game data'}
            </Text>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => refetch()}>
                <Zap className="size-4 mr-2" />
                RETRY
              </Button>
              <Link to="/games">
                <Button variant="secondary">
                  <ArrowLeft className="size-4 mr-2" />
                  BACK TO GAMES
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const game = data!;

  // Helper function to get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400';
    if (rating >= 4.0) return 'text-lime-400';
    if (rating >= 3.5) return 'text-yellow-400';
    if (rating >= 3.0) return 'text-orange-400';
    return 'text-red-400';
  };

  // Helper function to get metacritic score styling
  const getMetacriticStyle = (score: number) => {
    if (score >= 75) return 'bg-green-600 text-white';
    if (score >= 50) return 'bg-yellow-600 text-black';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        {game.background_image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link to="/games">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                BACK TO GAMES
              </Button>
            </Link>
          </div>

          {/* Game Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Game Image */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <Image
                  src={game.background_image || ''}
                  alt={game.name}
                  className="w-full aspect-[4/3] object-cover"
                  errorClassName="w-full aspect-[4/3] bg-muted flex items-center justify-center"
                />
              </Card>
            </div>

            {/* Game Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Text as="h1" className="text-4xl lg:text-6xl font-bold text-primary mb-4 tracking-wider">
                  {game.name}
                </Text>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <Text className="font-mono">
                      {game.released ? new Date(game.released).getFullYear() : 'TBA'}
                    </Text>
                  </div>
                  {game.esrb_rating && (
                    <Badge variant="outline" className="font-mono">
                      {game.esrb_rating.name}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Rating Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* User Rating */}
                <Card className="text-center">
                  <Card.Header>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="size-5 text-accent" />
                      <Text className="font-mono text-sm text-muted-foreground">USER RATING</Text>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <Text as="h3" className={cn("text-3xl font-bold", getRatingColor(game.rating))}>
                      {game.rating.toFixed(1)}
                    </Text>
                    <Text className="text-muted-foreground text-sm">/ 5.0</Text>
                  </Card.Content>
                </Card>

                {/* Metacritic Score */}
                {game.metacritic && (
                  <Card className="text-center">
                    <Card.Header>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Trophy className="size-5 text-accent" />
                        <Text className="font-mono text-sm text-muted-foreground">METACRITIC</Text>
                      </div>
                    </Card.Header>
                    <Card.Content>
                      <Badge 
                        className={cn("text-2xl px-4 py-2", getMetacriticStyle(game.metacritic))}
                      >
                        {game.metacritic}
                      </Badge>
                    </Card.Content>
                  </Card>
                )}

                {/* Platform Count */}
                <Card className="text-center">
                  <Card.Header>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Monitor className="size-5 text-accent" />
                      <Text className="font-mono text-sm text-muted-foreground">PLATFORMS</Text>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <Text as="h3" className="text-3xl font-bold text-primary">
                      {game.platforms.length}
                    </Text>
                    <Text className="text-muted-foreground text-sm">Available</Text>
                  </Card.Content>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultIndex={0} className="w-full">
          <TabsTriggerList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger className="font-mono">OVERVIEW</TabsTrigger>
            <TabsTrigger className="font-mono">PLATFORMS</TabsTrigger>
            <TabsTrigger className="font-mono">REVIEWS</TabsTrigger>
            <TabsTrigger className="font-mono">SPECS</TabsTrigger>
          </TabsTriggerList>

          <TabsPanels>
            {/* Overview Tab */}
            <TabsContent>
              <div className="space-y-8">
                {/* Description */}
                <Card>
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2 font-mono text-accent">
                      <Gamepad2 className="size-5" />
                      GAME DESCRIPTION
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: game.description }}
                    />
                  </Card.Content>
                </Card>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <Card.Header>
                      <Card.Title className="font-mono text-sm text-muted-foreground">RELEASE DATE</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Text className="text-xl font-bold">
                        {game.released 
                          ? new Date(game.released).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'To Be Announced'
                        }
                      </Text>
                    </Card.Content>
                  </Card>

                  {game.esrb_rating && (
                    <Card>
                      <Card.Header>
                        <Card.Title className="font-mono text-sm text-muted-foreground">ESRB RATING</Card.Title>
                      </Card.Header>
                      <Card.Content>
                        <Badge variant="solid" className="text-lg px-4 py-2">
                          {game.esrb_rating.name}
                        </Badge>
                      </Card.Content>
                    </Card>
                  )}

                  <Card>
                    <Card.Header>
                      <Card.Title className="font-mono text-sm text-muted-foreground">GAME ID</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Text className="text-xl font-bold font-mono text-accent">
                        #{game.id}
                      </Text>
                    </Card.Content>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Platforms Tab */}
            <TabsContent>
              <div className="grid gap-6 md:grid-cols-2">
                {game.platforms.map((platformData) => (
                  <Card key={platformData.platform.id} className="hover:shadow-lg transition-shadow">
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <Card.Title className="flex items-center gap-2">
                          <Monitor className="size-5 text-accent" />
                          {platformData.platform.name}
                        </Card.Title>
                        <Badge variant="outline" className="font-mono text-xs">
                          ID: {platformData.platform.id}
                        </Badge>
                      </div>
                      {platformData.released_at && (
                        <Text className="text-muted-foreground text-sm">
                          Released: {new Date(platformData.released_at).toLocaleDateString()}
                        </Text>
                      )}
                    </Card.Header>
                    
                    <Card.Content className="space-y-4">
                      {/* System Requirements */}
                      {(platformData.requirements.minimum || platformData.requirements.recommended) && (
                        <div className="space-y-4">
                          {platformData.requirements.minimum && (
                            <div>
                              <Text as="h4" className="font-mono text-sm text-accent mb-2 flex items-center gap-2">
                                <Zap className="size-4" />
                                MINIMUM REQUIREMENTS
                              </Text>
                              <Card className="bg-muted/50">
                                <Card.Content className="p-3">
                                  <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground">
                                    {platformData.requirements.minimum}
                                  </pre>
                                </Card.Content>
                              </Card>
                            </div>
                          )}
                          
                          {platformData.requirements.recommended && (
                            <div>
                              <Text as="h4" className="font-mono text-sm text-accent mb-2 flex items-center gap-2">
                                <Trophy className="size-4" />
                                RECOMMENDED REQUIREMENTS
                              </Text>
                              <Card className="bg-muted/50">
                                <Card.Content className="p-3">
                                  <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground">
                                    {platformData.requirements.recommended}
                                  </pre>
                                </Card.Content>
                              </Card>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {!platformData.requirements.minimum && !platformData.requirements.recommended && (
                        <Text className="text-muted-foreground text-sm italic">
                          No system requirements available for this platform.
                        </Text>
                      )}
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent>
              <div className="space-y-8">
                {/* Rating Overview */}
                <Card>
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2 font-mono text-accent">
                      <Users className="size-5" />
                      COMMUNITY RATINGS
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* User Rating */}
                      <div className="text-center space-y-4">
                        <div>
                          <Text className="font-mono text-sm text-muted-foreground mb-2">USER SCORE</Text>
                          <div className="flex items-center justify-center gap-2">
                            <Text as="h2" className={cn("text-5xl font-bold", getRatingColor(game.rating))}>
                              {game.rating.toFixed(1)}
                            </Text>
                            <div className="text-left">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={cn(
                                      "size-4",
                                      star <= Math.round(game.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                ))}
                              </div>
                              <Text className="text-xs text-muted-foreground">out of 5</Text>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Metacritic Score */}
                      {game.metacritic && (
                        <div className="text-center space-y-4">
                          <div>
                            <Text className="font-mono text-sm text-muted-foreground mb-2">METACRITIC</Text>
                            <Badge 
                              className={cn("text-4xl px-6 py-3", getMetacriticStyle(game.metacritic))}
                            >
                              {game.metacritic}
                            </Badge>
                            <Text className="text-xs text-muted-foreground mt-2 block">
                              Professional Reviews
                            </Text>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card.Content>
                </Card>

                {/* Metacritic Platform Scores */}
                {game.metacritic_platforms && game.metacritic_platforms.length > 0 && (
                  <Card>
                    <Card.Header>
                      <Card.Title className="font-mono text-accent">PLATFORM SCORES</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {game.metacritic_platforms.map((platform, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded border-2">
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={cn("text-sm", getMetacriticStyle(platform.metascore))}
                              >
                                {platform.metascore}
                              </Badge>
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto font-mono text-xs"
                                onClick={() => window.open(platform.url, '_blank')}
                              >
                                View Reviews
                                <ExternalLink className="size-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Content>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Specs Tab */}
            <TabsContent>
              <div className="space-y-6">
                <Card>
                  <Card.Header>
                    <Card.Title className="flex items-center gap-2 font-mono text-accent">
                      <Monitor className="size-5" />
                      TECHNICAL SPECIFICATIONS
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <Text className="font-mono text-sm text-muted-foreground">Game ID</Text>
                          <Text className="font-mono text-accent">#{game.id}</Text>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <Text className="font-mono text-sm text-muted-foreground">Slug</Text>
                          <Text className="font-mono text-sm">{game.slug}</Text>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <Text className="font-mono text-sm text-muted-foreground">Release Date</Text>
                          <Text className="font-mono text-sm">
                            {game.released || 'TBA'}
                          </Text>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <Text className="font-mono text-sm text-muted-foreground">Rating</Text>
                          <Text className="font-mono text-sm">{game.rating}/5.0</Text>
                        </div>
                        {game.metacritic && (
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <Text className="font-mono text-sm text-muted-foreground">Metacritic</Text>
                            <Text className="font-mono text-sm">{game.metacritic}/100</Text>
                          </div>
                        )}
                      </div>

                      {/* Platform Summary */}
                      <div className="space-y-4">
                        <Text as="h4" className="font-mono text-sm text-accent">SUPPORTED PLATFORMS</Text>
                        <div className="space-y-2">
                          {game.platforms.map((platformData) => (
                            <div 
                              key={platformData.platform.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded border"
                            >
                              <Text className="font-mono text-sm">{platformData.platform.name}</Text>
                              <Badge variant="outline" className="text-xs">
                                {platformData.platform.slug}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>
            </TabsContent>
          </TabsPanels>
        </Tabs>
      </div>
    </div>
  );
}