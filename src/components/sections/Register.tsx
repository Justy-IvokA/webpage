'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Mail, User, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  birthdayDay: string;
  birthdayMonth: string;
}

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const benefitsData: BenefitCard[] = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Acceso Inmediato',
    description: 'Comienza tu transformación desde el primer día con TODAS las IAs, contenido exclusivo y herramientas(APPs) a tu disposición',
    gradientFrom: 'from-cyan-500/20',
    gradientTo: 'to-blue-600/20',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Comunidad Activa',
    description: 'Únete a cientos de miembros que ya están transformando sus vidas',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-pink-600/20',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Recursos Premium',
    description: 'Accede a webinars, podcasts, infografías, videos, workshops y herramientas de IA exclusivas',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-green-600/20',
  },
];

function BenefitBadge({ benefit, index }: { benefit: BenefitCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${benefit.gradientFrom} ${benefit.gradientTo} border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-white/30`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            {benefit.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
            <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
          </div>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      </div>
    </motion.div>
  );
}

export function Register() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    birthdayDay: '',
    birthdayMonth: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.birthdayDay.trim()) {
      newErrors.birthdayDay = 'El día es requerido';
    } else {
      const day = parseInt(formData.birthdayDay, 10);
      if (isNaN(day) || day < 1 || day > 31) {
        newErrors.birthdayDay = 'Día inválido (1-31)';
      }
    }
    
    if (!formData.birthdayMonth.trim()) {
      newErrors.birthdayMonth = 'El mes es requerido';
    } else {
      const month = parseInt(formData.birthdayMonth, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        newErrors.birthdayMonth = 'Mes inválido (1-12)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Crear query params con los datos del formulario
    const queryParams = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      birthdayDay: formData.birthdayDay,
      birthdayMonth: formData.birthdayMonth,
    });
    
    // Simulación de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Redireccionar a la página de registro CORRECTA con los query params
    router.push(`/registro?${queryParams.toString()}`);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="registro"
      className="register-section relative w-full py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
            {t('register.title')}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {t('register.subtitle')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                ¿Por qué unirte a Ivoka?
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Forma parte de una comunidad que está redefiniendo el futuro del aprendizaje y el crecimiento personal.
              </p>
            </motion.div>

            {benefitsData.map((benefit, index) => (
              <BenefitBadge key={index} benefit={benefit} index={index} />
            ))}
          </div>

          {/* Right Side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-6"
                  >
                    {/* Name Input */}
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                        {t('register.form.name')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-primary-400" />
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border ${
                            errors.name ? 'border-red-500' : 'border-white/10'
                          } text-white placeholder-neutral-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                          placeholder="Ingresa tu nombre completo"
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                        {t('register.form.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-primary-400" />
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border ${
                            errors.email ? 'border-red-500' : 'border-white/10'
                          } text-white placeholder-neutral-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                          placeholder="tu@email.com"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Birthday Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-2">
                        Fecha de Cumpleaños
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Day */}
                        <div>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-primary-400" />
                            <input
                              type="number"
                              id="birthdayDay"
                              min="1"
                              max="31"
                              value={formData.birthdayDay}
                              onChange={(e) => handleChange('birthdayDay', e.target.value)}
                              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border ${
                                errors.birthdayDay ? 'border-red-500' : 'border-white/10'
                              } text-white placeholder-neutral-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                              placeholder="Día"
                            />
                          </div>
                          {errors.birthdayDay && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-1"
                            >
                              {errors.birthdayDay}
                            </motion.p>
                          )}
                        </div>
                        {/* Month */}
                        <div>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-primary-400" />
                            <input
                              type="number"
                              id="birthdayMonth"
                              min="1"
                              max="12"
                              value={formData.birthdayMonth}
                              onChange={(e) => handleChange('birthdayMonth', e.target.value)}
                              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 border ${
                                errors.birthdayMonth ? 'border-red-500' : 'border-white/10'
                              } text-white placeholder-neutral-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                              placeholder="Mes"
                            />
                          </div>
                          {errors.birthdayMonth && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-1"
                            >
                              {errors.birthdayMonth}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600 text-white rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Procesando...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            {t('register.form.submit')}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    </motion.div>

                    {/* Privacy Notice */}
                    <p className="text-xs text-neutral-400 text-center mt-4">
                      Al registrarte, aceptas nuestra{' '}
                      <a href="/privacy" className="text-primary-400 hover:underline">
                        Política de Privacidad
                      </a>{' '}
                      y{' '}
                      <a href="/terms" className="text-primary-400 hover:underline">
                        Términos de Servicio
                      </a>
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative z-10 text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="mb-6 inline-flex p-6 rounded-full bg-green-500/20 border-2 border-green-500"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-400" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-white mb-4"
                    >
                      ¡Bienvenido a Ivoka!
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-neutral-300 text-lg"
                    >
                      {t('register.form.success')}
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-neutral-400 text-sm mt-4"
                    >
                      Revisa tu correo electrónico para los siguientes pasos.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"
            />
            
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-accent-500/20 to-destructive-500/20 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"
            />
          </motion.div>
        </div>

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

export default Register;
