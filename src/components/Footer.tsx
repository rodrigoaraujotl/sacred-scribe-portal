import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{t('footer.title')}</h3>
          <p className="text-primary-foreground/80">
            {t('footer.description')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li><a href="/blog" className="hover:text-primary-foreground transition-colors">{t('navigation.blog')}</a></li>
            <li><a href="/sobre" className="hover:text-primary-foreground transition-colors">{t('navigation.about')}</a></li>
            <li><a href="/contato" className="hover:text-primary-foreground transition-colors">{t('navigation.contact')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t('footer.membersArea.title')}</h4>
          <p className="text-primary-foreground/80 mb-4">
            {t('footer.membersArea.description')}
          </p>
          <Link to="/login">
            <Button variant="secondary" size="sm">
              {t('footer.membersArea.login')}
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
        <p>{t('footer.copyright')}</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
