import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoNew from "/FALANDO-SOBRE-JESUS.svg"
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2">
        <div className="flex h-22 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img 
                src={logoNew}
                alt="Falando sobre Jesus" 
                className="h-12 w-auto lg:h-13"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  {t('navigation.home')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  {t('navigation.blog')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-inconsolata">{t('navigation.ministry')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink href="/celulas" className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none font-funnel">{t('navigation.cells')}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-inconsolata">
                        {t('navigation.findCell')}
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/eventos" className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none font-funnel">{t('navigation.events')}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-inconsolata">
                        {t('navigation.joinEvents')}
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/sobre" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  {t('navigation.about')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contato" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-inconsolata">
                  {t('navigation.contact')}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="ghost" className="font-inconsolata">
                {t('auth.login')}
              </Button>
            </Link>
            <Link to="/login">
              <Button className="font-inconsolata">
                {t('navigation.membersArea')}
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
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.home')}
              </a>
              <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.blog')}
              </a>
              <a href="/celulas" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.cells')}
              </a>
              <a href="/eventos" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.events')}
              </a>
              <a href="/sobre" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.about')}
              </a>
              <a href="/contato" className="text-sm font-medium hover:text-primary transition-colors font-inconsolata">
                {t('navigation.contact')}
              </a>
              <div className="border-t pt-4 space-y-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start font-inconsolata">
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="w-full justify-start font-inconsolata">
                    {t('navigation.membersArea')}
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
