/**
 * Normalize a raw tag string into a { name, slug } pair.
 *
 * - `name` preserves original casing and characters
 * - `slug` is lowercased, spaces → hyphens, special chars removed,
 *   consecutive hyphens collapsed
 */
export function normalizeTag(raw: string): { name: string; slug: string } {
  const name = raw.trim();
  const deaccented = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
  const slug = deaccented
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return { name, slug };
}

const TAG_COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // emerald
  '#F59E0B', // amber
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

/**
 * Prepare tag data from a raw comma-separated tags string.
 * Parses, normalizes each tag, and assigns a deterministic color.
 *
 * This is a pure function — no DB calls. Returns an empty array
 * if input is falsy, empty, or contains no valid tags.
 *
 * @example
 * prepareTagData("trabajo, React") →
 *   [{ name: "trabajo", slug: "trabajo", color: "#..." },
 *    { name: "React", slug: "react", color: "#..." }]
 */
export function prepareTagData(
  rawTags: string | undefined | null,
): Array<{ name: string; slug: string; color: string }> {
  const tagNames = parseTagsString(rawTags);
  const seen = new Set<string>();
  const result: Array<{ name: string; slug: string; color: string }> = [];

  for (const name of tagNames) {
    const { slug } = normalizeTag(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    result.push({ name, slug, color: hashColorFromSlug(slug) });
  }

  return result;
}

/**
 * Parse a comma-separated tags string into an array of trimmed, non-empty tag names.
 * Returns empty array for falsy or empty input.
 *
 * @example
 * parseTagsString("trabajo, React, ") → ["trabajo", "React"]
 * parseTagsString("") → []
 * parseTagsString(undefined) → []
 */
export function parseTagsString(raw: string | undefined | null): string[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Deterministically pick a color from a curated palette based on the slug.
 * Same slug always produces the same color.
 */
export function hashColorFromSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % TAG_COLORS.length;
  return TAG_COLORS[index];
}
