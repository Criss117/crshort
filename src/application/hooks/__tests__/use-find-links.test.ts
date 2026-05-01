import { describe, it, expect } from 'vitest';

import type { LinkWithTags } from '@/integrations/db/schemas/links.schema';

// We'll test the pure filterLinks function once it's extracted.
// For now, import it directly.
describe('filterLinks (tag filtering)', () => {
  const baseLinks: LinkWithTags[] = [
    {
      id: '1',
      slug: 'link-one',
      url: 'https://example.com/one',
      clicks: 10,
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
      clicks: 5,
      isActive: false,
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      lastClick: null,
      customSlug: null,
      description: null,
      linkTags: [
        { tag: { id: 't3', name: 'Vue', slug: 'vue', color: '#42b883', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
      ],
    },
    {
      id: '3',
      slug: 'link-three',
      url: 'https://example.com/three',
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
        { tag: { id: 't4', name: 'Backend', slug: 'backend', color: '#000000', userId: 'user1', createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isActive: true } },
      ],
    },
    {
      id: '4',
      slug: 'link-four',
      url: 'https://example.com/four',
      clicks: 2,
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
  ];

  it('should filter links by exact tag slug match', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, { tag: 'react' });
    expect(result).toHaveLength(2);
    expect(result.map((l) => l.slug)).toEqual(
      expect.arrayContaining(['link-one', 'link-three']),
    );
  });

  it('should return all links when tag filter is empty', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, {});
    expect(result).toHaveLength(4);
  });

  it('should filter by tag with case-insensitive matching', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, { tag: 'REACT' });
    expect(result).toHaveLength(2);
    expect(result.map((l) => l.slug)).toEqual(
      expect.arrayContaining(['link-one', 'link-three']),
    );
  });

  it('should combine tag + query filter with AND logic', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, { tag: 'react', query: 'three' });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('link-three');
  });

  it('should combine tag + group filter with AND logic', async () => {
    const { filterLinks } = await import('../use-find-links');
    // react tag + inactive group → only link-two has vue, so empty
    const result = filterLinks(baseLinks, { tag: 'react', group: 'inactive' });
    expect(result).toHaveLength(0);
  });

  it('should return empty array when no links match the tag', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, { tag: 'angular' });
    expect(result).toHaveLength(0);
  });

  it('should return link with no tags when no tag filter is applied', async () => {
    const { filterLinks } = await import('../use-find-links');
    const result = filterLinks(baseLinks, {});
    const slugs = result.map((l) => l.slug);
    expect(slugs).toContain('link-four');
  });
});
