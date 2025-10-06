'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'muted' | 'brand' | 'gradient' | 'continue' | 'radial0' | 'radial1';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  animate?: boolean;
}

const backgroundClasses = {
  default: 'radgrad1',
  continue: 'radgrad2',
  radial0: 'radgrad3',
  radial1: 'radgrad4',
  muted: 'bg-muted',
  brand: 'bg-primary-900',
  gradient: 'bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-700',
};

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

export function Section({
  children,
  className = '',
  id,
  background = 'default',
  padding = 'lg',
  container = true,
  animate = true,
}: SectionProps) {
  const sectionClasses = [
    backgroundClasses[background],
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  const animationProps: MotionProps = animate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
    viewport: { once: true, margin: '-100px' },
  } : {};

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      {...animationProps}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm md:text-base font-medium text-brand-primary mb-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}