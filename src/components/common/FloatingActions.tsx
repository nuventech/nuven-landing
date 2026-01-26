'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { WhatsAppIcon } from '@/src/components/common/icons/WhatsAppIcon';
import { whatsappUrl } from '@/src/constants/site';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          w-14 h-14 rounded-full bg-[#CCFF00] text-black
          flex items-center justify-center shadow-[0_8px_32px_rgba(204,255,0,0.3)]
          hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer
          ${
            showTop
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0 pointer-events-none'
          }
        `}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-14 h-14 rounded-full bg-[#25D366] text-white
          flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.4)]
          hover:scale-110 active:scale-95 transition-all duration-300
          group
        "
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          ¿En qué puedo ayudarte?
        </span>
      </a>
    </div>
  );
}
