# ══════════════════════════════════════════════════════════════

# CASE STUDY — Plantilla MDX para agentes

#

# Ubicación: portfolio/case-study.mdx

# Formato: MDX (Markdown + JSX). Se renderiza en Astro con

# @astrojs/mdx y estilos via Tailwind CSS v4.

#

# REGLAS PARA EL AGENTE:

# - No inventar datos: si no hay info suficiente, dejar vacío ("")

# o el placeholder "TODO: ...".

# - Mantener el orden y los nombres de las claves del frontmatter.

# - Fechas siempre en formato ISO "YYYY-MM-DD".

# - "slug" debe ser kebab-case y coincidir con la URL.

# - El body es MDX: usa <div>, <section>, <article>, etc. con

# clases de Tailwind. NO uses estilos inline.

# - Las imágenes del hero y galería se definen en frontmatter;

# el layout las lee desde `data.images`. En el body solo se

# escribe contenido estructural.

# - DENTRO de elementos JSX (span, h2, h3, p), envuelve todo

# el texto en {"..."} para evitar que MDX lo envuelva en

# párrafos adicionales.

# - Las tres secciones de BODY son OBLIGATORIAS. El usuario

# puede solicitar secciones adicionales; siempre respetar

# la paleta, el espaciado y las clases del sistema.

# ══════════════════════════════════════════════════════════════

---

# ── Identidad básica ─────────────────────────────────────────

title: "Nombre del proyecto"
slug: "nombre-del-proyecto"
summary: "Resumen de 1-2 frases: qué es, qué problema resuelve y con qué tecnología clave."
category: "web" # web | mobile | fullstack | library | cli | api | desktop | otro
date: "YYYY-MM-DD"
lastUpdate: "YYYY-MM-DD"
status: "in-progress" # idea | in-progress | completed | archived | maintained
featured: false
priority: 0

# ── Contexto del proyecto ────────────────────────────────────

type: "personal" # personal | freelance | client | opensource | academic | work
role: "TODO: tu rol"
team:
size: 1
solo: true

# ── Links y stack ────────────────────────────────────────────

links:
repo: "https://github.com/usuario/repo"
demo: ""
docs: ""
npm: ""

stack:

- "TODO: tecnología 1"
- "TODO: tecnología 2"

# ── Highlights ───────────────────────────────────────────────

# Logros/decisiones técnicas relevantes (no descripción genérica).

highlights:

- "TODO: highlight 1"
- "TODO: highlight 2"

# ── Imágenes ─────────────────────────────────────────────────

# Referencias al repo remoto; el layout arma las URLs.

images:
hero:
ext: "png"
alt: "TODO: descripción accesible"
cover:
ext: "png"
alt: "TODO: descripción"
gallery: - name: "1"
ext: "png"
alt: "TODO: screenshot 1"
caption: "" - name: "2"
ext: "png"
alt: "TODO: screenshot 2"
caption: ""

# ── SEO ──────────────────────────────────────────────────────

seo:
metaTitle: ""
metaDescription: ""

# ── Metadatos internos del agente ────────────────────────────

generatedBy: "agent"
generatedAt: "YYYY-MM-DDTHH:MM:SSZ"
schemaVersion: 1
---

{/* ═══════════════════════════════════════════════════════════ _/}
{/_ PALETA DE COLORES — No usar valores raw. Solo estas _/}
{/_ clases Tailwind v4, que responden al tema light/dark. _/}
{/_ _/}
{/_ text-accent → azul (semántico: acción/label) _/}
{/_ text-primary → oscuro en light / claro en dark _/}
{/_ text-secondary → claro en light / oscuro en dark _/}
{/_ text-tertiary → gris intermedio (body, captions) _/}
{/_ _/}
{/_ bg-primary → fondo oscuro (secciones invertidas) _/}
{/_ bg-secondary → fondo claro en light / oscuro en dark _/}
{/_ bg-accent → azul (solo para botones) _/}
{/_ bg-neutral → gris muy sutil _/}
{/_ _/}
{/_ border-primary/20 → bordes sutiles (cards, líneas) _/}
{/_ border-secondary/20 → bordes sobre fondos invertidos _/}
{/_ _/}
{/_ Espaciado vertical estándar: py-20 _/}
{/_ Ancho contenido: max-w-full xl:max-w-3/4 mx-auto _/}
{/_ Full-bleed: -mx-4 md:-mx-6 lg:-mx-8 + padding restaurado _/}
{/_ ═══════════════════════════════════════════════════════════ */}

