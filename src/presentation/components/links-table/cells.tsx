import { cn, shortUrl } from '@/lib/utils';
import { CopyButton } from '../copy-button';

type SlugCellProps = {
  slug: string;
  customSlug: string | null;
  isActive: boolean;
};

type SlugTextProps = {
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
};

function SlugText({ label, value, href, isLink = false }: SlugTextProps) {
  const valueContent = (
    <>
      <span className="text-sm text-muted-foreground">{label}:</span>{' '}
      <span
        className={cn(
          'text-base font-mono font-medium',
          isLink ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {value}
      </span>
    </>
  );

  if (isLink && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base hover:underline"
      >
        {valueContent}
      </a>
    );
  }

  return <span className="text-sm">{valueContent}</span>;
}

export function SlugCell({ slug, customSlug, isActive }: SlugCellProps) {
  const activeSlug = customSlug ?? slug;
  const activeHref = `/r/${activeSlug}`;

  const slugContent = (
    <div className="flex flex-col">
      {customSlug && (
        <SlugText
          label="custom"
          value={customSlug}
          href={isActive ? activeHref : undefined}
          isLink={isActive}
        />
      )}

      <SlugText
        label="slug"
        value={slug}
        href={!customSlug && isActive ? activeHref : undefined}
        isLink={isActive && !customSlug}
      />
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {slugContent}
      <CopyButton text={shortUrl(activeSlug)} isDisabled={!isActive} />
    </div>
  );
}
