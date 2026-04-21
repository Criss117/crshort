import { Link } from '@tanstack/react-router';
import { Button } from '@heroui/react/button';

import { authClient } from '@/integrations/better-auth/auth-client';

import { GoogleIcon } from '@/presentation/components/icons/google';
import { GitHubIcon } from '@/presentation/components/icons/github';

async function handleSignIn(provider: 'github' | 'google') {
  const data = await authClient.signIn.social({
    provider,
    callbackURL: '/dashboard',
  });

  console.log(data);
}

export function SignInScreen() {
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
            fullWidth
            variant="tertiary"
            // onPress={() => handleSignIn('google')}
            className="h-12"
          >
            <GoogleIcon />
            Continuar con Google
          </Button>

          <Button
            fullWidth
            variant="tertiary"
            onPress={() => handleSignIn('github')}
            className="h-12"
          >
            <GitHubIcon />
            Continuar con GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-default-foreground/50">
          Al continuar, aceptas nuestros{' '}
          <Link
            to="/terms"
            className="underline underline-offset-2 hover:text-default-foreground/70"
          >
            Términos
          </Link>{' '}
          y{' '}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:text-default-foreground/70"
          >
            Política de privacidad
          </Link>
        </p>
      </div>
    </div>
  );
}
