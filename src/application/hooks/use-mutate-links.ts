import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateLink,
  DeleteLinks,
} from '@/application/validators/link.validators';
import {
  createLinkAction,
  deleteManyLinksAction,
  disableManyLinksAction,
  enableManyLinksAction,
} from '@/application/actions/link.actions';
import { findAllLinksQueryOptions } from '@/application/queries/link.queries';

export function useMutateLinks() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: ['create-link'],
    mutationFn: (data: CreateLink) =>
      createLinkAction({
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(findAllLinksQueryOptions);
    },
  });

  const remove = useMutation({
    mutationKey: ['remove-link'],
    mutationFn: (data: DeleteLinks) => deleteManyLinksAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries(findAllLinksQueryOptions);
    },
  });

  const disable = useMutation({
    mutationKey: ['remove-link'],
    mutationFn: (data: DeleteLinks) => disableManyLinksAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries(findAllLinksQueryOptions);
    },
  });

  const enable = useMutation({
    mutationKey: ['enable-link'],
    mutationFn: (data: DeleteLinks) => enableManyLinksAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries(findAllLinksQueryOptions);
    },
  });

  return {
    create,
    remove,
    disable,
    enable,
  };
}
