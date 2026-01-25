'use client';

import { NuvenIcon } from '@/src/components/common/icons/NuvenIcon';
import { NuvenLogo } from '@/src/components/common/icons/NuvenLogo';
import { siteConfig } from '@/src/constants/site';

const NAV_LINKS = [
  { name: 'Desafíos', href: '#desafios' },
  { name: 'Estrategia', href: '#estrategia' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proceso', href: '#proceso' },
  { name: 'Contacto', href: '#contacto' },
];

export function Footer() {
  return (
    <footer className="py-20 relative overflow-hidden bg-[#050505]">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="flex items-center gap-0.25 opacity-90 group-hover:opacity-100 transition-opacity">
                <NuvenIcon className="w-9 h-6 fill-[#AFEB2B]" />
                <NuvenLogo className="w-19 h-7 text-[#f8ffee]" />
              </div>
            </a>
            <p className="text-neutral-400 text-base max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Explore Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg uppercase tracking-wider">
              Explorar
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-[#CCFF00] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info / Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg uppercase tracking-wider">
              Compañía
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Basados en {siteConfig.province},<br />
              Tucumán, Argentina.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Nuven. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-neutral-500 hover:text-white text-xs transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-white text-xs transition-colors"
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
