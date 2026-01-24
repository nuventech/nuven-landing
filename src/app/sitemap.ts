import { MetadataRoute } from 'next';

import { siteConfig } from '@/src/constants/site';

export const dynamic = 'force-static';

//TODO Adaptar segun la empresa
// Es un listado estructurado de todas las URLs importantes del sitio.
// Sirve para:
// -Ayudar a Google a descubrir e indexar tu sitio más rápido.
// -Indicar prioridad de páginas o frecuencia de actualización.
// -Indispensable si tu sitio tiene contenido dinámico.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
