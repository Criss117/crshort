import {
  CartesianGrid,
  Line,
  LineChart,
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

export interface TimeSeriesPoint {
  date: string;
  clicks: number;
}

interface Props {
  data: TimeSeriesPoint[];
}

export function TimeSeriesChart({ data }: Props) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Clics a lo largo del tiempo</CardTitle>
        <CardDescription>
          Actividad diaria del período seleccionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border/60"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date: string) => date.slice(5)}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                minTickGap={24}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(date) => `Fecha: ${date}`}
                formatter={(value) => [value, 'Clics']}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--popover)',
                  color: 'var(--popover-foreground)',
                }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
