
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:members(first_name, last_name),
          comments(count)
        `)
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedPosts posts={posts} loading={loading} />
      
      {/* Newsletter Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Receba nossa newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Fique por dentro das últimas reflexões e estudos bíblicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Inscrever-se</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Falando sobre Jesus</h3>
              <p className="text-primary-foreground/80">
                Compartilhando a palavra de Deus e edificando vidas através do evangelho.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="/blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
                <li><a href="/sobre" className="hover:text-primary-foreground transition-colors">Sobre</a></li>
                <li><a href="/contato" className="hover:text-primary-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Área de Membros</h4>
              <p className="text-primary-foreground/80 mb-4">
                Acesse conteúdo exclusivo para nossa comunidade
              </p>
              <Button variant="secondary" size="sm">
                Fazer Login
              </Button>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Falando sobre Jesus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
