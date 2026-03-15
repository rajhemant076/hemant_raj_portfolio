import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import GithubActivity from './components/sections/GitHubActivity';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

// Hooks
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <Loader onComplete={() => setTimeout(() => setLoading(false), 200)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <GithubActivity />
            <Education />
            <Achievements />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}