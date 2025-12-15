
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

interface Post {
  id: number;
  title: string;
  content: string;
  photo?: string;
  created_at: string;
  author?: {
    first_name: string;
    last_name: string;
  };
  comments?: { count: number }[];
}

interface FeaturedPostsProps {
  posts: Post[];
  loading: boolean;
}

const FeaturedPosts = ({ posts, loading }: FeaturedPostsProps) => {
  const { t, i18n } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('featuredPosts.title')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('featuredPosts.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
      <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('featuredPosts.title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('featuredPosts.subtitle')}
          </p>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {t('featuredPosts.noPosts')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {post.photo && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.photo} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{t('featuredPosts.reflection')}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    {post.author && (
                      <CardDescription>
                        {t('featuredPosts.by')} {post.author.first_name} {post.author.last_name}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {truncateContent(post.content)}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm">
                        {t('featuredPosts.readMore')}
                      </Button>
                      {post.comments && (
                        <span className="text-sm text-muted-foreground">
                          {post.comments.length} {t('featuredPosts.comments')}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" variant="outline">
                {t('featuredPosts.viewAll')}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
