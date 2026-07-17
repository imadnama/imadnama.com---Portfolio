export type Capability = {
  name: string;
  description: string;
};

/** The "What I Do" capability areas, grounded in real experience. */
export const capabilities: Capability[] = [
  {
    name: 'Full-Stack Web Development',
    description:
      'End-to-end web applications structured with clean, MVC-based ' +
      'architecture — from the interface down to the database — and ' +
      'engineered to stay reliable under real, live data.',
  },
  {
    name: 'Backend & Databases',
    description:
      'Dependable server-side logic and relational data modelling with MySQL ' +
      'and SQLite, writing SQL for retrieval and reporting with a constant ' +
      'eye on data integrity.',
  },
  {
    name: 'Security-Minded Engineering',
    description:
      'A cybersecurity-track approach to building software: strong ' +
      'encryption and key derivation, secure design, and a working ' +
      'familiarity with networking, protocols, and security tooling.',
  },
  {
    name: 'AI-Augmented Development',
    description:
      'Building faster with AI as a daily driver — agentic coding workflows, ' +
      'LLM-augmented development, and MCP — without ever trading away code ' +
      'quality.',
  },
  {
    name: 'Desktop Applications',
    description:
      'Native and cross-platform desktop apps in Python and C# / .NET, from ' +
      'low-level system instrumentation to responsive, real-time dashboards.',
  },
];
