import { technologies } from '../data/technologies';

// Split the stack across two rows that scroll in opposite directions.
const midpoint = Math.ceil(technologies.length / 2);
const rowOne = technologies.slice(0, midpoint);
const rowTwo = technologies.slice(midpoint);

// Doubled so a -50% translate loops seamlessly (both halves are identical).
const double = (items: string[]) => [...items, ...items];

/**
 * Tech-stack marquee: two rows that continuously auto-scroll in opposite
 * directions, so every skill passes into view on any device. The moving rows
 * are decorative (aria-hidden); the real skills list is exposed to assistive
 * tech via a visually hidden list, and the animation respects reduced motion.
 */
export function MarqueeSection() {
  return (
    <section id="skills" className="overflow-x-clip bg-[#0C0C0C] pb-10 pt-8 sm:pt-10 md:pt-14">
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
        <MarqueeRow items={double(rowOne)} direction="left" />
        <MarqueeRow items={double(rowTwo)} direction="right" />
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  items: string[];
  direction: 'left' | 'right';
};

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const animation = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div
      aria-hidden="true"
      className={`flex w-max will-change-transform ${animation} motion-reduce:animate-none`}
    >
      {items.map((tech, index) => (
        <TechChip key={`${tech}-${index}`} name={tech} />
      ))}
    </div>
  );
}

function TechChip({ name }: { name: string }) {
  return (
    <span className="mr-2 inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 sm:mr-3 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 md:gap-4 md:px-8 md:py-5">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="url(#marquee-spark)"
        />
      </svg>
      <span className="text-sm font-semibold uppercase tracking-wide text-[#D7E2EA] sm:text-base md:text-xl">
        {name}
      </span>
    </span>
  );
}
