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
import { ptBR } from "date-fns/locale";

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
    return <div>Carregando...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
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
                  locale: ptBR,
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
                    ? "Publicado"
                    : post.status === "draft"
                    ? "Rascunho"
                    : "Rejeitado"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="mr-2">
                  Editar
                </Button>
                <Button variant="ghost" size="sm">
                  {post.status === "published" ? "Despublicar" : "Publicar"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 