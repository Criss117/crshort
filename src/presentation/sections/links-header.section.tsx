import {
  Award,
  ChartLine,
  CheckCircle,
  Clock3,
  LinkIcon,
  TrendingUp,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { Card, CardContent } from '@/presentation/components/ui/card';
import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

interface Props {
  links: LinkSelect[];
}

export function LinksHeaderSection({ links }: Props) {
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const activeLinks = links.filter((link) => link.isActive).length;
  const topLink =
    links.length > 0
      ? links.reduce((max, link) => (link.clicks > max.clicks ? link : max))
      : undefined;
  const mostRecent = links.length > 0 ? links[0] : undefined;
  const averageClicks = links.length > 0 ? Math.round(totalClicks / links.length) : 0;

  return (
    <div className="mb-8 space-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
              <LinkIcon />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de links</p>
              <p className="text-2xl font-bold">{links.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
              <ChartLine />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de clics</p>
              <p className="text-2xl font-bold">{totalClicks}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Links activos</p>
              <p className="text-2xl font-bold">{activeLinks}</p>
            </div>
          </CardContent>
        </Card>

        <StatCard
          icon={<Award />}
          label="Link con más clics"
          value={topLink?.clicks ?? 0}
          subtitle={topLink ? topLink.customSlug ?? topLink.slug : undefined}
          linkId={topLink?.id}
        />

        <StatCard
          icon={<TrendingUp />}
          label="Promedio de clics"
          value={averageClicks}
          subtitle="clics por link"
        />

        <StatCard
          icon={<Clock3 />}
          label="Link más reciente"
          value={mostRecent ? mostRecent.customSlug ?? mostRecent.slug : '—'}
          linkId={mostRecent?.id}
        />
      </section>
    </div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  subtitle?: string;
  linkId?: string;
}

function StatCard({ icon, label, value, subtitle, linkId }: StatCardProps) {
  const content = (
    <CardContent className="flex items-center gap-3">
      <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-2xl font-bold">{value}</p>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </CardContent>
  );

  return linkId ? (
    <Link
      to="/dashboard/links/$linkId"
      params={{ linkId }}
      className="rounded-xl transition-opacity hover:opacity-80"
    >
      <Card className="h-full">{content}</Card>
    </Link>
  ) : (
    <Card>{content}</Card>
  );
}
