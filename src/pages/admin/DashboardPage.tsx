import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { MembersTable } from "@/components/admin/MembersTable";
import { PostsTable } from "@/components/admin/PostsTable";
import { usePermissions } from "@/hooks/usePermissions";

export function DashboardPage() {
  const { isAdmin, isModerator, hasPermission } = usePermissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Gerencie membros, células e posts do portal
        </p>
      </div>

      <DashboardStats />

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {(isAdmin() || isModerator()) && (
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Membros</h2>
            {hasPermission("create_member") && (
              <button className="btn btn-primary">Adicionar Membro</button>
            )}
          </div>
          <MembersTable />
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Posts</h2>
            {hasPermission("create_post") && (
              <button className="btn btn-primary">Novo Post</button>
            )}
          </div>
          <PostsTable />
        </TabsContent>

        {(isAdmin() || isModerator()) && (
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Configurações</h2>
            </div>
            <div className="grid gap-4">
              {isAdmin() && (
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Permissões</h3>
                  <p className="text-sm text-muted-foreground">
                    Gerencie as permissões dos membros
                  </p>
                </div>
              )}
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Células</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie as células e seus líderes
                </p>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 