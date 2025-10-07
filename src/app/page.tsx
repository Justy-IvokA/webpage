'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import VideoScrollSection from '@/components/VideoScrollSection';
import Team from '@/components/sections/Team';
import Pillars from '@/components/sections/Pillars';
import CTAWithVerticalMarquee from "@/components/CTAWithVerticalMarquee";
import { CircuitBackground } from '@/components/Background-paths';
import Register from '@/components/sections/Register';
import { Testimonials } from '@/components/testimonial';
import { About } from '@/components/sections/About';
import { Price } from '@/components/sections/Price';

export default function Home() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Scroll to content
  const scrollToContent = () => {
    const contentSection = document.getElementById('manifiesto');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rotación de pilares
  useEffect(() => {
    const pillars = ['ai', 'humanDev', 'finance'];
    const interval = setInterval(() => {
      setCurrentPillarIndex((prev) => (prev + 1) % pillars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!logoRef.current) return;

    gsap.to(logoRef.current, {
      scale: 1.10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, { scope: heroRef });

  return (
    <main className="min-h-screen bg-slate-950">
      {/* <ProgressIndicator position="top" showPercentage={true} /> */}
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} data-hero-parallax className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="video-layer absolute inset-0" data-hero-video>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/videos/IvokaLoop.mp4" type="video/mp4" />
            {/* <source src="/IvokaLoop.webm" type="video/webm" /> */}
            {/* Fallback image */}
            <img
              src="/images/Poster_1080x1080.jpg"
              alt="Ivoka"
              className="w-full h-full object-cover"
            />
          </video>
        </div>

        {/* Pattern Background */}
        <div className="pattern-layer absolute inset-0 size-full bg-cover bg-[url('/PatternCircuitos@2x.png')] blur-md"/>
        {/* Overlay aplica efecto de oscurecimiento a la seccion */}
        {/* <div className="overlay-layer absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" data-hero-overlay /> */}

        {/* Content */}
        <div className="content-layer relative z-10 h-full flex items-center justify-center" data-hero-content>
          <div className="container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="block">{t('hero.title')}</span>
              </h1> */}
              <Image
                ref={logoRef}
                src="/Ivokalogo@2x.png"
                alt="LogoBase"
                width={500}
                height={250}
                className="ml-2 md:ml-10 inline-block h-auto"
              />
            </motion.div>
              
            {/* Slogan con texto rotativo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-6 md:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[90%] md:w-auto max-w-5xl"
            >
              <div className="relative overflow-hidden bg-gradient-to-r from-primary-600/20 via-accent-500/25 to-[#7964F2]/20 backdrop-blur-md border border-white/20 rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-2xl">
                {/* Efecto de brillo animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Texto con parte rotativa */}
                <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm md:text-base lg:text-xl text-white text-center">
                  <span className="font-bold drop-shadow-lg">{t('hero.sloganBase')}</span>
                  
                  <div className="inline-flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-[#B9CA19] to-[#FE7734] shadow-lg shadow-accent-500/50"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    <motion.span
                      key={currentPillarIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="font-bold bg-gradient-to-r from-[#B9CA19] via-[#FE7734] to-[#7964F2] bg-clip-text text-transparent drop-shadow-2xl whitespace-nowrap"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(185, 202, 25, 0.5))',
                      }}
                    >
                      {t(`hero.pillarsMarquee.${['ai', 'humanDev', 'finance'][currentPillarIndex]}`)}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* <GlowOnHover>
                  <Button
                    size="lg"
                    className="hidden md:block bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-600/90 hover:to-accent-600/90 text-white text-lg px-8 py-4"
                    onClick={() => {
                      const registrationSection = document.getElementById('manifiesto');
                      if (registrationSection) {
                        registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                </GlowOnHover> */}
                
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Efecto de resplandor animado de fondo */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-600 to-[#7964F2] rounded-lg blur-lg opacity-75 group-hover:opacity-100"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                  
                  {/* Botón principal */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative border-2 border-white/80 text-white bg-black/40 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary-400 hover:to-destructive-700 hover:border-transparent text-lg px-10 py-6 font-semibold transition-all duration-300 group-hover:shadow-2xl"
                    onClick={scrollToContent}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explorar Más
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVideoPlay}
              className="text-white hover:bg-white/20"
              aria-label={isVideoPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToContent}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      <VideoScrollSection />

      <section id="features" className="w-full">
        <CircuitBackground colorMode="palette">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="bg-element absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="bg-element absolute bottom-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="bg-element absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #06b6d4 1px, transparent 1px),
                linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          <CTAWithVerticalMarquee />
        </CircuitBackground>
      </section>

      <Pillars />

      <Team />

      <About />

      <Testimonials />
      {/* OJO: Desactivar el modo founder cuando acabe la promoción */}
      <Price founder={true} />

      <Register />

      <Footer animated={true} showStats={false} />
    </main>
  );
}