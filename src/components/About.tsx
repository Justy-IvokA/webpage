'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Heart, Zap } from 'lucide-react';

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const valuesData: ValueCard[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Nuestra Misión',
    description: 'Democratizar el acceso a la tecnología y el conocimiento, empoderando a las personas para que transformen sus vidas a través de la inteligencia artificial y el desarrollo personal.',
    gradientFrom: 'from-cyan-500/20',
    gradientTo: 'to-blue-600/20',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Nuestros Valores',
    description: 'Creemos en la comunidad, la innovación constante y el crecimiento compartido. Cada miembro es valioso y contribuye a nuestra visión colectiva.',
    gradientFrom: 'from-pink-500/20',
    gradientTo: 'to-rose-600/20',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Nuestra Visión',
    description: 'Ser la plataforma líder en Latinoamérica que une el potencial humano con la tecnología, creando un futuro donde todos puedan alcanzar su máximo potencial.',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-green-600/20',
  },
];

export function About() {
  return (
    <section
      id="acerca-de"
      className="about-section relative w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-element absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0062FF 1px, transparent 1px),
            linear-gradient(to bottom, #0062FF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-semibold text-primary-400">Acerca de Ivoka</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
            Transformando Vidas con Tecnología
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Somos más que una plataforma de aprendizaje. Somos una comunidad vibrante 
            que fusiona lo mejor de la inteligencia artificial, el desarrollo personal y 
            las finanzas para crear un ecosistema de crecimiento integral.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                Nuestra Historia
              </h3>
              
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Ivoka nació de una visión clara: crear un espacio donde la tecnología y la humanidad 
                  se encuentren para potenciar el crecimiento de cada persona. En un mundo cada vez más 
                  digital, vimos la necesidad de una comunidad que no solo enseñe herramientas, sino que 
                  transforme vidas.
                </p>
                
                <p>
                  Combinamos tres pilares fundamentales - Inteligencia Artificial, Desarrollo Humano y 
                  Finanzas Personales - para ofrecer una experiencia de aprendizaje holística. No se trata 
                  solo de dominar la IA o mejorar tus finanzas, se trata de evolucionar como persona integral.
                </p>
                
                <p>
                  Hoy, miles de miembros en toda Latinoamérica son parte de esta revolución del aprendizaje, 
                  compartiendo conocimientos, celebrando logros y construyendo juntos un futuro más brillante.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {valuesData.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${value.gradientFrom} ${value.gradientTo} border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-white/30 h-full`}>
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {value.icon}
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-white/80 leading-relaxed">{value.description}</p>
                
                {/* Decorative line */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-white/50 to-transparent rounded-full transition-all duration-500 group-hover:w-full" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-neutral-300 mb-6">
            ¿Listo para ser parte de algo más grande?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const registrationSection = document.getElementById('registro');
              if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300"
          >
            Únete a Nuestra Comunidad
          </motion.button>
        </motion.div>
      </div>

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
      `}</style>
    </section>
  );
}

export default About;
