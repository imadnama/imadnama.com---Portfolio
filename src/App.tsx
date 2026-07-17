import { HeroSection } from './sections/HeroSection';

/**
 * Root of the portfolio. Sections are composed here in page order and are
 * added incrementally in the stages that follow.
 */
function App() {
  return (
    <main className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      {/* MarqueeSection, AboutSection, ServicesSection, ProjectsSection */}
    </main>
  );
}

export default App;
