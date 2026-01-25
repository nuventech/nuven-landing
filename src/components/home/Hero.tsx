'use client';

import gsap from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if we are on desktop for 3D logic
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      // INTRO ANIMATION
      const tl = gsap.timeline();

      // 1. Initial State: Chaos
      // Set blocks to random 3D positions
      blocksRef.current.forEach((block) => {
        if (!block) return;
        gsap.set(block, {
          x: gsap.utils.random(-300, 300),
          y: gsap.utils.random(-300, 300),
          z: isDesktop ? gsap.utils.random(-500, 200) : 0,
          rotationX: isDesktop ? gsap.utils.random(-180, 180) : 0,
          rotationY: isDesktop ? gsap.utils.random(-180, 180) : 0,
          opacity: 0,
          scale: 0,
        });
      });

      // Set text initial state
      gsap.set('.hero-fade-in', { opacity: 0, y: 20 });

      // 2. Animate to Order (The Grid) - 1s total
      tl.to(blocksRef.current, {
        opacity: 0.8,
        scale: 1,
        duration: 0.2,
        stagger: {
          amount: 0.25,
          from: 'random',
        },
      }).to(
        blocksRef.current,
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power4.inOut',
          stagger: {
            amount: 0.15,
            grid: [4, 4],
            from: 'center',
          },
        },
        '-=0.1',
      );

      // 3. Text Fade In - starts at position 0 (parallel with grid animation)
      tl.to(
        '.hero-fade-in',
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
        },
        0, // Start at the beginning of the timeline
      );

      // 4. Continuous Floating "Breathing" Animation (Only if performance allows, or keep simple)
      tl.to(gridRef.current, {
        y: -15,
        rotationX: isDesktop ? 5 : 0,
        rotationY: isDesktop ? -5 : 0,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Mouse Parallax Interaction - ONLY DESKTOP
      if (isDesktop) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 20;
          const yPos = (clientY / window.innerHeight - 0.5) * 20;

          gsap.to(gridRef.current, {
            rotationY: xPos,
            rotationX: -yPos,
            duration: 1,
            ease: 'power2.out',
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate grid of blocks (16 blocks for a 4x4 grid)
  const blocks = Array.from({ length: 16 }, (_, i) => i);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center pt-36 lg:pt-50 pb-12 lg:pb-0 overflow-hidden bg-[#050505] selection:bg-[#CCFF00] selection:text-black"
    >
      {/* Ambient Background Glows - NO BLURS, use radial gradients for similar effect with better performance */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(204,255,0,0.05)_0%,transparent_70%)] opacity-20 md:animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(204,255,0,0.05)_0%,transparent_70%)] opacity-20" />

      {/* Mobile Animated Gradient Background - NO FRAMER MOTION */}
      <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.08),transparent_70%)] opacity-50 animate-slow-spin" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0.6),transparent_70%)] opacity-50 animate-slow-spin-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit hero-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                Software Development
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight text-balance">
              <span className="block hero-fade-in">
                Transformamos el{' '}
                <span className="text-neutral-500 font-serif italic">
                  caos{' '}
                </span>
                en{' '}
                <span className="text-[#CCFF00]">sistemas inteligentes.</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl hero-fade-in">
              Convertimos procesos manuales en software de alto impacto. Escalá
              tu negocio con tecnología real, eliminando la dependencia de hojas
              de cálculo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 hero-fade-in">
              <a
                href="#contacto"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-[#CCFF00] text-black px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_30px_rgba(204,255,0,0.4)]"
              >
                <span className="relative flex items-center gap-2 z-10">
                  Agendar Estrategia{' '}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#proyectos"
                className="w-full sm:w-auto group relative px-8 py-4 rounded-full font-bold text-base text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 group-hover:border-[#CCFF00]/50 group-hover:text-[#CCFF00]">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                <span className="relative z-10 group-hover:text-[#CCFF00] transition-colors">
                  Nuestros Casos
                </span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-400 mt-4 hero-fade-in">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full border border-black bg-neutral-900 overflow-hidden"
                  >
                    {/* Placeholder for missing logos to avoid 404s and layout shifts */}
                    <div
                      className={`w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center`}
                    >
                      <span className="text-[8px] text-neutral-600 font-bold">
                        {i}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p>Confían en nosotros +20 empresas líderes</p>
            </div>
          </div>

          {/* GSAP 3D Animation Container - Move to absolute background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 perspective-[1000px] pointer-events-none opacity-40 lg:opacity-60 overflow-visible">
            {/* The ordered grid that forms */}
            <div
              ref={gridRef}
              className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] transform-style-3d opacity-50"
            >
              <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full h-full">
                {blocks.map((i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) blocksRef.current[i] = el;
                    }}
                    className="
                      relative w-full h-full rounded-xl
                      bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]
                      border border-white/10 
                      shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
                      group
                    "
                  >
                    {/* Inner highlight - slightly stronger for depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                    {/* Fake UI lines */}
                    <div className="absolute top-2 left-2 right-2 h-[1px] bg-white/10 rounded-full" />
                    <div className="absolute top-4 left-2 w-1/2 h-[1px] bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Decorative floating elements behind */}
              <div className="absolute -z-10 inset-[-20%] bg-[radial-gradient(circle,rgba(204,255,0,0.1)_0%,transparent_70%)] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
