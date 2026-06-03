// app/sitemap.ts

export const dynamic = 'force-static'; // <--- ADD THIS LINE

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mendalia.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // ... add your other routes here
  ];
}