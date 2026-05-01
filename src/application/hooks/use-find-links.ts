import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { findAllLinksQueryOptions } from '@/application/queries/link.queries';
import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';
import type { GroupByType } from '@/application/store/filters.store';

interface Props {
  filters?: {
    query?: string;
    group?: GroupByType;
  };
}

export function useFindLinks(options?: Props) {
  const { data, ...rest } = useSuspenseQuery(findAllLinksQueryOptions);

  const links = useMemo(() => {
    if (!data.length) return [];

    const query = options?.filters?.query;
    const group = options?.filters?.group;

    if (!query && !group) return data;

    const filteredByQuery =
      query && query.length > 0
        ? data.filter(
            (link) =>
              link.slug.toLowerCase().includes(query.toLowerCase()) ||
              link.url.toLowerCase().includes(query.toLowerCase()) ||
              link.customSlug?.toLowerCase().includes(query.toLowerCase()),
          )
        : data;

    const filteredByGroup = group
      ? filteredByQuery.filter((link) => {
          if (group === 'all') return true;
          return link.isActive === (group === 'active');
        })
      : filteredByQuery;

    return filteredByGroup;
  }, [data, options?.filters]);

  return {
    links,
    ...rest,
  };
}
