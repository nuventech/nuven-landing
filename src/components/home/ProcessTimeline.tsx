'use client';

import { Code, Map, Rocket, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { useInView } from '@/src/hooks/useInView';

const processSteps = [
  {
    icon: Search,
    title: '1. Diagnóstico e Inmersión',
    description:
      'Analizamos tu dolor antes de escribir una línea de código. Auditoría de sistemas y detección de cuellos de botella.',
  },
  {
    icon: Map,
    title: '2. Arquitectura y Planificación',
    description:
      'Diseño de solución escalable. Selección de stack tecnológico y plan de entrega por hitos claros.',
  },
  {
    icon: Code,
    title: '3. Desarrollo Iterativo',
    description:
      'Sprints quincenales con entregables tangibles. Validation continua para ajustar el rumbo tempranamente.',
  },
  {
    icon: ShieldCheck,
    title: '4. Aseguramiento de Calidad',
    description:
      'Tests automatizados y revisiones estrictas para garantizar un sistema blindado y estable antes del despliegue.',
  },
  {
    icon: Rocket,
    title: '5. Despliegue y Evolución',
    description:
      'Lanzamiento controlado y monitoreo post-implementación. Iteración constante basada en datos de uso.',
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef({ top: 0, bottom: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      dimensionsRef.current = {
        top: rect.top + scrollY,
        bottom: rect.bottom + scrollY,
        height: rect.height,
      };
    };

    const handleScroll = () => {
      if (!progressLineRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const { top, height } = dimensionsRef.current;

      const start = top - windowHeight;
      const total = height + windowHeight;

      let progress = (scrollY - start) / total;
      progress = Math.max(0, Math.min(1, progress));

      progressLineRef.current.style.transform = `translateX(-50%) scaleY(${progress})`;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="proceso"
      className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden section-optimized"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
              Workflow
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Transparencia Absoluta, <br />
            <span className="text-neutral-500">sin cajas negras.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line (Background) */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2" />

          {/* Vertical Connecting Line (Active Progress) */}
          <div
            ref={progressLineRef}
            style={{
              transform: 'translateX(-50%) scaleY(0)',
              transformOrigin: 'top',
              willChange: 'transform',
            }}
            className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#CCFF00] via-[#CCFF00] to-transparent"
          />

          <div className="space-y-12 sm:space-y-24">
            {processSteps.map((step, index) => (
              <TimelineItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Define the type for the Lucide icon component
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

function TimelineItem({ step, index }: { step: Step; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 items-start sm:items-center transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Content Side */}
      <div
        className={`w-full sm:w-1/2 pl-20 sm:pl-0 ${isEven ? 'sm:pr-16 text-left sm:text-right' : 'sm:pl-16 text-left'}`}
      >
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3 sm:inline-flex">
          {step.title}
        </h3>
        <p className="text-neutral-400 leading-relaxed text-base sm:text-lg">
          {step.description}
        </p>
      </div>

      {/* Center Icon Point */}
      <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 sm:-translate-x-1/2 w-14 h-14 rounded-full bg-[#111] border border-neutral-800 flex items-center justify-center z-10 group hover:border-[#CCFF00] transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[#CCFF00] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300 pointer-events-none" />
        <step.icon
          width={24}
          height={24}
          strokeWidth={1.5}
          className="w-6 h-6 text-white group-hover:text-[#CCFF00] transition-colors"
        />
      </div>

      {/* Empty Side for layout balance on desktop */}
      <div className="hidden sm:block w-1/2" />
    </div>
  );
}
