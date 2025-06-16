import { Button } from "@/components/ui/button";

const Footer = () => {

  return (
    <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Falando sobre Jesus</h3>
          <p className="text-primary-foreground/80">
            Compartilhando a palavra de Deus e edificando vidas através do evangelho.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li><a href="/blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
            <li><a href="/sobre" className="hover:text-primary-foreground transition-colors">Sobre</a></li>
            <li><a href="/contato" className="hover:text-primary-foreground transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Área de Membros</h4>
          <p className="text-primary-foreground/80 mb-4">
            Acesse conteúdo exclusivo para nossa comunidade
          </p>
          <Button variant="secondary" size="sm">
            Fazer Login
          </Button>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
        <p>&copy; 2025 Falando sobre Jesus. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
