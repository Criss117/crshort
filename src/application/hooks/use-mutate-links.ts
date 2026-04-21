import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateLink } from '@/application/validators/link.validators';
import { createLinkAction } from '@/application/actions/link.actions';
import { findAllLinksQueryOptions } from '@/application/queries/link.queries';

export function useMutateLinks() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: ['create-link'],
    mutationFn: async (data: CreateLink) => {
      const res = await createLinkAction({
        data,
      });

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(findAllLinksQueryOptions);
    },
  });

  return {
    create,
  };
}
