import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Events = () => {
  const { t, i18n } = useTranslation();
  const { events, isLoading, error } = useEvents();

  if (error) {
    toast.error(t('events.error'));
    console.error(error);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US';
    return date.toLocaleDateString(locale, {
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

    if (diffDays === 0) return { text: t('events.today'), variant: "destructive" as const };
    if (diffDays === 1) return { text: t('events.tomorrow'), variant: "default" as const };
    if (diffDays <= 7) return { text: t('events.inDays', { count: diffDays }), variant: "secondary" as const };
    return { text: formatDate(dateString).split(',')[0], variant: "outline" as const };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('events.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Regular Events Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('events.regularEvents')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t('events.regularEventsList.sundayService.title')}
                </CardTitle>
                <CardDescription>{t('events.regularEventsList.sundayService.schedule')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t('events.regularEventsList.sundayService.location')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{t('events.regularEventsList.sundayService.audience')}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  {t('events.regularEventsList.sundayService.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t('events.regularEventsList.bibleStudy.title')}
                </CardTitle>
                <CardDescription>{t('events.regularEventsList.bibleStudy.schedule')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t('events.regularEventsList.bibleStudy.location')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{t('events.regularEventsList.bibleStudy.audience')}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  {t('events.regularEventsList.bibleStudy.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t('events.regularEventsList.prayerVigil.title')}
                </CardTitle>
                <CardDescription>{t('events.regularEventsList.prayerVigil.schedule')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t('events.regularEventsList.prayerVigil.location')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{t('events.regularEventsList.prayerVigil.duration')}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  {t('events.regularEventsList.prayerVigil.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{t('events.upcomingEvents')}</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('events.loading')}</p>
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('events.noEvents')}</p>
              <p className="text-muted-foreground mt-2">{t('events.stayTuned')}</p>
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
                          {event.attendance.length} {t('events.participants')}
                        </span>
                      </div>
                      <Button className="w-full">
                        {t('events.participate')}
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
