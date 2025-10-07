'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Building2 } from 'lucide-react';
import NumberFlow from '@number-flow/react';

// --- Data & Types ---

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: 'individual' | 'empresa' | 'founder';
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ReactNode;
  features: PricingFeature[];
  gradient: string;
  highlight: string;
}

interface PricingPlans {
  individual: PricingPlan;
  empresa: PricingPlan;
  founder?: PricingPlan;
}

const pricingPlans: PricingPlans = {
  individual: {
    id: 'individual',
    name: 'Plan Individual',
    description: 'Perfecto para ti que buscas dominar la IA',
    monthlyPrice: 499,
    annualPrice: 5489,
    icon: <User className="h-8 w-8" />,
    gradient: 'from-primary-400 to-primary-600',
    highlight: 'Eficientiza y transforma tu carrera',
    features: [
      { text: 'Todos los modelos de IA' },
      { text: 'Comunidad privada exclusiva' },
      { text: 'Podcasts' },
      { text: 'Webbinars' },
      { text: 'Agentes expertos 24/7' },
      { text: 'Retos & Actividades' },
      { text: 'APPs exclusivas' },
      { text: 'Miles de recursos y descargables' },
    ],
  },
  empresa: {
    id: 'empresa',
    name: 'Plan Empresarial',
    description: 'Solución completa para tu equipo o empresa',
    monthlyPrice: 499,
    annualPrice: 5489,
    icon: <Building2 className="h-8 w-8" />,
    gradient: 'from-accent-400 to-destructive-500',
    highlight: 'Potencia todo tu equipo',
    features: [
      { text: 'Todo lo del plan Individual' },
      { text: 'Licencias ilimitadas para tu equipo' },
      { text: 'Onboarding personalizado' },
      { text: 'Mentoría dedicada para la empresa' },
      { text: 'Dashboard de progreso del equipo' },
      { text: 'Contenido personalizado para tu industria' },
      { text: 'Soporte prioritario con SLA' },
      { text: 'Sesiones privadas exclusivas' },
      { text: 'Reportes y analytics avanzados' },
    ],
  },
  founder: {
    id: 'founder',
    name: 'Plan Founder',
    description: 'Acceso exclusivo para miembros fundadores',
    monthlyPrice: 299,
    annualPrice: 3588,
    icon: <User className="h-8 w-8" />,
    gradient: 'from-secondary-400 to-secondary-600',
    highlight: 'Precio especial de lanzamiento',
    features: [
      { text: 'Todos los modelos de IA' },
      { text: 'Comunidad privada exclusiva' },
      { text: 'Podcasts' },
      { text: 'Webbinars' },
      { text: 'Agentes expertos 24/7' },
      { text: 'Retos & Actividades' },
      { text: 'APPs exclusivas' },
      { text: 'Miles de recursos y descargables' },
    ],
  },
};

