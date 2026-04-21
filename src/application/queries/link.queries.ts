import { queryOptions } from '@tanstack/react-query';

import { findAllLinksAction } from '@/application/actions/link.actions';

export const findAllLinksQueryOptions = queryOptions({
  queryKey: ['links'],
  queryFn: () => findAllLinksAction(),
});
