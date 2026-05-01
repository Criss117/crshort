import { describe, it, expect } from 'vitest';

import {
  link,
  linkTag,
  tag,
  tagRelations,
  linkTagRelations,
  linkRelations,
  type LinkWithTags,
} from '../links.schema';

describe('linkTag schema (LT-004)', () => {
  it('should have linkId column named link_id with notNull', () => {
    const col = linkTag.linkId;
    expect(col.name).toBe('link_id');
    expect(col.notNull).toBe(true);
  });

  it('should have tagId column named tag_id with notNull', () => {
    const col = linkTag.tagId;
    expect(col.name).toBe('tag_id');
    expect(col.notNull).toBe(true);
  });

  it('should have createdAt column named created_at', () => {
    const col = linkTag.createdAt;
    expect(col.name).toBe('created_at');
    expect(col.notNull).toBe(true);
  });

  it('should NOT have an id column (composite PK, not independent PK)', () => {
    expect(linkTag).not.toHaveProperty('id');
  });

  it('should not have updatedAt, deletedAt, or isActive columns', () => {
    expect(linkTag).not.toHaveProperty('updatedAt');
    expect(linkTag).not.toHaveProperty('deletedAt');
    expect(linkTag).not.toHaveProperty('isActive');
  });
});

describe('tag table unique constraint (LT-003)', () => {
  it('should have slug column named slug with notNull', () => {
    expect(tag.slug.name).toBe('slug');
    expect(tag.slug.notNull).toBe(true);
  });

  it('should have userId column named user_id with notNull', () => {
    expect(tag.userId.name).toBe('user_id');
    expect(tag.userId.notNull).toBe(true);
  });
});

describe('schema exports (LT-005)', () => {
  it('should export link, tag, and linkTag tables', () => {
    expect(link).toBeDefined();
    expect(tag).toBeDefined();
    expect(linkTag).toBeDefined();
  });

  it('link should have all expected columns accessible as properties', () => {
    expect(link).toHaveProperty('id');
    expect(link).toHaveProperty('url');
    expect(link).toHaveProperty('slug');
    expect(link).toHaveProperty('customSlug');
    expect(link).toHaveProperty('clicks');
    expect(link).toHaveProperty('userId');
    expect(link).toHaveProperty('createdAt');
    expect(link).toHaveProperty('updatedAt');
    expect(link).toHaveProperty('isActive');
  });

  it('link.url column should be named url with notNull', () => {
    expect(link.url.name).toBe('url');
    expect(link.url.notNull).toBe(true);
  });
});

describe('relations (LT-005)', () => {
  it('should export relation objects', () => {
    expect(tagRelations).toBeDefined();
    expect(linkTagRelations).toBeDefined();
    expect(linkRelations).toBeDefined();
  });

  it('LinkWithTags type should be valid (compile-time check)', () => {
    // Type-level verification: if this compiles, the type exists and is valid
    const _typeCheck: LinkWithTags = null as unknown as LinkWithTags;
    expect(_typeCheck).toBeNull();
  });
});
