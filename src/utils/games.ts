import type { CollectionEntry } from 'astro:content';
import type { MediaEntry } from '../content.config';

type Game = CollectionEntry<'games'>;

/** Featured games first, then by `order`; games without an order keep their place after ordered ones. */
export function sortGames(games: Game[]): Game[] {
  return [...games].sort((a, b) => {
    const featured = Number(b.data.featured) - Number(a.data.featured);
    if (featured !== 0) return featured;
    return (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER);
  });
}

/** Unreleased games on Steam get a wishlist call-to-action instead of a plain store link. */
export const wantsWishlist = (game: Game) =>
  !!game.data.steamUrl && game.data.tags.includes('coming soon');

/** CSS class for a status tag, e.g. "coming soon" -> "coming-soon". */
export const tagClass = (tag: string) => tag.toLowerCase().replace(/\s+/g, '-');

/** Normalizes a media entry to a preview, the file to open/download, and an optional caption. */
export function media(entry: MediaEntry) {
  return typeof entry === 'string'
    ? { src: entry, full: entry, caption: undefined }
    : { src: entry.src, full: entry.full ?? entry.src, caption: entry.caption };
}
