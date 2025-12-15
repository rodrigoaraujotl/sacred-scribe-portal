import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { resetPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword.mutateAsync(email);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t('auth.forgotPasswordForm.title')}</CardTitle>
        <CardDescription>
          {t('auth.forgotPasswordForm.description')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t('auth.forgotPasswordForm.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.forgotPasswordForm.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('auth.forgotPasswordForm.submitting') : t('auth.forgotPasswordForm.submit')}
          </Button>
          <div className="text-sm text-center">
            <Link to="/login" className="text-primary hover:underline">
              {t('auth.forgotPasswordForm.backToLogin')}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
} 