import { createColumnHelper } from '@tanstack/react-table';

import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

export const columnHelper = createColumnHelper<LinkSelect>();

export const columns = [
  columnHelper.accessor((t) => t.slug, {
    header: 'Title',
    cell: (info) => info.getValue(),
  }),
];
