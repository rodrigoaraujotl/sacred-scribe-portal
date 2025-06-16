
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CellTeam {
  id: number;
  name: string;
  location?: string;
  photo?: string;
  created_at: string;
  leader?: {
    first_name: string;
    last_name: string;
  };
  member_count?: number;
}

const Cells = () => {
  const [cells, setCells] = useState<CellTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCells();
  }, []);

  const fetchCells = async () => {
    try {
      const { data, error } = await supabase
        .from('cell_teams')
        .select(`
          *,
          leader:members(first_name, last_name),
          member_teams(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cells:', error);
      } else {
        const cellsWithCount = data?.map(cell => ({
          ...cell,
          member_count: cell.member_teams?.length || 0
        })) || [];
        setCells(cellsWithCount);
      }
    } catch (error) {
      console.error('Error fetching cells:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Células</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre uma célula próxima a você e faça parte de nossa comunidade de fé
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">O que são as Células?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              As células são pequenos grupos que se reúnem semanalmente para estudar a Bíblia, 
              orar juntos e edificar uns aos outros na fé. É um lugar de comunhão íntima 
              onde cada pessoa pode crescer espiritualmente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Comunhão</h3>
                <p className="text-sm text-muted-foreground">Relacionamentos próximos e genuínos</p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Encontros Semanais</h3>
                <p className="text-sm text-muted-foreground">Reuniões regulares para crescimento</p>
              </div>
              <div className="text-center">
                <User className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Liderança</h3>
                <p className="text-sm text-muted-foreground">Líderes capacitados e comprometidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cells List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando células...</p>
          </div>
        ) : cells.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma célula cadastrada no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cells.map((cell) => (
              <Card key={cell.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {cell.photo && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={cell.photo} 
                      alt={cell.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {cell.name}
                    <Badge variant="secondary">
                      {cell.member_count} membros
                    </Badge>
                  </CardTitle>
                  {cell.leader && (
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Líder: {cell.leader.first_name} {cell.leader.last_name}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {cell.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{cell.location}</span>
                    </div>
                  )}
                  <Button className="w-full">
                    Participar da Célula
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Quer liderar uma célula?</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Se você sente o chamado para liderar e discipular outros, entre em contato conosco. 
            Oferecemos treinamento e suporte completo para novos líderes.
          </p>
          <Button size="lg">
            Quero ser um Líder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cells;
