import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logoNew from "/FALANDO-SOBRE-JESUS.svg"

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            <img 
              src={logoNew}
              alt="Falando sobre Jesus" 
              className="h-12 w-auto lg:h-13"
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Olá, {user?.user_metadata?.first_name || 'Usuário'}
            </span>
            <Button variant="outline" onClick={() => signOut.mutate()}>
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 