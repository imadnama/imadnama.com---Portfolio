import type { CSSProperties } from 'react';

/** Email that all contact actions point to. */
export const CONTACT_EMAIL = 'emadnama@hotmail.com';

type ContactButtonProps = {
  /** Extra classes for positioning/spacing at the call site. */
  className?: string;
};

const buttonStyle: CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid #ffffff',
  outlineOffset: '-3px',
};

/**
 * Primary call-to-action pill. Renders as a mailto link so it works without
 * any JavaScript and is announced correctly by assistive tech.
 */
export function ContactButton({ className = '' }: ContactButtonProps) {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      style={buttonStyle}
      className={`inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      Contact Me
    </a>
  );
}
