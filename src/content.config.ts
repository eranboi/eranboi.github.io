import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        year: z.string(),
        github: z.string().optional(),
        link: z.string().optional(),
        featured: z.boolean().default(false),
        outdated: z.boolean().default(false),
    }),
});

// A media entry is either a plain path, or a light preview plus the full-size file to download.
const mediaSchema = z.union([
    z.string(),
    z.object({
        src: z.string(),
        full: z.string().optional(),
        caption: z.string().optional(),
    }),
]);

const pressKitDataSchema = z.object({
    developer: z.string().optional(),
    location: z.string().optional(),
    releaseDate: z.string().optional(),
    price: z.string().optional(),
    languages: z.string().optional(),
    genre: z.string().optional(),
    longDescription: z.string().optional(),
    hero: z.string().optional(),
    heroLogo: z.string().optional(),
    downloads: z.array(z.object({
        label: z.string(),
        href: z.string(),
        size: z.string().optional(),
    })).optional(),
    screenshots: z.array(mediaSchema).optional(),
    screenshotsZip: z.string().optional(),
    gifs: z.array(mediaSchema).optional(),
    gifsZip: z.string().optional(),
    logo: z.string().optional(),
    icon: z.string().optional(),
    branding: z.array(z.object({
        src: z.string(),
        full: z.string().optional(),
        label: z.string(),
        transparent: z.boolean().default(false),
    })).optional(),
    brandingZip: z.string().optional(),
    trailerUrl: z.string().optional(),
    // Direct download of the trailer file, shown next to the embed.
    trailerFile: z.string().optional(),
    trailerSize: z.string().optional(),
    twitter: z.string().optional(),
    twitterHandle: z.string().optional(),
    discord: z.string().optional(),
    website: z.string().optional(),
    email: z.string().optional(),
    developerBio: z.string().optional(),
}).optional();

const games = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/games' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        role: z.string(),
        studio: z.string().optional(),
        platform: z.array(z.string()),
        tags: z.array(z.string()),
        steamUrl: z.string().optional(),
        appStoreUrl: z.string().optional(),
        pressKit: z.boolean().default(false),
        pressKitData: pressKitDataSchema,
        featured: z.boolean().default(false),
        // Lower numbers are listed first; unordered games follow.
        order: z.number().optional(),
        cover: z.string().optional(),
        // Wide art (subject on the left) behind the wishlist call-to-action.
        banner: z.string().optional(),
        bannerMobile: z.string().optional(),
    }),
});

export type MediaEntry = z.infer<typeof mediaSchema>;

export const collections = { projects, games };