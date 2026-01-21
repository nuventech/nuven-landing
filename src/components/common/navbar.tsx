'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { name: 'Desafíos', href: '#desafios' },
  { name: 'Estrategia', href: '#estrategia' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proceso', href: '#proceso' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            className={`
              relative mx-auto rounded-xl border border-white/10 
              transition-all duration-300 backdrop-blur-md p-2
              ${
                scrolled
                  ? 'bg-black/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]'
                  : 'bg-white/5 shadow-lg'
              }
            `}
          >
            <div className="flex items-center justify-between h-14 px-6">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <Image
                  src="/Logo web.svg"
                  alt="Nuven"
                  width={130}
                  height={29}
                  className="group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-neutral-400 hover:text-[#CCFF00] text-sm font-medium transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CCFF00] transition-all group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <a
                  href="#contacto"
                  className="bg-[#CCFF00] hover:bg-[#b3e600] text-black px-6 py-2 rounded-full font-semibold text-sm transition-all hover:shadow-[0_0_15px_rgba(204,255,0,0.3)] transform hover:-translate-y-0.5"
                >
                  Agendar Estrategia
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white hover:text-[#CCFF00] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6 items-center">
              {NAV_LINKS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-medium text-white/90 hover:text-[#CCFF00]"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 bg-[#CCFF00] text-black px-8 py-3 rounded-full font-bold text-lg w-full text-center"
              >
                Agendar Estrategia
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
