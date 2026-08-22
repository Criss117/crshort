import { CalendarDays } from 'lucide-react';

import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';

export interface DateRange {
  from: string;
  to: string;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <CalendarDays className="size-4 text-muted-foreground" />
        <span className="sr-only">Rango de fechas</span>
      </div>
      <label className="grid gap-1 text-xs text-muted-foreground">
        Desde
        <Input
          type="date"
          value={value.from}
          max={value.to}
          onChange={(event) => onChange({ ...value, from: event.target.value })}
          className="w-36"
        />
      </label>
      <label className="grid gap-1 text-xs text-muted-foreground">
        Hasta
        <Input
          type="date"
          value={value.to}
          min={value.from}
          onChange={(event) => onChange({ ...value, to: event.target.value })}
          className="w-36"
        />
      </label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange(getLastThirtyDays())}
      >
        Últimos 30 días
      </Button>
    </div>
  );
}

export function getLastThirtyDays(): DateRange {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 29);

  return { from: toDateInput(from), to: toDateInput(to) };
}

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}
