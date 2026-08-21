import { describe, it, expect } from 'vitest';

describe('prepareTagData (LT-003, LT-004)', () => {
  it('should return array of normalized tag descriptors', async () => {
    const { prepareTagData } = await import('../tag-utils');
    const result = prepareTagData('trabajo, React');
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ name: 'trabajo', slug: 'trabajo' });
    expect(result[1]).toMatchObject({ name: 'React', slug: 'react' });
  });

  it('should assign deterministic colors via hash', async () => {
    const { prepareTagData } = await import('../tag-utils');
    const result = prepareTagData('react');
    expect(result[0].color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('should return empty array for undefined input', async () => {
    const { prepareTagData } = await import('../tag-utils');
    expect(prepareTagData(undefined)).toEqual([]);
  });

  it('should return empty array for empty string', async () => {
    const { prepareTagData } = await import('../tag-utils');
    expect(prepareTagData('')).toEqual([]);
  });

  it('should deduplicate tags that normalize to the same slug (LT-003)', async () => {
    const { prepareTagData } = await import('../tag-utils');
    const result = prepareTagData('Tag, tag');
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('tag');
    expect(result[0].name).toBe('Tag'); // first occurrence wins
  });

  it('should deduplicate across multiple casing variants (LT-003 triangulation)', async () => {
    const { prepareTagData } = await import('../tag-utils');
    const result = prepareTagData('Tag, tag, TAG, react');
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('tag');
    expect(result[0].name).toBe('Tag');
    expect(result[1].slug).toBe('react');
  });

  it('should filter out tags that normalize to an empty slug', async () => {
    const { prepareTagData } = await import('../tag-utils');
    const result = prepareTagData('react, !!!, vue');
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('react');
    expect(result[1].slug).toBe('vue');
  });
});

describe('parseTagsString (LT-001, LT-003)', () => {
  it('should parse comma-separated tags', async () => {
    const { parseTagsString } = await import('../tag-utils');
    const result = parseTagsString('trabajo, React, Producción');
    expect(result).toEqual(['trabajo', 'React', 'Producción']);
  });

  it('should trim whitespace from each tag', async () => {
    const { parseTagsString } = await import('../tag-utils');
    const result = parseTagsString('  trabajo ,  React  ');
    expect(result).toEqual(['trabajo', 'React']);
  });

  it('should return empty array for undefined', async () => {
    const { parseTagsString } = await import('../tag-utils');
    expect(parseTagsString(undefined)).toEqual([]);
  });

  it('should return empty array for empty string', async () => {
    const { parseTagsString } = await import('../tag-utils');
    expect(parseTagsString('')).toEqual([]);
  });

  it('should filter out empty entries between commas', async () => {
    const { parseTagsString } = await import('../tag-utils');
    const result = parseTagsString('trabajo, , React');
    expect(result).toEqual(['trabajo', 'React']);
  });
});

describe('hashColorFromSlug (LT-006)', () => {
  it('should return the same color for the same slug (deterministic)', async () => {
    const { hashColorFromSlug } = await import('../tag-utils');
    const color1 = hashColorFromSlug('react');
    const color2 = hashColorFromSlug('react');
    expect(color1).toBe(color2);
  });

  it('should return a valid hex color string', async () => {
    const { hashColorFromSlug } = await import('../tag-utils');
    const color = hashColorFromSlug('trabajo');
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('should produce different colors for different slugs', async () => {
    const { hashColorFromSlug } = await import('../tag-utils');
    const slugs = ['react', 'vue', 'angular', 'svelte', 'trabajo'];
    const colors = slugs.map((s) => hashColorFromSlug(s));
    const uniqueColors = new Set(colors);
    // At least 3 unique colors out of 5
    expect(uniqueColors.size).toBeGreaterThanOrEqual(3);
  });
});

describe('normalizeTag (LT-002)', () => {
  it('should trim whitespace from tag names', async () => {
    const { normalizeTag } = await import('../tag-utils');
    const result = normalizeTag('  React  ');
    expect(result).toEqual({ name: 'React', slug: 'react' });
  });

  it('should lowercase slug while preserving original name casing', async () => {
    const { normalizeTag } = await import('../tag-utils');
    const result = normalizeTag('Producción Frontend');
    expect(result).toEqual({
      name: 'Producción Frontend',
      slug: 'produccion-frontend',
    });
  });

  it('should replace spaces with hyphens in slug', async () => {
    const { normalizeTag } = await import('../tag-utils');
    const result = normalizeTag('my tag name');
    expect(result.slug).toBe('my-tag-name');
  });

  it('should strip special characters from slug but preserve them in name', async () => {
    const { normalizeTag } = await import('../tag-utils');
    const result = normalizeTag('C++ & React!');
    expect(result).toEqual({
      name: 'C++ & React!',
      slug: 'c-react',
    });
  });

  it('should deduplicate hyphens from slug', async () => {
    const { normalizeTag } = await import('../tag-utils');
    const result = normalizeTag('multiple   spaces');
    expect(result.slug).toBe('multiple-spaces');
  });
});