{/* ═══════════════════════════════════════════════════════════ _/}
{/_ 01 / EL DESAFÍO — OBLIGATORIO _/}
{/_ Label arriba (full width). Grid de 2 cols debajo: _/}
{/_ izquierda = título + resumen; derecha = descripción larga _/}
{/_ + cards de 4 puntos clave (2×2 grid). _/}
{/_ ═══════════════════════════════════════════════════════════ */}

<section class="max-w-full xl:max-w-3/4 mx-auto py-20">

  <span class="text-xs uppercase tracking-widest text-accent font-semibold block">
    {"01 / El desafío"}
  </span>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-6">
    <div class="space-y-6">
      <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-tight">
        {"Definiendo el problema"}
      </h2>
      <p class="text-tertiary text-base md:text-lg leading-relaxed">
        {"Resumen corto del contexto y la motivación del proyecto. 2–4 frases que expliquen por qué existía la necesidad."}
      </p>
    </div>

    <div class="space-y-8">
      <p class="text-primary text-base md:text-lg leading-relaxed">
        {"Descripción más extensa del problema, los usuarios afectados, las limitaciones del estado previo y cualquier restricción de negocio o técnica relevante."}
      </p>

      {/* Cards de puntos clave — 2×2 grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Punto clave 1"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Breve explicación de este punto específico."}
          </p>
        </article>

        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Punto clave 2"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Breve explicación de este punto específico."}
          </p>
        </article>

        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Punto clave 3"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Breve explicación de este punto específico."}
          </p>
        </article>

        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Punto clave 4"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Breve explicación de este punto específico."}
          </p>
        </article>
      </div>
    </div>

  </div>

</section>

{/* ═══════════════════════════════════════════════════════════ _/}
{/_ 02 / INGENIERÍA & ARQUITECTURA — OBLIGATORIO _/}
{/_ Fondo invertido (bg-secondary). Label arriba full-width. _/}
{/_ Grid 2 cols: título | descripción. _/}
{/_ Pipeline: 4 cards horizontales con flechas (flex). _/}
{/_ 3 Decision cards debajo (grid 3 cols). _/}
{/_ TODOS los textos y bordes usan text-primary / border-primary _/}
{/_ porque bg-secondary ya invierte la paleta. _/}
{/_ ═══════════════════════════════════════════════════════════ */}

<section class="-mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-20 space-y-16 bg-secondary">

{/* Header */}
<span class="text-xs uppercase tracking-widest text-accent font-semibold block max-w-full xl:max-w-3/4 mx-auto">
{"02 / Ingeniería & Arquitectura"}
</span>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-6 max-w-full xl:max-w-3/4 mx-auto">
    <div>
      <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-tight text-primary">
        {"Arquitectura y decisiones técnicas"}
      </h2>
    </div>
    <div class="flex items-start">
      <p class="text-tertiary text-base md:text-lg leading-relaxed">
        {"Resumen del principio arquitectónico que guió el proyecto. 1–2 frases que conecten el desafío con la solución."}
      </p>
    </div>
  </div>

