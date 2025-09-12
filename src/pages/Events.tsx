import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";

const Events = () => {
  const { events, isLoading, error } = useEvents();

  if (error) {
    toast.error("Erro ao carregar eventos");
    console.error(error);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDateBadge = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { text: "Hoje", variant: "destructive" as const };
    if (diffDays === 1) return { text: "Amanhã", variant: "default" as const };
    if (diffDays <= 7) return { text: `Em ${diffDays} dias`, variant: "secondary" as const };
    return { text: formatDate(dateString).split(',')[0], variant: "outline" as const };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Eventos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Participe dos nossos eventos e fortaleça sua caminhada com Cristo
          </p>
        </div>

        {/* Regular Events Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Eventos Regulares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Culto Dominical
                </CardTitle>
                <CardDescription>Todo domingo, 9h e 19h</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Templo Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Toda a família</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  Momentos de adoração, louvor e ministração da palavra de Deus.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Estudo Bíblico
                </CardTitle>
                <CardDescription>Toda quarta-feira, 19h30</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Salão de Estudos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Jovens e Adultos</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  Aprofunde-se na palavra de Deus através de estudos temáticos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Vigília de Oração
                </CardTitle>
                <CardDescription>Toda sexta-feira, 19h30</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Templo Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>2 horas de duração</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  Momento especial de oração, intercessão e busca a Deus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Próximos Eventos Especiais</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando eventos...</p>
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum evento especial programado no momento.</p>
              <p className="text-muted-foreground mt-2">Fique atento às nossas redes sociais para novidades!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events?.map((event) => {
                const dateBadge = getDateBadge(event.event_date);
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={dateBadge.variant}>{dateBadge.text}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(event.event_date)}
                        </span>
                      </div>
                      <CardTitle>{event.name}</CardTitle>
                      {event.location && (
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {event.description && (
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          {event.attendance.length} participantes
                        </span>
                      </div>
                      <Button className="w-full">
                        Participar do Evento
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
