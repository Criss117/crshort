import { createColumnHelper } from '@tanstack/react-table';
import { ChartSpline } from 'lucide-react';

import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';
import { hashColorFromSlug } from '@/lib/tag-utils';

import { LinkTableActions } from './actions';
import { Button } from '@/presentation/components/ui/button';
import { Badge } from '@/presentation/components/ui/badge';
import { SlugCell } from '@/presentation/components/links-table/cells';

export const columnHelper = createColumnHelper<LinkWithTags>();

export const columns = [
  columnHelper.accessor((t) => t.slug, {
    id: 'slug',
    header: 'Slug',
    cell: (info) => {
      const slug = info.getValue();
      const customSlug = info.row.original.customSlug;
      const isActive = info.row.original.isActive;

      return (
        <SlugCell slug={slug} customSlug={customSlug} isActive={isActive} />
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
  columnHelper.accessor((t) => t.linkTags, {
    id: 'tags',
    header: 'Tags',
    cell: (info) => {
      const linkTags = info.getValue();
      if (!linkTags || linkTags.length === 0) return null;

      return (
        <div className="flex gap-1 flex-wrap">
          {linkTags.map((lt) => (
            <Badge
              key={lt.tag.id}
              style={{ backgroundColor: lt.tag.color }}
            >
              {lt.tag.name}
            </Badge>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor((t) => t.isActive, {
    id: 'isActive',
    header: 'Estado',
    cell: (info) => {
      const isActive = info.getValue();

      return (
        <>
          {isActive ? (
            <Badge variant="outline">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Activo
            </Badge>
          ) : (
            <Badge variant="secondary">
              <span className="w-1.5 h-1.5 bg-destructive rounded-full" />
              Inactivo
            </Badge>
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
          size="icon"
        >
          <ChartSpline />
        </Button>
        <LinkTableActions link={row.original} />
      </div>
    ),
  }),
];
