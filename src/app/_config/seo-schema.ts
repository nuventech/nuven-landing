type BaseSocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
};

export type OrganizationSchemaInput = {
  name: string;
  legalName?: string;
  url: string;
  logoUrl: string;
  sameAs?: BaseSocialLinks;
};

export type LocalBusinessSchemaInput = {
  name: string;
  url: string;
  logoUrl: string;
  telephone?: string;
  priceRange?: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  geoLatitude?: number;
  geoLongitude?: number;
  openingHours?: string[];
};

export type WebSiteSchemaInput = {
  name: string;
  url: string;
  potentialActionSearchUrl?: string;
};

//TODO Adaptar segun la empresa

export function buildOrganizationSchema(input: OrganizationSchemaInput) {
  const sameAsArray = input.sameAs
    ? Object.values(input.sameAs).filter(Boolean)
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: input.name,
    legalName: input.legalName ?? input.name,
    url: input.url,
    logo: input.logoUrl,
    ...(sameAsArray && sameAsArray.length > 0 && { sameAs: sameAsArray }),
  };
}

export function buildLocalBusinessSchema(input: LocalBusinessSchemaInput) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: input.name,
    url: input.url,
    logo: input.logoUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.streetAddress,
      addressLocality: input.addressLocality,
      addressRegion: input.addressRegion,
      postalCode: input.postalCode,
      addressCountry: input.addressCountry,
    },
  };

  if (input.telephone) schema.telephone = input.telephone;
  if (input.priceRange) schema.priceRange = input.priceRange;
  if (input.geoLatitude && input.geoLongitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: input.geoLatitude,
      longitude: input.geoLongitude,
    };
  }
  if (input.openingHours && input.openingHours.length > 0) {
    schema.openingHours = input.openingHours;
  }

  return schema;
}

export function buildWebSiteSchema(input: WebSiteSchemaInput) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    url: input.url,
  };

  if (input.potentialActionSearchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: `${input.potentialActionSearchUrl}{search_term_string}`,
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}
