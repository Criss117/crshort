import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { LinkIcon } from 'lucide-react';

import { ToogleThemeButton } from '@/presentation/components/toogle-theme';

export const Route = createFileRoute('/(landing)/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 bg-accent rounded-full flex items-center justify-center">
              <LinkIcon />
            </div>
            <span className="font-bold text-lg tracking-tight">crshort</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/features"
              className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
            >
              Funciones
            </Link>
            <Link
              to="/how-its-works"
              className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
            >
              Cómo funciona
            </Link>
            <Link to="/dashboard" className="button button--sm button--primary">
              Ingresar
            </Link>
            <div>
              <ToogleThemeButton />
            </div>
          </nav>
        </div>
      </header>

      <main className="px-6 max-w-6xl mx-auto flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-border/50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 bg-accent rounded-full flex items-center justify-center">
              <LinkIcon />
            </div>
            <span className="text-sm text-muted">
              © {new Date().getFullYear()} crshort.com
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Términos
            </Link>
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
