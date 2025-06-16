
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/1e9b9a03-1657-4782-ac70-0fd1c9e9ed80.png" 
              alt="Falando sobre Jesus" 
              className="h-10 w-auto"
            />
            <span className="font-funnel font-bold text-xl">Falando sobre Jesus</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  Início
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-inconsolata">Ministério</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink href="/celulas" className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none font-funnel">Células</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-inconsolata">
                        Encontre uma célula próxima a você
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/eventos" className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none font-funnel">Eventos</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-inconsolata">
                        Participe dos nossos eventos
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/sobre" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  Sobre
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contato" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  Contato
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" className="font-inconsolata">
                Entrar
              </Button>
            </Link>
            <Link to="/login">
              <Button className="font-inconsolata">
                Área de Membros
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Início</a>
              <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Blog</a>
              <a href="/celulas" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Células</a>
              <a href="/eventos" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Eventos</a>
              <a href="/sobre" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Sobre</a>
              <a href="/contato" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">Contato</a>
              <div className="border-t pt-4 space-y-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start font-inconsolata">
                    Entrar
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="w-full justify-start font-inconsolata">
                    Área de Membros
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
