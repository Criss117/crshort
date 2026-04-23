import { createFileRoute, Link } from '@tanstack/react-router';
import { FileText, LinkIcon, AlertTriangle } from 'lucide-react';

import { Button } from '@/presentation/components/ui/button';

export const Route = createFileRoute('/(landing)/_layout/privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="size-5" />
          <span className="text-sm">crshort.com</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-muted-foreground">
          Porque nos importa tu privacidad. O al menos, fingimos que nos
          importa.
        </p>
      </div>

      {/* Disclaimer Banner */}
      <div className="bg-secondary/50 border border-border/50 rounded-lg p-4 mb-8 flex gap-3">
        <AlertTriangle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">
            Aviso de transparencia
          </p>
          <p>
            Esta no es una política de privacidad seria. Es la política de un
            proyecto personal que usa cookies de analytics porque... todos las
            usan, ¿no? Si viniste aquí buscando GDPR compliance de nivel
            enterprise, wrong place. Pero al menos te dimos el aviso. Eso
            cuenta, ¿verdad? 🤔
          </p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. ¿Qué información coletamos?</h2>
          <p>
            Básicamente lo mínimo para que el servicio funcione. No estamos
            obsesionados con saber todo sobre ti. Ya tenemos bastante con
            mantener esto funcionando.
          </p>
          <p className="mt-2">
            <strong>Información que coletamos:</strong>
          </p>
          <ul>
            <li>
              <strong>Datos de cuenta:</strong> Email y lo que quieras compartir
              cuando te registras. Por ahora solo email, así que no hay mucho
              que hide.
            </li>
            <li>
              <strong>Datos de enlaces:</strong> Los URLs que acortas, slugs, y
              métricas de clics. Porque para eso estás aquí, ¿no? Para ver
              cuántos clics tiene tu enlace de "gato funny video".
            </li>
            <li>
              <strong>Datos de uso:</strong> Cuándo creaste enlaces, cuándo
              hicieron clic, y cosas técnicas tipo browser y IP. Sí, tenemos tu
              IP. Bienvenid@ al internet.
            </li>
            <li>
              <strong>Cookies:</strong> Un poco de magia digital para mantener
              la sesión activa y analytics básicos.
            </li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Especificar qué datos exactos coleta
            analytics (Google Analytics, Plausible, etc.)
          </p>
        </section>

        <section className="mb-8">
          <h2>2. ¿Cómo usamos tu información?</h2>
          <p>Para cosas útiles, principalmente:</p>
          <ul>
            <li>Mantener el servicio funcionando (gratis, ¿recuerdas?)</li>
            <li>Mostrarte tus estadísticas de clics</li>
            <li>Enviarte emails si olvidas tu contraseña</li>
            <li>
              Analytics para saber si alguien realmente usa esto (o solo somos
              nosotros probando)
            </li>
          </ul>
          <p className="mt-2">
            <strong>Lo que NO hacemos:</strong>
          </p>
          <ul>
            <li>Vendemos tu data a advertisers (no tenemos advertisers)</li>
            <li>
              Te rastreamos por todo el internet (para eso ya está Google)
            </li>
            <li>Compartimos tu info con terceros random</li>
            <li>
              Hacemos perfiles psikoolójikos para predecir tu futuro (aún)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. Cookies</h2>
          <p>
            Usamos cookies. Lo sé, lo sé, GDPR esto, CCPA aquello, banner de
            cookies por todas partes. Pero hey, son necesarias:
          </p>
          <ul>
            <li>
              <strong>Cookies esenciales:</strong> Sin estas, el login no
              funciona. Son como el WiFi en un café: el servicio completo
              depende de ellas.
            </li>
            <li>
              <strong>Cookies de analytics:</strong> Para saber cuántas personas
              usan el servicio. Spoiler: a veces solo somos una. 👋
            </li>
          </ul>
          <p className="mt-2">
            <strong>TODO:</strong> Implementar banner de cookies, permitir
            rechazo de cookies no esenciales, documentar opciones disponibles
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Tus derechos</h2>
          <p>
            Porque somos buena gente (o al menos lo intentamos). Tienes derecho
            a:
          </p>
          <ul>
            <li>
              <strong>Acceder a tus datos:</strong> Ver qué tenemos sobre ti.
              Probablemente no sea mucho, pero ahí está.
            </li>
            <li>
              <strong>Borrar tu cuenta:</strong> Si quieres irte, te dejamos ir.
              No hay 挽留 ni drama. Los portes están abiertos.
            </li>
            <li>
              <strong>Exportar tus datos:</strong> Si quieres tus enlaces en
              otro lugar, te los damos. Son tuyos, después de todo.
            </li>
            <li>
              <strong>Opt-out de analytics:</strong> <strong>TODO:</strong>{' '}
              Implementar mecanismo para rechazar tracking
            </li>
          </ul>
          <p className="mt-2">
            Para ejercer cualquiera de estos derechos, escríbenos. Probablemente
            te contestemos en menos de una semana. Probablemente.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Almacenamiento y seguridad</h2>
          <p>
            Tus datos están en la nube, como todos. Específicamente en{' '}
            <strong>TODO: especificar proveedor</strong>. Hacemos lo posible por
            mantenerlo seguro:
          </p>
          <ul>
            <li>Contraseñas hasheadas (nadie ve las tuyas, ni nosotros)</li>
            <li>
              HTTPS en todas partes (porque no usar HTTPS en 2024 es criminal)
            </li>
            <li>Backups regulares (porque sí, paranoia)</li>
          </ul>
          <p className="mt-2">
            Pero ojo: no podemos garantizar seguridad al 100%. Nadie puede. Si
            alguien quiere hackear este proyecto personal, solo le deseamos
            buena suerte encontrando algo interesante.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Links a terceros</h2>
          <p>
            Cuando haces clic en un enlace acortado, vas a otro website.
            Nosotros no controlamos esos websites. Su privacidad es su problema.
            Nosotros solo redirigimos. No endorsing, no responsibility, no
            associated with.
          </p>
          <p className="mt-2">
            Si acortas un enlace a un sitio web dudoso, eso es tu decisión. La
            nuestra es facilitarte herramientas. Lo que hagas con ellas es cosa
            tuya.
          </p>
        </section>

        <section className="mb-8">
          <h2>7. Cambios a esta política</h2>
          <p>
            Si cambiamos cosas (porque podemos), te lo avisaremos. Probably.
            Actualizaremos la fecha de "última actualización" para que sepas que
            algo cambió.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir proceso de notificación de cambios,
            cómo comunicaremos updates significativos
          </p>
        </section>

        <section className="mb-8">
          <h2>8. Contacto</h2>
          <p>
            ¿Preguntas sobre privacidad? ¿Te descubriste pensando "wow, esta
            gente realmente se tomó el tiempo de escribir una política de
            privacidad para su proyecto personal de domingo"? ¡Escríbenos!
          </p>
          <p className="mt-2">
            Consulta nuestra página de{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contacto
            </Link>{' '}
            para más info.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. El disclaimer final</h2>
          <p>
            Esta política de privacidad fue escrita con la mejor combinación de
            seriedad legal y humor de programador. No es vinculante para nadie
            porque esto no es una empresa, es un proyecto personal que existía
            principalmente para aprender TypeScript.
          </p>
          <p className="mt-2">
            Si llegaste hasta aquí esperando GDPR compliance de nivel
            enterprise, tienes dos opciones: contratar a un lawyer o aceitarte
            de que esto es software made with love en un garage. Bueno, en un
            cuarto. Con buena iluminación.
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            Última actualización: Esta versión tampoco está activa todavía. ¿Por
            qué le pongo fecha a algo que no existe? No sé. Optimismo, supongo.
          </p>
        </section>
      </div>

      {/* Back button */}
      <div className="mt-12 pt-6 border-t border-border/50">
        <Button variant="outline" render={<Link to="/" />} nativeButton={false}>
          <LinkIcon data-icon="inline-start" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
