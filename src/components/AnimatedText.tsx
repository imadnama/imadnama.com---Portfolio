import { Fragment, useRef } from 'react';
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
 * viewport, each character fading from faint to full.
 *
 * Characters are grouped into per-word spans that cannot break internally, so
 * lines only ever wrap at spaces (never mid-word). The whole string is exposed
 * to assistive tech via `aria-label`, while the per-character spans are hidden
 * from it to avoid letter-by-letter announcements.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;

  // Split into words while tracking each word's starting index in the full
  // string (including the spaces between words) so the reveal timing stays
  // continuous across the whole sentence.
  let cursor = 0;
  const words = text.split(' ').map((word) => {
    const start = cursor;
    cursor += word.length + 1; // +1 accounts for the following space
    return { word, start };
  });

  return (
    <p ref={ref} aria-label={text} className={className} style={style}>
      {words.map(({ word, start }, wordIndex) => (
        <Fragment key={wordIndex}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {word.split('').map((character, characterIndex) => {
              const globalIndex = start + characterIndex;
              return (
                <Character
                  key={characterIndex}
                  progress={scrollYProgress}
                  range={[globalIndex / totalChars, (globalIndex + 1) / totalChars]}
                >
                  {character}
                </Character>
              );
            })}
          </span>
          {/* Breakable space between words — the only place a line may wrap. */}
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
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
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* Invisible placeholder reserves the character's layout space. */}
      <span style={{ opacity: 0 }}>{children}</span>
      {/* Animated overlay sits on top and fades in with scroll. */}
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
