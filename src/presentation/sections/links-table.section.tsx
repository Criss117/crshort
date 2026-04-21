import {
  ChartSpline,
  CopyIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';

import { Button } from '@heroui/react/button';
import { Table } from '@heroui/react/table';

import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

interface Props {
  links: LinkSelect[];
}

export function LinksTableSection({ links }: Props) {
  return (
    <Table className="w-full">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
              Slug
            </Table.Column>
            <Table.Column className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
              URL destino
            </Table.Column>
            <Table.Column className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">
              Clics
            </Table.Column>
            <Table.Column className="text-center px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">
              Estado
            </Table.Column>
            <Table.Column className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
              Acciones
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {links.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <LinkIcon />
                    </div>
                    <p className="text-muted-foreground">
                      No tienes ningún link todavía
                    </p>
                    {/* <CreateLink label=" Crear tu primer link" /> */}
                  </div>
                </Table.Cell>
              </Table.Row>
            )}

            {links.map((link) => (
              <Table.Row
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                key={link.id}
              >
                <Table.Cell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`/r/${link.slug}`}
                      target="_blank"
                      className="font-mono text-sm text-primary hover:underline font-medium"
                    >
                      {link.slug}
                    </a>
                    <Button
                      data-slug={link.slug}
                      variant="ghost"
                      size="sm"
                      isIconOnly
                      className="copy-btn"
                    >
                      <CopyIcon />
                    </Button>
                  </div>
                  {link.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-50">
                      {link.description}
                    </p>
                  )}
                </Table.Cell>
                <Table.Cell className="px-4 py-3 hidden md:table-cell">
                  <a
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-foreground truncate block max-w-75"
                    title={link.url}
                  >
                    {link.url}
                  </a>
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-center">
                  <span className="text-sm font-medium">
                    {link.clicks.toLocaleString('es-ES')}
                  </span>
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-center hidden sm:table-cell">
                  {link.isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                      Inactivo
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      variant="ghost"
                      size="sm"
                      isIconOnly
                    >
                      <ChartSpline />
                    </Button>
                    <Button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      variant="ghost"
                      size="sm"
                      isIconOnly
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      variant="ghost"
                      size="sm"
                      isIconOnly
                    >
                      <TrashIcon className="text-destructive" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
