import { queryOptions } from '@tanstack/react-query';
import { getSessionAction } from '@/application/actions/auth.actions';

export const getSessionQueryOptions = queryOptions({
  queryKey: ['auth', 'get-session'],
  queryFn: () => getSessionAction(),
});
