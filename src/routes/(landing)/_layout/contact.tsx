import { createFileRoute } from '@tanstack/react-router';
import { Mail, AlertTriangle } from 'lucide-react';

import { ContactForm } from '@/presentation/components/contact-form';

export const Route = createFileRoute('/(landing)/_layout/contact')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Contacto | crshort' }],
  }),
});

export function RouteComponent() {
  return (
    <div className="py-12 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="size-5" />
          <span className="text-sm">crshort.com</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
        <p className="text-muted-foreground">
          Porque necesito sentirme importante. O porque tienes una queja
          legítima. Cualquiera de las dos me sirve.
        </p>
      </div>

      <div className="bg-secondary/50 border border-border/50 rounded-lg p-4 mb-8 flex gap-3">
        <AlertTriangle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">
            Spoiler: esto no es un formulario de contacto real
          </p>
          <p>
            Este es un proyecto personal, no una empresa con un equipo de
            soporte. El formulario de abajo no envía ningún dato a ningún lado.
            Es puramente decorativo, como esas plantas de plástico que parecen
            reales hasta que las tocas. Si quieres contactarme de verdad, mejor
            busca mi perfil de GitHub. 🫣
          </p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
        <p>
          Dicho esto, siéntete libre de llenar el formulario. Es una experiencia
          casi terapéutica: escribes lo que piensas, presionas enviar, y sientes
          que alguien te escucha. Nadie te escucha, pero la sensación es
          agradable.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
