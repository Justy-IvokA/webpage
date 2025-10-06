'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  type?: 'button' | 'card' | 'link' | 'input' | 'badge' | 'icon';
  whileHover?: boolean;
  whileTap?: boolean;
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

const motionVariants = {
  button: {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  card: {
    hover: { 
      y: -5, 
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 } 
    },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  link: {
    hover: { x: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
  },
  input: {
    focus: { 
      scale: 1.02, 
      transition: { duration: 0.2 } 
    },
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },
  badge: {
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
  icon: {
    hover: { 
      rotate: 15, 
      scale: 1.2,
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.8, transition: { duration: 0.1 } },
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
};

export function MotionWrapper({
  children,
  type = 'button',
  whileHover = true,
  whileTap = true,
  animate = true,
  className = '',
  onClick,
}: MotionWrapperProps) {
  const variants = motionVariants[type];

  const motionProps: any = {
    className,
    onClick,
  };

  if (whileHover && 'hover' in variants) {
    motionProps.whileHover = variants.hover;
  }

  if (whileTap && 'tap' in variants) {
    motionProps.whileTap = variants.tap;
  }

  if (animate) {
    motionProps.initial = variants.initial;
    motionProps.animate = variants.animate;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

// Higher-order component for adding motion to existing components
export function withMotion<P extends object>(
  Component: React.ComponentType<P>,
  type: MotionWrapperProps['type'] = 'button'
) {
  return function MotionComponent(props: P) {
    return (
      <MotionWrapper type={type}>
        <Component {...props} />
      </MotionWrapper>
    );
  };
}

// Specific motion components for common use cases
export function MotionButton({ children, ...props }: any) {
  return (
    <MotionWrapper type="button">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    </MotionWrapper>
  );
}

export function MotionCard({ children, ...props }: any) {
  return (
    <MotionWrapper type="card">
      <motion.div
        whileHover={{ 
          y: -5, 
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    </MotionWrapper>
  );
}

export function MotionLink({ children, ...props }: any) {
  return (
    <MotionWrapper type="link">
      <motion.a
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    </MotionWrapper>
  );
}

// Stagger animation container
interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  stagger = 0.1, 
  className = '' 
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item for use within StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function StaggerItem({ 
  children, 
  direction = 'up', 
  delay = 0 
}: StaggerItemProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 30 };
      case 'down': return { y: -30 };
      case 'left': return { x: 30 };
      case 'right': return { x: -30 };
      default: return { y: 30 };
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };

  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// Hover effect with scale and glow
export function GlowOnHover({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 20px rgba(0, 98, 255, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for attention-grabbing elements
export function Pulse({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating animation
export function Floating({ 
  children, 
  duration = 3, 
  distance = 10,
  className = '' 
}: { 
  children: ReactNode; 
  duration?: number; 
  distance?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Typing animation for text
interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypingText({ text, className = '', delay = 0 }: TypingTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{
        duration: text.length * 0.05,
        delay,
        ease: 'linear',
      }}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      {text}
    </motion.div>
  );
}