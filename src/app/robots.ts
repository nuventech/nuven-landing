import { MetadataRoute } from 'next';

import { siteConfig } from '@/src/constants/site';

export const dynamic = 'force-static'; //Lo compila como archivo estatico

//TODO Adaptar segun la empresa
//Es un archivo que le indica a los bots (Google, Bing, etc.) qué partes de tu sitio pueden o no pueden indexar.
// Sirve para:
// -Permitir o bloquear rutas (por ejemplo: /admin, /api, /dashboard).
// -Evitar que Google rastree recursos innecesarios que consumen crawl budget.

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
