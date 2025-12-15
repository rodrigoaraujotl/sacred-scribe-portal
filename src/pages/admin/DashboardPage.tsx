import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { MembersTable } from "@/components/admin/MembersTable";
import { PostsTable } from "@/components/admin/PostsTable";
import { usePermissions } from "@/hooks/usePermissions";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const { t } = useTranslation();
  const { isAdmin, isModerator, hasPermission } = usePermissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <DashboardStats />

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">{t('dashboard.tabs.members')}</TabsTrigger>
          <TabsTrigger value="posts">{t('dashboard.tabs.posts')}</TabsTrigger>
          {(isAdmin() || isModerator()) && (
            <TabsTrigger value="settings">{t('dashboard.tabs.settings')}</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t('dashboard.tabs.members')}</h2>
            {hasPermission("create_member") && (
              <button className="btn btn-primary">{t('dashboard.actions.addMember')}</button>
            )}
          </div>
          <MembersTable />
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t('dashboard.tabs.posts')}</h2>
            {hasPermission("create_post") && (
              <button className="btn btn-primary">{t('dashboard.actions.newPost')}</button>
            )}
          </div>
          <PostsTable />
        </TabsContent>

        {(isAdmin() || isModerator()) && (
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t('dashboard.tabs.settings')}</h2>
            </div>
            <div className="grid gap-4">
              {isAdmin() && (
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">{t('dashboard.settings.permissions.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.settings.permissions.description')}
                  </p>
                </div>
              )}
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">{t('dashboard.settings.cells.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.settings.cells.description')}
                </p>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 