import {
  LocalBusinessSchemaInput,
  OrganizationSchemaInput,
  WebSiteSchemaInput,
} from './seo-schema';

//TODO Adaptar segun la empresa
// Copiás site.ts y cambiás:
// siteUrl
// organizationConfig
// localBusinessConfig
// webSiteConfig
// Ajustás el logoUrl al archivo que uses en esa landing.
// Si el cliente es solo “online” y no tiene local físico, podés no usar LocalBusiness y solo dejar Organization + WebSite.

export const siteUrl = 'https://ejemplo-agencia.com';

export const organizationConfig: OrganizationSchemaInput = {
  name: 'Ejemplo Agencia',
  legalName: 'Ejemplo Agencia SRL',
  url: siteUrl,
  logoUrl: `${siteUrl}/logo.png`,
  sameAs: {
    instagram: 'https://www.instagram.com/ejemplo',
    linkedin: 'https://www.linkedin.com/company/ejemplo',
  },
};

export const localBusinessConfig: LocalBusinessSchemaInput = {
  name: 'Ejemplo Agencia',
  url: siteUrl,
  logoUrl: `${siteUrl}/logo.png`,
  telephone: '+54 381 000 0000',
  priceRange: '$$',
  streetAddress: 'Av. Siempre Viva 123',
  addressLocality: 'San Miguel de Tucumán',
  addressRegion: 'Tucumán',
  postalCode: '4000',
  addressCountry: 'AR',
  geoLatitude: -26.8241,
  geoLongitude: -65.2226,
  openingHours: ['Mo-Fr 09:00-18:00'],
};

export const webSiteConfig: WebSiteSchemaInput = {
  name: 'Ejemplo Agencia',
  url: siteUrl,
  potentialActionSearchUrl: `${siteUrl}/buscar?q=`,
};
