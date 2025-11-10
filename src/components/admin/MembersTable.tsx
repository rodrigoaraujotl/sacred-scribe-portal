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
    return <div>Carregando...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Permissão</TableHead>
            <TableHead className="text-right">Ações</TableHead>
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
                  {member.role?.name || "Sem permissão"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 