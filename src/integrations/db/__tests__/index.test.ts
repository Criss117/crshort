import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('DB schema registration (LT-003, LT-004, LT-005)', () => {
  it('should import linksSchema in db/index.ts', async () => {
    const content = await readFile(
      resolve(__dirname, '../index.ts'),
      'utf-8',
    );
    expect(content).toContain('linksSchema');
    expect(content).toContain('...linksSchema');
    // This test checks that the file has been updated to import and merge
    // the links schema. The actual DB connection test requires environment
    // variables that are unavailable in test mode (server-only env vars).
  });

  it('should merge linksSchema into the main schema object', async () => {
    const content = await readFile(
      resolve(__dirname, '../index.ts'),
      'utf-8',
    );
    expect(content).toContain('...authSchema');
    expect(content).toContain('...linksSchema');
  });
});
