import { describe, it, expect } from 'vitest';

describe('createLinkValidator (LT-001)', () => {
  it('should accept valid tags string', async () => {
    const { createLinkValidator } = await import('../link.validators');
    const result = createLinkValidator.parse({
      url: 'https://example.com',
      tags: 'trabajo, React, Producción',
    });
    expect(result.tags).toBe('trabajo, React, Producción');
  });

  it('should accept urls without tags (tags optional)', async () => {
    const { createLinkValidator } = await import('../link.validators');
    const result = createLinkValidator.parse({
      url: 'https://example.com',
    });
    expect(result.tags).toBeUndefined();
  });

  it('should accept empty tags string', async () => {
    const { createLinkValidator } = await import('../link.validators');
    const result = createLinkValidator.parse({
      url: 'https://example.com',
      tags: '',
    });
    expect(result.tags).toBe('');
  });

  it('should still validate url as required', async () => {
    const { createLinkValidator } = await import('../link.validators');
    const result = createLinkValidator.safeParse({
      tags: 'test',
    });
    expect(result.success).toBe(false);
  });
});
