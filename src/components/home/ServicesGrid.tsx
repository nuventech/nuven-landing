'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Database,
  Layers,
  Monitor,
  Plug,
  ShoppingCart,
} from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: Layers,
    title: 'Sistemas de Gestión & ERP',
    description:
      'Centralización operativa. Dashboards en tiempo real, control de inventario y gestión de recursos.',
    span: 'md:col-span-2',
    gradient: 'from-[#CCFF00]/20 to-green-500/20',
  },
  {
    icon: Monitor,
    title: 'Aplicaciones Web & Desktop',
    description:
      'PWA y aplicaciones de escritorio con tecnologías modernas como Electron.',
    span: 'md:col-span-1',
    gradient: 'from-zinc-500/20 to-neutral-500/20',
  },
  {
    icon: ShoppingCart,
    title: 'Comercio Electrónico Avanzado',
    description: 'Plataformas de alta conversión y rendimiento optimizado.',
    span: 'md:col-span-1',
    gradient: 'from-stone-500/20 to-neutral-500/20',
  },
  {
    icon: Database,
    title: 'Infraestructura Cloud',
    description:
      'Despliegue escalable en AWS/GCP. Contenerización y orquestación con Docker y Kubernetes.',
    span: 'md:col-span-1',
    gradient: 'from-slate-500/20 to-gray-500/20',
  },
  {
    icon: Plug,
    title: 'Integración de Sistemas',
    description:
      'Conectividad total con pasarelas de pago, organismos fiscales y software de terceros.',
    span: 'md:col-span-2',
    gradient: 'from-emerald-500/20 to-[#CCFF00]/10',
  },
];

export function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="servicios"
      className="py-32 relative content-visibility-auto"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CCFF00]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-mono text-[#CCFF00] mb-4 tracking-wider uppercase">
              Nuestras Soluciones
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Soluciones de Ingeniería <br /> para Desafíos Complejos.
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 max-w-sm text-lg"
          >
            Nos enfocamos en producto y escalabilidad. Desarrollo de software de
            alto nivel, no sitios web genéricos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group relative overflow-hidden rounded-2xl border border-white/10 
                bg-white/5 hover:bg-white/10 transition-colors duration-500
                backdrop-blur-sm p-8 flex flex-col justify-between h-full min-h-[300px]
                ${service.span}
              `}
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-[#CCFF00] group-hover:scale-110 transition-all duration-300">
                  <service.icon strokeWidth={1.5} className="w-6 h-6" />
                </div>

                <h4 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h4>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
