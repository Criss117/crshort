import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundScreen() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-bg-secondary via-bg to-bg" />

      <div className="relative">
        <span className="block font-mono text-[0.875rem] tracking-[0.5em] text-shadow-muted uppercase">
          Error
        </span>
        <p className="mt-4 font-mono text-[10rem]/[0.85] font-bold tracking-tighter text-shadow-muted tabular-nums">
          404
        </p>
        <p className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center font-mono text-sm tracking-widest text-muted-foreground/30">
          NOT_FOUND
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-lg font-medium text-foreground">
          Oops! La página que buscas no existe.
        </p>
        <p className="mt-1 max-w-xs text-center text-sm text-muted-foreground">
          El enlace que has seguido no es válido o ha caducado.
        </p>
      </div>

      <Button
        nativeButton={false}
        render={(props) => <Link {...props} to="/" />}
      >
        Volver al inicio
        <ArrowRight className="size-4" />
      </Button>
    </main>
  );
}
