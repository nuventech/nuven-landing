'use client';

import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { NuvenIcon } from '@/src/components/common/icons/NuvenIcon';
import { NuvenLogo } from '@/src/components/common/icons/NuvenLogo';
import { siteConfig } from '@/src/constants/site';
import { useInView } from '@/src/hooks/useInView';

export function Footer() {
  const { email, phone, formatedPhone } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    descripcion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', email: '', telefono: '', descripcion: '' });
  };

  return (
    <footer id="contacto" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Headline & Contact */}
          <div
            className={`transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                Contacto
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-8">
              Transformar tu empresa está a{' '}
              <span className="text-neutral-500 italic font-serif">
                una llamada
              </span>{' '}
              de distancia.
            </h2>

            <div className="space-y-6">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black group-hover:border-[#CCFF00] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black group-hover:border-[#CCFF00] transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">{formatedPhone}</span>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`bg-[#111] border border-white/10 rounded-2xl p-8 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-500">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-500">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-500">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-500">
                  ¿Cómo podemos ayudarte?
                </label>
                <textarea
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#CCFF00] text-black py-4 rounded-lg font-bold hover:bg-[#bbe000] transition-colors flex items-center justify-center gap-2 group"
              >
                Solicitar Consultoría
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex items-center gap-0.25 opacity-90 group-hover:opacity-100 transition-opacity">
              <NuvenIcon className="w-9 h-6 fill-[#AFEB2B]" />
              <NuvenLogo className="w-19 h-7 text-[#f8ffee]" />
            </div>
          </a>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Nuven. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
