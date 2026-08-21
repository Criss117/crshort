import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import { GoogleIcon } from '@/presentation/components/icons/google';
import { GitHubIcon } from '@/presentation/components/icons/github';
import { useAuth } from '@/application/hooks/use-auth';
import { Button } from '@/presentation/components/ui/button';

export function SignInScreen() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    signIn.mutate(
      { provider },
      {
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenido</h1>
          <p className="text-default-foreground/60">
            Inicia sesión para continuar
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            // onPress={() => handleSignIn('google')}
            className="h-12 w-full"
          >
            <GoogleIcon />
            Continuar con Google
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSignIn('github')}
            className="h-12 w-full"
            disabled={isLoading}
          >
            <GitHubIcon />
            Continuar con GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-foreground/50">
          Al continuar, aceptas nuestros{' '}
          <Link
            to="/terms"
            className="underline underline-offset-2 hover:text-foreground/70"
          >
            Términos
          </Link>{' '}
          y{' '}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:text-foreground/70"
          >
            Política de privacidad
          </Link>
        </p>
      </div>
    </div>
  );
}
