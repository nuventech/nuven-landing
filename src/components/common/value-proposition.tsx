'use client';

import { motion, useInView } from 'framer-motion';
import { Code2, Target, Zap } from 'lucide-react';
import { useRef } from 'react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="estrategia"
      className="py-24 sm:py-32 bg-[#050505] relative"
      ref={ref}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
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
          </motion.div>

          {/* Abstract visual element */}
          <div className="hidden lg:block relative h-full min-h-[200px]">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#CCFF00] blur-[100px] opacity-10 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.15 }}
              className="group p-8 border-t border-white/10 hover:border-[#CCFF00] transition-colors duration-300 relative"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
