import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, User } from "lucide-react";
import { useCellTeams } from "@/hooks/useCellTeams";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Cells = () => {
  const { teams, isLoading, error } = useCellTeams();
  const { t } = useTranslation();

  if (error) {
    toast.error(t('cells.error'));
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('cells.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('cells.subtitle')}
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cells.whatAreCells.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              {t('cells.whatAreCells.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">{t('cells.whatAreCells.features.communion.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('cells.whatAreCells.features.communion.description')}
                </p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">{t('cells.whatAreCells.features.meetings.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('cells.whatAreCells.features.meetings.description')}
                </p>
              </div>
              <div className="text-center">
                <User className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">{t('cells.whatAreCells.features.leadership.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('cells.whatAreCells.features.leadership.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cells List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('cells.loading')}</p>
          </div>
        ) : teams?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('cells.noCells')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams?.map((team) => (
              <Card key={team.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {team.photo && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={team.photo} 
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {team.name}
                    <Badge variant="secondary">
                      {team.meetings.length} {t('cells.meetings')}
                    </Badge>
                  </CardTitle>
                  {team.leader && (
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('cells.leader')}: {team.leader.first_name} {team.leader.last_name}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {team.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{team.location}</span>
                    </div>
                  )}
                  <Button className="w-full">
                    {t('cells.joinCell')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">{t('cells.becomeLeader.title')}</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            {t('cells.becomeLeader.description')}
          </p>
          <Button size="lg">
            {t('cells.becomeLeader.button')}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cells;
