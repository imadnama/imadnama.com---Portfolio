import { FadeIn } from '../components/FadeIn';
import { ContactButton, CONTACT_EMAIL } from '../components/ContactButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
];

/**
 * Landing hero: navigation, oversized name heading, an intro line + CTA, and a
 * portrait. Fills the viewport and anchors the bottom bar to the base of the
 * screen.
 */
export function HeroSection() {
  return (
    <section id="home" className="relative flex h-screen flex-col justify-between overflow-x-clip">
      <div>
        {/* Navigation */}
        <FadeIn
          as="nav"
          y={-20}
          className="flex w-full items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </FadeIn>

        {/* Name heading */}
        <div className="overflow-hidden px-6 md:px-10">
          <FadeIn
            as="h1"
            delay={0.15}
            y={40}
            className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
          >
            Hi, i&apos;m imad
          </FadeIn>
        </div>
      </div>

      {/* Intro line + call to action */}
      <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a software engineering student driven by crafting clean, reliable, and memorable software
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait, centered over the hero */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        {/* Soft spotlight behind the portrait so the subject reads against the
            near-black background. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[6%] aspect-square w-[88%] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(140,150,165,0.6) 0%, rgba(100,110,125,0.3) 42%, rgba(12,12,12,0) 70%)',
          }}
        />
        <FadeIn delay={0.6} y={30} className="relative z-10">
          <img
            src="/portrait.png"
            alt="Portrait of Imad Nama"
            draggable={false}
            className="w-full select-none"
            style={{
              // Fade the lower edge so the cropped photo blends into the
              // background instead of ending in a hard horizontal line.
              maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
}
