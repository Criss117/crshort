import { queryOptions } from '@tanstack/react-query';

import { findAllLinksAction } from '@/application/actions/link.actions';
import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';

export const findAllLinksQueryOptions = queryOptions({
  queryKey: ['links'],
  queryFn: () => findAllLinksAction() as Promise<LinkWithTags[]>,
});
