import { FunnelIcon, SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@heroui/react/button';
import { InputGroup } from '@heroui/react/input-group';
import { TextField } from '@heroui/react/textfield';
import { Select } from '@heroui/react/select';
import { ListBox } from '@heroui/react/list-box';

import { useFilters } from '@/application/store/filters.store';

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
        <TextField
          name="search"
          onChange={(v) =>
            dispatch({
              type: 'set:query',
              payload: v,
            })
          }
        >
          <InputGroup>
            <InputGroup.Prefix>
              <SearchIcon className="size-4 text-muted" />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={filters.query}
              className="w-full"
              placeholder="Buscar en los enlaces"
            />
            <InputGroup.Suffix>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                onClick={() =>
                  dispatch({
                    type: 'reset:query',
                  })
                }
              >
                <XIcon />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </div>
      <div className="flex gap-2 w-1/4 items-center">
        <Select
          placeholder="Seleccionar filtro"
          className="w-full"
          defaultValue="all"
          value={filters.group}
          onChange={(v) => {
            if (!v) return;

            dispatch({
              type: 'set:group',
              payload: v?.toString(),
            });
          }}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {Object.values(Filters).map((filter) => (
                <ListBox.Item
                  id={filter.value}
                  textValue={filter.label}
                  key={filter.value}
                >
                  {filter.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Button variant="outline" size="sm" isIconOnly>
          <FunnelIcon />
        </Button>
      </div>
    </section>
  );
}
