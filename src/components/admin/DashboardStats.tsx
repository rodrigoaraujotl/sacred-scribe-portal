import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function DashboardStats() {
  const { data: membersCount } = useQuery({
    queryKey: ["members", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count;
    },
  });

  const { data: cellsCount } = useQuery({
    queryKey: ["cells", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("cells")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count;
    },
  });

  const { data: postsCount } = useQuery({
    queryKey: ["posts", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count;
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{membersCount || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Células</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cellsCount || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{postsCount || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
} 