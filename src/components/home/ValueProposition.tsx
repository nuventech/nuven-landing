'use client';

import { Code2, Target, Zap } from 'lucide-react';
import { useRef } from 'react';

import { useInView } from '@/src/hooks/useInView';

const features = [
  {
    title: 'Consultoría de Producto',
    description:
      'Entendemos tu modelo de negocio para construir la herramienta exacta, eliminando lo superfluo y maximizando el valor.',
    icon: Target,
  },
  {
    title: 'Ingeniería de Software',
    description:
      'Arquitecturas robustas y escalables, diseñadas milimétricamente para optimizar tus procesos operativos.',
    icon: Code2,
  },
  {
    title: 'Soporte y Escalamiento',
    description:
      'Acompañamos el ciclo de vida de tu plataforma, iterando y mejorando basándonos en métricas reales.',
    icon: Zap,
  },
];

export function ValueProposition() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="estrategia"
      className="py-24 sm:py-32 bg-[#050505] relative section-optimized"
      ref={ref}
    >
      {/* Subtle grid background - Optimized without mask-image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,#050505_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div
            className={`transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl font-bold text-white leading-none mb-6">
              Software diseñado a la medida de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#9eff00]">
                tu visión
              </span>
              .
            </h2>
            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
              Superamos el desarrollo convencional. Ingeniería transparente
              centrada en resultados tangibles, sin tecnicismos innecesarios.
            </p>
          </div>

          {/* Abstract visual element - Optimized without blurs */}
          <div className="hidden lg:block relative h-full min-h-[200px]">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle,rgba(204,255,0,0.08)_0%,transparent_70%)] opacity-10 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 150 + 400}ms` }}
              className={`group p-8 border-t border-white/10 hover:border-[#CCFF00] transition-all duration-500 relative ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute top-0 right-0 w-px h-10 bg-gradient-to-b from-white/10 to-transparent group-hover:from-[#CCFF00] transition-colors" />

              <feature.icon
                className="w-12 h-12 text-[#CCFF00] mb-6"
                strokeWidth={1}
              />
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