{/* Pipeline diagram — 4 cards con flechas */}
  <div class="space-y-4 max-w-full xl:max-w-3/4 mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <span class="text-[10px] uppercase tracking-widest text-tertiary font-medium">
        {"Diagrama esquemático de flujo de datos"}
      </span>
      <span class="text-[10px] uppercase tracking-widest text-accent font-semibold">
        {"Sincronización event-driven"}
      </span>
    </div>

    <div class="flex flex-col md:flex-row md:items-stretch gap-0">
      {/* Card 1 */}
      <article class="border border-primary/20 p-5 space-y-3 flex-1">
        <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
          {"Capa 1"}
        </span>
        <h3 class="text-sm uppercase font-semibold tracking-wider text-primary">
          {"Tecnología A"}
        </h3>
        <p class="text-tertiary text-sm leading-relaxed">
          {"Descripción de esta capa: qué hace, por qué se eligió, métrica clave."}
        </p>
        <p class="text-[10px] uppercase tracking-wider text-tertiary font-medium pt-2">
          {"Métrica: <Xms"}
        </p>
      </article>

      {/* Flecha desktop */}
      <div class="hidden md:flex items-center justify-center border-y border-primary/20 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
      {/* Flecha mobile */}
      <div class="flex md:hidden items-center justify-center border-x border-primary/20 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>

      {/* Card 2 */}
      <article class="border border-primary/20 p-5 space-y-3 flex-1">
        <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
          {"Capa 2"}
        </span>
        <h3 class="text-sm uppercase font-semibold tracking-wider text-primary">
          {"Tecnología B"}
        </h3>
        <p class="text-tertiary text-sm leading-relaxed">
          {"Descripción de esta capa: qué hace, por qué se eligió, métrica clave."}
        </p>
        <p class="text-[10px] uppercase tracking-wider text-tertiary font-medium pt-2">
          {"Throughput: XK/s"}
        </p>
      </article>

      {/* Flecha desktop */}
      <div class="hidden md:flex items-center justify-center border-y border-primary/20 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
      {/* Flecha mobile */}
      <div class="flex md:hidden items-center justify-center border-x border-primary/20 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>

      {/* Card 3 */}
      <article class="border border-primary/20 p-5 space-y-3 flex-1">
        <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
          {"Capa 3"}
        </span>
        <h3 class="text-sm uppercase font-semibold tracking-wider text-primary">
          {"Tecnología C"}
        </h3>
        <p class="text-tertiary text-sm leading-relaxed">
          {"Descripción de esta capa: qué hace, por qué se eligió, métrica clave."}
        </p>
        <p class="text-[10px] uppercase tracking-wider text-tertiary font-medium pt-2">
          {"Eval: <Xms"}
        </p>
      </article>

      {/* Flecha desktop */}
      <div class="hidden md:flex items-center justify-center border-y border-primary/20 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
      {/* Flecha mobile */}
      <div class="flex md:hidden items-center justify-center border-x border-primary/20 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>

      {/* Card 4 */}
      <article class="border border-primary/20 p-5 space-y-3 flex-1">
        <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
          {"Capa 4"}
        </span>
        <h3 class="text-sm uppercase font-semibold tracking-wider text-primary">
          {"Tecnología D"}
        </h3>
        <p class="text-tertiary text-sm leading-relaxed">
          {"Descripción de esta capa: qué hace, por qué se eligió, métrica clave."}
        </p>
        <p class="text-[10px] uppercase tracking-wider text-tertiary font-medium pt-2">
          {"Storage: X"}
        </p>
      </article>
    </div>

  </div>

