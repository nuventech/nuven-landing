'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { ArrowUpRight, CheckCircle2, Mail, Phone, XCircle } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { InstagramIcon } from '@/src/components/common/icons/InstagramIcon';
import { siteConfig } from '@/src/constants/site';
import { useInView } from '@/src/hooks/useInView';

export function Contact() {
  const { email, phone, formatedPhone, links } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    descripcion: '',
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMessage('Por favor, completa la verificación de seguridad.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Algo salió mal. Por favor intenta de nuevo.',
        );
      }

      setStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', descripcion: '' });
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al enviar el mensaje',
      );
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Headline & Contact */}
          <div
            className={`transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                Contacto
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-8">
              Transformar tu empresa está a{' '}
              <span className="text-neutral-400 italic font-serif">
                una llamada
              </span>{' '}
              de distancia.
            </h2>

            <div className="space-y-6">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#CCFF00] group-active:bg-[#CCFF00] group-hover:text-black group-active:text-black group-hover:border-[#CCFF00] group-active:border-[#CCFF00] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform duration-300">
                  {email}
                </span>
              </a>
              <a
                href={`tel:${phone}`}
                className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#CCFF00] group-active:bg-[#CCFF00] group-hover:text-black group-active:text-black group-hover:border-[#CCFF00] group-active:border-[#CCFF00] transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform duration-300">
                  {formatedPhone}
                </span>
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#CCFF00] group-active:bg-[#CCFF00] group-hover:text-black group-active:text-black group-hover:border-[#CCFF00] group-active:border-[#CCFF00] transition-all">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <span className="text-lg group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform duration-300">
                  @nuven.tech
                </span>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`bg-[#111] border border-white/10 rounded-2xl p-8 transition-all duration-700 delay-200 shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(204,255,0,0.4)] ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-[#CCFF00]" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-neutral-400 max-w-sm">
                  Gracias por contactarnos. Nuestro equipo revisará tu mensaje y
                  se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[#CCFF00] hover:underline font-medium"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="text-xs uppercase tracking-wider text-neutral-400"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-wider text-neutral-400"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="telefono"
                    className="text-xs uppercase tracking-wider text-neutral-400"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    disabled={status === 'loading'}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="descripcion"
                    className="text-xs uppercase tracking-wider text-neutral-400"
                  >
                    ¿Cómo podemos ayudarte?
                  </label>
                  <textarea
                    id="descripcion"
                    rows={4}
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/50 outline-none transition-all resize-none disabled:opacity-50"
                  />
                </div>

                <div className="py-2">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={
                      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                      '1x00000000000000000000AA'
                    }
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => {
                      setTurnstileToken(null);
                      setErrorMessage(
                        'Error al cargar Turnstile. Por favor recarga la página.',
                      );
                    }}
                    options={{
                      theme: 'dark',
                    }}
                    className="flex justify-center"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#CCFF00] text-black py-4 rounded-lg font-bold hover:bg-[#bbe000] active:bg-[#bbe000] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Solicitar Consultoría
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
