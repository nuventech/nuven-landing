import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { JsonLd } from './_config/JsonLd';
import {
  localBusinessConfig,
  organizationConfig,
  webSiteConfig,
} from './_config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

//TODO Adaptar segun la empresa
// Cargar fuentes utilizando next/font para optimizar el rendimiento y SEO
// Cargar imagenes que estan fuera del viewport utilizando lazy loading y next/image para optimizar SEO
// Configurar idioma y region en el tag <html>
// Utilizar principalmente WebP/AVIF,
// Link de Next para navegacion interna y a etiquetas <a> para links externos
// Semantica correcta, un solo h1 por page.tsx
// Utilizar <header>, <main>, <footer>, <section>, <nav>
// Utilizar etiquetas aria para mayor SEO y accesibilidad
// Utilizar Server Components siempre que sea posible para optimizar rendimiento
export const metadata: Metadata = {
  metadataBase: new URL('https://tudominio.com'),
  title: {
    default: 'Nombre de tu marca',
    template: '%s | Nombre de tu marca',
  },
  description: 'Texto corto que explique claramente tu propuesta de valor.',
  openGraph: {
    title: 'Nombre de tu marca',
    description: 'Texto de descripción para cuando compartan el link.',
    url: 'https://tudominio.com',
    siteName: 'Nombre de tu marca',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nombre de tu marca',
    description: 'Descripción pensada para Twitter/X.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('renderizando server...');
  return (
    <html lang="es-AR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd id="schema-org" schema={organizationConfig} />
        <JsonLd id="schema-local-business" schema={localBusinessConfig} />
        <JsonLd id="schema-website" schema={webSiteConfig} />
        {children}
      </body>
    </html>
  );
}
