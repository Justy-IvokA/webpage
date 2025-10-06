'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';

interface ProgressIndicatorProps {
  position?: 'top' | 'left' | 'right';
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export function ProgressIndicator({
  position = 'top',
  color = 'bg-brand-primary',
  height = 4,
  showPercentage = false,
}: ProgressIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ui } = useAppStore();

  useEffect(() => {
    if (!ui.animationsEnabled) return;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [ui.animationsEnabled]);

  if (!ui.animationsEnabled) return null;

  const positionClasses = {
    top: 'top-0 left-0 right-0 h-full',
    left: 'left-0 top-0 bottom-0 w-full',
    right: 'right-0 top-0 bottom-0 w-full',
  };

  const progressClasses = {
    top: 'h-full',
    left: 'w-full',
    right: 'w-full',
  };

  return (
    <>
      {/* Progress Bar */}
      <div
        className={`fixed ${positionClasses[position]} bg-background/80 backdrop-blur-sm z-50`}
        style={
          position === 'top'
            ? { height: `${height}px` }
            : { width: `${height}px` }
        }
      >
        <motion.div
          className={`absolute ${color} ${progressClasses[position]} origin-left`}
          style={
            position === 'top'
              ? { height: `${height}px` }
              : { width: `${height}px` }
          }
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* Percentage Display */}
      {showPercentage && (
        <motion.div
          className="fixed bottom-8 right-8 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-medium z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
    </>
  );
}