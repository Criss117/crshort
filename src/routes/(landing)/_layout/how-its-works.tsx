import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, Link as LinkIcon } from 'lucide-react';

export const Route = createFileRoute('/(landing)/_layout/how-its-works')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Cómo funciona | crshort' }],
  }),
});

function RouteComponent() {
  return (
    <div className="py-12">
      <header className="mx-auto mb-16 max-w-3xl">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <LinkIcon className="size-5" />
          <span className="text-sm">crshort.com</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Cómo funciona
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Cinco pasos para pasar de una URL interminable a un link que se puede
          compartir sin pedir disculpas. No hace falta un tutorial de 40 minutos.
        </p>
      </header>

      <section aria-label="Pasos para usar crshort" className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
          <Step number="1" title="Crear cuenta (o no)">
            Inicia sesión con Google, GitHub o email, aunque también puedes
            probar sin cuenta. No vamos a convertir el registro en una prueba de
            carácter.
          </Step>
          <Step number="2" title="Pega tu URL larga">
            Entra al dashboard y pega ese enlace enorme que te da vergüenza
            compartir. Nos pasa a todos; internet está lleno de parámetros.
          </Step>
          <Step number="3" title="Customiza">
            Elige un slug opcional de 5 a 10 caracteres y añade tags con colores.
            O deja que todo se genere solo. No somos tu jefe (por suerte).
          </Step>
          <Step number="4" title="Comparte el link corto">
            Copia el enlace resultante y compártelo donde quieras. El plan es
            sencillo: pegar, enviar y fingir que lo tenías pensado desde antes.
          </Step>
          <Step number="5" title="Ve tus analytics en tiempo real">
            Revisa clics, países, referrers y dispositivos por link. Información
            útil para entender qué pasó, no una bola de cristal para el futuro.
          </Step>
        </div>
      </section>

      <section className="mx-auto mt-32 mb-16 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 text-center sm:p-12">
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-accent/5" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold">No era tan complicado</h2>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Pruébalo en el dashboard. Si algo sale raro, probablemente sea
              culpa de una URL que parecía normal.
            </p>
            <Button
              nativeButton={false}
              render={(props) => (
                <Link to="/dashboard" {...props}>
                  Empezar ahora
                </Link>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

type StepProps = {
  number: string;
  title: string;
  children: string;
};

function Step({ number, title, children }: StepProps) {
  return (
    <>
      <Card className="h-full lg:flex-1">
        <CardContent className="flex h-full flex-col items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/50 text-2xl font-bold text-primary-foreground shadow-lg">
            {number}
          </div>
          <h2 className="mb-2 text-lg font-semibold">{title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {children}
          </p>
        </CardContent>
      </Card>
      {number !== '5' && (
        <div className="hidden items-center justify-center text-muted-foreground lg:flex">
          <ChevronRight className="size-5" />
        </div>
      )}
    </>
  );
}
