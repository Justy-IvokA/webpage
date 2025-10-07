'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, Target, Users, Award, Heart, Lightbulb, Brain, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { useAppStore } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string;
  listItems?: string[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  image?: string;
}

export default function ManifestoPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('introduccion');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const { ui } = useAppStore();
  const animated = true;

  const manifestoSections: ManifestoSection[] = [
    {
      id: 'introduccion',
      title: t('manifesto.introduccion.title'),
      subtitle: 'Introducción',
      icon: <BookOpen className="h-8 w-8" />,
      content: t('manifesto.introduccion.content'),
      gradientFrom: 'from-blue-500/90',
      gradientTo: 'to-cyan-600/90',
      accentColor: 'cyan',
      image: '/images/3d_space_5.jpg'
    },
    {
      id: 'vision',
      title: t('manifesto.esencia.vision.title'),
      subtitle: 'Visión',
      icon: <Target className="h-8 w-8" />,
      content: t('manifesto.esencia.vision.content'),
      gradientFrom: 'from-purple-500/90',
      gradientTo: 'to-pink-600/90',
      accentColor: 'purple',
      image: '/images/ia.png'
    },
    {
      id: 'mision',
      title: t('manifesto.esencia.mision.title'),
      subtitle: 'Misión',
      icon: <Users className="h-8 w-8" />,
      content: t('manifesto.esencia.mision.content'),
      gradientFrom: 'from-emerald-500/90',
      gradientTo: 'to-teal-600/90',
      accentColor: 'emerald',
      image: '/images/dp.png'
    },
    {
      id: 'principios',
      title: t('manifesto.esencia.principios.title'),
      subtitle: 'Principios',
      icon: <Award className="h-8 w-8" />,
      content: '',
      listItems: [
        t('manifesto.esencia.principios.primero_lo_humano.title'),
        t('manifesto.esencia.principios.hacer_es_aprender.title'),
        t('manifesto.esencia.principios.familia_acompanante.title'),
        t('manifesto.esencia.principios.simplicidad_aplicada.title')
      ],
      gradientFrom: 'from-orange-500/90',
      gradientTo: 'to-red-600/90',
      accentColor: 'orange',
      image: '/images/fp.jpg'
    },
    {
      id: 'pilares',
      title: t('manifesto.pilares.title'),
      subtitle: 'Pilares',
      icon: <Brain className="h-8 w-8" />,
      content: t('manifesto.pilares.descripcion'),
      listItems: [
        t('manifesto.pilares.inteligencia_artificial.title'),
        t('manifesto.pilares.desarrollo_humano.title'),
        t('manifesto.pilares.finanzas_personales.title')
      ],
      gradientFrom: 'from-indigo-500/90',
      gradientTo: 'to-blue-600/90',
      accentColor: 'indigo',
      image: '/images/ia.png'
    },
    {
      id: 'promesa',
      title: t('manifesto.promesa.title'),
      subtitle: 'Promesa',
      icon: <Lightbulb className="h-8 w-8" />,
      content: t('manifesto.promesa.content'),
      gradientFrom: 'from-amber-500/90',
      gradientTo: 'to-yellow-600/90',
      accentColor: 'amber',
      image: '/images/dp.png'
    },
    {
      id: 'cierre',
      title: t('manifesto.cierre.title'),
      subtitle: 'Cierre',
      icon: <Sparkles className="h-8 w-8" />,
      content: t('manifesto.cierre.content'),
      gradientFrom: 'from-rose-500/90',
      gradientTo: 'to-pink-600/90',
      accentColor: 'rose',
      image: '/images/3d_space_5.jpg'
    }
  ];

  // GSAP animations
  useEffect(() => {
    if (!ui.animationsEnabled) return;

    manifestoSections.forEach((section, index) => {
      const element = sectionRefs.current[section.id];
      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ui.animationsEnabled, manifestoSections]);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of manifestoSections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [manifestoSections]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <Navbar />

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-element absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute bottom-40 right-20 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={`absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] ${
            animated ? 'animated-grid-manifesto' : 'static-grid-manifesto'
          }`}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Nuestro Manifiesto</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
              {t('manifesto.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('manifesto.lema')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-8 py-6 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.5)] transition-all duration-300"
                onClick={() => scrollToSection('introduccion')}
              >
                Explorar Manifiesto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sticky Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-72 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full" />
                Navegación
              </h3>
              <nav aria-label="Índice del manifiesto">
                <ul className="space-y-2">
                  {manifestoSections.map((section, index) => (
                    <motion.li
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className={`transition-transform duration-300 ${
                          activeSection === section.id ? 'scale-110 text-cyan-400' : 'group-hover:scale-110'
                        }`}>
                          {section.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{section.subtitle}</div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                          activeSection === section.id ? 'rotate-90 text-cyan-400' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.aside>

          {/* Manifesto Cards Grid */}
          <div className="lg:flex-1 space-y-8">
            {manifestoSections.map((section, index) => (
              <article
                key={section.id}
                ref={(el) => {sectionRefs.current[section.id] = el}}
                id={section.id}
                className="manifesto-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl scroll-mt-28"
                onMouseEnter={() => setHoveredCard(section.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image with Parallax */}
                {section.image && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 75vw"
                        priority={index === 0}
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.gradientFrom} ${section.gradientTo} mix-blend-multiply transition-opacity duration-500 group-hover:opacity-95`} />
                    
                    {/* Dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                    
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <motion.div
                      className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/20"
                      animate={hoveredCard === section.id ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">
                        {section.icon}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2 transition-all duration-300 group-hover:translate-x-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {section.title}
                      </motion.h2>
                      <div className="inline-flex px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold">
                        {section.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {section.content && (
                      <motion.p
                        className="text-lg text-white/90 leading-relaxed whitespace-pre-line transition-all duration-300 group-hover:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                      </motion.p>
                    )}

                    {section.listItems && (
                      <ul className="space-y-4">
                        {section.listItems.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 group/item"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-white/20">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <span className="text-white/90 text-base leading-relaxed pt-1 transition-all duration-300 group-hover/item:text-white group-hover/item:translate-x-1">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* Decorative line */}
                    <div className="flex items-center gap-3 pt-4">
                      <div className="h-1 w-0 bg-white rounded-full transition-all duration-500 group-hover:w-20" />
                      <span className="text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {index < manifestoSections.length - 1 ? 'Continuar leyendo' : 'Únete a nosotros'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-20 translate-x-20" />
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-8">
              <Heart className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Únete a la Comunidad</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              ¿Listo para Transformar tu Futuro?
            </h2>
            
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Si compartes nuestra visión y valores, te invitamos a ser parte de nuestra comunidad transformadora.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-10 py-6 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.5)] transition-all duration-300"
                onClick={() => { window.location.href = '/registro'; }}
              >
                {t('register.form.submit')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 text-lg px-10 py-6 backdrop-blur-sm transition-all duration-300"
                onClick={() => { window.location.href = '/galeria'; }}
              >
                Ver Galería
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer showStats={false} />

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes animate-grid-manifesto {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        :global(.bg-element) {
          animation: float-slow 10s ease-in-out infinite;
        }

        :global(.bg-element:nth-child(2)) {
          animation-delay: -3s;
          animation-duration: 12s;
        }

        :global(.bg-element:nth-child(3)) {
          animation-delay: -6s;
          animation-duration: 14s;
        }

        :global(.animate-shimmer) {
          animation: shimmer 3s ease-in-out infinite;
        }

        :global(.animated-grid-manifesto) {
          width: 200%;
          height: 200%;
          background-image:
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
          background-size: 50px 50px;
          animation: animate-grid-manifesto 40s linear infinite alternate;
        }

        :global(.static-grid-manifesto) {
          width: 200%;
          height: 200%;
          background-image:
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .manifesto-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 2px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .manifesto-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}