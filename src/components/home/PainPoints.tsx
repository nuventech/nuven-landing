'use client';

import { AlertCircle, FileSpreadsheet, Network } from 'lucide-react';
import { useRef } from 'react';

import { useInView } from '@/src/hooks/useInView';

const problems = [
  {
    icon: FileSpreadsheet,
    title: 'Dependencia de Hojas de Cálculo',
    description:
      'Tu información crítica está fragmentada, dificultando la escalabilidad y la toma de decisiones.',
  },
  {
    icon: Network,
    title: 'Desconexión de Herramientas',
    description:
      'Tus plataformas no se integran, generando duplicidad de tareas y pérdida de eficiencia.',
  },
  {
    icon: AlertCircle,
    title: 'Ineficiencia Operativa',
    description:
      'Los procesos manuales derivan en errores constantes, datos inconsistentes y una experiencia de cliente deficiente.',
  },
];

export function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="desafios"
      className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden section-optimized"
      ref={ref}
    >
      {/* Background decoration - Optimized without blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(204,255,0,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2
            className={`text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            ¿Tu infraestructura <span className="text-[#CCFF00]">limita</span>{' '}
            tu expansión?
          </h2>
          <p
            className={`text-xl text-neutral-400 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Identificamos los indicadores clave que señalan la necesidad de una
            transformación digital profunda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 150 + 500}ms` }}
              className={`group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-500 hover:bg-white/10 relative overflow-hidden ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#CCFF00] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              <div className="w-14 h-14 rounded-full bg-neutral-800/80 flex items-center justify-center mb-6 group-hover:bg-[#CCFF00]/10 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-white group-hover:text-[#CCFF00] transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
