'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Section, SectionHeader } from '@/components/shared/section';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionCard, StaggerContainer, StaggerItem, GlowOnHover, Floating } from '@/components/shared/motion-wrapper';
import { useTranslation } from 'react-i18next';
import VideoScrollSection from '@/components/VideoScrollSection';
import Team from '@/components/Team';
import Pillars from '@/components/Pillars';
import CTAWithVerticalMarquee from "@/components/CTAWithVerticalMarquee";
import { CircuitBackground } from '@/components/Background-paths';
import Register from '@/components/Register';
import { Testimonials } from '@/components/testimonial';
import { About } from '@/components/About';
import { Price } from '@/components/Price';

export default function Home() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

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
    const contentSection = document.getElementById('features');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              transition={{ duration: 1, delay: 0.2 }}
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
              
              <p className="absolute bottom-10 text-xl md:text-2xl mb-8 text-white/90 left-1/2 transform -translate-x-1/2">
                {t('manifesto.lema')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <GlowOnHover>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white text-lg px-8 py-4"
                    onClick={() => {
                      const registrationSection = document.getElementById('manifiesto');
                      if (registrationSection) {
                        registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Comenzar Ahora
                  </Button>
                </GlowOnHover>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-brand-primary text-lg px-8 py-4"
                    onClick={scrollToContent}
                  >
                    Explorar Más
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
          <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
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