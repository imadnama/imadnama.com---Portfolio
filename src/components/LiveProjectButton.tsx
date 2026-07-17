type LiveProjectButtonProps = {
  /** Destination of the live project. Opens in a new tab when provided. */
  href?: string;
  /** Extra classes for positioning/spacing at the call site. */
  className?: string;
};

/**
 * Ghost/outline pill used on project cards to link out to a live demo.
 * Falls back to a non-navigating placeholder when no href is supplied.
 */
export function LiveProjectButton({ href, className = '' }: LiveProjectButtonProps) {
  const isExternal = Boolean(href);

  return (
    <a
      href={href ?? '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      Live Project
    </a>
  );
}
