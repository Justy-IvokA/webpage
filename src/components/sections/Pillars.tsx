'use client';

import React from 'react';
import Image from 'next/image';
import { assetPath } from '@/lib/asset-path';
import { CpuChipIcon, HeartIcon, ChartBarIcon } from '@/components/icons';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

const pillarsData: Pillar[] = [
  {
    icon: <CpuChipIcon />,
    title: 'Inteligencia Artificial Aplicada',
    description: 'Domina las plataformas más innovadoras para crear contenido, diseños, audio y video con un impacto real. Transforma ideas en proyectos tangibles.',
    image: '/ia.png',
    gradientFrom: 'from-cyan-500/90',
    gradientTo: 'to-blue-600/90',
    accentColor: 'cyan',
  },
  {
    icon: <HeartIcon />,
    title: 'Desarrollo Humano',
    description: 'Potencia tu voz, aprende a contar historias que inspiran y construye relaciones más fuertes. Conviértete en un comunicador seguro y eficaz.',
    image: '/dp.png',
    gradientFrom: 'from-pink-500/90',
    gradientTo: 'to-rose-600/90',
    accentColor: 'pink',
  },
  {
    icon: <ChartBarIcon />,
    title: 'Finanzas Personales Prácticas',
    description: 'Toma el control de tu dinero con herramientas sencillas para eliminar el estrés financiero y construir una base sólida para tu futuro.',
    image: '/fp.jpg',
    gradientFrom: 'from-emerald-500/90',
    gradientTo: 'to-green-600/90',
    accentColor: 'emerald',
  },
];

interface PillarCardProps {
  pillar: Pillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <div
      data-pillar-card
      data-index={index}
      className="pillar-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pillar-image-wrapper w-full h-full transition-transform duration-700 group-hover:scale-110">
          <Image
            src={assetPath(pillar.image)}
            alt={pillar.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index === 0}
          />
        </div>
        
        {/* Gradient Overlay - darker at bottom for text readability */}
        <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradientFrom} ${pillar.gradientTo} mix-blend-multiply transition-opacity duration-500 group-hover:opacity-95`} />
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full min-h-[480px] flex flex-col justify-between p-8">
        {/* Top Section - Icon */}
        <div className="flex justify-between items-start">
          <div
            data-pillar-icon
            className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/20"
          >
            <div className="text-white [&>svg]:w-8 [&>svg]:h-8">
              {pillar.icon}
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            Explorar
          </div>
        </div>

        {/* Bottom Section - Text Content */}
        <div className="space-y-4">
          {/* Title */}
          <h3
            data-pillar-title
            className="text-3xl font-bold text-white leading-tight transition-all duration-300 group-hover:translate-x-1"
          >
            {pillar.title}
          </h3>

          {/* Description */}
          <p
            data-pillar-description
            className="text-white/90 leading-relaxed text-base transition-all duration-300 group-hover:text-white"
          >
            {pillar.description}
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-3 pt-2">
            <div className="h-1 w-0 bg-white rounded-full transition-all duration-500 group-hover:w-16" />
            <span className="text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              Descubre más
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16" />
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export function Pillars() {
  return (
    <section
      id="pillars"
      className="pillars-section relative w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-element absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute bottom-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            data-pillar-main-title
            data-team-title
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-primary-400 to-destructive-400"
          >
            La Trinidad de tu Evolución
          </h2>
          <p
            data-pillar-subtitle
            className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
          >
            Todo en Ivoka se construye sobre tres áreas fundamentales que se nutren y potencian entre sí, creando un crecimiento integral.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          data-pillars-grid
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pillarsData.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Decorative connecting lines between pillars (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px pointer-events-none">
          <div className="max-w-7xl mx-auto relative h-full">
            <div className="absolute top-0 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.bg-element) {
          animation: float-slow 8s ease-in-out infinite;
        }

        :global(.bg-element:nth-child(2)) {
          animation-delay: -2s;
          animation-duration: 10s;
        }

        :global(.bg-element:nth-child(3)) {
          animation-delay: -4s;
          animation-duration: 12s;
        }

        :global(.animate-shimmer) {
          animation: shimmer 3s ease-in-out infinite;
        }

        .pillar-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .pillar-card::after {
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

        .pillar-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

export default Pillars;
