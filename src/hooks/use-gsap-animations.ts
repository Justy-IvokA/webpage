'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/store/app-store';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean;
  toggleActions?: string;
  markers?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
}

type ParallaxConfig = AnimationConfig & { speed?: number };
type StaggerConfig = AnimationConfig & { stagger?: number };
type RevealConfig = AnimationConfig & { direction?: 'up' | 'down' | 'left' | 'right' };
type PinConfig = AnimationConfig & { pinSpacing?: boolean | 'margin' };
type TextConfig = AnimationConfig & { type?: 'typewriter' | 'reveal' };
type FoldEffectConfig = {
  marqueeSelector?: string;
  trackSelector?: string;
  foldContentSelector?: string;
  centerContentSelector?: string;
  centerFoldSelector?: string;
  startX?: number;
  endX?: number;
  alternateHorizontal?: boolean;
};
type GlitchEffectOptions = {
  baseSelector?: string;
  topSelector?: string;
  bottomSelector?: string;
  repeatDelay?: number;
  skew?: number;
  shift?: number;
  splitOffset?: number;
};
type IntroTextAnimationOptions = {
  c1: string;
  c2: string;
};

type VideoScrollScrubConfig = {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  markers?: boolean;
};

type CardsLoopOptions = {
  container?: Element;
  listSelector?: string;
  itemSelector?: string;
  nextSelector?: string;
  prevSelector?: string;
  pin?: string | Element;
  end?: string;
  markers?: boolean;
  spacing?: number;
};

type TeamCardAnimationConfig = {
  delay?: number;
  floatDuration?: number;
};

type TeamTitleAnimationConfig = {
  charDelay?: number;
  duration?: number;
};

type FloatingElementsConfig = {
  selector?: string;
};

type PillarCardAnimationConfig = {
  delay?: number;
  stagger?: number;
};

type TubeTunnelScrollConfig = {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  markers?: boolean;
  pin?: boolean | Element | string;
  pinSpacing?: boolean;
  onUpdate?: (progress: number) => void;
};

type ShakeAnimationConfig = {
  duration?: number;
  ease?: string;
  repeat?: number;
  delay?: number;
  trigger?: 'auto' | 'hover';
};

type GrowDotScrollConfig = {
  markers?: boolean;
  scrub?: number | boolean;
  pinSpacing?: boolean;
  titleSelector?: string;
  dotSelector?: string;
  markSelector?: string;
  start?: string;
  end?: string;
};

