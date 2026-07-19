import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { WhatIDoSection } from './sections/WhatIDoSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { BottomNav } from './components/BottomNav';

/**
 * Root of the portfolio. Sections are composed here in page order, with a
 * persistent floating bottom navigation.
 */
function App() {
  return (
    <>
      <main className="min-h-screen bg-[#0C0C0C] pb-28 sm:pb-32" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <WhatIDoSection />
        <ProjectsSection />
      </main>
      <BottomNav />
    </>
  );
}

export default App;
