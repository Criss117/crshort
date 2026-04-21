import type { LinkSelect } from '@/integrations/db/schemas/links.schema';
import { ChartLine, CheckCircle, LinkIcon } from 'lucide-react';

interface Props {
  links: LinkSelect[];
}

export function LinksHeaderSection({ links }: Props) {
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const activeLinks = links.filter((link) => link.isActive).length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <article className="bg-overlay rounded-4xl p-5 border border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
            <LinkIcon />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de links</p>
            <p className="text-2xl font-bold">{links.length}</p>
          </div>
        </div>
      </article>

      <article className="bg-overlay rounded-4xl p-5 border border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
            <ChartLine />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de clics</p>
            <p className="text-2xl font-bold">{totalClicks}</p>
          </div>
        </div>
      </article>

      <article className="bg-overlay rounded-4xl p-5 border border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center">
            <CheckCircle />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Links activos</p>
            <p className="text-2xl font-bold">{activeLinks}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
