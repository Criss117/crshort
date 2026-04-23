import { createFileRoute, Link } from '@tanstack/react-router';
import { FileText, LinkIcon, AlertTriangle } from 'lucide-react';

import { Button } from '@/presentation/components/ui/button';

export const Route = createFileRoute('/(landing)/_layout/terms')({
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
          Términos de Servicio
        </h1>
        <p className="text-muted-foreground">
          Porque hasta los proyectos personales de fin de semana necesitan
          papeleo.
        </p>
      </div>

      {/* Disclaimer Banner */}
      <div className="bg-secondary/50 border border-border/50 rounded-lg p-4 mb-8 flex gap-3">
        <AlertTriangle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Aviso importante</p>
          <p>
            Esto no son términos serios. Son los términos de un acortador de
            URLs que existe "porque sí". Probablemente nadie los lea, pero aquí
            están por si acaso. Si llegaste hasta aquí, congratulations, tienes
            mucho tiempo libre. 📚
          </p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al usar crshort.com (en adelante "el servicio", "nosotros", o "este
            proyecto al que le dedico tiempo los domingos"), aceptas estos
            términos en su totalidad. Si no estás de acuerdo, eres libre de no
            usar el servicio. Nadie te está obligando. En serio. Puedes cerrar
            esta pestaña.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. El servicio</h2>
          <p>
            crshort.com es un acortador de URLs. Toma enlaces largos, los hace
            cortos, y cuando alguien hace clic, los redirige a destino.
            Increíble, ¿verdad? Probablemente has visto otros como Bitly o
            TinyURL. Esto es básicamente lo mismo, pero hecho en casa.
          </p>
          <p className="mt-2">
            <strong>TODO:</strong> Describir funcionalidades específicas del
            servicio (límite de enlaces, estadísticas, API, etc.)
          </p>
        </section>

        <section className="mb-8">
          <h2>3. Uso aceptable</h2>
          <p>Está bien:</p>
          <ul>
            <li>Acortar enlaces para compartir en redes sociales</li>
            <li>Usarlo para tus proyectos personales</li>
            <li>Crear enlaces para testing y desarrollo</li>
            <li>Cualquier cosa legal y no demasiado rara</li>
          </ul>
          <p className="mt-3">No está bien:</p>
          <ul>
            <li>
              Usarlo para phishing, malware, o做任何坏事 (perdón, se me fue el
              idioma)
            </li>
            <li>Spam masivo tipo "Gana dinero desde casa"</li>
            <li>
              Redirigir a contenido ilegal, NSFW, o cualquier cosa que te dé
              shame
            </li>
            <li>
              Vender acceso a enlaces acortados (¿Por qué alguien haría esto?)
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir límites específicos (ej: máx. X
            enlaces por día, máx. Y clics por enlace)
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Disponibilidad</h2>
          <p>
            Este servicio funciona "cuando funciona". Es mantenido por una sola
            persona en su tiempo libre, entrever las series, y evitar hacer
            cosas productivas. No garantizamos uptime del 99.9%. Si el servicio
            está caído, hay dos opciones:
          </p>
          <ol className="mt-2">
            <li>Nosotros lo arreglamos cuando podamos</li>
            <li>Usas otro acortador y te olvidas de nosotros</li>
          </ol>
          <p className="mt-2">
            La opción 2 es válida. No te guardamos rencor. Probablemente ni nos
            demos cuenta.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir horas de mantenimiento, proceso de
            notificaciones, SLA si aplica
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Tus enlaces son tuyos (hasta que no lo son)</h2>
          <p>
            Los enlaces que crees son tuyos. O algo así. Puedes eliminarlos
            cuando quieras. Nosotros podemos eliminarlos... cuando queramos
            también. Si violas los términos, bye bye enlaces. Sin drama.
          </p>
          <p className="mt-2">
            <strong>TODO:</strong> Definir política de retención de datos tras
            eliminación de cuenta, procedimiento de exportación de datos
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Responsabilidad</h2>
          <p>
            <strong>TODO:</strong> Cláusula estándar de limitación de
            responsabilidad
          </p>
          <p className="mt-2">
            Básicamente: si algo sale mal, si tu enlace no funciona, si el
            internet explota, no es nuestra culpa. Usas el servicio bajo tu
            propio riesgo. ¿Sabes esa canción de "as is"? Eso.
          </p>
        </section>

        <section className="mb-8">
          <h2>7. Privacidad</h2>
          <p>
            Respetamos tu privacidad. O al menos lo intentamos. Mira nuestra{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Política de Privacidad
            </Link>{' '}
            para saber qué coletamos.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Enlazar a política de cookies, describir uso
            de analytics, cookies esenciales vs. de terceros
          </p>
        </section>

        <section className="mb-8">
          <h2>8. Modificaciones</h2>
          <p>
            Podemos cambiar estos términos cuando nos dé la gana. En realidad,
            no, te avisaremos. Probablemente. Si rememberamos hacerlo. Los
            cambios不会是 retroactively aplicada a menos que sea necesario. (Eso
            fue chino accidental, pero se ve fancy).
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir proceso de notificación de cambios,
            período de gracia, fecha efectiva de cambios
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Propiedad intelectual</h2>
          <p>
            Todo el código, diseño, y branding de crshort.com es nuestro. O sea,
            de quien lo hizo. Tú puedes usarlo (el servicio), pero no puedes
            robarlo (el código). Si quieres contribuir, open source maybe en el
            future.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir licencia del código, uso de
            logos/marcas, contribuciones de terceros
          </p>
        </section>

        <section className="mb-8">
          <h2>10. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de... eh... depende de dónde
            estés y de dónde esté el servidor (spoiler: en la nube, lo que sea
            que eso signifique).
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TODO:</strong> Definir jurisdicción específica, tribunal
            competente, resolución de disputas
          </p>
        </section>

        <section className="mb-8">
          <h2>11. Contacto</h2>
          <p>
            ¿Tienes preguntas? ¿Quejas? ¿Ofertas de trabajo que nunca
            contestamos? Escríbenos a nuestro correo en la página de{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contacto
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2>12. El texto legal más innecesario de la historia</h2>
          <p>
            Si llegaste hasta aquí, genuinamente te preguntamos: ¿Estás bien?
            ¿No tienes nada mejor que hacer? ¿Te gustó el humor o eres de los
            que se ofende por todo? En cualquier caso, gracias por leer. O por
            scrollear hasta el final. Es casi lo mismo.
          </p>
          <p className="mt-2">
            En serio, estos términos son más de broma que otra cosa. No los
            necesitamos para un proyecto personal. Pero si algún día esto se
            vuelve grande (hola, futuro), al menos tenemos algo baseline.
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            Última actualización: Esta versión no está activa todavía, así que
            fecha indefinida.
          </p>
        </section>
      </div>

      {/* Back button */}
      <div className="mt-12 pt-6 border-t border-border/50">
        <Button
          variant="outline"
          nativeButton={false}
          render={(props) => <Link to="/" {...props} />}
        >
          <LinkIcon data-icon="inline-start" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
