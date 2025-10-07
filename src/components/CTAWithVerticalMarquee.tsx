"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode, useEffect, useRef, JSX } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(
        containerRef.current.querySelectorAll(".marquee-item")
      ) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ 
        "--duration": `${speed}s`,
        WebkitOverflowScrolling: "touch",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      } as CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Todas las IAs",
  "APPs Exclusivas",
  "Podcasts",
  "Webbinars",
  "Comunidad activa",
  "Guías",
  "Retos mensuales",
  "Descargables",
];

export default function CTAWithVerticalMarquee(): JSX.Element {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item");
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="text-foreground flex items-center justify-center px-6 py-12 overflow-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="w-full max-w-7xl animate-fade-in-up" style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-stretch">
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-8 border border-cyan-500/10">
            <h1 className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-white drop-shadow-lg animate-fade-in-up [animation-delay:200ms]">
              Estás a un "click"
            </h1>
            <p className="relative z-10 text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md animate-fade-in-up [animation-delay:400ms]">
              ¡Únete a la comunidad que está revolucionando la forma en que interactuamos con la inteligencia artificial! Al unirte a <span className="font-bold">Ivoka</span>, serás parte de una tribu revolucionaria que cambiará la forma en que vivimos y trabajamos. ¡No dejes pasar esta oportunidad!
            </p>
            {/* Decorative line */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="https://ivoka.ai"
              className="flex items-center gap-3 pt-2 transition-all duration-500"
            >
              <div className="h-1 w-0 bg-white rounded-full transition-all duration-500 hover:w-16" />
              <span className="text-white/70 text-sm font-medium transition-all duration-500 delay-100">
                Descubre más
              </span>
            </Link>
          </motion.div>

          </div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 p-8 md:p-10 lg:p-12 flex items-center justify-center border border-cyan-500/10">
            <div ref={marqueeRef} className="relative w-full h-[500px] lg:h-[600px] overflow-hidden" style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}>
              <VerticalMarquee speed={20} pauseOnHover={true} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 marquee-item text-white/90 dark:text-white/90"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
