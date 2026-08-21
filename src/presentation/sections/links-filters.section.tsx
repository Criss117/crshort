import { useMemo } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { useFilters } from '@/application/store/filters.store';
import { useFindLinks } from '@/application/hooks/use-find-links';

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
  const { links } = useFindLinks();

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const link of links) {
      for (const lt of link.linkTags) {
        tagSet.add(lt.tag.slug);
      }
    }
    return Array.from(tagSet).sort();
  }, [links]);

  const hasTags = availableTags.length > 0;

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
        <Select
          value={filters.tag}
          onValueChange={(v) => {
            dispatch({
              type: 'set:tag',
              payload: v ?? '',
            });
          }}
          disabled={!hasTags}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Tags">
              {hasTags
                ? filters.tag
                  ? availableTags.find((t) => t === filters.tag) ?? 'Todos'
                  : 'Todos'
                : 'Sin tags'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">Todos</SelectItem>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
