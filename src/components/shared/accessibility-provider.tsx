'use client';

import { useEffect, useRef } from 'react';
import { useAccessibility, useFocusVisible, useLandmarks } from '@/hooks/use-accessibility';

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const { 
    reducedMotion, 
    highContrast, 
    setupSkipLinks, 
    setupKeyboardShortcuts,
    announceToScreenReader 
  } = useAccessibility();
  
  const focusVisible = useFocusVisible();
  const { setupLandmarkNavigation } = useLandmarks();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Setup skip links
    setupSkipLinks();

    // Setup landmark navigation
    setupLandmarkNavigation();

    // Setup keyboard shortcuts
    const shortcuts = [
      {
        key: '/',
        callback: () => {
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="buscar"], input[placeholder*="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            announceToScreenReader('Enfocado en el campo de búsqueda');
          }
        },
        description: 'Ir al campo de búsqueda'
      },
      {
        key: 'g',
        callback: () => {
          const mainContent = document.querySelector('[role="main"], main') as HTMLElement;
          if (mainContent) {
            mainContent.focus();
            announceToScreenReader('Enfocado en el contenido principal');
          }
        },
        description: 'Ir al contenido principal'
      },
      {
        key: 'h',
        callback: () => {
          const heading = document.querySelector('h1') as HTMLElement;
          if (heading) {
            heading.focus();
            announceToScreenReader('Enfocado en el encabezado principal');
          }
        },
        description: 'Ir al encabezado principal'
      }
    ];

    const cleanupShortcuts = setupKeyboardShortcuts(shortcuts);

    // Add focus visible styles
    const style = document.createElement('style');
    style.textContent = `
      .js-focus-visible :focus:not([data-focus-visible-added]) {
        outline: none;
      }
      
      .js-focus-visible [data-focus-visible-added]:focus {
        outline: 2px solid hsl(var(--brand-primary));
        outline-offset: 2px;
      }
      
      /* High contrast mode styles */
      @media (prefers-contrast: high) {
        :root {
          --border: 1px solid;
          --input: 1px solid;
        }
        
        button, 
        [role="button"],
        input, 
        select, 
        textarea {
          border-width: 2px;
        }
        
        a:focus,
        button:focus,
        [role="button"]:focus {
          outline: 3px solid currentColor;
          outline-offset: 2px;
        }
      }
      
      /* Reduced motion styles */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      /* Skip link styles */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      .sr-only-focusable:not(:focus) {
        clip: rect(0, 0, 0, 0);
        clip-path: inset(50%);
      }
      
      /* Keyboard navigation indicator */
      .keyboard-nav *:focus {
        outline: 2px solid hsl(var(--brand-primary));
        outline-offset: 2px;
      }
      
      /* Screen reader only content */
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);

    // Add focus visible script
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        var hadKeyboardEvent = false;
        var hadFocusVisibleRecently = false;
        
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Control') {
            hadKeyboardEvent = true;
          }
        });
        
        document.addEventListener('mousedown', function() {
          hadKeyboardEvent = false;
        });
        
        document.addEventListener('focus', function(e) {
          if (hadKeyboardEvent) {
            e.target.setAttribute('data-focus-visible-added', '');
            hadFocusVisibleRecently = true;
            setTimeout(function() {
              hadFocusVisibleRecently = false;
            }, 100);
          } else if (!hadFocusVisibleRecently) {
            e.target.removeAttribute('data-focus-visible-added');
          }
        }, true);
        
        document.addEventListener('blur', function(e) {
          e.target.removeAttribute('data-focus-visible-added');
        }, true);
        
        document.documentElement.classList.add('js-focus-visible');
      })();
    `;
    document.head.appendChild(script);

    return () => {
      cleanupShortcuts();
      document.head.removeChild(style);
      document.head.removeChild(script);
    };
  }, [setupSkipLinks, setupKeyboardShortcuts, setupLandmarkNavigation, announceToScreenReader]);

  // Apply reduced motion class to body
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  // Apply high contrast class to body
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply keyboard navigation class
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-nav');
      }
    };

    const handleMouseDown = () => {
      document.documentElement.classList.remove('keyboard-nav');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div 
      data-reduced-motion={reducedMotion}
      data-high-contrast={highContrast}
      data-keyboard-nav={focusVisible}
      className="accessibility-provider"
    >
      {/* Skip to main content link will be added by setupSkipLinks */}
      
      {/* Accessibility status (hidden by default) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {reducedMotion && 'Animaciones reducidas activadas'}
        {highContrast && 'Modo de alto contraste activado'}
      </div>
      
      {children}
    </div>
  );
}