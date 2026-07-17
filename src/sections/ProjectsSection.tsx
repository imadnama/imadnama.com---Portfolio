import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const imageRadius = 'rounded-[28px] sm:rounded-[36px] md:rounded-[44px]';

/**
 * Projects: a set of cards that stick and scale down as the page scrolls,
 * stacking on top of one another. Card scale is driven by the section's
 * overall scroll progress.
 */
export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <h2
        className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - 1 - index) * 0.03;
        return (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            progress={scrollYProgress}
            range={[index / projects.length, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}

type ProjectCardProps = {
  index: number;
  project: Project;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function ProjectCard({ index, project, progress, range, targetScale }: ProjectCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="flex h-[85vh] items-start justify-center">
      <motion.article
        style={{ scale, y: index * 28 }}
        className="sticky top-24 mx-auto w-full max-w-6xl origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
      >
        {/* Header: number, category, name, tech, and the live link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
              <span className="text-xs uppercase tracking-wide text-[#D7E2EA]/50 sm:text-sm">
                {project.tech}
              </span>
            </div>
          </div>
          {project.link ? <LiveProjectButton href={project.link} /> : null}
        </div>

        {/* Image grid: two stacked on the left (40%), one tall on the right (60%) */}
        <div className="mt-4 flex items-stretch gap-3 sm:mt-6 md:mt-8">
          <div className="flex w-2/5 flex-col gap-3">
            <ProjectImage
              src={project.images?.colOneTop}
              name={project.name}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <ProjectImage
              src={project.images?.colOneBottom}
              name={project.name}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-3/5">
            <ProjectImage src={project.images?.colTwo} name={project.name} className="h-full" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

type ProjectImageProps = {
  src?: string;
  name: string;
  className?: string;
  style?: CSSProperties;
};

/** Renders a screenshot when available, otherwise a branded placeholder. */
function ProjectImage({ src, name, className = '', style }: ProjectImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${name} screenshot`}
        loading="lazy"
        className={`w-full object-cover ${imageRadius} ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-white/10 ${imageRadius} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #111318 0%, #1b2130 100%)',
        ...style,
      }}
    >
      <div className="flex flex-col items-center gap-3 px-4 text-center text-[#D7E2EA]">
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 14 L8 10 L12 13 L16 9 L21 13" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
        </svg>
        <span className="text-[0.65rem] uppercase tracking-widest opacity-60 sm:text-xs">
          {name}
        </span>
      </div>
    </div>
  );
}
