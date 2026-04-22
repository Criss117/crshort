import { useMemo, useState } from 'react';
import { Table } from '@heroui/react/table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronDown, LinkIcon } from 'lucide-react';
import { cn, Pagination } from '@heroui/react';
import type { SortDescriptor } from '@heroui/react/rac';

import { columns } from './columns';
import type { LinkSelect } from '@/integrations/db/schemas/links.schema';
import { CreateLink } from '@/presentation/components/create-link';

interface Props {
  links: LinkSelect[];
}

// --- Sorting Bridge -------------------------------------------------------
// Convert TanStack SortingState → React Aria SortDescriptor
function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];

  if (!first) return undefined;

  return {
    column: first.id,
    direction: first.desc ? 'descending' : 'ascending',
  };
}

// Convert React Aria SortDescriptor → TanStack SortingState
function toSortingState(descriptor: SortDescriptor): SortingState {
  return [
    {
      desc: descriptor.direction === 'descending',
      id: descriptor.column as string,
    },
  ];
}

function SortableColumnHeader({
  children,
  sortDirection,
}: {
  children: React.ReactNode;
  sortDirection?: 'ascending' | 'descending';
}) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {!!sortDirection && (
        <ChevronDown
          className={cn(
            'size-3 transform transition-transform duration-100 ease-out',
            sortDirection === 'descending' ? 'rotate-180' : '',
          )}
        />
      )}
    </span>
  );
}
const PAGE_SIZE = 4;
export function LinksTable({ links }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data: links,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: PAGE_SIZE } },
    state: { sorting },
  });

  const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const start = pageIndex * PAGE_SIZE + 1;
  const end = Math.min((pageIndex + 1) * PAGE_SIZE, links.length);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          sortDescriptor={sortDescriptor}
          onSortChange={(d) => setSorting(toSortingState(d))}
        >
          <Table.Header>
            {table.getHeaderGroups()[0]!.headers.map((header) => (
              <Table.Column
                key={header.id}
                allowsSorting={header.column.getCanSort()}
                id={header.id}
                isRowHeader={header.id === 'slug'}
              >
                {({ sortDirection }) => (
                  <SortableColumnHeader sortDirection={sortDirection}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </SortableColumnHeader>
                )}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            {links.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <LinkIcon />
                    </div>
                    <p className="text-muted-foreground">
                      No tienes ningún enlace todavía
                    </p>
                    <CreateLink label="Crear tu primer link" />
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {/* <span>{cell.id}</span> */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} a {end} de {links.length} resultados
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={!table.getCanPreviousPage()}
                onPress={() => table.previousPage()}
              >
                <Pagination.PreviousIcon />
                Anterior
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === pageIndex + 1}
                  onPress={() => table.setPageIndex(p - 1)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={!table.getCanNextPage()}
                onPress={() => table.nextPage()}
              >
                Siguiente
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
