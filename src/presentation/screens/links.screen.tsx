import { useFindLinks } from '@/application/hooks/use-find-links';

import { LinksTableSection } from '@/presentation/sections/links-table.section';
import { LinksHeaderSection } from '@/presentation/sections/links-header.section';
import { LinksFiltersSection } from '@/presentation/sections/links-filters.section';
import { FiltersProvider, useFilters } from '@/application/store/filters.store';

function FilteredSections() {
  const { filters } = useFilters();
  const { links } = useFindLinks({
    filters: {
      query: filters.query,
      group: filters.group,
    },
  });

  return (
    <>
      <LinksFiltersSection />
      <LinksTableSection links={links} />
    </>
  );
}

export function LinksScreen() {
  const { links } = useFindLinks();

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8">
      <LinksHeaderSection links={links} />
      <FiltersProvider>
        <FilteredSections />
      </FiltersProvider>
    </main>
  );
}
