'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Palette, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, useSystemTheme } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import gsap from 'gsap';


interface NavbarProps {
  className?: string;
}

export function Navbar({ className = '' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');
  const navbarRef = useRef<HTMLElement>(null);
  const navSurfaceRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { ui, setTheme, setAnimationsEnabled } = useAppStore();
  const systemTheme = useSystemTheme();
  const { t } = useTranslation();

  const navLinks = useMemo(
    () => [
      { id: 'home', href: '#', label: t('navigation.home') },
      { id: 'features', href: '#features', label: t('navigation.features') },
      { id: 'pillars', href: '#pillars', label: t('navigation.pillars') },
      { id: 'team', href: '#equipo', label: t('navigation.team') },
      { id: 'about', href: '#acerca-de', label: t('navigation.about') },
      { id: 'testimonials', href: '#testimonials', label: t('navigation.testimonials') },
      { id: 'pricing', href: '#pricing', label: t('navigation.pricing') },
      { id: 'register', href: '#registro', label: t('navigation.register') },
    ],
    [t],
  );

  const contactInfo = useMemo(
    () => [
      { icon: Mail, text: t('navbar.topBar.email') },
      { icon: Phone, text: t('navbar.topBar.phone') },
      { icon: MapPin, text: t('navbar.topBar.location') },
    ],
    [t],
  );

  // Handle scroll effects
  // useEffect(() => {
  //   if (!navbarRef.current || !navSurfaceRef.current) return;

  //   const ctx = gsap.context(() => {
  //     const surface = navSurfaceRef.current;
  //     if (!surface) return;

  //     // Initial state (unscrolled)
  //     gsap.set(surface, {
  //       backgroundColor: 'rgba(10, 20, 40, 0.5)', // Slightly more opaque base
  //       borderColor: 'rgba(255, 255, 255, 0.15)',
  //     });

  //     // Scroll-triggered animation
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: document.body,
  //         start: 'top top',
  //         end: '120px top',
  //         scrub: 0.5, // Smoother scrub
  //       },
  //     });

  //     tl.to(surface, {
  //       backgroundColor: 'rgba(8, 15, 35, 0.9)', // Darker and more opaque on scroll
  //       boxShadow: '0 24px 60px -28px rgba(0, 98, 255, 0.6)',
  //       borderColor: 'rgba(255, 255, 255, 0.2)',
  //       ease: 'power1.inOut',
  //     });
  //   }, navbarRef);

  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     setIsScrolled(scrollY > 50);
  //     setShowTopBar(scrollY <= 8);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll();

  //   return () => {
  //     ctx.revert();
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // Enhanced GSAP animations for interactive elements
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const resetAnimations = () => {
      document.querySelectorAll<HTMLElement>('.navbar-link, .navbar-cta, .mobile-menu-btn').forEach(el => {
        gsap.set(el, { clearProps: 'all' });
      });
    };

    if (!ui.animationsEnabled) {
      resetAnimations();
      return;
    }

    // Desktop navigation links
    const linkElements = Array.from(document.querySelectorAll<HTMLElement>('.navbar-link'));
    linkElements.forEach((element) => {
      const hoverTween = gsap.to(element, {
        y: -2,
        scale: 1.05,
        color: 'hsl(var(--primary))',
        textShadow: '0 0 15px rgba(0, 98, 255, 0.4)',
        duration: 0.3,
        ease: 'expo.out',
        paused: true,
      });

      const onEnter = () => hoverTween.play();
      const onLeave = () => hoverTween.reverse();

      element.addEventListener('mouseenter', onEnter);
      element.addEventListener('mouseleave', onLeave);

      cleanupFns.push(() => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
        hoverTween.kill();
      });
    });

    // CTA Button
    const ctaElement = document.querySelector<HTMLElement>('.navbar-cta');
    if (ctaElement) {
      const hoverTween = gsap.to(ctaElement, {
        y: -3,
        scale: 1.05,
        boxShadow: '0 22px 55px -20px rgba(0, 98, 255, 0.7)',
        duration: 0.3,
        ease: 'expo.out',
        paused: true,
      });

      const onEnter = () => hoverTween.play();
      const onLeave = () => hoverTween.reverse();

      ctaElement.addEventListener('mouseenter', onEnter);
      ctaElement.addEventListener('mouseleave', onLeave);

      cleanupFns.push(() => {
        ctaElement.removeEventListener('mouseenter', onEnter);
        ctaElement.removeEventListener('mouseleave', onLeave);
        hoverTween.kill();
      });
    }

    // Mobile menu button
    const mobileBtnElement = document.querySelector<HTMLElement>('.mobile-menu-btn');
    if (mobileBtnElement) {
      const hoverTween = gsap.to(mobileBtnElement, {
        scale: 1.15,
        backgroundColor: 'rgba(0, 98, 255, 0.15)', // #0062FF con 15% opacidad
        duration: 0.25,
        ease: 'expo.out',
        paused: true,
      });

      const onEnter = () => hoverTween.play();
      const onLeave = () => hoverTween.reverse();

      mobileBtnElement.addEventListener('mouseenter', onEnter);
      mobileBtnElement.addEventListener('mouseleave', onLeave);

      cleanupFns.push(() => {
        mobileBtnElement.removeEventListener('mouseenter', onEnter);
        mobileBtnElement.removeEventListener('mouseleave', onLeave);
        hoverTween.kill();
      });
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      resetAnimations();
    };
  }, [ui.animationsEnabled]);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = ui.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', '')).filter(id => id !== '');
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          return;
        }
      }
      
      // If scrolled to top, set home as active
      if (window.scrollY < 100) {
        setActiveSection('#');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Handle animations toggle
  const handleAnimationsToggle = () => {
    setAnimationsEnabled(!ui.animationsEnabled);
  };

  // Handle mobile menu close
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle navigation click with smooth scroll
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveSection(href);

    const performScroll = () => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(targetPosition, 0), behavior: 'smooth' });
        return;
      }

      window.location.hash = href;
    };

    if (isMobileMenuOpen) {
      handleMobileMenuClose();
      window.setTimeout(performScroll, 320);
      return;
    }

    performScroll();
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        ref={navbarRef}
        data-navbar
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out top-2 sm:top-3 md:top-4 ${className}`}
        role="navigation"
        aria-label={t('navigation.mainAria')}
      >
        <div className="mx-auto w-full max-w-6xl px-2 sm:px-3 md:px-4 lg:max-w-7xl">
          <div
            ref={navSurfaceRef}
            // data-navbar-surface
            className="flex w-full items-center justify-between gap-2 rounded-2xl border-none"
          >
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2"
              >
                <div 
                  className="md:hidden items-center justify-center rounded-xl sm:inline-block sm:text-xl bg-gradient-to-br from-brand-primary to-brand-secondary sm:h-10 sm:w-10"
                  data-shake
                  data-shake-duration="0.6"
                  data-shake-trigger="hover"
                >
                  <Image src="/Ivoka-White@2x.png" alt="Logo" width={100} height={100} />
                </div>
                <Image 
                  src="/Ivoka-White@2x.png" 
                  alt="Logo" 
                  width={120}
                  height={24}
                  className="hidden md:block h-6 w-auto"
                  data-shake
                  data-shake-duration="0.6"
                  data-shake-trigger="hover"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-grow items-center justify-center gap-6 xl:gap-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 xl:gap-2"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`navbar-link relative flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 xl:px-4 xl:py-2 xl:text-sm ${activeSection === link.href ? 'text-white' : 'text-white/80'}`}
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      color: 'oklch(0.65 0.18 35)',
                      transition: { duration: 0.1, ease: 'easeOut' }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/80 via-brand-secondary/70 to-brand-accent/70 shadow-inner"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                        whileInView={{
                          color: 'oklch(0.65 0.18 35 / 0.15)',
                          transition: { duration: 0.2 }
                        }}
                      />
                    )}
                    {activeSection !== link.href && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent-500/0"
                        initial={false}
                        whileHover={{
                          // backgroundColor: 'oklch(0.65 0.18 35 / 0.15)',
                          // boxShadow: '0 4px 12px rgba(254, 119, 52, 0.3)',
                          textDecoration: 'underline',
                          textDecorationThickness: '2px',
                          textDecorationColor: 'oklch(0.65 0.18 35 / 0.15)',
                          
                          transition: { duration: 0.2 }
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* CTA & Mobile Menu Button Wrapper */}
            <div className="flex flex-shrink-0 items-center gap-2">
              {/* CTA Button (Desktop) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block"
              >
                {/* <Button
                  className="navbar-cta relative overflow-hidden bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_20px_45px_-18px_rgba(0,98,255,0.75)] transition-all duration-300 xl:px-5 xl:py-2.5 xl:text-sm"
                  onClick={(e: any) => handleNavClick(e, '#registro')}
                >
                  {t('register.form.submit')}
                </Button> */}
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? t('navbar.mobileMenu.close') : t('navbar.mobileMenu.open')}
                  className="mobile-menu-btn h-9 w-9 rounded-full text-white/90 transition-colors hover:bg-brand-primary/25 hover:text-white"
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 225 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mx-2 mt-2.5 overflow-hidden rounded-2xl border border-white/15 bg-[rgba(30,31,28,0.92)] backdrop-blur-3xl sm:mx-3 md:mx-4"
            >
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`navbar-link flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${activeSection === link.href ? 'bg-gradient-to-r from-brand-primary/30 via-brand-secondary/25 to-brand-accent/25 text-white shadow-inner' : 'text-white/85'}`}
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={activeSection !== link.href ? { 
                        x: 4,
                        color: 'oklch(0.65 0.18 35)',
                        backgroundColor: 'oklch(0.65 0.18 35 / 0.15)',
                        boxShadow: '0 4px 12px rgba(254, 119, 52, 0.2)',
                        transition: { duration: 0.2, ease: 'easeOut' }
                      } : {}}
                      whileTap={{ 
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Button
                      className="navbar-cta w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_-18px_rgba(0,98,255,0.75)] transition-all duration-300"
                      onClick={(e: any) => handleNavClick(e, '#registro')}
                    >
                      {t('register.form.submit')}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}