import { createColumnHelper } from '@tanstack/react-table';
import { ChartSpline } from 'lucide-react';
import { Button } from '@heroui/react/button';

import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

import { CopyButton } from '@/presentation/components/copy-button';
import { LinkTableActions } from './actions';
import { shortUrl } from '@/lib/utils';

export const columnHelper = createColumnHelper<LinkSelect>();

export const columns = [
  columnHelper.accessor((t) => t.slug, {
    id: 'slug',
    header: 'Slug',
    cell: (info) => {
      const slug = info.getValue();
      const isActive = info.row.original.isActive;

      return (
        <div className="flex items-center gap-2">
          {isActive ? (
            <a
              href={`/r/${slug}`}
              target="_blank"
              className="font-mono text-sm hover:underline font-medium"
            >
              {slug}
            </a>
          ) : (
            <span className="font-mono text-sm text-muted font-medium">
              {slug}
            </span>
          )}
          <CopyButton text={shortUrl(slug)} isDisabled={!isActive} />
        </div>
      );
    },
  }),
  columnHelper.accessor((t) => t.url, {
    id: 'url',
    header: 'Url destino',
    cell: (info) => {
      const url = info.getValue();

      return (
        <a
          href={url}
          target="_blank"
          className="text-sm text-muted-foreground hover:text-foreground truncate block max-w-75"
          title={url}
        >
          {url}
        </a>
      );
    },
  }),
  columnHelper.accessor((t) => t.clicks, {
    id: 'clicks',
    header: 'Clics',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((t) => t.isActive, {
    id: 'isActive',
    header: 'Estado',
    cell: (info) => {
      const isActive = info.getValue();

      return (
        <>
          {isActive ? (
            <span className="inline-flex items-center justify-around gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 w-20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Activo
            </span>
          ) : (
            <span className="inline-flex items-center justify-around gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-accent-foreground text-white w-20">
              <span className="w-1.5 h-1.5 bg-danger rounded-full" />
              Inactivo
            </span>
          )}
        </>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => (
      <div className="w-full flex justify-end">
        <span>Acciones</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          variant="ghost"
          size="sm"
          isIconOnly
        >
          <ChartSpline />
        </Button>
        <LinkTableActions link={row.original} />
      </div>
    ),
  }),
];
