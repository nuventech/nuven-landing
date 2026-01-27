'use client';

import {
  ArrowUpRight,
  Database,
  Layers,
  Monitor,
  Plug,
  ShoppingCart,
} from 'lucide-react';
import { useRef } from 'react';

import { useInView } from '@/src/hooks/useInView';

const services = [
  {
    icon: Layers,
    title: 'Sistemas de Gestión & ERP',
    description:
      'Centralización operativa. Dashboards en tiempo real, control de inventario y gestión de recursos.',
    span: 'md:col-span-2',
    spotlight: 'rgba(204, 255, 0, 0.15)',
  },
  {
    icon: Monitor,
    title: 'Aplicaciones Web & Desktop',
    description:
      'PWA y aplicaciones de escritorio con tecnologías modernas como Electron y Tauri.',
    span: 'md:col-span-1',
    spotlight: 'rgba(204, 255, 0, 0.15)',
  },
  {
    icon: ShoppingCart,
    title: 'Comercio Electrónico Avanzado',
    description: 'Plataformas de alta conversión y rendimiento optimizado.',
    span: 'md:col-span-1',
    spotlight: 'rgba(204, 255, 0, 0.15)',
  },
  {
    icon: Database,
    title: 'Infraestructura Cloud',
    description:
      'Despliegue escalable en OVHcloud y Cloudflare. Contenerización y orquestación con Docker y Kubernetes.',
    span: 'md:col-span-2',
    spotlight: 'rgba(204, 255, 0, 0.15)',
  },
  {
    icon: Plug,
    title: 'Integración de Sistemas',
    description:
      'Conectividad total con pasarelas de pago, organismos fiscales y software de terceros.',
    span: 'md:col-span-2',
    spotlight: 'rgba(204, 255, 0, 0.15)',
  },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="servicios"
      className="relative py-32 section-optimized"
      ref={containerRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CCFF00]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-sm font-mono text-[#CCFF00] mb-4 tracking-wider uppercase">
              Nuestras Soluciones
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Soluciones de Ingeniería <br /> para Desafíos Complejos.
            </h3>
          </div>

          <p
            className={`text-neutral-400 max-w-sm text-lg transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            Nos enfocamos en producto y escalabilidad. Desarrollo de software de
            alto nivel, no sitios web genéricos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}

          {/* CTA Card with Spotlight Effect */}
          <CTACard index={services.length} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: `${index * 100 + 300}ms`,
        willChange: 'transform, opacity',
      }}
      className={`
        group relative overflow-hidden rounded-3xl p-px transition-all duration-300
        hover:shadow-[0_0_40px_-10px_rgba(204,255,0,0.4)]
        active:shadow-[0_0_40px_-10px_rgba(204,255,0,0.4)]
        ${service.span}
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Spinning Border Trail Effect */}
      <div
        className="
          absolute inset-[-1000%] animate-[spin_4s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#CCFF00_100%)] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />

      {/* Inner Content Card */}
      <div className="relative h-full w-full bg-[#111] rounded-[23px] overflow-hidden flex flex-col border border-white/5 group-hover:border-transparent group-active:border-transparent transition-colors p-8">
        {/* Interactive Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${service.spotlight}, transparent 80%)`,
          }}
        />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-[#CCFF00] group-active:text-[#CCFF00] group-hover:scale-110 group-active:scale-110 transition-all duration-300">
            <service.icon strokeWidth={1.5} className="w-6 h-6" />
          </div>

          <h4 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">
            {service.title}
          </h4>
          <p className="text-neutral-400 group-hover:text-neutral-300 group-active:text-neutral-300 transition-colors">
            {service.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-6 flex justify-end opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CTACard({ index, isInView }: { index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: `${index * 100 + 300}ms`,
        willChange: 'transform, opacity',
      }}
      className={`
        group relative overflow-hidden rounded-3xl p-px transition-all duration-300
        hover:shadow-[0_0_40px_-10px_rgba(204,255,0,0.4)]
        active:shadow-[0_0_40px_-10px_rgba(204,255,0,0.4)]
        md:col-span-1
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Spinning Border Trail Effect (always lime for CTA) */}
      <div
        className="
          absolute inset-[-1000%] animate-[spin_4s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#CCFF00_100%)] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />

      {/* Inner Content Card */}
      <div className="relative h-full w-full bg-[#111] rounded-[23px] overflow-hidden flex flex-col border border-[#CCFF00]/20 group-hover:border-transparent group-active:border-transparent transition-colors p-8 shadow-[inset_0_0_20px_rgba(204,255,0,0.05)]">
        {/* Interactive Spotlight Overlay for CTA */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(204, 255, 0, 0.12), transparent 80%)`,
          }}
        />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-lg bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center mb-6 text-[#CCFF00]">
            <ArrowUpRight strokeWidth={2} className="w-6 h-6" />
          </div>

          <h4 className="text-2xl font-bold text-white mb-3">
            ¿Listo para transformar <br /> tu negocio?
          </h4>
          <p className="text-neutral-400">
            Hablemos sobre cómo la ingeniería de software puede potenciar tus
            procesos.
          </p>
        </div>

        <div className="relative z-10 mt-8">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-[#CCFF00] hover:bg-[#b3e600] text-black px-6 py-3 rounded-full font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Agendar Estrategia
          </a>
        </div>
      </div>
    </div>
  );
}
