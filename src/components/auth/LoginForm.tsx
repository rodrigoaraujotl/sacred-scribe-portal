import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn.mutateAsync({ email, password });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t('auth.loginForm.title')}</CardTitle>
        <CardDescription>
          {t('auth.loginForm.description')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t('auth.loginForm.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.loginForm.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t('auth.loginForm.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('auth.loginForm.submitting') : t('auth.loginForm.submit')}
          </Button>
          <div className="text-sm text-center">
            <Link to="/forgot-password" className="text-primary hover:underline">
              {t('auth.loginForm.forgotPassword')}
            </Link>
          </div>
          <div className="text-sm text-center">
            {t('auth.loginForm.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.loginForm.registerLink')}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
} 