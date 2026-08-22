import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';
import { AnalyticsDashboard } from '@/presentation/components/analytics/analytics-dashboard';
import { Button } from '@/presentation/components/ui/button';

interface Props {
  link: LinkWithTags;
}

export function LinkAnalyticsScreen({ link }: Props) {
  const displaySlug = link.customSlug ?? link.slug;

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
            {displaySlug}
          </h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {link.url}
          </p>
        </div>
      </div>
      <AnalyticsDashboard linkId={link.id} />
    </main>
  );
}
