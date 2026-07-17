import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { WhatIDoSection } from './sections/WhatIDoSection';
import { ProjectsSection } from './sections/ProjectsSection';

/**
 * Root of the portfolio. Sections are composed here in page order.
 */
function App() {
  return (
    <main className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <WhatIDoSection />
      <ProjectsSection />
    </main>
  );
}

export default App;
