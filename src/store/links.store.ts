import { atom } from "nanostores";
import type { LinkSelect } from "@/lib/schemas/links.schema";

export const $links = atom<LinkSelect[]>([]);

export function initLinks(links: LinkSelect[]) {
  $links.set(links);
}

export function addLink(link: LinkSelect) {
  $links.set([...$links.get(), link]);
}
