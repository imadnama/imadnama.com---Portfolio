import { useEffect, useRef, useState } from 'react';
import { Home, User, Code2, FolderGit2, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useAnimate } from 'framer-motion';
import { CONTACT_EMAIL } from './ContactButton';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Section id to track for the active state. Omit for action links. */
  sectionId?: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home, sectionId: 'home' },
  { label: 'Skills', href: '#skills', icon: Code2, sectionId: 'skills' },
  { label: 'About', href: '#about', icon: User, sectionId: 'about' },
  { label: 'Projects', href: '#projects', icon: FolderGit2, sectionId: 'projects' },
  { label: 'Contact', href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
];

const spyIds = navItems.map((item) => item.sectionId).filter((id): id is string => Boolean(id));

/**
 * Floating "liquid selector" bottom navigation. The active pill springs
 * between tabs with a one-shot squash-and-stretch and a soft burst on arrival.
 * The active tab follows the section currently in view (scroll-spy), and
 * tapping a tab smooth-scrolls to its section.
 */
export function BottomNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [burstKey, setBurstKey] = useState(0);

  // After a tab click, the scroll-spy is suppressed until the page reaches the
  // tapped section, so a click always wins over mid-scroll section detection.
  const spyLockRef = useRef(0);
  const clickTargetRef = useRef<number | null>(null);

  // Measure a single tab's width, and keep it in sync on resize.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const measure = () => setTabWidth(element.clientWidth / navItems.length);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: activate the section crossing a reference line near the top of
  // the viewport. Using each section's top position (not its intersection
  // ratio) keeps it correct regardless of how tall or short a section is.
  useEffect(() => {
    const sections = spyIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const computeIndex = () => {
      const line = window.innerHeight * 0.35;
      let bestIndex = 0;
      let bestTop = -Infinity;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          const index = navItems.findIndex((item) => item.sectionId === section.id);
          if (index !== -1) bestIndex = index;
        }
      }
      return bestIndex;
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = computeIndex();
        // Release the click lock the moment we arrive at the tapped section.
        if (clickTargetRef.current !== null && current === clickTargetRef.current) {
          clickTargetRef.current = null;
          spyLockRef.current = 0;
        }
        if (performance.now() < spyLockRef.current) return;
        setActiveIndex(current);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Replay the burst each time the active tab changes.
  useEffect(() => {
    setBurstKey((key) => key + 1);
  }, [activeIndex]);

  // Animate the pill to the active tab: a spring for position plus a one-shot
  // squash-and-stretch that settles back to rest. No idle motion.
  const [pillScope, animatePill] = useAnimate();

  useEffect(() => {
    if (tabWidth === 0 || !pillScope.current) return;
    animatePill(
      pillScope.current,
      {
        x: activeIndex * tabWidth,
        scaleX: [1, 1.28, 1],
        scaleY: [1, 0.78, 1],
      },
      {
        x: { type: 'spring', stiffness: 340, damping: 30 },
        scaleX: { duration: 0.4, ease: 'easeOut', times: [0, 0.4, 1] },
        scaleY: { duration: 0.4, ease: 'easeOut', times: [0, 0.4, 1] },
      }
    );
  }, [activeIndex, tabWidth, animatePill, pillScope]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 sm:bottom-6"
    >
      <div
        ref={containerRef}
        className="relative flex rounded-[28px] border border-[#D3F9FF]/10 bg-[#0C1620]/80 p-1.5 shadow-2xl backdrop-blur-md"
      >
        {/* Liquid pill behind the active tab */}
        {tabWidth > 0 && (
          <motion.div
            ref={pillScope}
            aria-hidden="true"
            className="absolute bottom-1.5 left-1.5 top-1.5 rounded-[22px] bg-[#1F435B]"
            style={{ width: tabWidth - 12 }}
          />
        )}

        {/* Soft gradient bursts above and below the pill on arrival */}
        {tabWidth > 0 && (
          <div key={burstKey} aria-hidden="true" className="pointer-events-none">
            {[-1, 1].map((direction) => (
              <motion.span
                key={direction}
                className="absolute h-8 w-16 rounded-full"
                style={{
                  left: activeIndex * tabWidth + tabWidth / 2 - 32,
                  top: direction === -1 ? -4 : undefined,
                  bottom: direction === 1 ? -4 : undefined,
                  background:
                    'radial-gradient(closest-side, rgba(73,228,255,0.55), rgba(211,249,255,0))',
                }}
                initial={{ scale: 0.2, opacity: 0.75 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}

        {/* Tabs */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = Boolean(item.sectionId) && index === activeIndex;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                if (!item.sectionId) return;
                clickTargetRef.current = index;
                spyLockRef.current = performance.now() + 1200;
                setActiveIndex(index);
              }}
              aria-current={isActive ? 'page' : undefined}
              style={{ opacity: isActive ? 1 : 0.6 }}
              className="relative z-10 flex flex-1 flex-col items-center gap-1 rounded-[22px] py-2 text-[#D3F9FF] transition-opacity duration-200 hover:opacity-100"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wide sm:text-xs">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
