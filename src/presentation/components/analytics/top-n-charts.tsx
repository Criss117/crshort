import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';

export interface RankingPoint {
  label: string;
  clicks: number;
}

interface Props {
  countries: RankingPoint[];
  referrers: RankingPoint[];
  devices: RankingPoint[];
}

function RankingChart({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: RankingPoint[];
}) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} className="stroke-border/60" />
              <XAxis type="number" allowDecimals={false} hide />
              <YAxis
                type="category"
                dataKey="label"
                width={82}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'var(--muted)' }}
                formatter={(value) => [value, 'Clics']}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                }}
              />
              <Bar
                dataKey="clicks"
                fill="var(--primary)"
                radius={[0, 4, 4, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function TopNCharts({ countries, referrers, devices }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <RankingChart
        title="Países principales"
        description="De dónde vienen los clics"
        data={countries}
      />
      <RankingChart
        title="Referentes principales"
        description="Sitios que envían visitantes"
        data={referrers}
      />
      <RankingChart
        title="Dispositivos"
        description="Categorías de dispositivos"
        data={devices}
      />
    </div>
  );
}