{/* Decision cards — 3 columnas */}
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full xl:max-w-3/4 mx-auto">
    <article class="border border-primary/20 p-6 space-y-4">
      <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
        {"Decisión 01 · Categoría"}
      </span>
      <h3 class="text-lg font-semibold uppercase tracking-tight text-primary">
        {"Título de la decisión"}
      </h3>
      <p class="text-tertiary text-sm leading-relaxed">
        {"Explicación del problema, las alternativas evaluadas y por qué se eligió esta opción. Contexto técnico suficiente para que un lector entienda el trade-off."}
      </p>
      <div class="border-t border-primary/10 pt-4 mt-4">
        <p class="text-xs text-tertiary leading-relaxed">
          <span class="text-accent font-semibold">{"Impacto: "}</span>
          {"Resultado concreto de esta decisión: métrica, riesgo mitigado o capacidad ganada."}
        </p>
      </div>
    </article>

    <article class="border border-primary/20 p-6 space-y-4">
      <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
        {"Decisión 02 · Categoría"}
      </span>
      <h3 class="text-lg font-semibold uppercase tracking-tight text-primary">
        {"Título de la decisión"}
      </h3>
      <p class="text-tertiary text-sm leading-relaxed">
        {"Explicación del problema, las alternativas evaluadas y por qué se eligió esta opción. Contexto técnico suficiente para que un lector entienda el trade-off."}
      </p>
      <div class="border-t border-primary/10 pt-4 mt-4">
        <p class="text-xs text-tertiary leading-relaxed">
          <span class="text-accent font-semibold">{"Garantía: "}</span>
          {"Resultado concreto: propiedad del sistema que esta decisión asegura."}
        </p>
      </div>
    </article>

    <article class="border border-primary/20 p-6 space-y-4">
      <span class="text-[10px] uppercase tracking-widest text-accent font-semibold block">
        {"Decisión 03 · Categoría"}
      </span>
      <h3 class="text-lg font-semibold uppercase tracking-tight text-primary">
        {"Título de la decisión"}
      </h3>
      <p class="text-tertiary text-sm leading-relaxed">
        {"Explicación del problema, las alternativas evaluadas y por qué se eligió esta opción. Contexto técnico suficiente para que un lector entienda el trade-off."}
      </p>
      <div class="border-t border-primary/10 pt-4 mt-4">
        <p class="text-xs text-tertiary leading-relaxed">
          <span class="text-accent font-semibold">{"Resultado: "}</span>
          {"Resultado concreto: beneficio medible o capacidad futura habilitada."}
        </p>
      </div>
    </article>

  </div>

</section>

{/* ═══════════════════════════════════════════════════════════ _/}
{/_ 03 / RESULTADOS — OBLIGATORIO _/}
{/_ Misma estructura que 01: label arriba, grid 2 cols. _/}
{/_ Izquierda: título + resumen. Derecha: métricas, estado, _/}
{/_ aprendizajes y próximos pasos. _/}
{/_ ═══════════════════════════════════════════════════════════ */}

<section class="max-w-full xl:max-w-3/4 mx-auto py-20">

  <span class="text-xs uppercase tracking-widest text-accent font-semibold block">
    {"03 / Resultados"}
  </span>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-6">
    <div class="space-y-6">
      <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-tight">
        {"Impacto y estado"}
      </h2>
      <p class="text-tertiary text-base md:text-lg leading-relaxed">
        {"Resumen de métricas o logros alcanzados. 2–4 frases que cierren el caso con datos concretos."}
      </p>
    </div>

    <div class="space-y-8">
      <p class="text-primary text-base md:text-lg leading-relaxed">
        {"Detalle de resultados medibles, aprendizajes clave y próximos pasos del proyecto. Si está en progreso, indicar qué falta y cuál es el roadmap."}
      </p>

      {/* Métricas o estado — cards opcionales */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Métrica 1"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Valor o logro cuantificable."}
          </p>
        </article>

        <article class="border border-primary/20 p-5 space-y-2">
          <h3 class="text-sm uppercase font-semibold tracking-wider text-accent">
            {"Métrica 2"}
          </h3>
          <p class="text-tertiary text-sm leading-relaxed">
            {"Valor o logro cuantificable."}
          </p>
        </article>
      </div>
    </div>

  </div>

</section>

{/* ═══════════════════════════════════════════════════════════ _/}
{/_ SECCIONES ADICIONALES (opcional, solo si el usuario _/}
{/_ las solicita expresamente). Reglas para agregar: _/}
{/_ - Usar el mismo patrón: label arriba, grid 2 cols. _/}
{/_ - Respetar siempre la paleta y los espaciados. _/}
{/_ - Para fondos invertidos (como la 02), usar bg-secondary _/}
{/_ y text-primary / border-primary en todo el contenido. _/}
{/_ - Nunca usar dark: overrides dentro del MDX; la paleta _/}
{/_ ya se invierte automáticamente con el tema. _/}
{/_ ═══════════════════════════════════════════════════════════ */}
