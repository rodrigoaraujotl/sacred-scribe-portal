
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
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
          <h2 className="text-3xl font-bold mb-4">{t('index.newsletter.title')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('index.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('index.newsletter.emailPlaceholder')}
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>{t('index.newsletter.subscribe')}</Button>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
};

export default Index;
