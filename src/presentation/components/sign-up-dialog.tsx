import { useState } from 'react';
import { getSessionQueryOptions } from '@/application/queries/auth.queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { Skeleton } from './ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useAuth } from '@/application/hooks/use-auth';
import { GitHubIcon } from './icons/github';
import { GoogleIcon } from './icons/google';

export function SignUpDialog() {
  const { data } = useSuspenseQuery(getSessionQueryOptions);
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

  if (data)
    return (
      <Button
        nativeButton={false}
        render={(props) => <Link to="/dashboard" {...props} />}
      >
        Ir al Dashboard
      </Button>
    );

  return (
    <Dialog>
      <DialogTrigger render={(props) => <Button {...props} />}>
        Iniciar Sesión
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bienvenido</DialogTitle>
          <DialogDescription>Inicia sesión para continuar</DialogDescription>
        </DialogHeader>
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

        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SignUpDialogSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
