import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  status: string;
  author: {
    first_name: string;
    last_name: string;
  };
}

export function PostsTable() {
  const { t, i18n } = useTranslation();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          author:members(first_name, last_name)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

  if (isLoading) {
    return <div>{t('dashboard.postsTable.loading')}</div>;
  }

  const getLocale = () => {
    if (i18n.language === 'pt') return ptBR;
    if (i18n.language === 'es') return es;
    return enUS;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('dashboard.postsTable.title')}</TableHead>
            <TableHead>{t('dashboard.postsTable.author')}</TableHead>
            <TableHead>{t('dashboard.postsTable.date')}</TableHead>
            <TableHead>{t('dashboard.postsTable.status')}</TableHead>
            <TableHead className="text-right">{t('dashboard.postsTable.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                {post.author.first_name} {post.author.last_name}
              </TableCell>
              <TableCell>
                {format(new Date(post.created_at), "dd/MM/yyyy", {
                  locale: getLocale(),
                })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    post.status === "published"
                      ? "default"
                      : post.status === "draft"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {post.status === "published"
                    ? t('dashboard.postsTable.published')
                    : post.status === "draft"
                    ? t('dashboard.postsTable.draft')
                    : t('dashboard.postsTable.rejected')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="mr-2">
                  {t('dashboard.actions.edit')}
                </Button>
                <Button variant="ghost" size="sm">
                  {post.status === "published" ? t('dashboard.actions.unpublish') : t('dashboard.actions.publish')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 