import { useMemo } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  /** Element type to render (e.g. 'div', 'h1', 'p'). Defaults to 'div'. */
  as?: ElementType;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Animation length in seconds. */
  duration?: number;
  /** Initial horizontal offset in px (animates back to 0). */
  x?: number;
  /** Initial vertical offset in px (animates back to 0). */
  y?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fades and slides its children into view once, when scrolled near the
 * viewport. The rendered element type is configurable via `as`.
 */
export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  // Build the motion component for the requested element type once per type.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
