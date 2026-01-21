'use client';

import gsap from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // INTRO ANIMATION
      const tl = gsap.timeline();

      // 1. Initial State: Chaos
      // Set blocks to random 3D positions
      blocksRef.current.forEach((block) => {
        if (!block) return;
        gsap.set(block, {
          x: gsap.utils.random(-300, 300),
          y: gsap.utils.random(-300, 300),
          z: gsap.utils.random(-500, 200),
          rotationX: gsap.utils.random(-180, 180),
          rotationY: gsap.utils.random(-180, 180),
          opacity: 0,
          scale: 0,
        });
      });

      // Set text initial state
      gsap.set('.hero-fade-in', { opacity: 0, y: 20 });

      // 2. Animate to Order (The Grid)
      tl.to(blocksRef.current, {
        opacity: 0.8,
        scale: 1,
        duration: 0.5,
        stagger: {
          amount: 1,
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
          duration: 1.5,
          ease: 'power4.inOut',
          stagger: {
            amount: 0.5,
            grid: [4, 4],
            from: 'center',
          },
        },
        '-=0.2',
      );

      // 3. Text Fade In (Simpler & Faster)
      tl.to(
        '.hero-fade-in',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=1.0',
      );

      // 4. Continuous Floating "Breathing" Animation
      tl.to(gridRef.current, {
        y: -20,
        rotationX: 5,
        rotationY: -5,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Mouse Parallax Interaction
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate grid of blocks (16 blocks for a 4x4 grid)
  const blocks = Array.from({ length: 16 }, (_, i) => i);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505] selection:bg-[#CCFF00] selection:text-black"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#CCFF00]/5 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#CCFF00]/5 rounded-full blur-3xl opacity-20" />

      {/* Mobile Animated Gradient Background */}
      <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.1),transparent_70%)] animate-slow-spin-reverse opacity-50" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0.8),transparent_70%)] animate-slow-spin opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm hero-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                Software Development
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]">
              <span className="block hero-fade-in">
                Transformamos el{' '}
                <span className="text-neutral-500 font-serif italic">
                  caos{' '}
                </span>
                en{' '}
                <span className="text-[#CCFF00]">sistemas inteligentes.</span>
              </span>
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed max-w-4xl hero-fade-in">
              Convertimos procesos manuales en software de alto impacto. Escalá
              tu negocio con tecnología real, eliminando la dependencia de hojas
              de cálculo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 hero-fade-in">
              <a
                href="#contacto"
                className="group relative inline-flex items-center justify-center bg-[#CCFF00] text-black px-8 py-4 rounded-full font-bold text-base overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(204,255,0,0.3)]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              >
                {/* Spotlight Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.4) 0%, transparent 60%)',
                  }}
                />

                <span className="relative flex items-center gap-2 z-10">
                  Agendar Estrategia{' '}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#proyectos"
                className="group relative px-8 py-4 rounded-full font-bold text-base text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm overflow-hidden"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              >
                {/* Spotlight Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at var(--x) var(--y), rgba(204,255,0,0.15) 0%, transparent 60%)',
                  }}
                />

                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 group-hover:border-[#CCFF00]/50 group-hover:text-[#CCFF00]">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                <span className="relative z-10 group-hover:text-[#CCFF00] transition-colors">
                  Nuestros Casos
                </span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-400 mt-4 hero-fade-in">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full border border-black bg-gray-800 overflow-hidden"
                  >
                    <Image
                      src={`/images/companies/logo-${i}.png`}
                      alt={`Company ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Confían en nosotros +20 empresas líderes</p>
            </div>
          </div>

          {/* GSAP 3D Animation Container - HIDDEN ON MOBILE */}
          <div className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end perspective-[1000px]">
            {/* The ordered grid that forms */}
            <div
              ref={gridRef}
              className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] transform-style-3d"
            >
              <div className="grid grid-cols-4 gap-4 w-full h-full">
                {blocks.map((i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) blocksRef.current[i] = el;
                    }}
                    className="
                      relative w-full h-full rounded-lg 
                      bg-gradient-to-br from-[#1a1a1a] to-[#000] 
                      border border-white/10 
                      shadow-[0_0_15px_rgba(0,0,0,0.5)]
                      backdrop-blur-md
                      group
                    "
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                    {/* Fake UI lines to look like software */}
                    <div className="absolute top-2 left-2 right-2 h-[2px] bg-white/10 rounded-full" />
                    <div className="absolute top-4 left-2 w-1/2 h-[2px] bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Decorative floating elements behind */}
              <div className="absolute -z-10 inset-[-20%] bg-[#CCFF00]/5 blur-[80px] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
