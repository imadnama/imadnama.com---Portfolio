import { useEffect, useRef, useState } from 'react';
import { technologies } from '../data/technologies';

// Split the stack across two rows that scroll in opposite directions.
const midpoint = Math.ceil(technologies.length / 2);
const rowOne = technologies.slice(0, midpoint);
const rowTwo = technologies.slice(midpoint);

// Tripled so each row has enough content to translate without exposing an edge.
const triple = (items: string[]) => [...items, ...items, ...items];

/**
 * Scroll-driven tech-stack marquee: two rows slide in opposite directions as
 * the page scrolls. The moving rows are decorative (aria-hidden); the real
 * skills list is exposed to assistive tech via a visually hidden list.
 */
export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="overflow-x-clip bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      {/* Shared gradient for the chip spark icons. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="marquee-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#646973" />
            <stop offset="1" stopColor="#BBCCD7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Accessible, non-duplicated skills list for assistive tech. */}
      <h2 className="sr-only">Technologies I work with</h2>
      <ul className="sr-only">
        {technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        <MarqueeRow items={triple(rowOne)} translateX={offset - 200} />
        <MarqueeRow items={triple(rowTwo)} translateX={-(offset - 200)} />
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  items: string[];
  translateX: number;
};

function MarqueeRow({ items, translateX }: MarqueeRowProps) {
  return (
    <div
      aria-hidden="true"
      className="flex w-max gap-3"
      style={{ transform: `translateX(${translateX}px)`, willChange: 'transform' }}
    >
      {items.map((tech, index) => (
        <TechChip key={`${tech}-${index}`} name={tech} />
      ))}
    </div>
  );
}

function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-4 whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-5">
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 md:h-6 md:w-6">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="url(#marquee-spark)"
        />
      </svg>
      <span className="text-xl font-semibold uppercase tracking-wide text-[#D7E2EA] md:text-2xl">
        {name}
      </span>
    </span>
  );
}
