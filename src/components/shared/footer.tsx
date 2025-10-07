'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Github, Heart, Sparkles, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// Custom X (formerly Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer({ animated = true, showStats = true }: { animated?: boolean; showStats?: boolean }) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = useMemo(
    () => [
      {
        title: t('footer.sections.company.title'),
        links: [
          { label: t('footer.sections.company.links.about'), href: '/about' },
          { label: t('footer.sections.company.links.team'), href: '/equipo' },
          { label: t('footer.sections.company.links.careers'), href: '/carreras' },
          { label: t('footer.sections.company.links.press'), href: '/prensa' },
        ],
      },
      {
        title: t('footer.sections.resources.title'),
        links: [
          { label: t('footer.sections.resources.links.blog'), href: '/blog' },
          { label: t('footer.sections.resources.links.docs'), href: '/docs' },
          { label: t('footer.sections.resources.links.api'), href: '/api' },
          { label: t('footer.sections.resources.links.support'), href: '/soporte' },
        ],
      },
      {
        title: t('footer.sections.legal.title'),
        links: [
          { label: t('footer.sections.legal.links.terms'), href: '/terminos' },
          { label: t('footer.sections.legal.links.privacy'), href: '/privacidad' },
          { label: t('footer.sections.legal.links.cookies'), href: '/cookies' },
          { label: t('footer.sections.legal.links.legalNotice'), href: '/aviso-legal' },
        ],
      },
    ],
    [t],
  );

  const socialLinks = useMemo(
    () => [
      { icon: Facebook, href: 'https://www.facebook.com/61581741661653/', label: t('footer.social.facebook'), color: '#0062FF' },
      // { icon: XIcon, href: 'https://x.com', label: 'X', color: '#7964F2' },
      { icon: Instagram, href: 'https://instagram.com/ivokamx', label: t('footer.social.instagram'), color: '#FE7734' },
      { icon: Linkedin, href: 'https://linkedin.com', label: t('footer.social.linkedin'), color: '#B9CA19' },
      // { icon: Github, href: 'https://github.com', label: 'GitHub', color: '#FFFEF7' },
    ],
    [t],
  );

  const contactInfo = useMemo(
    () => [
      { icon: Mail, text: t('navbar.topBar.email'), href: 'mailto:info@ivoka.ai', color: '#0062FF' },
      { icon: Phone, text: t('navbar.topBar.phone'), href: 'tel:+522213528341', color: '#B9CA19' },
      { icon: MapPin, text: t('navbar.topBar.location'), href: 'https://maps.google.com', color: '#FE7734' },
    ],
    [t],
  );

  const stats = useMemo(
    () => [
      { icon: Users, value: '10K+', label: t('footer.stats.members'), color: '#0062FF' },
      { icon: Sparkles, value: '500+', label: t('footer.stats.projects'), color: '#B9CA19' },
      { icon: Zap, value: '98%', label: t('footer.stats.satisfaction'), color: '#FE7734' },
    ],
    [t],
  );

  return (
    <footer id="footer" className="relative w-full mt-auto overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-[#FFFEF7]">
      {/* Animated grid background */}
      <style>
        {`
          @keyframes animate-grid-footer {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animated-grid-footer {
            width: 200%;
            height: 200%;
            background-image: 
              linear-gradient(to right, #06b6d4 1px, transparent 1px), 
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
            background-size: 50px 50px;
            animation: animate-grid-footer 40s linear infinite alternate;
          }
          .static-grid-footer {
            background-image: 
              linear-gradient(to right, #06b6d4 1px, transparent 1px), 
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}
      </style>
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none ${
          animated ? 'animated-grid-footer' : 'static-grid-footer inset-0'
        }`}
      />

      {/* Stats Section - Conditional */}
      {showStats && (
        <div className="relative border-b border-[#FFFEF7]/10">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#0062FF] via-[#B9CA19] to-[#FE7734] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#FFFEF7]/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section - Spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <img src="/Ivoka-White@2x.png" alt={t('footer.brand.logoAlt')} className="h-8 w-auto mb-4" />
            </div>
            <p className="text-[#FFFEF7]/70 text-sm leading-relaxed max-w-sm mb-2">
              {t('footer.brand.description')}
            </p>
            {/* Contact Info with enhanced styling */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="group flex items-center gap-3 text-[#FFFEF7]/70 hover:text-[#FFFEF7] transition-all duration-300"
                  whileHover={{ x: 5 }}
                  target={info.icon === MapPin ? '_blank' : undefined}
                  rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                >
                  <div 
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300 border border-white/10"
                    style={{
                      boxShadow: `0 0 20px ${info.color}20`,
                    }}
                  >
                    <info.icon className="h-4 w-4" style={{ color: info.color }} />
                  </div>
                  <span className="text-sm font-medium">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-[#FFFEF7] relative inline-block">
                {section.title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#0062FF] to-[#B9CA19]" />
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#FFFEF7]/60 hover:text-[#0062FF] transition-colors duration-300 text-sm group inline-flex items-center gap-2"
                    >
                      <span className="w-0 h-px bg-[#0062FF] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-[#FFFEF7]/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright with enhanced styling */}
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-[#FFFEF7]/50">
              <span className="flex items-center gap-2 text-center md:text-left">
                {t('footer.copyright', { year: currentYear })}
              </span>
              <span className="hidden md:inline text-[#FFFEF7]/50">•</span>
              <span className="flex items-center gap-2">
                {t('footer.bottom.madeWith')}
                <Heart className="h-3.5 w-3.5 text-[#FE7734] fill-current animate-pulse" />
                {t('footer.bottom.byCommunity')}
              </span>
            </div>

            {/* Social Links with colorful hover effects */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: `0 0 0 rgba(${social.color}, 0)`,
                  }}
                  onHoverStart={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.boxShadow = `0 0 20px ${social.color}40`;
                  }}
                  onHoverEnd={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.boxShadow = `0 0 0 rgba(${social.color}, 0)`;
                  }}
                >
                  <social.icon 
                    className="h-4 w-4 text-[#FFFEF7]/60 group-hover:text-[#FFFEF7] transition-colors duration-300" 
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom accent */}
      <div className="h-1 bg-gradient-to-r from-[#0062FF] via-[#B9CA19] to-[#FE7734]" />
    </footer>
  );
}