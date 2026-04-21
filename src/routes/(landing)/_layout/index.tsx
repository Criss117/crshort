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
          Acorta tus <span className="text-accent">links</span>
          <br />
          en segundos
        </h1>

        <p className="text-lg text-muted mb-10 max-w-xl mx-auto leading-relaxed">
          Transforma URLs largas en enlaces cortos y memorizables. Comparte
          fácilmente en redes sociales, mensajes y emails.
        </p>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted">
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
          <Link to="/dashboard" className="button button--primary">
            Crear mi primer link
          </Link>
        </div>
      </section>

      <section id="features" className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas</h2>
          <p className="text-muted max-w-md mx-auto">
            Herramientas potentes para gestionar tus enlaces cortos de manera
            eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-soft-hover transition-colors">
              <Download />
            </div>
            <h3 className="font-semibold text-lg mb-2">Descarga instantánea</h3>
            <p className="text-muted text-sm leading-relaxed">
              Comparte tus enlaces al instante. Sin esperas, sin complicaciones.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-soft-hover transition-colors">
              <PencilLine />
            </div>
            <h3 className="font-semibold text-lg mb-2">Links personalizados</h3>
            <p className="text-muted text-sm leading-relaxed">
              Elige tu propio alias para crear URLs memorizables y
              profesionales.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-soft-hover transition-colors">
              <ChartLine />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Estadísticas detalladas
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Conoce cuántos clics recibe cada enlace, ubicación y dispositivos.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-muted max-w-md mx-auto">
            En solo 3 pasos tendrás tu link corto listo para compartir.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 bg-accent/50 text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              1
            </div>
            <h3 className="font-semibold mb-2">Pega tu URL</h3>
            <p className="text-muted text-sm">
              Copia cualquier enlace largo y pégalo en el campo de arriba.
            </p>
          </div>

          <div className="hidden md:block text-muted">
            <ChevronRight />
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16  bg-accent/50 text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              2
            </div>
            <h3 className="font-semibold mb-2">Personaliza (opcional)</h3>
            <p className="text-muted text-sm">
              Añade un alias único o usa el generado automáticamente.
            </p>
          </div>

          <div className="hidden md:block text-muted">
            <ChevronRight />
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16  bg-accent/50 text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
              3
            </div>
            <h3 className="font-semibold mb-2">¡Comparte!</h3>
            <p className="text-muted text-sm">
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
            <p className="text-muted mb-8 max-w-md mx-auto">
              Ingresa a crshort.com para crear tus primeros enlaces.
            </p>
            <div className="flex items-center justify-center gap-4 w-1/2 mx-auto">
              <Link
                to="/dashboard"
                className="button button--lg button--primary flex-1"
              >
                Ingresar
              </Link>
              <Link
                to="/dashboard"
                className="button button--lg button--secondary flex-1 text-black"
              >
                Ver documentación
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
