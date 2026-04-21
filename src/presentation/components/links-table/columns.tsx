import type { LinkSelect } from '@/integrations/db/schemas/links.schema';
import { createColumnHelper } from '@tanstack/react-table';

export const columnHelper = createColumnHelper<LinkSelect>();

export const columns = [
  columnHelper.accessor((t) => t.slug, {
    header: 'Title',
    cell: (info) => info.getValue(),
  }),
];
