
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Book, Church } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.mission.description')}
            </p>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>{t('about.values.love.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.values.love.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>{t('about.values.communion.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.values.communion.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Book className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>{t('about.values.word.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.values.word.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Church className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>{t('about.values.service.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.values.service.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* About Text */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('about.history.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('about.history.paragraph1')}
              </p>
              <p className="text-muted-foreground">
                {t('about.history.paragraph2')}
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('about.vision.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('about.vision.paragraph1')}
              </p>
              <p className="text-muted-foreground">
                {t('about.vision.paragraph2')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
