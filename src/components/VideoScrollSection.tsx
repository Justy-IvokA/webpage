'use client';

import React from 'react';

/**
 * Demo component for GSAP video scroll-scrub effect.
 * Requires being rendered inside the AnimationProvider so it auto-initializes.
 * src="https://www.dropbox.com/scl/fi/qejf5dgqiv6m77d71r2ec/abstract-background-ink-water.mp4?rlkey=cf5xf73grwr5olszcyjghc5pt&raw=1"
 */
export default function VideoScrollSection() {
  return (
    <section id="manifiesto" className="relative h-screen overflow-hidden">
      {/* Video background layer */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          data-video-scroll-scrub
          data-start="top-=150% top"
          data-end="bottom+=125% bottom"
          data-scrub="2"
          data-markers="false"
          playsInline
          preload="auto"
          muted={false}
          src="/videos/stream.mp4"
        />
        {/* Subtle gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" aria-hidden="true" />
      </div>

      {/* Text overlay layer */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-6 md:px-10 text-center max-w-4xl" data-video-text>
          <p className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed md:leading-relaxed lg:leading-relaxed">
            <span className="intro-line inline-block overflow-hidden">
              <span className="inline-block">IvokA es una <strong className="font-semibold text-ivoka-orange">comunidad</strong> que une lo humano y la tecnología.</span>
            </span>
            <br />
            <span className="intro-line inline-block overflow-hidden">
              <span className="inline-block">Aquí, la <strong className="font-semibold text-ivoka-blue">inteligencia artificial</strong> se convierte en aliada para liberar tu creatividad, fortalecer tu voz y ordenar tu vida.</span>
            </span>
            <br />
            <span className="intro-line inline-block overflow-hidden">
              <span className="inline-block">Aprenderás haciendo, acompañado de una tribu que <strong className="font-semibold text-ivoka-green">celebra tus logros</strong> y te sostiene en cada desafío.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

