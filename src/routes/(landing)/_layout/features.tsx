import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ChartLine,
  KeyRound,
  Link as LinkIcon,
  PencilLine,
  Shield,
  SunMoon,
  Tags,
  Trash2,
  ToggleLeft,
} from 'lucide-react';

export const Route = createFileRoute('/(landing)/_layout/features')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Funciones | crshort' }],
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
          Funciones para acortar enlaces sin montar una presentación de ventas
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Lo necesario para crear, ordenar y entender tus links. No hay magia,
          solo una aplicación que intenta hacer bien su trabajo (probablemente).
        </p>
      </header>

      <section aria-label="Funciones de crshort" className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={LinkIcon}
            title="URLs cortas"
            description="Generamos slugs automáticos en base36 de 6 a 10 caracteres. Porque copiar una novela para compartir un enlace nunca fue una buena experiencia."
          />
          <FeatureCard
            icon={PencilLine}
            title="Slugs personalizados"
            description="Elige un alias de 5 a 10 caracteres y edítalo cuando toque. Tu link puede llamarse como quieras (dentro de límites razonables, tampoco somos literatura)."
          />
          <FeatureCard
            icon={Tags}
            title="Tags con colores"
            description="Organiza tus enlaces con tags y colores. Una pequeña ayuda para fingir que el caos de tus proyectos tiene algún tipo de sistema."
          />
          <FeatureCard
            icon={ChartLine}
            title="Analytics por link"
            description="Consulta la serie temporal diaria y los principales países, referrers y dispositivos. Datos suficientes para saber qué pasó, no para predecir el futuro."
          />
          <FeatureCard
            icon={Shield}
            title="Tracking privacy-first"
            description="Usamos MaxMind GeoIP para país y ciudad, y un hash SHA-256 de la IP con salt. Sin IP cruda y con 365 días de retención; el chisme también tiene límites."
          />
          <FeatureCard
            icon={ToggleLeft}
            title="Gestión de enlaces"
            description="Activa o desactiva links sin borrarlos, y elimina varios de una vez. Para cuando cambias de opinión sobre tu colección de URLs."
          />
          <FeatureCard
            icon={KeyRound}
            title="Autenticación"
            description="Puedes entrar con Google, GitHub o email y contraseña mediante Better Auth. Tres caminos para llegar al mismo dashboard, porque elegir uno era demasiado fácil."
          />
          <FeatureCard
            icon={SunMoon}
            title="Tema claro u oscuro"
            description="Cambia entre tema claro y oscuro según tu pantalla, tu horario o tu estado de ánimo. No arregla tu código, pero al menos no te quema los ojos."
          />
        </div>
      </section>

      <section className="mx-auto mt-32 mb-16 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 text-center sm:p-12">
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-accent/5" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold">Ya viste las funciones</h2>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Ahora puedes volver a tu vida o probar el dashboard. No vamos a
              perseguirte con notificaciones.
            </p>
            <Button
              nativeButton={false}
              render={(props) => (
                <Link to="/dashboard" {...props}>
                  Ir al dashboard
                </Link>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

type FeatureCardProps = {
  icon: typeof LinkIcon;
  title: string;
  description: string;
};

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
