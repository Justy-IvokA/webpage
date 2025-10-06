'use client';

import { useEffect, useRef } from 'react';
import { useGsapAnimations } from '@/hooks/use-gsap-animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const {
    scopeRef,
    createScrollAnimation,
    createTimeline,
    createParallax,
    createFoldEffect,
    createStaggerAnimation,
    createRevealAnimation,
    createPinAnimation,
    createGlitchEffectImages,
    createGlitchEffectText,
    createNavbarBlurAnimation,
    createNavbarSurfaceAnimation,
    createIntroTextAnimation,
    createVideoScrollScrub,
    createSeamlessCardsLoop,
    createTeamCardAnimation,
    createTeamCardHoverEffects,
    createTeamTitleAnimation,
    createFloatingElementsAnimation,
    createPillarCardAnimation,
    createPillarTitleAnimation,
    createTubeTunnelScroll,
    createShakeAnimation,
    createGrowDotScroll,
    refresh,
  } = useGsapAnimations();

  const isInitializingRef = useRef(false);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tubeTunnelInitializedRef = useRef(false);

  useEffect(() => {
    if (!scopeRef.current) return;

    // Initialize animations for common elements
    const observer = new MutationObserver((mutations) => {
      // Clear existing timeout
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      
      // Debounce to avoid multiple rapid calls
      initTimeoutRef.current = setTimeout(() => {
        if (!isInitializingRef.current) {
          initializeAnimations();
        }
      }, 100);
    });

    observer.observe(scopeRef.current, {
      childList: true,
      subtree: true,
    });

    // Initial animation setup - wait for DOM to be ready
    requestAnimationFrame(() => {
      initializeAnimations();
    });

    // Handle window resize
    const handleResize = () => {
      refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [scopeRef, createScrollAnimation, createParallax, createStaggerAnimation, createRevealAnimation, createPinAnimation, createVideoScrollScrub, createShakeAnimation, refresh]);

    const initializeAnimations = () => {
    if (!scopeRef.current) return;
    
    if (isInitializingRef.current) {
      return;
    }
    
    isInitializingRef.current = true;
    
    // Clean up any orphaned ScrollTriggers
    const allTriggers = ScrollTrigger.getAll();

    // Animate sections with scroll-trigger (exclude special sections)
    const sections = scopeRef.current.querySelectorAll('section:not([data-tube-tunnel]):not([data-team-section]):not([data-video-scroll])');
    sections.forEach((section, index) => {
      if (!section.hasAttribute('data-animated')) {
        createScrollAnimation(section, {
          delay: index * 0.1,
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0 },
        });
        section.setAttribute('data-animated', 'true');
      }
    });

    // Animate cards with stagger effect
    const cardGroups = scopeRef.current.querySelectorAll('.card-group');
    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll('.card, [class*="Card"]');
      if (cards.length > 0 && !group.hasAttribute('data-animated')) {
        createStaggerAnimation(Array.from(cards), {
          stagger: 0.1,
          from: { opacity: 0, y: 30, scale: 0.95 },
          to: { opacity: 1, y: 0, scale: 1 },
        });
        group.setAttribute('data-animated', 'true');
      }
    });

    // Animate feature items
    const features = scopeRef.current.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
      if (!feature.hasAttribute('data-animated')) {
        createScrollAnimation(feature, {
          delay: index * 0.1,
          from: { opacity: 0, x: -30 },
          to: { opacity: 1, x: 0 },
        });
        feature.setAttribute('data-animated', 'true');
      }
    });

    // Animate headings with reveal effect
    const headings = scopeRef.current.querySelectorAll('h1, h2, h3');
    headings.forEach((heading) => {
      if (!heading.hasAttribute('data-animated')) {
        createRevealAnimation(heading, {
          direction: 'up',
          duration: 0.8,
          from: { opacity: 0 },
          to: { opacity: 1 },
        });
        heading.setAttribute('data-animated', 'true');
      }
    });

    // Animate paragraphs
    const paragraphs = scopeRef.current.querySelectorAll('p');
    paragraphs.forEach((paragraph, index) => {
      if (!paragraph.hasAttribute('data-animated') && paragraph.textContent && paragraph.textContent.length > 20) {
        createScrollAnimation(paragraph, {
          delay: index * 0.05,
          from: { opacity: 0, y: 20 },
          to: { opacity: 1, y: 0 },
        });
        paragraph.setAttribute('data-animated', 'true');
      }
    });

    // Animate buttons
    const buttons = scopeRef.current.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if (!button.hasAttribute('data-animated')) {
        createScrollAnimation(button, {
          delay: index * 0.1,
          from: { opacity: 0, scale: 0.8 },
          to: { opacity: 1, scale: 1 },
        });
        button.setAttribute('data-animated', 'true');
      }
    });

    // Create parallax effects for background elements
    const parallaxElements = scopeRef.current.querySelectorAll('[data-parallax]');
    parallaxElements.forEach((element) => {
      if (!element.hasAttribute('data-animated')) {
        const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0.5');
        createParallax(element, {
          speed,
        });
        element.setAttribute('data-animated', 'true');
      }
    });

    // Animate navbar surfaces on scroll
    const navbarSurfaces = scopeRef.current.querySelectorAll('[data-navbar-surface]');
    navbarSurfaces.forEach((surface) => {
      if (surface.hasAttribute('data-animated')) return;

      createNavbarSurfaceAnimation(surface, {
        backgroundColor: 'rgba(10, 20, 40, 0.45)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 20px 50px -25px rgba(0, 98, 255, 0.45)',
      }, {
        backgroundColor: 'rgba(8, 15, 35, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 24px 60px -28px rgba(0, 98, 255, 0.6)',
        ease: 'power1.inOut',
      });
      surface.setAttribute('data-animated', 'true');
    });

    // Fade in navbar background once hero is passed
    const navbars = scopeRef.current.querySelectorAll('[data-navbar]');
    navbars.forEach((nav) => {
      if (nav.hasAttribute('data-animated')) return;

      createNavbarBlurAnimation(nav, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
      }, {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(10px)',
        ease: 'power1.inOut',
        duration: 1,
      });

      nav.setAttribute('data-animated', 'true');
    });

    // Fold effect sections
    const foldEffectContainers = scopeRef.current.querySelectorAll('[data-fold-effect]');
    foldEffectContainers.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;

      createFoldEffect(container);
      container.setAttribute('data-animated', 'true');
    });

    // Glitch effect for images
    const glitchImageContainers = scopeRef.current.querySelectorAll('[data-glitch-images]');
    glitchImageContainers.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;

      createGlitchEffectImages(container);
      container.setAttribute('data-animated', 'true');
    });

    // Glitch effect for text
    const glitchTextContainers = scopeRef.current.querySelectorAll('[data-glitch-text]');
    glitchTextContainers.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;

      createGlitchEffectText(container);
      container.setAttribute('data-animated', 'true');
    });

    // Intro text animation
    const introTextContainers = scopeRef.current.querySelectorAll('[data-intro-text]');
    introTextContainers.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;
      const color1 = container.querySelector('[data-intro-text-1]')?.getAttribute('data-c1') || '#000';
      const color2 = container.querySelector('[data-intro-text-2]')?.getAttribute('data-c2') || '#fff';
      createIntroTextAnimation(container, {c1: color1, c2: color2});
      
      container.setAttribute('data-animated', 'true');
    });

    // Video scroll scrub effect
    const videosToScrub = scopeRef.current.querySelectorAll('video[data-video-scroll-scrub]');
    videosToScrub.forEach((videoEl) => {
      if (videoEl.hasAttribute('data-animated')) return;
      const vid = videoEl as HTMLVideoElement;
      const start = vid.getAttribute('data-start') || 'top top';
      const end = vid.getAttribute('data-end') || 'bottom+=200% bottom';
      const scrub = Number(vid.getAttribute('data-scrub')) || 2;
      const markers = vid.getAttribute('data-markers') === 'true';

      createVideoScrollScrub(vid, {
        trigger: vid,
        start,
        end,
        scrub,
        markers,
      });
      videoEl.setAttribute('data-animated', 'true');

      // Animate overlay text synced with the video scroll-scrub
      const section = videoEl.closest('section');
      const textContainer = section?.querySelector<HTMLElement>('[data-video-text]') || undefined;
      if (textContainer && !textContainer.hasAttribute('data-animated')) {
        const lines = Array.from(textContainer.querySelectorAll<HTMLElement>('.intro-line .inline-block'));
        if (lines.length > 0) {
          const tl = createTimeline({
            scrollTrigger: {
              trigger: vid,
              start,
              end,
              scrub,
              markers,
            },
          });
          tl?.fromTo(
            lines,
            { opacity: 0, y: 40, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'power2.out' },
          );
          textContainer.setAttribute('data-animated', 'true');
        }
      }
    });

    // Handle custom hero parallax timelines
    const heroSections = scopeRef.current.querySelectorAll('[data-hero-parallax]');
    heroSections.forEach((hero) => {
      if (hero.hasAttribute('data-animated')) return;

      const videoLayer = hero.querySelector('[data-hero-video]');
      const contentLayer = hero.querySelector('[data-hero-content]');
      const overlayLayer = hero.querySelector('[data-hero-overlay]');

      const timeline = createTimeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      if (timeline) {
        if (videoLayer) {
          timeline.to(videoLayer, {
            y: '20%',
            scale: 1.1,
            ease: 'none',
          });
        }

        if (contentLayer) {
          timeline.to(
            contentLayer,
            {
              y: '-50%',
              opacity: 0,
              ease: 'none',
            },
            '<'
          );
        }

        if (overlayLayer) {
          timeline.to(
            overlayLayer,
            {
              opacity: 0.8,
              ease: 'none',
            },
            '<'
          );
        }
      }

      hero.setAttribute('data-animated', 'true');
    });

    // Create pin effects for sticky elements
    const pinElements = scopeRef.current.querySelectorAll('[data-pin]');
    pinElements.forEach((element) => {
      if (!element.hasAttribute('data-animated')) {
        const pinSpacingAttr = element.getAttribute('data-pin-spacing');
        const pinSpacing = pinSpacingAttr === 'margin' ? 'margin' : pinSpacingAttr === 'false' ? false : true;

        createPinAnimation(element, {
          pinSpacing,
        });
        element.setAttribute('data-animated', 'true');
      }
    });

    // Seamless cards loop
    const cardsLoops = scopeRef.current.querySelectorAll('[data-cards-loop]');
    cardsLoops.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;
      // @ts-ignore new API exists in hook
      createSeamlessCardsLoop(container);
      container.setAttribute('data-animated', 'true');
    });

    // Team card animations
    const teamCards = scopeRef.current.querySelectorAll('[data-team-card]');
    teamCards.forEach((card, index) => {
      if (card.hasAttribute('data-animated')) return;
      
      const delay = parseFloat(card.getAttribute('data-delay') || `${index * 0.15}`);
      const floatDuration = parseFloat(card.getAttribute('data-float-duration') || '2') + index * 0.3;
      
      createTeamCardAnimation(card, { delay, floatDuration });
      
      // Setup hover effects if video exists
      const imageLayer = card.querySelector('[data-team-image]');
      const videoEl = card.querySelector<HTMLVideoElement>('[data-team-video]');
      
      if (imageLayer && videoEl) {
        createTeamCardHoverEffects(card, imageLayer, videoEl);
      }
      
      card.setAttribute('data-animated', 'true');
    });

    // Team title animations
    const teamTitles = scopeRef.current.querySelectorAll('[data-team-title]');
    teamTitles.forEach((title) => {
      if (title.hasAttribute('data-animated')) return;
      
      const charDelay = parseFloat(title.getAttribute('data-char-delay') || '0.05');
      const duration = parseFloat(title.getAttribute('data-duration') || '0.5');
      
      createTeamTitleAnimation(title, { charDelay, duration });
      title.setAttribute('data-animated', 'true');
    });

    // Floating background elements
    const floatingContainers = scopeRef.current.querySelectorAll('[data-floating-elements]');
    floatingContainers.forEach((container) => {
      if (container.hasAttribute('data-animated')) return;
      
      const selector = container.getAttribute('data-floating-selector') || '.bg-element';
      createFloatingElementsAnimation(container, { selector });
      
      container.setAttribute('data-animated', 'true');
    });

    // Pillar card animations
    const pillarCards = scopeRef.current.querySelectorAll('[data-pillar-card]');
    pillarCards.forEach((card, index) => {
      if (card.hasAttribute('data-animated')) return;
      
      const delay = parseFloat(card.getAttribute('data-delay') || `${index * 0.15}`);
      createPillarCardAnimation(card, { delay });
      
      card.setAttribute('data-animated', 'true');
    });

    // Pillar main title
    const pillarMainTitles = scopeRef.current.querySelectorAll('[data-pillar-main-title]');
    pillarMainTitles.forEach((title) => {
      if (title.hasAttribute('data-animated')) return;
      
      createPillarTitleAnimation(title);
      title.setAttribute('data-animated', 'true');
    });

    // Pillar subtitle
    const pillarSubtitles = scopeRef.current.querySelectorAll('[data-pillar-subtitle]');
    pillarSubtitles.forEach((subtitle) => {
      if (subtitle.hasAttribute('data-animated')) return;
      
      createScrollAnimation(subtitle, {
        delay: 0.2,
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
      });
      subtitle.setAttribute('data-animated', 'true');
    });

    // Grow Dot sections (CodePen-inspired grow circle to fill screen)
    const growDotSections = scopeRef.current.querySelectorAll('[data-grow-dot-section]');
    growDotSections.forEach((section) => {
      if (section.hasAttribute('data-animated')) return;
      const markers = section.getAttribute('data-markers') === 'true';
      createGrowDotScroll(section, { markers });
      section.setAttribute('data-animated', 'true');
    });

    // Shake animation for elements with data-shake attribute
    const shakeElements = scopeRef.current.querySelectorAll('[data-shake]');
    shakeElements.forEach((element) => {
      if (element.hasAttribute('data-animated')) return;
      
      const duration = parseFloat(element.getAttribute('data-shake-duration') || '1');
      const delay = parseFloat(element.getAttribute('data-shake-delay') || '0');
      const repeat = parseInt(element.getAttribute('data-shake-repeat') || '0');
      const ease = element.getAttribute('data-shake-ease') || 'ease';
      const trigger = (element.getAttribute('data-shake-trigger') || 'auto') as 'auto' | 'hover';
      
      createShakeAnimation(element, { duration, delay, repeat, ease, trigger });
      element.setAttribute('data-animated', 'true');
    });

    // Tube Tunnel scroll animations - ONLY ONCE
    const tubeTunnelSections = scopeRef.current.querySelectorAll('[data-tube-tunnel]');
    tubeTunnelSections.forEach((section) => {
      // Check if already initialized
      if (tubeTunnelInitializedRef.current) {
        return;
      }

      // Scroll target can be the section itself or a child element
      let scrollTarget: Element | null = section.querySelector('[data-tube-scroll-target]');
      if (!scrollTarget && section.hasAttribute('data-tube-scroll-target')) {
        scrollTarget = section;
      }
      
      if (!scrollTarget) {
        return;
      }

      const onUpdateAttr = section.getAttribute('data-on-update');
      let onUpdateCallback: ((progress: number) => void) | undefined;

      if (onUpdateAttr && (window as any)[onUpdateAttr]) {
        onUpdateCallback = (window as any)[onUpdateAttr];
      }

      // Get pin configuration
      const pinAttr = section.getAttribute('data-pin');
      let pin: boolean | Element | string = false;
      
      if (pinAttr === 'true') {
        // Pin the section itself, not the scroll target
        pin = section;
      } else if (pinAttr && pinAttr !== 'false') {
        // Try to find element by selector
        const pinElement = section.querySelector(pinAttr);
        pin = pinElement || pinAttr;
      }

      const timeline = createTubeTunnelScroll({
        trigger: scrollTarget,
        start: section.getAttribute('data-start') || 'top top',
        end: section.getAttribute('data-end') || 'bottom bottom',
        scrub: parseFloat(section.getAttribute('data-scrub') || '5'),
        markers: section.getAttribute('data-markers') === 'true',
        pin,
        pinSpacing: section.getAttribute('data-pin-spacing') !== 'false',
        onUpdate: onUpdateCallback,
      });

      if (timeline) {
        tubeTunnelInitializedRef.current = true;
      }

      section.setAttribute('data-animated', 'true');
    });

    // Reset flag after initialization
    isInitializingRef.current = false;
  };

  return (
    <div ref={scopeRef} className="animation-provider">
      {children}
    </div>
  );
}