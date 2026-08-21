import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { findAllLinksQueryOptions } from '@/application/queries/link.queries';
import type { GroupByType } from '@/application/store/filters.store';
import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';

interface Props {
  filters?: {
    query?: string;
    group?: GroupByType;
    tag?: string;
  };
}

export interface FilterOptions {
  query?: string;
  group?: GroupByType;
  tag?: string;
}

export function filterLinks(
  data: LinkWithTags[],
  filters?: FilterOptions,
): LinkWithTags[] {
  if (!data.length) return [];

  const query = filters?.query;
  const group = filters?.group;
  const tag = filters?.tag;

  if (!query && !group && !tag) return data;

  const filteredByQuery =
    query && query.length > 0
      ? data.filter(
          (link) =>
            link.slug.toLowerCase().includes(query.toLowerCase()) ||
            link.url.toLowerCase().includes(query.toLowerCase()) ||
            link.customSlug?.toLowerCase().includes(query.toLowerCase()) ||
            link.linkTags.some(({ tag }) =>
              tag.slug.toLowerCase().includes(query.toLowerCase()),
            ),
        )
      : data;

  const filteredByGroup = group
    ? filteredByQuery.filter((link) => {
        if (group === 'all') return true;
        return link.isActive === (group === 'active');
      })
    : filteredByQuery;

  const filteredByTag =
    tag && tag.length > 0
      ? filteredByGroup.filter((link) =>
          link.linkTags.some(
            (lt) => lt.tag.slug.toLowerCase() === tag.toLowerCase(),
          ),
        )
      : filteredByGroup;

  return filteredByTag;
}

export function useFindLinks(options?: Props) {
  const { data, ...rest } = useSuspenseQuery(findAllLinksQueryOptions);

  const links = useMemo(
    () => filterLinks(data, options?.filters),
    [data, options?.filters],
  );

  return {
    links,
    ...rest,
  };
}
