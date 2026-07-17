export type Project = {
  id: string;
  /** Two-digit display index, e.g. "01". */
  number: string;
  name: string;
  /** Short context label, e.g. "Personal · iOS". */
  category: string;
  /** Compact tech summary shown under the name. */
  tech: string;
  /** Live demo or repository URL. Omit to hide the "Live Project" button. */
  link?: string;
  /**
   * Optional screenshots (paths under /public). When a slot is empty a
   * branded placeholder is shown, so real images can be dropped in later
   * without touching the markup.
   */
  images?: {
    colOneTop?: string;
    colOneBottom?: string;
    colTwo?: string;
  };
};

export const projects: Project[] = [
  {
    id: 'logmypays',
    number: '01',
    name: 'LogMyPays',
    category: 'Personal · iOS',
    tech: 'Flutter · Supabase · Azure AI · RevenueCat',
    link: 'https://github.com/imadnama/LogMyPays-iOS',
  },
  {
    id: 'freeclass',
    number: '02',
    name: 'FreeClass',
    category: 'Coursework · IoT',
    tech: 'Python · MySQL · REST · Tailwind',
    link: 'https://github.com/imadnama/FreeClass',
  },
  {
    id: 'vaultpro',
    number: '03',
    name: 'VaultPro',
    category: 'Coursework · Security',
    tech: 'Python · SQLite · Cryptography',
    link: 'https://github.com/imadnama/ValutPRO',
  },
  {
    id: 'klogpro',
    number: '04',
    name: 'KlogPro',
    category: 'Personal · Security',
    tech: 'C# · .NET · Avalonia · Win32',
  },
];
