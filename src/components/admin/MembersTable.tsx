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
import { useTranslation } from "react-i18next";

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: {
    name: string;
  };
}

export function MembersTable() {
  const { t } = useTranslation();
  const { data: members, isLoading } = useQuery({
    queryKey: ["members", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select(`
          *,
          role:users(role:roles(name))
        `)
        .order("first_name");
      if (error) throw error;
      return data as Member[];
    },
  });

  if (isLoading) {
    return <div>{t('dashboard.membersTable.loading')}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('dashboard.membersTable.name')}</TableHead>
            <TableHead>{t('dashboard.membersTable.email')}</TableHead>
            <TableHead>{t('dashboard.membersTable.phone')}</TableHead>
            <TableHead>{t('dashboard.membersTable.permission')}</TableHead>
            <TableHead className="text-right">{t('dashboard.membersTable.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                {member.first_name} {member.last_name}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone_number}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {member.role?.name || t('dashboard.membersTable.noPermission')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  {t('dashboard.actions.edit')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 