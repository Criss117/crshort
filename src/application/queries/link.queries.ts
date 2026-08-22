import { queryOptions } from '@tanstack/react-query';

import {
  findAllLinksAction,
  findLinkByIdAction,
} from '@/application/actions/link.actions';
import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';

export const findAllLinksQueryOptions = queryOptions({
  queryKey: ['links'],
  queryFn: () => findAllLinksAction() as Promise<LinkWithTags[]>,
});

export function findLinkByIdQueryOptions(linkId: string) {
  return queryOptions({
    queryKey: ['link', linkId],
    queryFn: () =>
      findLinkByIdAction({ data: { linkId } }) as Promise<LinkWithTags>,
  });
}
