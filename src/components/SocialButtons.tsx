import { Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL } from '../data/social';

type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const socials: Social[] = [
  { label: 'GitHub', href: GITHUB_URL, icon: Github },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
];

type SocialButtonsProps = {
  className?: string;
};

/**
 * GitHub and LinkedIn buttons, styled to match the floating bottom navigation
 * (navy fill, pale-cyan content, cyan accent on hover).
 */
export function SocialButtons({ className = '' }: SocialButtonsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-[#D3F9FF]/15 bg-[#1F435B] px-6 py-3 text-[#D3F9FF] transition-colors duration-200 hover:border-[#49E4FF]/50 hover:bg-[#295b78] sm:px-7 sm:py-3.5"
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-widest">{label}</span>
        </a>
      ))}
    </div>
  );
}
