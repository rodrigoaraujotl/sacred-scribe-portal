import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type Permission = {
  id: number;
  name: string;
  description: string;
};

export type RolePermission = {
  permission: Permission;
};

export type Role = {
  id: number;
  name: string;
  permissions: RolePermission[];
};

export function usePermissions() {
  const { data: userRole, isLoading } = useQuery({
    queryKey: ["user", "role"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("users")
        .select(`
          role:roles(
            id,
            name,
            permissions:role_permissions(
              permission:permissions(
                id,
                name,
                description
              )
            )
          )
        `)
        .eq("supabase_user_id", user.id)
        .single();

      if (error) throw error;
      return data?.role as Role;
    },
  });

  const hasPermission = (permissionName: string) => {
    if (!userRole) return false;
    return userRole.permissions.some(
      (p) => p.permission.name === permissionName
    );
  };

  const isAdmin = () => {
    return userRole?.name === "admin";
  };

  const isModerator = () => {
    return userRole?.name === "moderator";
  };

  const isMember = () => {
    return userRole?.name === "member";
  };

  return {
    userRole,
    isLoading,
    hasPermission,
    isAdmin,
    isModerator,
    isMember,
  };
} 