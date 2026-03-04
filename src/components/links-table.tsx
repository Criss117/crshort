import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { ChartSpline, Copy, Link, PencilIcon, TrashIcon } from "lucide-react";

import { $links, initLinks } from "@/store/links.store";
import { CreateLink } from "./create-link";
import { Button } from "./ui/button";
import type { LinkSelect } from "@/lib/schemas/links.schema";

interface Props {
  links: LinkSelect[];
}

export function LinksTable({ links }: Props) {
  const linksStore = useStore($links);

  useEffect(() => {
    initLinks(links);
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border/50 bg-muted/30">
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
            Slug
          </th>
          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
            URL destino
          </th>
          <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">
            Clics
          </th>
          <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">
            Estado
          </th>
          <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {links.length === 0 && (
          <tr>
            <td colSpan={5} className="px-4 py-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Link />
                </div>
                <p className="text-muted-foreground">
                  No tienes ningún link todavía
                </p>
                <CreateLink label=" Crear tu primer link" />
              </div>
            </td>
          </tr>
        )}

        {linksStore.map((link) => (
          <tr
            className="border-b border-border/30 hover:bg-muted/20 transition-colors"
            key={link.id}
          >
            <td className="px-4 py-3">
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
                  title="Copiar enlace"
                  variant="ghost"
                  size="icon-sm"
                  className="copy-btn"
                >
                  <Copy />
                </Button>
              </div>
              {link.description && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-50">
                  {link.description}
                </p>
              )}
            </td>
            <td className="px-4 py-3 hidden md:table-cell">
              <a
                href={link.url}
                className="text-sm text-muted-foreground hover:text-foreground truncate block max-w-75"
                title={link.url}
              >
                {link.url}
              </a>
            </td>
            <td className="px-4 py-3 text-center">
              <span className="text-sm font-medium">
                {link.clicks.toLocaleString("es-ES")}
              </span>
            </td>
            <td className="px-4 py-3 text-center hidden sm:table-cell">
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
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Button
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Ver estadísticas"
                  variant="ghost"
                  size="icon"
                >
                  <ChartSpline />
                </Button>
                <Button
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Editar"
                  variant="ghost"
                  size="icon"
                >
                  <PencilIcon />
                </Button>
                <Button
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  title="Eliminar"
                  variant="ghost"
                  size="icon"
                >
                  <TrashIcon className="text-destructive" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
