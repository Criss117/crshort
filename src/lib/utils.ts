import { clientEnv } from './config/client';

export function shortUrl(slug: string) {
  return `${clientEnv.VITE_BASE_URL}/r/${slug}`;
}