// --- Main Pricing Component ---
export function Price({ animated = true, founder = false }: { animated?: boolean; founder?: boolean }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [planType, setPlanType] = useState<'individual' | 'empresa'>('individual');

  // Si founder está activo, usar el plan founder
  const currentPlan = founder && pricingPlans.founder ? pricingPlans.founder : pricingPlans[planType];
  const monthlyEquivalent = isAnnual ? currentPlan.annualPrice / 12 : currentPlan.monthlyPrice;
  
  // Calcular ahorro: para founder comparar precio anual individual vs founder anual, para otros usar el cálculo normal
  const savings = founder && pricingPlans.founder && isAnnual
    ? ((pricingPlans.individual.monthlyPrice * 12 - currentPlan.annualPrice) / (pricingPlans.individual.monthlyPrice * 12)) * 100
    : ((pricingPlans.individual.monthlyPrice * 12 - currentPlan.monthlyPrice * 12) / (pricingPlans.individual.monthlyPrice * 12)) * 100;

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20 md:px-8"
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
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] ${
          animated ? 'animated-grid' : 'static-grid inset-0'
        }`}
      />

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-accent-400 via-primary-400 to-destructive-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            Invierte en Tu Futuro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl"
          >
            Elige el plan que mejor se adapte a tus objetivos y comienza a transformar tu relación con la inteligencia artificial.
          </motion.p>
        </div>

        {/* Plan Type Tabs - Solo mostrar si NO es founder */}
        {!founder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex rounded-2xl bg-neutral-900/50 p-2 backdrop-blur-sm">
              <button
                onClick={() => setPlanType('individual')}
                className={`relative flex items-center gap-2 rounded-xl px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                  planType === 'individual'
                    ? 'text-neutral-50'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {planType === 'individual' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <User className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Individual</span>
              </button>
              <button
                onClick={() => setPlanType('empresa')}
                className={`relative flex items-center gap-2 rounded-xl px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                  planType === 'empresa'
                    ? 'text-neutral-50'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {planType === 'empresa' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-500 to-destructive-500 shadow-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Building2 className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Empresa</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Billing Toggle */}
        {
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 flex items-center justify-center gap-4"
          >
            <span
              className={`text-lg font-semibold transition-colors ${
                !isAnnual ? 'text-neutral-50' : 'text-neutral-500'
              }`}
            >
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative h-8 w-16 rounded-full bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute top-1 h-6 w-6 rounded-full bg-gradient-to-r shadow-lg ${
                  isAnnual
                    ? 'left-9 from-secondary-400 to-secondary-600'
                    : 'left-1 from-neutral-400 to-neutral-500'
                }`}
              />
            </button>
            <span
              className={`text-lg font-semibold transition-colors ${
                isAnnual ? 'text-neutral-50' : 'text-neutral-500'
              }`}
            >
              Anual
            </span>
            <AnimatePresence>
              
            <motion.span
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                className="rounded-full bg-secondary-500/20 px-4 py-1 text-sm font-semibold text-secondary-400"
            >
                Ahorra hasta {savings.toFixed(0)}%
            </motion.span>
              
            </AnimatePresence>
          </motion.div>
        }

        {/* Founder Badge - Solo mostrar si es founder Y es anual */}
        {founder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600 px-8 py-3 text-lg font-bold text-neutral-900 shadow-lg"
            >
              🚀 Aprovecha por Tiempo Limitado - Ahorra {savings.toFixed(0)}%
            </motion.div>
          </motion.div>
        )}

        {/* Pricing Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={founder ? 'founder' : planType}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative mx-auto max-w-2xl"
          >
            <div className={`relative flex flex-col rounded-3xl border-2 p-10 shadow-2xl backdrop-blur-sm md:p-12 ${
              founder
                ? 'border-secondary-500 bg-gradient-to-br from-secondary-950/50 to-secondary-900/30'
                : 'border-primary-500/50 bg-gradient-to-br from-neutral-900/80 to-neutral-800/50'
            }`}>
              {/* Glow Effect */}
              <motion.div
                className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${currentPlan.gradient} blur-xl ${
                  founder ? 'opacity-40' : 'opacity-20'
                }`}
                animate={founder ? {
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                } : {}}
                transition={founder ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : {}}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Highlight */}
                <div className="mb-6 flex items-center justify-between">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${currentPlan.gradient} text-white shadow-lg`}>
                    {currentPlan.icon}
                  </div>
                  <motion.span
                    key={`highlight-${planType}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-full bg-secondary-500/20 px-4 py-2 text-sm font-semibold text-secondary-400"
                  >
                    ✨ {currentPlan.highlight}
                  </motion.span>
                </div>

                {/* Plan Name & Description */}
                <motion.h3
                  key={`name-${planType}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 text-4xl font-bold text-neutral-50"
                >
                  {currentPlan.name}
                </motion.h3>
                <motion.p
                  key={`desc-${planType}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 text-lg text-neutral-400"
                >
                  {currentPlan.description}
                </motion.p>

                {/* Price */}
                <div className="mb-8 rounded-2xl bg-neutral-900/50 p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-semibold text-neutral-300">MXN</span>
                    <NumberFlow
                      value={isAnnual ? currentPlan.annualPrice : monthlyEquivalent}
                      format={{ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                      className="text-6xl font-bold text-red-600 md:text-7xl"
                    />
                    <span className="text-2xl text-neutral-400">/{isAnnual ? 'anual' : 'mes'}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-3"
                >
                <span className="text-lg text-neutral-500 line-through">
                    MXN $ {isAnnual ? (pricingPlans.individual.annualPrice).toLocaleString('es-MX') : (pricingPlans.individual.monthlyPrice).toLocaleString('es-MX')}
                </span>
                <span className="rounded-full bg-secondary-500/20 px-4 py-1 text-sm font-semibold text-secondary-400">
                    Ahorra {savings.toFixed(0)}%
                </span>
                <span className="text-lg text-neutral-500">
                    vs plan Individual
                </span>
                </motion.div>
                    
                  </AnimatePresence>
                  {isAnnual && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-sm text-neutral-500"
                    >
                      Facturado anualmente: MXN {currentPlan.annualPrice.toLocaleString('es-MX')}
                    </motion.p>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mb-8 w-full rounded-xl bg-gradient-to-r ${currentPlan.gradient} py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl`}
                  onClick={() => {
                    const registrationSection = document.getElementById('registro');
                    if (registrationSection) {
                      registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  ¡REGISTRATE AHORA!
                </motion.button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Todo lo que incluye:
                  </p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {currentPlan.features.map((feature, idx) => (
                      <motion.li
                        key={`${planType}-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary-500/20 text-secondary-400">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm text-neutral-300">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-neutral-500">
            Todos los precios están en pesos mexicanos (MXN). Puedes cancelar en cualquier momento.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            ¿Tienes preguntas sobre nuestros planes?{' '}
            <a href="#footer" className="font-semibold text-primary-400 hover:text-primary-300">
              Contáctanos
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
