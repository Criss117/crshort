import { useFindLinks } from '@/application/hooks/use-find-links';

import { LinksHeaderSection } from '@/presentation/sections/links-header.section';
import { LinksFiltersSection } from '@/presentation/sections/links-filters.section';
import { LinksTable } from '@/presentation/components/links-table';
import { EditCustomSlugDialog } from '@/presentation/components/edit-custom-slug-dialog';

import { FiltersProvider, useFilters } from '@/application/store/filters.store';
import { EditCustomSlugDialogProvider } from '@/presentation/contexts/edit-custom-slug-dialog';

function FilteredSections() {
  const { filters } = useFilters();
  const { links } = useFindLinks({
    filters: {
      query: filters.query,
      group: filters.group,
      tag: filters.tag,
    },
  });

  return (
    <>
      <LinksFiltersSection />
      <LinksTable links={links} />
      <EditCustomSlugDialog
        links={links.map((l) => ({
          id: l.id,
          url: l.url,
          customSlug: l.customSlug,
          slug: l.slug,
        }))}
      />
    </>
  );
}

export function LinksScreen() {
  const { links } = useFindLinks();

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8">
      <LinksHeaderSection links={links} />
      <FiltersProvider>
        <EditCustomSlugDialogProvider>
          <FilteredSections />
        </EditCustomSlugDialogProvider>
      </FiltersProvider>
    </main>
  );
}
