'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- Data & Types ---

const testimonials = [
  {
    quote:
      "Ivoka transformó completamente mi relación con la inteligencia artificial. Pasé de tener miedo a la tecnología a usarla como una extensión de mi creatividad. Ahora creo contenido que antes solo imaginaba.",
    name: "María Fernanda Gutiérrez",
    designation: "Creadora de Contenido Digital",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Lo que más valoro de Ivoka es la comunidad. No es solo aprender IA, es encontrar una tribu que te acompaña, celebra tus logros y te impulsa cuando más lo necesitas. Aquí encontré amigos y futuros socios.",
    name: "Carlos Alberto Mendoza",
    designation: "Emprendedor Digital",
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Gracias a Ivoka logré poner orden en mis finanzas personales y ahora tengo claridad y paz mental. El enfoque práctico me permitió aplicar lo aprendido desde el primer día. Es un cambio de vida real.",
    name: "Sofía Valentina Torres",
    designation: "Consultora de Negocios",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "El pilar de desarrollo humano me ayudó a encontrar mi voz auténtica y mejorar radicalmente mi comunicación. La IA es poderosa, pero descubrí que mi humanidad es mi verdadero superpoder.",
    name: "Diego Alejandro Ramírez",
    designation: "Coach de Liderazgo",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Ivoka hace que lo complejo sea simple. El aprendizaje es 100% práctico: retos, mini-proyectos y acción inmediata. En pocas semanas, mis proyectos que solo imaginaba ahora son una realidad tangible.",
    name: "Alejandra Beatriz Silva",
    designation: "Diseñadora UX/UI",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// --- Main Animated Testimonials Component ---
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/500x500/e2e8f0/64748b?text=${testimonial.name.charAt(0)}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonials[active].designation}
                </p>
                <motion.p className="mt-8 text-lg text-slate-700 dark:text-slate-300">
                  "{testimonials[active].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-500"
            >
              <ArrowLeft className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover:-translate-x-1 dark:text-slate-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-500"
            >
              <ArrowRight className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Demo Component ---
function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

// --- Main App Component ---
export function Testimonials({ animated = true }: { animated?: boolean }) {
  return (
    <section
      id="testimonials"
      className="relative w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated grid background */}
      <style>
        {`
          @keyframes animate-grid {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animated-grid {
            width: 200%;
            height: 200%;
            background-image: 
              linear-gradient(to right, #06b6d4 1px, transparent 1px), 
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
            background-size: 50px 50px;
            animation: animate-grid 40s linear infinite alternate;
          }
          .static-grid {
            background-image: 
              linear-gradient(to right, #06b6d4 1px, transparent 1px), 
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}
      </style>
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none ${
          animated ? 'animated-grid' : 'static-grid inset-0'
        }`}
      />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-primary-400 to-destructive-400">
            Voces de Nuestra Comunidad
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo Ivoka ha transformado la vida de personas como tú, potenciando su creatividad y desbloqueando su verdadero potencial.
          </p>
        </div>

        {/* Content */}
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
}
