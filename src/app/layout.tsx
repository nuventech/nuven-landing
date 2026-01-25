import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans, Geist_Mono } from 'next/font/google';

import { FloatingActions } from '@/src/components/common/FloatingActions';
import { Footer } from '@/src/components/common/Footer';
import { Navbar } from '@/src/components/common/Navbar';
import { siteConfig } from '@/src/constants/site';

import { JsonLd } from './_config/JsonLd';
import {
  localBusinessConfig,
  organizationConfig,
  webSiteConfig,
} from './_config/site';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
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
  metadataBase: new URL(`${siteConfig.siteUrl}`),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  manifest: '/site.webmanifest',
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: '/',
  },
  authors: [{ name: siteConfig.authorName, url: siteConfig.authorUrl }],
  creator: siteConfig.authorName,
  publisher: siteConfig.authorName,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: `${siteConfig.siteUrl}`,
    siteName: siteConfig.name,
    locale: siteConfig.language,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
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
  return (
    <html lang="es-AR">
      <JsonLd id="schema-org" schema={organizationConfig} />
      <JsonLd id="schema-local-business" schema={localBusinessConfig} />
      <JsonLd id="schema-website" schema={webSiteConfig} />
      <body className={`${dmSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="w-full">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
