import { FadeIn } from '../components/FadeIn';
import { capabilities } from '../data/capabilities';

/**
 * "What I Do": a light panel with a numbered list of capability areas. The
 * rounded top edge creates the transition from the dark sections above.
 */
export function WhatIDoSection() {
  return (
    <section
      id="what-i-do"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase leading-none text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        What I Do
      </h2>

      <div className="mx-auto max-w-5xl">
        {capabilities.map((capability, index) => (
          <FadeIn
            key={capability.name}
            delay={index * 0.1}
            className="flex items-start gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 first:border-t-0 sm:gap-10 sm:py-10 md:py-12"
          >
            <span
              className="font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-3 pt-1 md:gap-4">
              <h3
                className="font-medium uppercase leading-tight text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {capability.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]/60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {capability.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
