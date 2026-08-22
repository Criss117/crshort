import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';
import { AnalyticsDashboard } from '@/presentation/components/analytics/analytics-dashboard';
import { Button } from '@/presentation/components/ui/button';

interface Props {
  link: LinkWithTags;
}

export function LinkAnalyticsScreen({ link }: Props) {
  const shortUrl = `${window.location.origin}/${link.customSlug ?? link.slug}`;

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-5">
        <Button variant="ghost" render={<Link to="/dashboard" />}>
          <ArrowLeft />
          Volver al dashboard
        </Button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Analíticas del enlace
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {link.customSlug ?? link.slug}
          </h1>
          {link.customSlug ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Slug: <span className="font-mono">{link.slug}</span>
            </p>
          ) : null}
          <p className="mt-1 truncate text-sm text-muted-foreground">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {link.url}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity font-mono"
            >
              {shortUrl}
            </a>
          </p>
        </div>
      </div>
      <AnalyticsDashboard linkId={link.id} />
    </main>
  );
}
