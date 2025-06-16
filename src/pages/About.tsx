
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Book, Church } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça nossa história, missão e valores como comunidade cristã
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Compartilhar o amor de Jesus Cristo através da palavra, da comunhão e do serviço, 
              edificando vidas e fortalecendo a fé de cada pessoa que faz parte da nossa comunidade.
            </p>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Amor</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Demonstramos o amor de Cristo em todas as nossas ações e relacionamentos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Comunhão</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Valorizamos a união e o companheirismo entre os irmãos na fé
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Book className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Palavra</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fundamentamos nossa fé e ensino na Palavra de Deus
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Church className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Servimos a Deus e ao próximo com dedicação e humildade
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* About Text */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Nossa História</h3>
              <p className="text-muted-foreground mb-4">
                O ministério "Falando sobre Jesus" nasceu do desejo de compartilhar 
                a palavra de Deus de forma simples e acessível, alcançando corações 
                e transformando vidas através do evangelho.
              </p>
              <p className="text-muted-foreground">
                Começamos como um pequeno grupo de estudos bíblicos e crescemos 
                para nos tornar uma comunidade vibrante de fé, sempre focados 
                em Jesus Cristo como centro de tudo.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground mb-4">
                Ser uma comunidade cristã que impacta positivamente a sociedade, 
                formando discípulos comprometidos com a palavra de Deus e 
                o serviço ao próximo.
              </p>
              <p className="text-muted-foreground">
                Buscamos ser uma igreja relevante para nossa geração, sem perder 
                a essência do evangelho, sempre proclamando Jesus como Salvador 
                e Senhor.
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
