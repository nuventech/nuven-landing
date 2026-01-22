import { MetadataRoute } from 'next';

import { siteConfig } from '@/src/constants/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = siteConfig;
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/_next', '/api'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
