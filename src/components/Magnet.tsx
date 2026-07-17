import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  /** Distance (px) beyond the element's edges where the pull begins. */
  padding?: number;
  /** Divisor for the pull — higher is subtler. */
  strength?: number;
  /** CSS transition while the cursor is inside the active zone. */
  activeTransition?: string;
  /** CSS transition while the element eases back to rest. */
  inactiveTransition?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Wraps its children in an element that is magnetically pulled toward the
 * cursor once the cursor comes within `padding` of the element's edges.
 */
export function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      const withinReach =
        Math.abs(distanceX) < rect.width / 2 + padding &&
        Math.abs(distanceY) < rect.height / 2 + padding;

      if (withinReach) {
        setIsActive(true);
        setOffset({ x: distanceX / strength, y: distanceY / strength });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
