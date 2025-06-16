
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Formulário enviado");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contato</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entre em contato conosco. Estamos aqui para orar com você e responder suas dúvidas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entraremos em contato em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <Input id="firstName" placeholder="Seu nome" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Sobrenome
                    </label>
                    <Input id="lastName" placeholder="Seu sobrenome" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" required />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone (opcional)
                  </label>
                  <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Assunto
                  </label>
                  <Input id="subject" placeholder="Como podemos ajudar?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Escreva sua mensagem aqui..." 
                    rows={5}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rua da Fé, 123<br />
                  Centro - São Paulo, SP<br />
                  CEP: 01234-567
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  (11) 3456-7890<br />
                  WhatsApp: (11) 99999-9999
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  contato@falandosobrejesus.com.br<br />
                  pastoreado@falandosobrejesus.com.br
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horários de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="font-medium">Domingo:</span> 9h e 19h (Cultos)</p>
                  <p><span className="font-medium">Quarta:</span> 19h30 (Estudo Bíblico)</p>
                  <p><span className="font-medium">Sexta:</span> 19h30 (Vigília de Oração)</p>
                  <p><span className="font-medium">Segunda a Sexta:</span> 9h às 17h (Secretaria)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
