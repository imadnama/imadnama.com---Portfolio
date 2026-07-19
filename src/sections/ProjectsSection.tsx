import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

/**
 * Projects: a set of cards that stick and scale down as the page scrolls,
 * stacking on top of one another. Each card leads with its highlights and the
 * full technology stack. Card scale is driven by the section's scroll progress.
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
    <div className="sticky top-24 flex h-[80vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale, y: index * 28 }}
        className="mx-auto w-full max-w-5xl origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10"
      >
        {/* Header: number, category, name, and the live link */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 96px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 pt-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          {project.link ? <LiveProjectButton href={project.link} /> : null}
        </div>

        {/* Highlights */}
        <ul className="mt-6 max-w-3xl space-y-3 sm:mt-8">
          {project.description.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-[#D7E2EA]/80"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D7E2EA]/50"
              />
              <span className="font-light leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* Technology stack */}
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-xs uppercase tracking-wide text-[#D7E2EA]/70 sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
