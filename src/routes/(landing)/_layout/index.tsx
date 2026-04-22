import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ActivityIcon,
  ChartLine,
  ChevronRight,
  Download,
  Eye,
  PencilLine,
} from 'lucide-react';

export const Route = createFileRoute('/(landing)/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="h-[20dvh] w-full" />
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Acorta tus <span className="text-primary">links</span>
          <br />
          en segundos
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Transforma URLs largas en enlaces cortos y memorizables. Comparte
          fácilmente en redes sociales, mensajes y emails.
        </p>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye />
            <span>
              <strong className="text-foreground">10K+</strong> links creados
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ActivityIcon />
            <span>
              <strong className="text-foreground">99.9%</strong> uptime
            </span>
          </div>
        </div>
        <div className="mt-5">
          <Button
            className="font-semibold"
            nativeButton={false}
            render={(props) => <Link to="/dashboard" {...props} />}
          >
            Crear mi primer link
          </Button>
        </div>
      </section>

      <section id="features" className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Herramientas potentes para gestionar tus enlaces cortos de manera
            eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent>
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Download />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Descarga instantánea
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comparte tus enlaces al instante. Sin esperas, sin
                complicaciones.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <PencilLine />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Links personalizados
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Elige tu propio alias para crear URLs memorizables y
                profesionales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <ChartLine />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Estadísticas detalladas
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Conoce cuántos clics recibe cada enlace, ubicación y
                dispositivos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            En solo 3 pasos tendrás tu link corto listo para compartir.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 bg-primary/50 text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              1
            </div>
            <h3 className="font-semibold mb-2">Pega tu URL</h3>
            <p className="text-muted-foreground text-sm">
              Copia cualquier enlace largo y pégalo en el campo de arriba.
            </p>
          </div>

          <div className="hidden md:block text-muted-foreground">
            <ChevronRight />
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16  bg-primary/50 text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              2
            </div>
            <h3 className="font-semibold mb-2">Personaliza (opcional)</h3>
            <p className="text-muted-foreground text-sm">
              Añade un alias único o usa el generado automáticamente.
            </p>
          </div>

          <div className="hidden md:block text-muted-foreground">
            <ChevronRight />
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16  bg-primary/50 text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              3
            </div>
            <h3 className="font-semibold mb-2">¡Comparte!</h3>
            <p className="text-muted-foreground text-sm">
              Copia tu link corto y compártelo donde quieras.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-32 mb-16">
        <div className="bg-card rounded-3xl p-12 text-center border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-accent/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Ingresa a crshort.com para crear tus primeros enlaces.
            </p>
            <div className="flex items-center justify-center gap-4 w-1/2 mx-auto">
              <Button
                className="flex-1"
                render={(props) => (
                  <Link to="/dashboard" {...props}>
                    Ingresar
                  </Link>
                )}
              />

              <Button
                className="flex-1"
                variant="secondary"
                render={(props) => (
                  <Link to="/dashboard" {...props}>
                    Ver documentación
                  </Link>
                )}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
