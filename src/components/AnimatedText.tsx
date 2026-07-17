import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Reveals a paragraph one character at a time as it scrolls through the
 * viewport, each character fading from faint to full. The whole string is
 * exposed to assistive tech via `aria-label`, while the per-character spans
 * are hidden from it to avoid letter-by-letter announcements.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} aria-label={text} className={className} style={style}>
      {characters.map((character, index) => {
        const start = index / characters.length;
        const end = start + 1 / characters.length;
        return (
          <Character key={index} progress={scrollYProgress} range={[start, end]}>
            {character}
          </Character>
        );
      })}
    </p>
  );
}

type CharacterProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
};

/** A single character whose opacity is driven by scroll progress. */
function Character({ children, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span
      aria-hidden="true"
      style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre' }}
    >
      {/* Invisible placeholder reserves the character's layout space. */}
      <span style={{ opacity: 0 }}>{children}</span>
      {/* Animated overlay sits on top and fades in with scroll. */}
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
