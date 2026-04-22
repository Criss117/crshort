import { FunnelIcon, SearchIcon, XIcon } from 'lucide-react';

import { useFilters } from '@/application/store/filters.store';

import { Input } from '@/presentation/components/ui/input';
import { Button } from '@/presentation/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';

const Filters = {
  all: {
    label: 'Todos',
    value: 'all',
  },
  active: {
    label: 'Activos',
    value: 'active',
  },
  inactive: {
    label: 'Inactivos',
    value: 'inactive',
  },
} as const;

export function LinksFiltersSection() {
  const { filters, dispatch } = useFilters();

  return (
    <section className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="w-3/4">
        <div className="relative">
          <Button
            className="absolute left-0"
            size="icon"
            disabled
            variant="ghost"
          >
            <SearchIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0"
            onClick={() =>
              dispatch({
                type: 'reset:query',
              })
            }
          >
            <XIcon />
          </Button>
          <Input
            value={filters.query}
            className="w-full pl-8"
            placeholder="Buscar en los enlaces"
            onChange={(v) =>
              dispatch({
                type: 'set:query',
                payload: v.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex gap-2 w-1/4 items-center">
        <Select
          value={filters.group}
          defaultValue="all"
          onValueChange={(v) => {
            if (!v) return;
            dispatch({
              type: 'set:group',
              payload: v,
            });
          }}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Group">
              {Filters[filters.group].label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(Filters).map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <FunnelIcon />
        </Button>
      </div>
    </section>
  );
}
