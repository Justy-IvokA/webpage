'use client';

import React, { useState } from 'react';
import { assetPath } from '@/lib/asset-path';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  video: string;
  bio: string;
}

// Team members data - you can expand this array with more members
const teamMembers: TeamMember[] = [
    {
        id: 'ssdv',
        name: 'Sergio Sánchez del V.',
        role: 'IA, APPs & Programación ',
        image: '/images/equipo_SSDV.jpg',
        video: '/videos/equipo_SSDV.mp4',
        bio: "Apasionado por las nuevas tecnologías, con más de 30 años de experiencia en el desarrollo de soluciones digitales que impulsen la eficiencia y mejoren la experiencia del usuario. Hoy mi enfoque está en la inteligencia artificial y la automatización, aplicando innovación con propósito."
    },
    {
        id: 'vama',
        name: 'Víctor A. Mancera A.',
        role: 'Desarrollo Personal',
        image: '/images/equipo_VAMA.jpg',
        video: '/videos/equipo_VAMA.mp4',
        bio: "Mentor de líderes y speaker apasionado por el desarrollo humano y los negocios éticos. Ayudo a personas y equipos a construir libertad, propósito y resultados sostenibles a través de liderazgo consciente y estrategias empresariales efectivas."
    },
    {
        id: 'lsgp',
        name: 'Lorena Soto',
        role: 'Finanzas Personales',
        image: '/images/equipo_lorena.jpg',
        video: '/videos/equipo_lorena.mp4',
        bio: "Apasionada del emprendimiento y las estrategias de negocio. Fortaleza: las relaciones públicas, en donde he impulsado proyectos innovadores y creado alianzas estratégicas potenciando crecimiento organizacional. Combina la sensibilidad de la psicología con la determinación del mundo empresarial."
    },
    {
        id: 'vemg',
        name: 'Eduardo Mancera G.',
        role: 'IA, APPs & Programación',
        image: '/images/equipo_VEMG.jpg',
        video: '/videos/equipo_VEMG.mp4',
        bio: "Eduardo, originario de Puebla, México, es programador con más de 30 años de experiencia y aún enamorado de la programación. Le interesan las soluciones simples y eficientes. Cuando no esta en el vibe coding, lo encuentras comandando ejércitos en StarCraft o farmeando en World of Warcraft."
    },
  // Add more team members here as needed
  // {
  //   id: 'member2',
  //   name: 'Team Member 2',
  //   role: 'Position',
  //   image: '/images/equipo_member2.jpg',
  //   video: '/videos/equipo_member2.mp4',
  //   bio: "",
  // },
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-team-card
      className="team-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div className="card-inner relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        {/* Image Layer */}
        <div
          data-team-image
          className="absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${member.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Video Layer */}
        <video
          data-team-video
          src={assetPath(member.video)}
          className="absolute inset-0 w-full h-full object-cover z-[5]"
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-30 p-6 h-full flex flex-col justify-end">
          <div className="transform transition-transform duration-300 group-hover:translate-y-0">
            {!isHovered ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg animate-fade-in">
                  {member.name}
                </h3>
                <p className="text-cyan-400 font-medium text-sm uppercase tracking-wider drop-shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  {member.role}
                </p>
              </>
            ) : (
              <>
                <div className="bio-container animate-bio-fade-in">
                  <p className="text-slate-100 font-normal text-xs leading-relaxed drop-shadow-lg text-justify">
                    {member.bio}
                  </p>
                  {/* Decorative line */}
                  <div className="mt-3 flex items-center gap-2 animate-line-expand">
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/60 to-cyan-500/0" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Animated border glow */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #06b6d4)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        </div>

        {/* Tech corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none z-20">
          <div className="absolute top-4 right-4 w-12 h-px bg-cyan-400" />
          <div className="absolute top-4 right-4 w-px h-12 bg-cyan-400" />
          <div className="absolute top-6 right-6 w-8 h-px bg-cyan-400/50" />
          <div className="absolute top-6 right-6 w-px h-8 bg-cyan-400/50" />
        </div>

        {/* Bottom left accent */}
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20 pointer-events-none z-20">
          <div className="absolute bottom-4 left-4 w-12 h-px bg-cyan-400" />
          <div className="absolute bottom-4 left-4 w-px h-12 bg-cyan-400" />
          <div className="absolute bottom-6 left-6 w-8 h-px bg-cyan-400/50" />
          <div className="absolute bottom-6 left-6 w-px h-8 bg-cyan-400/50" />
        </div>
      </div>

      <style jsx>{`
        .team-card {
          width: 100%;
          max-width: 400px;
          aspect-ratio: 3/4;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bio-fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes line-expand {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        :global(.animate-fade-in) {
          animation: fade-in 0.5s ease-out forwards;
        }

        :global(.animate-bio-fade-in) {
          animation: bio-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        :global(.animate-line-expand) {
          animation: line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          transform: scaleX(0);
        }

        .bio-container {
          background: linear-gradient(
            135deg,
            rgba(6, 182, 212, 0.05) 0%,
            rgba(59, 130, 246, 0.05) 100%
          );
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(6, 182, 212, 0.2);
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.1);
        }

        .bio-container p {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export function Team() {
  return (
    <section
      id="equipo"
      data-floating-elements
      className="team-section relative min-h-screen py-15 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            data-team-title
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-primary-400 to-destructive-400"
          >
            Nuestro Equipo
          </h2>
          <p
            className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto"
          >
            El talento y la pasión detrás de Ivoka
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}

export default Team;
