import { ArrowLeft, SettingsIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';
import { shortUrl } from '@/lib/utils';
import { AnalyticsDashboard } from '@/presentation/components/analytics/analytics-dashboard';
import { EditCustomSlugDialog } from '@/presentation/components/edit-custom-slug-dialog';
import { QrCodeButton } from '@/presentation/components/qr-code-button';
import { Button } from '@/presentation/components/ui/button';
import {
  EditCustomSlugDialogProvider,
  useEditCustomSlugDialog,
} from '@/presentation/contexts/edit-custom-slug-dialog';

interface Props {
  link: LinkWithTags;
}

function LinkAnalyticsContent({ link }: Props) {
  const { open } = useEditCustomSlugDialog();
  const shortUrlValue = shortUrl(link.customSlug ?? link.slug);

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
          <div className="mt-1 flex items-center gap-3">
            <a
              className="text-3xl font-semibold tracking-tight underline"
              href={shortUrlValue}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.customSlug ?? link.slug}
            </a>
            <QrCodeButton value={shortUrlValue} isDisabled={!link.isActive} />
            <Button
              variant="outline"
              size="icon"
              onClick={() => open(link.id)}
              aria-label="Editar slug"
            >
              <SettingsIcon />
            </Button>
          </div>
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
        </div>
      </div>
      <AnalyticsDashboard linkId={link.id} />
      <EditCustomSlugDialog
        links={[
          {
            id: link.id,
            url: link.url,
            customSlug: link.customSlug,
            slug: link.slug,
          },
        ]}
      />
    </main>
  );
}

export function LinkAnalyticsScreen({ link }: Props) {
  return (
    <EditCustomSlugDialogProvider>
      <LinkAnalyticsContent link={link} />
    </EditCustomSlugDialogProvider>
  );
}
