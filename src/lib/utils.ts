import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { clientEnv } from './config/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortUrl(slug: string) {
  return `${clientEnv.VITE_BASE_URL}/r/${slug}`;
}
