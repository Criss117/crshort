import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { findLinkAnalyticsAction } from '@/server/functions/analytics.functions';
import type { LinkSelect } from '@/integrations/db/schemas/links.schema';
import { Card, CardContent } from '@/presentation/components/ui/card';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { DateRangePicker, getLastThirtyDays } from './date-range-picker';
import type { DateRange } from './date-range-picker';
import { TimeSeriesChart } from './time-series-chart';
import type { TimeSeriesPoint } from './time-series-chart';
import { TopNCharts } from './top-n-charts';
import type { RankingPoint } from './top-n-charts';

interface AnalyticsResponse {
  timeSeries: Array<{ date: string; clicks: number }>;
  countries: Array<{ country: string; clicks: number }>;
  referrers: Array<{ referrer: string; clicks: number }>;
  devices: Array<{ device: string; clicks: number }>;
}

interface Props {
  links: LinkSelect[];
}

export function AnalyticsDashboard({ links }: Props) {
  const [selectedLinkId, setSelectedLinkId] = useState(links.at(0)?.id ?? '');
  const [range, setRange] = useState<DateRange>(getLastThirtyDays);
  const selectedLink =
    links.find((link) => link.id === selectedLinkId) ?? links.at(0);

  const query = useQuery({
    queryKey: ['link-analytics', selectedLink?.id, range.from, range.to],
    queryFn: () =>
      findLinkAnalyticsAction({
        data: {
          linkId: selectedLink?.id ?? '',
          from: range.from,
          to: range.to,
        },
      }) as Promise<AnalyticsResponse>,
    enabled: Boolean(selectedLink),
    staleTime: 60_000,
  });

  if (!selectedLink) return null;

  const data = query.data;
  const totalClicks =
    data?.timeSeries.reduce((sum, point) => sum + point.clicks, 0) ?? 0;

  return (
    <section className="space-y-4" aria-labelledby="analytics-heading">
      <div className="flex flex-col justify-between gap-4 border-t pt-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Analíticas de enlaces
          </p>
          <h2
            id="analytics-heading"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            Conoce a tu audiencia
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Actividad de tus enlaces acortados.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-xs text-muted-foreground">
            Enlace
            <select
              value={selectedLink.id}
              onChange={(event) => setSelectedLinkId(event.target.value)}
              className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {links.map((link) => (
                <option key={link.id} value={link.id}>
                  {link.customSlug ?? link.slug}
                </option>
              ))}
            </select>
          </label>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
      </div>

      {query.isLoading ? <AnalyticsSkeleton /> : null}
      {query.isError ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-destructive">
            No se pudieron cargar las analíticas. Intenta nuevamente.
          </CardContent>
        </Card>
      ) : null}
      {query.isSuccess && totalClicks === 0 ? (
        <Card>
          <CardContent className="py-14 text-center">
            <p className="font-medium">Sin clics todavía</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prueba con un rango más amplio o comparte tu enlace para ver
              actividad.
            </p>
          </CardContent>
        </Card>
      ) : null}
      {query.isSuccess && totalClicks > 0 ? (
        <>
          <TimeSeriesChart data={zeroFill(data.timeSeries, range)} />
          <TopNCharts
            countries={toRanking(data.countries, 'country')}
            referrers={toRanking(data.referrers, 'referrer')}
            devices={toRanking(data.devices, 'device')}
          />
        </>
      ) : null}
    </section>
  );
}

function zeroFill(
  data: TimeSeriesPoint[],
  range: DateRange,
): TimeSeriesPoint[] {
  const result: TimeSeriesPoint[] = [];
  const counts = new Map(data.map((point) => [point.date, point.clicks]));
  const cursor = new Date(`${range.from}T00:00:00.000Z`);
  const end = new Date(`${range.to}T00:00:00.000Z`);

  while (cursor <= end) {
    const date = cursor.toISOString().slice(0, 10);
    result.push({ date, clicks: counts.get(date) ?? 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return result;
}

function toRanking<T extends Record<string, string | number>>(
  data: T[],
  key: keyof T,
): RankingPoint[] {
  return data.map((point) => ({
    label: String(point[key]),
    clicks: Number(point.clicks),
  }));
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-80 w-full" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}
