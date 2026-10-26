import rawReels from './instagramReels.json';

export interface InstagramReel {
  id: string;
  url: string;
  embedUrl: string;
  title: string;
  caption: string;
  aspectRatio: string;
  thumbnailPlaceholder?: string;
}

export const INSTAGRAM_REELS: InstagramReel[] = rawReels as InstagramReel[];
