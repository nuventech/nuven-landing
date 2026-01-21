import { MetadataRoute } from 'next';

//TODO Adaptar segun la empresa
// Es un listado estructurado de todas las URLs importantes del sitio.
// Sirve para:
// -Ayudar a Google a descubrir e indexar tu sitio más rápido.
// -Indicar prioridad de páginas o frecuencia de actualización.
// -Indispensable si tu sitio tiene contenido dinámico.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://TU_DOMINIO.com';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
