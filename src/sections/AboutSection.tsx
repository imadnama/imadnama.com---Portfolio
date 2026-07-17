import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

const bio =
  "I'm a software engineering student on the cybersecurity track, driven by a " +
  'security mindset and a passion for building scalable, secure full-stack ' +
  'software. I use AI every day for agentic coding and LLM-augmented ' +
  "development, and I pick up new tools fast. Let's build something great " +
  'together!';

// Decorative dev glyphs anchored in each corner. Positions and entrance
// offsets mirror the original layout; the artwork is our own local SVG.
const decorations = [
  {
    src: '/decor/code.svg',
    className: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: '/decor/terminal.svg',
    className:
      'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: '/decor/branch.svg',
    className:
      'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: '/decor/database.svg',
    className:
      'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

/**
 * About section: a centered heading, a scroll-revealed bio, and a CTA, framed
 * by four decorative dev glyphs that slide in from the edges.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {decorations.map((decoration) => (
        <FadeIn
          key={decoration.src}
          delay={decoration.delay}
          duration={0.9}
          x={decoration.x}
          y={0}
          className={`pointer-events-none absolute ${decoration.className}`}
        >
          <img src={decoration.src} alt="" aria-hidden="true" className="w-full" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={bio}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