export const useGsapAnimations = () => {
  const { ui } = useAppStore();
  const scopeRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!ui.animationsEnabled || typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Integrate Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Tell GSAP to use Lenis scroll for ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, [ui.animationsEnabled]);

  const { contextSafe } = useGSAP(
    () => {
      // Context is created so that all animations registered through contextSafe
      // are automatically reverted when the component unmounts.
    },
    { scope: scopeRef, dependencies: [ui.animationsEnabled], revertOnUpdate: false }
  );

  const makeSafe = <Args extends unknown[], Return>(
    fn: (...args: Args) => Return,
  ): ((...args: Args) => Return) =>
    contextSafe(fn as (...args: unknown[]) => Return) as (...args: Args) => Return;

  const createScrollAnimation = makeSafe(
    (element: Element, config: AnimationConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = element,
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = false,
        toggleActions = 'play none none reverse',
        markers = false,
        duration = 1,
        delay = 0,
        ease = 'power2.out',
        from = { opacity: 0, y: 50 },
        to = { opacity: 1, y: 0 },
      } = config;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          toggleActions,
          markers,
        },
      });

      timeline.fromTo(element, from, {
        ...to,
        duration,
        delay,
        ease,
      });

      return timeline;
    },
  );

  const createSeamlessCardsLoop = makeSafe(
    (host: Element, opts: CardsLoopOptions = {}) => {
      if (!ui.animationsEnabled) return;

      const container = (opts.container ?? host) as HTMLElement;
      const sectionHost = (container.closest('section') as HTMLElement) || container;
      const listSel = opts.listSelector ?? '.cards';
      const itemSel = opts.itemSelector ?? 'li';
      const nextSel = opts.nextSelector ?? '.actions .next';
      const prevSel = opts.prevSelector ?? '.actions .prev';
      const pinTarget = opts.pin ?? sectionHost;
      const end = opts.end ?? '+=3000';
      const markers = opts.markers ?? false;
      const spacing = opts.spacing ?? 0.1;

      const list = container.querySelector(listSel);
      if (!list) return;

      const items = Array.from(list.querySelectorAll(itemSel));
      
      if (items.length === 0) return;

      gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

      const snapTime = gsap.utils.snap(spacing);

      const animateFunc = (element: Element) => {
        const tl = gsap.timeline();
        tl.fromTo(
          element,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: 'power1.in', immediateRender: false },
        ).fromTo(
          element,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
          0,
        );
        return tl;
      };

      const buildSeamlessLoop = (els: Element[], spacingValue: number, fn: (el: Element) => gsap.core.Timeline) => {
        const rawSequence = gsap.timeline({ paused: true });
        const seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          },
          onReverseComplete() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.totalTime(this.rawTime() + this.duration() * 100);
          },
        });

        const cycleDuration = spacingValue * els.length;
        let dur = 0;

        els.concat(els).concat(els).forEach((_, i) => {
          const anim = fn(els[i % els.length]);
          rawSequence.add(anim, i * spacingValue);
          if (!dur) dur = anim.duration();
        });

        seamlessLoop.fromTo(
          rawSequence,
          { time: cycleDuration + dur / 2 },
          { time: '+=' + cycleDuration, duration: cycleDuration, ease: 'none' },
        );
        return seamlessLoop;
      };

      const seamlessLoop = buildSeamlessLoop(items, spacing, animateFunc);
      const playhead = { offset: 0 } as { offset: number };
      const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
      const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate() {
          seamlessLoop.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: 'power3',
        paused: true,
      });

      // render an initial frame so first card is visible before any scroll
      seamlessLoop.time(0.0001);

      let iteration = 0;

      const trigger = ScrollTrigger.create({
        trigger: sectionHost,
        start: 'top top',
        end,
        markers,
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate(self) {
          const scroll = self.scroll();
          const startPx = self.start as number;
          const endPx = self.end as number;
          if (scroll > endPx - 1) {
            // inline wrap forward to avoid referencing wrap() before initialization
            iteration += 1;
            self.scroll(startPx + 2);
            self.update();
          } else if (scroll < startPx + 1 && self.direction < 0) {
            // inline wrap backward
            iteration -= 1;
            self.scroll(endPx - 2);
            self.update();
          } else {
            (scrub.vars as any).offset = (iteration + self.progress) * seamlessLoop.duration();
            scrub.invalidate().restart();
          }
        },
      });

      // Force an initial update to sync positions
      trigger.update();

      const progressToScroll = (progress: number) => {
        const startPx = (trigger.start as number);
        const endPx = (trigger.end as number);
        const local = gsap.utils.wrap(0, 1, progress);
        const mapped = startPx + local * (endPx - startPx);
        return gsap.utils.clamp(startPx + 1, endPx - 1, mapped);
      };

      const wrap = (iterationDelta: number, scrollTo: number) => {
        iteration += iterationDelta;
        trigger.scroll(scrollTo);
        trigger.update();
      };

      const scrollToOffset = (offset: number) => {
        const snappedTime = snapTime(offset);
        const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
        const scroll = progressToScroll(progress);
        if (progress >= 1 || progress < 0) {
          return wrap(Math.floor(progress), scroll);
        }
        trigger.scroll(scroll);
      };

      const onScrollEnd = () => scrollToOffset((scrub.vars as any).offset);
      ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);

      const nextBtn = container.querySelector<HTMLElement>(nextSel);
      const prevBtn = container.querySelector<HTMLElement>(prevSel);
      const nextHandler = () => scrollToOffset(((scrub.vars as any).offset ?? 0) + spacing);
      const prevHandler = () => scrollToOffset(((scrub.vars as any).offset ?? 0) - spacing);
      nextBtn?.addEventListener('click', nextHandler);
      prevBtn?.addEventListener('click', prevHandler);

      // Detach listeners on cleanup
      return gsap.timeline().eventCallback('onComplete', () => {
        nextBtn?.removeEventListener('click', nextHandler);
        prevBtn?.removeEventListener('click', prevHandler);
        ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd);
      });
    },
  );

  const createTimeline = makeSafe(
    (vars: gsap.TimelineVars = {}) => {
      if (!ui.animationsEnabled) return;
      return gsap.timeline(vars);
    },
  );

  const createParallax = makeSafe(
    (element: Element, config: ParallaxConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = element,
        start = 'top bottom',
        end = 'bottom top',
        speed = 0.5,
        markers = false,
      } = config;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: true,
          markers,
        },
      });

      timeline.to(element, {
        y: `${speed * 100}%`,
        ease: 'none',
      });

      return timeline;
    },
  );

  const createStaggerAnimation = makeSafe(
    (elements: Element[], config: StaggerConfig = {}) => {
      if (!ui.animationsEnabled || elements.length === 0) return;

      const {
        trigger = elements[0],
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = false,
        toggleActions = 'play none none reverse',
        markers = false,
        duration = 0.6,
        stagger = 0.1,
        ease = 'power2.out',
        from = { opacity: 0, y: 30 },
        to = { opacity: 1, y: 0 },
      } = config;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          toggleActions,
          markers,
        },
      });

      timeline.fromTo(elements, from, {
        ...to,
        duration,
        stagger,
        ease,
      });

      return timeline;
    },
  );

  const createRevealAnimation = makeSafe(
    (element: Element, config: RevealConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = element,
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = false,
        toggleActions = 'play none none reverse',
        markers = false,
        duration = 1,
        delay = 0,
        direction = 'up',
      } = config;

      const getClipPath = (progress: number) => {
        switch (direction) {
          case 'up':
            return `inset(${100 - progress * 100}% 0 0 0)`;
          case 'down':
            return `inset(0 0 ${100 - progress * 100}% 0)`;
          case 'left':
            return `inset(0 ${100 - progress * 100}% 0 0)`;
          case 'right':
            return `inset(0 0 0 ${100 - progress * 100}%)`;
          default:
            return `inset(${100 - progress * 100}% 0 0 0)`;
        }
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          toggleActions,
          markers,
        },
      });

      timeline.fromTo(
        element,
        { clipPath: getClipPath(0) },
        {
          clipPath: getClipPath(1),
          duration,
          delay,
          ease: 'power2.inOut',
        },
      );

      return timeline;
    },
  );

  const createPinAnimation = makeSafe(
    (element: Element, config: PinConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = element,
        start = 'top top',
        end = '+=500',
        scrub = true,
        markers = false,
        pinSpacing = true,
      } = config;

      return ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        markers,
        pin: element,
        pinSpacing,
      });
    },
  );

  const createTextAnimation = makeSafe(
    (element: Element, config: TextConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = element,
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = false,
        toggleActions = 'play none none reverse',
        markers = false,
        duration = 1,
        delay = 0,
        type = 'reveal',
      } = config;

      const text = element.textContent || '';
      element.innerHTML = '';

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          toggleActions,
          markers,
        },
      });

      if (type === 'typewriter') {
        text.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          element.appendChild(span);

          timeline.to(
            span,
            {
              opacity: 1,
              duration: duration / Math.max(text.length, 1),
              delay: delay + (index * duration) / Math.max(text.length, 1),
            },
            index * 0.01,
          );
        });
      } else {
        text.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          element.appendChild(span);

          timeline.fromTo(
            span,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: duration / Math.max(text.length, 1),
              delay: delay + (index * duration) / Math.max(text.length, 1) * 0.1,
            },
            index * 0.01,
          );
        });
      }

      return timeline;
    },
  );

  const createNavbarSurfaceAnimation = makeSafe(
    (surface: gsap.TweenTarget, setCfg: gsap.TweenVars = {}, toCfg: gsap.TweenVars = {}) => {
      if (!ui.animationsEnabled) return;

      gsap.set(surface, setCfg);

      const surfaceTimeline = createTimeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '120px top',
          scrub: 0.5,
        },
      });

      surfaceTimeline?.to(surface, toCfg);

      return surfaceTimeline;
    },
  );

  const createNavbarBlurAnimation = makeSafe(
    (element: Element, fromCfg: gsap.TweenVars = {}, toCfg: gsap.TweenVars = {}) => {
      if (!ui.animationsEnabled) return;

      const navTimeline = createTimeline({
        scrollTrigger: {
          trigger: element,
          start: 'bottom top',
        },
      });

      navTimeline?.fromTo(element, fromCfg, toCfg);

      return navTimeline;
    },
  );

  const createFoldEffect = makeSafe(
    (container: Element, config: FoldEffectConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        marqueeSelector = '.marquee',
        trackSelector = '.track',
        foldContentSelector = '.fold-content',
        centerContentSelector = '#center-content',
        centerFoldSelector = '#center-fold',
        startX = -500,
        endX = -1500,
        alternateHorizontal = true,
      } = config;

      const marqueeElements = Array.from(container.querySelectorAll<HTMLElement>(marqueeSelector));
      marqueeElements.forEach((marquee, index) => {
        const track = marquee.querySelector<HTMLElement>(trackSelector);
        if (!track) return;

        const isEven = index % 2 === 0;
        const xFrom = startX;
        const xTo = alternateHorizontal && !isEven ? -startX : endX;

        gsap.fromTo(
          track,
          { x: xFrom },
          {
            x: xTo,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      });

      const foldContents = Array.from(container.querySelectorAll<HTMLElement>(foldContentSelector));
      if (foldContents.length === 0) return;

      const centerContent =
        container.querySelector<HTMLElement>(centerContentSelector) ?? foldContents[Math.floor(foldContents.length / 2)] ?? null;
      const centerFold =
        container.querySelector<HTMLElement>(centerFoldSelector) ?? container;

      const setters = foldContents.map((content) => gsap.quickSetter(content, 'y', 'px'));

      const computeOverflow = () => {
        if (!centerContent || !centerFold) return 0;
        return Math.max(0, centerContent.scrollHeight - centerFold.clientHeight);
      };

      let overflow = computeOverflow();

      const foldTimeline = createTimeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const offset = gsap.utils.interpolate(0, -overflow, self.progress);
            setters.forEach((set) => set(offset));
          },
          onRefresh: () => {
            overflow = computeOverflow();
          },
        },
      });

      return foldTimeline;
    },
  );

  const buildGlitchEffectTimeline = (
    container: Element,
    {
      baseSelector,
      topSelector,
      bottomSelector,
      repeatDelay,
      skew,
      shift,
      splitOffset,
    }: Required<GlitchEffectOptions>,
  ) => {
    const host = container as HTMLElement;
    const base = host.matches(baseSelector) ? host : host.querySelector<HTMLElement>(baseSelector);
    const top = host.querySelector<HTMLElement>(topSelector) ?? undefined;
    const bottom = host.querySelector<HTMLElement>(bottomSelector) ?? undefined;

    const targets = [base, top, bottom].filter((element, index, array): element is HTMLElement => {
      return Boolean(element) && array.indexOf(element) === index;
    });

    if (targets.length === 0) return;

    const timeline = createTimeline({
      repeat: -1,
      repeatDelay,
      defaults: { ease: 'power4.inOut' },
    });

    if (!timeline) return;

    gsap.set(targets, { transformOrigin: 'center center' });
    gsap.set(host, { transformOrigin: 'center center' });

    const topTargets = top ? [top] : targets;
    const bottomTargets = bottom ? [bottom] : targets;

    const toggleClass = (elements: HTMLElement[], className: string, add: boolean, position: gsap.Position) => {
      timeline.call(() => {
        elements.forEach((element) => {
          element.classList[add ? 'add' : 'remove'](className);
        });
      }, undefined, position);
    };

    timeline
      .to(targets, { skewX: skew, duration: 0.1 })
      .to(targets, { skewX: 0, duration: 0.04 })
      .to(targets, { opacity: 0, duration: 0.04 })
      .to(targets, { opacity: 1, duration: 0.04 })
      .to(targets, { x: -shift, duration: 0.04 })
      .to(targets, { x: 0, duration: 0.04 })
      .add('split', 0);

    timeline.to(topTargets, { x: -splitOffset, duration: 0.5 }, 'split');
    timeline.to(bottomTargets, { x: splitOffset, duration: 0.5 }, 'split');

    toggleClass(targets, 'redShadow', true, 'split');
    toggleClass(targets, 'redShadow', false, 'split+=0.09');
    toggleClass(targets, 'greenShadow', true, 'split');
    toggleClass(targets, 'greenShadow', false, 'split+=0.1');

    timeline.to(host, { scale: 1.1, duration: 0, immediateRender: false }, 'split');
    timeline.to(host, { scale: 1, duration: 0.02 }, 'split+=0.02');

    timeline
      .to(topTargets, { x: 0, duration: 0.2 })
      .to(bottomTargets, { x: 0, duration: 0.2 })
      .to(targets, { scaleY: 1.1, duration: 0.02 })
      .to(targets, { scaleY: 1, duration: 0.04 });

    return timeline;
  };

  const createGlitchEffectImages = makeSafe(
    (container: Element, options: GlitchEffectOptions = {}) => {
      if (!ui.animationsEnabled) return;

      return buildGlitchEffectTimeline(container, {
        baseSelector: options.baseSelector ?? '[data-glitch-image-base], [data-glitch-base], img',
        topSelector: options.topSelector ?? '[data-glitch-image-top], [data-glitch-layer="top"], .top',
        bottomSelector: options.bottomSelector ?? '[data-glitch-image-bottom], [data-glitch-layer="bottom"], .bottom',
        repeatDelay: options.repeatDelay ?? 2,
        skew: options.skew ?? 70,
        shift: options.shift ?? 20,
        splitOffset: options.splitOffset ?? 60,
      });
    },
  );

  const createGlitchEffectText = makeSafe(
    (container: Element, options: GlitchEffectOptions = {}) => {
      if (!ui.animationsEnabled) return;

      return buildGlitchEffectTimeline(container, {
        baseSelector: options.baseSelector ?? '[data-glitch-text-base], [data-glitch-base], .glitch',
        topSelector: options.topSelector ?? '[data-glitch-text-top], [data-glitch-layer="top"], .top',
        bottomSelector: options.bottomSelector ?? '[data-glitch-text-bottom], [data-glitch-layer="bottom"], .bottom',
        repeatDelay: options.repeatDelay ?? 2,
        skew: options.skew ?? 70,
        shift: options.shift ?? 20,
        splitOffset: options.splitOffset ?? 60,
      });
    },
  );

  const createIntroTextAnimation = makeSafe(
    (container: Element, options: IntroTextAnimationOptions) => {
      if (!ui.animationsEnabled) return;

      const txt1 = container.querySelector<HTMLElement>('.txt1');
      const txt2 = container.querySelector<HTMLElement>('.txt2');
      const bar = container.querySelector<HTMLElement>('.bar');
      if (!txt1 || !txt2 || !bar) return;

      const txt1Bounds = txt1.getBoundingClientRect();
      const txt1Width = txt1.offsetWidth;
      const txt2Width = txt2.offsetWidth;
      const originalTxt2 = txt2.textContent ?? '';
      const split = new SplitText(txt2, { type: 'chars' });
      const chars = split.chars;

      if (chars.length === 0) {
        split.revert();
        return;
      }

      gsap.set(chars, { opacity: 0, display: 'inline-block' });

      gsap.set(txt2, { display: 'inline-block' });

      const moveBar = () => {
        const currentWidth = Number(gsap.getProperty(txt1, 'width')) || txt1Bounds.width;
        gsap.set(bar, { left: currentWidth + 1 });
      };

      const cleanup = () => {
        split.revert();
        txt2.textContent = originalTxt2;
      };

      return gsap
        .timeline({ delay: 0.2 })
        .set(txt1, { color: options.c1, fontWeight: 'regular', display: 'inline-block' })
        .set(txt2, {
          color: options.c2,
          fontWeight: 'bold',
          opacity: 0,
          x: txt1Width-2,
          display: 'inline-block',
          immediateRender: true,
        })
        .set(bar, {
          left: 1,
          opacity: 1,
          height: txt1Bounds.height || txt1.offsetHeight,
          backgroundColor: options.c1,
          immediateRender: true,
        })
        .fromTo(
          bar,
          { opacity: 1 },
          {
            duration: 0.1,
            opacity: 0,
            ease: 'expo.in',
            yoyo: true,
            repeat: 5,
            repeatDelay: 0.3,
          },
          0,
        )
        .from(txt1, { duration: 1.1, width: 0, ease: `steps(${txt1Width})`, onUpdate: moveBar, opacity: 1 }, 2.5)
        .to(bar, { duration: 0.05, backgroundColor: options.c2 }, '+=0.15')
        .to(bar, { duration: 1.0, width: txt2Width, ease: 'power4.inOut' }, '+=0.1')
        .from(container, { duration: 1.0, x: 135, ease: 'power4.inOut' }, '-=1.0')
        .to(txt2, { duration: 0.01, opacity: 1, x: 0, ease: 'power4.out' }, '-=0.1')
        .to(bar, { duration: 0.4, x: txt2Width, width: 0, ease: 'power4.in' })
        .to(
          chars,
          {
            duration: 0.6,
            opacity: 1,
            ease: 'power3.inOut',
            stagger: 0.02,
          },
          '-=0.5',
        )
        .to(txt1, { duration: 1.5, opacity: 1, ease: 'power3.inOut', width: txt1Width+12 }, '-=1.2')
        .timeScale(1.45)
        .eventCallback('onComplete', cleanup)
        .eventCallback('onInterrupt', cleanup);
    },
  );

  const createVideoScrollScrub = makeSafe(
    (video: HTMLVideoElement, config: VideoScrollScrubConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        trigger = video,
        start = 'top top',
        end = 'bottom+=100% bottom',
        scrub = 2,
        markers = false,
      } = config;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          markers,
        },
      });

      const onLoaded = () => {
        // Scrub video currentTime to full duration as the user scrolls
        timeline.to(video, { currentTime: video.duration-5, ease: 'none' });
      };

      // If metadata already available, run immediately; otherwise wait
      if (!isNaN(video.duration) && video.duration > 0) {
        onLoaded();
      } else {
        const handler = () => onLoaded();
        video.addEventListener('loadedmetadata', handler, { once: true } as AddEventListenerOptions);
      }

      // Touch devices workaround to allow programmatic currentTime changes
      const isTouch =
        'ontouchstart' in window ||
        (navigator as any).maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
      if (isTouch) {
        // Best-effort; ignore errors if autoplay is blocked
        video.play().then(() => video.pause()).catch(() => {});
      }

      return timeline;
    },
  );

  const createTeamCardAnimation = makeSafe(
    (element: Element, config: TeamCardAnimationConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        delay = 0,
        floatDuration = 2,
      } = config;

      // Entrance animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      entranceTl.fromTo(
        element,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay,
        }
      );

      // Continuous floating animation
      gsap.to(element, {
        y: '+=15',
        duration: floatDuration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      return entranceTl;
    },
  );

  const createTeamCardHoverEffects = makeSafe(
    (cardElement: Element, imageElement: Element, videoElement: HTMLVideoElement) => {
      if (!ui.animationsEnabled) return;

      const card = cardElement as HTMLElement;
      const image = imageElement as HTMLElement;
      const video = videoElement;

      // Check if video is already loaded or wait for it
      const isVideoReady = () => video.readyState >= 3; // HAVE_FUTURE_DATA or higher

      const handleMouseEnter = () => {
        // Scale and rotate card
        gsap.to(card, {
          scale: 1.05,
          z: 50,
          rotateY: 5,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Fade out image
        gsap.to(image, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        // Play video - try immediately or wait for load
        const playVideo = () => {
          video.currentTime = 0;
          video.play().catch((err) => {
            console.warn('Video play failed:', err);
          });
        };

        if (isVideoReady()) {
          playVideo();
        } else {
          video.addEventListener('canplay', playVideo, { once: true });
        }
      };

      const handleMouseLeave = () => {
        // Reset card transform
        gsap.to(card, {
          scale: 1,
          z: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Fade in image
        gsap.to(image, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        // Pause and reset video
        video.pause();
        video.currentTime = 0;
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return {
        destroy: () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        },
      };
    },
  );

  const createTeamTitleAnimation = makeSafe(
    (element: Element, config: TeamTitleAnimationConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        charDelay = 0.05,
        duration = 0.5,
      } = config;

      const chars = element.textContent?.split('') || [];
      element.innerHTML = '';

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);

        timeline.fromTo(
          span,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            ease: 'power2.out',
          },
          i * charDelay,
        );
      });

      return timeline;
    },
  );

  const createFloatingElementsAnimation = makeSafe(
    (container: Element, config: FloatingElementsConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const { selector = '.bg-element' } = config;
      const elements = container.querySelectorAll(selector);

      elements.forEach((el, i) => {
        gsap.to(el, {
          y: '+=30',
          x: i % 2 === 0 ? '+=20' : '-=20',
          rotation: i % 2 === 0 ? '+=5' : '-=5',
          duration: 3 + i,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    },
  );

  const createPillarCardAnimation = makeSafe(
    (element: Element, config: PillarCardAnimationConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const { delay = 0 } = config;

      // Entrance animation with 3D effect
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline.fromTo(
        element,
        {
          opacity: 0,
          y: 80,
          rotateX: -20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay,
        }
      );

      // Animate icon
      const icon = element.querySelector('[data-pillar-icon]');
      if (icon) {
        timeline.fromTo(
          icon,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        );
      }

      // Animate title
      const title = element.querySelector('[data-pillar-title]');
      if (title) {
        timeline.fromTo(
          title,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }

      // Animate description
      const description = element.querySelector('[data-pillar-description]');
      if (description) {
        timeline.fromTo(
          description,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      return timeline;
    },
  );

  const createPillarTitleAnimation = makeSafe(
    (element: Element) => {
      if (!ui.animationsEnabled) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline.fromTo(
        element,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      return timeline;
    },
  );

  const createTubeTunnelScroll = makeSafe(
    (config: TubeTunnelScrollConfig = {}) => {
      // Don't check ui.animationsEnabled here - it's captured in closure
      // and may be stale. AnimationProvider already checks before calling.

      const {
        trigger,
        start = 'top top',
        end = 'bottom bottom',
        scrub = 5,
        markers = false,
        pin = false,
        pinSpacing = true,
        onUpdate,
      } = config;

      if (!trigger) {
        return;
      }

      const tubePerc = { percent: 0 };

      const scrollTriggerConfig: ScrollTrigger.Vars = {
        trigger,
        start,
        end,
        scrub,
        markers,
      };

      // Add pin if specified
      if (pin) {
        const pinElement = pin === true ? trigger : pin;
        scrollTriggerConfig.pin = pinElement;
        scrollTriggerConfig.pinSpacing = pinSpacing;
      }

      const timeline = gsap.timeline({
        scrollTrigger: scrollTriggerConfig,
      });

      timeline.to(tubePerc, {
        percent: 0.96,
        ease: 'none',
        duration: 10,
        onUpdate: function () {
          if (onUpdate) {
            onUpdate(tubePerc.percent);
          }
        },
      });

      return timeline;
    },
  );

  const createShakeAnimation = makeSafe(
    (element: Element, config: ShakeAnimationConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const {
        duration = 1,
        ease = 'ease',
        repeat = 0,
        delay = 0,
        trigger = 'auto',
      } = config;

      const createShakeTimeline = () => {
        const timeline = gsap.timeline({
          delay,
          repeat,
          paused: trigger === 'hover',
        });

        // Recreate the CSS keyframes animation with GSAP
        timeline
          .set(element, { transformOrigin: '50% 50%' })
          .to(element, { rotation: 8, duration: duration * 0.1, ease })
          .to(element, { rotation: -10, duration: duration * 0.1, ease })
          .to(element, { rotation: 10, duration: duration * 0.1, ease })
          .to(element, { rotation: -10, duration: duration * 0.1, ease })
          .to(element, { rotation: 10, duration: duration * 0.1, ease })
          .to(element, { rotation: -10, duration: duration * 0.1, ease })
          .to(element, { rotation: 10, duration: duration * 0.1, ease })
          .to(element, { rotation: -8, duration: duration * 0.1, ease })
          .to(element, { rotation: 8, duration: duration * 0.1, ease })
          .to(element, { rotation: 0, duration: duration * 0.1, ease });

        return timeline;
      };

      const timeline = createShakeTimeline();

      // If hover trigger, setup event listeners
      if (trigger === 'hover') {
        const handleMouseEnter = () => {
          timeline.restart();
        };

        element.addEventListener('mouseenter', handleMouseEnter);

        // Return cleanup function
        return {
          timeline,
          destroy: () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            timeline.kill();
          },
        };
      }
      return timeline;
    },
  );

  // Grow Dot on Scroll (from CodePen "Grow circle to fill the screen")
  const createGrowDotScroll = makeSafe(
    (section: Element, options: GrowDotScrollConfig = {}) => {
      if (!ui.animationsEnabled) return;

      const host = section as HTMLElement;
      const {
        markers = false,
        scrub = 1.5,
        pinSpacing = true,
        titleSelector = '[data-grow-dot-title], #title, p',
        dotSelector = '[data-grow-dot-dot], .dot',
        markSelector = '[data-grow-dot-mark], span',
        start = 'top top',
        end = 'bottom top',
      } = options;

      const title = host.querySelector<HTMLElement>(titleSelector);
      const dot = host.querySelector<HTMLElement>(dotSelector);
      const mark = title?.querySelector<HTMLElement>(markSelector) || undefined;

      if (!title || !dot || !host) return;

      // Prepare dot at center
      gsap.set(dot, {
        width: '142vmax',
        height: '142vmax',
        xPercent: -50,
        yPercent: -50,
        top: '50%',
        left: '50%',
        position: 'absolute',
        borderRadius: '50%',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: host,
          start,
          end,
          markers,
          scrub,
          pin: host,
          pinSpacing,
          invalidateOnRefresh: true,
        },
      });

      // Fade in title first
      tl.to(title, { opacity: 1 });

      // Compute from position based on mark relative to section center
      const computeFrom = () => {
        const secBounds = host.getBoundingClientRect();
        const markBounds = (mark ?? title).getBoundingClientRect();
        const px = markBounds.left + markBounds.width * 0.54;
        const py = markBounds.top + markBounds.height * 0.73;
        return {
          x: px - (secBounds.left + secBounds.width / 2),
          y: py - (secBounds.top + secBounds.height / 2),
        };
      };

      tl.fromTo(
        dot,
        () => {
          const { x, y } = computeFrom();
          return { scale: 0, x, y } as gsap.TweenVars;
        },
        { x: 0, y: 0, scale: 1, ease: 'power3.in' },
      );

      return tl;
    },
  );

  const refresh = makeSafe(() => {
    ScrollTrigger.refresh();
  });

  return {
    scopeRef,
    createScrollAnimation,
    createTimeline,
    createParallax,
    createStaggerAnimation,
    createRevealAnimation,
    createPinAnimation,
    createTextAnimation,
    createNavbarBlurAnimation,
    createNavbarSurfaceAnimation,
    createFoldEffect,
    createGlitchEffectImages,
    createGlitchEffectText,
    createIntroTextAnimation,
    createSeamlessCardsLoop,
    createVideoScrollScrub,
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
  };
};