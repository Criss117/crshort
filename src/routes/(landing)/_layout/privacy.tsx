import { createFileRoute, Link } from '@tanstack/react-router';
import { FileText, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/(landing)/_layout/privacy')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Política de Privacidad | crshort' }],
  }),
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
            Esta es la política de un proyecto personal. Intentamos explicar de
            forma clara qué datos necesitamos para que el servicio funcione y
            cómo protegemos tu privacidad.
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
              <strong>Datos de analytics de enlaces:</strong> Cuando alguien
              visita un enlace corto, registramos la fecha y hora, el tipo de
              dispositivo, el sitio de procedencia (referrer) y la ubicación
              aproximada (país y ciudad, cuando está disponible). También
              generamos un hash SHA-256 de la IP usando un salt. No almacenamos
              la dirección IP original.
            </li>
            <li>
              <strong>Cookies:</strong> Usamos cookies esenciales para mantener
              tu sesión activa. No usamos cookies de analytics ni tecnologías
              de tracking del lado del cliente.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>2. ¿Cómo usamos tu información?</h2>
          <p>Para cosas útiles, principalmente:</p>
          <ul>
            <li>Mantener el servicio funcionando (gratis, ¿recuerdas?)</li>
            <li>Mostrarte tus estadísticas de clics</li>
            <li>Enviarte emails si olvidas tu contraseña</li>
            <li>
              Generar estadísticas agregadas de tus enlaces, como clics por
              día, país, ciudad, dispositivo y sitio de procedencia
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
            <li>Hacemos perfiles psicológicos para predecir tu futuro (aún)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. Cookies</h2>
          <p>
            Solo usamos cookies esenciales, necesarias para mantener tu sesión
            activa y permitirte iniciar sesión:
          </p>
          <ul>
            <li>
              <strong>Cookies esenciales:</strong> Sin estas, el login no
              funciona. Son como el WiFi en un café: el servicio completo
              depende de ellas.
            </li>
            <li>
              <strong>Sin cookies de analytics:</strong> Las estadísticas de
              enlaces se recopilan en el servidor cuando se visita un enlace
              corto. No usamos cookies ni identificadores de analytics en tu
              navegador.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>4. Retención de analytics</h2>
          <p>
            Conservamos los registros de clics durante un máximo de{' '}
            <strong>365 días</strong>. Después de ese plazo, se eliminan
            automáticamente. Esta retención nos permite mostrar tendencias
            útiles sin conservar indefinidamente datos técnicos de las visitas.
          </p>
          <p className="mt-2">
            La recopilación y el procesamiento de estos datos ocurren
            exclusivamente en el servidor. El hash de IP se usa para ayudar a
            distinguir visitas sin guardar la IP original, y no puede
            revertirse para obtenerla.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Tus derechos</h2>
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
              No hay rencor ni drama. Los portes están abiertos.
            </li>
            <li>
              <strong>Exportar tus datos:</strong> Si quieres tus enlaces en
              otro lugar, te los damos. Son tuyos, después de todo.
            </li>
            <li>
              <strong>Información sobre analytics:</strong> Preguntarnos qué
              datos de analytics están asociados a tus enlaces y solicitar su
              eliminación cuando corresponda.
            </li>
          </ul>
          <p className="mt-2">
            Para ejercer cualquiera de estos derechos, escríbenos. Probablemente
            te contestemos en menos de una semana. Probablemente.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Almacenamiento y seguridad</h2>
          <p>
            Tus datos están en la nube, como todos. Específicamente en{' '}
            <strong>especificar proveedor</strong>. Hacemos lo posible por
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
          <h2>7. Links a terceros</h2>
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
          <h2>8. Cambios a esta política</h2>
          <p>
            Si cambiamos cosas (porque podemos), te lo avisaremos.
            Probablemente. Actualizaremos la fecha de "última actualización"
            para que sepas que algo cambió.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Contacto</h2>
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
          <h2>10. El disclaimer final</h2>
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
    </div>
  );
}
