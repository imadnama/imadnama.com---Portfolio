import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton, CONTACT_EMAIL } from '../components/ContactButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
];

/**
 * Landing hero: navigation, oversized name heading, an intro line + CTA, and a
 * cursor-reactive portrait. Fills the viewport and anchors the bottom bar to
 * the base of the screen.
 */
export function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col justify-between overflow-x-clip">
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

      {/* Cursor-reactive portrait, centered over the hero */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/portrait.svg"
              alt="Portrait of Imad Nama"
              draggable={false}
              className="w-full select-none"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
