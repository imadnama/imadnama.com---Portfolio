export type Project = {
  id: string;
  /** Two-digit display index, e.g. "01". */
  number: string;
  name: string;
  /** Short context label, e.g. "Personal · iOS". */
  category: string;
  /** Live demo or repository URL. Omit to hide the "Live Project" button. */
  link?: string;
  /** Highlight bullet points describing the work. */
  description: string[];
  /** Full technology stack, rendered as tags. */
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 'logmypays',
    number: '01',
    name: 'LogMyPays',
    category: 'Personal · iOS',
    link: 'https://github.com/imadnama/LogMyPays-iOS',
    description: [
      'Built a fully functional, secure, mobile-native AI-powered financial tracking app using a multi-agent development workflow across Cursor, Claude, Codex, and Apple Intelligence.',
      'Integrated Microsoft Azure Document Intelligence for automated receipt and expense extraction and budgeting.',
      'Hardened the app with API rate limiting, comprehensive Row-Level Security (RLS), server-side authorization, and vulnerability mitigation.',
    ],
    stack: ['Flutter', 'Dart', 'Xcode', 'Supabase', 'PostgreSQL', 'Microsoft Azure', 'RevenueCat'],
  },
  {
    id: 'freeclass',
    number: '02',
    name: 'FreeClass',
    category: 'Coursework · IoT',
    link: 'https://github.com/imadnama/FreeClass',
    description: [
      'Built a full-stack real-time monitoring system using IoT sensors, a Python/JavaScript backend, and an HTML/CSS frontend — structured end-to-end following the MVC design pattern.',
      'Implemented real-time alerting and data integrity checks to ensure accurate room-status reporting, focusing on reliable behaviour under live data conditions.',
      'Managed project delivery with Jira for sprint planning and Git/GitHub for version control.',
    ],
    stack: [
      'Python',
      'JavaScript',
      'MySQL',
      'HTML5',
      'CSS',
      'Tailwind CSS',
      'REST API',
      'Postman',
      'Jira',
      'Git',
    ],
  },
  {
    id: 'vaultpro',
    number: '03',
    name: 'VaultPro',
    category: 'Coursework · Security',
    link: 'https://github.com/imadnama/ValutPRO',
    description: [
      'Architected a full-stack Python application with clean separation-of-concerns layers (UI / Logic / Security / DB) following SOLID principles — covering frontend, backend logic, and persistent storage.',
      'Implemented authenticated AES-128-CBC encryption (Fernet) with PBKDF2-HMAC-SHA256 key derivation (100,000 iterations); packaged as a standalone .exe installer via PyInstaller and Inno Setup.',
    ],
    stack: [
      'Python',
      'CustomTkinter',
      'SQLite',
      'Cryptography (Fernet)',
      'PyInstaller',
      'Inno Setup',
      'Docker',
    ],
  },
  {
    id: 'klogpro',
    number: '04',
    name: 'KlogPro',
    category: 'Personal · Security',
    description: [
      'Built a full-stack desktop application in C# / .NET with a live Avalonia UI dashboard, using low-level Win32 API hooks to instrument and analyse input streams across system-wide applications.',
      'Engineered a finite-state machine (FSM) to classify nine real-time input scenarios and an HTTP POST pipeline to an external endpoint.',
    ],
    stack: ['C#', '.NET', 'Avalonia UI', 'Win32 API', 'FSM', 'HTTP'],
  },
];
