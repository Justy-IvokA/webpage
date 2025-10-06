'use client';

import { useEffect, useState, useCallback } from 'react';

export const useAccessibility = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  // Check user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    contrastQuery.addEventListener('change', handleContrastChange);

    // Detect keyboard navigation
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
        window.removeEventListener('keydown', handleFirstTab);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    window.addEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Trap focus within a modal or dialog
  const trapFocus = useCallback((element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Announce screen reader messages
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('aria-hidden', 'false');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Manage ARIA attributes for dynamic content
  const updateAriaAttributes = useCallback((
    element: HTMLElement,
    attributes: Record<string, string>
  ) => {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }, []);

  // Handle skip links for keyboard navigation
  const setupSkipLinks = useCallback(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground px-4 py-2 rounded border border-border z-50';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }, []);

  // Check color contrast
  const checkColorContrast = useCallback((color1: string, color2: string): number => {
    // Simple contrast ratio calculation
    const getLuminance = (color: string): number => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const [lr, lg, lb] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }, []);

  // Generate safe ARIA labels
  const generateAriaLabel = useCallback((
    element: HTMLElement,
    context?: string
  ): string => {
    const baseLabel = element.getAttribute('aria-label') || element.textContent || '';
    return context ? `${baseLabel} - ${context}` : baseLabel;
  }, []);

  // Handle keyboard shortcuts
  const setupKeyboardShortcuts = useCallback((
    shortcuts: Array<{ key: string; callback: () => void; description: string }>
  ) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const pressedKey = e.key.toLowerCase();
      const shortcut = shortcuts.find(s => s.key.toLowerCase() === pressedKey);

      if (shortcut && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        shortcut.callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    reducedMotion,
    highContrast,
    keyboardNavigation,
    trapFocus,
    announceToScreenReader,
    updateAriaAttributes,
    setupSkipLinks,
    checkColorContrast,
    generateAriaLabel,
    setupKeyboardShortcuts,
  };
};

// Hook for managing focus visible states
export const useFocusVisible = () => {
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return focusVisible;
};

// Hook for managing landmark regions
export const useLandmarks = () => {
  const announceLandmark = useCallback((landmark: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    
    document.body.appendChild(announcement);
    announcement.textContent = `Navegado a ${landmark}`;
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const setupLandmarkNavigation = useCallback(() => {
    const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], [role="search"]');
    
    const handleLandmarkFocus = (e: FocusEvent) => {
      const element = e.target as HTMLElement;
      const role = element.getAttribute('role');
      if (role) {
        announceLandmark(role);
      }
    };

    landmarks.forEach(landmark => {
      landmark.addEventListener('focusin', handleLandmarkFocus);
    });

    return () => {
      landmarks.forEach(landmark => {
        landmark.removeEventListener('focusin', handleLandmarkFocus);
      });
    };
  }, [announceLandmark]);

  return { setupLandmarkNavigation };
};