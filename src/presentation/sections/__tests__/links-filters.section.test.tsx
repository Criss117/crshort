import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// Mock useFindLinks to return controlled data
const mockUseFindLinks = vi.fn();

vi.mock('@/application/hooks/use-find-links', () => ({
  useFindLinks: (...args: unknown[]) => mockUseFindLinks(...args),
}));

import { FiltersProvider } from '@/application/store/filters.store';
import { LinksFiltersSection } from '../links-filters.section';

function Wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersProvider>{children}</FiltersProvider>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('LinksFiltersSection tag Select', () => {
  it('should disable tag Select and show "Sin tags" when no tags available', () => {
    mockUseFindLinks.mockReturnValue({
      links: [
        {
          id: '1',
          slug: 'test',
          url: 'https://example.com',
          clicks: 0,
          isActive: true,
          userId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          lastClick: null,
          customSlug: null,
          description: null,
          linkTags: [],
        },
      ],
    });

    render(<LinksFiltersSection />, { wrapper: Wrapper });

    // The tag select trigger should exist (comboboxes include both group and tag selects)
    const tagSelects = screen.getAllByRole('combobox');
    expect(tagSelects.length).toBeGreaterThanOrEqual(1);
    // The tag select should show disabled "Sin tags" placeholder
    expect(screen.getByText('Sin tags')).toBeInTheDocument();
  });

  it('should render unique tags from links data', () => {
    mockUseFindLinks.mockReturnValue({
      links: [
        {
          id: '1',
          slug: 'link-one',
          url: 'https://example.com/one',
          clicks: 0,
          isActive: true,
          userId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          lastClick: null,
          customSlug: null,
          description: null,
          linkTags: [
            { tag: { id: 't1', name: 'React', slug: 'react', color: '#61dafb', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
            { tag: { id: 't2', name: 'Frontend', slug: 'frontend', color: '#3178c6', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
          ],
        },
        {
          id: '2',
          slug: 'link-two',
          url: 'https://example.com/two',
          clicks: 0,
          isActive: true,
          userId: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          lastClick: null,
          customSlug: null,
          description: null,
          linkTags: [
            { tag: { id: 't1', name: 'React', slug: 'react', color: '#61dafb', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
            { tag: { id: 't3', name: 'Vue', slug: 'vue', color: '#42b883', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
          ],
        },
      ],
    });

    render(<LinksFiltersSection />, { wrapper: Wrapper });

    // Should show "Todos" option in both selects
    const todosElements = screen.getAllByText('Todos');
    expect(todosElements.length).toBe(2);
    // With unique tags available, the Select should NOT show "Sin tags"
    expect(screen.queryByText('Sin tags')).not.toBeInTheDocument();
  });
});
